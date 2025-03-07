import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { isEmpty } from 'lodash';

import {
  resetForgotPassword,
  resetStatusForgot,
  resolveForgotPassword,
  resolveGetDetailPharmacy,
  resolveGetDetailProvider,
  resolveGetGeneralSetting,
  resolveGetUserDetail,
  resolveGetUserProviders,
  setForgotEmail,
  setIsErrorForgot,
  setNewPassword,
  setNewRePassword,
  setResetState,
} from '@/store/auth/auth.reducer';
import { clinicDocumentId, outletDocumentId } from '@/src/utils/getDocumentId';
import { REGEX, ROLES } from '@/src/constants';
import cookie from '@/src/utils/cookieUtils';

const useAuth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    isError,
    isLoading,
    validation,
    errorMessage,
    forgot,
    newPassword,
    data,
    userDetails,
    listClinic,
    pharmacy,
    providers,
    general,
  } = useSelector((state: RootStateOrAny) => state.auth);
  const [isOpenPassword, setIsOpenPassword] = useState(false);
  const [isOpenRePassword, setIsOpenRePassword] = useState(false);
  const [roleId, setRoleId] = useState(0);

  const handleSetForgotEmail = (value: string) => {
    const testEmail = REGEX.EMAIL.test(value);
    dispatch(setForgotEmail(value));
    if (!testEmail) {
      dispatch(setIsErrorForgot(true));
    } else {
      dispatch(setIsErrorForgot(false));
    }
  };

  const handleForgotPassword = () => {
    const payload = {
      email: forgot.email,
    };
    dispatch(resolveForgotPassword(payload));
  };

  const handleResetForgotPassword = () => {
    dispatch(resetForgotPassword());
  };

  const handleSetNewPassword = (value: string, key: string) => {
    if (key === 'rePassword') {
      dispatch(setNewRePassword(value));
    } else {
      dispatch(setNewPassword(value));
    }
  };

  const newPasswordValidation = (key: string) => {
    if (key === 'password') {
      const testPassword = REGEX.PASSWORD.test(newPassword.password);
      if (!testPassword && newPassword.password) {
        const message = `min 8
          karakter (angka, hurufkecil, huruf kapital,
          special karakter)`;
        return {
          status: false,
          message,
        };
      }
      return {
        status: true,
        message: '',
      };
    }

    if (key === 'rePassword') {
      const testPassword = REGEX.PASSWORD.test(newPassword.rePassword);
      if (
        newPassword.rePassword &&
        newPassword.password !== newPassword.rePassword
      ) {
        const message = 'Kata sandi anda tidak sama';
        return {
          status: false,
          message,
        };
      }

      if (!testPassword && newPassword.rePassword) {
        const message = `min 8
        karakter (angka, hurufkecil, huruf kapital,
        special karakter)`;
        return {
          status: false,
          message,
        };
      }

      return {
        status: true,
        message: '',
      };
    }
  };

  const getUserDetail = () => {
    dispatch(resolveGetUserDetail());
  };

  const getUserProviders = () => {
    dispatch(resolveGetUserProviders());
  };

  const handleSetRolePermissions = async () => {
    const token = {
      access_token: data?.access_token,
      refresh_token: data?.refresh_token,
      expires_in: data?.expires_in,
    };

    const roles = {
      userId: userDetails?.user_id,
      role: data.role,
      permissions: data.permissions,
      digest: data?.digest,
    };

    setRoleId(data.role.id);
    cookie.setPermission(JSON.stringify(roles));
    cookie.setAuth(JSON.stringify(token));
    dispatch(setResetState());
    getUserDetail();
    getUserProviders();
  };

  const handleResetForgotStatus = () => {
    dispatch(resetStatusForgot());
  };

  const handleDetailProvider = (id, type) => {
    dispatch(resolveGetDetailProvider({ id, type }));
    dispatch(resolveGetGeneralSetting());
  };

  const handleDetailPharmacy = (id) => {
    const payload = {
      id,
      type: userDetails?.provider_type,
    };
    dispatch(resolveGetDetailPharmacy(payload));
  };

  const isNeedDetailProvider = () => {
    const isSuperAdmin = [
      ROLES.SUPER_ADMIN,
      ROLES.SUPER_ADMIN_VIEW_ONLY,
      ROLES.ADMINISTRATOR_MEDIVERSE,
      ROLES.ADMINISTRATOR_MEDIVERSE_VIEW_ONLY,
      ROLES.ADMIN_MARKETING,
      ROLES.ADMINISTRATOR_MARKETING,
    ].includes(roleId);
    return !isSuperAdmin;
  };

  // for get outlet and provider type
  const isNeedProviderType = () => {
    return [
      ROLES.ADMIN_APOTEK,
      ROLES.ADMIN_FASKES,
      ROLES.ADMINISTRATOR_FASYANKES,
      ROLES.OPERATOR_APOTEK,
      ROLES.ADMINISTRATOR_PROVIDER,
      ROLES.OPERATOR_FASKES,
      ROLES.ADMINISTRATOR_PROVIDER_MEDPHARM,
      ROLES.ADMINISTRATOR_PROVIDER_MEDPOINT,
      ROLES.DOKTER,
    ].includes(roleId);
  };

  const handleNavigate = () => {
    if (roleId === ROLES.ADMIN_PASIEN) {
      setTimeout(() => {
        navigate('/front-office');
        location.reload();
      }, 500);
    } else if (roleId === ROLES.DOKTER) {
      setTimeout(() => {
        navigate('/doctors?tab=scheduled');
        location.reload();
      }, 500);
    } else {
      setTimeout(() => {
        navigate('/');
        location.reload();
      }, 500);
    }
  };

  useEffect(() => {
    if (!isEmpty(data)) {
      handleSetRolePermissions();
    }
  }, [data, userDetails]);

  const setDataToLocalStorage = () => {
    cookie.setMyProviders(JSON.stringify(providers.data || []));
    cookie.setUser(
      JSON.stringify({
        ...userDetails,
        provider_name: providers.detail?.name || '',
        type: providers.detail?.type || '',
        image: providers.detail?.image || '',
        outlet_name: pharmacy?.data?.name || '',
        outlet_pic: pharmacy?.data?.pc || '',
        outlet_apa: pharmacy?.data?.apa || '',
        outlet_sipa: pharmacy?.data?.sipa || '',
        outlet_sia: pharmacy?.data?.sia || '',
        outlet_signature_pic: pharmacy?.data?.signaturePic || '',
        outlet_address_street: pharmacy?.data?.address || '',
        role: cookie.getPermission()?.role,
        sellingFactor: providers.detail?.sellingFactor,
        businessSchema: providers.detail?.businessSchema,
        ppn: general.data?.ppn,
      })
    );
  };

  useEffect(() => {
    // Only superadmin
    if (!isNeedDetailProvider()) {
      setDataToLocalStorage();
    }

    if (
      isNeedDetailProvider() &&
      userDetails.provider_type &&
      isNeedProviderType() &&
      providers.detailStatus !== 401 &&
      providers.detailStatus !== 403
    ) {
      setDataToLocalStorage();
      if (
        !isEmpty(userDetails) &&
        !isEmpty(providers.detail) &&
        !isEmpty(pharmacy.data)
      ) {
        handleNavigate();
      } else if (!isEmpty(providers.detail)) {
        handleNavigate();
      }
    } else {
      if (!isEmpty(userDetails)) {
        handleNavigate();
      }
    }
  }, [userDetails, providers, pharmacy, general]);

  // get outlet
  useEffect(() => {
    if (userDetails.provider_id && userDetails.outlet_id) {
      const docId =
        userDetails?.provider_type === 'medpoint'
          ? clinicDocumentId(userDetails.provider_id, userDetails.outlet_id)
          : outletDocumentId(userDetails.provider_id, userDetails.outlet_id);

      handleDetailPharmacy(docId);
    }
    if (userDetails.provider_id && userDetails.provider_type) {
      handleDetailProvider(userDetails.provider_id, userDetails.provider_type);
    }
  }, [userDetails]);

  return {
    isError,
    isLoading,
    isOpenPassword,
    setIsOpenPassword,
    isOpenRePassword,
    setIsOpenRePassword,
    validation,
    errorMessage,
    handleSetForgotEmail,
    forgot,
    listClinic,
    handleForgotPassword,
    handleSetNewPassword,
    newPassword,
    newPasswordValidation,
    getUserDetail,
    handleResetForgotPassword,
    handleResetForgotStatus,
  };
};

export default useAuth;
