import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import {
  Breadcrumb,
  Button,
  ButtonBack,
  Card,
  Heading,
} from '@/src/components';
import {
  DetailPatient,
  ItemPayment,
  ModalCheckout,
  DirectPayment,
} from './components';
import { ModalError, ModalSuccess } from '@/src/commons';
import { ROUTES_TRANSACTION } from '@/src/constants';
import useDetailPayment from './useDetailPayment';

const initialPaymentData = {
  totalPrice: 0,
  totalDiscount: 0,
  totalGrand: 0,
};

const DetailPayment = () => {
  const navigate = useNavigate();

  const [canInput, setCanInput] = useState(false);
  const [openCheckout, setOpenCheckout] = useState(false);
  const [paymentData, setPaymentData] = useState(initialPaymentData);
  const [formSalesOrder, setFormSalesOrder] = useState([]);
  const [directCustomer, setDirectCustomer] = useState(null);

  const {
    data: { id, payment, dataPayment, paymentForm },
    method: {
      handleGetDetailPayment,
      handleUpdateSalesOrder,
      handleAddDirectSalesOrder,
      handleAddPaymentEntry,
      handleSetModalPaymentForm,
    },
  } = useDetailPayment();

  useEffect(() => {
    if (isDirect) return;
    handleGetDetailPayment();
  }, []);

  useEffect(() => {
    if (dataPayment?.patient?.no_identifier) setCanInput(true);
  }, [dataPayment?.patient?.no_identifier]);

  const handleCheckoutPayment = async (
    paymentMode,
    paidAmount,
    bankAccount,
    bankNumber
  ) => {
    if (isDirect) {
      await handleAddDirectSalesOrder(
        directCustomer,
        formSalesOrder,
        paymentMode,
        paidAmount,
        bankAccount,
        bankNumber
      );
    } else {
      await handleUpdateSalesOrder(formSalesOrder);
      await handleAddPaymentEntry(
        paymentMode,
        paidAmount,
        bankAccount,
        bankNumber
      );
    }
  };

  const handleCheckoutPaymentPayor = async () => {
    await handleUpdateSalesOrder(formSalesOrder);
    await handleAddPaymentEntry('Payor', paymentData?.totalGrand, '', '');
  };

  const isDirect = id === 'direct';

  return (
    <>
      <ModalSuccess
        isOpen={paymentForm.isSuccess}
        title='Pembayaran Berhasil!'
        description='Proses transaksi sudah selesai. Serahkan nota pembayaran kepada Pasien.'
        onCancel={() => navigate(ROUTES_TRANSACTION.PAYMENT)}
      />
      <ModalError
        isOpen={paymentForm.isError}
        title='Pembayaran Gagal!'
        description='Proses transaksi tidak berhasil. Silakan lakukan kembali proses Pembayaran.'
        onCancel={() => handleSetModalPaymentForm('isError', false)}
      />

      <ModalCheckout
        isOpen={openCheckout}
        onCancel={() => setOpenCheckout(false)}
        onSubmit={handleCheckoutPayment}
        paymentData={paymentData}
        isLoading={paymentForm.isLoading}
      />

      <div className='flex justify-between mb-4'>
        <Breadcrumb />
        <ButtonBack path={`${ROUTES_TRANSACTION.PAYMENT}`} />
      </div>

      <div className='mt-4 mb-6'>
        <Heading
          title={isDirect ? 'Pembelian Langsung' : 'Detail Pembayaran'}
          customClassName='text-primary font-bold'
        />
      </div>

      <Card background='bg-white' padding='p-4' customClassName='mt-4'>
        {isDirect && (
          <DirectPayment
            onCustomerSelect={(data) => {
              setDirectCustomer(data);
              setCanInput(true);
            }}
          />
        )}

        {!isDirect && dataPayment?.patient?.no_identifier && (
          <DetailPatient data={dataPayment} payor={dataPayment?.payor} />
        )}

        <ItemPayment
          data={dataPayment?.items || []}
          status={dataPayment?.sales_order?.status}
          payor={dataPayment?.payor}
          isLoading={payment.isLoading}
          isError={payment.isError}
          totalPayment={paymentData}
          handleTotalPayment={setPaymentData}
          handleSetSalesOrder={(value) => setFormSalesOrder(value)}
          isDirect={isDirect}
          isDisabled={!canInput}
        />

        <div className='my-5'>
          <hr className='bg-grayDarkBg' style={{ height: '2px' }} />
        </div>

        <div className='flex justify-between'>
          <div className='w-[230px]'>
            <Button
              class='outline'
              size='md'
              text='Kembali'
              onClick={() => navigate(`${ROUTES_TRANSACTION.PAYMENT}`)}
            />
          </div>
          {dataPayment?.sales_order.status !== 'Completed' && (
            <div className='w-[230px]'>
              <Button
                class='primary'
                size='md'
                text='Checkout'
                loading={payment.isLoading || paymentForm.isLoading}
                disabled={!canInput || formSalesOrder?.length < 1}
                onClick={async () => {
                  if (dataPayment?.payor === 'Umum') {
                    setOpenCheckout(true);
                  } else {
                    await handleCheckoutPaymentPayor();
                  }
                }}
              />
            </div>
          )}
        </div>
      </Card>
    </>
  );
};

export default DetailPayment;
