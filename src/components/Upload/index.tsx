import React, { ChangeEvent, Fragment, useState } from 'react';
import { AlertIcon, TrashIcon } from '@/src/assets/images/svg';
import cx from 'classnames';
import { Typography } from '@/src/components';
import { uploadFiles } from '@/src/utils/uploadFile';

interface IProps {
  id?: string;
  name?: string;
  thumbnail?: string;
  placeholder?: string;
  handleUpload?: (payload: string) => void;
  onChangeUpload?: (event: ChangeEvent<HTMLInputElement>) => void;
  onDelete?: (payload: boolean) => void | undefined;
  register?: any;
  required?: boolean;
  isValid?: boolean;
  errorMessage?: string;
}

const UploadFile: React.FC<IProps> = (props) => {
  const {
    id,
    placeholder,
    name,
    errorMessage,
    register = () => {},
    thumbnail,
    onChangeUpload = () => {},
    handleUpload = () => {},
    onDelete = () => {},
  } = props;

  const fields = register(name, { required: true });
  const [state, setState] = useState({
    thumbnailUpload: thumbnail,
  });

  const onEventUpload = async (file: ChangeEvent<HTMLInputElement>) => {
    const files: FileList | any = file.target.files;
    let url: string = '';
    // const url = URL.createObjectURL(files[0]);
    try {
      url = await uploadFiles(files[0]);
    } catch (error) {
      console.log('error');
    }

    onChangeUpload(file);
    onChangeState('thumbnailUpload', url);
    handleUpload(url);
  };

  const onDeleteThumbnail = () => {
    onChangeState('thumbnailUpload', '');
    onDelete(true);
  };

  const onChangeState = (key: string, payload: any) => {
    setState((prevState) => ({
      ...prevState,
      [key]: payload,
    }));
  };

  return (
    <Fragment>
      <div className='flex flex-col relative'>
        <div
          className={cx(
            'flex bg-white rounded-lg border w-1/2 h-[9rem]',
            !state.thumbnailUpload
              ? 'border-dashed border-primary w-1/2 h-[9rem]'
              : ''
          )}
        >
          {state.thumbnailUpload ? (
            <div className='flex relative w-full'>
              <img
                className='w-full object-contain'
                src={state.thumbnailUpload}
                alt='upload'
              />
              <div
                className={cx('absolute top-2 right-3 cursor-pointer')}
                onClick={() => {
                  onDeleteThumbnail();
                  fields.onChange({ target: { name: 'upload', value: [] } });
                }}
              >
                <TrashIcon color='#921919' />
              </div>
            </div>
          ) : (
            <div className='flex-1 flex items-stretch cursor-pointer'>
              <label htmlFor={id} className='flex-1 flex justify-center'>
                <div className='self-center text-center'>{placeholder}</div>
                <input
                  type='file'
                  accept='image/*'
                  id={id}
                  ref={fields?.ref}
                  name={fields?.name}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    fields?.onChange(e);
                    onEventUpload(e);
                  }}
                  className='w-full cursor-pointer'
                  hidden
                />
              </label>
            </div>
          )}
        </div>
        {errorMessage && (
          <div className={cx('flex mt-2 items-center')}>
            <div className={cx('w-5 h-5 mr-1 flex items-center')}>
              <AlertIcon color='#921919' />
            </div>
            <Typography variant='bodyXSmall' color='text-danger'>
              {errorMessage}
            </Typography>
          </div>
        )}
      </div>
    </Fragment>
  );
};

UploadFile.defaultProps = {
  id: 'upload-file',
  name: 'upload',
  placeholder: 'Pilih Foto',
  onChangeUpload: () => {},
  handleUpload: () => {},
  onDelete: () => {},
  register: () => {},
};

export default UploadFile;
