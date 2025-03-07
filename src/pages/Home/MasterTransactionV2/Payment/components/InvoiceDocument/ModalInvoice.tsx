import { useEffect } from 'react';
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import cx from 'classnames';

import { Button, Modal } from '@/src/components/';
import { useWindowSize } from '@/src/hooks/useWindowSize';
import DocumentInvoice from './DocumentInvoice';
import useTransaction from '@/home/MasterTransactionV2/Transaction/useTransaction';

interface ModalDownloadRecipeProps {
  transactionId: string;
  isOpen: boolean;
  onCancel: () => void;
}

const ModalInvoice: React.FC<ModalDownloadRecipeProps> = ({
  transactionId,
  isOpen,
  onCancel,
}) => {
  const { isMobile } = useWindowSize();

  const {
    method: { handleGetDetailTransaction, handleClearStateTransaction },
  } = useTransaction();

  useEffect(() => {
    if (isOpen && transactionId) handleGetDetailTransaction(transactionId);
    if (!isOpen) handleClearStateTransaction();
  }, [isOpen]);

  const handleCloseModal = () => {
    onCancel();
  };

  return (
    <>
      <Modal
        open={isOpen}
        onClose={handleCloseModal}
        title='Invoice'
        titleSize='h2'
        style={cx({
          'w-full h-full': isMobile,
          'w-[80%] h-[800px]': !isMobile,
        })}
      >
        <div className='w-full h-full mt-4'>
          <div className='w-full h-[92%]'>
            <PDFViewer
              style={{
                width: '100%',
                height: '100%',
              }}
            >
              {DocumentInvoice()}
            </PDFViewer>
          </div>
          <div className='w-full flex gap-4 mt-5'>
            <div className='flex-1'>
              <Button
                size='sm'
                class='outline'
                text='Kembali'
                onClick={handleCloseModal}
              />
            </div>
            <div className='flex-1'>
              <PDFDownloadLink
                document={DocumentInvoice()}
                fileName='Invoice.pdf'
              >
                {({ loading }) => (
                  <Button
                    size='sm'
                    class='primary'
                    disabled={loading}
                    text={loading ? 'Loading...' : 'Unduh'}
                    onClick={() => {}}
                  />
                )}
              </PDFDownloadLink>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ModalInvoice;
