// Modal.stories.ts|tsx

import React from 'react';

import {ComponentMeta, ComponentStory} from '@storybook/react';

import Modal from './Modal';

export default {
  /* 👇 The title prop is optional.
  * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
  * to learn how to generate automatic titles
  */
  title: 'Modal',
  component: Modal,
} as ComponentMeta<typeof Modal>;

const Footer = () => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
    }}>
      <button className='button__modal'>Yes</button>
      <button className='button__modal'>No</button>
    </div>
  );
};

// eslint-disable-next-line max-len
export const Default: ComponentStory<typeof Modal> = () => <Modal onClose={() => {}} open={true} title='Alert'/>;

// eslint-disable-next-line max-len
export const Cutomize: ComponentStory<typeof Modal> = () => {
  return (
    <Modal
      onClose={() => {}}
      open={true}
      title='Alert'
      footer={<Footer/>}>
      <p>Hello World</p>
    </Modal>
  );
};
