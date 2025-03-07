/* eslint-disable max-len */
import React, {useState} from 'react';
import {Typography} from '@/src/components';
import {
  CaretDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@/assets/images/svg';
import './Pagination.css';
import cx from 'classnames';

interface Props {
  countPages?: number;
  activePage?: number;
  itemStyle?: string;
  navStyle?: string;
  itemActive?: string;
  handleClickPage?: Function;

  // props if need with rows
  optionsRow?: number[];
  totalData?: number;
  totalDataPerPage?: number;
  handleOptionRow?: Function;
  isInfinite?: boolean;
  limit?: number;
  handlePrevPage?: (page: any) => void | unknown
  handleNextPage?: (page: any) => void | unknown;
  isMobile?: boolean;
}

const Pagination: React.FC<Props> = (props) => {
  props.countPages ? props.countPages : 10;
  const activePage = props.activePage ?? 1;
  const countPage = props.countPages ?? 1;
  const totalDataPerPage = props.totalDataPerPage ?? 10;

  const [isOptionsRow, setIsOptionsRow] = useState(false);
  const [selectedOption, setSelectedOption] = useState(totalDataPerPage);

  const onHandlePrevPage = () => {
    const page = activePage - 1;
    const theLimit = props?.limit || 0;
    if (!props.isInfinite) {
      const parseOffset = (page * theLimit) - theLimit;
      const hasOffset = parseOffset === 0 && props.activePage === 1 ? 10 : parseOffset;
      const offsetPage = activePage === 1 ? 0 : hasOffset;
      props.handlePrevPage?.(offsetPage);
    } else {
      activePage > 1 &&
              props.handleClickPage &&
              props.handleClickPage(activePage - 1);
    }
  };

  const onHandleNextPage = () => {
    const page = activePage + 1;
    const theLimit = props?.limit || 0;
    if (!props.isInfinite) {
      const parseOffset = (page * theLimit) - theLimit;
      const hasOffset = parseOffset === 0 && props.activePage === 1 ? 10 : parseOffset;
      const offsetPage = activePage > 1 ? hasOffset : 10;
      props.handleNextPage?.(offsetPage);
    } else {
      activePage < countPage &&
              props.handleClickPage &&
              props.handleClickPage(activePage + 1);
    }
  };

  return (
    <div className={cx('flex justify-between items-center mt-2')}>
      <div className={cx('flex items-center gap-6')}>
        <div className={cx({'hidden': props.isMobile})}>
          <Typography variant='h5' color='text-[#757575]'>Row per page</Typography>
        </div>
        <div className={cx('relative cursor-pointer')} onClick={() => setIsOptionsRow(!isOptionsRow)}>
          <div className={cx('flex items-center gap-4', {'hidden': props.isMobile})}>
            <Typography variant='h5' color=''>{totalDataPerPage ?? selectedOption}</Typography>
            <CaretDownIcon />
          </div>

          <div className={cx('options')}>
            {isOptionsRow && props.optionsRow && props.optionsRow.map((option, index) => (
              <div
                key={index}
                className='hover:bg-gray-200 p-2 text-center'
                onClick={() => {
                  setSelectedOption(option);
                  props.handleClickPage && props.handleClickPage(1);
                  props.handleOptionRow && props.handleOptionRow(option);
                }}
              >
                <Typography variant='h5' color='text-[#757575]'>{option}</Typography>
              </div>
            ))}
          </div>
        </div>
        <div className={cx({'hidden': props.isMobile})}>
          <Typography variant='h5' color='text-[#757575]'>{(activePage * totalDataPerPage) - (totalDataPerPage - 1)}-{activePage * totalDataPerPage} of {props.totalData}</Typography>
        </div>
      </div>
      <div className={cx('pagination__container')}>
        <div
          className={cx(
              `${props.navStyle}`,
              `${activePage == 1 ? 'nav_disable' : 'nav_active'}`,
          )}
          onClick={onHandlePrevPage}
        >
          <ChevronLeftIcon color={activePage == 1 ? '#000' : '#5600E8'} />
        </div>

        {!props.isInfinite ? [...Array(props.countPages)].map((page, index) => {
          const shouldDisturb = index >= 2 && index <= countPage - 3;
          const showDot =
            (index - activePage == 1 || activePage - index == 3) &&
            shouldDisturb;
          const shouldHide =
            (index - activePage >= 2 || activePage - index >= 4) &&
            shouldDisturb;

          return (
            <React.Fragment key={index + 1}>
              {showDot ? (
                <span>...</span>
              ) : shouldHide ? null : (
                <div
                  onClick={() => {
                    props.handleClickPage &&
                      props.handleClickPage(index + 1);
                  }}
                  className={cx(
                      `${props.itemStyle}`,
                      `${index + 1 == activePage && `${props.itemActive}`}`,
                  )}
                >
                  {index + 1}
                </div>
              )}
            </React.Fragment>
          );
        }): (
          <div className={`${props.itemStyle} ${props.itemActive}`}>{props.activePage}</div>
        )}

        <div
          className={cx(
              `${props.navStyle}`,
              `${activePage == props.countPages ? 'nav_disable' : 'nav_active'}`,
          )}
          onClick={onHandleNextPage}
        >
          <ChevronRightIcon color={activePage == props.countPages ? '#000' : '#5600E8'} />
        </div>
      </div>
    </div>
  );
};

Pagination.defaultProps = {
  countPages: 1,
  activePage: 1,
  itemStyle: 'pagination__item',
  navStyle: 'pagination__navigation',
  itemActive: 'active',
  optionsRow: [10, 25, 50],
  totalData: 0,
  totalDataPerPage: 10,
  isInfinite: false,
  limit: 10,
  handlePrevPage: () => {},
  handleNextPage: () => {},
  isMobile: false,
};

export default Pagination;
