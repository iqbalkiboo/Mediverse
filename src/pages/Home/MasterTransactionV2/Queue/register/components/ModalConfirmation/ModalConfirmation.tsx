import dayjs from 'dayjs';

import { Button, Card, Modal, Typography } from '@/src/components/';
import { formatTextHealthFacilityType } from '@/utils/formatLanguage';
import { formatDate } from '@/utils/formatDate';

interface ModalConfirmationProps {
  isOpen: boolean;
  data: any;
  onClose: () => void;
  previous: () => void;
  next: () => void;
  isLoading: boolean;
}

const ModalConfirmation: React.FC<ModalConfirmationProps> = ({
  isOpen,
  data,
  onClose,
  previous,
  next,
  isLoading,
}) => {
  const closeModal = () => {
    onClose();
  };

  const handleOnSubmit = () => {
    next();
  };

  const handleOnPrevious = () => {
    closeModal();
    previous();
  };

  const registerType = data.service?.payor?.payor_name ? 'Penjamin' : 'Umum';
  const pageType = data.service?.serviceType?.toLowerCase() || '';
  const isClinic = pageType === 'clinic' || pageType === 'consultation';
  const isLab = pageType === 'laboratory';

  return (
    <>
      <Modal
        open={isOpen}
        onClose={() => {
          closeModal();
          previous();
        }}
        title='KONFIRMASI'
        closeIcon={false}
      >
        <div className='flex flex-col items-center justify-center h-full w-full mt-2'>
          <div className='w-[414px] flex flex-col bg-white overflow-hidden'>
            <div>
              <div className="text-white p-[20px] flex flex-col bg-[url('/src/assets/images/bg-header.png')] bg-cover bg-center">
                <div className='flex justify-between mb-2'>
                  <Typography variant='bodyXSmall' customClass='font-medium'>
                    Nama Pasien
                  </Typography>
                  <Typography variant='bodyXSmall' customClass='font-medium'>
                    Tanggal Lahir
                  </Typography>
                </div>
                <div className='flex justify-between text-left'>
                  <Typography variant='h3' customClass='font-medium capitalize'>
                    {data?.patient?.patient_name || '-'}
                  </Typography>
                  <Typography
                    variant='bodyXSmall'
                    customClass='font-medium my-auto'
                  >
                    {data?.patient?.dob
                      ? formatDate(data.patient.dob, ' ', 'MMMM', false)
                      : '-'}
                  </Typography>
                </div>
              </div>

              <div className='text-left space-y-3 text-[#1D2433] p-6 mb-8'>
                {pageType ? (
                  <>
                    {registerType && (
                      <div className='flex'>
                        <div className='w-2/5'>
                          <Typography variant='bodySmall'>Pasien</Typography>
                        </div>
                        <div className='w-3/5'>
                          <Typography
                            variant='bodySmall'
                            customClass='font-bold'
                          >
                            {registerType}
                          </Typography>
                        </div>
                      </div>
                    )}

                    {registerType &&
                      data.service?.payor &&
                      data.service?.payor?.payor_name && (
                        <div className='flex'>
                          <div className='w-2/5'>
                            <Typography variant='bodySmall'>
                              Penjamin
                            </Typography>
                          </div>
                          <div className='w-3/5'>
                            <Typography
                              variant='bodySmall'
                              customClass='font-bold'
                            >
                              {data.service?.payor?.payor_name}
                            </Typography>
                          </div>
                        </div>
                      )}

                    {isLab && registerType && (
                      <>
                        <div className='flex'>
                          <div className='w-2/5'>
                            <Typography variant='bodySmall'>
                              No. Rujukan
                            </Typography>
                          </div>
                          <div className='w-3/5'>
                            <Typography
                              variant='bodySmall'
                              customClass='font-bold'
                            >
                              -
                            </Typography>
                          </div>
                        </div>
                        <div className='flex'>
                          <div className='w-2/5'>
                            <Typography variant='bodySmall'>
                              Rujukan Dari
                            </Typography>
                          </div>
                          <div className='w-3/5'>
                            <Typography
                              variant='bodySmall'
                              customClass='font-bold'
                            >
                              -
                            </Typography>
                          </div>
                        </div>
                      </>
                    )}

                    <div className='flex'>
                      <div className='w-2/5'>
                        <Typography variant='bodySmall'>Layanan</Typography>
                      </div>
                      <div className='w-3/5'>
                        <Typography variant='bodySmall' customClass='font-bold'>
                          {pageType
                            ? formatTextHealthFacilityType(pageType)
                            : '-'}
                        </Typography>
                      </div>
                    </div>

                    <div className='flex'>
                      <div className='w-2/5'>
                        <Typography variant='bodySmall'>
                          Jenis Layanan
                        </Typography>
                      </div>
                      <div className='w-3/5'>
                        <Typography variant='bodySmall' customClass='font-bold'>
                          {isClinic
                            ? data.service?.service?.label
                            : data.service?.service
                                ?.map((item) => item?.label)
                                .join(', ') || '-'}
                        </Typography>
                      </div>
                    </div>

                    {isClinic && (
                      <div className='flex'>
                        <div className='w-2/5'>
                          <Typography variant='bodySmall'>Dokter</Typography>
                        </div>
                        <div className='w-3/5'>
                          <Typography
                            variant='bodySmall'
                            customClass='font-bold'
                          >
                            {data?.service?.doctor?.value?.practitoner_name ||
                              '-'}
                          </Typography>
                        </div>
                      </div>
                    )}

                    {(isClinic || !registerType) && (
                      <div className='flex'>
                        <div className='w-2/5'>
                          <Typography variant='bodySmall'>
                            Jadwal Pelayanan
                          </Typography>
                        </div>
                        <div className='w-3/5'>
                          <div className='flex flex-col gap-1'>
                            <Typography
                              variant='bodySmall'
                              customClass='font-bold'
                            >
                              {dayjs().format('dddd, DD MMMM YYYY') || '-'}
                            </Typography>
                            <Typography
                              variant='bodySmall'
                              customClass='font-bold'
                            >
                              {data?.service?.practiceHour}
                            </Typography>
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <div className='grid grid-cols-2 gap-3'>
                    <Typography variant='bodySmall'>-</Typography>
                    <Typography variant='bodySmall' customClass='font-bold'>
                      -
                    </Typography>
                    <Typography variant='bodySmall'>-</Typography>
                    <Typography variant='bodySmall' customClass='font-bold'>
                      -
                    </Typography>
                    <Typography variant='bodySmall'>-</Typography>
                    <Typography variant='bodySmall' customClass='font-bold'>
                      -
                    </Typography>
                  </div>
                )}
              </div>
            </div>

            {!isClinic && registerType && (
              <Card
                padding='p-2'
                customClassName='text-center mb-4 rounded-md bg-[#f19f000f] border border-[#F19F00]'
              >
                <Typography variant='bodyXSmall'>
                  Lakukan pembayaran di Kasir terlebih dahulu untuk layanan ini
                </Typography>
              </Card>
            )}

            <div className='mt-auto mb-2'>
              <Button
                type='button'
                class='primary'
                size='md'
                text={`cetak antrian ${
                  pageType ? (isClinic ? 'pemeriksaan' : 'pembayaran') : ''
                }`}
                disabled={!data}
                loading={isLoading}
                onClick={handleOnSubmit}
              />
            </div>
            <div className=''>
              <Button
                type='button'
                class='outline'
                size='md'
                text='Sebelumnya'
                loading={isLoading}
                onClick={handleOnPrevious}
              />
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ModalConfirmation;
