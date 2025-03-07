import React, {useCallback, useState} from 'react';
import cx from 'classnames';
import {VictoryPie} from 'victory';
import Typography from '@/src/components/Typography';

interface Props {
  data: any;
}

const GenderPieChart: React.FC<Props> = (props) => {
  const {data} = props;
  const pieData = [
    {
      x: `${data.percentage_female % 1 === 0 ? data.percentage_female : data.percentage_female.toFixed(2)}%`,
      y: data.female,
      gender: 'female',
      percentage: data.percentage_female,
    },
    {
      x: `${data.percentage_male % 1 === 0 ? data.percentage_male : data.percentage_male.toFixed(2)}%`,
      y: data.male,
      gender: 'male',
      percentage: data.percentage_male,
    },
  ];

  const defaultPieData = [
    {
      x: 1,
      y: 100,
    },
  ];


  const categoryTransactions = [
    {
      id: 1,
      bgColor: '#745EC8',
      informationTransaction: 'Laki-laki',
    },
    {
      id: 2,
      bgColor: '#C6C9FF',
      informationTransaction: 'Perempuan',
    },
  ];

  const [boundingRect, setBoundingRect] = useState({width: 0, height: 0});

  const graphRef = useCallback((node) => {
    if (node !== null) {
      setBoundingRect(node.getBoundingClientRect());
    }
  }, []);

  return (
    <div className={cx('container')} ref={graphRef}>
      <div className={cx('flex justify-start h-auto items-start gap-x-4  max-w-auto')}>
        <VictoryPie
          labelRadius={40}
          width={boundingRect.width}
          height={335}
          style={{
            labels: {
              fontSize: 14,
              fontWeight: 700,
              fontFamily: '[\'jakarta-bold\']',
              fill: ({datum}) => datum.gender === 'male' ? '#FFFFFF' : '#FFFFFF',
            }}}
          radius={({datum}) => datum.percentage >= 80 ? 120 : datum.percentage + 80}
          colorScale={data.grand_total ? ['#C6C9FF', '#745EC8'] : ['#A9A9A9']}
          data={data.grand_total ? pieData : defaultPieData}
        />
        <div className={cx('relative')}>
          <div className={cx('absolute right-0')} style={{top: '120px'}} >
            {categoryTransactions.map((item) => (
              <div className={cx('mb-5')} key={item.id}>
                <div className={cx('flex justify-start items-start gap-x-2 mb-3')}>
                  <div
                    className={cx('w-[13px] rounded h-[13px]')}
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
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenderPieChart;
