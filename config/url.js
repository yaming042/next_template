const API_PREFIX = process.env.API_PREFIX;
// 基础接口
export const VALIDATE = `${API_PREFIX || ''}/user/validate`; // 校验用户是否登录

// 上传图片
export const UPLOAD_FILE_OSS = `${API_PREFIX || ''}/common/upload`;