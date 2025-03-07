/* eslint-disable max-len */
import { string } from 'prop-types';

const ServiceIcon = ({ color }) => {
  const fill = color ? color : '#757575';

  return (
    <svg
      width='20'
      height='20'
      viewBox='0 0 20 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <rect
        x='1'
        y='1'
        width='18'
        height='18'
        fill={fill !== '#757575' ? fill : 'white'}
      />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M0.25 2.5C0.25 1.25736 1.25736 0.25 2.5 0.25H17.5C18.7427 0.25 19.75 1.25737 19.75 2.5V17.5C19.75 18.7427 18.7427 19.75 17.5 19.75H2.5C1.25737 19.75 0.25 18.7427 0.25 17.5V2.5ZM2.5 1.75C2.08579 1.75 1.75 2.08579 1.75 2.5V17.5C1.75 17.9142 2.08578 18.25 2.5 18.25H17.5C17.9142 18.25 18.25 17.9142 18.25 17.5V2.5C18.25 2.08578 17.9142 1.75 17.5 1.75H2.5Z'
        fill={fill}
      />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M15.4685 9.91438C15.792 10.1731 15.8444 10.6451 15.5857 10.9685L11.5857 15.9685C11.3269 16.292 10.855 16.3444 10.5315 16.0857L8.03151 14.0857C7.70806 13.8269 7.65562 13.355 7.91438 13.0315C8.17313 12.7081 8.6451 12.6556 8.96855 12.9144L10.8829 14.4459L14.4144 10.0315C14.6731 9.70806 15.1451 9.65562 15.4685 9.91438Z'
        fill={fill !== '#757575' ? 'white' : fill}
      />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M4.25 5.5C4.25 5.08579 4.58579 4.75 5 4.75H15C15.4142 4.75 15.75 5.08579 15.75 5.5C15.75 5.91421 15.4142 6.25 15 6.25H5C4.58579 6.25 4.25 5.91421 4.25 5.5Z'
        fill={fill !== '#757575' ? 'white' : fill}
      />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M4.25 9.5C4.25 9.08579 4.58579 8.75 5 8.75H9C9.41421 8.75 9.75 9.08579 9.75 9.5C9.75 9.91421 9.41421 10.25 9 10.25H5C4.58579 10.25 4.25 9.91421 4.25 9.5Z'
        fill={fill !== '#757575' ? 'white' : fill}
      />
    </svg>
  );
};

ServiceIcon.propTypes = {
  color: string,
};

export default ServiceIcon;
