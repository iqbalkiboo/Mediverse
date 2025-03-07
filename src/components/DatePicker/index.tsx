import { forwardRef, useEffect, useRef, useState } from 'react';
import DatePicker from 'react-datepicker';
import cx from 'classnames';
import dayjs from 'dayjs';
import setHours from 'date-fns/setHours';
import setMinutes from 'date-fns/setMinutes';

import { AlertIcon, DateTimeIcon } from '@/src/assets/images/svg';
import { Button, Typography } from '@/src/components';
import { isDateBetween } from '@/src/utils/formatDate';

import 'react-datepicker/dist/react-datepicker.css';
import './datepicker.css';

interface DatePickerComponentProps {
  placeholder: string;
  setStartDate: (value?: any) => void;
  setEndDate: (value?: any) => void;
  isError: boolean;
  id?: string;
  selectsRange?: boolean;
  textError?: string;
  defaultDate?: any[];
  maxDate?: string;
  minDate?: string;
  isDisabled?: boolean;
  value?: any;
  useControl?: boolean;
  select?: any;
  onChangeControl?: (value?: any) => void;
  required?: boolean;
  label?: string;
  showTimeSelectOnly?: boolean;
  closeOnSelect?: boolean;
  customClass?: string;
  styles?: string;
  showMonthDropdown?: boolean;
  showYearDropdown?: boolean;
  scrollableYearDropdown?: boolean;
  dropdownMode?: string;
  showTimeSelect?: boolean;
  isMobile?: boolean;
  hideMouseLeave?: boolean;
  setDateWithTimes?: (value?: any) => void;
  minTime?: number | string | Date;
  portalId?: string;
}

