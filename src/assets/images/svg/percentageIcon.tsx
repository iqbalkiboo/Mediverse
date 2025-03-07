/* eslint-disable max-len */
import {string} from 'prop-types';
import React from 'react';

const PercentageIcon = ({color = '#0A0A0A'}) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M15.8334 4.16797L4.16675 15.8346"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"/>
      <path
        d="M5.41659 7.4987C6.56718 7.4987 7.49992 6.56596 7.49992 5.41536C7.49992 4.26477 6.56718 3.33203 5.41659 3.33203C4.26599 3.33203 3.33325 4.26477 3.33325 5.41536C3.33325 6.56596 4.26599 7.4987 5.41659 7.4987Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"/>
      <path
        d="M14.5833 16.6667C15.7339 16.6667 16.6667 15.7339 16.6667 14.5833C16.6667 13.4327 15.7339 12.5 14.5833 12.5C13.4327 12.5 12.5 13.4327 12.5 14.5833C12.5 15.7339 13.4327 16.6667 14.5833 16.6667Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"/>
    </svg>
  );
};

PercentageIcon.propTypes = {
  color: string,
};

export default PercentageIcon;
