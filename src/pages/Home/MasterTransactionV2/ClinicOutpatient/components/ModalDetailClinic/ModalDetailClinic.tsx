import { useEffect } from 'react';
import cx from 'classnames';

import { Badges, Card, Modal, TextRow, Typography } from '@/src/components/';
import {
  formatDate,
  formatDateWithDay,
  formatDateWithTime,
  formatIndonesianTimezone,
} from '@/utils/formatDate';
import { formatRupiah } from '@/utils/fromatCurrency';
import { useWindowSize } from '@/src/hooks/useWindowSize';
import useClinicOutpatient from '../../useClinicOutpatient';

interface ModalDetailVaccinationProps {
  isOpen: boolean;
  onCancel: any;
}

const paymentStatusText = (text: string) => {
  switch (text) {
    case 'Completed':
      return 'Lunas';
    case 'Draft':
    case 'To Bill':
      return 'Belum Lunas';
    case 'Cancelled':
      return 'Dibatalkan';
    default:
      return text;
  }
};

const ModalDetailClinic: React.FC<ModalDetailVaccinationProps> = ({
  isOpen,
  onCancel,
}) => {
  const { isMobile } = useWindowSize();

  const {
    data: { dataClinicOutpatientDetail, modalClinicOutpatient },
    method: { handleGetDetailTransaction },
  } = useClinicOutpatient();

  useEffect(() => {
    if (isOpen && modalClinicOutpatient.transactionId)
      handleGetDetailTransaction(modalClinicOutpatient.transactionId);
  }, [modalClinicOutpatient.transactionId]);

  const getAddress = () => {
    if (
      !dataClinicOutpatientDetail ||
      !dataClinicOutpatientDetail?.patient_detail
    )
      return '';
    const { address, village, subdistrict, city, province } =
      dataClinicOutpatientDetail.patient_detail;
    return `${address} ${village} ${subdistrict} ${city} ${province}`;
  };

  return (
    <Modal
      open={isOpen}
      onClose={onCancel}
      title='Detail Pesanan'
      titleSize='h2'
      style={cx({
        'w-full': isMobile,
        'w-[800px]': !isMobile,
      })}
    >
      <div className='h-full flex flex-col justify-between'>
        <Card padding='p-0' customClassName='py-5'>
          <div className='flex justify-between items-center mb-6'>
            <div>
              <Typography variant='subtitle1' color='' customClass='mb-2'>
                No Antrian:{' '}
                {dataClinicOutpatientDetail?.appointment_queue?.queue_code}
              </Typography>
              <div className='flex items-center mt-2.5'>
                <Typography variant='bodySmall' color='text-grayTertiary'>
                  Tanggal Transaksi:
                </Typography>
                <div className='ml-1'>
                  <Typography variant='bodySmall' color='text-grayTertiary'>
                    {formatDateWithTime(
                      dataClinicOutpatientDetail?.appointment_queue?.creation
                    )}
                  </Typography>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className='mb-4'>
              <div className='flex justify-between items-center mb-4'>
                <Typography variant='h3' color=''>
                  Imunisasi
                </Typography>
                <div className='flex flex-col items-end'>
                  <div className='flex items-center gap-4'>
                    <Typography variant='h4' color=''>
                      Status Pembayaran:
                    </Typography>
                    <div>
                      <Badges
                        status={
                          dataClinicOutpatientDetail?.sales_order_detail
                            ?.status === 'Completed'
                            ? 'completed'
                            : 'unpaid'
                        }
                        message={
                          dataClinicOutpatientDetail?.sales_order_detail?.status
                            ? paymentStatusText(
                                dataClinicOutpatientDetail?.sales_order_detail
                                  ?.status
                              )
                            : '-'
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className='flex flex-row gap-4'>
                {/* Layanan Dipilih */}
                <Card padding='p-4' background='bg-graySeptenary'>
                  <Typography variant='h3' color='' customClass='mb-4'>
                    Layanan Dipilih
                  </Typography>
                  <div className='grid gap-2'>
                    <TextRow
                      label='Nama Layanan'
                      value={
                        dataClinicOutpatientDetail?.appointment_queue
                          ?.queue_type || '-'
                      }
                    />
                    <TextRow
                      label='Jenis Layanan'
                      value={dataClinicOutpatientDetail?.sales_order_detail?.items
                        ?.map((item) => item.item_name)
                        .join(', ')}
                    />
                    <TextRow
                      label='Nama Dokter'
                      value={
                        dataClinicOutpatientDetail?.doctor_detail
                          ?.practitioner_name || '-'
                      }
                    />
                    <TextRow
                      label='Faskes'
                      value={
                        dataClinicOutpatientDetail?.appointment_queue
                          ?.company || '-'
                      }
                    />
                  </div>
                </Card>

                {/* Pelaksanaan Reservasi */}
                <Card padding='p-4' background='bg-graySeptenary'>
                  <Typography variant='h3' color='' customClass='mb-4'>
                    Pelaksanaan Reservasi
                  </Typography>
                  <div className='grid gap-2'>
                    <TextRow
                      label='Hari'
                      value={formatDate(
                        dataClinicOutpatientDetail?.appointment_queue?.arrival,
                        ' ',
                        'MMMM',
                        false
                      )}
                    />
                    <TextRow
                      label='Jam'
                      value={formatIndonesianTimezone(
                        dataClinicOutpatientDetail?.appointment_queue?.arrival
                      )}
                    />
                    <TextRow label='Lama Pelaksanaan' value='-' />
                    <TextRow
                      label='Jenis Registrasi'
                      value={
                        dataClinicOutpatientDetail?.appointment_queue
                          ?.type_registration || '-'
                      }
                    />
                  </div>
                </Card>
              </div>
            </div>

            <div className='flex gap-4'>
              {/* Informasi Pesanan */}
              <Card padding='p-4' background='bg-graySeptenary'>
                <Typography variant='h3' color='' customClass='mb-4'>
                  Informasi Pesanan
                </Typography>
                <div className='grid gap-2'>
                  <TextRow
                    label='Tanggal Pesanan'
                    value={formatDateWithTime(
                      dataClinicOutpatientDetail?.appointment_queue?.creation
                    )}
                  />
                  <TextRow
                    label='Jenis Jaminan'
                    value={
                      dataClinicOutpatientDetail?.payor
                        ? dataClinicOutpatientDetail?.payor
                        : 'Umum'
                    }
                  />
                  <TextRow
                    label='Metode Pembayaran'
                    value={
                      dataClinicOutpatientDetail?.sales_order_detail
                        .payment_type || '-'
                    }
                  />
                  <TextRow
                    label='Biaya Layanan'
                    value={formatRupiah(
                      dataClinicOutpatientDetail?.sales_order_detail
                        ?.grand_total
                    )}
                  />
                  <TextRow
                    label='Diskon'
                    value={formatRupiah(
                      dataClinicOutpatientDetail?.sales_order_detail
                        ?.discount_amount
                    )}
                  />
                  <TextRow
                    label='Total Pembayaran'
                    value={formatRupiah(
                      dataClinicOutpatientDetail?.sales_order_detail?.total
                    )}
                  />
                </div>
              </Card>

              {/* Informasi Pasien */}
              <Card padding='p-4' background='bg-graySeptenary'>
                <Typography variant='h3' color='' customClass='mb-4'>
                  Informasi Pasien
                </Typography>
                <div className='grid gap-2'>
                  <TextRow
                    label='Nama Pasien'
                    value={
                      dataClinicOutpatientDetail?.patient_detail
                        ?.patient_name || '-'
                    }
                  />
                  <TextRow
                    label='Tanggal Lahir'
                    value={formatDateWithDay(
                      dataClinicOutpatientDetail?.patient_detail?.dob,
                      'DD/MM/YYYY'
                    )}
                  />
                  <TextRow
                    label='Jenis Kelamin'
                    value={
                      dataClinicOutpatientDetail?.patient_detail?.sex || '-'
                    }
                  />
                  <TextRow
                    label='NIK'
                    value={
                      dataClinicOutpatientDetail?.patient_detail
                        ?.no_identifier || '-'
                    }
                  />
                  <TextRow
                    label='Alamat'
                    value={
                      dataClinicOutpatientDetail?.patient_detail?.address
                        ? getAddress()
                        : '-'
                    }
                  />
                  <TextRow
                    label='No. HP'
                    value={
                      dataClinicOutpatientDetail?.patient_detail?.mobile || '-'
                    }
                  />
                </div>
              </Card>
            </div>
          </div>
        </Card>
      </div>
    </Modal>
  );
};

export default ModalDetailClinic;
