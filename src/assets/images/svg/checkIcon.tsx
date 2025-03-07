/* eslint-disable max-len */
import {any, string} from 'prop-types';
import React from 'react';

const CheckIcon = ({color = '#0A0A0A', width = 24, height = 24}) => {
  return <svg width={width} height={height} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4.16675 10.832L7.50008 14.1654L15.8334 5.83203" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>;
};

CheckIcon.propTypes = {
  color: string,
  width: any,
  height: any,
};

export default CheckIcon;
