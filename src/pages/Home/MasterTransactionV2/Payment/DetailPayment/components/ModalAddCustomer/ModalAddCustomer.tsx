import { useState } from 'react';
import { Controller } from 'react-hook-form';

import {
  Button,
  Card,
  Modal,
  RadioButton,
  TextInput,
  Typography,
} from '@/src/components/';
import { ModalError } from '@/src/commons';
import { postCustomer } from '@/client/customer';
import { useWindowSize } from '@/src/hooks/useWindowSize';
import useDetailPayment from '../../useDetailPayment';

interface ModalAddCustomerProps {
  isOpen: boolean;
  onCancel: () => void;
  onSubmit: (data) => void;
}

const initialFormCustomerData = {
  customer_name: '',
  gender: '',
  mobile_no: '',
};

const ModalAddCustomer: React.FC<ModalAddCustomerProps> = ({
  isOpen,
  onCancel,
  onSubmit,
}) => {
  const { isMobile } = useWindowSize();

  const [loading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [formCustomerData, setFormCustomerData] = useState(
    initialFormCustomerData
  );

  const {
    data: { control, errors, isValid },
    method: { handleSubmit, register },
  } = useDetailPayment();

  const handleCloseModal = () => {
    setIsLoading(false);
    setErrorMessage('');
    setFormCustomerData(initialFormCustomerData);
    onCancel();
  };

  const handleSetFormCustomer = (field, value) => {
    setFormCustomerData((prevState) => ({ ...prevState, [field]: value }));
  };

  const handleSubmitData = async () => {
    setIsLoading(true);
    const response = await postCustomer({ data: formCustomerData });
    if (response.status === 200) {
      onSubmit(response?.data?.data);
      handleCloseModal();
    } else {
      setErrorMessage(response.data?.message);
    }
    setIsLoading(false);
  };

  return (
    <>
      <ModalError
        isOpen={!!errorMessage}
        title='Gagal'
        description={errorMessage}
        onCancel={() => setErrorMessage('')}
      />

      <Modal
        open={isOpen}
        onClose={handleCloseModal}
        title='Tambah Customer'
        titleSize='h2'
        style={`${isMobile ? 'w-full' : ' w-2/4'}`}
        closeIcon={false}
      >
        <div className='mt-2 mb-2'>
          <Card background='bg-white' padding='p-0'>
            <div className='flex flex-col gap-6 mt-4'>
              <TextInput
                id='customer_name'
                name='customer_name'
                label='Nama Customer'
                placeholder='Masukkan nama customer'
                value={formCustomerData.customer_name ?? ''}
                register={register}
                isValid={!errors.customer_name?.message}
                errorMessage={errors.customer_name?.message?.toString()}
                onInput={({ target }) =>
                  handleSetFormCustomer('customer_name', target.value)
                }
                required
              />
              <div>
                <Typography variant='bodySmall' color='' customClass='mb-2'>
                  Jenis Kelamin
                  <span className='text-danger'>*</span>
                </Typography>
                <div className='flex gap-6 text-base'>
                  <Controller
                    name='gender'
                    control={control}
                    render={({ field: { onChange, name } }) => (
                      <>
                        <RadioButton
                          id='gender-male'
                          name={name}
                          label='Laki-Laki'
                          value='Laki-Laki'
                          htmlFor='gender-male'
                          customClassName='w-4 h-4 text-base'
                          checked={formCustomerData.gender === 'Laki-Laki'}
                          onChange={({ target }) => {
                            handleSetFormCustomer('gender', target.value);
                            onChange(target.value);
                          }}
                        />
                        <RadioButton
                          id='gender-female'
                          name={name}
                          label='Perempuan'
                          value='Perempuan'
                          htmlFor='gender-female'
                          customClassName='w-4 h-4'
                          checked={formCustomerData.gender === 'Perempuan'}
                          onChange={({ target }) => {
                            handleSetFormCustomer('gender', target.value);
                            onChange(target.value);
                          }}
                        />
                      </>
                    )}
                  />
                </div>
              </div>
              <TextInput
                type='number'
                id='mobile_no'
                name='mobile_no'
                label='No. Telpon'
                placeholder='Masukkan nomor telpon'
                value={formCustomerData.mobile_no ?? ''}
                register={register}
                isValid={!errors.mobile_no?.message}
                errorMessage={errors.mobile_no?.message?.toString()}
                onInput={({ target }) =>
                  handleSetFormCustomer('mobile_no', target.value)
                }
                required
              />
            </div>

            <div className='w-full flex justify-between gap-3 mt-8'>
              <div className='w-[320px]'>
                <Button
                  id='call-cancel-btn'
                  size='md'
                  class='outline'
                  text='Batal'
                  onClick={handleCloseModal}
                />
              </div>
              <div className='w-[320px]'>
                <Button
                  id='call-continue-btn'
                  size='md'
                  class='primary'
                  text='Tambah'
                  disabled={!isValid}
                  loading={loading}
                  onClick={handleSubmit(handleSubmitData)}
                />
              </div>
            </div>
          </Card>
        </div>
      </Modal>
    </>
  );
};

export default ModalAddCustomer;
