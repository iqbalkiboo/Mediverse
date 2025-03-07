/* eslint-disable max-len */
import {string} from 'prop-types';
import React from 'react';

const CaretRightStrokeIcon = ({color = '#1C1B1F'}) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M9.71299 5.30711C9.99324 5.19103 10.3158 5.25519 10.5303 5.46969L16.5303 11.4697C16.8232 11.7626 16.8232 12.2375 16.5303 12.5304L10.5303 18.5304C10.3158 18.7449 9.99324 18.809 9.71299 18.6929C9.43273 18.5768 9.25 18.3034 9.25 18V6.00002C9.25 5.69668 9.43273 5.4232 9.71299 5.30711ZM10.75 7.81068V16.1894L14.9393 12L10.75 7.81068Z"
        fill={color}/>
    </svg>
  );
};

CaretRightStrokeIcon.propTypes = {
  color: string,
};

export default CaretRightStrokeIcon;
