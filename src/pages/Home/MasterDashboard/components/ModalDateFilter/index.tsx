import React from 'react';
import DateFilter from '@/src/pages/Home/MasterDashboard/components/DateFilter';
import {Modal} from '@/src/components';


type Props = {
  isOpen: boolean,
  title: string;
  month: number;
  year: number;
  onSetMonth: (month: number) => void;
  onSetYear: (year: number) => void;
  onClose: (value: boolean) => void;
}

const ModalDateFilter = (props: Props) => {
  return (
    <Modal
      style='p-0 bg-transparent shadow-none'
      open={props.isOpen}
      onClose={() => {}}
      header={<></>}
    >
      <DateFilter
        month={props.month}
        year={props.year}
        onSetMonth={props.onSetMonth}
        onSetYear={props.onSetYear}
        onClose={props.onClose}
        title=''
        isPopup={false}
      />
    </Modal>
  );
};

export default ModalDateFilter;
