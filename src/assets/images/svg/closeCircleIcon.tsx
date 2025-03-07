/* eslint-disable max-len */
import {any, string} from 'prop-types';
import React from 'react';

const CloseCircleIcon = ({color = '#FFF', width = 24, height = 24}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12ZM12 2.75C6.89136 2.75 2.75 6.89136 2.75 12C2.75 17.1086 6.89136 21.25 12 21.25C17.1086 21.25 21.25 17.1086 21.25 12C21.25 6.89136 17.1086 2.75 12 2.75Z"
        fill={color}/>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.3588 8.64124C15.6517 8.93413 15.6517 9.40901 15.3588 9.7019L9.70196 15.3587C9.40907 15.6516 8.93419 15.6516 8.6413 15.3587C8.34841 15.0659 8.34841 14.591 8.6413 14.2981L14.2982 8.64124C14.591 8.34835 15.0659 8.34835 15.3588 8.64124Z"
        fill={color}/>

      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.6413 8.64124C8.93419 8.34835 9.40907 8.34835 9.70196 8.64124L15.3588 14.2981C15.6517 14.591 15.6517 15.0659 15.3588 15.3587C15.0659 15.6516 14.591 15.6516 14.2982 15.3587L8.6413 9.7019C8.34841 9.40901 8.34841 8.93413 8.6413 8.64124Z"
        fill={color}/>
    </svg>
  );
};

CloseCircleIcon.propTypes = {
  color: string,
  width: any,
  height: any,
};

export default CloseCircleIcon;
