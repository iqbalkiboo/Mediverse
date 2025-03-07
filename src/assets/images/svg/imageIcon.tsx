/* eslint-disable max-len */
import {string} from 'prop-types';
import React from 'react';

const ImageIcon = ({color = '#0A0A0A'}) => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M15.5 13.8333V2.16667C15.5 1.25 14.75 0.5 13.8333 0.5H2.16667C1.25 0.5 0.5 1.25 0.5 2.16667V13.8333C0.5 14.75 1.25 15.5 2.16667 15.5H13.8333C14.75 15.5 15.5 14.75 15.5 13.8333ZM5.41667 9.65L7.16667 11.7583L9.75 8.43333C9.91667 8.21667 10.25 8.21667 10.4167 8.44167L13.3417 12.3417C13.55 12.6167 13.35 13.0083 13.0083 13.0083H3.01667C2.66667 13.0083 2.475 12.6083 2.69167 12.3333L4.76667 9.66667C4.925 9.45 5.24167 9.44167 5.41667 9.65Z"
        fill={color}/>
    </svg>
  );
};

ImageIcon.propTypes = {
  color: string,
};

export default ImageIcon;
