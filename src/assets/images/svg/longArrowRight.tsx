/* eslint-disable max-len */
import {string} from 'prop-types';
import React from 'react';

const LongArrowRight = ({color = '#7859EE'}) => {
  return (
    <svg
      width='14'
      height='10'
      viewBox='0 0 14 10'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M0.5 5C0.5 4.72386 0.723858 4.5 1 4.5H13C13.2761 4.5 13.5 4.72386 13.5 5C13.5 5.27614 13.2761 5.5 13 5.5H1C0.723858 5.5 0.5 5.27614 0.5 5Z'
        fill={color}
      />
      <path
        d='M8.64647 0.646447C8.84174 0.451184 9.15832 0.451184 9.35358 0.646447L13.3536 4.64645C13.5488 4.84171 13.5488 5.15829 13.3536 5.35355L9.35358 9.35355C9.15832 9.54882 8.84174 9.54882 8.64647 9.35355C8.45121 9.15829 8.45121 8.84171 8.64647 8.64645L12.2929 5L8.64647 1.35355C8.45121 1.15829 8.45121 0.841709 8.64647 0.646447Z'
        fill={color}
      />
    </svg>
  );
};

LongArrowRight.propTypes = {
  color: string,
};

export default LongArrowRight;
