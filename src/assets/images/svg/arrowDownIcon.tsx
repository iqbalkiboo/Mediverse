/* eslint-disable max-len */
import React from 'react';
import {string} from 'prop-types';

const ArrowDownIcon = ({color = '#0A0A0A', width = '16', height= '16'}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M5 7.5L10 12.5L15 7.5"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

ArrowDownIcon.propTypes = {
  color: string,
  width: string,
  height: string,
};

export default ArrowDownIcon;
