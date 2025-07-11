/* eslint-disable max-len */
import {string} from 'prop-types';
import React from 'react';

const EditIcon = ({color = '#FFF', ...props}) => {
  const width = props.width || '19';
  const height = props.height || '19';

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 19 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M0 15.4605V18.5005C0 18.7805 0.22 19.0005 0.5 19.0005H3.54C3.67 19.0005 3.8 18.9505 3.89 18.8505L14.81 7.94055L11.06 4.19055L0.15 15.1005C0.0500001 15.2005 0 15.3205 0 15.4605ZM17.71 5.04055C18.1 4.65055 18.1 4.02055 17.71 3.63055L15.37 1.29055C14.98 0.900547 14.35 0.900547 13.96 1.29055L12.13 3.12055L15.88 6.87055L17.71 5.04055Z"
        fill={color}/>
    </svg>
  );
};

EditIcon.propTypes = {
  color: string,
  width: string,
  height: string,
};

export default EditIcon;
