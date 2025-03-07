/* eslint-disable max-len */
import {string} from 'prop-types';
import React from 'react';

const DottedIcon = ({color = '#0A0A0A'}) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M4.16659 10H4.17492M9.99992 10H10.0083M15.8333 10H15.8416M4.99992 10C4.99992 10.4603 4.62682 10.8334 4.16659 10.8334C3.70635 10.8334 3.33325 10.4603 3.33325 10C3.33325 9.53978 3.70635 9.16669 4.16659 9.16669C4.62682 9.16669 4.99992 9.53978 4.99992 10ZM10.8333 10C10.8333 10.4603 10.4602 10.8334 9.99992 10.8334C9.53968 10.8334 9.16658 10.4603 9.16658 10C9.16658 9.53978 9.53968 9.16669 9.99992 9.16669C10.4602 9.16669 10.8333 9.53978 10.8333 10ZM16.6666 10C16.6666 10.4603 16.2935 10.8334 15.8333 10.8334C15.373 10.8334 14.9999 10.4603 14.9999 10C14.9999 9.53978 15.373 9.16669 15.8333 9.16669C16.2935 9.16669 16.6666 9.53978 16.6666 10Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"/>
    </svg>
  );
};

DottedIcon.propTypes = {
  color: string,
};

export default DottedIcon;
