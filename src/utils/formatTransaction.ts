import {formatRupiah} from '@/src/utils/formatRupiah';

export const formatCurrenciesTransaction = (description: string, value: string) => {
  switch (description) {
    case 'Debit':
      return `+${formatRupiah(value)}`;
    case 'Kredit':
      return `-${formatRupiah(value)}`;
    default:
      return `${formatRupiah(value)}`;
  }
};

export const formatColorTransaction = (description: string) => {
  switch (description) {
    case 'Debit':
      return 'text-[#35B932]';
    case 'Kredit':
      return 'text-[#E5000C]';
    default:
      return '';
  }
};
