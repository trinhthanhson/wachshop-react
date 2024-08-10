import {
  GET_ALL_REVIEW_PRODUCT_FAILURE,
  GET_ALL_REVIEW_PRODUCT_SUCCESS
} from '../actions/types'

const initialState = {
  reviews: null,
  error: null
}

const reviewProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_REVIEW_PRODUCT_SUCCESS:
      return {
        ...state,
        reviews: action.payload,
        error: null
      }
    case GET_ALL_REVIEW_PRODUCT_FAILURE:
      return {
        ...state,
        reviews: [],
        error: action.payload
      }
    default:
      return state
  }
}

export default reviewProductReducer
