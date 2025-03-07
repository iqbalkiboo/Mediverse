import React from 'react';
import cx from 'classnames';

type Props = {
  children: any
  className?: any
}

const SectionCard: React.FC<Props> = (props) => {
  return (
    <div className={cx(props.className)}>
      {props.children}
    </div>
  );
};

SectionCard.defaultProps = {
  className: 'bg-white rounded-xl p-6 my-1',
};

export default SectionCard;
