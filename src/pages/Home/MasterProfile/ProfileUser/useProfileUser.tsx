import {
  RootStateOrAny,
  useDispatch,
  useSelector,
} from 'react-redux';

import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';

import {
  resetFormChangePassword,
  resetFormMe,
  resolveChangePassword,
  resolveGetMe,
  resolvePutMe,
  setFormChangePassword,
  setFormMe,
  setModal,
  setOpenPassword,
} from '@/src/store/profileUser/profileUser.reducer';

import {
  mapDetailProfileUser,
} from '@/src/mappers/ProfileUser';

import {
  schemaChangePassword,
  schemaFormMe,
} from './validation';

const useProfileUser = () => {
  const dispatch = useDispatch();

  const {
    me,
    formMe,
    isOpenOldPassword,
    isOpenNewPassword,
    formChangePassword,
    isOpenConfirmationNewPassword,
  } = useSelector((state: RootStateOrAny) => state.profileUser);

  const {
    reset: resetChangePassword,
    control: controlFormChangePassword,
    register: registerFormChangePassword,
    formState: {errors: errorsFormChangePassword},
    getValues: getValuesFormChangePassword,
    handleSubmit: onHandleSubmitChangePassword,
  } = useForm({
    resolver: yupResolver(schemaChangePassword),
  });

  const {
    reset: resetMe,
    control: controlFormMe,
    register: registerFormMe,
    formState: {errors: errorsFormMe},
    handleSubmit: onHandleSubmitMe,
  } = useForm({
    resolver: yupResolver(schemaFormMe),
  });

  const handleGetMe = () => {
    dispatch(resolveGetMe());
  };

  const handleSubmitEditMe = () => {
    dispatch(resolvePutMe({
      data: {
        ...me,
        full_name: formMe?.form?.name ? formMe?.form?.name : me?.full_name,
        email: formMe?.form?.email ? formMe?.form?.email : (me?.email || me.mail),
        profile_photo: formMe?.form?.photoProfile ? formMe?.form?.photoProfile : me?.photo_profile,
      },
    }));
  };

  const handleSubmitChangePassword = () => {
    dispatch(resolveChangePassword({
      old_password: formChangePassword.form.oldPassword,
      new_password: formChangePassword.form.newPassword,
    }));
  };

  const handleSetFormMe = (field, value) => {
    dispatch(setFormMe({field, value}));
  };

  const handleSetFormChangePassword = (field, value) => {
    dispatch(setFormChangePassword({field, value}));
  };

  const handleSetModal = (state: string, name: string, value: boolean) => {
    dispatch(setModal({state, name, value}));
  };

  const handleSetOpenPassword = (field, value) => {
    dispatch(setOpenPassword({field, value}));
  };

  const handleResetFormMe = () => {
    dispatch(resetFormMe());
  };

  const handleResetFormChangePassword = () => {
    dispatch(resetFormChangePassword());
  };

  const DATA_DETAIL_PROFILE_USER = mapDetailProfileUser(me);

  return {
    data: {
      me,
      formMe,
      errorsFormMe,
      controlFormMe,
      isOpenOldPassword,
      isOpenNewPassword,
      formChangePassword,
      errorsFormChangePassword,
      DATA_DETAIL_PROFILE_USER,
      controlFormChangePassword,
      isOpenConfirmationNewPassword,
    },
    method: {
      resetMe,
      handleGetMe,
      handleSetModal,
      registerFormMe,
      handleSetFormMe,
      onHandleSubmitMe,
      handleResetFormMe,
      handleSubmitEditMe,
      resetChangePassword,
      handleSetOpenPassword,
      registerFormChangePassword,
      handleSubmitChangePassword,
      getValuesFormChangePassword,
      handleSetFormChangePassword,
      onHandleSubmitChangePassword,
      handleResetFormChangePassword,
    },
  };
};

export default useProfileUser;
