/* eslint-disable max-len */
import {string} from 'prop-types';
import React from 'react';

const StarIcon = ({color = '#FFAA0D'}) => {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M5.99999 10.0145L8.76665 11.6878C9.27332 11.9945 9.89332 11.5411 9.75999 10.9678L9.02665 7.82114L11.4733 5.70115C11.92 5.31448 11.68 4.58115 11.0933 4.53448L7.87332 4.26115L6.61332 1.28781C6.38665 0.747813 5.61332 0.747813 5.38665 1.28781L4.12665 4.25448L0.906654 4.52781C0.319987 4.57448 0.0799874 5.30781 0.526654 5.69448L2.97332 7.81448L2.23999 10.9611C2.10665 11.5345 2.72665 11.9878 3.23332 11.6811L5.99999 10.0145Z"
        fill={color}/>
    </svg>

  );
};

StarIcon.propTypes = {
  color: string,
};

export default StarIcon;
