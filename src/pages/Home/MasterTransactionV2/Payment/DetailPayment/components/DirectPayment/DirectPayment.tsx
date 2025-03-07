import { useEffect, useState } from 'react';

import { AsyncSelect, Button, Card, Typography } from '@/src/components';
import { AddIcon, EmptyStateTable } from '@/assets/images/svg';
import { getListCustomer } from '@/client/customer';
import ModalAddCustomer from '../ModalAddCustomer';

interface DetailPatientProps {
  onCustomerSelect: (data) => void;
}

const CustomOption = (props) => {
  const { data, innerRef, innerProps } = props;

  return (
    <div
      ref={innerRef}
      {...innerProps}
      style={{ cursor: 'pointer', borderBottom: '1px solid #E2E2E2' }}
    >
      {data.title ? (
        <div className='py-2 px-3'>
          <Typography variant='bodySmall' color='text-blackText'>
            {data.title || '-'}
          </Typography>
          <Typography
            variant='bodyXSmall'
            color='text-graySubtitle'
            customClass='mt-1'
          >
            {data.value?.mobile_no || '-'}
          </Typography>
        </div>
      ) : (
        <span>{data.label}</span>
      )}
    </div>
  );
};

const DirectPayment: React.FC<DetailPatientProps> = ({ onCustomerSelect }) => {
  const [customerData, setCustomerData] = useState<any>(null);
  const [isListEmpty, setIsListEmpty] = useState(false);
  const [openAddCustomer, setOpenAddCustomer] = useState(false);

  useEffect(() => {
    return () => {
      setCustomerData(null);
    };
  }, []);

  useEffect(() => {
    if (customerData) onCustomerSelect(customerData);
  }, [customerData]);

  const handleSearchListCustomer = async (search, callback) => {
    setIsListEmpty(false);
    const response = await getListCustomer({ noIdentifier: search });

    if (response.status === 200) {
      const result = response?.data?.data || [];
      setIsListEmpty(result.length < 1);
      return callback(
        result?.map((item) => {
          return {
            title: item?.customer_name,
            value: item,
          };
        })
      );
    }
  };

  return (
    <>
      <ModalAddCustomer
        isOpen={openAddCustomer}
        onCancel={() => setOpenAddCustomer(false)}
        onSubmit={(data) => {
          setCustomerData({
            name: data?.name,
            customer_name: data?.customer_name,
            mobile: data?.mobile_no,
            gender: data?.gender,
          });
          setIsListEmpty(false);
        }}
      />

      <div className='w-full flex flex-col items-center rounded-lg border-1 p-5 gap-6'>
        <div className='w-full'>
          <div className='mb-2 font-bold'>Data Customer</div>
          <AsyncSelect
            id='customer'
            name='customer'
            label=''
            placeholder='Cari nama customer atau no telpon di sini'
            options={[]}
            loadOptions={handleSearchListCustomer}
            onChange={(item) => {
              setCustomerData({
                name: item.value?.name,
                customer_name: item.value?.customer_name,
                mobile: item.value?.mobile_no,
                gender: item.value?.gender,
              });
            }}
            noOptionsMessage={() =>
              'Tidak ada data, ketik untuk cari data lain'
            }
            isSetValue={false}
            customOption={CustomOption}
            hideDropdown
          />
        </div>

        {isListEmpty && (
          <div className='w-1/4 flex flex-col items-center'>
            <EmptyStateTable />
            <Typography
              variant='bodyBase'
              color='text-grayText'
              customClass='font-bold'
            >
              Data tidak ditemukan.
            </Typography>
            <Button
              class='primary'
              text='Tambah Customer Baru'
              customClassName='mt-2 !rounded-md'
              iconButton={() => <AddIcon color='#ffffff' />}
              onClick={() => setOpenAddCustomer(true)}
            />
          </div>
        )}
      </div>

      <div>
        {customerData && (
          <Card background='bg-graySeptenary' customClassName='mt-4'>
            <div className='w-full flex items-start justify-between gap-2'>
              <div className='my-1'>
                <Typography variant='bodySmall' color='text-gray-500'>
                  Customer:
                </Typography>
                <div>
                  <Typography variant='h4' color=''>
                    {customerData?.customer_name || '-'}
                  </Typography>
                </div>
              </div>
              <div className='my-1'>
                <Typography variant='bodySmall' color='text-gray-500'>
                  Jenis Kelamin:
                </Typography>
                <Typography
                  variant='bodySmall'
                  color=''
                  customClass='font-medium'
                >
                  {customerData?.gender || '-'}
                </Typography>
              </div>
              <div className='my-1'>
                <Typography variant='bodySmall' color='text-gray-500'>
                  No. Telpon:
                </Typography>
                <Typography
                  variant='bodySmall'
                  color=''
                  customClass='font-medium'
                >
                  {customerData?.mobile || '-'}
                </Typography>
              </div>
            </div>
          </Card>
        )}
      </div>
    </>
  );
};

export default DirectPayment;
