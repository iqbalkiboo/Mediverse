import React, {useState} from 'react';
import {Button} from '@/src/components/';
import ModalFilter from './ModalFilter';
import cx from 'classnames';

interface Props {
  filters: Array<{label: string, items: any}>,
  isOpen: boolean,
  onClick: () => void,
  filterDate: boolean,
  dateLabel?: string,
}

const Filter: React.FC<Props> = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <React.Fragment>
      <Button
        onClick={() => setIsOpen(true)}
        text='Filter'
        class='secondary'
        size='2xl'
        customClassName={cx('ml-2')}
      />
      <ModalFilter
        dateLabel={props.dateLabel}
        onClose={() => setIsOpen(false)}
        filterDate={props.filterDate}
        filters={props.filters}
        open={isOpen}/>
    </React.Fragment>
  );
};

Filter.defaultProps = {
  dateLabel: 'Date',
};

export default Filter;
