import React from 'react';
import Typography from '@/src/components/Typography';
import cx from 'classnames';
import {StarIcon} from '@/src/assets/images/svg';
import {number} from 'prop-types';

const Rating = (props) => {
  return (
    <div className={cx('flex items-center gap-1')}>
      <StarIcon />
      <Typography variant='bodySmall' color='text-[#FFAA0D]'>
        {props.rating}
      </Typography>
    </div>
  );
};

Rating.propTypes = {
  rating: number,
};

export default Rating;
