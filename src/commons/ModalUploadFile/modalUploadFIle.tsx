import React, {useState} from 'react';
import cx from 'classnames';
import {
  CloseIcon,
  DocumentIcon,
  DownloadFileIcon,
  UploadFileIcon,
} from '@/src/assets/images/svg';
import {
  Button,
  Card,
  Modal,
  Spinner,
  Typography,
} from '@/src/components';

const ModalHeader = ({closeModal}: any) => {
  return (
    <div className={cx('flex', 'justify-between', 'items-center mb-4')}>
      <Typography variant={'h1'} color='text-primary'>Unggah File</Typography>
      <button style={{
        backgroundColor: 'transparent',
        borderWidth: 0,
      }}
      onClick={() => closeModal()}>
        <CloseIcon
        />
      </button>
    </div>
  );
};

const ModalUploadFIle = ({
  open,
  detail,
  setModal,
  ...props
}: any) => {
  const [uploadedFile, setFile] = useState<any>('');
  const [overSize, setOverSize] = useState<boolean>(false);
  const [fileIsValid, setFileIsValid] = useState<boolean>(true);

  const uploadFileCallback = async (event: React.FormEvent<HTMLInputElement>) => {
    const files = event.target['files'];
    const sizeFiles = files.item(0).size;
    const file: File | null = !!files && files.length > 0 ? files[0] : null;
    if (file) {
      const extension = /^.+\.([^.]+)$/.exec(file.name);
      const fileExtension = extension === null ? '' : extension[1];
      const isValidExtension = fileExtension === 'csv';
      if (sizeFiles > 3500000) {
        setOverSize(true);
      } else {
        setOverSize(false);
      }
      if (file.type !== '.xls' && isValidExtension === false) {
        clearFileUploaded();
      } else {
        if (fileExtension === 'csv') {
          setFileIsValid(true);
          setFile(file);
        } else {
          setFileIsValid(false);
          /**TODO: will use later */
          // readXlsxFile(file).then((rows) => {
          //   setFileIsValid(true);
          //   setFile(file);
          // }).catch((e) => {
          //   setFileIsValid(false);
          // });
        }
      }
    }
  };

  const clearFileUploaded = () => {
    setFile(null);
  };

  return (
    <Modal
      open={open}
      onClose={setModal}
      header={<ModalHeader closeModal={() => setModal()}/>}
    >
      <div className={cx('w-full')}>
        <div className={cx('w-full mb-4')}>
          <Typography variant={'h4'} color=''>Berkas</Typography>
          <div
            onClick={() => props.onDownload()}
            className={cx('flex', 'justify-between border-b-1 my-2 pb-3 hover:cursor-pointer')}
          >
            format_file.csv
            {
              props.isDownloading ?
              <Spinner/>:
              <DownloadFileIcon/>
            }
          </div>
          <Typography variant={'bodySmall'} color='text-primary'>
            *download berkas untuk menyesuaikan format file untuk diupload
          </Typography>
          {
            props.isErrorDownload && (
              <div className={cx('flex justify-center mt-4 bg-red-600 rounded-sm px-3 py-2 w-full')}>
                <Typography variant={'bodySmall'} color='text-white'>
                  Terjadi kesalahan, silahkan coba kembali.
                </Typography>
              </div>
            )
          }
        </div>
        <div className={cx('w-full')}>
          <Typography variant={'h4'} color='' customClass={'mb-2'}>
            Upload Berkas
          </Typography>
          {props.children}
          <Card
            background='bg-graySeptenary'
            customClassName='border-1 my-2 w-[937px] h-[176px] grid content-center justify-items-center'
          >
            <div className={cx('grid content-center justify-items-center gap-y-8')}>
              {!uploadedFile ?
                <DocumentIcon/>:
                <div className='w-full'>
                  <Typography variant={'bodyBase'} color=''>
                    {uploadedFile.name}
                  </Typography>
                </div>
              }
              <label htmlFor='upload-file'>
                <div className={cx('flex justify-center rounded-lg cursor-pointer tracking-[0.078em] duration-700',
                    'items-center gap-x-4 w-full apply h-6 pl-2 py-4 text-[10px] font-bold',
                    'text-white bg-primary hover:bg-electricPurpleHover focus:border-electricPurpleHoverBorder',
                    'focus:bg-electricPurplePressed border-primary border-1 focus:border-2;',
                )}>
                  <UploadFileIcon/>
                  UNGGAH
                  <label htmlFor='upload-file'></label>
                </div>
                <input
                  id="upload-file"
                  type="file"
                  className="hidden"
                  accept='.csv'
                  onInput={(e) => {
                    uploadFileCallback(e);
                  }}
                />
              </label>
            </div>
          </Card>
          {overSize &&(
            <div className={cx('bg-red-600 p-1 text-center text-white')}>
              <Typography variant={'bodySmall'} color=''>
                Ukuran File lebih dari 3,5MB
              </Typography>
            </div>
          )}
          <Typography variant={'bodySmall'} color=''>
            * Format file wajib .csv
          </Typography>
          {
            props.isErrorUpload && (
              <div className={cx('flex justify-center mt-4 bg-red-600 rounded-sm px-3 py-2 w-full')}>
                <Typography variant={'bodySmall'} color='text-white'>
                  Terjadi kesalahan, silahkan coba kembali.
                </Typography>
              </div>
            )
          }
          {
            !fileIsValid && (
              <div className={cx('flex justify-center mt-4 bg-red-600 rounded-sm px-3 py-2 w-full')}>
                <Typography variant={'bodySmall'} color='text-white'>
                  File tidak valid
                </Typography>
              </div>
            )
          }
        </div>
        <div className={cx('relative w-[25%] left-[75%] my-6')}>
          <Button
            disabled={props.isDisableSubmit || overSize}
            onClick={() => props.onUpload(uploadedFile)}
            class='primary'
            text='SIMPAN'
            size='md'
            loading={props.isUploading}
          />
        </div>
      </div>
    </Modal>
  );
};

export default ModalUploadFIle;
