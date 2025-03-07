import React from 'react';
import cx from 'classnames';
import {string} from 'prop-types';

import {Typography} from '@/components/index';

const BadgesNotification = ({
  title,
  customClassName,
  customClassText,
}) => {
  return (
    <div
      className={cx(
          'px-3 py-1 mr-4 rounded-full w-auto flex min-w-4 justify-center items-center',
          `${customClassName}`,
      )}>
      <Typography variant='bodyXxSmall' color={customClassText}>
        {title}
      </Typography>
    </div>
  );
};

BadgesNotification.propTypes = {
  title: string,
  customClassName: string,
  customClassText: string,
};

export default BadgesNotification;
