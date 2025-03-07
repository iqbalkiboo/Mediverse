import {yupResolver} from '@hookform/resolvers/yup';
import {useForm} from 'react-hook-form';
import {RootStateOrAny, useDispatch, useSelector} from 'react-redux';
import formValidation from './validation';
import {
  resolveLoginService,
  setErrorMessage,
  setIsErrorUsername,
  setIsValidValidation,
  setPassword,
  setUsername,
} from '@/src/store/auth/auth.reducer';
import {REGEX} from '@/src/constants';

const useFormAuth = () => {
  const dispatch = useDispatch();
  const {
    username,
    password,
    isError,
    errorMessage,
    isLoading,
    validation,
  } = useSelector((state: RootStateOrAny) => state.auth);

  const {register, handleSubmit, reset, formState: {errors}, getValues} = useForm({
    resolver: yupResolver(formValidation),
  });

  const handleUsername = (value: string) => {
    const testEmail = REGEX.EMAIL.test(value);
    dispatch(setUsername(value));
    if (!testEmail) {
      dispatch(setIsValidValidation(false));
      dispatch(setIsErrorUsername('Email yang anda masukkan belum sesuai'));
    } else {
      dispatch(setIsValidValidation(true));
      dispatch(setIsErrorUsername(''));
    }
  };

  const handleSetPassword = (value: string) => {
    dispatch(setPassword(value));
  };

  const handleSetErrorMessage = (value: string) => {
    dispatch(setErrorMessage(value));
  };

  const handleOnKeyDown = (event) => {
    if (event.keyCode === 13) {
      handleActionLogin(getValues());
    }
  };

  const isSuspenseAccount = errorMessage === 'Account disabled';

  const handleActionLogin = (data) => {
    const payload = {
      username: data.username,
      password: data.password,
    };
    dispatch(resolveLoginService(payload));
  };

  return {
    reset,
    register,
    handleSubmit,
    isError,
    isLoading,
    username,
    password,
    handleUsername,
    handleSetPassword,
    handleActionLogin,
    handleSetErrorMessage,
    validation,
    errorMessage,
    errors,
    handleOnKeyDown,
    isSuspenseAccount,
  };
};

export default useFormAuth;
