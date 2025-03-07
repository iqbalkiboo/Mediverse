import { Button } from '@/src/components';
import { ButtonPlus, MinusIcon } from '@/assets/images/svg';

interface CounterProps {
  value: number;
  onDecrement: (value: number) => void;
  onIncrement: (value: number) => void;
  isDisabled?: boolean;
}

const Counter: React.FC<CounterProps> = ({
  value,
  onDecrement,
  onIncrement,
  isDisabled,
}) => {
  return (
    <div className='w-full h-full flex'>
      <div
        className={`w-10 flex items-center rounded-l-lg ${
          isDisabled ? 'bg-grayDarkBg' : 'bg-chatSecondary'
        }`}
      >
        <Button
          size='sm'
          class='text-primary'
          customClassName='bg-chatSecondary'
          iconButton={MinusIcon}
          disabled={!value || isDisabled}
          onClick={() => {
            if (value && value > 1) onDecrement(value - 1);
          }}
        />
      </div>
      <div
        className={`w-full flex justify-center items-center ${
          isDisabled ? 'bg-grayDarkBg' : 'bg-chatSecondary'
        }`}
      >
        {value || 0}
      </div>
      <div
        className={`w-10 flex items-center rounded-r-lg ${
          isDisabled ? 'bg-grayDarkBg' : 'bg-chatSecondary'
        }`}
      >
        <Button
          size='sm'
          class='text-primary'
          customClassName='bg-chatSecondary'
          iconButton={ButtonPlus}
          disabled={!value || isDisabled}
          onClick={() => {
            if (value) onIncrement(value + 1);
          }}
        />
      </div>
    </div>
  );
};

export default Counter;
