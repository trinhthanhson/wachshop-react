import axios from 'axios'
import { takeLatest, call, put } from 'redux-saga/effects'
import { GET_ALL_REVIEW_CUSTOMER_REQUEST } from '../actions/types'

import {
  getAllReviewCustomerSuccess,
  getAllReviewCustomerFailure
} from '../actions/actions'

function* getAllReviewCustomerSaga() {
  try {
    const token = localStorage.getItem('token')

    const response = yield call(
      axios.get,
      'http://localhost:9999/api/customer/review/all',
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )

    yield put(getAllReviewCustomerSuccess(response.data))
  } catch (error) {
    yield put(getAllReviewCustomerFailure(error))
  }
}

export default function* reviewCustomerSaga() {
  yield takeLatest(GET_ALL_REVIEW_CUSTOMER_REQUEST, getAllReviewCustomerSaga)
}
