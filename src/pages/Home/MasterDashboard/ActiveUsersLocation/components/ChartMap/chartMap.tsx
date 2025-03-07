import React, {useCallback, useEffect, useState} from 'react';

import Highcharts, {MapChart} from 'highcharts';
import mapInit from 'highcharts/modules/map';
import mapIDLocation from './mapIDLocation';
import HighchartsReact from 'highcharts-react-official';
import {getActiveUserLocation} from '@/client/dashboard';

mapInit(Highcharts);

interface Props {
  userActiveLocation: any
  handleSetDataUserLocation: (name, value) => void
}

const ChartMap = ({userActiveLocation, handleSetDataUserLocation}: Props) => {
  const [chart, setChart] = useState<MapChart | null>(null);
  const callback = useCallback((chart: MapChart) => {
    setChart(chart);
  }, [chart]);
  const mapData = chart?.series[0]?.mapData;

  const riau = mapData?.find((item) => item.name === 'Riau');
  const aceh = mapData?.find((item) => item.name === 'Aceh');
  const bali = mapData?.find((item) => item.name === 'Bali');
  const papua = mapData?.find((item) => item.name === 'Papua');
  const jambi = mapData?.find((item) => item.name === 'Jambi');
  const banten = mapData?.find((item) => item.name === 'Banten');
  const maluku = mapData?.find((item) => item.name === 'Maluku');
  const lampung = mapData?.find((item) => item.name === 'Lampung');
  const bengkulu = mapData?.find((item) => item.name === 'Bengkulu');
  const gorontalo = mapData?.find((item) => item.name === 'Gorontalo');
  const jawaTimur = mapData?.find((item) => item.name === 'Jawa Timur');
  const jawaBarat = mapData?.find((item) => item.name === 'Jawa Barat');
  const jakarta = mapData?.find((item) => item.name === 'Jakarta Raya');
  const yogyakarta = mapData?.find((item) => item.name === 'Yogyakarta');
  const jawaTengah = mapData?.find((item) => item.name === 'Jawa Tengah');
  const malukuUtara = mapData?.find((item) => item.name === 'Maluku Utara');
  const sumateraBarat = mapData?.find((item) => item.name === 'Sumatera Barat');
  const sulawesiUtara = mapData?.find((item) => item.name === 'Sulawesi Utara');
  const sumateraUtara = mapData?.find((item) => item.name === 'Sumatera Utara');
  const sulawesiBarat = mapData?.find((item) => item.name === 'Sulawesi Barat');
  const kepualauanRiau = mapData?.find((item) => item.name === 'Kepulauan Riau');
  const sulawesiTengah = mapData?.find((item) => item.name === 'Sulawesi Tengah');
  const bangkaBelitung = mapData?.find((item) => item.name === 'Bangka-Belitung');
  const irianJayaBarat = mapData?.find((item) => item.name === 'Irian Jaya Barat');
  const kalimantanTimur = mapData?.find((item) => item.name === 'Kalimantan Timur');
  const kalimantanUtara = mapData?.find((item) => item.name === 'Kalimantan Utara');
  const kalimantanBarat = mapData?.find((item) => item.name === 'Kalimantan Barat');
  const sumateraSelatan = mapData?.find((item) => item.name === 'Sumatera Selatan');
  const sulawesiSelatan = mapData?.find((item) => item.name === 'Sulawesi Selatan');
  const sulawesiTenggara = mapData?.find((item) => item.name === 'Sulawesi Tenggara');
  const kalimantanTengah = mapData?.find((item) => item.name === 'Kalimantan Tengah');
  const kalimantanSelatan = mapData?.find((item) => item.name === 'Kalimantan Selatan');
  const nusaTenggaraTimur = mapData?.find((item) => item.name === 'Nusa Tenggara Timur');
  const nusaTenggaraBarat = mapData?.find((item) => item.name === 'Nusa Tenggara barat');

  const getDataMap = (data) => {
    const coordinate = data?.geometry?.coordinates;
    const type = data?.geometry?.type;

    const payload = {
      type: 'active_user',
      location: coordinate,
      location_type: type,
      month: userActiveLocation.params.month,
    };

    getActiveUserLocation(payload).then((ress) => {
      if (data !== undefined) {
        handleSetDataUserLocation(data?.['hc-key'], ress?.data?.length);
      }
    });
  };

  useEffect(() => {
    getDataMap(aceh);
    getDataMap(bali);
    getDataMap(riau);
    getDataMap(papua);
    getDataMap(jambi);
    getDataMap(maluku);
    getDataMap(banten);
    getDataMap(jakarta);
    getDataMap(lampung);
    getDataMap(bengkulu);
    getDataMap(jawaTimur);
    getDataMap(jawaBarat);
    getDataMap(gorontalo);
    getDataMap(jawaTengah);
    getDataMap(yogyakarta);
    getDataMap(malukuUtara);
    getDataMap(sumateraBarat);
    getDataMap(sumateraUtara);
    getDataMap(sulawesiUtara);
    getDataMap(sulawesiBarat);
    getDataMap(bangkaBelitung);
    getDataMap(kepualauanRiau);
    getDataMap(sulawesiTengah);
    getDataMap(irianJayaBarat);
    getDataMap(kalimantanBarat);
    getDataMap(sulawesiSelatan);
    getDataMap(kalimantanUtara);
    getDataMap(kalimantanTimur);
    getDataMap(sumateraSelatan);
    getDataMap(sulawesiTenggara);
    getDataMap(kalimantanTengah);
    getDataMap(kalimantanSelatan);
    getDataMap(nusaTenggaraTimur);
    getDataMap(nusaTenggaraBarat);
  }, [chart, userActiveLocation?.params?.month]);

  const data = [
    ['id-ac', userActiveLocation?.data['id-ac']],
    ['id-jt', userActiveLocation?.data['id-jt']],
    ['id-be', userActiveLocation?.data['id-be']],
    ['id-bt', userActiveLocation?.data['id-bt']],
    ['id-kb', userActiveLocation?.data['id-kb']],
    ['id-bb', userActiveLocation?.data['id-bb']],
    ['id-ba', userActiveLocation?.data['id-ba']],
    ['id-ji', userActiveLocation?.data['id-ji']],
    ['id-ks', userActiveLocation?.data['id-ks']],
    ['id-nt', userActiveLocation?.data['id-nt']],
    ['id-se', userActiveLocation?.data['id-se']],
    ['id-kr', userActiveLocation?.data['id-kr']],
    ['id-ib', userActiveLocation?.data['id-ib']],
    ['id-su', userActiveLocation?.data['id-su']],
    ['id-ri', userActiveLocation?.data['id-ri']],
    ['id-sw', userActiveLocation?.data['id-sw']],
    ['id-ku', userActiveLocation?.data['id-ku']],
    ['id-la', userActiveLocation?.data['id-la']],
    ['id-sb', userActiveLocation?.data['id-sb']],
    ['id-ma', userActiveLocation?.data['id-ma']],
    ['id-nb', userActiveLocation?.data['id-nb']],
    ['id-sg', userActiveLocation?.data['id-sg']],
    ['id-st', userActiveLocation?.data['id-st']],
    ['id-pa', userActiveLocation?.data['id-pa']],
    ['id-jr', userActiveLocation?.data['id-jr']],
    ['id-ki', userActiveLocation?.data['id-ki']],
    ['id-1024', userActiveLocation?.data['id-1024']],
    ['id-jk', userActiveLocation?.data['id-jk']],
    ['id-go', userActiveLocation?.data['id-go']],
    ['id-yo', userActiveLocation?.data['id-yo']],
    ['id-sl', userActiveLocation?.data['id-sl']],
    ['id-sr', userActiveLocation?.data['id-sr']],
    ['id-ja', userActiveLocation?.data['id-ja']],
    ['id-kt', userActiveLocation?.data['id-kt']],
  ];

  // to set data from fetch data
  useEffect(() => {
    chart?.series[0].setData(data);
  }, [userActiveLocation?.data]);


  const [options] = useState({
    title: {
      text: '',
    },
    series: [
      {
        mapData: mapIDLocation,
        data: data,
        enableMouseTracking: false,
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
    colorAxis: {
      dataClasses: [
        {
          to: 0,
          color: '#E0E0E0',
        },
        {
          from: 1,
          to: 499,
          color: '#D2D4FF',
        },
        {
          from: 500,
          to: 1000,
          color: '#8E73F4',
        },
        {
          from: 1000,
          color: '#745EC8',
        },
      ],
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
    enableMouseTracking: {
      enable: false,
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

    </div>
  );
};

export default React.memo(ChartMap);
