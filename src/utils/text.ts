import {capitalizeFirstLetter} from '@/src/utils/formatText';
import {isEmpty} from 'lodash';

export const toSnakeCase = (text: string = '') => {
  const toArray = text.split(' ');
  const toSnake = toArray.reduce((acc: string[], val: string) => {
    return acc.concat(val.toLowerCase());
  }, []);

  return toSnake.join('_');
};

export const formatToInitialCharacters = (text: string) => {
  if (!text) return 'M';

  const initials = text.match(/\b(\w)/g) || ['M'];
  const initialName = capitalizeFirstLetter(initials[0]);
  const lastName = initials.length > 1 ? capitalizeFirstLetter(initials[initials.length - 1]) : '';
  return initialName + lastName;
};

export const truncateText = (text: string, maxLength: number) => {
  if (isEmpty(text)) return '-';
  return text.length > maxLength ? text.slice(0, maxLength - 1) + '…' : text;
};

export const emailUsername = (email: string) => {
  return !email ? '-' : email.substring(0, email.indexOf('@'));
};

export const isValidJSON = (str: string) => {
  try {
    return (JSON.parse(str) && !!str);
  } catch (e) {
    return false;
  }
};

