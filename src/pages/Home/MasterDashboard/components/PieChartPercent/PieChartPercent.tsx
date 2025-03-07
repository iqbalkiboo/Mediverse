import React from 'react';
import {VictoryLabel, VictoryPie} from 'victory';

interface Props {
  percent: number;
}

const PieChartPercent: React.FC<Props> = (props) => {
  const {percent} = props;
  return (
    <div>
      <svg viewBox="0 0 400 400" width="100%" height="100%">
        <VictoryPie
          standalone={false}
          width={450}
          height={450}
          data={[
            {x: 1, y: percent},
            {x: 2, y: 100 - percent},
          ]}
          innerRadius={120}
          cornerRadius={150}
          style={{
            data: {
              fill: ({datum}) => {
                const color = '#8E73F4';
                return datum.x === 1 ? color : '#F5F6FF';
              },
            },
          }}
        />
        <VictoryLabel
          textAnchor="middle"
          verticalAnchor="middle"
          x={230}
          y={230}
          text={`${percent.toFixed()}%`}
          style={{fontSize: 65, fontWeight: 700}}
        />
      </svg>
    </div>
  );
};

export default PieChartPercent;
