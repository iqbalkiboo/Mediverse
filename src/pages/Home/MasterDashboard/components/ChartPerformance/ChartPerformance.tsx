import React, {useCallback, useState} from 'react';
import cx from 'classnames';

import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryGroup,
  VictoryLabel,
  VictoryLine,
  VictoryPortal,
} from 'victory';

interface Props{
  data?: any,
  dataLine?: any,
  isLoading?: boolean
}

const LoadingIndicator = () => {
  return (
    <VictoryPortal>
      <VictoryLabel
        x={700}
        y={150}
        text='Loading...'
        style={{
          fontSize: 16,
          fill: '#616161',
        }}
        backgroundStyle={[{
          fill: '#F5F5F5',
        }]}
        backgroundPadding={{bottom: 10, top: 10, left: 100, right: 100}}
      />
    </VictoryPortal>
  );
};

const ChartPerformance = (props : Props) => {
  const {data, dataLine, isLoading} = props;

  const [boundingRect, setBoundingRect] = useState({width: 0, height: 0});

  const graphRef = useCallback((node) => {
    if (node !== null) {
      setBoundingRect(node.getBoundingClientRect());
    }
  }, []);

  const formatValueTick = (t: number, n: number) => {
    if (Math.abs(t) > 999999) {
      return Math.sign(t) * Number((Math.abs(t) / 1000000).toFixed(1)) + ' jt';
    }
    return t;
  };

  return (
    <div className={cx('flex w-full')} ref={graphRef}>
      <VictoryChart
        width={boundingRect.width}
        height={350}
        padding={{left: 65, bottom: 30}}
        domainPadding={100}
        domain={{x: [0, 12]}}
      >
        <VictoryAxis
          tickValues={(data || []).map((item: any) => item.x)}
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
          tickFormat={(t, n) => formatValueTick(t, n)}
        />
        <VictoryLine
          data={dataLine}
          style={{
            data: {stroke: '#8E73F4', strokeWidth: 3},
          }}
          interpolation="linear"
        />
        <VictoryGroup offset={68} >
          <VictoryBar
            data={data}
            barWidth={60}
            style={{data: {fill: '#C6C9FF'}}}
            cornerRadius={{top: 6}}
            labels={({datum}) => ''}
          />
        </VictoryGroup>
        {isLoading && <LoadingIndicator />}
      </VictoryChart>
    </div>
  );
};

export default ChartPerformance;
