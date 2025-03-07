import {DoctorRateItem} from '@/src/types/DoctorRate';

export const getListDoctorRate = (data: DoctorRateItem[]) => {
  const result = data.map((item: DoctorRateItem) => {
    return {
      id: item.id,
      faskes: item.faskes,
      doctor_name: item.doctor_name,
      payor_type: item.payor_type,
      payor_list: item.payor_list,
      product_type: item.product_type,
      product_list: item.product_list,
      selling_price: item.selling_price,
      mediverse_price: item.mediverse_price,
    };
  });

  return result;
};

export const getDetailDoctorRate = (data: DoctorRateItem) => {
  return {
    id: data.id,
    selling_price: data.selling_price,
    mediverse_price: data.mediverse_price,
  };
};
