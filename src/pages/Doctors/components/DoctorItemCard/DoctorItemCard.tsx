import { useLocation, useNavigate } from 'react-router';
import cx from 'classnames';

import { Badges, Button, Typography } from '@/src/components';
import { formatDateEng, formatDateWithTime } from '@/src/utils/formatDate';
import { reservationStatusText } from '@/src/utils/reservationStatus';
import {
  ALL_MODULES,
  RESERVATION_STATUS_RESPONSE,
  ROUTES_TRANSACTION,
} from '@/src/constants';
import useDoctors from '@/src/pages/Doctors/useDoctors';
import { withAccessRead } from '@/src/hoc/WithAccess';

import { func, object } from 'prop-types';

const ButtonAction = withAccessRead(ALL_MODULES.TRANSACTION_MEDPOINT_ORDER)(
  Button
);

const DoctorItemCard = ({ data, onChange }) => {
  const navigate = useNavigate();
  const search = useLocation().search;
  const clinicId = new URLSearchParams(search).get('clinicId');
  const clinic = new URLSearchParams(search).get('clinic');
  const { handleSetIsOpenModal, handleSetIdDoctor } = useDoctors();

  const orderNumber = `MDV/${formatDateEng(
    new Date(data.createdAt * 1000),
    ''
  )}/PNT/${data.id}`;

  return (
    <>
      <div className={cx('w-full min-h-[120px] flex flex-col gap-[10px]')}>
        {/* Header Card */}
        <div className={cx('w-full h-full flex justify-between')}>
          <div className={cx('flex items-center')}>
            <Badges
              status={data.status}
              message={reservationStatusText(data.status)}
              reservation
            />
            <div className='ml-4'>
              <button onClick={() => onChange(data.id, 'detail')}>
                <Typography
                  variant='bodySmall'
                  color='text-primary'
                  customClass='underline'
                >
                  Detail Pesanan
                </Typography>
              </button>
            </div>
          </div>
          <div className={cx('flex items-center')}>
            <Typography variant='bodyBase' color=''>
              <span className='mr-1'>Tanggal Transaksi :</span>
              {formatDateWithTime(new Date(data.createdAt * 1000))}
            </Typography>
          </div>
        </div>
        {/* Content Card */}
        <div className={cx('w-full h-full flex justify-between gap-2 mt-1')}>
          {/* Mediverse Number Ticket */}
          <div className={cx('w-2/12')}>
            <div className={cx('mt-1')}>
              <Typography variant='bodySmall' color='text-gray-500'>
                No Antrian:
              </Typography>
              <Typography variant='h4' color='' customClass='font-medium mt-1'>
                {data?.id ? `E-${data.id}` : '-'}
              </Typography>
            </div>
          </div>
          {/* Patient Name */}
          <div className={cx('w-2/12')}>
            <div className={cx('mt-1')}>
              <Typography variant='bodySmall' color='text-gray-500'>
                Pasien:
              </Typography>
              <Typography variant='h4' color=''>
                {data.patientName ?? '-'}
              </Typography>
            </div>
            <div className='my-6'>
              <Typography variant='bodySmall' color='text-gray-500'>
                Penjamin:
              </Typography>
              <Typography
                variant='bodySmall'
                color=''
                customClass='font-medium mt-1'
              >
                {data.poli ?? '-'}
              </Typography>
            </div>
          </div>

          <div className='w-2/12'></div>

          {/* Service/Doctor Name and Type */}
          <div className={cx('w-2/12')}>
            <div className={cx('mt-1')}>
              <Typography variant='bodySmall' color='text-gray-500'>
                Nama Layanan:
              </Typography>
              <Typography
                variant='bodySmall'
                color=''
                customClass='font-medium mt-1'
              >
                {data.serviceName ?? '-'}
              </Typography>
            </div>
            <div className='my-6 max-w-[197px]'>
              <Typography variant='bodySmall' color='text-gray-500'>
                Jenis Layanan:
              </Typography>
              <Typography
                variant='bodySmall'
                color=''
                customClass='font-medium mt-1'
              >
                {data.serviceType ?? '-'}
              </Typography>
            </div>
          </div>

          <div className='w-2/12'></div>

          {/* Poli */}
          {/* <div className={cx('w-2/12')}>
            <div className={cx('mt-1')}>
              <Typography variant='bodySmall' color='text-gray-500'>
                Poli:
              </Typography>
              <Typography variant='h4' color=''>
                {data.poli ?? '-'}
              </Typography>
            </div>
          </div> */}
          {/* Reservation Date */}
          {/* <div className={cx('w-2/12')}>
            <div className={cx('mt-1')}>
              <Typography variant='bodySmall' color='text-gray-500'>
                Tanggal Reservasi:
              </Typography>
              <Typography variant='h4' color=''>
                {`${data.reservationDate} ${data.reservationTime}`}
              </Typography>
            </div>
          </div> */}
          {/* Button Action */}
          <div
            className={cx('w-3/12 h-full self-center gap-y-2 flex flex-col')}
          >
            {/* TODO: NOT YET CHECKED */}
            {data.status === RESERVATION_STATUS_RESPONSE.SCHEDULED && (
              <div
                className={cx('w-full flex justify-center items-center ml-2')}
              >
                <ButtonAction
                  class={cx('primary')}
                  text='Mulai Periksa'
                  size='md'
                  onClick={() => {
                    navigate(
                      `/doctor-check/${data.id}?clinicId=${clinicId}&clinic=${clinic}/${data.id}`
                    );
                    handleSetIsOpenModal('startCheckup', false);
                    handleSetIdDoctor(data.id);
                  }}
                />
              </div>
            )}
            {data.status !== RESERVATION_STATUS_RESPONSE.SCHEDULED && (
              <div
                className={cx('w-full flex justify-center items-center ml-2')}
              >
                <Button
                  class={cx('primary')}
                  text='Lihat Detail'
                  size='md'
                  // eslint-disable-next-line max-len
                  onClick={() =>
                    navigate(
                      `/doctor/${data.id}?clinicId=${clinicId}&clinic=${clinic}`
                    )
                  }
                />
              </div>
            )}
            <div className={cx('w-full flex justify-center items-center ml-2')}>
              {data.status === RESERVATION_STATUS_RESPONSE.SCHEDULED && (
                <Button
                  onClick={() => {
                    onChange(data.id, 'canceled', clinicId);
                  }}
                  // class={cx('reject outline')}
                  class='reject-outline'
                  text='Batalkan'
                  size='md'
                />
              )}
              {data.status === RESERVATION_STATUS_RESPONSE.IN_PROGRESS && (
                <Button
                  onClick={() => {
                    onChange(
                      data.id,
                      RESERVATION_STATUS_RESPONSE.FINISH,
                      clinicId
                    );
                  }}
                  class={cx('primary')}
                  text='Selesai'
                  size='md'
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

DoctorItemCard.propTypes = {
  data: object,
  onChange: func,
};

export default DoctorItemCard;
