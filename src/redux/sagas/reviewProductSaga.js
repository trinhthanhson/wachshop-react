import axios from 'axios'
import { takeLatest, call, put } from 'redux-saga/effects'
import { GET_ALL_REVIEW_PRODUCT_REQUEST } from '../actions/types'

import {
  getReviewProductSuccess,
  getReviewProductFailure
} from '../actions/actions'

function* getReviewProductSaga(action) {
  try {
    const id = action.payload

    const token = localStorage.getItem('token')

    const response = yield call(
      axios.get,
      `http://localhost:9999/api/user/review/${id}/product`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    const reviews = response.data

    yield put(getReviewProductSuccess(reviews))
  } catch (error) {
    yield put(getReviewProductFailure(error))
  }
}

export default function* reviewProductSaga() {
  yield takeLatest(GET_ALL_REVIEW_PRODUCT_REQUEST, getReviewProductSaga)
}
