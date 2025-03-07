/* eslint-disable max-len */
import cx from 'classnames';
import Tippy from '@tippyjs/react';

import { any, number, string } from 'prop-types';

import 'tippy.js/dist/tippy.css';

const Tooltip = ({ children, message, ...props }) => {
  return (
    <Tippy
      content={message}
      interactive={true}
      interactiveBorder={20}
      delay={100}
      placement={props.placement}
      className={cx(props.customClassName)}
    >
      {children}
    </Tippy>
  );
};

Tooltip.propTypes = {
  children: any,
  message: any,
  placement: string,
  marginTop: number,
  customClassName: string,
};

export default Tooltip;
