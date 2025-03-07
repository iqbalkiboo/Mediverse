// Button.stories.ts|tsx

import React from 'react';

import {ComponentMeta, ComponentStory} from '@storybook/react';

import Button from './Button';

export default {
  /* 👇 The title prop is optional.
  * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
  * to learn how to generate automatic titles
  */
  title: 'Button',
  component: Button,
} as ComponentMeta<typeof Button>;

// eslint-disable-next-line max-len
export const Default: ComponentStory<typeof Button> = () => <Button onClick={() => console.log('Here')}/>;

// eslint-disable-next-line max-len
export const Disabled: ComponentStory<typeof Button> = () => <Button disabled={true} onClick={() => console.log('Here')}/>;

// eslint-disable-next-line max-len
export const Spinner: ComponentStory<typeof Button> = () => <Button loading={true} onClick={() => console.log('Here')}/>;

export const Cutomize: ComponentStory<typeof Button> = () => {
  return (
    <Button onClick={() => console.log('Here')}>
      <p>Sign In</p>
    </Button>
  );
};
