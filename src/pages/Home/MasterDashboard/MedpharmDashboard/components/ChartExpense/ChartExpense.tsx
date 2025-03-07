import React, {useCallback, useState} from 'react';
import cx from 'classnames';

import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryGroup,
  VictoryTooltip,
} from 'victory';

import {formatRupiah} from '@/src/utils/formatRupiah';
import {capitalizeFirstLetter} from '@/src/utils/formatText';
import {Typography} from '@/src/components';

interface Props{
  spending?: any,
  spendingEstimation?: any,
  type?: string
}

const ChartExpense = (props : Props) => {
  const {spending, spendingEstimation, type} = props;

  const [boundingRect, setBoundingRect] = useState({width: 0, height: 0});

  const graphRef = useCallback((node) => {
    if (node !== null) {
      setBoundingRect(node.getBoundingClientRect());
    }
  }, []);

  const formatValueTick = (t: number, n: number) => {
    if (Math.abs(t) > 999999) {
      return Math.sign(t) * Number((Math.abs(t) / 1000000).toFixed(1)) + ' juta';
    }

    if (Math.abs(t) > 999) {
      return Math.sign(t) * Number((Math.abs(t) / 1000).toFixed(1)) + ' rb';
    }

    if (Math.abs(t) > 1) {
      return t;
    }

    return (n + 1) * 100 + ' rb';
  };


  return (
    <div className={cx('flex w-full')} ref={graphRef}>
      <VictoryChart
        width={boundingRect.width}
        height={350}
        padding={{left: 65, bottom: 30}}
        domainPadding={100}
        domain={type === 'medpoint' ? {x: [0, 4]} : {x: [0, 6.5]}}
      >
        <VictoryAxis
          tickValues={(spending || []).map((item: any) => item.x)}
          style={{
            axis: {stroke: '#F2F2F2'},
            tickLabels: {
              fontSize: 10,
              fontFamily: 'jakarta-medium',
              padding: 16,
              fontWeight: 500,
              fill: '#616161',
            },
          }}
        />
        <VictoryAxis
          dependentAxis
          style={{
            axis: {stroke: 'none'},
            axisLabel: {fontSize: 20, padding: 10},
            grid: {stroke: '#F2F2F2'},
            tickLabels: {
              fontSize: 10,
              fontFamily: 'jakarta-medium',
              padding: 10,
              fontWeight: 500,
              fill: '#616161',
            },
          }}
          tickFormat={(t, n) => formatValueTick(t, n)}
        />
        <VictoryGroup offset={68}>
          <VictoryBar
            data={spendingEstimation}
            barWidth={60}
            style={{
              data: {fill: '#C6C9FF'},
            }}
            cornerRadius={{top: 6}}
            labels={({datum}) => ''}
            labelComponent={
              <VictoryTooltip
                flyoutComponent={
                  <VictoryCustomTooltip titleTooltip="estimasi" />
                }
              />
            }
          />
          <VictoryBar
            data={spending}
            barWidth={60}
            style={{data: {fill: '#8E73F4'}}}
            cornerRadius={{top: 6}}
            labels={({datum}) => ''}
            labelComponent={
              <VictoryTooltip
                flyoutComponent={
                  <VictoryCustomTooltip titleTooltip="pengeluaran" />
                }
              />
            }
          />
        </VictoryGroup>
      </VictoryChart>
    </div>
  );
};

export const VictoryCustomTooltip = (props: IProps) => {
  const {datum, x, y, titleTooltip} = props;

  return (
    <g style={{pointerEvents: 'none'}}>
      <foreignObject
        x={x ? x - 55 : x}
        y={y ? y - 70 : y}
        width="100%"
        height="300"
        style={{overflow: 'visible'}}
      >
        <div
          className={cx(
              'graph-tooltip w-fit bg-white p-3 rounded-lg shadow-lg relative',
          )}
        >
          <div className={cx('w-full flex flex-col justify-center')}>
            <div className={cx('text-[10px] font-medium mb-1')}>
              {capitalizeFirstLetter(titleTooltip)}
            </div>
            <Typography variant="h5" color="">
              {formatRupiah(datum.y)}
            </Typography>
          </div>
        </div>
        <div
          className={cx(
              'w-4 h-4 bg-white absolute left-12 top-12 rotate-45 shadow-lg',
          )}
        ></div>
      </foreignObject>
    </g>
  );
};

interface IProps {
  datum?: any;
  x?: number;
  y?: number;
  titleTooltip?: any;
}

export default ChartExpense;
