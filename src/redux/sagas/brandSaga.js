import axios from 'axios'
import { takeLatest, call, put } from 'redux-saga/effects'
import { GET_ALL_BRAND_REQUEST } from '../actions/types'

import { getAllBrandSuccess, getAllBrandFailure } from '../actions/actions'

function* getAllBrandSaga() {
  try {
    const token = localStorage.getItem('token')
    const response = yield call(
      axios.get,
      'http://localhost:9999/api/user/brand/all',
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )

    yield put(getAllBrandSuccess(response.data))
  } catch (error) {
    yield put(getAllBrandFailure(error))
  }
}

export default function* brandSaga() {
  yield takeLatest(GET_ALL_BRAND_REQUEST, getAllBrandSaga)
}
