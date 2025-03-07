import cx from 'classnames';

import './ToggleButton.css';

interface IToggleButtonProps {
  id?: string;
  ref?: any;
  name?: string;
  label: string;
  checked: boolean;
  htmlFor?: string;
  disabled?: boolean;
  value: string | number;
  customClassName?: string;
  wrapperClassName?: string;
  onChange?: ({ target }: any) => void;
  onClick?: ({ target }: any) => void;
}

const ToggleButton: React.FC<IToggleButtonProps> = ({
  ref,
  name,
  value,
  checked,
  disabled = false,
  customClassName,
  wrapperClassName,
  onChange,
  onClick,
}) => {
  return (
    <div>
      <label
        htmlFor='toggle'
        className={cx(
          'flex items-center cursor-pointer relative',
          wrapperClassName
        )}
      >
        <input
          ref={ref}
          type='checkbox'
          id='toggle'
          className={customClassName}
          hidden
          name={name}
          value={value}
          disabled={disabled}
          onChange={onChange}
          checked={checked}
        />
        <div
          onClick={onClick}
          className='toggle__bg bg-border-2 bg-gray-400 border-gray-200 h-5 w-9 rounded-full'
        >
          <div className='w-4 rounded-xl p-2 z-10 toggle__rounded transition duration-300'></div>
        </div>
      </label>
    </div>
  );
};

ToggleButton.defaultProps = {
  onClick: () => {},
  onChange: () => {},
};

export default ToggleButton;
