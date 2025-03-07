import { useEffect, useState } from 'react';

import { SelectBox, TextInput, Typography, Button } from '@/src/components';
import { getPatientPayor } from '@/client/patient';
import useTransaction from '@/home/MasterTransactionV2/Transaction/useTransaction';

interface InsuranceRegisterProps {
  dataPatient: any;
  handleCloseModal: () => void;
  handleSubmitData: (data: any) => void;
}

const InsuranceRegister: React.FC<InsuranceRegisterProps> = ({
  dataPatient,
  handleCloseModal,
  handleSubmitData,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [insuranceOptions, setInsuranceOptions] = useState([]);
  const [insuranceType, setInsuranceType] = useState<any>(null);
  const [patientId, setPatientId] = useState('');
  const [payorData, setPayorData] = useState<any>('');
  const [errorMessage, setErrorMessage] = useState('');

  const {
    data: { modulePayor },
    method: { handleGetListPayor },
  } = useTransaction();

  useEffect(() => {
    handleGetListPayor();
  }, []);

  useEffect(() => {
    if (modulePayor.data && modulePayor.data.length > 0) {
      const dataOptions = modulePayor.data?.map((item) => {
        return {
          label: item?.payor_name,
          value: item,
        };
      });
      setInsuranceOptions(dataOptions);
    }
  }, [modulePayor]);

  const handleCheckPatient = async () => {
    try {
      setLoading(true);
      setErrorMessage('');
      setPayorData(null);
      const responseData = await getPatientPayor({
        noIdentifierPatient: dataPatient?.name || '',
        noIdentifier: patientId,
        payor: insuranceType?.name || '',
      });
      if (responseData.data?.data?.length > 0) {
        setPayorData(responseData.data?.data[0]);
      } else {
        setErrorMessage('Data tidak ditemukan!');
      }
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage('Data tidak ditemukan!');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex flex-col gap-3'>
      <SelectBox
        label='Penjamin'
        className='bg-[#F5F8FC] border-[#F5F8FC] rounded-lg'
        options={insuranceOptions}
        placeholder='Pilih penjamin'
        onChange={(value) => setInsuranceType(value.value)}
        required
      />

      <div className='flex'>
        <TextInput
          type='text'
          id='patient-id'
          name='patientId'
          label='Nomor Penjamin'
          placeholder='Masukkan nomor Penjamin'
          containerStyle='h-11 rounded-r-none'
          value={patientId}
          onInput={({ target }) => setPatientId(target.value)}
          disabled={loading}
          required
        />
        <div className='w-40 flex mt-auto'>
          <Button
            type='button'
            class='outline'
            text='Periksa'
            customClassName='!h-11 !rounded-md !rounded-l-none'
            disabled={!patientId}
            onClick={handleCheckPatient}
            loading={loading}
          />
        </div>
      </div>

      <TextInput
        type='text'
        label='Nama Peserta'
        placeholder='-'
        containerStyle='!h-11'
        value={payorData?.patient_name || ''}
        required
        disabled
      />

      {errorMessage && (
        <div className='text-center p-2 rounded-md bg-[#F100000F] border border-[#F10000]'>
          <Typography variant='bodySmall' color=''>
            {errorMessage || 'Data tidak ditemukan!'}
          </Typography>
        </div>
      )}

      <div className='flex gap-3 mt-3'>
        <Button
          id='register-cancel-btn'
          type='button'
          class='outline'
          text='Batal'
          customClassName='!rounded-md'
          onClick={handleCloseModal}
        />
        <Button
          id='register-continue-btn'
          type='button'
          class='primary'
          text='Selanjutnya'
          customClassName='!rounded-md'
          disabled={!payorData}
          onClick={() => handleSubmitData(payorData)}
        />
      </div>
    </div>
  );
};

export default InsuranceRegister;
