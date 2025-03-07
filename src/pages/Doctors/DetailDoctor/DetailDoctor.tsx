import { useEffect } from 'react';
import { useLocation, useParams } from 'react-router';
import cx from 'classnames';

import {
  Badges,
  Button,
  ButtonBack,
  Heading,
  Pill,
  Spinner,
  TextInput,
  Typography,
} from '@/src/components';
import {
  AddIcon,
  CheckOneIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  EditIcon,
  EditLabelIcon,
  TrashIcon,
} from '@/src/assets/images/svg';
import { ModalConfirmation, ModalError, ModalSuccess } from '@/src/commons';
import { formatDateEng, formatDateWithTime } from '@/src/utils/formatDate';
import { reservationStatusText } from '@/src/utils/reservationStatus';
import { familyHistoryToShow } from '@/src/mappers/Doctors';
import { TAB_TRANSACTION } from '@/src/constants';
import DoctorDiagnoseModal from './DoctorDiagnoseModal';
import MedicalSupportModal from './MedicalSupportModal';
import PreviewPdfModal from './PreviewPdfModal';
import ReferenceModal from './ReferenceModal';
import MedicalPrescriptionModal from './MedicalPrescriptionModal';
import ReservationError from '@/src/pages/Doctors/components/ReservationError';
import useFormDoctors from '@/src/pages/Doctors/useFormDoctors';
import useDoctors from '@/src/pages/Doctors/useDoctors';

import styles from './detailDoctor.module.css';

