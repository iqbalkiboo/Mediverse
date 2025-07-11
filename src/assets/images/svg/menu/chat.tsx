/* eslint-disable max-len */
import { string } from 'prop-types';
import React from 'react';

const ChatIcon = ({ color }) => {
  const fill = color ? color : '#757575';
  return (
    <svg
      width='18'
      height='18'
      viewBox='0 0 18 18'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        id='Vector'
        d='M18 8.50003C18.0034 9.8199 17.6951 11.1219 17.1 12.3C16.3944 13.7118 15.3098 14.8992 13.9674 15.7293C12.6251 16.5594 11.0782 16.9994 9.5 17C8.18013 17.0035 6.87812 16.6951 5.7 16.1L0 18L1.9 12.3C1.30493 11.1219 0.996559 9.8199 1 8.50003C1.00061 6.92179 1.44061 5.37488 2.27072 4.03258C3.10083 2.69028 4.28825 1.6056 5.7 0.900029C6.87812 0.30496 8.18013 -0.00341276 9.5 2.84881e-05H10C12.0843 0.11502 14.053 0.99479 15.5291 2.47089C17.0052 3.94699 17.885 5.91568 18 8.00003V8.50003Z'
        fill={fill}
      />
    </svg>
  );
};

ChatIcon.propTypes = {
  color: string,
};

export default ChatIcon;
