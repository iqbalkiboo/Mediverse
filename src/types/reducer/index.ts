import {ArticleReducer} from '../article';
import {HomeReducer} from '../home';

export type CombineReducer = {
  home: HomeReducer,
  article: ArticleReducer,
};
