/* eslint-disable max-len */
import {string} from 'prop-types';
import React from 'react';

const CaretDownStrokeIcon = ({color = '#1C1B1F'}) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M5.30711 9.21299C5.4232 8.93273 5.69668 8.75 6.00002 8.75H18C18.3034 8.75 18.5768 8.93273 18.6929 9.21299C18.809 9.49324 18.7449 9.81583 18.5304 10.0303L12.5304 16.0303C12.2375 16.3232 11.7626 16.3232 11.4697 16.0303L5.46969 10.0303C5.25519 9.81583 5.19103 9.49324 5.30711 9.21299ZM7.81068 10.25L12 14.4393L16.1894 10.25H7.81068Z"
        fill={color}/>
    </svg>
  );
};

CaretDownStrokeIcon.propTypes = {
  color: string,
};

export default CaretDownStrokeIcon;
