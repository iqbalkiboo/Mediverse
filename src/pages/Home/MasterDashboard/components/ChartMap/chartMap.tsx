import React, {useCallback, useState} from 'react';
import cx from 'classnames';

import Highcharts, {MapChart as HighchartsChart} from 'highcharts';
import mapInit from 'highcharts/modules/map';
import mapIDLocation from './mapIDLocation';
import HighchartsReact from 'highcharts-react-official';
import {IProps} from '@/src/pages/Home/MasterDashboard/ProductSales/types';
import {Tooltip} from './Tooltip';
import {
  capitalizeFirstLetter,
} from '@/utils/formatText';

import './chartmap.css';

mapInit(Highcharts);

const valueProducts = ['medevo', 'medpoint', 'medpharm'];
const outletMapping = {
  'doctor': 'dokter',
  'drug': 'SKU',
  'clinic': 'klinik',
  'hospital': 'rumah sakit',
  'lab': 'lab',
};

const data = [
  ['id-3700', 10],
  ['id-ac', 11],
  ['id-jt', 12],
  ['id-be', 13],
  ['id-bt', 14],
  ['id-kb', 15],
  ['id-bb', 16],
  ['id-ba', 17],
  ['id-ji', 18],
  ['id-ks', 19],
  ['id-nt', 20],
  ['id-se', 21],
  ['id-kr', 22],
  ['id-ib', 23],
  ['id-su', 24],
  ['id-ri', 25],
  ['id-sw', 26],
  ['id-ku', 27],
  ['id-la', 28],
  ['id-sb', 29],
  ['id-ma', 30],
  ['id-nb', 31],
  ['id-sg', 32],
  ['id-st', 33],
  ['id-pa', 34],
  ['id-jr', 35],
  ['id-ki', 36],
  ['id-1024', 37],
  ['id-jk', 38],
  ['id-go', 39],
  ['id-yo', 40],
  ['id-sl', 41],
  ['id-sr', 42],
  ['id-ja', 43],
  ['id-kt', 44],
];

const ChartMap = (_props: IProps) => {
  const [chart, setChart] = useState<HighchartsChart | null>(null);
  const callback = useCallback((chart: HighchartsChart) => {
    setChart(chart);
  }, []);

  const [options] = useState({
    title: {
      text: '',
    },
    series: [
      {
        mapData: mapIDLocation,
        data: data,
        states: {
          hover: {
            color: '#8E73F4',
          },
        },
        nullColor: '#E0E0E0',
      },
    ],
    tooltip: {
      useHTML: true,
      backgroundColor: null,
      borderWidth: 0,
    },
    plotOptions: {
      series: {
        color: '#C6C9FF',
        borderWidth: 1,
        borderColor: '#FFF',
      },
    },
    legend: {
      enabled: false,
    },
    credits: {
      enabled: false,
    },
    accessibility: {
      enabled: false,
    },
  });

  return (
    <div className='w-full h-[600px] px-10'>
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
        constructorType={'mapChart'}
        callback={callback}
        containerProps={{
          style: {
            height: '100%', width: '100%',
          },
        }}
      />

      <Tooltip chart={chart}>
        {(formatterContext, products, isLoading) => {
          return (
            <>
              <div className={cx('wrapper-tooltip')}>
                <div className={cx('title-tooltip')}>
                  <div className={cx('name-province')}>{formatterContext.point.name}</div>
                </div>
                <div className={cx('children-tooltip')}>
                  {isLoading && <div className={cx('product')}>Loading...</div>}
                  {!isLoading && valueProducts.map((item, index) => {
                    return (
                      <div className={cx('wrapper-product')} key={index}>
                        <div className={cx('product')}>{capitalizeFirstLetter(item)}</div>
                        <ul className={cx('value-product')}>
                          {
                            Object.keys(products[item]).map((_key, idx) => {
                              return (
                                <li className='detail-product' key={idx}>
                                  <div className='icon'></div>
                                  {`${products[item][_key]} ${outletMapping[_key]}`}
                                </li>
                              );
                            })

                          }
                        </ul>
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          );
        }}
      </Tooltip>
    </div>
  );
};

export default React.memo(ChartMap);
