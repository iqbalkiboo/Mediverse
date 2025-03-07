import { Fragment, useEffect } from 'react';
import { usePagination, useSortBy, useTable } from 'react-table';
import cx from 'classnames';

import { Typography } from '@/src/components';
import { EmptyStateTable, SortUpDownIcon } from '@/src/assets/images/svg';
import CustomRows from '@/src/components/CustomRows';

import { any, array, bool, func, object } from 'prop-types';

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

const TableV2 = ({ columns, data, onSort, initialSortBy, ...rest }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headers,
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
    <div
      className={cx('bg-white min-w-20 overflow-x-auto', {
        'p-4 shadow-lg rounded-lg': !rest.removeBgStyling,
      })}
      style={rest.containerStyle}
    >
      <table
        className={cx('table__main')}
        style={{
          border: 'none',
          borderRadius: '8px',
          boxShadow: '0px 15px 20px rgba(255, 255, 255, 0.2)',
        }}
        {...getTableProps()}
      >
        <thead>
          <tr>
            {headers.map((column, indexHeader) => {
              return (
                column.isVisible && (
                  <th
                    {...column.getHeaderProps([
                      {
                        className: cx(`thead ${column.width}`),
                      },
                      column.getSortByToggleProps(),
                    ])}
                    key={indexHeader}
                  >
                    <div
                      className={`w-autoflex flex flex-row gap-2 text-sm font-semibold items-center ${column.classHeader}`}
                    >
                      {column.render('Header')}
                      {column.canSort && <SortUpDownIcon />}
                    </div>
                  </th>
                )
              );
            })}
          </tr>
        </thead>
        <tbody {...getTableBodyProps()}>
          {rest.isLoading &&
            Array.from(Array(8).keys()).map((i) => {
              return (
                <tr key={`key_${i}`} className={cx('tr__class')}>
                  {headers.map((item) => {
                    return (
                      <td key={`shimmer_${i}_${item.Header}`}>
                        <Shimmer />
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          {!rest.isLoading &&
            page.length > 0 &&
            !rest.isError &&
            page.map((row, indexRow) => {
              prepareRow(row);
              return (
                <Fragment key={indexRow}>
                  <tr
                    {...row.getRowProps()}
                    // key={indexRow}
                    key={row.id}
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
                  {rest.isOpen === indexRow && (
                    <CustomRows
                      data={data[indexRow].items}
                      columns={rest.subColumns}
                      showOneRow={rest.showOneRow}
                    />
                  )}
                </Fragment>
              );
            })}

          {rest.showNotFound &&
            !rest.isLoading &&
            !rest.isError &&
            page.length === 0 && (
              <tr key='not_found'>
                <td
                  colSpan={columns.length}
                  className={cx('text-center text-sm py-2')}
                >
                  <div className={cx('flex flex-col items-center gap-2 py-6')}>
                    <EmptyStateTable />
                    {rest.textNotFound && (
                      <Typography
                        variant={'bodyBase'}
                        color={'text-grayText'}
                        customClass={'font-bold mt-4'}
                      >
                        {rest.textNotFound}
                      </Typography>
                    )}
                    {rest.elmentNotFound && <>{rest.elmentNotFound}</>}
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

TableV2.propTypes = {
  columns: array,
  data: array,
  onSort: func,
  sortBy: object,
  initialSortBy: array,
  isLoading: bool,
  showNotFound: bool,
  containerStyle: any,
};

TableV2.defaultProps = {
  textNotFound: 'Data tidak di temukan.',
  showNotFound: true,
};

export default TableV2;
