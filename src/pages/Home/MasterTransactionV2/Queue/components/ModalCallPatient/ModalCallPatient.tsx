import { Button, Modal, Typography } from '@/src/components/';
import { useWindowSize } from '@/src/hooks/useWindowSize';

interface ModalCallPatientProps {
  isOpen: boolean;
  onCancel: () => void;
  onSubmit: () => void;
}

const ModalCallPatient: React.FC<ModalCallPatientProps> = ({
  isOpen,
  onCancel,
  onSubmit,
}) => {
  const { isMobile } = useWindowSize();

  return (
    <Modal
      open={isOpen}
      onClose={onCancel}
      style={`${isMobile ? 'w-full' : 'w-[405px]'}`}
      header={
        <div className='flex justify-center'>
          <Typography variant='h4' color=''>
            Memanggil Pasien...
          </Typography>
        </div>
      }
    >
      <div className='py-8 text-center'>
        <Typography variant='bodySmall' color=''>
          Pasien menerima Panggilan?
        </Typography>
      </div>
      <div className='w-3/4 flex flex-col self-center gap-3'>
        <Button
          id='call-cancel-btn'
          size='md'
          class='secondary'
          text='Batal'
          customClassName='!rounded-md'
          onClick={onCancel}
        />
        <Button
          id='call-continue-btn'
          size='md'
          class='primary'
          text='Ya, Lanjutkan'
          customClassName='!rounded-md'
          onClick={onSubmit}
        />
      </div>
    </Modal>
  );
};

export default ModalCallPatient;
