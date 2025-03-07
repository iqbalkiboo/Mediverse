/* eslint-disable max-len */
import {string} from 'prop-types';
import React from 'react';

const FormatSizeIcon = ({color = '#0A0A0A'}) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M7.5 4.58337C7.5 5.27504 8.05833 5.83337 8.75 5.83337H11.6667V14.5834C11.6667 15.275 12.225 15.8334 12.9167 15.8334C13.6083 15.8334 14.1667 15.275 14.1667 14.5834V5.83337H17.0833C17.775 5.83337 18.3333 5.27504 18.3333 4.58337C18.3333 3.89171 17.775 3.33337 17.0833 3.33337H8.75C8.05833 3.33337 7.5 3.89171 7.5 4.58337ZM3.75 10H5V14.5834C5 15.275 5.55833 15.8334 6.25 15.8334C6.94167 15.8334 7.5 15.275 7.5 14.5834V10H8.75C9.44167 10 10 9.44171 10 8.75004C10 8.05837 9.44167 7.50004 8.75 7.50004H3.75C3.05833 7.50004 2.5 8.05837 2.5 8.75004C2.5 9.44171 3.05833 10 3.75 10Z"
        fill={color}/>
    </svg>
  );
};

FormatSizeIcon.propTypes = {
  color: string,
};

export default FormatSizeIcon;
