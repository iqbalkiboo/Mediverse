/* eslint-disable max-len */
import {string} from 'prop-types';
import React from 'react';

const SendIcon = ({color = '#FFF'}) => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M3.4 20.4005L20.85 12.9205C21.66 12.5705 21.66 11.4305 20.85 11.0805L3.4 3.60051C2.74 3.31051 2.01 3.80051 2.01 4.51051L2 9.1205C2 9.6205 2.37 10.0505 2.87 10.1105L17 12.0005L2.87 13.8805C2.37 13.9505 2 14.3805 2 14.8805L2.01 19.4905C2.01 20.2005 2.74 20.6905 3.4 20.4005Z"
        fill={color}/>
    </svg>

  );
};

SendIcon.propTypes = {
  color: string,
};

export default SendIcon;
