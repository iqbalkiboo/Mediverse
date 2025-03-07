import React from 'react';
import cx from 'classnames';
import {Typography} from '@/src/components';
import {CloseIcon} from '@/src/assets/images/svg';

type TagRelatedProps = {
  name: string,
  isLocal: boolean,
  showDeleteButton?: boolean,
  onDeleteAction?: () => void,
};


const TagRelated = ({name, showDeleteButton, isLocal, onDeleteAction}: TagRelatedProps) => {
  return (
    <div className={cx(`px-4 py-1 border-1 rounded-md ${isLocal?'border-secondary':'border-primary'}`)}>
      <div className={cx('flex justify-between items-center gap-2')}>
        <Typography variant="bodyXSmall" color="text-primary">
          {name}
        </Typography>
        {showDeleteButton && (
          <div
            onClick={onDeleteAction}
            className={cx('cursor-pointer hover:rounded-full hover:bg-primary/60 p-[2px]')}
          >
            <CloseIcon width="14" height="14" />
          </div>
        )}
      </div>
    </div>
  );
};
TagRelated.defaultProps ={
  isLocal: false,
};

export default TagRelated;
