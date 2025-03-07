/* eslint-disable max-len */
import {string} from 'prop-types';
import React from 'react';

const AddIcon = ({color = '#5600E8'}) => {
  return (
    <svg
      width="21"
      height="20"
      viewBox="0 0 21 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M10.2487 3.3335V16.6668M16.9154 10.0002L3.58203 10.0002"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"/>
    </svg>
  );
};

AddIcon.propTypes = {
  color: string,
};

export default AddIcon;

/*
  Color add icon in this project
  1. #FFF
  2. #5600E8
*/
