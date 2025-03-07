import {formatRupiah} from '@/src/utils/fromatCurrency';

const businessSchemaWithPpn = (value) => {
  const ppn = (value/100)/(1 - (11/100));
  const result = Number(parseFloat(ppn.toFixed(4)) * 100);
  return parseFloat(result.toFixed(2));
};

const platformFeeWithPpn = (type, value) => {
  if (type === 'percentage') {
    const ppn = (value/100)/(1 - (11/100));
    const result = parseFloat(ppn.toFixed(4)) * 100;
    return `${parseFloat(result.toFixed(2))}%`;
  }

  if (type === 'nominal') {
    const ppn = (value)/(1 - (11/100));
    return formatRupiah(Math.round(ppn));
  }
};

export {
  platformFeeWithPpn,
  businessSchemaWithPpn,
};
