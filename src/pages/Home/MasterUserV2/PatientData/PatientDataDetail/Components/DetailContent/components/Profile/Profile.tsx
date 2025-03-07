import { useEffect } from 'react';

import { RadioButton, TextInput, Typography } from '@/src/components';
import { formatDate } from '@/utils/formatDate';
import usePatientData from '../../../../../usePatientData';

interface ProfileProps {
  patientId: string;
}

const Profile: React.FC<ProfileProps> = ({ patientId }) => {
  const {
    data: { detailPatientData, listPatientPayorData },
    method: { handleGetListPayorPatient },
  } = usePatientData();

  useEffect(() => {
    if (patientId) handleGetListPayorPatient(patientId);
  }, [patientId]);

  return (
    <div className='border-2 border-solid rounded-lg p-4 mt-4'>
      <div className='flex flex-col gap-4'>
        <div className='flex flex-col gap-4'>
          <div className='w-full'>
            <Typography variant='bodySmall' customClass='mb-2'>
              Jenis Pasien
            </Typography>
            <div className='flex gap-6 mt-2'>
              <RadioButton
                id='type-patient'
                name='type-patient'
                htmlFor='type-patient'
                customClassName='w-4 h-4'
                containerClass='text-sm'
                label={detailPatientData.patient_type}
                value={detailPatientData.patient_type}
                checked
              />
            </div>
          </div>

          <div className='flex gap-4'>
            <div className='w-2/3'>
              <TextInput
                id='first_name'
                name='first_name'
                label='Nama Lengkap'
                placeholder='Nama Lengkap'
                value={detailPatientData.first_name || '-'}
                disabled
              />
            </div>
            <div className='w-1/3'>
              <div>
                <Typography variant='bodySmall' customClass='mb-2'>
                  Jenis Kelamin
                </Typography>
                <div className='flex gap-6 mt-5 text-base'>
                  {detailPatientData.sex === 'Male' ? (
                    <RadioButton
                      id='gender-male'
                      name='gender-male'
                      label='Laki-Laki'
                      value='Male'
                      htmlFor='gender-male'
                      customClassName='w-4 h-4'
                      containerClass='text-sm'
                      checked
                    />
                  ) : (
                    <RadioButton
                      id='gender-female'
                      name='gender-female'
                      label='Perempuan'
                      value='Female'
                      htmlFor='gender-female'
                      containerClass='text-sm'
                      customClassName='w-4 h-4'
                      checked
                    />
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className='flex gap-4'>
            <TextInput
              id='no_identifier'
              name='no_identifier'
              label='Nomor KTP'
              placeholder='Nomor KTP'
              value={detailPatientData.no_identifier || '-'}
              disabled
            />
            <TextInput
              id='satu_sehat'
              name='satu_sehat'
              label='Nomor Satu Sehat'
              placeholder='Nomor Satu Sehat'
              value={detailPatientData.satu_sehat || '-'}
              disabled
            />
            <TextInput
              id='nik'
              name='nik'
              label='Nomor Nikes/NIK/NPK'
              placeholder='Nomor Nikes/NIK/NPK'
              value={detailPatientData.no_nikes || '-'}
              disabled
            />
          </div>

          {listPatientPayorData?.map((payor, index) => (
            <div key={index} className='flex gap-4'>
              <TextInput
                id={`penjamin-${index}`}
                name={`penjamin-${index}`}
                label={`Penjamin ${index + 1}`}
                placeholder='Penjamin'
                value={payor?.payor_name || '-'}
                disabled
              />
              <TextInput
                id={`id-penjamin-${index}`}
                name={`id-penjamin-${index}`}
                label='Nomor ID Penjamin'
                placeholder='Nomor ID Penjamin'
                value={payor?.no_identifier || '-'}
                disabled
              />
              <div className='w-full'></div>
            </div>
          ))}

          <div className='flex gap-4'>
            <TextInput
              id='mobile'
              name='mobile'
              label='Nomor HP'
              placeholder='Nomor HP'
              value={detailPatientData.mobile || '-'}
              disabled
            />
            <TextInput
              id='pob'
              name='pob'
              label='Tempat Lahir'
              placeholder='Tempat Lahir'
              value={detailPatientData.pob || '-'}
              disabled
            />
            <TextInput
              id='dob'
              name='dob'
              label='Tanggal Lahir'
              placeholder='dd/mm/yyyy'
              value={
                detailPatientData?.dob
                  ? formatDate(detailPatientData.dob, '/', 'MM', false)
                  : '-'
              }
              disabled
            />
          </div>

          <div className='w-1/3 pr-2'>
            <TextInput
              id='marital_status'
              name='marital_status'
              label='Status Pernikahan'
              placeholder='Status Pernikahan'
              value={detailPatientData.marital_status || '-'}
              disabled
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
