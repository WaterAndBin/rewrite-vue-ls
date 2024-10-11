import type { WebStorage } from 'vue-ls';
import CryptoJS from 'crypto-js';

/**
 * 密钥钥匙
 */
const secretKey = 'your-secret-key';

/**
 * 加密
 */
const encrypt = (data: any) => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
};

/**
 * 解密
 */
const decrypt = (data: any) => {
  const bytes = CryptoJS.AES.decrypt(data, secretKey);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};

let storage: WebStorage;

/**
 * 重写vue-ls一些方法
 * @param webStorage VueStorage的实例对象，创建完后传入
 * @param isEncrypt 是否需要加密，默认是 true
 */
const rewrite = (webStorage: WebStorage, isEncrypt = true): WebStorage => {
  const oldSet = webStorage.set.bind(webStorage);
  const oldGet = webStorage.get.bind(webStorage);

  /**
   * Set item
   *
   * @param {string} name
   * @param {*} value
   * @param {number} expire - seconds
   */
  webStorage.set = (name: string, value: any, expire: any = null): void => {
    oldSet(name, isEncrypt ? encrypt(value) : value, expire);
  };

  /**
   * Get item
   *
   * @param {string} name
   * @returns {*}
   */
  webStorage.get = (name: string, def?: any): any => {
    return decrypt(oldGet(name, def));
  };

  storage = webStorage;
  return webStorage;
};

/**
 * 设置存储
 */
export const setStorage = (name: string, value: any, expire: any = null): any => {
  storage.set(name, value, expire);
};

/**
 * 获取存储
 */
export const getStorage = (name: string, def?: any): any => {
  return storage.get(name, def);
};

export default rewrite;
