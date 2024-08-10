import { takeLatest, call, put } from 'redux-saga/effects'
import axios from 'axios'
import {
  getAllCouponDetailFailure,
  getAllCouponDetailSuccess
} from '../actions/actions'
import { GET_ALL_COUPON_DETAIL_REQUEST } from '../actions/types'

function* getCouponDetailSaga(action) {
  try {
    const id = action.payload

    const token = localStorage.getItem('token')

    const response = yield call(
      axios.get,
      `http://localhost:9999/api/staff/coupon/${id}/detail`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    const coupondetail = response.data.data

    yield put(getAllCouponDetailSuccess(coupondetail))
  } catch (error) {
    yield put(getAllCouponDetailFailure(error))
  }
}

export default function* coupondetailSaga() {
  yield takeLatest(GET_ALL_COUPON_DETAIL_REQUEST, getCouponDetailSaga)
}
