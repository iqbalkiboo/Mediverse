/* eslint-disable no-invalid-this */
import {
  MapChart,
  TooltipFormatterCallbackFunction,
  TooltipFormatterContextObject,
} from 'highcharts';
import {useEffect, useRef, useState} from 'react';
import ReactDOM from 'react-dom';
import {getDataMapApi} from '@/client/dashboard';

const generateTooltipId = (chartId: number) =>
  `highcharts-custom-tooltip-${chartId}`;

interface ProductsCount {
  'medevo': {
    'doctor': number;
  },
  'medpharm': {
    'drug': number;
  },
  'medpoint': {
    'clinic': number;
    'lab': number;
    'hospital': number;
  },
}

interface Props {
  chart: MapChart | null;
  children(formatterContext: TooltipFormatterContextObject, products: ProductsCount, isLoading: boolean): JSX.Element;
}

export const Tooltip = ({chart, children}: Props) => {
  const isInit = useRef(false);
  const [context, setContext] = useState<TooltipFormatterContextObject | null>(
      null,
  );

  const [isLoading, setIsLoading] = useState(false);

  const [productsCount, setProductsCount] = useState({
    'medevo': {
      'doctor': 0,
    },
    'medpharm': {
      'drug': 0,
    },
    'medpoint': {
      'clinic': 0,
      'lab': 0,
      'hospital': 0,
    },
  });

  useEffect(() => {
    if (chart?.options) {
      const formatter: TooltipFormatterCallbackFunction = function() {
        // Ensures that tooltip DOM container is rendered before React portal is created.
        if (!isInit.current) {
          isInit.current = true;

          // TODO: Is there a better way to create tooltip DOM container?
          setTimeout(() => {
            chart.tooltip.refresh.apply(chart.tooltip, [this.point]);
            chart.tooltip.hide(0);
          });
        }

        setContext(this);

        return `<div id="${generateTooltipId(chart.index)}"></div>`;
      };

      chart.update({
        tooltip: {
          formatter,
          useHTML: true,
        },
      });
    }
  }, [chart]);

  const getDataMap = async () => {
    setIsLoading(true);
    const coordinates = context?.point?.geometry?.coordinates;
    const type = context?.point?.geometry?.type;
    if (coordinates) {
      const payload = {
        coordinates,
        code: type === 'MultiPolygon' ? '2' : '1',
        type: type,
      };
      const response = await getDataMapApi(payload);
      if (response.status === 200) {
        const {medevo, medpharm, medpoint} = response.data;
        setProductsCount({
          'medevo': {
            'doctor': medevo?.doctor,
          },
          'medpharm': {
            'drug': medpharm?.drug,
          },
          'medpoint': {
            'clinic': medpoint?.clinic,
            'lab': medpoint?.lab,
            'hospital': medpoint?.hospital,
          },
        });
      } else {
        setProductsCount({
          'medevo': {
            'doctor': 0,
          },
          'medpharm': {
            'drug': 0,
          },
          'medpoint': {
            'clinic': 0,
            'lab': 0,
            'hospital': 0,
          },
        });
      }
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getDataMap();
  }, [context]);

  const node = chart && document.getElementById(generateTooltipId(chart.index));

  return node && context ?
    ReactDOM.createPortal(children(context, productsCount, isLoading), node) :
    null;
};
