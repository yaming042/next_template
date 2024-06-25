'use client';

// 判断两个数组元素是否一样
export const arrayItemEqual = (arr1 = [], arr2 = []) => {
    if (arr1.length !== arr2.length) return false;
    if (!arr1.length && arr1.length === arr2.length) return true;

    const set1 = new Set(arr1);

    for (const element of arr2) {
        if (!set1.has(element)) return false;
    }

    return true;
}

// 深拷贝
export const deepCopy = (obj, cache = new WeakMap()) => {
    // 检查是否已经拷贝过，防止循环引用
    if (cache.has(obj)) return cache.get(obj);

    // 处理特殊类型
    if (obj === null || typeof obj !== 'object') return obj;

    // 处理日期对象
    if (obj instanceof Date) return new Date(obj);

    // 处理正则表达式对象
    if (obj instanceof RegExp) return new RegExp(obj);

    // 创建一个空的对象或数组，具有相同的原型
    const copy = Array.isArray(obj) ? [] : {};

    // 将新对象/数组存入缓存，以防止循环引用
    cache.set(obj, copy);

    // 递归拷贝子属性
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            copy[key] = deepCopy(obj[key], cache);
        }
    }

    return copy;
}

/**
 *  数组对象去重
 *
 * @param {*} array 原数组
 * @param {*} key 去重的key
 * @param {boolean} [leftNew=false] 是否保留最新的/最后面的
 * @return {*} array
 */
export const uniqueArrayById = (array, key, leftNew = false) => {
    const uniqueMap = new Map();

    for (const item of array) {
        const keyValue = item[key];

        if (!uniqueMap.has(keyValue) || leftNew) {
            uniqueMap.set(keyValue, item);
        }
    }

    return Array.from(uniqueMap.values());
};

// 数组取交集
export const findIntersection = (arr1, arr2) => {
    // 使用 Set 数据结构来存储 arr1 中的元素
    const set1 = new Set(arr1);

    // 使用 filter 方法遍历 arr2，筛选出同时存在于 set1 和 arr2 中的元素
    const intersection = arr2.filter(element => set1.has(element));

    return intersection;
}

// 获取图片base64格式
export const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
};

// 获取图片真实宽高
export const getImageWh = url => {
    return new Promise((resolve, reject) => {
        if(!url) return resolve({width: 0, height: 0});

        let image = new Image();

        image.onload = function() {
            resolve({width: this.width, height: this.height});
            image = null;
        }
        image.onerror = () => resolve({width: 0, height: 0});

        image.src = url;

        // 从缓存中加载图片
        if(image.complete) {
            resolve({width: image.width, height: image.height});
            image = null;
        }
    });
};

// 字符串hash处理
export const string2Hash = (str) => {
    let hash = 0;

    if (str.length === 0) return hash;

    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = (hash << 5) - hash + char;
    }

    return hash;
}

