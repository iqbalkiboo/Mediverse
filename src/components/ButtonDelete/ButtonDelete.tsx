import { DeleteIcon } from '@/src/assets/images/svg';
import Tooltip from '@/src/components/Tooltip';

import { func, number } from 'prop-types';

const ButtonDelete = (props) => {
  return (
    <Tooltip message='Hapus' marginTop={props.marginTop}>
      <button
        onClick={props.onClick}
        className='w-9 h-9 p-2 rounded-lg bg-[#FFE2E5] flex justify-center items-center'
      >
        <DeleteIcon />
      </button>
    </Tooltip>
  );
};

ButtonDelete.propTypes = {
  marginTop: number,
  onClick: func,
};

export default ButtonDelete;
