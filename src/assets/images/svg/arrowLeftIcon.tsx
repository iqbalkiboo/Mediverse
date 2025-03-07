/* eslint-disable max-len */
import {string} from 'prop-types';
import React from 'react';

const ArrowLeftIcon = ({color = '#0A0A0A', width = '14', height= '14'}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12.3332 6.16666H3.0249L7.09157 2.1C7.41657 1.775 7.41657 1.24166 7.09157 0.916663C6.76657 0.591663 6.24157 0.591663 5.91657 0.916663L0.424902 6.40833C0.0999024 6.73333 0.0999024 7.25833 0.424902 7.58333L5.91657 13.075C6.24157 13.4 6.76657 13.4 7.09157 13.075C7.41657 12.75 7.41657 12.225 7.09157 11.9L3.0249 7.83333H12.3332C12.7916 7.83333 13.1666 7.45833 13.1666 7C13.1666 6.54166 12.7916 6.16666 12.3332 6.16666Z"
        fill={color}
      />
    </svg>
  );
};

ArrowLeftIcon.propTypes = {
  color: string,
  width: string,
  height: string,
};

export default ArrowLeftIcon;

/*
  Color arrow left icon in this project
  1. #0A0A0A -> black (default)
  2. #921919 -> red
  3. #FFF -> white
*/
