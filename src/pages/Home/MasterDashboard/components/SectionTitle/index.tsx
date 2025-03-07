import React from 'react';
import cx from 'classnames';
import {Typography} from '@/src/components';

const SectionTitle = (props: {
  title: string,
  subTitle: string,
  isMobile?: boolean,
  titleVariant: string,
  subTitleVariant: string,
}) => {
  return (
    <div className={cx('my-3', {'w-10/12': props.isMobile})}>
      <Typography variant={props.titleVariant} color="text-blackPrimary">
        {props.title}
      </Typography>
      <Typography variant={props.subTitleVariant} color="text-grayTertiary"
        customClass={`${props.isMobile ? 'mb-1' : ''}`}>
        {props.subTitle}
      </Typography>
    </div>
  );
};

SectionTitle.defaultProps = {
  titleVariant: 'h2',
  subTitleVariant: 'bodyXSmall',
};

export default SectionTitle;
