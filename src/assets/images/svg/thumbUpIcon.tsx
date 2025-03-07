/* eslint-disable max-len */
import {string} from 'prop-types';
import React from 'react';

const ThumbUpIcon = ({color = '#757575'}) => {
  return (
    <svg
      width="16"
      height="17"
      viewBox="0 0 16 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M9.33333 7.16667H12.5093C13.5005 7.16667 14.1451 8.20975 13.7019 9.09629L11.3685 13.763C11.1427 14.2147 10.681 14.5 10.176 14.5H7.49747C7.38846 14.5 7.27986 14.4866 7.17409 14.4602L4.66667 13.8333M9.33333 7.16667V3.83333C9.33333 3.09695 8.73638 2.5 8 2.5H7.93635C7.60331 2.5 7.33333 2.76998 7.33333 3.10302C7.33333 3.57922 7.19238 4.04477 6.92823 4.44099L4.66667 7.83333V13.8333M9.33333 7.16667H8M4.66667 13.8333H3.33333C2.59695 13.8333 2 13.2364 2 12.5V8.5C2 7.76362 2.59695 7.16667 3.33333 7.16667H5"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"/>
    </svg>
  );
};

ThumbUpIcon.propTypes = {
  color: string,
};

export default ThumbUpIcon;
