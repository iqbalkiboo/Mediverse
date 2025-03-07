/* eslint-disable max-len */
import {string} from 'prop-types';
import React from 'react';

const PaymentIcon = ({color = '#45ADFF'}) => {
  return (
    <svg
      width="20"
      height="14"
      viewBox="0 0 20 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.25 10C0.25 12.07 1.93 13.75 4 13.75H16C18.07 13.75 19.75 12.07 19.75 10V5.75H0.25V10ZM4 9.25H7C7.41 9.25 7.75 9.59 7.75 10C7.75 10.41 7.41 10.75 7 10.75H4C3.59 10.75 3.25 10.41 3.25 10C3.25 9.59 3.59 9.25 4 9.25Z"
        fill="#45ADFF"
      />
      <path
        d="M16 0.25H4C1.93 0.25 0.25 1.93 0.25 4V4.25H19.75V4C19.75 1.93 18.07 0.25 16 0.25Z"
        fill={color}
      />
    </svg>
  );
};

PaymentIcon.propTypes = {
  color: string,
};

export default PaymentIcon;
