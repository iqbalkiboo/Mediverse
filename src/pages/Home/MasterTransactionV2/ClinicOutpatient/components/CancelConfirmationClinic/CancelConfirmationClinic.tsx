import { useEffect } from 'react';

import { TextInput } from '@/src/components';
import useClinicOutpatient from '../../useClinicOutpatient';

const CancelConfirmationClinic = () => {
  const {
    data: { formCancelReason },
    method: { handleSetFormCancelReason, handleClearFormCancelReason },
  } = useClinicOutpatient();

  useEffect(() => {
    return () => handleClearFormCancelReason();
  }, []);

  return (
    <div className='w-full mt-4'>
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
  );
};

export default CancelConfirmationClinic;
