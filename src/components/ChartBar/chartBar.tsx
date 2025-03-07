import React, { useCallback, useState } from 'react';
import cx from 'classnames';
import { bool, number, string } from 'prop-types';
import { Typography } from '@/src/components';

import {
  VictoryArea,
  VictoryAxis,
  VictoryChart,
  VictoryGroup,
  VictoryLabel,
  VictoryLegend,
  VictoryPortal,
  VictoryScatter,
  VictoryTooltip,
  VictoryVoronoiContainer,
} from 'victory';
import { formatRupiah } from '@/src/utils/formatRupiah';
import { ArrowDownPercent, ArrowUpPercent } from '@/src/assets/images/svg';
import { formatDate } from '@/src/utils/formatDate';

const LoadingIndicator = () => {
  return (
    <VictoryPortal>
      <VictoryLabel
        x={700}
        y={200}
        text='Loading...'
        style={{
          fontSize: 16,
          fill: '#616161',
        }}
        backgroundStyle={[
          {
            fill: '#F5F5F5',
          },
        ]}
        backgroundPadding={{ bottom: 10, top: 10, left: 100, right: 100 }}
      />
    </VictoryPortal>
  );
};

const ChartBar = ({
  titleTooltip,
  isMultiple,
  data,
  height,
  width,
  isMobile,
  rupiah,
  tickValue,
  type,
  tickCount,
  leftLegend,
  bottomLegend,
  percentage,
  totalPercent,
  fixLabelOverlap,
  year,
  isLoading,
}) => {
  const [boundingRect, setBoundingRect] = useState({ width: 0, height: 0 });

  const graphRef = useCallback((node) => {
    if (node !== null) {
      setBoundingRect(node.getBoundingClientRect());
    }
  }, []);

  // to find the largest y-axis value
  const maxData = Math.max(...data?.map((axis) => axis.y));
  const maxMultiple =
    isMultiple?.length > 0 ? Math.max(...isMultiple?.map((axis) => axis.y)) : 0;

  const defaultDomainY = (maxData || maxMultiple) === 0;

  const maxDomain = () => {
    if (maxData > maxMultiple) {
      return maxData * 1.2;
    } else {
      return maxMultiple * 1.2;
    }
  };

  const formatValueTick = (t: number, n: number) => {
    if (Math.abs(t) > 999999) {
      return Math.sign(t) * Number((Math.abs(t) / 1000000).toFixed(1)) + ' jt';
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
    <div
      className={cx('flex xl:w-full xl:h-full overflow-auto')}
      ref={graphRef}
    >
      <VictoryChart
        domain={{ y: defaultDomainY ? [0, 10] : [0, maxDomain()] }}
        containerComponent={<VictoryVoronoiContainer responsive />}
        width={isMobile ? width : boundingRect.width}
        height={height}
        padding={{
          left: !leftLegend ? 100 : 140,
          bottom: bottomLegend ? 70 : 50,
          right: 50,
          top: 50,
        }}
      >
        {leftLegend && (
          <VictoryLegend
            x={10}
            y={200}
            title=''
            gutter={20}
            style={{
              title: {
                fontSize: 14,
                fontWeight: 600,
                fontStyle: 'italic',
              },
            }}
            data={[
              {
                name: `${
                  type === 'gross' ? 'Gross' : 'Net'
                } Transaction Value (Juta)`,
              },
            ]}
            colorScale={['white']}
            labelComponent={
              <VictoryLabel
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  fontStyle: 'italic',
                }}
                angle={-90}
                textAnchor='middle'
              />
            }
          />
        )}

        {bottomLegend && (
          <VictoryLegend
            x={740}
            y={480}
            title=''
            gutter={20}
            style={{
              title: {
                fontSize: 14,
                fontWeight: 600,
                fontStyle: 'italic',
              },
            }}
            data={[{ name: 'Order (Bulan)' }]}
            colorScale={['white']}
            labelComponent={
              <VictoryLabel
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  fontStyle: 'italic',
                }}
                textAnchor='middle'
              />
            }
          />
        )}
        <VictoryAxis
          tickCount={tickCount}
          style={{
            grid: { stroke: '#F2F2F2' },
            axis: { stroke: 'none' },
            tickLabels: { fontSize: 10, padding: 24, fill: '#616161' },
          }}
          fixLabelOverlap={fixLabelOverlap}
        />
        <VictoryAxis
          dependentAxis
          style={{
            axis: { stroke: 'none' },
            tickLabels: { fontSize: 10, padding: 21, fill: '#616161' },
          }}
          tickValues={tickValue ?? []}
          tickFormat={(t, n) => formatValueTick(t, n)}
        />
        {isMultiple && (
          <VictoryGroup
            labelComponent={<VictoryTooltip style={{ fontSize: 10 }} />}
            data={isMultiple}
          >
            <VictoryArea
              style={{
                data: {
                  fill: 'transparent',
                  stroke: '#FBBCFE',
                  strokeWidth: 3,
                },
              }}
              interpolation='linear'
            />
          </VictoryGroup>
        )}

        <VictoryGroup
          animate={{ duration: 1000 }}
          color='#c43a31'
          labels={({ datum }) => ''}
          data={data}
          labelComponent={
            !isMobile ? (
              <VictoryTooltip
                style={{ fontSize: 10 }}
                flyoutComponent={
                  <VictoryCustomTooltip
                    titleTooltip={titleTooltip}
                    rupiah={rupiah}
                    percentage={percentage}
                    totalPercent={totalPercent}
                    year={year}
                  />
                }
              />
            ) : (
              <div />
            )
          }
        >
          <VictoryArea
            interpolation='linear'
            style={{
              data: {
                fill: '#8156F830',
                stroke: '#8E73F4',
                strokeWidth: 2,
              },
            }}
          />
          <VictoryScatter
            size={({ active }) => (active ? 5 : 0)}
            style={{
              data: {
                fill: '#8E73F4',
                stroke: '#FFF',
                strokeWidth: 2,
                cursor: 'pointer',
              },
            }}
          />
        </VictoryGroup>
        {isLoading && <LoadingIndicator />}
      </VictoryChart>
    </div>
  );
};

