import React, {useEffect, useState} from 'react';
import cx from 'classnames';
import {attachmentApi} from '@/src/client/attachment';
import Typography from '@/src/components/Typography';
import {AlertIcon, TrashIcon, UploadIcon} from '@/src/assets/images/svg';

interface Props {
  label: string;
  required: boolean;
  description?: string;
  errorMessage?: string;
  editPdfUrl?: string;
  name?: string;
  register?: any;
  handleSetFile?: any;
  value?: any;
  clearPdf?: any;
  labelText?: string;
  labelColor?: string;
  height?: number;
}

const UploadPdfFile: React.FC<Props>= ({
  label,
  required,
  description = '',
  errorMessage = '',
  editPdfUrl = '',
  name = 'pdf',
  register = () => {},
  handleSetFile = () => {},
  clearPdf = () => {},
  value = '',
  labelText = 'Upload',
  labelColor = 'text-[#9E9E9E]',
  height = 108,
}) => {
  const [pdf, setPdf] = useState<any>('');
  const [key, setKey] = useState(0);

  useEffect(() => {
    if (editPdfUrl !== '') {
      setPdf(editPdfUrl);
    }
  }, [editPdfUrl]);

  useEffect(() => {
    if (value) {
      clearPdf('');
    }
    if (pdf !== '') {
      handleSetFile(name, pdf);
    }
  }, [pdf]);

  const uploadPdfCallback = async (event: React.FormEvent<HTMLInputElement>) => {
    const files = event.target['files'];
    const file: File | null = !!files && files.length > 0 ? files[0] : null;
    if (file) {
      const extension = /^.+\.([^.]+)$/.exec(file.name);
      const fileExtension = extension === null ? '' : extension[1];
      const isPDF = fileExtension === 'pdf';
      if (file.type !== 'application/pdf' && isPDF === false) {
        clearPdfUploaded();
      } else {
        try {
          const response = await attachmentApi(file);
          const {data} = response;
          setPdf(data.url);
          setKey((prevKey) => prevKey + 1); // Increment key value to force re-render
        } catch (error) {
          console.log(error);
        }
      }
    }
  };

  const clearPdfUploaded = () => {
    setPdf(null);
  };

  return (
    <div>
      {label && (
        <div className={cx('mb-2 flex')}>
          <Typography variant='bodySmall' color=''>{label}</Typography>
          {required && <span className={cx('text-danger')}>*</span>}
        </div>
      )}
      <div
        className={cx(`relative rounded-md mb-2  w-full
        bg-whiteNeutral flex justify-center items-center border-dashed border-2 h-[${height}px]`)}
      >
        <input
          key={key}
          id="create-input-pdf"
          type="file"
          accept="application/pdf"
          className="hidden"
          name={name}
          {...register(name, {
            required,
          })}
          onInput={(e) => {
            uploadPdfCallback(e);
          }}
        />
        {!pdf && !value ? (
          <label htmlFor="create-input-pdf" className={cx('flex flex-col justify-center items-center')}>
            <div className="mb-2">
              <UploadIcon color='#9E9E9E' />
            </div>
            <Typography variant='bodyXSmall' color={labelColor}>
              {labelText}
            </Typography>
          </label>
        ) : (
          <>
            <div className='absolute top-1 right-1 bg-white rounded-full p-1 hover:bg-slate-400'>
              <button className='flex' onClick={() => clearPdfUploaded()}>
                <TrashIcon />
              </button>
            </div>
            <div className='overflow-hidden'>
              <object data={`${value}` || pdf} type="application/pdf" width={height * 3}height={height} />
            </div>
          </>
        )}
      </div>
      {errorMessage && (
        <div className={cx('flex my-2 items-center')}>
          <div className={cx('w-5 h-5 mr-1 flex items-center')}>
            <AlertIcon color='#921919' />
          </div>
          <Typography variant='bodyXSmall' color='text-danger'>{errorMessage}</Typography>
        </div>
      )}
      {
        description !== '' ?
        <Typography variant={'bodyXSmall'} color='text-grayPrimary'>
          {description}
        </Typography> :
        <>
          <Typography variant={'bodyXSmall'} color='text-grayPrimary'>
            *Format wajib .pdf
          </Typography>
          <Typography variant={'bodyXSmall'} color='text-grayPrimary'>
            *Maksimal file size 5 mb
          </Typography>
        </>
      }
    </div>
  );
};

export default UploadPdfFile;
