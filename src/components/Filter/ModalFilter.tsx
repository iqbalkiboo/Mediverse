import React, {useState} from 'react';
import cx from 'classnames';
import {CloseIcon} from '@/src/assets/images/svg';
import {
  Button,
  Heading,
  Modal,
} from '@/src/components/';

import Calendar from 'react-calendar';

interface Props {
  filters: Array<{label: string, items: any}>,
  filterDate: boolean,
  open: boolean,
  onClose: Function,
  dateLabel?: string,
}

const ModalFilter: React.FC<Props> = (props) => {
  const [filterType, setFilterType] = useState(props.filters[0].label);
  const [selectItems, setSelectItems] = useState<{}[]>([]);
  const [showDate, setShowDate] = useState(false);

  const onCheckSlected = (item:any) => {
    const isHaveValue = selectItems.some((e:any) => e.label == item.label);
    if (isHaveValue) {
      setSelectItems(selectItems.filter((e:any) => e.label != item.label));
    } else {
      setSelectItems([...selectItems, item]);
    };
  };

  const date = (e:any) => {
    const date = new Date(e);
    const value = {label: date.toLocaleDateString(), id: 9, type: 'date'};
    const recentValue = selectItems.filter((e:any) => e.type != 'date');
    setSelectItems([...recentValue, value]);
  };

  const selectFilterCategory = (item:any) => {
    setShowDate(false);
    setFilterType(item.label);
  };

  const check = (item:any): boolean => {
    return selectItems.some((e:any) => e.label == item);
  };

  const Header = (props) => {
    return (
      <div className={cx('flex justify-between bg-white p-3 rounded-t-md')}>
        <Heading title='Filter' size="xl"></Heading>
        <div className={cx('cursor-pointer')} onClick={() => {
          props.onClose();
        }}>
          <div>
            <CloseIcon />
          </div>
        </div>
      </div>
    );
  };

  const Footer = () => {
    return (
      <div
        className={cx('flex justify-end bg-white p-3 rounded-b-md mt-2')}>
        <Button
          onClick={() => {}}
          text='Terapkan'
          class='primary'
          size='2xl'
          customClassName='ml-2'
        />
      </div>
    );
  };

  const SelectedItem = () => {
    return (
      <div
        className={cx('flex w-full bg-white px-4',
            'py-3 rounded-md mt-2 items-center',
        )}>
        <p className={cx('mr-4')}>Selected :</p>
        <div className='overflow-x-auto flex gap-1'>
          {
            selectItems.map((e:any) => {
              return (
                <div
                  key={e.id}
                  className={cx('flex px-3 bg-slate-100 cursor-pointer',
                      'rounded-full py-1 bg-[#DDCCFA] items-center')}>
                  <p className={cx('text-black mr-2 truncate')}>
                    {e.label}
                  </p>
                  <div
                    onClick={() => onCheckSlected(e)}>
                    <CloseIcon />
                  </div>
                </div>
              );
            })
          }
        </div>
      </div>
    );
  };
  return (
    <Modal
      onClose={props.onClose}
      open={props.open}
      style={cx('bg-[#F8F8F8] w-1/2 rounded-md')}
      type='filter'
      header={<Header onClose={props.onClose}/>}
      footer={<Footer/>}>
      <div className={cx('bg-[#F3F3F3]', 'px-4')}>
        <SelectedItem />
        <div className={cx('flex mt-2')}>
          <div className={cx('bg-white w-3/12',
              'rounded-md overflow-hidden')}>
            {props.filters.map((e:any) => {
              return (
                <div
                  key={e.label}
                  className={cx('w-full p-3',
                      'hover:bg-secondary cursor-pointer', {
                        'bg-secondary': e.label == filterType &&
                          (showDate == false),
                      })}
                  onClick={() => selectFilterCategory(e)}>
                  <p className={cx('text-left')}>{e.label}</p>
                </div>
              );
            })}
            { props.filterDate ?
              <div
                className={cx('w-full p-3 cursor-pointer hover:bg-secondary', {
                  'bg-secondary': showDate,
                })}
                onClick={() => setShowDate(true)}>
                <p className={cx('text-left')}>{props.dateLabel}</p>
              </div> :
                <></>
            }
          </div>
          <div className={cx('ml-2 flex w-full gap-y-4 flex-wrap h-min')}>
            {
              showDate ? <Calendar
                onChange={date}
                calendarType='US'
                showNeighboringMonth={false}
                className={cx(
                    'bg-white rounded-md text-slate-400',
                    'border-0 w-full',
                )}/> :
              props.filters.find((e:any) => e.label === filterType)?.
                  items.map((e:any) => {
                    return (
                      <div key={e.id} className={cx('w-1/2')}>
                        <input
                          onClick={() => onCheckSlected(e)}
                          className={cx('mr-3')}
                          type='checkbox'
                          checked={check(e.label)}
                          readOnly
                        />
                        <label
                          className={cx('tracking-[0.5px]')}>
                          {e.label}
                        </label>
                      </div>
                    );
                  })
            }
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ModalFilter;
