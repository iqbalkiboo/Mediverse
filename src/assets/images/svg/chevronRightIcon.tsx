/* eslint-disable max-len */
import {string} from 'prop-types';
import React from 'react';

const ChevronRightIcon = ({color = '#000'}) => {
  return (
    <svg
      width='6'
      height='10'
      viewBox='0 0 6 10'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M0.741797 8.23307L3.97513 4.99974L0.741797 1.76641C0.416797 1.44141 0.416797 0.916406 0.741797 0.591406C1.0668 0.266406 1.5918 0.266406 1.9168 0.591406L5.7418 4.41641C6.0668 4.74141 6.0668 5.26641 5.7418 5.59141L1.9168 9.4164C1.5918 9.7414 1.0668 9.7414 0.741797 9.4164C0.42513 9.0914 0.416797 8.55807 0.741797 8.23307Z'
        fill={color}
      />
    </svg>
  );
};

ChevronRightIcon.propTypes = {
  color: string,
};

export default ChevronRightIcon;
