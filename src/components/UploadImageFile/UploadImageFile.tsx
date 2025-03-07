import { useEffect, useState } from 'react';
import cx from 'classnames';

import { AlertIcon, CameraIcon, TrashIcon } from '@/src/assets/images/svg';
import { attachmentApi } from '@/src/client/attachment';
import Typography from '@/src/components/Typography';

interface Props {
  id?: string;
  cameraIcon?: boolean;
  placeHolder: string;
  label?: string;
  required?: boolean;
  description?: string;
  errorMessage?: string;
  editImageUrl?: string;
  name?: string;
  register?: any;
  handleSetImage?: any;
  handleSetFile?: any;
  value?: any;
  clearImage?: any;
  labelText?: string;
  labelTextStyle?: string;
  labelColor?: string;
  inputRef?: any;
  setImageState?: any;
  showDescription?: any;
  isLocalUploaded?: boolean;
  customClassName?: string;
  maxHeight?: number;
  maxWidth?: number;
  isBanner?: boolean;
  containerWidth?: string;
  containerHeight?: string;
  disabled?: boolean;
}

const UploadImageFile: React.FC<Props> = ({
  id = 'create-input-upload',
  cameraIcon = false,
  placeHolder,
  label = '',
  required = false,
  description = '',
  errorMessage = '',
  editImageUrl = '',
  name = 'image',
  register = () => {},
  handleSetImage = () => {},
  handleSetFile = () => {},
  clearImage = () => {},
  value = '',
  labelText = 'Pilih Icon',
  labelTextStyle,
  labelColor = 'text-primary',
  inputRef,
  showDescription = true,
  isLocalUploaded = false,
  customClassName,
  maxHeight = 0,
  maxWidth = 0,
  isBanner = false,
  containerWidth = 'w-[108px]',
  containerHeight = 'h-[108px]',
  disabled = false,
}) => {
  const [image, setImage] = useState<any>('');
  const [file, setFile] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState(errorMessage);
  const fields = register(name, { required: required });

  const [isLoading, setIsLoading] = useState(false);
  const [key, setKey] = useState(0);

  useEffect(() => {
    if (editImageUrl !== '') {
      setImage(editImageUrl);
      handleSetImage(name, editImageUrl);
      fields?.onChange({ target: { name: name, value: editImageUrl } });
    }
  }, [editImageUrl]);

  useEffect(() => {
    if (value) {
      clearImage('');
    }
    if (image !== '') {
      handleSetImage(name, image);
      fields?.onChange({ target: { name: name, value: image } });
    }
  }, [image]);

  useEffect(() => {
    if (file) {
      handleSetFile(name, file);
    }
  }, [file]);

  const uploadImageCallBack = async (
    event: React.FormEvent<HTMLInputElement>
  ) => {
    const files = event.target['files'];
    const file: File | null = !!files && files.length > 0 ? files[0] : null;
    const fileReader = new FileReader();
    const img = new Image();
    if (file) {
      fileReader.readAsDataURL(file);
      fileReader.onloadend = function () {
        img.src = String(fileReader.result);
      };
      img.onload = async () => {
        const { height, width } = img;

        const bannerValidation =
          isBanner && (height > maxHeight || width > maxWidth);
        const extension = /^.+\.([^.]+)$/.exec(file.name);
        const fileExtension = extension === null ? '' : extension[1];
        const isImage =
          fileExtension === 'png' ||
          fileExtension === 'jpg' ||
          fileExtension === 'jpeg';
        const isMaxSize = file?.size! >= 5242880;
        if (
          (file.type.split('/')[0] !== 'image' && !isImage) ||
          isMaxSize ||
          bannerValidation
        ) {
          clearImageUploaded(event);
          if (isMaxSize) {
            setErrorMsg('File yang Anda tambahkan melebihi 5 mb');
          }
          if (bannerValidation) {
            setErrorMsg(
              'File yang ditambahkan melebihi panjang dan lebar yang ditentukan'
            );
          }
        } else {
          setErrorMsg('');
          try {
            setIsLoading(true);
            const response = await attachmentApi(file);
            const { data } = response;
            setImage(data.url);
            setIsLoading(false);
          } catch (error) {
            setErrorMsg('Gagal upload data');
          }
        }
      };
    }
  };

  const uploadImageLocal = (event: React.FormEvent<HTMLInputElement>) => {
    const files = event.target['files'];
    const file: File | null = !!files && files.length > 0 ? files[0] : null;
    const fileReader = new FileReader();
    const img = new Image();
    if (file) {
      fileReader.readAsDataURL(file);
      fileReader.onloadend = function () {
        img.src = String(fileReader.result);
      };

      img.onload = () => {
        const { height, width } = img;
        const bannerValidation =
          isBanner && (height !== maxHeight || width !== maxWidth);
        const extension = /^.+\.([^.]+)$/.exec(file.name);
        const fileExtension = extension === null ? '' : extension[1];
        const isImage =
          fileExtension === 'png' ||
          fileExtension === 'jpg' ||
          fileExtension === 'jpeg';
        const isMaxSize = file?.size! >= 5242880;
        if (
          (file.type.split('/')[0] !== 'image' && !isImage) ||
          isMaxSize ||
          bannerValidation
        ) {
          clearImageUploaded(event);
          if (isMaxSize) {
            setErrorMsg('File yang Anda tambahkan melebihi 5 mb');
          }
          if (bannerValidation) {
            setErrorMsg(
              'File yang ditambahkan melebihi panjang dan lebar yang ditentukan'
            );
          }
        } else {
          setErrorMsg('');
          setFile(files[0]);
          setImage(URL.createObjectURL(files[0]));
        }
      };
    }
  };

  const clearImageUploaded = (event) => {
    event.target.value = null;
    setFile('');
    setImage('');
    handleSetImage(name, '');
    fields?.onChange({ target: { name: name, value: '' } });
  };

  const handleFileSelect = () => {
    setKey((prevKey) => prevKey + 1); // Increment key value to force re-render
  };

  return (
    <div>
      {label && (
        <div className={cx('mb-2 flex')}>
          <Typography variant='bodySmall' color=''>
            {label}
          </Typography>
          {required && <span className={cx('text-danger')}>*</span>}
        </div>
      )}
      <div
        className={cx(
          'relative rounded-md mb-2',
          'bg-whiteNeutral',
          'flex justify-centeritems-center border-dashed border-2',
          `${customClassName}`,
          `${containerWidth}`,
          `${containerHeight}`
        )}
      >
        <input
          key={key}
          onChange={handleFileSelect}
          ref={fields?.ref}
          id={id}
          placeholder={placeHolder}
          type='file'
          accept='image/png, image/jpg, image/jpeg'
          className='hidden'
          name={fields?.name}
          onInput={(e) => {
            register && isLocalUploaded && uploadImageLocal(e);
            !isLocalUploaded && uploadImageCallBack(e);
          }}
          disabled={disabled}
        />
        {!image && !value ? (
          <label
            htmlFor={id}
            className={cx(
              'flex flex-col justify-center items-center w-full',
              `${labelTextStyle}`
            )}
          >
            {cameraIcon && <CameraIcon />}
            <Typography
              variant={'bodyXSmall'}
              color={labelColor}
              customClass={'text-center'}
            >
              {isLoading ? 'Loading...' : labelText}
            </Typography>
          </label>
        ) : (
          <>
            {!disabled && (
              <div className='absolute top-1 right-1 bg-white rounded-full p-1 hover:bg-slate-400'>
                <button className='flex' onClick={(e) => clearImageUploaded(e)}>
                  <TrashIcon />
                </button>
              </div>
            )}
            <img
              className='w-full h-full object-contain'
              src={`${value}` || image}
              alt='icon kategori'
            />
          </>
        )}
      </div>
      {(errorMsg || errorMessage) && (
        <div className={cx('flex my-2 items-center')}>
          <div className={cx('w-5 h-5 mr-1 flex items-center')}>
            <AlertIcon color='#921919' />
          </div>
          <Typography variant='bodyXSmall' color='text-danger'>
            {errorMsg === '' ? errorMessage : errorMsg}
          </Typography>
        </div>
      )}
      {showDescription && (
        <>
          {description !== '' ? (
            <Typography variant={'bodyXSmall'} color='text-grayPrimary'>
              {description}
            </Typography>
          ) : (
            <>
              <Typography variant={'bodyXSmall'} color='text-grayPrimary'>
                *Format wajib .jpg/.jpeg/.png
              </Typography>
              {isBanner && (
                <Typography variant={'bodyXSmall'} color='text-grayPrimary'>
                  *Format wajib berukuran ({maxWidth} x {maxHeight})
                </Typography>
              )}
              <Typography variant={'bodyXSmall'} color='text-grayPrimary'>
                *Maksimal file size 5 mb
              </Typography>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default UploadImageFile;
