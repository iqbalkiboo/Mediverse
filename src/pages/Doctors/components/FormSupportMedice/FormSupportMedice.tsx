import { Typography } from '@/src/components';
import React from 'react'

const FormSupportMedice = () => {
  return (
    <>
      <div className='flex flex-col gap-4 mt-4'>
        <div>
          <Typography variant='h5' color='' customClass='mb-2'>
            PENUNJANG MEDIS
          </Typography>
          <div>
            Ada Penunjang Medis<span className='text-danger'>*</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default FormSupportMedice