import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button, Card, Typography } from '@/src/components';
import { ModalError } from '@/src/commons';
import { SuccessIcon } from '@/assets/images/svg';
import { ROUTES_TRANSACTION } from '@/src/constants';
import usePatientTreatment from '../../usePatientTreatment';
import useTransaction from '@/home/MasterTransactionV2/Transaction/useTransaction';
import FormICD9 from '@/home/MasterTransactionV2/ClinicOutpatient/patient-treatment/components/FormICD9';

const FormTreatmentClinic = () => {
  const navigate = useNavigate();

  const {
    method: { handleGetListProcedure },
  } = useTransaction();
  const {
    data: {
      id,
      formProcedure,
      controlProcedure,
      errorsProcedure,
      isValidProcedure,
    },
    method: {
      handleSetAddProcedureForm,
      handleSetRemoveProcedureForm,
      handleSetProcedureItem,
      handleSetModal,
      handleSetModalProcedure,
      handleSubmitFormProcedure,
      handleSubmitProcedure,
      setValueProcedure,
    },
  } = usePatientTreatment();

  useEffect(() => {
    handleSetModal('isSuccess', false);
    handleGetListProcedure();
  }, []);

  useEffect(() => {
    if (formProcedure?.procedure?.length < 1) handleSetAddProcedureForm();
    setValueProcedure('procedure', formProcedure?.procedure);
  }, [formProcedure.procedure]);

  useEffect(() => {
    if (formProcedure.isSuccess)
      navigate(
        `${ROUTES_TRANSACTION.CLINIC_OUTPATIENT_TREATMENT}/${id}?tab=recipe`
      );
  }, [formProcedure.isSuccess]);

  return (
    <>
      <ModalError
        isOpen={formProcedure.isError}
        title='Gagal'
        description={formProcedure.errorMessage}
        onCancel={() => handleSetModalProcedure('isError', false)}
      />

      <div className='flex flex-col gap-4 mt-4'>
        <div className='gap-4'>
          <Typography variant='h4' color='' customClass='mb-2'>
            TINDAKAN
          </Typography>
          <Card padding='p-3' customClassName='border-1 pb-4'>
            <div className='mb-3'>
              <Typography variant='h3' color='' customClass='mb-2'>
                ICD 9
              </Typography>
            </div>
            {formProcedure?.procedure?.map((procedure, index) => (
              <FormICD9
                key={procedure.id}
                index={index}
                procedureData={procedure}
                errors={errorsProcedure}
                control={controlProcedure}
                onAddAssessment={handleSetAddProcedureForm}
                onRemoveAssessment={handleSetRemoveProcedureForm}
                onSetAssessment={handleSetProcedureItem}
              />
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
                  `${ROUTES_TRANSACTION.CLINIC_OUTPATIENT_TREATMENT}/${id}?tab=soap`
                )
              }
            />
          </div>
          <div className='w-1/3'>
            <Button
              text='Simpan & Selanjutnya  '
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

export default FormTreatmentClinic;
