import cx from 'classnames';

import Constant from '@/src/constants';

import { bool } from 'prop-types';

import '../index.css';

const ColumnState = ({ status, ehr = false, isPublished = false }) => {
  switch (status) {
    case Constant.STATUS.INACTIVE:
      return (
        <div className={cx('column__state status__0')}>
          <div className='w-3 h-3 bg-danger rounded-full mr-3'></div>
          <span>
            {ehr && 'EHR '}
            {isPublished ? 'Non Published' : 'Non Aktif'}
          </span>
        </div>
      );
    case Constant.STATUS.ACTIVE:
      return (
        <div className={cx('column__state status__1')}>
          <div className='w-3 h-3 bg-greenPrimary rounded-full mr-3'></div>
          <span>
            {ehr && 'EHR '}
            {isPublished ? 'Published' : 'Aktif'}
          </span>
        </div>
      );
    default:
      return <></>;
  }
};

ColumnState.propTypes = {
  ehr: bool,
  status: bool,
  isPublished: bool,
};

export default ColumnState;
