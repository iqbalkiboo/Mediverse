import React from 'react';
import {useTable} from 'react-table';
import cx from 'classnames';
import {array, bool} from 'prop-types';

const CustomRows = ({data, columns, showOneRow}) => {
  const {
    rows,
    prepareRow,
  } = useTable({
    columns: columns,
    data: data,
  });
  return (
    <React.Fragment>
      {showOneRow ? rows.slice(0, 1).map((row, idx) => {
        prepareRow(row);
        return (
          <tr
            {...row.getRowProps()}
            key={idx}
            className={cx('tr__class !bg-white')}
            data-testid="test-custom-rows-one"
          >
            {row.cells.map((cell, indexCell) => {
              return (
                <td
                  {...cell.getCellProps()}
                  key={indexCell}
                >
                  {cell.render('Cell')}
                </td>
              );
            })}
          </tr>
        );
      }) : rows.map((row, idx) => {
        prepareRow(row);
        return (
          <tr
            {...row.getRowProps()}
            key={idx}
            className={cx('tr__class')}
            data-testid="test-custom-rows"
          >
            {row.cells.map((cell, indexCell) => {
              return (
                <td
                  {...cell.getCellProps()}
                  key={indexCell}
                >
                  {cell.render('Cell')}
                </td>
              );
            })}
          </tr>
        );
      })}
    </React.Fragment>
  );
};

CustomRows.propTypes = {
  data: array,
  columns: array,
  showOneRow: bool,
};

export default CustomRows;
