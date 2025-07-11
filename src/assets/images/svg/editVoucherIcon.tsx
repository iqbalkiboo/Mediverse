/* eslint-disable max-len */
import {string} from 'prop-types';
import React from 'react';

const EditVoucherIcon = ({color = '#0A0A0A'}) => {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_98_131707)">
        <path d="M2 11.6397V13.6664C2 13.853 2.14667 13.9997 2.33333 13.9997H4.36C4.44667 13.9997 4.53333 13.9664 4.59333 13.8997L11.8733 6.62638L9.37333 4.12638L2.1 11.3997C2.03333 11.4664 2 11.5464 2 11.6397ZM13.8067 4.69305C14.0667 4.43305 14.0667 4.01305 13.8067 3.75305L12.2467 2.19305C11.9867 1.93305 11.5667 1.93305 11.3067 2.19305L10.0867 3.41305L12.5867 5.91305L13.8067 4.69305Z"
          fill={color}/>
      </g>
      <defs>
        <clipPath id="clip0_98_131707">
          <rect width="16" height="16" fill="white"/>
        </clipPath>
      </defs>
    </svg>

  );
};

EditVoucherIcon.propTypes = {
  color: string,
};

export default EditVoucherIcon;
