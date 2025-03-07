/* eslint-disable max-len */
import {string} from 'prop-types';
import React from 'react';

const UsersIcon = ({color = '#667080'}) => {
  return (
    <svg
      width="12"
      height="13"
      viewBox="0 0 12 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M8.5 11V10C8.5 9.46957 8.28929 8.96086 7.91421 8.58579C7.53914 8.21071 7.03043 8 6.5 8H2.5C1.96957 8 1.46086 8.21071 1.08579 8.58579C0.710714 8.96086 0.5 9.46957 0.5 10V11"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"/>
      <path
        d="M4.5 6C5.60457 6 6.5 5.10457 6.5 4C6.5 2.89543 5.60457 2 4.5 2C3.39543 2 2.5 2.89543 2.5 4C2.5 5.10457 3.39543 6 4.5 6Z"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"/>
      <path
        d="M11.5 10.9999V9.99994C11.4997 9.55681 11.3522 9.12633 11.0807 8.7761C10.8092 8.42587 10.4291 8.17573 10 8.06494"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"/>
      <path
        d="M8 2.06494C8.43021 2.17509 8.81152 2.42529 9.08382 2.7761C9.35612 3.1269 9.50392 3.55836 9.50392 4.00244C9.50392 4.44653 9.35612 4.87798 9.08382 5.22879C8.81152 5.57959 8.43021 5.82979 8 5.93994"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"/>
    </svg>
  );
};

UsersIcon.propTypes = {
  color: string,
};

export default UsersIcon;
