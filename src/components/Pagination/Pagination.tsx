/* eslint-disable max-len */
import { Fragment, useState } from 'react';
import cx from 'classnames';

import { Typography } from '@/src/components';
import {
  CaretDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@/assets/images/svg';

import './Pagination.css';

interface PaginationProps {
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
  handlePrevPage?: (page: any) => void | unknown;
  handleNextPage?: (page: any) => void | unknown;
  isMobile?: boolean;
}

const Pagination: React.FC<PaginationProps> = ({
  countPages = 1,
  activePage = 1,
  itemStyle = 'pagination__item',
  navStyle = 'pagination__navigation',
  itemActive = 'active',
  handleClickPage,
  optionsRow = [10, 25, 50],
  totalData = 0,
  totalDataPerPage = 10,
  handleOptionRow,
  isInfinite = false,
  limit = 10,
  handlePrevPage = () => {},
  handleNextPage = () => {},
  isMobile = false,
}) => {
  const pageActive = activePage ?? 1;
  const countPage = countPages ?? 1;
  const totalPerPage = totalDataPerPage ?? 10;

  const [isOptionsRow, setIsOptionsRow] = useState(false);
  const [selectedOption, setSelectedOption] = useState(totalPerPage);

  const onHandlePrevPage = () => {
    const page = pageActive - 1;
    const theLimit = limit || 0;
    if (isInfinite) {
      const parseOffset = page * theLimit - theLimit;
      const hasOffset =
        parseOffset === 0 && pageActive === 1 ? 10 : parseOffset;
      const offsetPage = pageActive === 1 ? 0 : hasOffset;
      handlePrevPage?.(offsetPage);
    } else {
      pageActive > 1 && handleClickPage && handleClickPage(pageActive - 1);
    }
  };

  const onHandleNextPage = () => {
    const page = pageActive + 1;
    const theLimit = limit || 0;
    if (isInfinite) {
      const parseOffset = page * theLimit - theLimit;
      const hasOffset =
        parseOffset === 0 && pageActive === 1 ? 10 : parseOffset;
      const offsetPage = pageActive > 1 ? hasOffset : 10;
      handleNextPage?.(offsetPage);
    } else {
      pageActive < countPage &&
        handleClickPage &&
        handleClickPage(pageActive + 1);
    }
  };

  return (
    <div className='flex justify-between items-center mt-2'>
      <div className='flex items-center gap-6'>
        <div className={cx({ hidden: isMobile })}>
          <Typography variant='h5' color='text-[#757575]'>
            Row per page
          </Typography>
        </div>
        <div
          className='relative cursor-pointer'
          onClick={() => setIsOptionsRow(!isOptionsRow)}
        >
          <div
            className={cx('flex items-center gap-4', {
              hidden: isMobile,
            })}
          >
            <Typography variant='h5' color=''>
              {totalPerPage ?? selectedOption}
            </Typography>
            <CaretDownIcon />
          </div>

          <div className='options'>
            {isOptionsRow &&
              optionsRow &&
              optionsRow.map((option, index) => (
                <div
                  key={index}
                  className='hover:bg-gray-200 p-2 text-center'
                  onClick={() => {
                    setSelectedOption(option);
                    handleClickPage && handleClickPage(1);
                    handleOptionRow && handleOptionRow(option);
                  }}
                >
                  <Typography variant='h5' color='text-[#757575]'>
                    {option}
                  </Typography>
                </div>
              ))}
          </div>
        </div>
        <div className={cx({ hidden: isMobile })}>
          <Typography variant='h5' color='text-[#757575]'>
            {pageActive * totalPerPage - (totalPerPage - 1)}-
            {pageActive * totalPerPage} of {totalData}
          </Typography>
        </div>
      </div>
      <div className='pagination__container'>
        <div
          className={cx(
            `${navStyle}`,
            `${pageActive === 1 ? 'nav_disable' : 'nav_active'}`
          )}
          onClick={onHandlePrevPage}
        >
          <ChevronLeftIcon color={pageActive === 1 ? '#000' : '#5600E8'} />
        </div>

        {!isInfinite ? (
          [...Array(countPages)].map((page, index) => {
            const shouldDisturb = index >= 2 && index <= countPage - 3;
            const showDot =
              (index - pageActive === 1 || pageActive - index === 3) &&
              shouldDisturb;
            const shouldHide =
              (index - pageActive >= 2 || pageActive - index >= 4) &&
              shouldDisturb;

            return (
              <Fragment key={index + 1}>
                {showDot ? (
                  <span>...</span>
                ) : shouldHide ? null : (
                  <div
                    id={`page-${index + 1}`}
                    onClick={() => {
                      handleClickPage && handleClickPage(index + 1);
                    }}
                    className={cx(
                      `${itemStyle}`,
                      `${index + 1 === pageActive && `${itemActive}`}`
                    )}
                  >
                    {index + 1}
                  </div>
                )}
              </Fragment>
            );
          })
        ) : (
          <div className={`${itemStyle} ${itemActive}`}>{pageActive}</div>
        )}

        <div
          className={cx(
            `${navStyle}`,
            `${pageActive === countPages ? 'nav_disable' : 'nav_active'}`
          )}
          onClick={onHandleNextPage}
        >
          <ChevronRightIcon
            color={pageActive === countPages ? '#000' : '#5600E8'}
          />
        </div>
      </div>
    </div>
  );
};

export default Pagination;
