/* eslint-disable max-len */
import {string} from 'prop-types';
import React from 'react';

const EyeCloseIcon = ({color = '#0A0A0A'}) => {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M1.4998 1.5L4.49076 4.49097M16.4998 16.5L13.5091 13.5093M10.5622 14.6872C10.0562 14.7831 9.53406 14.8333 9.00018 14.8333C5.2688 14.8333 2.11022 12.3809 1.04834 8.99997C1.33742 8.07958 1.78189 7.22801 2.35099 6.47598M7.23203 7.23223C7.68444 6.77982 8.30944 6.5 8.99979 6.5C10.3805 6.5 11.4998 7.61929 11.4998 9C11.4998 9.69036 11.22 10.3154 10.7676 10.7678M7.23203 7.23223L10.7676 10.7678M7.23203 7.23223L4.49076 4.49097M10.7676 10.7678L4.49076 4.49097M10.7676 10.7678L13.5091 13.5093M4.49076 4.49097C5.79061 3.65295 7.3386 3.16667 9.00016 3.16667C12.7315 3.16667 15.8901 5.61909 16.952 9.00003C16.3629 10.8756 15.1286 12.4654 13.5091 13.5093"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"/>
    </svg>
  );
};

EyeCloseIcon.propTypes = {
  color: string,
};

export default EyeCloseIcon;
