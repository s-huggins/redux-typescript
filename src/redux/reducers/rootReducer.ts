import { combineReducers } from 'redux';
import { fetchPostReducer } from './fetchReducer';

export const rootReducer = combineReducers({
  post: fetchPostReducer
});
