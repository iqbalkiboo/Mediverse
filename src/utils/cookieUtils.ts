import Cookies from 'js-cookie';
import constants from '@/src/constants';
import {isEmpty} from 'lodash';
import secure from './secure';

const getAuth = () => {
  /**
   * TODO: Will implement later
   * const auth = Cookies.get(constants.COOKIES.AUTH) || '';
   * return auth ? JSON.parse(auth): null;
   */
  const authentications = localStorage.getItem(constants.COOKIES.AUTH) || '';
  const dataDecryption = !isEmpty(authentications) ? secure.decrypt(authentications) : null;
  return !isEmpty(dataDecryption) ? JSON.parse(dataDecryption) : null;
};

const setAuth = (item:string) => {
  /**
   * TODO: will implement later
   * Cookies.set(constants.COOKIES.AUTH, item, {secure: true});
   */
  const dataEncryption = secure.encrypt(item);
  localStorage.setItem(constants.COOKIES.AUTH, dataEncryption);
};

const setPermission = (item:string) => {
  const dataEncryption = secure.encrypt(item);
  localStorage.setItem(constants.COOKIES.PERMISSION, dataEncryption);
};

const getPermission = () => {
  const permissions = localStorage.getItem(constants.COOKIES.PERMISSION) || '';
  const dataDecryption = !isEmpty(permissions) ? secure.decrypt(permissions) : null;
  return !isEmpty(dataDecryption) ? JSON.parse(dataDecryption) : null;
};

const resetCookies = () => {
  localStorage.removeItem(constants.COOKIES.TOKEN);
  localStorage.removeItem(constants.COOKIES.USER);
  localStorage.removeItem(constants.COOKIES.PERMISSION);
  localStorage.removeItem(constants.COOKIES.AUTH);
  localStorage.removeItem(constants.COOKIES.FCM);
  localStorage.removeItem(constants.COOKIES.MY_PROVIDERS);
};

const setUser = (item:string) => {
  /**
   * TODO: will use later
   * Cookies.set(constants.COOKIES.USER, item, {secure: true});
   */
  const dataEncryption = secure.encrypt(item);
  localStorage.setItem(constants.COOKIES.USER, dataEncryption);
};

const getUser = () => {
  /**
   * TODO: will use later
   * const userDetails = Cookies.get(constants.COOKIES.USER) || '';
   * return !isEmpty(userDetails) ? JSON.parse(userDetails) : null;
   */
  const authentications = localStorage.getItem(constants.COOKIES.USER) || '';
  const dataDecryption = !isEmpty(authentications) ? secure.decrypt(authentications) : null;
  return !isEmpty(dataDecryption) ? JSON.parse(dataDecryption) : null;
};

const getCookieDecode = (key) => {
  try {
    return Cookies.get(key);
  } catch (error) {
    console.log('Error', error);
  };
};

const getFCMToken = () => {
  const authentications = localStorage.getItem(constants.COOKIES.FCM) || '';
  const dataDecryption = !isEmpty(authentications) ? secure.decrypt(authentications) : null;
  return !isEmpty(dataDecryption) ? JSON.parse(dataDecryption) : null;
};

const setFCMToken = (item:string) => {
  const dataEncryption = secure.encrypt(item);
  localStorage.setItem(constants.COOKIES.FCM, dataEncryption);
};

const getMyNotifications = () => {
  const authentications = localStorage.getItem(constants.COOKIES.MY_NOTIFICATIONS) || '';
  const dataDecryption = !isEmpty(authentications) ? secure.decrypt(authentications) : null;
  return !isEmpty(dataDecryption) ? JSON.parse(dataDecryption) : null;
};

const setMyNotifications = (item:boolean) => {
  const dataEncryption = secure.encrypt(item);
  localStorage.setItem(constants.COOKIES.MY_NOTIFICATIONS, dataEncryption);
};

const getMyProviders = () => {
  const authentications = localStorage.getItem(constants.COOKIES.MY_PROVIDERS) || '';
  const dataDecryption = !isEmpty(authentications) ? secure.decrypt(authentications) : null;
  return !isEmpty(dataDecryption) ? JSON.parse(dataDecryption) : null;
};

const setMyProviders = (item:string) => {
  const dataEncryption = secure.encrypt(item);
  localStorage.setItem(constants.COOKIES.MY_PROVIDERS, dataEncryption);
};

export default {
  getAuth,
  getUser,
  setAuth,
  setUser,
  getCookieDecode,
  setPermission,
  getPermission,
  resetCookies,
  getFCMToken,
  setFCMToken,
  getMyNotifications,
  setMyNotifications,
  getMyProviders,
  setMyProviders,
};
