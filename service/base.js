'use client';

import {
    VALIDATE,
    UPLOAD_FILE_OSS,
} from '@/config/url';
import request from '@/utils/request';

// 校验一个用户是否登录
export const validate = () => {
    return request(VALIDATE);
};

// 上传图片
export const uploadImage = (data, onUploadProgress) => {
    let obj = {};
    if(onUploadProgress && 'function' === typeof onUploadProgress) obj['onUploadProgress'] = onUploadProgress;
    return request(UPLOAD_FILE_OSS, {method: 'post', data, contentType: 'multipart/form-data', ...obj});
}