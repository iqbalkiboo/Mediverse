import React from 'react';
import {TagsInput} from 'react-tag-input-component';
import './TagInput.css';

interface Props {
    onChange?: (val) => void,
    placeHolder?: string,
    name?: string,
    id: string
}

export const TagInput: React.FC<Props> = (props) => {
  // const [selected, setSelected] = useState([]);

  return (
    <React.Fragment>
      <TagsInput
        onChange={props.onChange}
        name={props.name}
        placeHolder={props.placeHolder}
      />
      <small className='text-gray-400 text-sm'>
        Pisahkan dengan koma atau tekan tombol Enter
      </small>
    </React.Fragment>
  );
};

TagInput.defaultProps = {
  placeHolder: '',
};

export default TagInput;
