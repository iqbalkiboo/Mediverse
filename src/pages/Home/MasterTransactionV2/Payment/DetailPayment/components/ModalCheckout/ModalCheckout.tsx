import { useEffect, useState } from 'react';

import {
  Button,
  Modal,
  SelectBox,
  TextInput,
  TextInputMask,
  Typography,
} from '@/src/components/';
import { ArrowDownIcon, RpIcon } from '@/assets/images/svg';
import { useWindowSize } from '@/src/hooks/useWindowSize';
import { formatRupiah } from '@/utils/fromatCurrency';
import useDetailPayment from '../../useDetailPayment';

interface ModalCheckoutProps {
  isOpen: boolean;
  onCancel: () => void;
  onSubmit: (
    paymentMode: string,
    paidAmount: number,
    bankAccount: string,
    bankNumber: string
  ) => void;
  paymentData: any;
  isLoading: boolean;
}

const Disclosure = ({ isOpen, toggle, title, children }) => {
  return (
    <div className='border-b border-gray-200'>
      <button
        className='w-full flex justify-between items-center text-left py-4'
        onClick={toggle}
      >
        <span className='font-semibold'>{title}</span>
        <span
          className={`transform transition-transform duration-300 ${
            isOpen ? 'rotate-180' : 'rotate-0'
          }`}
        >
          <ArrowDownIcon width='20' height='20' />
        </span>
      </button>
      {isOpen && <div className='mb-3'>{children}</div>}
    </div>
  );
};

