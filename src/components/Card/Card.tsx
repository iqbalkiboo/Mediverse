import cx from 'classnames';

interface ICardProps {
  id?: string;
  padding?: 'p-0' | 'p-2' | 'p-3' | 'p-4' | 'p-6';
  background?:
    | 'bg-white'
    | 'bg-grayDarkBg'
    | 'bg-graySeptenary'
    | 'bg-chatSecondary'
    | 'bg-electricPurpleSecondary'
    | 'bg-grayLight';
  dataTestID?: string;
  customClassName?: string;
  children: React.ReactNode;
}

const Card: React.FC<ICardProps> = ({
  id,
  padding = 'p-6',
  background = 'bg-white',
  dataTestID,
  customClassName,
  children,
}) => {
  return (
    <div
      id={id}
      className={cx('w-full rounded-lg', padding, background, customClassName)}
      data-testid={dataTestID}
    >
      {children}
    </div>
  );
};

export default Card;
