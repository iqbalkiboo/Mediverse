/* eslint-disable max-len */
import {string} from 'prop-types';
import React from 'react';

const RedoIcon = ({color = '#0A0A0A'}) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M15.3334 8.83329C13.7917 7.49163 11.7917 6.66663 9.58337 6.66663C6.1167 6.66663 3.13337 8.68329 1.7167 11.6083C1.45003 12.1666 1.75003 12.8333 2.3417 13.0333C2.83337 13.2 3.3667 12.9666 3.5917 12.5C4.67503 10.2833 6.95003 8.74996 9.58337 8.74996C11.2084 8.74996 12.6917 9.34996 13.85 10.3166L12.2584 11.9083C11.7334 12.4333 12.1 13.3333 12.8417 13.3333H17.5C17.9584 13.3333 18.3334 12.9583 18.3334 12.5V7.84163C18.3334 7.09996 17.4334 6.72496 16.9084 7.24996L15.3334 8.83329Z"
        fill={color}/>
    </svg>
  );
};

RedoIcon.propTypes = {
  color: string,
};

export default RedoIcon;
