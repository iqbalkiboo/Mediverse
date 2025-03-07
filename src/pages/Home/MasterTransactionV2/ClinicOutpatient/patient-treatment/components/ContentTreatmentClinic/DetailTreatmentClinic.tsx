import { Button, Card, TextInput, Typography } from '@/src/components';
import { PencilUpdateIcon } from '@/assets/images/svg';
import usePatientTreatment from '../../usePatientTreatment';

interface DetailTreatmentClinicProps {
  onEditClick: () => void;
}

const DetailTreatmentClinic: React.FC<DetailTreatmentClinicProps> = ({
  onEditClick,
}) => {
  const {
    data: { dataClinicOutpatient, formProcedure },
  } = usePatientTreatment();

  return (
    <div className='flex flex-col gap-4 mt-4'>
      {dataClinicOutpatient?.service_transaction_status !== 'Selesai' && (
        <div className='w-[300px] flex mt-2 ml-auto mr-0'>
          <Button
            size='md'
            class='outline'
            text='Edit Tindakan'
            iconButton={() => <PencilUpdateIcon color='#5600E8' />}
            onClick={onEditClick}
          />
        </div>
      )}

      <div>
        <Typography variant='h5' color='' customClass='mb-2'>
          TINDAKAN
        </Typography>
        <Card background='bg-graySeptenary' padding='p-6'>
          <div className='flex flex-col gap-2'>
            {formProcedure.procedure.map((item, index) => (
              <div key={index} className='w-full flex flex-col gap-2'>
                <TextInput
                  id='treatment'
                  name='treatment'
                  labelRow={'Tindakan ' + (index + 1)}
                  customClassName='flex border-none'
                  backgroundColor='bg-grayDarkBg'
                  value={item?.procedure?.procedure_name || ''}
                  disabled
                />
                <TextInput
                  id='treatment'
                  name='treatment'
                  labelRow=' '
                  customClassName='flex border-none'
                  backgroundColor='bg-grayDarkBg'
                  value={
                    formProcedure?.procedureService[index]
                      ? formProcedure?.procedureService[index]
                          ?.map((item) => item?.item_name)
                          .join(', ')
                      : ''
                  }
                  disabled
                />
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DetailTreatmentClinic;
