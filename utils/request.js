'use client';

import axios from 'axios';
import qs from 'qs';
import Cookies from 'js-cookie';

import store from '@/redux/store';
import { setLoginOpen, setUserInfo } from '@/redux/reducers/main';
import { VALIDATE } from '@/config/url';

const abortController = new AbortController();
const { signal } = abortController;

/*
    错误提示，不在这里添加，原因就是很多时候都是好多请求并发请求的，如果在这里提示，那么就会出现一种情况，一下出现很多错误提示
*/
export default function request(url, options = {}) {
    let isUrlEncoded = options.contentType === 'application/x-www-form-urlencoded',
        isFormData = options.contentType === 'multipart/form-data',
        requestUrl = url,
        responseBlob = options.responseType === 'blob',
        Authorization = {[Cookies.get('AuthName')]: Cookies.get('token')},
        progressObj = {};

    if((!options.method || (['GET', 'DELETE'].includes(options.method?.toUpperCase()))) && options.data && Object.keys(options.data).length) {
        requestUrl += `?${qs.stringify(options.data || {})}`;
    }
    if(options.onUploadProgress && 'function' === typeof(options.onUploadProgress)) {
        progressObj['onUploadProgress'] = options.onUploadProgress;
    }

    let ajaxOption = {
        url: requestUrl,
        method: options.method || 'GET', // 默认 get
        baseURL: ``, // baseURL 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL。
        headers: {
            'Content-Type': options.contentType || 'application/json',
            ...Authorization,
        },
        data: isUrlEncoded ? qs.stringify(options.data || {}) : (isFormData ? options.data : JSON.stringify(options.data || {})), // 'PUT', 'POST', 和 'PATCH'时body的参数
        timeout: options.timeout || 60000, // 超时时间 60秒
        responseType: options.responseType || 'json', // 表示服务器响应的数据类型
        ...progressObj,
    };

    return new Promise((resolve, reject) => {
        axios(ajaxOption, {signal}).then(response => {
            // data就是后端接口返回的整体 - {data, status: responseStatus} = response

            // 网络响应码 200 成功
            if(200 === response?.status) {
                if(401 === response?.data?.code && '无权限' === response?.data?.message) {
                    store.dispatch(setUserInfo({}));
                    VALIDATE !== url && store.dispatch(setLoginOpen(true));
                    return reject({...response?.data, message: `登录已过期，请重新登录`});
                }
                // 流式响应
                if(responseBlob) return resolve(response?.data || null);
                // 正确响应
                if(RESPONSE_SUCCESS_CODE === response?.data?.code) return resolve(response?.data || null);
                // 异常响应
                // abortController.abort(`请重新登录`); // 如果需要重新登录，这里可能需要判断第一的code
                return reject(response?.data || null);
            }else{
                console.error(`[${url}]: 网络异常`);
                reject({code: response?.status || 500, data: null, message: '网络异常'});
            }
        }).catch(error => {
            console.error(`${url} : ${error.message || '未知异常，请稍后重试'}`);
            reject({code: 500, data: null, message: '未知异常，请稍后重试'});
        });
    });
}
