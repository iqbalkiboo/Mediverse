import { useEffect } from 'react';
import { useParams } from 'react-router';
import cx from 'classnames';

import {
  Breadcrumb,
  Button,
  ButtonBack,
  Card,
  TextInput,
  Typography,
} from '@/src/components';
import { ModalError, SpinnerScreen } from '@/src/commons';
import { EditIcon } from '@/src/assets/images/svg';
import { ALL_MODULES, ROUTES_PRODUCT } from '@/src/constants';
import { withAccessEdit } from '@/src/hoc/WithAccess';
import { formatDate } from '@/utils/formatDate';
import { modifyServiceTypeMedpoint } from '@/utils/transactions';
import FormModalSlotReservation from '../FormModalSlotReservation';
import useSlotReservations from '@/src/pages/Home/MasterProduct/SlotReservations/useSlotReservations';

import './slotReservation.css';

const ButtonSlotReservation = withAccessEdit(
  ALL_MODULES.PRODUK_SLOT_RESERVATION
)(Button);

const SlotReservation = () => {
  const { providerId, id } = useParams();

  const {
    data: { slot, detailSlot, formModalSlot },
    method: { handleSetModal, handleGetDetailSlot },
  } = useSlotReservations();

  useEffect(() => {
    handleGetDetailSlot(providerId, id);
  }, []);

  return (
    <>
      {/* Loading Screen */}
      <SpinnerScreen open={slot.isLoading} />

      {/* Modal Error Detail Slot Reservation */}
      <ModalError
        title={'Gagal'}
        description={'Detail slot reservasi tidak ditemukan'}
        isOpen={slot.isError}
        onCancel={() => handleSetModal('slot', 'isError', false)}
      />

      {/* Form Update Slot Reservation */}
      <FormModalSlotReservation
        isOpen={formModalSlot.isOpen}
        onClose={() => handleSetModal('formModalSlot', 'isOpen', false)}
        onRefetch={() => handleGetDetailSlot(providerId, id)}
      />

      {/* Breadcrumb */}
      <div className={cx('flex justify-between items-center mb-5')}>
        <Breadcrumb />
        <ButtonBack path={ROUTES_PRODUCT.SLOT_RESERVATIONS} />
      </div>

      {/* Header */}
      <div className={cx('flex justify-between items-center mb-6')}>
        <Typography variant='h1' color='' customClass='text-primary'>
          Detail Slot Reservasi
        </Typography>
      </div>

      {/* Content */}
      <Card>
        {/* Card Header */}
        <div className={cx('flex justify-between items-center mb-6')}>
          <div>
            <Typography variant='subtitle1' color='' customClass='mb-2'>
              {detailSlot?.treatmentName}
            </Typography>
            <Typography variant={'bodySmall'} color='text-grayTertiary'>
              Id: {detailSlot?.id}
            </Typography>
          </div>
          <div>
            <ButtonSlotReservation
              text='Edit Slot'
              iconButton={EditIcon}
              class={cx('primary')}
              disabled={slot.isLoading}
              onClick={() => handleSetModal('formModalSlot', 'isOpen', true)}
            />
          </div>
        </div>

        {/* Card Content */}
        <Card
          background='bg-graySeptenary'
          customClassName='flex flex-col gap-2'
        >
          {/* Doctor Name*/}
          <div className={cx('flex')}>
            <div className={cx('text__information')}>
              <p>Dokter</p>
              <p>:</p>
            </div>
            <div className={cx('w-full ml-3')}>
              <TextInput
                name='type'
                disabled={true}
                value={detailSlot?.doctorName}
              />
            </div>
          </div>

          {/* Treatment Type */}
          <div className={cx('flex')}>
            <div className={cx('text__information')}>
              <p>Jenis Layanan</p>
              <p>:</p>
            </div>
            <div className={cx('w-full ml-3')}>
              <TextInput
                name='type'
                disabled={true}
                value={modifyServiceTypeMedpoint(detailSlot?.treatmentType)}
              />
            </div>
          </div>

          {/* HealthFacility Name */}
          <div className={cx('flex')}>
            <div className={cx('text__information')}>
              <p>Faskes</p>
              <p>:</p>
            </div>
            <div className={cx('w-full ml-3')}>
              <TextInput
                name='healthFacilityName'
                disabled={true}
                value={detailSlot?.healthFacilityName}
              />
            </div>
          </div>

          {/* Poly Name */}
          <div className={cx('flex')}>
            <div className={cx('text__information')}>
              <p>Poli</p>
              <p>:</p>
            </div>
            <div className={cx('w-full ml-3')}>
              <TextInput
                name='polyName'
                disabled={true}
                value={detailSlot?.polyName}
              />
            </div>
          </div>

          {/* Slot Date and Start Time */}
          <div className={cx('flex')}>
            <div className={cx('text__information')}>
              <p>Waktu Selesai</p>
              <p>:</p>
            </div>
            <div className={cx('w-full ml-3')}>
              <div className={cx('flex gap-6')}>
                <div className={cx('flex-1')}>
                  <TextInput
                    name='endDate'
                    disabled={true}
                    value={detailSlot?.endDate}
                  />
                </div>
                <div className={cx('flex-1')}>
                  <div className={cx('flex items-center')}>
                    <div className={cx('text__information')}>
                      <p>Waktu</p>
                      <p>:</p>
                    </div>
                    <div className={cx('flex items-center gap-2 ml-3')}>
                      <TextInput
                        name='startTime'
                        disabled={true}
                        value={detailSlot?.startTime}
                      />
                      <TextInput
                        name='endTime'
                        disabled={true}
                        value={detailSlot?.endTime}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Maximum */}
          <div className={cx('flex')}>
            <div className={cx('text__information')}>
              <p>Maksimum</p>
              <p>:</p>
            </div>
            <div className={cx('w-full ml-3')}>
              <TextInput
                name='maximum'
                disabled={true}
                value={detailSlot?.maximum}
              />
            </div>
          </div>

          {detailSlot?.treatmentType === 'vaccination' &&
            detailSlot?.additionalData?.length > 0 && (
              <>
                <div className={cx('text__information mt-4')}>
                  <p>
                    <b>Detail Vaksin</b>
                  </p>
                </div>

                {detailSlot?.additionalData?.map((data, index) => (
                  <div key={index} className={cx('flex')}>
                    <div className={cx('text-[#757575] mr-4 mt-10')}>
                      <p>{index + 1}.</p>
                    </div>
                    <div className='w-full grid grid-cols-3 gap-4'>
                      <div className={cx('w-full flex flex-col gap-2')}>
                        <div className={cx('w-full text-sm text-[#757575]')}>
                          <p>Nama Vaksin</p>
                        </div>
                        <div className={cx('w-full')}>
                          <TextInput
                            name='vaccine'
                            value={data?.vaccine?.kfa?.display}
                            disabled
                          />
                        </div>
                      </div>
                      <div className={cx('flex flex-col gap-2')}>
                        <div className={cx('w-full text-sm text-[#757575]')}>
                          <p>Batch Number</p>
                        </div>
                        <div className={cx('w-full')}>
                          <TextInput
                            name='lotNumber'
                            value={data?.lotNumber}
                            disabled
                          />
                        </div>
                      </div>
                      <div className={cx('flex flex-col gap-2')}>
                        <div className={cx('w-full text-sm text-[#757575]')}>
                          <p>Expired Date</p>
                        </div>
                        <div className={cx('w-full')}>
                          <TextInput
                            name='expiredDate'
                            value={formatDate(data?.expirationDate, '/')}
                            disabled
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}
        </Card>
      </Card>
    </>
  );
};

export default SlotReservation;
