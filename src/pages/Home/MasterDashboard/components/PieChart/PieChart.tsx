import React from 'react';
import cx from 'classnames';
import {VictoryPie} from 'victory';
import Typography from '@/src/components/Typography';
import {TransactionType} from '@/src/types/home';

interface Props {
  padAngle?: any,
  innerRadius?: number,
  width?: number,
  height?: number,
  data: TransactionType;
}

const PieChart: React.FC<Props> = (props) => {
  const {data} = props;
  const pieData = [
    {
      quarter: 1,
      earning: data.medevo,
    },
    {
      quarter: 2,
      earning: data.medpharm,
    },
    {
      quarter: 3,
      earning: data.medpoint,
    },
  ];

  const defaultPieData = [
    {
      quarter: 1,
      earning: 100,
    },
  ];

  const categoryTransactions = [
    {
      id: 1,
      bgColor: '#745EC8',
      informationTransaction: 'Medpharm',
      total: `${data.percentage_medpharm}%`,
    },
    {
      id: 2,
      bgColor: '#907ED3',
      informationTransaction: 'Medevo',
      total: `${data.percentage_medevo}%`,
    },
    {
      id: 3,
      bgColor: '#BBABF8',
      informationTransaction: 'Medpoint',
      total: `${data.percentage_medpoint}%`,
    },
  ];
  return (
    <div className={cx('container')}>
      <div className={cx('flex justify-start items-start gap-x-4 max-w-auto')}>
        <div className={cx('victory-pie-chart')}>
          <VictoryPie
            animate={{duration: 1000}}
            style={{
              labels: {
                fill: 'none',
              },
            }}
            padAngle={props.padAngle}
            innerRadius={props.innerRadius}
            width={props.width}
            height={props.height}
            colorScale={data.grand_total ? ['#907ED3', '#745EC8', '#BBABF8'] : ['#A9A9A9']}
            data={data.grand_total ? pieData : defaultPieData}
            x='quarter'
            y='earning'
          />
        </div>
        <div className={cx('pt-4')}>
          {categoryTransactions.map((item) => (
            <div className={cx('mb-5')} key={item.id}>
              <div className={cx('flex justify-start items-start gap-x-2 mb-3')}>
                <div
                  className={cx('w-[13px] h-[13px]')}
                  style={{
                    backgroundColor: `${item.bgColor}`,
                  }}></div>
                <Typography
                  className={cx('font-medium text-xs')}
                  variant={'h3'}
                  color={'#616161'}>
                  {item.informationTransaction}
                </Typography>
              </div>
              <Typography
                className={cx('font-bold text-center text-xs')}
                variant={'h3'}
                color={'#1D2433'}>
                {item.total}
              </Typography>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

PieChart.defaultProps = {
  padAngle: 1.5,
  innerRadius: 85,
  width: 200,
  height: 200,
};

export default PieChart;
