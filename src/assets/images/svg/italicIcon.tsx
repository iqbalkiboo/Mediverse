/* eslint-disable max-len */
import {string} from 'prop-types';
import React from 'react';

const ItalicIcon = ({color = '#0A0A0A'}) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M8.33333 4.58337C8.33333 5.27504 8.89167 5.83337 9.58333 5.83337H10.175L7.325 12.5H6.25C5.55833 12.5 5 13.0584 5 13.75C5 14.4417 5.55833 15 6.25 15H10.4167C11.1083 15 11.6667 14.4417 11.6667 13.75C11.6667 13.0584 11.1083 12.5 10.4167 12.5H9.825L12.675 5.83337H13.75C14.4417 5.83337 15 5.27504 15 4.58337C15 3.89171 14.4417 3.33337 13.75 3.33337H9.58333C8.89167 3.33337 8.33333 3.89171 8.33333 4.58337Z"
        fill={color}/>
    </svg>
  );
};

ItalicIcon.propTypes = {
  color: string,
};

export default ItalicIcon;
