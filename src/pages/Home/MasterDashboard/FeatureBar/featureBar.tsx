import React, {lazy, useCallback, useState} from 'react';
import cx from 'classnames';

import {
  SelectBox,
} from '@/src/components';

import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
} from 'victory';
import {isEmpty} from 'lodash';

const SectionTitle = lazy(() => import('@/src/pages/Home/MasterDashboard/components/SectionTitle'));
const SectionCard = lazy(() => import('@/src/pages/Home/MasterDashboard/components/SectionCard'));

type IFeatureBarProps = {
  title: string,
  description: string,
  valueMonth: any,
  optionMonth: {label: string, value: string | number}[],
  tickValues: string[] | number[],
  data: {x: string | number, y: string | number}[],
  onHandleSelectMonth: (item) => void,
}

const FeatureBar = ({
  title, description, tickValues, data, valueMonth, optionMonth, onHandleSelectMonth,
}: IFeatureBarProps) => {
  const [boundingRect, setBoundingRect] = useState({width: 0, height: 0});

  const graphRef = useCallback((node) => {
    if (node !== null) {
      setBoundingRect(node.getBoundingClientRect());
    }
  }, []);

  const newTickValue = isEmpty(data) ? data.map((item) => item.y) : tickValues;

  return (
    <div className={cx('mt-6')}>
      {/* Title */}
      <div className={cx('flex items-center justify-between')}>
        <SectionTitle
          title={title}
          subTitle={description}
        />

        <SelectBox
          placeholder='Bulan'
          name='month'
          isSearchable={true}
          value={valueMonth}
          options={optionMonth}
          onChange={(item) => onHandleSelectMonth(item)}
          className={cx('w-36')}
        />
      </div>

      {/* Content */}
      <SectionCard>
        <div ref={graphRef}>
          <VictoryChart
            horizontal
            height={260}
            width={boundingRect.width}
            domainPadding={{x: 14}}
            padding={{left: 100, bottom: 24, right: 50}}
          >
            {/* Vertical axis */}
            <VictoryAxis
              style={{
                axis: {stroke: '#FFFFFF'},
                tickLabels: {
                  fontSize: 14,
                  fill: '#616161',
                  fontFamily: 'jakarta-medium',
                },
              }}
            />

            {/* Horizontal axis */}
            <VictoryAxis
              dependentAxis
              tickValues={newTickValue}
              style={{
                axis: {stroke: '#FFFFFF'},
                tickLabels: {
                  fontSize: 14,
                  fill: '#9E9E9E',
                  fontFamily: 'jakarta-medium',
                },
              }}
            />

            {/* Chart bar */}
            <VictoryBar
              barWidth={24}
              alignment='middle'
              labels={({datum}) => datum.y}
              data={data}
              style={{
                data: {fill: '#C6C9FF'},
                labels: {
                  fontSize: 14,
                  fontFamily: 'jakarta-medium',
                  fill: '#7859EE',
                },
              }}
            />
          </VictoryChart>
        </div>
      </SectionCard>
    </div>
  );
};

FeatureBar.defaultProps = {
  title: 'Most Visited Feature',
  description: 'Informasi fitur yang sering dikunjungi oleh user',
  tickValues: [0, 25, 50, 75, 100],
  data: [
    {x: 'Setting', y: 0},
    {x: 'Medwell', y: 0},
    {x: 'Medpoint', y: 0},
    {x: 'Medevo', y: 0},
    {x: 'Medpharm', y: 0},
    {x: 'Mednews', y: 0},
  ],
  onHandleSelectMonth: () => {},
};

export default FeatureBar;
