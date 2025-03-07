import { useNavigate } from 'react-router';
import { useLocation } from 'react-router-dom';
import cx from 'classnames';

interface TabNavigationV2Props {
  data: {
    id: string;
    label: string;
    path: string;
    disable?: boolean;
    leftIcon?: string;
    rightIcon?: string;
    state?: any;
    visible?: boolean;
  }[];
  gapx?: number;
}

const TabNavigationV2: React.FC<TabNavigationV2Props> = (props) => {
  const navigate = useNavigate();
  const search = useLocation().search;
  const type = new URLSearchParams(search).get('tab');

  const onClick = (disable, callback) => {
    if (disable) return () => {};
    if (!disable) return callback;
  };

  const border = (itemType, index) => {
    if (type && type === itemType) return true;
    if (!type && index === 0) return true;
  };

  return (
    <div
      className={cx(
        `w-full border-b-[1px] flex mt-4 overflow-x-hidden
        transition ease-in-out delay-300 duration-300 hover:overflow-x-auto`,
        `gap-x-${props.gapx}`
      )}
    >
      {props.data.map((e, index) => {
        return (
          <button
            key={e.id}
            className={cx('min-w-fit', {
              'border-b-2 border-b-primary': border(e.id, index),
            })}
            onClick={onClick(e.disable, () =>
              navigate(`${e.path}`, { state: e?.state || null })
            )}
            id={e.id}
          >
            <div className={cx('flex w-full items-center mb-[7.5px]')}>
              {/* Left Icon */}
              {e.leftIcon && <div className={cx('mr-1')}>{e.leftIcon}</div>}
              <p
                className={cx('text-center text-neutral-500 px-4', {
                  '!text-primary font-bold': type ? type === e.id : index === 0,
                })}
              >
                {e.label}
              </p>
              {/* Right Icon */}
              {e.rightIcon && <div className={cx('mr-1')}>{e.rightIcon}</div>}
            </div>
          </button>
        );
      })}
    </div>
  );
};

TabNavigationV2.defaultProps = {
  gapx: 2,
};

export default TabNavigationV2;
