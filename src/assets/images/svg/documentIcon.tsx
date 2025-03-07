/* eslint-disable max-len */
import React from 'react';
import {string} from 'prop-types';

const DocumentIcon = ({color = '#FFFFFF'}) => {
  return (
    <svg width="63" height="63" viewBox="0 0 63 63" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_6551_459991)">
        <path d="M21 42.0001H42V47.2501H21V42.0001ZM21 31.5001H42V36.7501H21V31.5001ZM36.75 5.25012H15.75C12.8625 5.25012 10.5 7.61262 10.5 10.5001V52.5001C10.5 55.3876 12.8362 57.7501 15.7237 57.7501H47.25C50.1375 57.7501 52.5 55.3876 52.5 52.5001V21.0001L36.75 5.25012ZM47.25 52.5001H15.75V10.5001H34.125V23.6251H47.25V52.5001Z"
          fill={color}/>
      </g>
      <defs>
        <clipPath id="clip0_6551_459991">
          <rect width="63" height="63" fill="white"/>
        </clipPath>
      </defs>
    </svg>
  );
};

DocumentIcon.propTypes ={
  color: string,
};

export default DocumentIcon;
