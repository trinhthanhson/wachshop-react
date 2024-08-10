import {
  GET_ALL_COUPON_DETAIL_FAILURE,
  GET_ALL_COUPON_DETAIL_SUCCESS
} from '../actions/types'

const initialState = {
  coupondetail: null,
  error: null
}

const coupondetailReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_COUPON_DETAIL_SUCCESS:
      return {
        ...state,
        coupondetail: action.payload,
        error: null
      }
    case GET_ALL_COUPON_DETAIL_FAILURE:
      return {
        ...state,
        coupondetail: [],
        error: action.payload
      }
    default:
      return state
  }
}

export default coupondetailReducer
