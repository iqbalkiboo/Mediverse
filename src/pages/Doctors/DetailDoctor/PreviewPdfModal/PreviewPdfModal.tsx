import cx from 'classnames';

import { Button, Modal, Typography } from '@/src/components';

import { bool, func, string } from 'prop-types';

const PreviewPdfModal = ({ open, setModal, pdfSrc, title }) => {
  return (
    <>
      <Modal
        open={open}
        onClose={setModal}
        header={
          <Typography variant='h2' color=''>
            {title ? title : 'Nama File'}
          </Typography>
        }
        style={'w-[800px] h-[600px]'}
      >
        <div className={cx('flex-wrap overflow-auto')}>
          <div className={cx('mt-2')}>
            <iframe src={pdfSrc} title={title} width='750' height='450' />
          </div>
          <div className={cx('flex w-full justify-center items-center mt-8')}>
            <div className={cx('w-40')}>
              <Button
                size='md'
                class='primary'
                onClick={setModal}
                customClassName='w-full'
                text={'Kembali'}
              />
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

PreviewPdfModal.propTypes = {
  open: bool,
  setModal: func,
  pdfSrc: string,
  title: string,
};

export default PreviewPdfModal;
