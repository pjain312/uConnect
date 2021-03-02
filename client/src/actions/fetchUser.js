import { GET_USER } from './action-types';
import setAuthorizationToken from '../utils/setAuthorizationToken';
import axios from 'axios';

export const fetchUser = (id) => {
  return async (dispatch) => {
    try {
      const data = await axios.get('http://localhost:8000/users/profile', {
        params: {
          id: id,
        },
      });
      dispatch({
        type: GET_USER,
        payload: data.data,
      });
    } catch (err) {
      console.log('error in fetching user', err);
    }
  };
};
