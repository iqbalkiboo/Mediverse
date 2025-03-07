/* eslint-disable max-len */
import { string } from 'prop-types';

const PlusIcon = ({ color = '#7859EE', width = '20', height = '20' }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 20 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M10.0254 3.54297C10.3706 3.54342 10.6501 3.82361 10.6496 4.16879L10.6343 15.8355C10.6339 16.1806 10.3537 16.4601 10.0085 16.4596C9.66332 16.4592 9.38387 16.179 9.38432 15.8338L9.39961 4.16715C9.40006 3.82197 9.68025 3.54252 10.0254 3.54297Z'
        fill={color}
      />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M3.54102 10.0013C3.54102 9.65612 3.82084 9.3763 4.16602 9.3763H15.8327C16.1779 9.3763 16.4577 9.65612 16.4577 10.0013C16.4577 10.3465 16.1779 10.6263 15.8327 10.6263H4.16602C3.82084 10.6263 3.54102 10.3465 3.54102 10.0013Z'
        fill={color}
      />
    </svg>
  );
};

PlusIcon.propTypes = {
  color: string,
  width: string,
  height: string,
};

export default PlusIcon;