const ModalCheckout: React.FC<ModalCheckoutProps> = ({
  isOpen,
  onCancel,
  onSubmit,
  paymentData,
  isLoading,
}) => {
  const { isMobile } = useWindowSize();

  const [openIndex, setOpenIndex] = useState(null);
  const [receivedAmount, setReceivedAmount] = useState('');
  const [bankPayment, setBankPayment] = useState('');
  const [bankNumber, setBankNumber] = useState('');
  const [modePayment, setModePayment] = useState<string[]>([]);
  const [bankOptions, setBankOptions] = useState<any[]>([]);

  const {
    data: { listModePaymentData, listBankAccountData },
    method: { handleGetListModePayment, handleGetListBankAccount },
  } = useDetailPayment();

  useEffect(() => {
    handleGetListModePayment();
    handleGetListBankAccount();
  }, []);

  useEffect(() => {
    if (listModePaymentData?.length < 1) return;
    setModePayment(listModePaymentData?.map((item) => item.mode_of_payment));
  }, [listModePaymentData]);

  useEffect(() => {
    if (listBankAccountData?.length < 1) return;
    const formatBankData = listBankAccountData.map((item) => {
      return {
        label: item.bank_name,
        value: item,
      };
    });
    setBankOptions(formatBankData);
  }, [listBankAccountData]);

  const handleToggle = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const handleClose = () => {
    setOpenIndex(null);
    setReceivedAmount('');
    setBankPayment('');
    setBankNumber('');
    onCancel();
  };

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      style={`${isMobile ? 'w-full' : 'w-[500px]'}`}
      title='Checkout'
      titleSize='h1'
      titleColor='text-primary'
    >
      <div className='mt-4'>
        <Typography variant='bodySmall' color=''>
          Yang harus dibayarkan
        </Typography>
        <div className='bg-black text-white rounded-xl mt-2'>
          <div className='flex justify-between items-center py-3 px-6'>
            <Typography variant='bodySmall' customClass='font-medium'>
              Grand Total
            </Typography>
            <Typography variant='h2' customClass='font-bold'>
              {formatRupiah(paymentData?.totalGrand, ' ')}
            </Typography>
          </div>
        </div>
      </div>
      <div className='mt-6'>
        <Typography variant='h2' color=''>
          Pilih Metode Pembayaran
        </Typography>
        <div className='w-full mx-auto mt-4'>
          {modePayment.includes('Cash') && (
            <Disclosure
              isOpen={openIndex === 0}
              toggle={() => handleToggle(0)}
              title='Cash'
            >
              <div className='flex flex-col gap-3 mb-5'>
                <TextInputMask
                  type='text'
                  id='receivedAmount'
                  name='receivedAmount'
                  variant='currency'
                  label='Uang Diterima'
                  customClassName='w-44'
                  leftIcon={RpIcon}
                  value={!isNaN(Number(receivedAmount)) ? receivedAmount : ''}
                  onValueChange={(value) => setReceivedAmount(value)}
                />
                <TextInputMask
                  type='text'
                  id='changedAmount'
                  name='changedAmount'
                  variant='currency'
                  label='Uang Kembalian'
                  customClassName='w-44'
                  leftIcon={RpIcon}
                  value={
                    Number(receivedAmount) - paymentData?.totalGrand > 0
                      ? Number(receivedAmount) - paymentData?.totalGrand
                      : 0
                  }
                  isDisabled
                />
              </div>
              <div className='flex justify-end'>
                <div className='w-1/3'>
                  <Button
                    class='primary'
                    size='md'
                    text='Proses'
                    customClassName='w-1/3'
                    disabled={
                      !receivedAmount ||
                      receivedAmount < paymentData?.totalGrand
                    }
                    onClick={() =>
                      onSubmit('Cash', Number(receivedAmount), '', '')
                    }
                    loading={isLoading}
                  />
                </div>
              </div>
            </Disclosure>
          )}

          {modePayment.includes('QRIS') && (
            <Disclosure
              isOpen={openIndex === 1}
              toggle={() => handleToggle(1)}
              title='QRIS'
            >
              <div className='mb-5'>
                <TextInputMask
                  type='text'
                  id='receivedAmount'
                  name='receivedAmount'
                  variant='currency'
                  label='Uang Diterima'
                  customClassName='w-44'
                  leftIcon={RpIcon}
                  value={
                    !isNaN(Number(paymentData?.totalGrand))
                      ? paymentData?.totalGrand
                      : ''
                  }
                  onValueChange={(value) => setReceivedAmount(value)}
                  isDisabled
                />
              </div>
              <div className='flex justify-end'>
                <div className='w-1/3'>
                  <Button
                    class='primary'
                    size='md'
                    text='Proses'
                    onClick={() =>
                      onSubmit('QRIS', Number(paymentData?.totalGrand), '', '')
                    }
                    customClassName='w-1/3'
                    loading={isLoading}
                  />
                </div>
              </div>
            </Disclosure>
          )}

          {modePayment.includes('Debit/Kredit') && (
            <Disclosure
              isOpen={openIndex === 2}
              toggle={() => handleToggle(2)}
              title='Debit/Kredit'
            >
              <div className='flex flex-col gap-3 mb-5'>
                <SelectBox
                  name='bank'
                  label='Bank Pemilik Kartu'
                  placeholder='Pilih'
                  options={bankOptions}
                  onChange={(value) => setBankPayment(value.value.name)}
                  required
                />
                <TextInput
                  type='number'
                  size='sm'
                  name='card'
                  label='Nomor Kartu'
                  placeholder='-'
                  value={bankNumber}
                  onInput={({ target }) => setBankNumber(target.value)}
                  required
                />
                <TextInputMask
                  type='text'
                  id='receivedAmount'
                  name='receivedAmount'
                  variant='currency'
                  label='Uang Diterima'
                  customClassName='w-44'
                  leftIcon={RpIcon}
                  value={
                    !isNaN(Number(paymentData?.totalGrand))
                      ? paymentData?.totalGrand
                      : ''
                  }
                  onValueChange={(value) => setReceivedAmount(value)}
                  isDisabled
                />
              </div>
              <div className='flex justify-end'>
                <div className='w-1/3'>
                  <Button
                    class='primary'
                    size='md'
                    text='Proses'
                    customClassName='w-1/3'
                    onClick={() =>
                      onSubmit(
                        'Debit/Kredit',
                        Number(paymentData?.totalGrand),
                        bankPayment,
                        bankNumber
                      )
                    }
                    disabled={!bankNumber || !bankPayment}
                    loading={isLoading}
                  />
                </div>
              </div>
            </Disclosure>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default ModalCheckout;
