// reducer.js
import {
  GET_ALL_CATEGORIES_REQUEST,
  GET_ALL_CATEGORIES_SUCCESS,
  GET_ALL_CATEGORIES_FAILURE
} from '../actions/types'

const initialState = {
  categories: [],
  loading: false,
  error: null
}

const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_CATEGORIES_REQUEST:
      return { ...state, loading: true }
    case GET_ALL_CATEGORIES_SUCCESS:
      return { ...state, loading: false, categories: action.payload }
    case GET_ALL_CATEGORIES_FAILURE:
      return { ...state, loading: false, error: action.payload }
    default:
      return state
  }
}

export default categoryReducer
