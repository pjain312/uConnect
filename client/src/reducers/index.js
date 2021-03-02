import { combineReducers } from 'redux';
import home from './home';
import auth from './auth';
import fetchUsers from './fetchUser';

export default combineReducers({
  home,
  auth,
  fetchUsers,
});
