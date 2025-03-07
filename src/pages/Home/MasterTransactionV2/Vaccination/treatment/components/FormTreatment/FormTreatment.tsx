import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button, Card, Typography } from '@/src/components';
import { ModalError, ModalSuccess } from '@/src/commons';
import { SuccessIcon } from '@/assets/images/svg';
import { ROUTES_TRANSACTION } from '@/src/constants';
import FormTreatmentCard from './components/FormTreatmentCard';
import useVaccinationTreatment from '../../useVaccinationTreatment';
import useTransaction from '@/home/MasterTransactionV2/Transaction/useTransaction';

const FormTreatment = () => {
  const navigate = useNavigate();

  const {
    method: { handleGetListIcd9, handleGetListImmunizationCategory },
  } = useTransaction();
  const {
    data: { id, formProcedure, isValidProcedure },
    method: {
      handleSetAddProcedureForm,
      handleSetModal,
      handleSetModalProcedure,
      handleSubmitFormProcedure,
      handleSubmitProcedure,
      setValueProcedure,
    },
  } = useVaccinationTreatment();

  useEffect(() => {
    handleSetModal('isSuccess', false);
    handleGetListIcd9();
    handleGetListImmunizationCategory();
  }, []);

  useEffect(() => {
    if (formProcedure?.procedure?.length < 1) handleSetAddProcedureForm();
    setValueProcedure('procedure', formProcedure?.procedure);
  }, [formProcedure.procedure]);

  return (
    <>
      <ModalSuccess
        isOpen={formProcedure.isSuccess}
        title='Sukses!'
        description='Berhasil melakukan tindakan medis'
        onCancel={() => {
          handleSetModalProcedure('isSuccess', false);
          navigate(`${ROUTES_TRANSACTION.VACCINATIONS}?tab=Menunggu Tindakan`);
        }}
      />
      <ModalError
        isOpen={formProcedure.isError}
        title='Gagal'
        description={formProcedure.errorMessage}
        onCancel={() => handleSetModalProcedure('isError', false)}
      />

      <div className='flex flex-col gap-4 mt-4'>
        <div className='gap-4'>
          <Typography variant='h5' color='' customClass='mb-2'>
            ICD 9<span className='text-danger'>*</span>
          </Typography>
          <Card padding='p-3' customClassName='border-1 pb-4'>
            {formProcedure?.procedure?.map((item, index) => (
              <FormTreatmentCard key={index} index={index} data={item} />
            ))}
          </Card>
        </div>

        <div className='flex gap-2 justify-between mt-6'>
          <div className='w-1/3'>
            <Button
              text='Kembali'
              size='md'
              class='outline'
              customClassName='!rounded-md'
              onClick={() =>
                navigate(
                  `${ROUTES_TRANSACTION.VACCINATION_PROCEDURE}/${id}?tab=soap`
                )
              }
            />
          </div>
          <div className='w-1/3'>
            <Button
              text='Tindakan Selesai'
              size='md'
              customClassName='!rounded-md'
              iconButton={() => (
                <SuccessIcon
                  color={!isValidProcedure ? '#757575' : '#FFFFFF'}
                />
              )}
              disabled={!isValidProcedure}
              loading={formProcedure.isLoading}
              onClick={handleSubmitProcedure(handleSubmitFormProcedure)}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default FormTreatment;
