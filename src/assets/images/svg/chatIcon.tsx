/* eslint-disable max-len */
import React from 'react';

interface IProps {
  active?: boolean,
}

const ChatIcon = ({active = false}: IProps) => {
  return (
    <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M6 9H6.01M10 9H10.01M14 9H14.01M19 9C19 13.4183 14.9706 17 10 17C8.46073 17 7.01172 16.6565 5.74467 16.0511L1 17L2.39499 13.28C1.51156 12.0423 1 10.5743 1 9C1 4.58172 5.02944 1 10 1C14.9706 1 19 4.58172 19 9Z"
        stroke={!active ? '#757575' : '#7859EE'}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ChatIcon;
