import { GET_HOME } from './action-types';
import axios from 'axios';
import { getAuthTokenFromLocalStorage } from '../utils/setAuthorizationToken';

export const getHome = () => {
  return async (dispatch) => {
    try {
      const data = await axios.get('http://localhost:8000/');
      dispatch({
        type: GET_HOME,
        payload: data.data,
      });
    } catch (err) {
      console.log('error in fetching All posts and users', err);
    }
  };
};

export const addPost = (newPost) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(
        'http://localhost:8000/posts/create',
        newPost
      );
      await alert('Post created Successfully');
    } catch (err) {
      console.log(' error in creating post', err);
      alert('Post can not be created');
    }
  };
};

export const deletePost = (postInfo) => {
  return async (dispatch) => {
    try {
      const data = await axios.get('http://localhost:8000/posts/destroy', {
        params: {
          id: postInfo.id,
          user: postInfo.user,
        },
      });
      alert('Post deleted successfully');
    } catch (err) {
      console.log('error in deleting Post', err);
      alert('You can not delete this post');
    }
  };
};

export const createComment = (comment) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(
        'http://localhost:8000/comments/create',
        comment
      );
      alert('Comment created Successfully');
    } catch (err) {
      console.log('error in creating Comment', err);
      alert('Comment can not be created');
    }
  };
};

export const deleteComment = (commentInfo) => {
  return async (dispatch) => {
    try {
      const data = await axios.get('http://localhost:8000/comments/destroy', {
        params: {
          id: commentInfo.id,
          user: commentInfo.user,
        },
      });
      alert('Comment deleted successfully');
    } catch (err) {
      console.log('error in deleting Comment', err);
      alert('You can not delete this comment');
    }
  };
};

export const addLikes = (likeData) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(
        'http://localhost:8000/likes/toggle',
        likeData
      );
    } catch (err) {
      console.log('error in liking', err);
    }
  };
};
