import React, {useCallback, useState} from 'react';
import cx from 'classnames';

import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryGroup,
  VictoryTooltip,
} from 'victory';

import {formatRupiah} from '@/src/utils/fromatCurrency';

const Chart = () => {
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
        height={300}
        padding={{left: 80, bottom: 50}}
        domainPadding={100}
        domain={{x: [0, 4]}}
      >
        <VictoryAxis
          tickValues={[
            'Promo Paket Diskon',
            'Promo Paket Bundling',
            'Voucher Cashback',
          ]}
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
            axisLabel: {fontSize: 20, padding: 30},
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
        <VictoryGroup offset={68}>
          <VictoryBar
            data={[
              {x: 'Promo Paket Diskon', y: 2000000},
              {x: 'Promo Paket Bundling', y: 3000000},
              {x: 'Voucher Cashback', y: 7070000},
            ]}
            barWidth={65}
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
            data={[
              {x: 'Promo Paket Diskon', y: 3000000},
              {x: 'Promo Paket Bundling', y: 4000000},
              {x: 'Voucher Cashback', y: 5000000},
            ]}
            barWidth={65}
            style={{data: {fill: '#745EC8'}}}
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
              {titleTooltip}
            </div>
            <div className={cx('text-xs font-bold')}>
              {formatRupiah(datum.y)}
            </div>
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

export default Chart;
