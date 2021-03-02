import { GET_HOME } from '../actions/action-types';

const home = (state = [], action) => {
  switch (action.type) {
    case GET_HOME:
      return action.payload;
    default:
      return state;
  }
};

export default home;
