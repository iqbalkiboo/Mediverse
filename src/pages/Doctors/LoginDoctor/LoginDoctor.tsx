import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import cx from 'classnames';

import { Button, Typography } from '@/src/components';
import { SpinnerScreen } from '@/src/commons';
import { ChevronRightIcon } from '@/src/assets/images/svg';
import useLoginDoctor from '@/src/pages/Doctors/LoginDoctor/useLoginDoctor';

const LoginDoctor = () => {
  const navigate = useNavigate();

  const {
    data: { placement, healthFacilities },
    method: { handleGetClinicByDoctor },
  } = useLoginDoctor();

  useEffect(() => {
    handleGetClinicByDoctor();
  }, []);

  return (
    <>
      <SpinnerScreen open={placement.status.isLoading} />

      <div
        className={cx(
          'h-[calc(100vh-80px)] w-full flex flex-col justify-center items-center bg-white p-4'
        )}
      >
        {healthFacilities.length === 0 &&
          !placement.status.isLoading &&
          !placement.status.isError && (
            <>
              <Typography variant='xh2' color=''>
                Anda belum terasosiate ke clinic manapun
              </Typography>
            </>
          )}
        {healthFacilities.length >= 1 && (
          <>
            <Typography variant='xh2' color=''>
              Pilih Login Untuk Faskes
            </Typography>
            <Typography
              variant='subtitle3'
              color='text-[#6C6866]'
              customClass='mt-2'
            >
              Pilih fasilitas kesehatan tempat praktik Anda sekarang
            </Typography>
          </>
        )}
        {placement.status.isError && (
          <>
            <Typography variant='xh2' color=''>
              Terjadi Kesalahan
            </Typography>
            <Typography
              variant='subtitle3'
              color='text-[#6C6866]'
              customClass='mt-2'
            >
              {placement.status.message}
            </Typography>
            <div className={cx('mt-4')}>
              <Button onClick={handleGetClinicByDoctor} text='Reload' />
            </div>
          </>
        )}
        <div
          className={cx(
            'flex flex-col justify-center items-center w-[398px] mt-14'
          )}
        >
          {healthFacilities.map((item, idx) => {
            return (
              <div
                key={idx}
                className={cx(
                  'flex justify-between items-center',
                  'p-4 w-full h-[88px] hover:bg-[#F2F3F3] cursor-pointer rounded-lg'
                )}
                onClick={() => {
                  navigate(
                    `/doctors?clinicId=${item.id}&clinic=${item.name}&tab=scheduled`
                  );
                  navigate(0);
                }}
              >
                <div className={cx('flex justify-center items-center')}>
                  <img
                    src={item.image}
                    alt='fasilitas-kesehatan'
                    className={cx('rounded-full w-14 h-14')}
                  />
                  <div
                    className={cx(
                      'flex flex-col gap-y-2 justify-center items-start ml-4'
                    )}
                  >
                    <Typography variant='h4' color=''>
                      {item.name}
                    </Typography>
                    <Typography variant='bodyXSmall' color='text-[#757575]'>
                      {item.address}
                    </Typography>
                  </div>
                </div>
                <ChevronRightIcon />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default LoginDoctor;
