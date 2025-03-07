import { useEffect } from 'react';

import { Button, Card, TextInput, Typography } from '@/src/components';
import { PencilUpdateIcon } from '@/assets/images/svg';
import usePatientTreatment from '../../usePatientTreatment';
import useTransaction from '@/home/MasterTransactionV2/Transaction/useTransaction';

interface DetailSoapClinicProps {
  onEditClick: () => void;
}

const DetailSoapClinic: React.FC<DetailSoapClinicProps> = ({ onEditClick }) => {
  const {
    data: { dataClinicOutpatient, formSoap },
    method: { calculateBmi },
  } = usePatientTreatment();

  const {
    data: { listSelectIcd10 },
    method: { handleGetListIcd10 },
  } = useTransaction();

  useEffect(() => {
    handleGetListIcd10();
  }, []);

  useEffect(() => {
    calculateBmi();
  }, [formSoap.objective.height, formSoap.objective.weight]);

  return (
    <div className='flex flex-col gap-4 mt-4'>
      {dataClinicOutpatient?.service_transaction_status !== 'Selesai' && (
        <div className='w-[300px] flex mt-2 ml-auto mr-0'>
          <Button
            size='md'
            class='outline'
            text='Edit SOAP'
            iconButton={() => <PencilUpdateIcon color='#5600E8' />}
            onClick={onEditClick}
          />
        </div>
      )}

      <div>
        <Typography variant='h5' color='' customClass='mb-2'>
          SUBJECTIVE
        </Typography>
        <Card background='bg-graySeptenary' padding='p-6'>
          <div className='flex flex-col gap-2'>
            <div className='w-full mb-1'>
              <TextInput
                id='subjective.description'
                name='subjective.description'
                labelRow='Keluhan Pasien'
                customClassName='flex border-none'
                backgroundColor='bg-grayDarkBg'
                value={formSoap.subjective.description ?? ''}
                disabled
              />
            </div>
            <div className='flex flex-col md:flex-row gap-4'>
              <div className='w-full flex-1'>
                <TextInput
                  id='psychosocial_spiritual'
                  name='subjective.psychosocial_spiritual'
                  labelRow='Psikososial-Spritual'
                  customClassName='flex'
                  backgroundColor='bg-grayDarkBg'
                  value={formSoap.subjective.psychosocial_spiritual ?? ''}
                  disabled
                />
              </div>
              <div className='w-full flex-1'>
                <TextInput
                  id='patient_health_history'
                  name='subjective.patient_health_history'
                  labelRow='Riwayat Kesehatan Pasien'
                  customClassName='flex'
                  backgroundColor='bg-grayDarkBg'
                  value={formSoap.subjective.patient_health_history ?? ''}
                  disabled
                />
              </div>
            </div>
            <div className='flex flex-col md:flex-row gap-4 mt-2'>
              <TextInput
                id='family_health_history'
                name='subjective.family_health_history'
                labelRow='Riwayat Kesehatan Keluarga'
                customClassName='flex'
                backgroundColor='bg-grayDarkBg'
                value={formSoap.subjective.family_health_history ?? ''}
                disabled
              />
              <TextInput
                id='medication_history'
                name='subjective.medication_history'
                labelRow='Riwayat Penggunaan Obat'
                customClassName='flex'
                backgroundColor='bg-grayDarkBg'
                value={formSoap.subjective.medication_history ?? ''}
                disabled
              />
            </div>
            <div className='w-full flex flex-col gap-3 mt-2'>
              <TextInput
                id='allergy'
                name='allergy'
                labelRow='Riwayat Alergi'
                customClassName='flex'
                backgroundColor='bg-grayDarkBg'
                value={
                  dataClinicOutpatient?.patient_detail?.allergies?.split(',') ??
                  ''
                }
                disabled
              />
              <TextInput
                id='allergy_history'
                name='objective.allergy_history'
                labelRow=' '
                customClassName='flex'
                backgroundColor='bg-grayDarkBg'
                value={formSoap.objective.allergy_history ?? ''}
                disabled
              />
            </div>
          </div>
        </Card>
      </div>

      <div>
        <Typography variant='h5' color='' customClass='mb-2'>
          OBJECTIVE
        </Typography>
        <Card background='bg-graySeptenary' padding='p-6'>
          <div className='w-full flex flex-col gap-2'>
            <div className='grid md:grid-cols-4 xl:grid-cols-5 gap-4'>
              <div className='col-span-2 mb-1'>
                <TextInput
                  type='number'
                  id='temperature'
                  name='objective.temperature'
                  labelRow='Suhu Tubuh'
                  customClassName='flex'
                  backgroundColor='bg-grayDarkBg'
                  trailingText='&deg;C'
                  value={formSoap.objective.temperature ?? ''}
                  disabled
                />
              </div>
            </div>
            <div className='grid md:grid-cols-4 xl:grid-cols-5 gap-4'>
              <div className='col-span-2 mb-1'>
                <TextInput
                  type='number'
                  id='height'
                  name='objective.height'
                  labelRow='Tinggi Badan'
                  customClassName='flex'
                  backgroundColor='bg-grayDarkBg'
                  trailingText='Cm'
                  value={formSoap.objective.height ?? ''}
                  disabled
                />
              </div>
              <div className='col-span-2 lg:col-start-3 mb-1'>
                <TextInput
                  type='number'
                  id='weight'
                  name='objective.weight'
                  labelRow='Berat Badan'
                  customClassName='flex'
                  backgroundColor='bg-grayDarkBg'
                  trailingText='Kg'
                  value={formSoap.objective.weight ?? ''}
                  disabled
                />
              </div>
            </div>
            <div className='grid md:grid-cols-4 xl:grid-cols-5 gap-4'>
              <div className='col-span-2 mb-1'>
                <TextInput
                  type='number'
                  id='bmi'
                  name='objective.bmi'
                  labelRow='BMI'
                  customClassName='flex'
                  backgroundColor='bg-grayDarkBg'
                  value={formSoap.objective.bmi ?? ''}
                  disabled
                />
              </div>
              <div className='col-span-2 lg:col-start-3 mb-1'>
                <TextInput
                  id='bmi_result'
                  name='objective.bmi_result'
                  labelRow='Kategori BMI'
                  customClassName='flex'
                  backgroundColor='bg-grayDarkBg'
                  value={formSoap.objective.bmi_result ?? ''}
                  disabled
                />
              </div>
            </div>
            <div className='grid md:grid-cols-4 xl:grid-cols-5 gap-4'>
              <div className='col-span-2 mb-1'>
                <TextInput
                  type='number'
                  id='systolic'
                  name='objective.systolic'
                  labelRow='Sistol'
                  customClassName='flex'
                  backgroundColor='bg-grayDarkBg'
                  trailingText='mmHg'
                  value={formSoap.objective.systolic ?? ''}
                  disabled
                />
              </div>
              <div className='col-span-2 lg:col-start-3 mb-1'>
                <TextInput
                  type='number'
                  id='diastolic'
                  name='objective.diastolic'
                  labelRow='Diastol'
                  customClassName='flex'
                  backgroundColor='bg-grayDarkBg'
                  trailingText='mmHg'
                  value={formSoap.objective.diastolic ?? ''}
                  disabled
                />
              </div>
            </div>
            <div className='grid md:grid-cols-4 xl:grid-cols-5 gap-4'>
              <div className='col-span-2 mb-1'>
                <TextInput
                  type='number'
                  id='respiration_rate'
                  name='objective.respiration_rate'
                  labelRow='Pernapasan'
                  customClassName='flex'
                  backgroundColor='bg-grayDarkBg'
                  trailingText='x/Menit'
                  value={formSoap.objective.respiration_rate ?? ''}
                  disabled
                />
              </div>
            </div>
            <div className='grid md:grid-cols-4 xl:grid-cols-5 gap-4'>
              <div className='col-span-2 mb-1'>
                <TextInput
                  type='number'
                  id='pulse_rate'
                  name='objective.pulse_rate'
                  labelRow='Nadi'
                  customClassName='flex'
                  backgroundColor='bg-grayDarkBg'
                  trailingText='x/Menit'
                  value={formSoap.objective.pulse_rate ?? ''}
                  disabled
                />
              </div>
            </div>
            <div className='grid md:grid-cols-4 xl:grid-cols-5 gap-4'>
              <div className='col-span-2 mb-1'>
                <TextInput
                  type='number'
                  id='heart_rate'
                  name='objective.heart_rate'
                  labelRow='Detak Jantung'
                  customClassName='flex'
                  backgroundColor='bg-grayDarkBg'
                  trailingText='x/Menit'
                  value={formSoap.objective.heart_rate ?? ''}
                  disabled
                />
              </div>
            </div>
          </div>
        </Card>
      </div>

      <div>
        <Typography variant='h5' color='' customClass='mb-2'>
          ASSESSMENT
        </Typography>
        <Card background='bg-graySeptenary' padding='p-6'>
          <div className='flex flex-col gap-4'>
            {formSoap?.assessment?.map((data, index) => (
              <div key={index} className='flex flex-col gap-2'>
                <div className='w-full mb-1'>
                  <TextInput
                    id={'icd10-' + index}
                    name={'icd10-' + index}
                    labelRow='ICD 10'
                    customClassName='flex border-none'
                    backgroundColor='bg-grayDarkBg'
                    value={
                      data?.assessment?.name
                        ? listSelectIcd10?.find(
                            (item) =>
                              item?.value?.name === data?.assessment?.name
                          )?.title
                        : ''
                    }
                    disabled
                  />
                </div>
                <div className='grid md:grid-cols-2 gap-4'>
                  <div className='flex-1 mb-1'>
                    <TextInput
                      id={'case' + index}
                      name={'case' + index}
                      labelRow='Kasus'
                      customClassName='flex'
                      backgroundColor='bg-grayDarkBg'
                      value={data?.case_type ?? ''}
                      disabled
                    />
                  </div>
                  <div className='flex-1 mb-1'>
                    <TextInput
                      id={'category-' + index}
                      name={'category-' + index}
                      labelRow='Primary/Secondary'
                      customClassName='flex'
                      backgroundColor='bg-grayDarkBg'
                      value={data?.case_category ?? ''}
                      disabled
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div>
        <Typography variant='h5' color='' customClass='mb-2'>
          PLANNING
        </Typography>
        <Card background='bg-graySeptenary' padding='p-6'>
          <TextInput
            rows={9}
            id='planning.doctors_note'
            name='planning.doctors_note'
            labelRow='Detak Jantung'
            customClassName='flex'
            backgroundColor='bg-grayDarkBg'
            value={formSoap.planning.doctors_note ?? ''}
            disabled
            required
          />
        </Card>
      </div>

      <div>
        <Typography variant='h5' color='' customClass='mb-2'>
          EDUKASI
        </Typography>
        <Card background='bg-graySeptenary' padding='p-6'>
          <div className='flex flex-col gap-4'>
            <div className='flex flex-col md:flex-row gap-4'>
              <div className='w-full flex-1'>
                <TextInput
                  id='disease_explanation'
                  name='disease_explanation'
                  labelRow='Penjelasan Penyakit'
                  customClassName='flex'
                  backgroundColor='bg-grayDarkBg'
                  value={
                    formSoap.education.disease_explanation === 1
                      ? 'Teredukasi'
                      : 'Belum Teredukasi'
                  }
                  disabled
                />
              </div>
              <div className='w-full flex-1'>
                <TextInput
                  id='examination_results'
                  name='examination_results'
                  labelRow='Hasil Pemeriksaan'
                  customClassName='flex'
                  backgroundColor='bg-grayDarkBg'
                  value={
                    formSoap.education.examination_results === 1
                      ? 'Teredukasi'
                      : 'Belum Teredukasi'
                  }
                  disabled
                />
              </div>
            </div>
            <div className='flex flex-col md:flex-row gap-4'>
              <div className='w-full flex-1'>
                <TextInput
                  id='medical_action'
                  name='medical_action'
                  labelRow='Tindakan Medis'
                  customClassName='flex'
                  backgroundColor='bg-grayDarkBg'
                  value={
                    formSoap.education.medical_action === 1
                      ? 'Teredukasi'
                      : 'Belum Teredukasi'
                  }
                  disabled
                />
              </div>
              <div className='w-full flex-1'>
                <TextInput
                  id='complications'
                  name='complications'
                  labelRow='Komplikasi'
                  customClassName='flex'
                  backgroundColor='bg-grayDarkBg'
                  value={
                    formSoap.education.complications === 1
                      ? 'Teredukasi'
                      : 'Belum Teredukasi'
                  }
                  disabled
                />
              </div>
            </div>
            <div className='flex flex-col md:flex-row gap-4'>
              <div className='w-full flex-1'>
                <TextInput
                  id='psychosocial_spiritual'
                  name='subjective.psychosocial_spiritual'
                  labelRow='Efek Samping'
                  customClassName='flex'
                  backgroundColor='bg-grayDarkBg'
                  value={
                    formSoap.education.side_effects_risks === 1
                      ? 'Teredukasi'
                      : 'Belum Teredukasi'
                  }
                  disabled
                />
              </div>
              <div className='w-full flex-1'>
                <TextInput
                  id='patient_health_history'
                  name='subjective.patient_health_history'
                  labelRow='Lainnya'
                  customClassName='flex'
                  backgroundColor='bg-grayDarkBg'
                  value={formSoap.education.other_details ?? ''}
                  disabled
                />
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DetailSoapClinic;
