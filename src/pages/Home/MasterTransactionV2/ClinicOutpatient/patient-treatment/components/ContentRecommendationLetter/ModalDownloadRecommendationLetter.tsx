import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import cx from 'classnames';

import { Button, Modal } from '@/src/components/';
import { DocumentRecommendationLetter } from '../Documents';
import { useWindowSize } from '@/src/hooks/useWindowSize';

interface ModalDownloadRecommendationLetterProps {
  isOpen: boolean;
  onCancel: () => void;
}

const ModalDownloadRecommendationLetter: React.FC<
  ModalDownloadRecommendationLetterProps
> = ({ isOpen, onCancel }) => {
  const { isMobile } = useWindowSize();

  const handleCloseModal = () => {
    onCancel();
  };

  return (
    <>
      <Modal
        open={isOpen}
        onClose={handleCloseModal}
        title='Surat Rujukan Keluar'
        titleSize='h2'
        style={cx('h-full', {
          'w-full': isMobile,
          'w-[800px]': !isMobile,
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
              {DocumentRecommendationLetter()}
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
                document={DocumentRecommendationLetter()}
                fileName='Surat Rujukan Keluar.pdf'
              >
                {({ loading }) => {
                  return (
                    <Button
                      size='sm'
                      class='primary'
                      disabled={loading}
                      text={loading ? 'Loading...' : 'Unduh'}
                      onClick={() => {}}
                    />
                  );
                }}
              </PDFDownloadLink>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ModalDownloadRecommendationLetter;
