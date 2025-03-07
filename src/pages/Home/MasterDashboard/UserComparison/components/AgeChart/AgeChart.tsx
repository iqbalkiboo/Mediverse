import React, {useCallback, useState} from 'react';
import cx from 'classnames';

import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryGroup,
  VictoryLabel,
  VictoryLegend,
  VictoryTooltip,
} from 'victory';

import {capitalizeFirstLetter} from '@/src/utils/formatText';
import {Typography} from '@/src/components';

interface Props{
  dataAge?: any,
}

const AgeChart = (props : Props) => {
  const {dataAge} = props;

  const [boundingRect, setBoundingRect] = useState({width: 0, height: 0});

  const graphRef = useCallback((node) => {
    if (node !== null) {
      setBoundingRect(node.getBoundingClientRect());
    }
  }, []);

  return (
    <div className={cx('flex w-full')} ref={graphRef}>
      <VictoryChart
        width={boundingRect.width}
        height={325}
        padding={{left: 65, bottom: 60}}
        domainPadding={100}
        domain={{x: [0, 6]}}
      >
        <VictoryLegend x={270} y={300}
          title=""
          gutter={20}
          style={{title: {
            fontSize: 14,
            fontWeight: 600,
            fontStyle: 'italic',
          }}}
          data={[{name: 'Rentang Usia'}]}
          colorScale={['white']}
          labelComponent={<VictoryLabel style={{
            fontSize: 10,
            fontWeight: 600,
            fontStyle: 'italic',
          }} textAnchor="middle"/>}
        />
        <VictoryAxis
          tickValues={(dataAge || []).map((item: any) => item.x)}
          style={{
            axis: {stroke: '#F2F2F2'},
            grid: {stroke: '#F2F2F2'},
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
            tickLabels: {
              fontSize: 10,
              fontFamily: 'jakarta-medium',
              padding: 10,
              fontWeight: 500,
              fill: '#616161',
            },
          }}
        />
        <VictoryGroup offset={68}>
          <VictoryBar
            animate={{duration: 1000}}
            name='bar'
            data={dataAge}
            barWidth={50}
            style={{data: {fill: '#C6C9FF'}}}
            cornerRadius={{top: 6}}
            labels={({datum}) => ''}
            labelComponent={
              <VictoryTooltip
                flyoutComponent={
                  <VictoryCustomTooltip titleTooltip="Jumlah User" />
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
              {datum.y}
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

export default AgeChart;
