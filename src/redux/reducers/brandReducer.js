import { GET_ALL_BRAND_SUCCESS, GET_ALL_BRAND_FAILURE } from '../actions/types'

const initialState = {
  brands: [],
  error: null
}

const brandReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_BRAND_SUCCESS:
      return {
        ...state,
        brands: action.payload,
        error: null
      }
    case GET_ALL_BRAND_FAILURE:
      return {
        ...state,
        brands: [],
        error: action.payload
      }
    default:
      return state
  }
}

export default brandReducer
