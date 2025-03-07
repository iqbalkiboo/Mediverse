import {capitalize, map} from 'lodash';

export const capitalizeFirstLetter = (string) => {
  return string ? map(string.split(' '), capitalize).join(' ') : '';
};

export const formatAddress = (address: {
  city: string,
  street: string,
  village: string,
  province: string,
  subDistrict: string,
  postcode: string | number,
}) => {
  return [
    address?.street,
    address?.village,
    address?.subDistrict,
    address?.city,
    address?.province,
    address?.postcode,
  ].join(', ');
};

export const generateSlug = (value: string) => {
  return value.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
};
