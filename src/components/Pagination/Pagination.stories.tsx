import React from 'react';

import {ComponentMeta, ComponentStory} from '@storybook/react';

import Pagination from './Pagination';
import cx from 'classnames';

export default {
  /* 👇 The title prop is optional.
  * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
  * to learn how to generate automatic titles
  */
  title: 'Pagination',
  component: Pagination,
} as ComponentMeta<typeof Pagination>;

export const Default: ComponentStory<typeof Pagination> = () => <Pagination />;

export const CutomizeCountPages: ComponentStory<typeof Pagination> = () => {
  return (
    <Pagination countPages={100} />
  );
};

export const CutomizeActivePage: ComponentStory<typeof Pagination> = () => {
  return (
    <Pagination activePage={1} />
  );
};

export const CutomizeActivePageAndCountPages:
ComponentStory<typeof Pagination> = () => {
  return (
    <Pagination activePage={1} countPages={100} />
  );
};

export const CutomizeItemStyle: ComponentStory<typeof Pagination> = () => {
  return (
    <Pagination itemStyle={cx('flex', 'items-center', 'px-3', 'py-2.5',
        'text-xs', 'rounded', 'border bg-white', 'text-sky-500',
        'border-sky-500', 'hover:bg-green-500', 'hover:border-green-500',
        'hover:text-white', 'hover:border-green-500')} />
  );
};

export const CutomizeItemStyleAndActiveItem:
ComponentStory<typeof Pagination> = () => {
  return (
    <Pagination itemStyle={cx('flex', 'items-center', 'px-3', 'py-2.5',
        'text-xs', 'rounded', 'border', 'bg-white', 'text-sky-500',
        'border-sky-500', 'hover:bg-green-500', 'hover:border-green-500',
        'hover:text-white', 'hover:border-green-500')}
    itemActive={cx('border', 'border-green-500', 'text-green-500')} />
  );
};

export const CutomizeNavStyle: ComponentStory<typeof Pagination> = () => {
  return (
    <Pagination navStyle={cx('flex', 'items-center', 'px-3', 'border',
        'py-2.5', 'text-sky-500', 'bg-white', 'rounded', 'border-sky-500',
        'hover:bg-green-500', 'hover:border-green-500')} />
  );
};
