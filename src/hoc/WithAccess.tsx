/* eslint-disable react/display-name */
import React from 'react';
import cookies from '@/src/utils/cookieUtils';
import {checkAccess, CREATE, DELETE, EDIT, READ} from '@/utils/checkPermission';

const {role} = await cookies.getPermission() || {
  role: {},
  permissions: [],
};

const withAccessRole = (roleName) => (Component) => (props: any) => {
  const find = roleName.find((item) => item === role.name);
  if (find) {
    return <Component {...props} />;
  }
  return null;
};

const withAccessCreate = (menu) => (Component) => (props: any) => {
  const find = checkAccess(menu, CREATE);
  if (find) {
    return <Component {...props} />;
  }
  return null;
};

const withAccessRead = (menu) => (Component) => (props: any) => {
  const find = checkAccess(menu, READ);
  if (find) {
    return <Component {...props} />;
  }
  return null;
};

const withAccessEdit = (menu) => (Component) => (props: any) => {
  const find = checkAccess(menu, EDIT);
  if (find) {
    return <Component {...props} />;
  }
  return null;
};


const withAccessDelete = (menu) => (Component) => (props: any) => {
  const find = checkAccess(menu, DELETE);
  if (find) {
    return <Component {...props} />;
  }
  return null;
};

const withAccessExceptRead = (menu) => (Component) => (props: any) => {
  const createAcc = checkAccess(menu, CREATE);
  const editAcc = checkAccess(menu, EDIT);
  const deleteAcc = checkAccess(menu, DELETE);
  if (createAcc || editAcc || deleteAcc) {
    return <Component {...props} />;
  }
  return null;
};


export {
  withAccessRole,
  withAccessCreate,
  withAccessRead,
  withAccessEdit,
  withAccessDelete,
  withAccessExceptRead,
};

