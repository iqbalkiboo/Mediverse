/* eslint-disable max-len */
import React from 'react';
import { string } from 'prop-types';

const ButtonPlus = ({ color = '#7859EE' }) => {
  return (
    <svg
      width='16'
      height='16'
      viewBox='0 0 16 16'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M14.6344 6.64609H9.5375V1.36484C9.5375 0.608594 8.925 -0.00390625 8.16875 -0.00390625C7.4125 -0.00390625 6.8 0.608594 6.8 1.36484V6.64609H1.3625C0.6125 6.64609 0 7.25859 0 8.01484C0 8.77109 0.6125 9.38359 1.36875 9.38359H6.80625V14.6336C6.80625 15.3898 7.41875 16.0023 8.175 16.0023C8.93125 16.0023 9.54375 15.3898 9.54375 14.6336V9.38359H14.6406C15.3969 9.38359 16.0094 8.77109 16.0094 8.01484C16 7.25859 15.3906 6.64609 14.6344 6.64609Z'
        fill={color}
      />
    </svg>
  );
};

ButtonPlus.propTypes = {
  color: string,
};

export default ButtonPlus;
