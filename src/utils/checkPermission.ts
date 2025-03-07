/* eslint-disable max-len */
import { isBoolean, isEmpty } from 'lodash';

/* eslint-disable new-cap */
import cookies from '@/src/utils/cookieUtils';
import Utils from '@/src/utils/cookieUtils';
import MD5 from 'crypto-js/md5';

export const READ = 'is_read';
export const DELETE = 'is_delete';
export const EDIT = 'is_update';
export const CREATE = 'is_create';

const { permissions } = (await cookies.getPermission()) || {
  role: {},
  permissions: [],
};

const handleAuth = async (code: string, action: string) => {
  const roles = await cookies.getPermission();
  if (roles?.permissions) {
    const isAuth =
      roles?.permissions &&
      roles.permissions.find((item) => {
        const menuName = item.menu.toLowerCase();
        return menuName === code.toLowerCase() && item[action];
      });
    return !isEmpty(isAuth);
  }
  return false;
};

export const checkAccess = (code: string, action: string) => {
  if (permissions) {
    const isAuth = permissions.find((item) => {
      const menuName = item.menu.toLowerCase();
      return menuName === code.toLowerCase() && item[action];
    });
    return !isEmpty(isAuth);
  }
  return false;
};

export const getRolePermission = (flags) => {
  /**
   * To handle intercept response role permissions from attacker
   */
  const permissionRole = Utils.getPermission();

  const digest = permissionRole?.digest;
  const payload = MD5(JSON.stringify(permissionRole?.permissions)).toString();

  const isHaveAccess = digest === payload;

  const isFlagsAccess = (roleName: string) => {
    const flagsName = roleName.replace(/[^A-Z0-9]/gi, '_').toLowerCase();
    return isBoolean(flags[flagsName]) ? flags[flagsName] : true;
  };

  const rolePermissions =
    permissions &&
    permissions.reduce((ac, a) => {
      const menuName = a.menu.toUpperCase();
      const isFlags = isFlagsAccess(menuName);
      const access = {
        ...a,
        id: a?.id,
        is_create: isHaveAccess && isFlags ? a?.is_create : false,
        is_delete: isHaveAccess && isFlags ? a?.is_delete : false,
        is_read: isHaveAccess && isFlags ? a?.is_read : false,
        is_update: isHaveAccess && isFlags ? a?.is_update : false,
        menu: a?.menu,
      };
      return { ...ac, [menuName]: access };
    }, {});
  return rolePermissions || {};
};

export default handleAuth;
