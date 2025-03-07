import ReactDOM from 'react-dom';
import cx from 'classnames';

import { CloseIcon } from '@/src/assets/images/svg';
import Typography from '@/src/components/Typography';

import styles from './Modal.module.css';

interface ModalProps {
  title?: string;
  footer?: any;
  style?: string;
  header?: any;
  open: boolean;
  closeIcon?: boolean;
  onClose: Function;
  type?: string;
  children?: any;
  titleSize?: string;
  titleColor?: string;
  width?: string;
  height?: string;
}

interface DefaultHeaderProps {
  title?: string;
  onCloseClick: Function;
  closeIcon?: boolean;
  titleSize?: string;
  titleColor?: string;
}

const modalRoot = document.getElementById('modal-root');

const DefaultHeader: React.FC<DefaultHeaderProps> = (props) => {
  return (
    <div className='flex justify-between'>
      <Typography variant={props.titleSize || 'h4'} color={props.titleColor}>
        {props.title}
      </Typography>
      {props.closeIcon && (
        <button
          id='close-button'
          style={{
            backgroundColor: 'transparent',
            borderWidth: 0,
          }}
          onClick={() => props.onCloseClick()}
        >
          <CloseIcon />
        </button>
      )}
    </div>
  );
};

const Modal: React.FC<ModalProps> = (props) => {
  return props.open ? (
    ReactDOM.createPortal(
      <div data-testid='modal-test' className={cx(styles.overlay)}>
        <div
          className={cx(
            styles.container__modal,
            props.style,
            props.height,
            props.width,
            props.type ? props.type : 'px-6 py-4'
          )}
        >
          {props.header ? (
            props.header
          ) : (
            <DefaultHeader
              title={props.title}
              onCloseClick={() => props.onClose()}
              closeIcon={props.closeIcon !== false}
              titleSize={props.titleSize || 'h4'}
              titleColor={props.titleColor || ''}
            />
          )}
          <>{props.children}</>
          {props.footer && <div>{props.footer}</div>}
        </div>
      </div>,
      modalRoot!
    )
  ) : (
    <></>
  );
};

export default Modal;
