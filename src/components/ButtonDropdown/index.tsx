import React, {useState} from 'react';
import Typography from '@/src/components/Typography';
import classNames from 'classnames/bind';
import {array, string} from 'prop-types';
import styles from './style.module.css';
import {CheckIcon, ChevronDownIcon} from '@/src/assets/images/svg';

const cx = classNames.bind(styles);

const ButtonDropdown = ({id, title, option, type = 'primary', width = 'min-w-[222px]', height = 'h-10'}) => {
  const [state, setState] = useState(false);
  return (
    <div
      id={id}
      onMouseMove={() => setState(true)}
      onMouseLeave={(e) => e.pageY < 165 ? setState(false) : '' }
      className='relative'>
      <div className={cx('flex rounded-full px-5 relative', `button__${type}`, width, height)} >
        <div className={cx('border-r-2 flex items-center justify-center pr-2 mr-2 w-full')}>
          <Typography variant={'bodyBase'} color=''>
            {title}
          </Typography>
        </div>
        <div className={cx('flex h-full justify-center items-center')}>
          <ChevronDownIcon color={type == 'primary' ? '#F2F3F3' : '#5600E8'}/>
        </div>
      </div>
      {
        state &&
        <div onMouseLeave={() => setState(false)}
          className={cx('w-full absolute z-10 bg-white top-[54px] right-0.5 rounded-md shadow-md')}>
          {
            option.map((item, idx) => {
              return (
                <div
                  key={idx}
                  onClick={item.disable ? () => {} : item.onClick}
                  className={cx('py-2 px-3 text-left flex gap-2 items-center', {
                    'cursor-pointer hover:bg-electricPurpleSecondary': !item.disable,
                    'bg-electricPurpleSecondary': item.selected || item.label === title,
                  })}>
                  <div className={cx('w-6')}>
                    {item.icon}
                    {item.label === title && <CheckIcon />}
                  </div>
                  <Typography variant={'bodyBase'} color=''>
                    {item.label}
                  </Typography>
                </div>
              );
            })
          }
        </div>
      }
    </div>
  );
};

ButtonDropdown.propTypes = {
  id: string,
  title: string,
  option: array,
  type: string,
  height: string,
  width: string,
};

export default ButtonDropdown;
