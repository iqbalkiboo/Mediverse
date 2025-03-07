import React from 'react';
import {notFoundIcon} from '@/assets/images';


const NotFound = () => {
  return (
    <div className='notFound__container'>
      <img src={notFoundIcon} />
      <p className='text-slate-400 text-center mt-48'>
        Mohon maaf layanan tidak bisa digunkakan saat ini.
        Perikas Koneksi internet anda
      </p>
    </div>
  );
};

export default NotFound;
