import { useEffect } from 'react';

import { AsyncSelect, TextInput } from '@/src/components';
import useLaboratoriums from '../../useLaboratoriums';
import useTransaction from '@/home/MasterTransactionV2/Transaction/useTransaction';

const CancelConfirmationLab = () => {
  const {
    data: { listSelectCancelReason },
    method: { handleGetListCancelReason, handleSearchListCancelReason },
  } = useTransaction();
  const {
    data: { formCancelReason },
    method: { handleSetFormCancelReason, handleClearFormCancelReason },
  } = useLaboratoriums();

  useEffect(() => {
    handleGetListCancelReason();
    return () => handleClearFormCancelReason();
  }, []);

  return (
    <div className='mt-4'>
      <div className='w-full'>
        <AsyncSelect
          id='reason'
          name='reason'
          label='Alasan'
          placeholder='Pilih Alasan'
          options={listSelectCancelReason}
          loadOptions={handleSearchListCancelReason}
          onChange={(item) =>
            handleSetFormCancelReason('actionReason', item.value.name)
          }
          required
        />
      </div>
      <div className='mt-1 w-full'>
        <TextInput
          type='textarea'
          rows={5}
          name='reason'
          placeholder='Masukkan Alasan'
          customStyle={{ resize: 'none' }}
          value={formCancelReason.description}
          onInput={({ target }) =>
            handleSetFormCancelReason('description', target.value)
          }
          required
        />
      </div>
    </div>
  );
};

export default CancelConfirmationLab;
