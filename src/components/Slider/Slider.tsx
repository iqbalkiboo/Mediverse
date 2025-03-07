import React, {useState} from 'react';
import './Slide.css';
import NotFound from './NotFound';
import Dot from './Dot';

interface Props {
  slides: Array<any>,
}

const Slider: React.FC<Props> = (props) => {
  const [slideActive, setSlideActive] = useState(0);

  return (
    <div className='slider__container'>
      {props.slides[slideActive] ?
        <img
          className='h-full w-full'
          src={props.slides[slideActive]}/> : <NotFound/>}
      <div className='dot__container'>
        {props.slides?.map((e, index) => {
          if (slideActive == index) {
            return <Dot
              onClick={() => {}}
              id={index} key={index}
              active='dot__active'/>;
          } else {
            return <Dot
              id={index}
              onClick={(value: number) => setSlideActive(value)}
              key={index}
            />;
          }
        })}
      </div>
    </div>
  );
};

export default Slider;
