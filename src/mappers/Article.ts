import {capitalizeFirstLetter} from '@/src/utils/formatText';

export const getArticleTags = (data: any) => {
  const result = data.map((item) => {
    return {
      label: capitalizeFirstLetter(item.name),
      value: item.id,
    };
  });

  return result;
};
