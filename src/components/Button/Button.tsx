import classNames from 'classnames/bind';

import Spinner from '@/src/components/Spinner';
import Typography from '@/src/components/Typography';

import styles from '@/src/components/Button/Button.module.css';

const cx = classNames.bind(styles);

interface Props {
  children?: any;
  class?: string;
  className?: string;
  customClassName?: string;
  disabled?: boolean;
  iconButton?: any;
  loading?: boolean;
  onClick: Function;
  size?: string;
  iconElement?: any;
  style?: any;
  suffixIcon?: boolean;
  text?: string;
  textColor?: string;
  textVariant?: string;
  type?: any;
  customClassIcon?: string;
  customTextStyle?: string;
  id?: string;
}

const Button: React.FC<Props> = (props) => {
  const Icon = props?.iconButton;
  const buttonClass = props.disabled ? 'disabled' : props.class || 'primary';
  const size = props.size || 'md';
  const textColor = props.textColor || '';
  const textVariant = props.textVariant || 'buttonHeavy2';

  return (
    <button
      id={props.id}
      type={props.type || 'button'}
      disabled={props.disabled}
      className={cx(
        'container__button',
        `button__${buttonClass}`,
        `size__${size}`,
        `${props.customClassName}`
      )}
      onClick={() => !props.disabled && props.onClick()}
      style={props.style}
    >
      {props.loading && <Spinner />}
      {!props.loading && (
        <div className={cx('flex gap-2 justify-center items-center')}>
          {props.iconButton && !props.suffixIcon ? (
            <div
              className={cx(
                'flex items-center',
                `${props.customClassIcon}`
              )}
            >
              <Icon />
            </div>
          ) : null}

          {props.text && (
            <Typography
              variant={textVariant}
              color={textColor}
              customClass={props.customTextStyle}
            >
              {props.text || 'Action'}
            </Typography>
          )}

          {props.iconElement && (
            <div className='flex items-center'>{props.iconElement}</div>
          )}

          {props.suffixIcon
            ? props.iconButton && (
                <div
                  className={cx(
                    'mr-2 flex items-center',
                    `${props.customClassIcon}`
                  )}
                >
                  <Icon />
                </div>
              )
            : null}
        </div>
      )}
    </button>
  );
};

export default Button;
