import Axios from '../services';
import {paths} from '@/src/configs';
import {buildParams} from '@/src/utils/buildParams';
import {generateSlug} from '@/src/utils/formatText';
import {ArticleFormPayload} from '@/src/types/article';

const pathNews = paths.news;

export const createArticleService = async (payload: ArticleFormPayload) => {
  try {
    return await Axios.post(`${pathNews}/article`, {
      ...payload,
      slug: generateSlug(payload.title),
    });
  } catch (error: any) {
    return error.response;
  }
};

export const getArticlesService = async (payload) => {
  try {
    const queryParams = buildParams({
      ...payload,
    });
    return await Axios.get(`${pathNews}/article${queryParams}`);
  } catch (error: any) {
    return error.response;
  }
};

export const getArticleByIdService = async (payload: string) => {
  try {
    return await Axios.get(`${pathNews}/article/${payload}`);
  } catch (error: any) {
    return error.response;
  }
};

export const updateArticleService = async (payload) => {
  const {id, data} = payload;
  try {
    return await Axios.put(`${pathNews}/article/${id}`, {
      ...data,
      slug: generateSlug(data.title),
    });
  } catch (error: any) {
    return error.response;
  }
};

export const deleteArticleService = async (payload) => {
  try {
    return await Axios.delete(`${pathNews}/article/${payload}`);
  } catch (error: any) {
    return error.response;
  }
};

export const getArticleByFilterService = async () => {
  try {
    const queryParams = buildParams({
      category: 'kesehatan',
      media_partner: '',
      vendor: '',
      start_date: '1/6/2022',
      end_date: '1/6/2022',
      search: '',
    });
    return await Axios.get(`/api/article${queryParams}`);
  } catch (error: any) {
    return error.response;
  }
};

export const getArticleCategoriesService = async () => {
  try {
    return await Axios.get(`${pathNews}/category`);
  } catch (error: any) {
    return error.response;
  }
};

export const getArticleSubCategoriesService = async () => {
  try {
    return await Axios.get(`${pathNews}/sub-category`);
  } catch (error: any) {
    return error.response;
  }
};

export const getArticleTagsService = async () => {
  try {
    return await Axios.get('/api/article/tags');
  } catch (error: any) {
    return error.response;
  }
};

export const getArticleTags = async ({
  page = 1,
  limit = 50,
  search = '',
}) => {
  const queryParams = buildParams({
    page,
    limit,
    search,
  });
  try {
    return await Axios.get(`${pathNews}/tag${queryParams}`);
  } catch (error: any) {
    return error.response;
  }
};

export const postArticleTags = async (payload) => {
  try {
    const path = `${pathNews}/tag`;
    return await Axios.post(path, {
      tag: payload,
    });
  } catch (error: any) {
    return error.response;
  }
};

export default {
  createArticleService,
  getArticlesService,
  getArticleByIdService,
  updateArticleService,
  deleteArticleService,
  getArticleByFilterService,
  getArticleCategoriesService,
  getArticleTagsService,
  getArticleTags,
  postArticleTags,
};
