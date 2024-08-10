import {
  GET_ALL_REVIEW_CUSTOMER_SUCCESS,
  GET_ALL_REVIEW_CUSTOMER_FAILURE
} from '../actions/types'

const initialState = {
  reviews: [],
  error: null
}

const reviewCustomerReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_REVIEW_CUSTOMER_SUCCESS:
      return {
        ...state,
        reviews: action.payload,
        error: null
      }
    case GET_ALL_REVIEW_CUSTOMER_FAILURE:
      return {
        ...state,
        reviews: [],
        error: action.payload
      }
    default:
      return state
  }
}

export default reviewCustomerReducer
