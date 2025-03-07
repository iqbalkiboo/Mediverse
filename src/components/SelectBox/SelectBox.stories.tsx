import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import SelectBox from './SelectBox';

export default {
  title: 'SelectBox',
  component: SelectBox,
} as ComponentMeta<typeof SelectBox>;

export const Single: ComponentStory<typeof SelectBox> = () =>
  <SelectBox />;

export const SingleClear: ComponentStory<typeof SelectBox> = () =>
  <SelectBox isClearable={true} />;

export const Multiple: ComponentStory<typeof SelectBox> = () =>
  <SelectBox isMulti={true} isClearable={true}/>;
