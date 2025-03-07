import { useEffect, useMemo, useState } from 'react';

import {
  Button,
  Modal,
  RadioButton,
  SelectBox,
  TextInput,
  Typography,
} from '@/src/components/';
import { InsuranceRegister } from './components';
import { formatDate } from '@/utils/formatDate';
import { mapListOption } from '@/src/mappers/mapData';
import { useWindowSize } from '@/src/hooks/useWindowSize';
import useRegister from '@/home/MasterTransactionV2/Queue/register/useRegister';

interface ModalRegisterServiceProps {
  isOpen: boolean;
  onCancel: () => void;
  onSubmit: (data: any) => void;
  onSuccess: boolean;
  isLoading: boolean;
  dataPatient: any;
}

const registerOptions = [
  {
    value: 'public',
    label: 'Umum',
  },
  {
    value: 'insurance',
    label: 'Penjamin',
  },
];

const serviceOptions = [
  {
    label: 'Klinik',
    value: 'Clinic',
  },
  {
    label: 'Imunisasi',
    value: 'Immunization',
  },
  {
    label: 'Laboratorium',
    value: 'Laboratory',
  },
];

const initialFormData = {
  service: null,
  doctor: null,
  practiceHour: '',
};

const DoctorSchedule = ({ practiceHour }: { practiceHour: string }) => {
  return (
    <div className='flex justify-between items-center'>
      <div className='bg-primary rounded-full text-white text-sm font-bold px-4 py-1'>
        {practiceHour}
      </div>
    </div>
  );
};