interface IProps {
  datum?: any;
  x?: number;
  y?: number;
  center?: any;
  titleTooltip?: any;
  rupiah?: boolean;
  percentage?: boolean;
  totalPercent?: string;
  year: number;
}

export const VictoryCustomTooltip = (props: IProps) => {
  const { datum, x, y, titleTooltip, year, rupiah, percentage, totalPercent } =
    props;

  const formatTooltipDate = (date) => {
    const splitDate = date.split('/');
    const fulldate = `${year}/${splitDate[1]}/${splitDate[0]}`;
    return formatDate(fulldate, ' ', 'MMMM');
  };

  return (
    <g style={{ pointerEvents: 'none' }}>
      <foreignObject
        x={x ? x - 120 : x}
        y={y ? y - 90 : y}
        width='100%'
        height='300'
        style={{ overflow: 'visible' }}
      >
        <div
          className={cx(
            'graph-tooltip w-fit bg-white p-3 rounded-lg shadow-lg'
          )}
        >
          <div className={cx('w-full flex flex-col justify-center')}>
            <Typography
              variant='bodySmall'
              color='text-[#1D2433]'
              customClass={cx('mb-1')}
            >
              {titleTooltip
                ? `${titleTooltip} ${datum.x}`
                : formatTooltipDate(datum.x)}
            </Typography>
            <div className={cx('flex justify-between items-center')}>
              <Typography variant='h2' color='text-[#1D2433]'>
                {rupiah ? formatRupiah(datum.y) : datum.y}
              </Typography>
              {percentage && (
                <Typography
                  variant='smallMedium'
                  color={
                    totalPercent?.includes('-')
                      ? 'bg-[#FFE4E4] text-[#F32424]'
                      : 'bg-[#E8FFF3] text-[#26C536]'
                  }
                  customClass={cx(
                    'py-1 px-2 rounded-lg flex items-center gap-x-[2px]'
                  )}
                >
                  {`${totalPercent}%`}{' '}
                  {totalPercent?.includes('-') ? (
                    <ArrowDownPercent />
                  ) : (
                    <ArrowUpPercent />
                  )}
                </Typography>
              )}
            </div>
          </div>
        </div>
      </foreignObject>
    </g>
  );
};

ChartBar.propTypes = {
  isMultiple: [],
  data: [],
  titleTooltip: string,
  height: number,
  width: number,
  rupiah: bool,
  isMobile: bool,
  tickValue: [],
  type: string,
  leftLegend: bool,
  bottomLegend: bool,
  title: string,
  percentage: bool,
  totalPercent: string,
  fixLabelOverlap: bool,
  tickCount: number,
  year: number,
  isLoading: bool,
};

ChartBar.defaultProps = {
  isMultiple: [],
  data: [],
  leftLegend: false,
  bottomLegend: false,
  type: 'gross',
  fixLabelOverlap: false,
  tickCount: 0,
  year: new Date().getFullYear(),
};

export default ChartBar;
