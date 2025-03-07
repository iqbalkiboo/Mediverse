/* eslint-disable max-len */
import {string} from 'prop-types';
import React from 'react';

const PromoIcon = ({color}) => {
  const fill = color ? color : '#757575';
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M3.25 22C3.25 21.5858 3.58579 21.25 4 21.25H8C8.41421 21.25 8.75 21.5858 8.75 22C8.75 22.4142 8.41421 22.75 8 22.75H4C3.58579 22.75 3.25 22.4142 3.25 22Z"
        fill={fill}/>
      <path fillRule="evenodd" clipRule="evenodd" d="M6 1.25C6.41421 1.25 6.75 1.58579 6.75 2V22C6.75 22.4142 6.41421 22.75 6 22.75C5.58579 22.75 5.25 22.4142 5.25 22V2C5.25 1.58579 5.58579 1.25 6 1.25Z"
        fill={fill}/>
      <path d="M20 3H6V11H20L18 7L20 3Z" fill={fill}/>
      <path fillRule="evenodd" clipRule="evenodd" d="M5.25 3C5.25 2.58579 5.58579 2.25 6 2.25H20C20.2599 2.25 20.5013 2.38459 20.638 2.6057C20.7746 2.82681 20.7871 3.10292 20.6708 3.33541L18.8385 7L20.6708 10.6646C20.7871 10.8971 20.7746 11.1732 20.638 11.3943C20.5013 11.6154 20.2599 11.75 20 11.75H6C5.58579 11.75 5.25 11.4142 5.25 11V3ZM6.75 3.75V10.25H18.7865L17.3292 7.33541C17.2236 7.12426 17.2236 6.87574 17.3292 6.66459L18.7865 3.75H6.75Z"
        fill={fill}/>
    </svg>

  );
};

PromoIcon.propTypes = {
  color: string,
};


export default PromoIcon;
