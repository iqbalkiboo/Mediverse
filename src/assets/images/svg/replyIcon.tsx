/* eslint-disable max-len */
import {string} from 'prop-types';
import React from 'react';

const ReplyIcon = ({color = '#9E9E9E'}) => {
  return (
    <svg
      width="16"
      height="12"
      viewBox="0 0 16 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M6.33311 2.50006V1.17506C6.33311 0.433389 5.4331 0.0583886 4.9081 0.583389L1.08311 4.40839C0.758105 4.73339 0.758105 5.25839 1.08311 5.58339L4.9081 9.40839C5.4331 9.93339 6.33311 9.56672 6.33311 8.82506V7.41672C10.4998 7.41672 13.4164 8.75006 15.4998 11.6667C14.6664 7.50006 12.1664 3.33339 6.33311 2.50006Z"
        fill={color}/>
    </svg>
  );
};

ReplyIcon.propTypes = {
  color: string,
};

export default ReplyIcon;