const DetailDoctor = () => {
  const search = useLocation().search;
  const { id } = useParams();

  const clinicId = new URLSearchParams(search).get('clinicId');
  const clinic = new URLSearchParams(search).get('clinic');

  const {
    detailUser,
    isDetailReservationError,
    isReservationDiagnosticError,
    isReservationMedicalLoading,
    isReservationDiagnosticLoading,
    isReservationPrescriptionsLoading,
    isReservationHospitalReferralLoading,
    isReservationHospitalReferralError,
    isReservationMedicalError,
    isReservationPrescriptionsError,
    isPatchReservationError,
    isPatchReservationSuccess,
    dropdown,
    isOpenModal,
    pdfViewUrl,
    handleSetDropdown,
    handleSetIsOpenModal,
    handleSetPdfViewUrl,
    handleSetFormType,
    handleClearStatePatchReservation,
    handlePatchReservationStatus,
    handleGetDetailReservation,
    handleGetReservationDiagnostic,
    handleGetReservationPrescriptions,
    handleGetReservationMedicalSupport,
    handleGetReservationHospitalReferral,
    handleGetUserHealthProfile,
    DATA_DETAIL_DOCTORS,
    DATA_RESERVATION_DIAGNOSTIC,
    DATA_RESERVATION_PRESCRIPTIONS,
    DATA_RESERVATION_MEDICAL_SUPPORT,
    DATA_RESERVATION_HOSPITAL_REFERRAL,
    DATA_USER_HEALTH_PROFILE,
  } = useDoctors();

  const {
    handleDeleteFormPrescriptions,
    handleEditFormPrescriptions,
    deletePrescription,
    onDeletePrescription,
    handleClearStateDeletePrescription,
  } = useFormDoctors();

  useEffect(() => {
    if (id && detailUser?.provider_id) {
      handleGetDetailReservation(id, detailUser?.provider_id);
      handleGetReservationDiagnostic(id, detailUser?.provider_id);
      handleGetReservationPrescriptions(id, detailUser?.provider_id);
      handleGetReservationMedicalSupport(id, detailUser?.provider_id);
      handleGetReservationHospitalReferral(id, detailUser?.provider_id);
    }
  }, [id, deletePrescription.isSuccess]);

  useEffect(() => {
    if (DATA_DETAIL_DOCTORS?.participants[0]?.idpID) {
      handleGetUserHealthProfile(DATA_DETAIL_DOCTORS?.participants[0]?.idpID);
    }
  }, [DATA_DETAIL_DOCTORS?.participants[0]?.idpID]);

  // eslint-disable-next-line max-len
  const orderNumber = `MDV/${formatDateEng(
    new Date(DATA_DETAIL_DOCTORS.createdAt * 1000),
    ''
  )}/PNT/${DATA_DETAIL_DOCTORS.id}`;

  return (
    <div>
      <DoctorDiagnoseModal
        open={isOpenModal.diagnosis}
        setModal={() => handleSetIsOpenModal('diagnosis', false)}
        data={DATA_RESERVATION_DIAGNOSTIC ?? {}}
        id={id}
      />
      <MedicalSupportModal
        open={isOpenModal.support}
        setModal={() => handleSetIsOpenModal('support', false)}
        data={DATA_RESERVATION_MEDICAL_SUPPORT ?? {}}
        id={id}
      />
      <MedicalPrescriptionModal
        open={isOpenModal.prescription}
        setModal={() => handleSetIsOpenModal('prescription', false)}
        data={DATA_RESERVATION_PRESCRIPTIONS ?? []}
        id={id}
      />
      <PreviewPdfModal
        open={isOpenModal.previewPdf}
        setModal={() => handleSetIsOpenModal('previewPdf', false)}
        pdfSrc={pdfViewUrl ?? ''}
      />
      <ReferenceModal
        open={isOpenModal.reference}
        setModal={() => handleSetIsOpenModal('reference', false)}
        data={DATA_RESERVATION_HOSPITAL_REFERRAL ?? {}}
        id={id}
      />
      <ModalSuccess
        title={'Sukses!'}
        description={
          deletePrescription.isSuccess
            ? 'Berhasil menghapus resep'
            : 'Berhasil menyelesaikan pemeriksaan pasien ini'
        }
        isOpen={isPatchReservationSuccess || deletePrescription.isSuccess}
        onCancel={() => {
          handleClearStatePatchReservation();
          handleGetDetailReservation(id, detailUser?.provider_id);
          handleClearStateDeletePrescription();
        }}
      />
      <ModalError
        title={'Gagal!'}
        description={
          deletePrescription.isError
            ? 'Gagal menghapus resep'
            : 'Gagal menyelesaikan pemeriksaan pasien ini'
        }
        isOpen={isPatchReservationError || deletePrescription.isError}
        onCancel={() => {
          handleClearStateDeletePrescription();
          handleClearStatePatchReservation();
        }}
      />
      <ModalConfirmation
        title='Selesai Pemeriksaan'
        description='Apakah Anda ingin menyelesaikan pemeriksaan pasien ini?'
        isOpen={isOpenModal.finishCheckup}
        onCancel={() => handleSetIsOpenModal('finishCheckup', false)}
        onSubmit={() => {
          handlePatchReservationStatus(id, detailUser?.provider_id, 'finish');
        }}
      />
      <ModalConfirmation
        submitText={'Hapus'}
        cancelText={'Kembali'}
        isOpen={deletePrescription.confirmation}
        isLoadingSubmit={deletePrescription.isLoading}
        title={'Hapus Resep'}
        description='Apakah Anda ingin menghapus resep ini?'
        onCancel={() => handleClearStateDeletePrescription()}
        onSubmit={() => {
          onDeletePrescription(detailUser?.provider_id, id);
        }}
      />
      <div className={cx('flex justify-between mb-4')}>
        {/* Breadcrumb */}
        <div className={cx('flex items-center')}>
          <Typography variant={'bodyXSmall'} color='text-[#ABAFB3]'>
            Detail Pasien
          </Typography>
        </div>
        <ButtonBack
          path={`/doctors?clinicId=${clinicId}&clinic=${clinic}&tab=${TAB_TRANSACTION.SCHEDULED}`}
        />
      </div>
      <div className={cx('w-full flex justify-between mb-6')}>
        <Heading
          title='Detail Pasien'
          size='2xl'
          customClassName='font-bold text-primary'
        />
        {/* TODO: HIDE WHEN CHECKED OR FAILED */}
        {DATA_DETAIL_DOCTORS.status === 'in-progress' &&
          !isDetailReservationError && (
            <div className={cx('w-44')}>
              <Button
                class={cx('primary')}
                text='Selesai'
                size='md'
                iconButton={CheckOneIcon}
                onClick={() => handleSetIsOpenModal('finishCheckup', true)}
              />
            </div>
          )}
      </div>
      <div className={cx('bg-white p-6 rounded-lg')}>
        {!isDetailReservationError ? (
          <div>
            <div className={cx('flex flex-col mb-6')}>
              <Heading
                title={`No Pesanan: ${orderNumber}`}
                customClassName='font-semibold'
                size='2xl'
              />
              <div className={cx('flex items-center mt-2.5')}>
                <Typography variant='bodySmall' color='text-[#9E9E9E]'>
                  Tanggal Transaksi:
                </Typography>
                <div className={cx('ml-1')}>
                  <Typography variant='bodySmall' color='text-[#9E9E9E]'>
                    {formatDateWithTime(
                      new Date(DATA_DETAIL_DOCTORS.createdAt * 1000)
                    )}
                  </Typography>
                </div>
              </div>
            </div>
            <div
              className={cx(
                'w-full min-h-[120px] flex flex-col gap-[10px] bg-[#F8F8F8] py-4 px-5 rounded-lg'
              )}
            >
              <div
                className={cx('w-full h-full flex justify-end items-center')}
              >
                <Typography
                  variant='bodySmall'
                  color=''
                  customClass='font-bold'
                >
                  Status Pesanan:
                </Typography>
                <div className={cx('ml-1')}>
                  <Badges
                    status={DATA_DETAIL_DOCTORS.status}
                    message={reservationStatusText(DATA_DETAIL_DOCTORS.status)}
                    reservation
                  />
                </div>
              </div>
              <div
                className={cx(
                  'w-full h-full flex justify-between items-start gap-2 mt-1'
                )}
              >
                <div className={cx('w-3/12')}>
                  <div className={cx('mt-1')}>
                    <Typography variant='bodySmall' color='text-gray-500'>
                      Nomor Tiket Mediverse:
                    </Typography>
                    <Typography variant='h4' color=''>
                      {DATA_DETAIL_DOCTORS?.id
                        ? `E-${DATA_DETAIL_DOCTORS.id}`
                        : '-'}
                    </Typography>
                  </div>
                </div>
                <div className={cx('w-2/12')}>
                  <div className={cx('mt-1')}>
                    <Typography variant='bodySmall' color='text-gray-500'>
                      Nama Pasien:
                    </Typography>
                    <Typography variant='h4' color=''>
                      {DATA_DETAIL_DOCTORS.participants[0]?.fullName ?? '-'}
                    </Typography>
                  </div>
                </div>
                <div className={cx('w-2/12')}>
                  <div className={cx('mt-1')}>
                    <Typography variant='bodySmall' color='text-gray-500'>
                      Jenis Layanan:
                    </Typography>
                    <Typography variant='h4' color='' customClass={cx('pr-5')}>
                      {DATA_DETAIL_DOCTORS.serviceType}
                    </Typography>
                  </div>
                </div>
                <div className={cx('w-3/12')}>
                  <div className={cx('mt-1')}>
                    <Typography variant='bodySmall' color='text-gray-500'>
                      Nama Layanan/Dokter:
                    </Typography>
                    <Typography variant='h4' color='' customClass={cx('pr-5')}>
                      {DATA_DETAIL_DOCTORS.treatmentMode}
                    </Typography>
                  </div>
                </div>
                <div className={cx('w-2/12')}>
                  <div className={cx('mt-1')}>
                    <Typography variant='bodySmall' color='text-gray-500'>
                      Poli:
                    </Typography>
                    <Typography variant='h4' color=''>
                      {DATA_DETAIL_DOCTORS.poly}
                    </Typography>
                  </div>
                </div>
                <div className={cx('w-2/12')}>
                  <div className={cx('mt-1')}>
                    <Typography variant='bodySmall' color='text-gray-500'>
                      Tanggal Reservasi:
                    </Typography>
                    <Typography variant='h4' color='' customClass={cx('pr-5')}>
                      {`${DATA_DETAIL_DOCTORS.reservationDate} ${DATA_DETAIL_DOCTORS.reservationTime}`}
                    </Typography>
                  </div>
                </div>
              </div>
            </div>
            <div className={cx('grid grid-cols-2 gap-4 mt-4')}>
              <div className={cx('rounded-lg bg-[#F8F8F8] px-5 py-4 h-fit')}>
                <Typography variant='h3' color=''>
                  Riwayat Medis
                </Typography>
                <div className={cx('mt-2')}>
                  {/* Alergi */}
                  <div className={cx('my-3 flex')}>
                    <div className={cx(styles.text__information_doctor)}>
                      <p>Alergi</p>
                      <p>:</p>
                    </div>
                    <div className={cx('w-full ml-2')}>
                      <div className='w-full bg-white border border-grayTertiary px-4 py-3 rounded-lg space-x-2'>
                        {(DATA_USER_HEALTH_PROFILE?.allergy ?? ['-']).map(
                          (item, index) => (
                            <Pill key={index} text={item} />
                          )
                        )}
                      </div>
                    </div>
                  </div>
                  {/* Alergi Obat */}
                  <div className={cx('my-3 flex')}>
                    <div className={cx(styles.text__information_doctor)}>
                      <p>Alergi Obat</p>
                      <p>:</p>
                    </div>
                    <div className={cx('w-full ml-2')}>
                      <TextInput
                        name='medicineAllergic'
                        value={DATA_USER_HEALTH_PROFILE.medicine_allergy ?? '-'}
                        onChange={() => {}}
                        isValid
                        placeholder='-'
                        disabled
                      />
                    </div>
                  </div>
                  {/* Diagnosis */}
                  <div className={cx('my-3 flex')}>
                    <div className={cx(styles.text__information_doctor)}>
                      <p>Diagnosis Dalam Perawatan</p>
                      <p>:</p>
                    </div>
                    <div className={cx('w-full ml-2')}>
                      <TextInput
                        name='diagnose'
                        value={
                          DATA_USER_HEALTH_PROFILE.diagnosis_treatment ?? '-'
                        }
                        onChange={() => {}}
                        isValid
                        placeholder='-'
                        disabled
                      />
                    </div>
                  </div>
                  {/* Komorbid */}
                  <div className={cx('my-3 flex')}>
                    <div className={cx(styles.text__information_doctor)}>
                      <p>Komorbid (Penyakit Penyerta)</p>
                      <p>:</p>
                    </div>
                    <div className={cx('w-full ml-2')}>
                      <TextInput
                        name='komorbid'
                        value={DATA_USER_HEALTH_PROFILE.comorbid ?? '-'}
                        onChange={() => {}}
                        isValid
                        placeholder='-'
                        disabled
                      />
                    </div>
                  </div>
                  {/* Riwayat Operasi */}
                  <div className={cx('my-3 flex')}>
                    <div className={cx(styles.text__information_doctor)}>
                      <p>Riwayat Operasi</p>
                      <p>:</p>
                    </div>
                    <div className={cx('w-full ml-2')}>
                      <TextInput
                        name='history'
                        value={DATA_USER_HEALTH_PROFILE.surgery_history ?? '-'}
                        onChange={() => {}}
                        isValid
                        placeholder='-'
                        disabled
                      />
                    </div>
                  </div>
                  {/* Riwayat Penyakit Pribadi */}
                  <div className={cx('my-3 flex')}>
                    <div className={cx(styles.text__information_doctor)}>
                      <p>Riwayat Penyakit Pribadi</p>
                      <p>:</p>
                    </div>
                    <div className={cx('w-full ml-2')}>
                      <TextInput
                        name='historySickness'
                        value={
                          DATA_USER_HEALTH_PROFILE.personal_medical_history ??
                          '-'
                        }
                        onChange={() => {}}
                        isValid
                        placeholder='-'
                        disabled
                      />
                    </div>
                  </div>
                  {/* Riwayat Penyakit Keluarga */}
                  <div className={cx('my-3 flex')}>
                    <div className={cx(styles.text__information_doctor)}>
                      <p>Riwayat Penyakit Keluarga</p>
                      <p>:</p>
                    </div>
                    <div className={cx('w-full ml-2')}>
                      <TextInput
                        name='historyFamily'
                        value={
                          familyHistoryToShow(
                            DATA_USER_HEALTH_PROFILE.family_medical_history
                          ) ?? '-'
                        }
                        onChange={() => {}}
                        isValid
                        placeholder='-'
                        disabled
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className={cx('rounded-lg bg-[#F8F8F8] px-5 py-4 h-auto')}>
                <Typography
                  variant='h4'
                  color=''
                  customClass={cx('border-b-2 pb-2')}
                >
                  Pemeriksaan
                </Typography>
                <div>
                  {/* Diagnosis Dokter */}
                  <div
                    className={cx(
                      'flex items-center justify-between mt-4 h-16 px-4 py-6 bg-white rounded-lg'
                    )}
                  >
                    <Typography variant='h3' color=''>
                      Diagnosis Dokter
                    </Typography>
                    {isReservationDiagnosticLoading && <Spinner />}
                    {!isReservationDiagnosticLoading &&
                      (DATA_RESERVATION_DIAGNOSTIC.id &&
                      DATA_RESERVATION_DIAGNOSTIC.id !== 0 ? (
                        <div
                          className={cx('p-5 pr-1 cursor-pointer')}
                          onClick={() =>
                            handleSetDropdown('diagnosis', !dropdown.diagnosis)
                          }
                        >
                          {!dropdown.diagnosis ? (
                            <ChevronDownIcon color='#0D1C2E' />
                          ) : (
                            <ChevronUpIcon color='#0D1C2E' />
                          )}
                        </div>
                      ) : (
                        <div className={cx('w-44')}>
                          <Button
                            class={cx('outline')}
                            text='Tambah'
                            size='md'
                            iconButton={AddIcon}
                            onClick={() => {
                              handleSetFormType('diagnostic');
                              handleSetIsOpenModal('diagnosis', true);
                            }}
                            disabled={DATA_DETAIL_DOCTORS.status === 'failed'}
                          />
                        </div>
                      ))}
                  </div>
                  {/* Data Diagnosis Dokter */}
                  {dropdown.diagnosis && !isReservationDiagnosticError && (
                    <div
                      className={cx(
                        'flex flex-col px-4 pb-4 h-auto w-full bg-white rounded-b-lg'
                      )}
                    >
                      {/* Keluhan Pasien */}
                      <div className={cx('mt-4 flex')}>
                        <div className={cx(styles.text__information_doctor)}>
                          <p>Keluhan Pasien</p>
                          <p>:</p>
                        </div>
                        <div className={cx('w-full ml-2')}>
                          <TextInput
                            name='complaint'
                            value={
                              DATA_RESERVATION_DIAGNOSTIC.patientComplain ?? '-'
                            }
                            onChange={() => {}}
                            type='textarea'
                            rows={2}
                            isValid
                          />
                        </div>
                      </div>
                      {/* Diagnosa Awal Pasien */}
                      <div className={cx('mt-4 flex')}>
                        <div className={cx(styles.text__information_doctor)}>
                          <p>Diagnosa Awal Pasien</p>
                          <p>:</p>
                        </div>
                        <div className={cx('w-full ml-2')}>
                          <TextInput
                            name='diagnose'
                            value={
                              DATA_RESERVATION_DIAGNOSTIC.initialDiagnose ?? '-'
                            }
                            onChange={() => {}}
                            isValid
                          />
                        </div>
                      </div>
                      {/* Suhu Tubuh */}
                      <div className={cx('mt-4 flex')}>
                        <div className={cx(styles.text__information_doctor)}>
                          <p>Suhu Tubuh</p>
                          <p>:</p>
                        </div>
                        <div className={cx('w-full ml-2')}>
                          <TextInput
                            name='temperature'
                            value={
                              DATA_RESERVATION_DIAGNOSTIC.bodyTemperature ?? '-'
                            }
                            onChange={() => {}}
                            isValid
                          />
                        </div>
                      </div>
                      {/* Tekanan Darah */}
                      <div className={cx('mt-4 flex')}>
                        <div className={cx(styles.text__information_doctor)}>
                          <p>Tekanan Darah</p>
                          <p>:</p>
                        </div>
                        <div className={cx('w-full ml-2')}>
                          <TextInput
                            name='bloodPressure'
                            value={
                              DATA_RESERVATION_DIAGNOSTIC.bloodPressure ?? '-'
                            }
                            onChange={() => {}}
                            isValid
                          />
                        </div>
                      </div>
                      {/* Berat Badan */}
                      <div className={cx('mt-4 flex')}>
                        <div className={cx(styles.text__information_doctor)}>
                          <p>Berat Badan</p>
                          <p>:</p>
                        </div>
                        <div className={cx('w-full ml-2')}>
                          <TextInput
                            name='bodyWeight'
                            value={
                              DATA_RESERVATION_DIAGNOSTIC.patientWeight ?? '-'
                            }
                            onChange={() => {}}
                            isValid
                          />
                        </div>
                      </div>
                      {/* Tinggi Badan */}
                      <div className={cx('mt-4 flex')}>
                        <div className={cx(styles.text__information_doctor)}>
                          <p>Tinggi Badan</p>
                          <p>:</p>
                        </div>
                        <div className={cx('w-full ml-2')}>
                          <TextInput
                            name='bodyHeight'
                            value={
                              DATA_RESERVATION_DIAGNOSTIC.patientHeight ?? '-'
                            }
                            onChange={() => {}}
                            isValid
                          />
                        </div>
                      </div>
                      {/* Subject */}
                      <div className={cx('mt-4 flex')}>
                        <div className={cx(styles.text__information_doctor)}>
                          <p>Subject</p>
                          <p>:</p>
                        </div>
                        <div className={cx('w-full ml-2')}>
                          <TextInput
                            name='subject'
                            value={DATA_RESERVATION_DIAGNOSTIC.subject ?? '-'}
                            onChange={() => {}}
                            type='textarea'
                            rows={2}
                            isValid
                          />
                        </div>
                      </div>
                      {/* Object */}
                      <div className={cx('mt-4 flex')}>
                        <div className={cx(styles.text__information_doctor)}>
                          <p>Object</p>
                          <p>:</p>
                        </div>
                        <div className={cx('w-full ml-2')}>
                          <TextInput
                            name='object'
                            value={DATA_RESERVATION_DIAGNOSTIC.object ?? '-'}
                            onChange={() => {}}
                            type='textarea'
                            rows={2}
                            isValid
                          />
                        </div>
                      </div>
                      {/* Edit Button */}
                      <div className={cx('w-full mt-8 flex justify-end')}>
                        <div className={cx('w-40')}>
                          <Button
                            class={cx('primary')}
                            text='Edit'
                            size='md'
                            iconButton={EditIcon}
                            className={cx('w-40')}
                            onClick={() => {
                              handleSetFormType('diagnostic');
                              handleSetIsOpenModal('diagnosis', true);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                  {dropdown.diagnosis && isReservationDiagnosticError && (
                    <ReservationError size={'sm'} />
                  )}
                  {/* Resep Obat */}
                  <div
                    className={cx(
                      'flex items-center justify-between mt-4 h-16 px-4 py-6 bg-white rounded-lg'
                    )}
                  >
                    <Typography variant='h3' color=''>
                      Resep Obat
                    </Typography>
                    {isReservationPrescriptionsLoading && <Spinner />}
                    {!isReservationPrescriptionsLoading &&
                      (DATA_RESERVATION_PRESCRIPTIONS.length > 0 &&
                      (isReservationPrescriptionsError ||
                        !isReservationPrescriptionsError) ? (
                        <div
                          className={cx('p-5 pr-1 cursor-pointer')}
                          onClick={() =>
                            handleSetDropdown(
                              'prescription',
                              !dropdown.prescription
                            )
                          }
                        >
                          {!dropdown.prescription ? (
                            <ChevronDownIcon color='#0D1C2E' />
                          ) : (
                            <ChevronUpIcon color='#0D1C2E' />
                          )}
                        </div>
                      ) : (
                        <div className={cx('w-44')}>
                          <Button
                            class={cx('outline')}
                            text='Tambah'
                            size='md'
                            iconButton={AddIcon}
                            onClick={() => {
                              handleSetFormType('prescription');
                              handleSetIsOpenModal('prescription', true);
                            }}
                            disabled={DATA_DETAIL_DOCTORS.status === 'failed'}
                          />
                        </div>
                      ))}
                  </div>
                  {/* Resep Obat Data */}
                  {dropdown.prescription &&
                    DATA_RESERVATION_PRESCRIPTIONS.length > 0 &&
                    !isReservationPrescriptionsError && (
                      <div
                        className={cx(
                          'flex flex-col px-4 pb-4 h-auto w-full bg-white rounded-b-lg'
                        )}
                      >
                        {DATA_RESERVATION_PRESCRIPTIONS.map((item, index) => (
                          <div
                            className={cx(
                              'flex flex-col w-full p-4 bg-[#F8F8F8] rounded-lg mb-4'
                            )}
                            key={index}
                          >
                            <div className={cx('flex justify-between')}>
                              <Typography variant='h4' color=''>
                                Resep Obat {index + 1}
                              </Typography>
                              {/* Edit Button */}
                              <div
                                className={cx(
                                  'flex justify-center items-center gap-x-4'
                                )}
                              >
                                <div
                                  className={cx('cursor-pointer')}
                                  onClick={() => {
                                    handleSetIsOpenModal('prescription', true);
                                    handleEditFormPrescriptions(item);
                                  }}
                                >
                                  <EditLabelIcon color='#000000' />
                                </div>
                                <div
                                  className={cx('cursor-pointer')}
                                  onClick={() =>
                                    handleDeleteFormPrescriptions(item)
                                  }
                                >
                                  <TrashIcon color='#000000' />
                                </div>
                              </div>
                            </div>
                            <div className={cx('mt-4 flex')}>
                              <div
                                className={cx(styles.text__information_doctor)}
                              >
                                <p>Obat</p>
                                <p>:</p>
                              </div>
                              <div className={cx('w-full ml-2')}>
                                <TextInput
                                  name='medicine'
                                  value={item.itemName ?? '-'}
                                  onChange={() => {}}
                                  isValid
                                />
                              </div>
                            </div>
                            {/* Petunjuk Pemakaian */}
                            <div className={cx('mt-4 flex')}>
                              <div
                                className={cx(styles.text__information_doctor)}
                              >
                                <p>Petunjuk Pemakaian</p>
                                <p>:</p>
                              </div>
                              <div className={cx('w-full ml-2')}>
                                <TextInput
                                  name='instruction'
                                  value={item.usageDescription ?? '-'}
                                  onChange={() => {}}
                                  isValid
                                />
                              </div>
                            </div>
                            {/* Dosis */}
                            <div className={cx('mt-4 flex')}>
                              <div
                                className={cx(styles.text__information_doctor)}
                              >
                                <p>Dosis</p>
                                <p>:</p>
                              </div>
                              <div className={cx('w-full ml-2')}>
                                <TextInput
                                  name='dosage'
                                  value={item.dosage ?? '-'}
                                  onChange={() => {}}
                                  isValid
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                        {/* Add Button */}
                        <div className={cx('w-full my-2 flex justify-end')}>
                          <div className={cx('w-1/3')}>
                            <Button
                              class={cx('primary')}
                              text='Tambah Obat'
                              size='md'
                              iconButton={EditIcon}
                              className={cx('w-40')}
                              onClick={() => {
                                handleSetFormType('prescription');
                                handleSetIsOpenModal('prescription', true);
                              }}
                              disabled={DATA_DETAIL_DOCTORS.status === 'failed'}
                            />
                          </div>
                        </div>{' '}
                      </div>
                    )}
                  {dropdown.prescription &&
                    DATA_RESERVATION_PRESCRIPTIONS.length == 0 &&
                    isReservationPrescriptionsError && (
                      <ReservationError size={'sm'} />
                    )}
                  {/* Penunjang Medis */}
                  <div
                    className={cx(
                      'flex items-center justify-between mt-4 h-16 px-4 py-6 bg-white rounded-lg'
                    )}
                  >
                    <Typography variant='h3' color=''>
                      Penunjang Medis
                    </Typography>
                    {isReservationMedicalLoading && <Spinner />}
                    {!isReservationMedicalLoading &&
                      (DATA_RESERVATION_MEDICAL_SUPPORT.id &&
                      DATA_RESERVATION_MEDICAL_SUPPORT.id !== 0 ? (
                        <div
                          className={cx('p-5 pr-1 cursor-pointer')}
                          onClick={() =>
                            handleSetDropdown('support', !dropdown.support)
                          }
                        >
                          {!dropdown.support ? (
                            <ChevronDownIcon color='#0D1C2E' />
                          ) : (
                            <ChevronUpIcon color='#0D1C2E' />
                          )}
                        </div>
                      ) : (
                        <div className={cx('w-44')}>
                          <Button
                            class={cx('outline')}
                            text='Tambah'
                            size='md'
                            iconButton={AddIcon}
                            onClick={() => {
                              handleSetFormType('support');
                              handleSetIsOpenModal('support', true);
                            }}
                            disabled={DATA_DETAIL_DOCTORS.status === 'failed'}
                          />
                        </div>
                      ))}
                  </div>
                  {/* Penunjang Medis Data */}
                  {dropdown.support && !isReservationMedicalError && (
                    <div
                      className={cx(
                        'flex flex-col px-4 pb-4 h-auto w-full bg-white rounded-b-lg'
                      )}
                    >
                      {/* Penunjang Medis */}
                      <div className={cx('mt-4 flex')}>
                        <div className={cx(styles.text__information_doctor)}>
                          <p>Penunjang Medis</p>
                          <p>:</p>
                        </div>
                        <div className={cx('w-full ml-2')}>
                          <TextInput
                            name='medicalSupport'
                            value={
                              DATA_RESERVATION_MEDICAL_SUPPORT.description ??
                              '-'
                            }
                            onChange={() => {}}
                            isValid
                          />
                        </div>
                      </div>
                      {/* Lampiran */}
                      <div className={cx('mt-4 flex')}>
                        <div className={cx(styles.text__information_doctor)}>
                          <p>Lampiran</p>
                          <p>:</p>
                        </div>
                        <div className={cx('w-full ml-2')}>
                          <Typography variant='h3' color='text-primary'>
                            <span
                              onClick={() => {
                                handleSetPdfViewUrl(
                                  DATA_RESERVATION_MEDICAL_SUPPORT.attachmentUrl
                                );
                                handleSetIsOpenModal('previewPdf', true);
                              }}
                              className={cx(
                                'border-b-1 border-[#5600E8] cursor-pointer'
                              )}
                            >
                              Lihat Lampiran
                            </span>
                          </Typography>
                        </div>
                      </div>
                      {/* Edit Button */}
                      <div className={cx('w-full mt-8 flex justify-end')}>
                        <div className={cx('w-40')}>
                          <Button
                            class={cx('primary')}
                            text='Edit'
                            size='md'
                            iconButton={EditIcon}
                            className={cx('w-40')}
                            onClick={() => {
                              handleSetFormType('support');
                              handleSetIsOpenModal('support', true);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                  {dropdown.support && isReservationMedicalError && (
                    <ReservationError size={'sm'} />
                  )}
                  {/* Rujukan */}
                  <div
                    className={cx(
                      'flex items-center justify-between mt-4 h-16 px-4 py-6 bg-white rounded-lg'
                    )}
                  >
                    <Typography variant='h3' color=''>
                      Rujukan
                    </Typography>
                    {isReservationHospitalReferralLoading && <Spinner />}
                    {!isReservationHospitalReferralLoading &&
                      (DATA_RESERVATION_HOSPITAL_REFERRAL.id &&
                      DATA_RESERVATION_HOSPITAL_REFERRAL.id !== 0 ? (
                        <div
                          className={cx('p-5 pr-1 cursor-pointer')}
                          onClick={() =>
                            handleSetDropdown('reference', !dropdown.reference)
                          }
                        >
                          {!dropdown.reference ? (
                            <ChevronDownIcon color='#0D1C2E' />
                          ) : (
                            <ChevronUpIcon color='#0D1C2E' />
                          )}
                        </div>
                      ) : (
                        <div className={cx('w-44')}>
                          <Button
                            class={cx('outline')}
                            text='Tambah'
                            size='md'
                            iconButton={AddIcon}
                            onClick={() => {
                              handleSetFormType('referral');
                              handleSetIsOpenModal('reference', true);
                            }}
                            disabled={DATA_DETAIL_DOCTORS.status === 'failed'}
                          />
                        </div>
                      ))}
                  </div>
                  {/* Rujukan Data */}
                  {dropdown.reference && !isReservationHospitalReferralError && (
                    <div
                      className={cx(
                        'flex flex-col px-4 pb-4 h-auto w-full bg-white rounded-b-lg'
                      )}
                    >
                      {/* Faskes Tujuan */}
                      <div className={cx('mt-4 flex')}>
                        <div className={cx(styles.text__information_doctor)}>
                          <p>Faskes Tujuan</p>
                          <p>:</p>
                        </div>
                        <div className={cx('w-full ml-2')}>
                          <TextInput
                            name='healthFacility'
                            value={
                              DATA_RESERVATION_HOSPITAL_REFERRAL.faskesName ??
                              '-'
                            }
                            onChange={() => {}}
                            isValid
                          />
                        </div>
                      </div>
                      {/* Poli Tujuan */}
                      <div className={cx('mt-4 flex')}>
                        <div className={cx(styles.text__information_doctor)}>
                          <p>Poli Tujuan</p>
                          <p>:</p>
                        </div>
                        <div className={cx('w-full ml-2')}>
                          <TextInput
                            name='poli'
                            value={
                              DATA_RESERVATION_HOSPITAL_REFERRAL.polyName ?? '-'
                            }
                            onChange={() => {}}
                            isValid
                          />
                        </div>
                      </div>
                      {/* Dokter Tujuan */}
                      <div className={cx('mt-4 flex')}>
                        <div className={cx(styles.text__information_doctor)}>
                          <p>Dokter Tujuan</p>
                          <p>:</p>
                        </div>
                        <div className={cx('w-full ml-2')}>
                          <TextInput
                            name='doctor'
                            value={
                              DATA_RESERVATION_HOSPITAL_REFERRAL.doctorName ??
                              '-'
                            }
                            onChange={() => {}}
                            isValid
                          />
                        </div>
                      </div>
                      {/* Lampiran */}
                      <div className={cx('mt-4 flex')}>
                        <div className={cx(styles.text__information_doctor)}>
                          <p>Lampiran</p>
                          <p>:</p>
                        </div>
                        <div className={cx('w-full ml-2')}>
                          <Typography variant='h3' color='text-primary'>
                            <span
                              onClick={() => {
                                handleSetPdfViewUrl(
                                  DATA_RESERVATION_HOSPITAL_REFERRAL.attachmentUrl
                                );
                                handleSetIsOpenModal('previewPdf', true);
                              }}
                              className={cx(
                                'border-b-1 border-[#5600E8] cursor-pointer'
                              )}
                            >
                              Lihat Lampiran
                            </span>
                          </Typography>
                        </div>
                      </div>
                      {/* Edit Button */}
                      <div className={cx('w-full mt-8 flex justify-end')}>
                        <div className={cx('w-40')}>
                          <Button
                            class={cx('primary')}
                            text='Edit'
                            size='md'
                            iconButton={EditIcon}
                            className={cx('w-40')}
                            onClick={() => {
                              handleSetFormType('referral');
                              handleSetIsOpenModal('reference', true);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                  {dropdown.reference && isReservationHospitalReferralError && (
                    <ReservationError size={'sm'} />
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <ReservationError size={'lg'} />
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailDoctor;
