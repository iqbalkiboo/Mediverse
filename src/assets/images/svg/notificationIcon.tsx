import {string} from 'prop-types';
import React from 'react';

const NotificationIcon = ({fill = '#0A0A0A'}) => {
  return (
    <>
      <svg
        width="16"
        height="20"
        viewBox="0 0 16 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M15.2905
          15.29L14.0005
          14V9C14.0005
          5.93 12.3605
          3.36 9.50054
          2.68V2C9.50054
          1.17 8.83054
          0.5 8.00054
          0.5C7.17054
          0.5 6.50054
          1.17 6.50054
          2V2.68C3.63054
          3.36 2.00054 5.92
          2.00054 9V14L0.71054
          15.29C0.0805398
          15.92 0.52054 17 1.41054
          17H14.5805C15.4805 17
          15.9205 15.92 15.2905
          15.29ZM12.0005
          15H4.00054V9C4.00054
          6.52 5.51054
          4.5 8.00054
          4.5C10.4905
          4.5 12.0005
          6.52 12.0005
          9V15ZM8.00054
          20C9.10054
          20 10.0005 19.1 10.0005
          18H6.00054C6.00054
          19.1 6.89054 20
          8.00054 20Z"
          fill={fill}
        />
      </svg>
    </>
  );
};

NotificationIcon.propTypes = {
  fill: string,
};

export default NotificationIcon;
