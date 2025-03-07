/* eslint-disable new-cap */
/* eslint-disable max-len */
import axios from 'axios';
import MD5 from 'crypto-js/md5';

import { refreshAccessToken } from '@/src/client/auth/loginApi';
import Utils from '@/src/utils/cookieUtils';
import cookie from '@/src/utils/cookieUtils';

import { isEmpty } from 'lodash';

import type { AxiosRequestConfig } from 'axios';

const baseURL = import.meta.env.VITE_APP_BASE_URL_FRAPPE;

const AxiosFrappe = axios.create({
  baseURL,
  timeout: 60000,
});

AxiosFrappe.interceptors.request.use(
  async (config: AxiosRequestConfig) => {
    if (config.headers === undefined) config.headers = {};

    const token = Utils.getAuth()?.access_token;
    const userDetail = Utils.getUser();
    const permissionRole = Utils.getPermission();

    const digest = permissionRole?.digest;
    const payload = MD5(JSON.stringify(permissionRole?.permissions)).toString();
    const isHaveAccess = digest !== payload;

    if (
      !isEmpty(permissionRole?.role?.name) &&
      !isEmpty(userDetail?.role?.name) &&
      (userDetail?.role?.name !== permissionRole?.role?.name || isHaveAccess)
    ) {
      alert('Privileges escalation attempt detected.');
      Utils.resetCookies();
    }

    const refreshToken = Utils.getAuth()?.refresh_token;
    if (token)
      config.headers.Authorization = `token 2c4059f47216206:2c75a5f4c8b1c76`;
    if (token && config?.url?.includes('logout'))
      config.headers.refresh_token = refreshToken;
    if (token && config?.url?.includes('public'))
      config.headers.Authorization = '';
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

AxiosFrappe.interceptors.response.use(
  (res) => {
    if (res?.data?.message?.status === 'error') {
      const resData = res?.data?._server_messages
        ? JSON.parse(res?.data?._server_messages)?.map(JSON.parse)[0]
        : res?.data;
      const errorResponse = {
        response: {
          data: resData,
          error: true,
        },
      };
      return Promise.reject(errorResponse);
    }
    return res;
  },
  async (error) => {
    const resData = error.response?.data?._server_messages
      ? JSON.parse(error.response?.data?._server_messages)?.map(JSON.parse)[0]
      : error.response?.data;
    const errorResponse = {
      ...error,
      response: {
        ...error.response,
        data: resData,
        error: true,
      },
    };

    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      try {
        originalRequest._retry = true;
        const refreshToken = Utils.getAuth()?.refresh_token;
        const response = await refreshAccessToken({ refreshToken });
        const data = response?.data?.data;

        const token = {
          access_token: data.access_token,
          refresh_token: data.refresh_token,
          expires_in: data.expires_in,
        };
        cookie.setAuth(JSON.stringify(token));

        axios.defaults.headers.common[
          'Authorization'
        ] = `token 2c4059f47216206:2c75a5f4c8b1c76`;
        return AxiosFrappe(originalRequest);
      } catch (error: any) {
        cookie.resetCookies();
        window.location.pathname = '/login';
      }
    }
    if (error.response === undefined || error.response === 'undefined')
      return Promise.reject(errorResponse);
    if (error.response.status) return Promise.reject(errorResponse);
  }
);

export default AxiosFrappe;
