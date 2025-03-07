/* eslint-disable max-len */
import {string} from 'prop-types';
import React from 'react';

const ChevronDownIcon = ({color = '#5600E8'}) => {
  return (
    <svg
      width="10"
      height="6"
      viewBox="0 0 10 6"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M8.23356 0.740628L5.00023 3.97397L1.76689 0.740628C1.44189 0.415638 0.916894 0.415638 0.591894 0.740628C0.266895 1.06564 0.266895 1.59063 0.591894 1.91564L4.41689 5.74063C4.74189 6.06563 5.26689 6.06563 5.59189 5.74063L9.41689 1.91564C9.74189 1.59063 9.74189 1.06564 9.41689 0.740628C9.09189 0.423968 8.55856 0.415638 8.23356 0.740628Z"
        fill={color}/>
    </svg>
  );
};

ChevronDownIcon.propTypes = {
  color: string,
};

export default ChevronDownIcon;
