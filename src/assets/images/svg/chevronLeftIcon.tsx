/* eslint-disable max-len */
import {string} from 'prop-types';
import React from 'react';

const ChevronLeftIcon = ({color = '#757575'}) => {
  return (
    <svg
      width="6"
      height="10"
      viewBox="0 0 6 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M5.25938 8.23356L2.02604 5.00023L5.25938 1.76689C5.58437 1.44189 5.58437 0.916894 5.25938 0.591894C4.93437 0.266895 4.40938 0.266895 4.08437 0.591894L0.259375 4.41689C-0.065625 4.74189 -0.065625 5.26689 0.259375 5.59189L4.08437 9.41689C4.40938 9.74189 4.93437 9.74189 5.25938 9.41689C5.57604 9.09189 5.58437 8.55856 5.25938 8.23356Z"
        fill={color}
      />
    </svg>
  );
};

ChevronLeftIcon.propTypes = {
  color: string,
};

export default ChevronLeftIcon;

/*
  Color arrow back icon in this project
  1. #757575 -> gray (default)
  2. #5600E8 -> primary
*/
