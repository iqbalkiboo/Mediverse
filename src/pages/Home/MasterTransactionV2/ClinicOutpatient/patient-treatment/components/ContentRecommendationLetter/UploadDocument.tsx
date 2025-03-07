import { Fragment, useState } from 'react';
import cx from 'classnames';

import { Typography } from '@/src/components';
import { IconUpload } from '@/assets/images';

interface UploadDocumentProps {
  id?: string;
  name?: string;
  onChangeUpload?: (file: any) => void;
}

interface FileInfo {
  name: string;
  size: number;
}

const UploadDocument: React.FC<UploadDocumentProps> = ({
  id = 'upload-file',
  name = 'upload',
  onChangeUpload,
}) => {
  const [file, setFile] = useState<FileInfo | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (event) => {
    const chosenFile = event.target.files[0];
    if (chosenFile) {
      const validTypes = ['image/jpeg', 'image/png', 'application/pdf'];
      const maxSize = 5 * 1024 * 1024; // 5MB in bytes

      if (!validTypes.includes(chosenFile.type)) {
        setError('Invalid file type. Only JPG, PNG, and PDF are allowed.');
        setFile(null);
        return;
      }

      if (chosenFile.size > maxSize) {
        setError('File size exceeds the 5MB limit.');
        setFile(null);
        return;
      }

      setError(null);
      setFile({
        name: chosenFile.name,
        size: chosenFile.size,
      });
      if (onChangeUpload) onChangeUpload(chosenFile);
    }
  };

  return (
    <Fragment>
      <div className='w-full flex flex-col'>
        <div
          className={cx(
            'h-[6rem] w-full flex bg-[#F6F8FA] rounded-lg border border-dashed border-gray-300'
          )}
        >
          <div className='flex-1 flex items-stretch'>
            <label htmlFor={id} className='flex-1 flex cursor-pointer'>
              <div className='self-center text-center ml-8'>
                <div className='flex'>
                  <div>
                    <img
                      src={IconUpload}
                      alt='Ilustration'
                      className='h-14 w-14'
                    />
                  </div>

                  <div className='flex flex-col self-center gap-2 ml-6'>
                    <Typography
                      variant='bodyBase'
                      color=''
                      customClass='font-bold'
                    >
                      {file?.name || 'Select or Drag Document'}
                    </Typography>
                    <Typography
                      variant='bodyBase'
                      color='text-[#64748B]'
                      customClass='text-start'
                    >
                      {file?.size
                        ? `${(file.size / 1024).toFixed(2)} KB`
                        : 'jpg, png or pdf (max 5 mb)'}
                    </Typography>
                  </div>
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
              </div>
              <input
                id={id}
                name={name}
                type='file'
                onChange={handleFileChange}
                className='w-full cursor-pointer'
                hidden
              />
            </label>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default UploadDocument;
