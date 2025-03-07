import React from 'react';
import cx from 'classnames';

interface Props {
  text: string | number;
  width?: string;
}

const DetailText: React.FC<Props> = (props) => {
  return (
    <div className={cx('w-full')}>
      <div className={cx('bg-white px-3 py-4',
          'rounded-md border-[1px] font-normal', `${props.width}`)}>
        {props.text}
        <img src=''/>
      </div>
    </div>
  );
};

DetailText.defaultProps = {
  width: 'w-full',
};

export default DetailText;
