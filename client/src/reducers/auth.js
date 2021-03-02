import { LOGIN_SUCCESS, AUTHENTICATE_USER } from '../actions/action-types';
import isEmpty from 'lodash/isEmpty';

const initialAuthState = {
  user: {},
  isLoggedin: false,
  inProgress: false,
  isSignedUp: false,
};

const auth = (state = initialAuthState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.user,
        isLoggedin: !isEmpty(action.user),
        inProgress: false,
        error: null,
      };
    case AUTHENTICATE_USER:
      return {
        ...state,
        user: action.user,
        isLoggedin: true,
      };
    // case SIGNUP_SUCCESS:
    //   return {
    //     ...state,
    //     isSignedUp: true,
    //   };
    default:
      return state;
  }
};

export default auth;
