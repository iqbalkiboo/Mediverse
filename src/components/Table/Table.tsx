import React, {useMemo} from 'react';
import {useTable} from 'react-table';
import './Table.css';
interface Props {
    data: any,
}
const Table: React.FC<Props> = (props) => {
  /*  eslint no-trailing-spaces: ["error", { "skipBlankLines": true }]  */
  /* eslint-disable-next-line max-len */
  /* eslint-disable max-len */
  const data = useMemo(() => [...props.data], [props.data]);
  const columns = React.useMemo(
      () => data[0] ? Object.keys(data[0]).map((item, idx) => {
        return {
          Header: item.replace('_', ' '),
          accessor: item,
        };
      }) : [{Header: 'Tidak ada data', accessor: 'datakosong'}], []);
  const tableInstance = useTable({columns, data});
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance;
  return (
    <div className="table-container">
      <div className="w-full">
        <div className="table-body">
          <table className='w-full'>
            <thead className="bg-[#E5E5E5]" {...getTableProps()}>
              {headerGroups.map((headerGroup, idx) => (
                <tr {...headerGroup.getHeaderGroupProps()} key={idx}>
                  {// Loop over the headers in each row
                    headerGroup.headers.map((column, idx) => (
                      // Apply the header cell props
                      <th {...column.getHeaderProps()} key={idx} className="table-head">
                        {// Render the header
                          column.render('Header')}
                      </th>
                    ))
                  }
                </tr>))
              }
            </thead>
            <tbody className="bg-[#FAFAFA]" {...getTableBodyProps()}>
              {// Loop over the table rows
                rows.map((row, idx) => {
                  // Prepare the row for display
                  prepareRow(row);
                  return (
                    // Apply the row props
                    <tr {...row.getRowProps()} key={idx} className="whitespace-nowrap">
                      {// Loop over the rows cells
                        row.cells.map((cell, idx) => {
                          // Apply the cell props
                          return (
                            <td {...cell.getCellProps()} key={idx} className="table-payload">
                              {// Render the cell contents
                                cell.render('Cell')}
                            </td>
                          );
                        })
                      }
                    </tr>
                  );
                })
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Table;
