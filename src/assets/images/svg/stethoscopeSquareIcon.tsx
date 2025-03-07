/* eslint-disable max-len */
import {string} from 'prop-types';
import React from 'react';

const StethoscopeSquareIcon = ({color = '#8756EF'}) => {
  return (
    <svg
      width="20"
      height="21"
      viewBox="0 0 20 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20 3.056V11.278C20 16.363 15.514 20.5 10 20.5C4.486 20.5 0 16.363 0 11.278V3.056C0 2.504 0.447 2.056 1 2.056H5.295V1.5C5.295 0.948 5.742 0.5 6.295 0.5C6.848 0.5 7.295 0.948 7.295 1.5V4.55C7.295 5.102 6.848 5.55 6.295 5.55C5.742 5.55 5.295 5.102 5.295 4.55V4.056H2V9.892H4.69C5.243 9.892 5.69 10.34 5.69 10.892V11.743C5.69 13.866 7.624 15.594 10 15.594C12.376 15.594 14.31 13.866 14.31 11.743V10.892C14.31 10.34 14.757 9.892 15.31 9.892H18V4.056H14.705V4.55C14.705 5.102 14.258 5.55 13.705 5.55C13.152 5.55 12.705 5.102 12.705 4.55V1.5C12.705 0.948 13.152 0.5 13.705 0.5C14.258 0.5 14.705 0.948 14.705 1.5V2.056H19C19.553 2.056 20 2.503 20 3.056Z"
        fill={color}
      />
    </svg>
  );
};

StethoscopeSquareIcon.propTypes = {
  color: string,
};

export default StethoscopeSquareIcon;
