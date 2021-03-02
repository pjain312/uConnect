import { LOGIN_SUCCESS, GET_USER, AUTHENTICATE_USER } from './action-types';
import setAuthorizationToken from '../utils/setAuthorizationToken';
import axios from 'axios';

export const loginSuccess = (user) => {
  return {
    type: LOGIN_SUCCESS,
    user: user,
  };
};
export const login = (creds) => {
  return async (dispatch) => {
    try {
      const data = await axios.post(
        'http://localhost:8000/users/sign-in',
        creds
      );
      localStorage.setItem('token', data.data.data.token);
      setAuthorizationToken(data.data.data.token);
      dispatch(loginSuccess(data.data.data.user));
      alert('You are logged in');
      return;
    } catch (err) {
      console.log('error in logging in', err);
      alert('Incorrect Username or Password');
    }
  };
};

export const signup = (user) => {
  return async (dispatch) => {
    try {
      const data = await axios.post('http://localhost:8000/users/create', user);
      alert('User Created Successfully');
    } catch (err) {
      console.log('error in adding user', err);
      alert('Email ID already registered');
    }
  };
};

export const signupWithGoogle = () => {
  return async (dispatch) => {
    try {
      const data = await axios.get('http://localhost:8000/users/auth/google');
      alert('User Created Successfully');
    } catch (err) {
      console.log('error in adding user', err);
      // alert('Email ID already registered');
    }
  };
};

export function logoutUser() {
  return (dispatch) => {
    localStorage.removeItem('token');
    setAuthorizationToken(false);
    dispatch(loginSuccess({}));
    alert('You are logged out');
  };
}

export function authenticateUser(user) {
  return {
    type: AUTHENTICATE_USER,
    user,
  };
}
