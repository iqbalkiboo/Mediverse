import { TextInput } from '@/src/components';
import usePatientData from '../../../../../usePatientData';

const Address = () => {
  const {
    data: { detailPatientData },
  } = usePatientData();

  return (
    <div className='border-2 border-solid rounded-lg p-4 mt-4'>
      <div className='flex flex-col gap-4'>
        <div className='w-full'>
          <TextInput
            type='textarea'
            rows={1}
            id='address'
            name='address'
            label='Alamat Lengkap'
            placeholder='Alamat Lengkap'
            value={detailPatientData.address || '-'}
            disabled
          />
        </div>
        <div className='w-full'>
          <div className='grid grid-cols-2 gap-4'>
            <TextInput
              id='province'
              name='province'
              label='Provinsi'
              placeholder='Provinsi'
              value={detailPatientData.province || '-'}
              disabled
            />
            <TextInput
              id='city'
              name='city'
              label='Kabupaten/Kota'
              placeholder='Kabupaten/Kota'
              value={detailPatientData.city || '-'}
              disabled
            />
          </div>
        </div>
        <div className='w-full'>
          <div className='grid grid-cols-2 gap-4'>
            <TextInput
              id='subdistrict'
              name='subdistrict'
              label='Kecamatan'
              placeholder='Kecamatan'
              value={detailPatientData.subdistrict || '-'}
              disabled
            />
            <TextInput
              id='village'
              name='village'
              label='Kelurahan'
              placeholder='Kelurahan'
              value={detailPatientData.village || '-'}
              disabled
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Address;