// 从字符串中获取指定的参数
export const getParameterByName = (name, url = '') => {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&'); // 处理特殊字符
    const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`);
    const results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

// 金钱类，输入数字输出中文大写
export const numberToChinese = (number) => {
    // 定义数字和单位的对应关系
    const digits = "零壹贰叁肆伍陆柒捌玖";
    const units = ["元", "角", "分", "整"];
    const powers = ["", "拾", "佰", "仟"];

    // 处理小数部分，保留两位小数
    number = parseFloat(number).toFixed(2);

    // 分离整数部分和小数部分
    const parts = number.split(".");
    const integerPart = parts[0];
    const decimalPart = parts[1];

    // 将整数部分转换为中文大写
    let result = "";
    let zeroFlag = false; // 是否已经有零
    for (let i = 0; i < integerPart.length; i++) {
        const digit = parseInt(integerPart[i]);
        const position = integerPart.length - i - 1;

        if (digit === 0) {
            zeroFlag = true;
            continue;
        }

        if (zeroFlag) {
            result += digits[0]; // 添加零
            zeroFlag = false;
        }

        result += digits[digit] + powers[position % 4];
    }

    if (result === "") {
        result = digits[0] + units[0]; // 处理零元的情况
    } else {
        result += units[0]; // 添加元
    }

    // 将小数部分转换为中文大写
    if (decimalPart) {
        for (let i = 0; i < decimalPart.length; i++) {
            const digit = parseInt(decimalPart[i]);
            if (digit !== 0) {
                result += digits[digit] + units[i + 1];
            }
        }
    } else {
        result += units[3]; // 添加整
    }

    return result;
}

// 生成uuid
export const getUuid = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        let r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

// 除法
export const divideAndRound = (dividend, divisor, decimalPlaces = 6) => {
    if (divisor === 0) {
        console.log(`非法表达式`);
        return null;
    }

    // 执行除法操作
    const result = dividend / divisor;

    // 四舍五入到指定小数位数
    const roundedResult = Math.round(result * Math.pow(10, decimalPlaces)) / Math.pow(10, decimalPlaces);

    return roundedResult;
}


export const isEmail = (str = '') => (/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/).test(str);
export const isMobile = (str = '') => (/^((13[0-9])|(14[0-9])|(15([0-9]))|(16[0-9])|(17[0-9])|(18[0-9])|(19[0-9]))\d{8}$/).test(str);

export const getGrid = () => {
    let width = window.document.body.clientWidth,
        grids = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'];

    if(width >= 1600) { // >= 1536
        return 'xxl';
    }else if(width >= 1200) { // >= 1280 && < 1536
        return 'xl';
    }else if(width >= 1024) { // >= 1024 && < 1280
        return 'lg'
    }else if(width >= 768) { // >= 768 && < 1024
        return 'md';
    }else if(width >= 640) { // >= 576 && < 768
        return 'sm';
    }else{
        return 'xs'; // < 576
    }
};
export const isMobileApp = (grid='') => ['xs', 'sm'].includes(grid); // 0 - 768
export const isPadApp = (grid='') => ['md'].includes(grid); // 768 - 1024
export const isPcApp = (grid='') => ['lg', 'xl', 'xxl'].includes(grid); // 768 - 1024


// 判断权限
export const authPassed = (code = '', auth = []) => {
    if (!code || typeof code !== 'string' || !Array.isArray(auth)) return true;
    if (!auth.length) return false;

    let exist = (auth || []).find(i => i.code === code);

    return Boolean(exist);
};

// 定制setTimeout
export const customSetTimeout = (fn, delay = 1000) => {
    const startTime = new Date().getTime();
    let countIndex = 1;
    let onOff = true;
    startSetInterval(delay)
    function startSetInterval(interval) {
        let t = setTimeout(() => {
            clearTimeout(t);

            onOff && fn();

            const endTime = new Date().getTime();
            // 偏差值
            const deviation = endTime - (startTime + countIndex * delay);
            countIndex++;
            // 下一次
            if (onOff) {
                startSetInterval(delay - deviation);
            }
        }, interval);
    }

    function stopSetInterval() {
        onOff = false;
        countIndex = 1;
    }
    return stopSetInterval
}

// 样式字符串转对象
export const styleStringToObject = (styleString='') => {
    let styleObject = {},
        declarations = styleString.split(/\s*;\s*/);

    for (var i = 0; i < declarations.length; i++) {
        var declaration = declarations[i].trim();
        if (declaration) {
            var splitIndex = declaration.indexOf(':');
            if (splitIndex !== -1) {
                var property = declaration.slice(0, splitIndex).trim().replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); }); // 将 background-color 转换为 camelCase 的 backgroundColor
                var value = declaration.slice(splitIndex + 1).trim();
                styleObject[property] = value;
            }
        }
    }

    return styleObject;
}

// 图片代理
export const fileProxy = url => {
    if(!url || 'string' !== typeof(url)) return url;

    return location.hostname === 'localhost' ? url.replace(/http(s)?:\/\/liuxuegang\.site\/minio/, '/proxy') : url;
}

// 指定范围正整数
export const getRandomNumber = (min=0, max=100) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};