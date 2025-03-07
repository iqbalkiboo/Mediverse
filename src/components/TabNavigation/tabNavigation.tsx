import { Fragment } from 'react';
import { useNavigate } from 'react-router';
import { useLocation } from 'react-router-dom';
import cx from 'classnames';

interface TabNavigationProps {
  data: any;
  gapx?: number;
  tabType?: string;
  handleNavigate?: (type: string) => void;
}

const TabNavigation: React.FC<TabNavigationProps> = (props) => {
  const navigate = useNavigate();
  const search = useLocation().search;
  const type = props.tabType || new URLSearchParams(search).get('tab');

  const onClick = (disable, callback) => {
    if (disable) {
      return () => {};
    } else {
      return callback;
    }
  };

  const border = (itemType, index) => {
    if (type) {
      if (type === itemType) return true;
    } else {
      if (index === 0) return true;
    }
  };

  return (
    <Fragment>
      <div
        className={cx(
          'w-full border-b-[1px] flex mt-4',
          `gap-x-${props.gapx || 2}`
        )}
      >
        {props.data.map((e, index) => {
          return (
            <button
              key={e.id}
              className={cx('min-w-fit mx-2', {
                'border-b-2 border-b-primary': border(e.id, index),
              })}
              onClick={onClick(e.disable, () => {
                if (props.tabType && props.handleNavigate) {
                  props.handleNavigate(e.id);
                } else {
                  navigate(`${e.path}`, { state: e?.state || null });
                }
              })}
            >
              <div className={cx('flex w-full items-center mb-[7.5px]')}>
                {/* Left Icon */}
                {e.leftIcon && <div className={cx('mr-1')}>{e.leftIcon}</div>}

                <p
                  className={cx('text-center text-neutral-500 mr-2', {
                    '!text-primary font-bold': type
                      ? type === e.id
                      : index === 0,
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

      {type
        ? props.data.find((e) => e.id === type)?.component
        : props.data[0]?.component}
    </Fragment>
  );
};

export default TabNavigation;
