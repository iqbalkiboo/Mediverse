/* eslint-disable max-len */
import {string} from 'prop-types';
import React from 'react';

const CaretDownIcon = ({color = '#0A0A0A'}) => {
  return (
    <svg
      width="6"
      height="5"
      viewBox="0 0 6 5"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M0.258295 1.75898L2.41663 3.91732C2.74163 4.24232 3.26663 4.24232 3.59163 3.91732L5.74996 1.75898C6.27496 1.23398 5.89996 0.333984 5.1583 0.333984H0.841628C0.0999614 0.333984 -0.266705 1.23398 0.258295 1.75898Z"
        fill={color}/>
    </svg>
  );
};

CaretDownIcon.propTypes = {
  color: string,
};

export default CaretDownIcon;
