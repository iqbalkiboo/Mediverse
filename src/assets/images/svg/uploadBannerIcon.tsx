/* eslint-disable max-len */
import {string} from 'prop-types';
import React from 'react';

const UploadBannerIcon = ({color}) => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18.6609 10.9312C18.6609 10.875 18.6703 10.8188 18.6703 10.7625C18.6703 7.71563 16.2422 5.25 13.2469 5.25C11.0859 5.25 9.22969 6.53438 8.35781 8.39062C7.97813 8.19844 7.55156 8.08594 7.10156 8.08594C5.71875 8.08594 4.56562 9.1125 4.34531 10.4531C2.68594 11.025 1.5 12.6141 1.5 14.4844C1.5 16.8375 3.37969 18.75 5.69531 18.75H10.5V15H8.24063L12 11.0766L15.7594 14.9953H13.5V18.7453H18.6703C20.7891 18.7453 22.5 16.9875 22.5 14.8359C22.5 12.6844 20.7797 10.9359 18.6609 10.9312Z" fill={color}/>
    </svg>
  );
};

UploadBannerIcon.defaultProps = {
  color: '#000054',
};

UploadBannerIcon.propTypes = {
  color: string,
};

export default UploadBannerIcon;
