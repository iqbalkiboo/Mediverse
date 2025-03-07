import { useEffect, useState } from 'react';
import cx from 'classnames';

import {
  Button,
  Counter,
  Modal,
  TextInput,
  Typography,
} from '@/src/components/';
import { useWindowSize } from '@/src/hooks/useWindowSize';

interface ModalAddDrugProps {
  isOpen: boolean;
  drugData: any;
  onCancel: () => void;
  onSubmit: (value: any) => void;
  onSubmitEdit: (index: number, value: any) => void;
}

const ModalAddDrug: React.FC<ModalAddDrugProps> = ({
  isOpen,
  drugData,
  onCancel,
  onSubmit,
  onSubmitEdit,
}) => {
  const { isMobile } = useWindowSize();

  const [total, setTotal] = useState(1);
  const [instruction, setInstruction] = useState('');

  useEffect(() => {
    if (drugData?.quantity) setTotal(drugData?.quantity);
    if (drugData?.instruction) setInstruction(drugData?.instruction);
  }, [drugData]);

  const handleCloseModal = () => {
    setTotal(1);
    setInstruction('');
    onCancel();
  };

  const handleSubmitModal = () => {
    const data = {
      isEdit: drugData?.isEdit || undefined,
      item: drugData?.item || undefined,
      name: drugData?.name,
      itemName: drugData?.item_name,
      unit: drugData?.stock_uom,
      quantity: total,
      instruction: instruction,
      stock: drugData?.stock?.actual_qty || 0,
    };
    drugData?.editData ? onSubmitEdit(drugData?.index, data) : onSubmit(data);
    handleCloseModal();
  };

  return (
    <>
      <Modal
        open={isOpen}
        onClose={handleCloseModal}
        title='Tambah Obat'
        titleSize='h2'
        style={cx({
          'w-full': isMobile,
          'w-[800px]': !isMobile,
        })}
        closeIcon={false}
      >
        <div className='mt-4'>
          <div className='flex flex-col gap-3 mb-5'>
            <div className='flex'>
              <TextInput
                label='Nama Obat'
                placeholder='Nama obat'
                containerStyle='h-11'
                value={drugData?.item_name}
                disabled
              />
            </div>
            <div className='flex gap-4'>
              <div className='flex-1'>
                <div className='mb-2 flex'>
                  <Typography variant='bodySmall'>Jumlah Diresepkan</Typography>
                  <Typography variant='bodySmall' color='text-danger'>
                    *
                  </Typography>
                </div>
                <div className='h-[44px]'>
                  <Counter
                    value={total}
                    onDecrement={(value) => setTotal(value)}
                    onIncrement={(value) => setTotal(value)}
                  />
                </div>
                {total > (drugData?.stock?.actual_qty || 0) && (
                  <div className='flex mt-1 text-[10px] text-danger gap-1'>
                    <div
                      className='text-center rounded-full'
                      style={{
                        width: 14,
                        height: 14,
                        border: '1px solid #921919',
                      }}
                    >
                      <span>!</span>
                    </div>
                    <span>Melebihi jumlah Stok tersedia</span>
                  </div>
                )}
              </div>
              <div className='flex-1'>
                <TextInput
                  label='Satuan'
                  placeholder='satuan'
                  containerStyle='h-11'
                  value={drugData?.stock_uom}
                  disabled
                />
              </div>
              <div className='flex-1'>
                <TextInput
                  label='Stok'
                  placeholder='stok'
                  containerStyle='h-11'
                  value={drugData?.stock?.actual_qty || 0}
                  isValid={!(total > (drugData?.stock?.actual_qty || 0))}
                  disabled
                />
              </div>
            </div>
            <div className='flex'>
              <TextInput
                label='Petunjuk Pemakaian'
                placeholder='Contoh: Minum tiga kali sehari, sebelum makan'
                containerStyle='h-11'
                value={instruction}
                onInput={({ target }) => setInstruction(target.value)}
                required
              />
            </div>
          </div>

          <div className='flex gap-2'>
            <Button
              id='cancel-btn'
              class='outline'
              size='md'
              text='Batal'
              onClick={() => handleCloseModal()}
            />
            <Button
              id='save-btn'
              class='primary'
              size='md'
              text='Simpan'
              disabled={
                !instruction || total > (drugData?.stock?.actual_qty || 0)
              }
              onClick={handleSubmitModal}
            />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ModalAddDrug;
