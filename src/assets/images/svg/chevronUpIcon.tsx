/* eslint-disable max-len */
import {string} from 'prop-types';
import React from 'react';

const ChevronUpIcon = ({color = '#5600E8'}) => {
  return (
    <svg
      width="10"
      height="6"
      viewBox="0 0 10 6"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M1.76644 5.25937L4.99977 2.02603L8.23311 5.25937C8.55811 5.58436 9.08311 5.58436 9.40811 5.25937C9.73311 4.93436 9.73311 4.40937 9.40811 4.08436L5.58311 0.259367C5.25811 -0.0656326 4.73311 -0.0656326 4.40811 0.259367L0.58311 4.08436C0.25811 4.40937 0.25811 4.93436 0.58311 5.25937C0.90811 5.57603 1.44144 5.58436 1.76644 5.25937Z"
        fill={color}/>
    </svg>
  );
};

ChevronUpIcon.propTypes = {
  color: string,
};

export default ChevronUpIcon;
