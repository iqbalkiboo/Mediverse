/* eslint-disable max-len */
import {string} from 'prop-types';
import React from 'react';

const TextBgColorIcon = ({color = '#000'}) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M3.33331 14.1667L5.62498 11.875L5.59998 11.8583C5.11665 11.3667 5.11665 10.575 5.59998 10.0917L9.54998 6.14167L13.0833 9.675L9.13331 13.625C8.65831 14.1083 7.88331 14.1083 7.39165 13.6417L6.86665 14.1667H3.33331ZM13.2583 2.425C13.75 1.94167 14.5416 1.94167 15.025 2.425L16.8 4.19167C17.2833 4.68333 17.2833 5.475 16.8 5.96667L14.05 8.70833L10.5166 5.175L13.2583 2.425Z"
        fill={color}/>
    </svg>
  );
};

TextBgColorIcon.propTypes = {
  color: string,
};

export default TextBgColorIcon;
