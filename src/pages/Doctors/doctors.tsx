import React, {lazy, useEffect} from 'react';
import cx from 'classnames';
import {TAB_TRANSACTION} from '@/src/constants';
import {useLocation} from 'react-router';
import useDoctors from '@/src/pages/Doctors/useDoctors';
import useFormDoctors from '@/src/pages/Doctors/useFormDoctors';
import {Controller} from 'react-hook-form';
import {SelectBox} from '@/src/components';
import useLoginDoctor from '@/src/pages/Doctors/LoginDoctor/useLoginDoctor';
const DatePicker = lazy(() => import('@/src/components/DatePicker'));
const TabNavigation = lazy(() => import('@/src/components/TabNavigation'));
const Typography = lazy(() => import('@/src/components/Typography'));
const DoctorItem = lazy(() => import('@/src/pages/Doctors/Tabs/DoctorItem'));

const Doctors = () => {
  const search = useLocation().search;
  const type = new URLSearchParams(search).get('tab');
  const clinicId = new URLSearchParams(search).get('clinicId');
  const clinic = new URLSearchParams(search).get('clinic');

  const {
    metadata,
    handleSetParams,
  } = useDoctors();

  const {
    data: {
      healthFacilityOption,
    },
    method: {
      handleGetClinicByDoctor,
    },
  } = useLoginDoctor();

  const {
    control,
  } = useFormDoctors();

  useEffect(() => {
    handleGetClinicByDoctor();
  }, []);

  const tabs = [
    {
      id: TAB_TRANSACTION.SCHEDULED,
      path: `?clinicId=${clinicId}&clinic=${clinic}&tab=${TAB_TRANSACTION.SCHEDULED}`,
      label: `Menunggu Tindakan ${type === TAB_TRANSACTION.SCHEDULED || !type ? `(${metadata.totalRow})` : ''}`,
      component: <>
        <DoctorItem/>
      </>,
    },
    {
      id: TAB_TRANSACTION.ONGOING,
      path: `?clinicId=${clinicId}&clinic=${clinic}&tab=${TAB_TRANSACTION.ONGOING}`,
      label: `Berlangsung ${type === TAB_TRANSACTION.ONGOING || !type ? `(${metadata.totalRow})` : ''}`,
      component: <>
        <DoctorItem/>
      </>,
    },
    {
      id: TAB_TRANSACTION.DONE,
      path: `?clinicId=${clinicId}&clinic=${clinic}&tab=${TAB_TRANSACTION.DONE}`,
      label: `Selesai ${type === TAB_TRANSACTION.DONE || !type ? `(${metadata.totalRow})` : ''}`,
      component: <>
        <DoctorItem/>
      </>,
    },
    {
      id: TAB_TRANSACTION.FAILED,
      path: `?clinicId=${clinicId}&clinic=${clinic}&tab=${TAB_TRANSACTION.FAILED}`,
      label: `Batal Periksa ${type === TAB_TRANSACTION.FAILED || !type ? `(${metadata.totalRow})` : ''}`,
      component: <>
        <DoctorItem/>
      </>,
    },
  ];

  return (
    <div>
      <div className={cx('flex justify-between mb-4')}>
        <div className={cx('w-full')}>
          <Typography variant='h2' color=''>
            Reservasi Klinik/Rawat Jalan
          </Typography>
          <Typography variant='bodyXSmall' color='text-[#9E9E9E]'>
            Transaksi reservasi dari aplikasi Mediverse
          </Typography>
        </div>
        <div className={cx('w-full flex justify-end gap-x-4')}>
          <SelectBox
            defaultValue={{value: clinicId, label: clinic}}
            options={healthFacilityOption}
          />
          <div>
            <Controller
              control={control}
              name='reservation_date'
              render={({field: {onChange, value, name, ref}}) => (
                <DatePicker
                  placeholder='Tanggal Transaksi'
                  selectsRange={false}
                  setStartDate={() => {}}
                  setEndDate={() => {}}
                  maxDate={undefined}
                  isError={''}
                  textError={''}
                  value
                  select={value}
                  useControl={true}
                  onChangeControl={(date) => {
                    handleSetParams('reservationDate', date);
                    onChange(date);
                  }}
                />
              )}
            />
          </div>
        </div>
      </div>
      <div className={cx('bg-white px-6 pb-6 pt-2 rounded-lg')}>
        <TabNavigation gapx={8} data={tabs}/>
      </div>
    </div>
  );
};

export default Doctors;
