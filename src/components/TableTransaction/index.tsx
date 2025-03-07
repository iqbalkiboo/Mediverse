import { useEffect } from 'react';
import { usePagination, useSortBy, useTable } from 'react-table';
import cx from 'classnames';

import { array, bool, func, object } from 'prop-types';

import './index.css';

const Shimmer = () => {
  return (
    <div className='animate-pulse w-full'>
      <div className='flex-1 py-2 pr-4'>
        <div className='h-4 bg-[#C2C2C2] rounded-full col-span-2'></div>
      </div>
    </div>
  );
};

const TableTransaction = ({
  columns,
  data,
  onSort,
  initialSortBy,
  ...rest
}) => {
  const {
    getTableProps,
    getTableBodyProps,
    prepareRow,
    page,
    state: { sortBy },
  } = useTable(
    {
      columns,
      data,
      initialState: {
        sortBy: initialSortBy,
        pageIndex: 0,
        hiddenColumns: columns
          .filter((col) => col.isVisible === false)
          .map((col) => col.accessor),
      },
      manualPagination: true,
      manualSortBy: false,
      defaultCanSort: true,
      disableSortRemove: true,
      ...rest,
    },
    useSortBy,
    usePagination
  );

  useEffect(() => {
    onSort({ sortBy });
  }, [onSort, sortBy]);

  return (
    <div className={cx('bg-white')}>
      <table
        className={cx('table__main')}
        style={{
          borderRadius: '8px',
          overflow: 'hidden',
          boxShadow: '0px 15px 20px rgba(255, 255, 255, 0.2)',
        }}
        {...getTableProps()}
      >
        <tbody {...getTableBodyProps()}>
          {rest.isLoading &&
            Array.from(Array(8).keys()).map((i) => {
              return (
                <tr key={`key_${i}`} className={cx('tr__class')}>
                  <td>
                    <Shimmer />
                  </td>
                </tr>
              );
            })}
          {!rest.isLoading &&
            page.length > 0 &&
            page.map((row, indexRow) => {
              prepareRow(row);
              return (
                <tr
                  {...row.getRowProps()}
                  key={indexRow}
                  className={cx('tr__class')}
                >
                  {row.cells.map((cell, indexCell) => {
                    return (
                      <td {...cell.getCellProps()} key={indexCell}>
                        {cell.render('Cell')}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          {!rest.isLoading && !rest.isError && page.length === 0 && (
            <tr key='not_found'>
              <td
                colSpan={columns.length}
                className={cx('text-center text-sm py-2')}
              >
                <div className={cx('flex flex-col items-center gap-2')}>
                  <span className={cx('text-base-gray-2 font-normal')}>
                    Data tidak di temukan.
                  </span>
                </div>
              </td>
            </tr>
          )}
          {rest.isError && (
            <tr key='error'>
              <td
                colSpan={columns.length}
                className={cx('text-center text-sm py-2 bg-white')}
              >
                <div className={cx('flex flex-col items-center gap-2')}>
                  <span className={cx('text-red-500 font-normal w-1/2')}>
                    {rest.errMsg}
                  </span>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

TableTransaction.propTypes = {
  columns: array,
  customHeaders: array,
  data: array,
  onSort: func,
  sortBy: object,
  initialSortBy: array,
  isLoading: bool,
};

export default TableTransaction;