const DatePickerComponent: React.FC<DatePickerComponentProps> = ({
  id,
  selectsRange = true,
  placeholder = 'Pilih tanggal',
  setStartDate,
  setEndDate,
  isError,
  textError,
  defaultDate = [],
  maxDate = '',
  minDate = '',
  isDisabled = false,
  value,
  useControl = false,
  select,
  onChangeControl,
  required = false,
  label = '',
  showTimeSelectOnly = false,
  closeOnSelect = false,
  customClass = '',
  styles = '',
  showMonthDropdown = false,
  showYearDropdown = false,
  scrollableYearDropdown,
  dropdownMode = 'select',
  showTimeSelect = false,
  isMobile = false,
  hideMouseLeave = true,
  setDateWithTimes,
  minTime = setHours(setMinutes(new Date(), 0), 0),
  portalId,
}) => {
  const [dateRange, setDateRange] = useState([null, null]);
  const [singleDate, setSingleDate] = useState(null);
  const [error, setError] = useState(isError);
  const [dateWithTime, setDateWithTime] = useState(minTime);
  const [startDate, endDate] = dateRange;

  const datePickerRef = useRef<any>(null);

  const DateIconInput = forwardRef(
    ({ onClick }: { onClick?: () => void }, ref: any) => (
      <button className='datepicker-mobile' onClick={onClick} ref={ref}>
        <DateTimeIcon color='#0A0A0A' />
      </button>
    )
  );

  useEffect(() => {
    if (selectsRange) {
      if (defaultDate.length > 0 && !startDate && !endDate) {
        setDateRange(defaultDate);
      } else {
        setDateRange([startDate, endDate]);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startDate, endDate]);

  useEffect(() => {
    if (isError) setError(isError);
  }, [isError]);

  const onChange = (update: any) => {
    if (selectsRange) {
      setDateRange(update);
    } else {
      setSingleDate(update);
    }
  };

  const borderStyle = (isFocused: boolean, isError: boolean) => {
    if (isError) {
      return '1px solid #fa3e3e';
    } else if (isFocused && !isError) {
      return '1px solid #f96e24';
    }
  };

  const borderErrorStyle = () => {
    return {
      control: (styles, { isFocused }) => ({
        ...styles,
        border: borderStyle(isFocused, error),
      }),
    };
  };

  const clearDateState = () => {
    setDateRange([null, null]);
    if (startDate || endDate) {
      setStartDate('');
      setEndDate('');
    }
    if (!showTimeSelectOnly) datePickerRef.current.state.open = false;
  };

  const handleSetRangeDate = () => {
    setEndDate(endDate);
    setStartDate(startDate);
    if (!showTimeSelectOnly) datePickerRef.current.state.open = false;
  };

  const handleSetDateWithTime = () => {
    setDateWithTimes && setDateWithTimes(dateWithTime);
    if (!showTimeSelectOnly) datePickerRef.current.state.open = false;
  };

  DateIconInput.displayName = 'DateIconInput';

  const startDated = selectsRange ? startDate : singleDate;
  const maxTimeMinDay = new Date().setHours(23, 59, 0, 0);

  return (
    <div
      id={id}
      className='flex flex-col w-full rounded-lg'
      onMouseLeave={
        !isMobile ? (hideMouseLeave ? clearDateState : () => {}) : () => {}
      }
    >
      {label && (
        <div className='flex mb-1'>
          <Typography variant='bodySmall' color=''>
            {label}
          </Typography>
          {required && <span className='text-danger'>*</span>}
        </div>
      )}

      <div
        className={cx(
          'w-full',
          {
            datepicker: !isMobile,
            'bg-white': !isDisabled,
            'bg-whiteNeutral': isDisabled,
          },
          customClass
        )}
      >
        {!showTimeSelectOnly && !showTimeSelect && (
          <>
            <DatePicker
              portalId={portalId}
              showPopperArrow={!isMobile}
              ref={datePickerRef}
              shouldCloseOnSelect={closeOnSelect}
              onFocus={(e) => e.target.blur()}
              className={cx(
                'h-full w-full py-2 rounded-lg outline-none cursor-pointer',
                {
                  'bg-whiteNeutral': isDisabled,
                }
              )}
              selected={useControl ? select : singleDate}
              dateFormat='dd/MM/yyyy'
              selectsRange={selectsRange}
              startDate={startDated}
              endDate={selectsRange ? endDate : null}
              maxDate={Date.parse(maxDate)}
              minDate={Date.parse(minDate)}
              onChange={useControl ? onChangeControl : onChange}
              placeholderText={placeholder}
              styles={borderErrorStyle}
              value={value}
              disabled={isDisabled}
              showMonthDropdown={showMonthDropdown}
              showYearDropdown={showYearDropdown}
              dropdownMode={dropdownMode}
              scrollableYearDropdown={scrollableYearDropdown}
              customInput={isMobile ? <DateIconInput /> : ''}
              popperClassName={cx({ 'w-full flex justify-center': isMobile })}
            >
              {selectsRange && (
                <div className='w-full flex flex-row gap-2'>
                  <div className='w-1/2 inline-block'>
                    <Button
                      size='sm'
                      text='Batal'
                      class='outline'
                      customClassName='w-full'
                      onClick={clearDateState}
                    />
                  </div>
                  <div className='w-1/2 inline-block'>
                    <Button
                      size='sm'
                      class='primary'
                      text='Terapkan'
                      customClassName='w-full'
                      onClick={handleSetRangeDate}
                    />
                  </div>
                </div>
              )}
            </DatePicker>
            {!isMobile && <DateTimeIcon color='#0A0A0A' />}
          </>
        )}

        {showTimeSelectOnly && (
          <DatePicker
            selected={useControl ? select : singleDate}
            onChange={useControl ? onChangeControl : onChange}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={5}
            timeCaption='Time'
            dateFormat='HH:mm'
            timeFormat='HH:mm'
            placeholderText={placeholder}
            minTime={minTime}
            maxTime={maxTimeMinDay}
            disabled={isDisabled}
            className={cx(
              'w-full py-2 pr-1 rounded-lg outline-none cursor-pointer',
              styles
            )}
          />
        )}
        {!showTimeSelectOnly && showTimeSelect && (
          <>
            <DatePicker
              ref={datePickerRef}
              shouldCloseOnSelect={closeOnSelect}
              onFocus={(e) => e.target.blur()}
              className={cx(
                'w-full py-2 rounded-lg outline-none cursor-pointer'
              )}
              selected={dateWithTime}
              dateFormat='MMMM d, yyyy h:mm aa'
              onChange={(date) => setDateWithTime(date)}
              placeholderText={placeholder}
              styles={borderErrorStyle}
              value={value}
              disabled={isDisabled}
              showTimeSelect
              timeFormat='HH:mm'
              timeIntervals={30}
              timeCaption=''
              minDate={Date.parse(minDate)}
              maxDate={Date.parse(maxDate)}
              minTime={
                new Date(minDate).toDateString() ===
                new Date(dateWithTime).toDateString()
                  ? minTime
                  : setHours(setMinutes(new Date(), 0), 0)
              }
              maxTime={setHours(setMinutes(new Date(), 45), 23)}
            >
              <div className='w-full flex gap-2'>
                <div className='w-1/2'>
                  <Button
                    size='sm'
                    text='Batal'
                    class='outline'
                    customClassName='mt-2 w-full'
                    onClick={clearDateState}
                  />
                </div>
                <div className='w-1/2'>
                  <Button
                    size='sm'
                    text='Terapkan'
                    class='primary'
                    customClassName='mt-2 w-full'
                    disabled={
                      !isDateBetween(dateWithTime, minDate, maxDate) ||
                      dayjs(dateWithTime).isBefore(minDate)
                    }
                    onClick={handleSetDateWithTime}
                  />
                </div>
              </div>
            </DatePicker>
            <DateTimeIcon color='#0A0A0A' />
          </>
        )}
      </div>

      {isError && (
        <div className='flex items-center'>
          <div className='w-5 h-5 mr-1 flex items-center'>
            <AlertIcon color='#921919' />
          </div>
          <Typography variant='bodyXSmall' color='text-danger'>
            {textError}
          </Typography>
        </div>
      )}
    </div>
  );
};

export default DatePickerComponent;
