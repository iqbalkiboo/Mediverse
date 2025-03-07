import React from 'react';

interface Props{
  active?: string,
  id: any,
  onClick: (value: any) => any
}

const Dot: React.FC<Props> = (props) => {
  const clickHandler = () => {
    props.onClick(props.id);
  };

  return (
    <button onClick={clickHandler} className={props.active}>
      <span className='dot'></span>
    </button>
  );
};

export default Dot;
