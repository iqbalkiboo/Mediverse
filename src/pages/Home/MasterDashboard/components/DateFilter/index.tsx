import { useState } from 'react';

import cx from 'classnames';
import dayjs from 'dayjs';

import { useWindowSize } from '@/src/hooks/useWindowSize';
import { Button, Typography } from '@/src/components';
import { ChevronLeftIcon, ChevronRightIcon } from '@/src/assets/images/svg';

const options = [
  { label: 'January', value: 1 },
  { label: 'Februari', value: 2 },
  { label: 'Maret', value: 3 },
  { label: 'April', value: 4 },
  { label: 'Mei', value: 5 },
  { label: 'Juni', value: 6 },
  { label: 'Juli', value: 7 },
  { label: 'Agustus', value: 8 },
  { label: 'September', value: 9 },
  { label: 'Oktober', value: 10 },
  { label: 'November', value: 11 },
  { label: 'Desember', value: 12 },
];

type Props = {
  title: string;
  month: number;
  year: number;
  currentMonth: number;
  onSetMonth: (month: number) => void;
  onSetYear: (year: number) => void;
  onClose: (value: boolean) => void;
  isPopup: boolean;
};

const DateFilter = ({
  title,
  month,
  year,
  currentMonth,
  onClose,
  onSetMonth,
  onSetYear,
  isPopup = true,
}: Props) => {
  const [selectedMonth, setSelectedMonth] = useState(month);
  const [selectedYear, setSelectedYear] = useState(year);

  const currentYear = dayjs().year();

  const { isMobile } = useWindowSize();

  return (
    <div
      className={cx('bg-white p-10 xs:p-4 rounded-lg z-20 shadow-md w-full', {
        'absolute top-[195px] right-12 w-[583px]': isPopup,
      })}
    >
      <Typography customClass={cx('text-center')} variant={'h3'} color=''>
        {title}
      </Typography>
      <div className={cx('flex justify-between items-center mb-[14px] mt-10')}>
        <div
          className='cursor-pointer'
          onClick={() => setSelectedYear(selectedYear - 1)}
        >
          <ChevronLeftIcon />
        </div>
        <Typography variant={'h4'} color=''>
          {selectedYear}
        </Typography>
        <div
          className='cursor-pointer'
          onClick={() =>
            selectedYear < currentYear && setSelectedYear(selectedYear + 1)
          }
        >
          <ChevronRightIcon />
        </div>
      </div>
      <div className={cx('grid grid-cols-3 text-center gap-x-2 gap-y-4')}>
        {options.map((option, index) => {
          return (
            <Button
              customTextStyle={isMobile ? 'text-xs' : ''}
              key={index}
              onClick={() => setSelectedMonth(option.value)}
              text={option.label}
              size='sm'
              customClassName='bg-[#F5F6FF]'
              style={{ borderRadius: 8 }}
              class={option.value === selectedMonth ? 'primary' : ''}
              disabled={
                selectedYear < currentYear
                  ? selectedYear > currentYear
                  : currentMonth < option.value
              }
            />
          );
        })}
      </div>
      <div
        className={cx('w-full flex justify-between items-center gap-x-6 mt-10')}
      >
        <Button
          size='sm'
          text='Batal'
          class='outline'
          customClassName='w-full'
          onClick={() => onClose(false)}
        />
        <Button
          size='sm'
          class='primary'
          text='Terapkan'
          customClassName='w-full'
          onClick={() => {
            onSetMonth(selectedMonth);
            onSetYear(selectedYear);
            onClose(false);
          }}
        />
      </div>
    </div>
  );
};

DateFilter.defaultProps = {
  isPopup: true,
};

export default DateFilter;
