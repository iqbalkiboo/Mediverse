import React from 'react';
import cx from 'classnames';
import {string} from 'prop-types';
import {Typography} from '../index';
import defaultAvatar from '@/assets/images/Userpic.png';
import {formatToInitialCharacters} from '@/src/utils/text';

const Avatar = (props) => {
  const {img, size, text} = props;

  const avatarSize = {
    xl: 'h-14 w-14',
    lg: 'h-12 w-12',
    md: 'h-10 w-10',
    sm: 'h-8 w-8',
  };

  return (
    <div>
      {img && (
        <img
          className={cx('rounded-full object-cover', avatarSize[size])}
          src={img || defaultAvatar}
          onError={({currentTarget}) => {
            currentTarget.onerror = null;
            currentTarget.src = defaultAvatar;
          }}
          alt="Avatar"
        />
      )}

      {!img && text && (
        <div
          className={cx(
              'rounded-full flex justify-center items-center bg-[#7859EE]',
              avatarSize[size],
          )}
        >
          <Typography
            color='text-white'
            variant={size === 'sm' ? 'bodyXSmall' : 'bodyBase'}
            customClass='font-bold'
          >
            {formatToInitialCharacters(text)}
          </Typography>
        </div>
      )}
    </div>
  );
};

Avatar.propTypes = {
  img: string,
  size: string,
  text: string,
};

export default Avatar;
