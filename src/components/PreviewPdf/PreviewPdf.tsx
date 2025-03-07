import React from 'react';
import cx from 'classnames';
import {Modal} from '@/src/components';
import {bool, func, string} from 'prop-types';
import {CloseIcon} from '@/src/assets/images/svg';
import {useWindowSize} from '@/src/hooks/useWindowSize';

type IHeaderModal = {
  onCloseHeader: (e: boolean) => void
}

// header of modal include action
const HeaderModal = ({onCloseHeader}: IHeaderModal) => {
  return (
    <div className={cx('flex justify-end items-center py-2 absolute -top-8 -right-4 z-10')}>
      <div
        className={cx('flex cursor-pointer hover:opacity-75 bg-white rounded-full p-3')}
        onClick={() => onCloseHeader(false)}>
        <CloseIcon />
      </div>
    </div>
  );
};

const PreviewPdf = ({open, setModal, pdfSrc, width, height}) => {
  const {isMobile} = useWindowSize();
  return (
    <>
      <Modal
        open={open}
        onClose={setModal}
        width={width}
        height={height}
        style={'!bg-transparent !p-0 !shadow-none relative'}
        header={<HeaderModal onCloseHeader={() => {
          setModal();
        }} />}
      >
        <div className={cx('flex-wrap overflow-auto')}>
          <div className={cx('mt-2')}>
            <iframe src={pdfSrc}
              className={cx(
                  {'w-[320px] h-[600px]': isMobile},
                  {'h-[800px] w-[600px]': !isMobile},
              )} >
            </iframe>
          </div>
        </div>
      </Modal>
    </>
  );
};

PreviewPdf.propTypes = {
  open: bool,
  setModal: func,
  pdfSrc: string,
  width: string,
  height: string,
};

export default PreviewPdf;
