import { combineReducers } from 'redux';

import PostReducer from './PostReducer';
import ModalReducer from './ModalReducer';

export default combineReducers({
  posts: PostReducer,
  modals: ModalReducer,
});
