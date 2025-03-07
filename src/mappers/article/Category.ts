import {ArticleResponseCategory, ArticleResponseData} from '@/src/types/article';

export const responseArticleCategoryMappers = (response: ArticleResponseData) => {
  return {
    message: response.message,
    data: response.data,
    metadata: response.metadata,
  };
};


export const getArticleCategoryMappers = ({data}): ArticleResponseData => {
  return data.map((category: ArticleResponseCategory) => ({
    label: category.name,
    value: category.id,
  }));
};
