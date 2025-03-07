/* eslint-disable max-len */
import {string} from 'prop-types';
import React from 'react';

const PrivacyPolicyIcon = ({color = '#0A0A0A'}) => {
  return (
    <svg
      width="16"
      height="20"
      viewBox="0 0 16 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M7.325 1.13594L1.49167 3.7276C0.891667 3.99427 0.5 4.59427 0.5 5.2526V9.16927C0.5 13.7943 3.7 18.1193 8 19.1693C12.3 18.1193 15.5 13.7943 15.5 9.16927V5.2526C15.5 4.59427 15.1083 3.99427 14.5083 3.7276L8.675 1.13594C8.25 0.944271 7.75 0.944271 7.325 1.13594ZM8 9.99427H13.8333C13.3917 13.4276 11.1 16.4859 8 17.4443V10.0026H2.16667V5.2526L8 2.66094V9.99427Z"
        fill={color}/>
    </svg>
  );
};

PrivacyPolicyIcon.propTypes = {
  color: string,
};

export default PrivacyPolicyIcon;
