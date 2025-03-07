import React from 'react';
import cx from 'classnames';
import {TableV2, Typography} from '@/src/components';
import {any} from 'prop-types';
import {formatRupiah} from '@/src/utils/fromatCurrency';
import {boolean, string} from 'yup';

const DashboardIncomeHistories = ({
  data,
  status,
}) => {
  const incomeHistoriesColumn = [
    {
      Header: 'Tanggal Transaksi',
      accessor: 'transactionDate',
      canSort: false,
      isVisible: true,
      disableSortBy: true,
      id: 'transactionDate',
    },
    {
      Header: 'Nomor Transaksi',
      accessor: 'transactionNumber',
      canSort: false,
      isVisible: true,
      disableSortBy: true,
      id: 'transactionNumber',
    },
    {
      Header: 'Nama Akun',
      accessor: 'accountName',
      canSort: false,
      isVisible: true,
      disableSortBy: true,
      id: 'accountName',
    },
    {
      Header: 'Jumlah Transaksi',
      accessor: 'transactionAmount',
      canSort: false,
      isVisible: true,
      Cell: (values) => {
        return <div className={cx('py-[10px] flex items-center')}>
          <Typography variant='bodySmall' color='text-[#7859EE]'>
            {formatRupiah(values.cell.value)}
          </Typography>
        </div>;
      },
      disableSortBy: true,
      id: 'transactionAmount',
    },
    {
      Header: 'Keterangan',
      accessor: 'note',
      canSort: false,
      isVisible: true,
      disableSortBy: true,
      id: 'note',
    },
    {
      Header: 'Sisa Saldo',
      accessor: 'remainingBalance',
      canSort: false,
      isVisible: true,
      disableSortBy: true,
      Cell: (values) => {
        return <div className={cx('py-[10px] flex items-center')}>
          {formatRupiah(values.cell.value)}
        </div>;
      },
      id: 'remainingBalance',
    },
  ];

  return (
    <div
      className={cx(
          'p-6 w-full bg-white rounded-2xl',
      )}
    >
      <div className={cx('w-full flex justify-between mt-1')}>
        <div className={cx('w-full items-center')}>
          <TableV2
            columns={incomeHistoriesColumn}
            data={data}
            initialSortBy={[]}
            onSort={() => {}}
            removeBgStyling={true}
            isLoading={status.isLoading}
            isError={status.isError}
            errMsg={status.message}
          />
        </div>
      </div>
    </div>

  );
};
DashboardIncomeHistories.propTypes = {
  data: any,
  status: {
    isLoading: boolean,
    isError: boolean,
    isSuccess: boolean,
    message: string,
  },
};

export default DashboardIncomeHistories;
