import React, {useMemo, useState} from 'react';
import cx from 'classnames';
import {Modal} from '@/src/components';
import {CloseIcon, ZoomInIcon, ZoomOutIcon} from '@/src/assets/images/svg';
import {ZOOM_TYPE} from '@/src/constants';

type IHeaderModal = {
  onCloseHeader: (e: boolean) => void
}

type IImagePreview = {
  type?: 'img' | 'pdf';
  src: string;
  zoomLevel: number;
}

type IPreviewImage = {
  isShow: boolean;
  src: string;
  type?: 'img' | 'pdf';
  onClosePreview: (show: boolean) => void
  width?: string;
  height?: string;
}

const zoomLevels = [1.5, 3.5, 5.5, 7.5, 9.5];

// header of modal include close action
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

// main component
const PreviewImage = ({
  isShow = false,
  src = '',
  type = 'img',
  width,
  height,
  onClosePreview,
}: IPreviewImage) => {
  const [scale, setScale] = useState<number>(1.5); // state for define scalling levels

  // function to make zoom scalling disabled -> return boolean
  const shouldDisabled = ({level, zoomType}): boolean => {
    let isDisabled: boolean = false;
    const lastItemZoomLevel = zoomLevels[zoomLevels.length - 1]; // get first index of zoom level
    const firstItemZoomLevel = zoomLevels[0]; // get last index of zoom level
    switch (zoomType) {
      case ZOOM_TYPE.IN: // type is zoom in
        isDisabled = lastItemZoomLevel === level ?? false;
        break;
      case ZOOM_TYPE.OUT: // type is zoom out
        isDisabled = firstItemZoomLevel === level ?? false;
        break;
      default:
        break;
    }
    return isDisabled;
  };

  // function to handle zoom in and out of image previews
  const onZoomInOut = (zoomType: string) => {
    // define current index of zoom level
    let zoomIndex = zoomLevels.findIndex((item) => item === scale);

    // loop the level to get action increase decrease value scalling
    for (let index = 0; index < zoomLevels.length; index++) {
      if (zoomIndex === index) {
        if (zoomType === ZOOM_TYPE.IN) {
          zoomIndex = zoomLevels[index + 1];
        } else if (zoomType === ZOOM_TYPE.OUT) {
          zoomIndex = zoomLevels[index - 1];
        }
      }
    }

    // set zoom index into state
    setScale(zoomIndex);
  };

  // memoized value of zoom level
  const memoizedThumbnail = useMemo(() => {
    return <ThumbnailImage src={src} zoomLevel={scale} type={type} />;
  }, [scale]);

  return (
    <Modal
      open={isShow}
      onClose={onClosePreview}
      width={width}
      height={height}
      style={'!bg-transparent !p-0 !shadow-none relative'}
      header={<HeaderModal onCloseHeader={() => {
        onClosePreview(false);
        setScale(1.5);
      }} />}
    >
      <div id='modal-content' className={cx('flex flex-col gap-2')}>
        <div id='modal-body' className={cx('flex flex-col gap-2')}>
          <div id='wrapper-box-preview' className={cx('flex flex-col gap-2')}>
            <div id='box-preview' className={cx('flex flex-col')}>
              {memoizedThumbnail}
            </div>
            <div id='box-action' className={cx('flex justify-center items-center gap-4')}>
              <button
                className='p-3 text-white bg-white rounded-full focus:outline-none
                  disabled:bg-gray-200 disabled:text-gray-500'
                disabled={shouldDisabled({level: scale, zoomType: ZOOM_TYPE.OUT})}
                onClick={() => onZoomInOut(ZOOM_TYPE.OUT)}>
                <ZoomOutIcon width="27" height="27" />
              </button>
              <button
                className='p-3 text-white bg-white rounded-full focus:outline-none
                disabled:bg-gray-200 disabled:text-gray-500'
                disabled={shouldDisabled({level: scale, zoomType: ZOOM_TYPE.IN})}
                onClick={() => onZoomInOut(ZOOM_TYPE.IN)}>
                <ZoomInIcon width="27" height="27" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

// JSX of thumbnail selected
const ThumbnailImage = ({src, zoomLevel, type}: IImagePreview) => {
  return (
    <div className={cx('inline-block overflow-hidden')}>
      {type === 'img' && <img id='img_preview' src={src} style={{scale: zoomLevel.toString()}} />}
      {type === 'pdf' &&
        <object id='pdf_preview' width="100%" height="400" data={src} type="application/pdf"></object>
      }
    </div>
  );
};

export default PreviewImage;