const ModalRegisterService: React.FC<ModalRegisterServiceProps> = ({
  isOpen,
  onCancel,
  onSubmit,
  onSuccess,
  isLoading,
  dataPatient,
}) => {
  const { isMobile } = useWindowSize();

  const {
    data: { listServiceData, listDepartmentData, listDoctorData },
    method: {
      handleGetListService,
      handleGetListDepartment,
      handleGetListDoctor,
    },
  } = useRegister();

  const [patientType, setPatientType] = useState<string>('');
  const [serviceType, setServiceType] = useState<string>('');
  const [showFormData, setShowFormData] = useState(false);
  const [payorData, setPayorData] = useState<any>(null);
  const [formData, setFormData] = useState<any>(initialFormData);

  useEffect(() => {
    if (!isOpen) return;
    handleGetListDepartment();
  }, [isOpen]);

  useEffect(() => {
    setFormData(initialFormData);
    handleGetListService(serviceType);
  }, [serviceType]);

  useEffect(() => {
    if (onSuccess) handleCloseModal();
  }, [onSuccess]);

  const handleCloseModal = () => {
    setPatientType('');
    setServiceType('');
    setShowFormData(false);
    setPayorData(null);
    setFormData(initialFormData);
    onCancel();
  };

  const handleValidForm = () => {
    if (isLoading) return true;
    if (serviceType) {
      if (serviceType === 'Clinic' && formData.service && formData.doctor) {
        return true;
      } else if (serviceType !== 'Clinic' && formData.service) {
        return !(
          Array.isArray(formData.service) && formData.service?.length < 1
        );
      }
    }
    return false;
  };

  const listServiceTypeOptions = useMemo(() => {
    if (!serviceType || listServiceData?.length < 1) return [];

    const mapData = mapListOption(listServiceData, true, 'item_name');
    const filterOptions =
      serviceType === 'Laboratory'
        ? mapData
        : mapData?.filter((item) => item.value.stock.actual_qty > 0);
    return filterOptions || [];
  }, [serviceType, listServiceData]);

  return (
    <>
      <Modal
        open={isOpen}
        onClose={handleCloseModal}
        title='Pendaftaran Layanan'
        style={`${isMobile ? 'w-full' : ' w-2/4'}`}
      >
        <div className='mt-2'>
          <div className='flex flex-col gap-3 mt-4'>
            <div className='w-full flex justify-between gap-2 bg-graySeptenary rounded-md py-4 px-6'>
              <div className='flex-1 my-1'>
                <Typography variant='bodySmall' color='text-gray-500'>
                  Pasien:
                </Typography>
                <Typography variant='h4' color=''>
                  {dataPatient?.patient_name ?? '-'}
                </Typography>
              </div>
              <div className='flex-1 my-1'>
                <div className='grid grid-cols-2 gap-y-2'>
                  <div>
                    <Typography variant='bodySmall' color='text-gray-500'>
                      Tanggal Lahir:
                    </Typography>
                    <Typography variant='bodySmall' color=''>
                      {dataPatient?.dob
                        ? formatDate(dataPatient?.dob, ' ', 'MMMM', false)
                        : '-'}
                    </Typography>
                  </div>
                  <div>
                    <Typography variant='bodySmall' color='text-gray-500'>
                      Nomor Telepon:
                    </Typography>
                    <Typography variant='bodySmall' color=''>
                      {dataPatient?.mobile ?? '-'}
                    </Typography>
                  </div>
                  <div>
                    <Typography variant='bodySmall' color='text-gray-500'>
                      Jenis Pasien:
                    </Typography>
                    <Typography variant='bodySmall' color=''>
                      {payorData?.payor_name ? 'Penjamin' : 'Umum'}
                    </Typography>
                  </div>
                  <div>
                    <Typography variant='bodySmall' color='text-gray-500'>
                      Penjamin:
                    </Typography>
                    <Typography variant='bodySmall' color=''>
                      {payorData?.payor_name ? payorData?.payor_name : 'Umum'}
                    </Typography>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className='mb-2 flex'>
                <Typography variant='bodySmall'>Tipe Pasien</Typography>
                <Typography variant='bodySmall' color='text-danger'>
                  *
                </Typography>
              </div>
              <div className='flex gap-3'>
                {registerOptions.map((item) => (
                  <RadioButton
                    key={item.label}
                    id={item.value}
                    name='registerType'
                    containerClass='w-full bg-white border rounded-lg p-3 hover:cursor-pointer'
                    label={item.label}
                    value={item.value}
                    htmlFor={item.value}
                    checked={item.value === patientType}
                    onClick={() => {
                      setPatientType(item.value);
                      setPayorData(null);
                      setShowFormData(item.value === 'public');
                    }}
                    onChange={({ target }) => {
                      setPatientType(target.value);
                      setPayorData(null);
                      setShowFormData(target.value === 'public');
                    }}
                  />
                ))}
              </div>
            </div>

            {patientType === 'insurance' && !showFormData && (
              <InsuranceRegister
                dataPatient={dataPatient}
                handleCloseModal={handleCloseModal}
                handleSubmitData={(data) => {
                  setPayorData(data);
                  setShowFormData(true);
                }}
              />
            )}

            {showFormData && (
              <>
                <div>
                  <div className='mb-2 flex'>
                    <Typography variant='bodySmall'>Layanan</Typography>
                    <Typography variant='bodySmall' color='text-danger'>
                      *
                    </Typography>
                  </div>
                  <div className='flex gap-3'>
                    {serviceOptions.map((item) => (
                      <RadioButton
                        key={item.label}
                        id={item.value}
                        name='serviceType'
                        containerClass='w-full bg-white border rounded-lg p-3 hover:cursor-pointer'
                        label={item.label}
                        value={item.value}
                        htmlFor={item.value}
                        checked={item.value === serviceType}
                        onClick={() => setServiceType(item.value)}
                        onChange={({ target }) => setServiceType(target.value)}
                      />
                    ))}
                  </div>
                </div>

                {serviceType === 'Laboratory' && (
                  <>
                    <div className='flex'>
                      <TextInput
                        type='text'
                        label={
                          <>
                            Nomor Rujukan <i>(jika ada)</i>
                          </>
                        }
                        placeholder='Masukkan nomor rujukan'
                        containerStyle='h-11 rounded-r-none'
                      />
                      <div className='w-40 flex mt-auto'>
                        <Button
                          type='button'
                          class='outline'
                          size='sm'
                          text='Periksa'
                          customClassName='!h-11 !rounded-l-none !rounded-r-lg'
                          onClick={() => {}}
                        />
                      </div>
                    </div>
                    <div>
                      <TextInput
                        type='text'
                        label='Rujukan Dari'
                        placeholder='-'
                        containerStyle='h-11'
                      />
                    </div>
                  </>
                )}

                <div>
                  <SelectBox
                    label={
                      serviceType === 'Clinic' ? 'Tipe Poli' : 'Tipe Layanan'
                    }
                    tralingLabel={
                      serviceType !== 'Clinic' ? 'valuation_rate' : ''
                    }
                    className='rounded-lg'
                    placeholder={
                      serviceType === 'Clinic'
                        ? 'Pilih jenis poli'
                        : 'Pilih jenis layanan'
                    }
                    options={
                      serviceType === 'Clinic'
                        ? mapListOption(listDepartmentData, true, 'department')
                        : listServiceTypeOptions
                    }
                    value={formData.service}
                    isDisabled={!serviceType}
                    isMulti={serviceType !== 'Clinic'}
                    withCheckbox={serviceType !== 'Clinic'}
                    onChange={async (value) => {
                      setFormData({
                        service: value,
                        doctor: initialFormData.doctor,
                        practiceHour: initialFormData.practiceHour,
                      });
                      if (serviceType === 'Clinic')
                        await handleGetListDoctor(value.value.name);
                    }}
                    isClearable={false}
                    required
                  />
                </div>
                {serviceType === 'Clinic' && (
                  <div>
                    <SelectBox
                      label='Jadwal Dokter'
                      className='rounded-lg'
                      placeholder='Pilih jadwal dokter'
                      options={mapListOption(
                        listDoctorData,
                        true,
                        'practitoner_name'
                      )}
                      value={formData.doctor}
                      onChange={(value) => {
                        setFormData((prevState) => ({
                          ...prevState,
                          doctor: value,
                          practiceHour: `${value.value.current_time_slot.from_time} - ${value.value.current_time_slot.to_time}`,
                        }));
                      }}
                      isClearable={false}
                      isDisabled={!formData.service}
                      labelElement={
                        formData.practiceHour ? (
                          <DoctorSchedule
                            practiceHour={formData.practiceHour}
                          />
                        ) : undefined
                      }
                      required
                    />
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
                    disabled={!handleValidForm()}
                    onClick={() =>
                      onSubmit({ ...formData, serviceType, payor: payorData })
                    }
                  />
                </div>
              </>
            )}

            {!patientType && (
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
                  onClick={() => {}}
                  disabled
                />
              </div>
            )}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ModalRegisterService;
