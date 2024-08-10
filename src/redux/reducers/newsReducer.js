import { SET_NEWS, FETCH_NEWS } from '../actions/types';

const initialState = {
  news: [],
  loading: false,
  error: null
};

const newsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_NEWS:
      return {
        ...state,
        news: action.payload,
        loading: false,
        error: null
      };
    case FETCH_NEWS:
      return {
        ...state,
        loading: true,
        error: null
      };
    default:
      return state;
  }
};

export default newsReducer;
