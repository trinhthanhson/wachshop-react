import axios from 'axios'
import { takeLatest, call, put } from 'redux-saga/effects'
import { GET_ALL_CATEGORIES_REQUEST } from '../actions/types'

import {
  getAllCategoriesSuccess,
  getAllCategoriesFailure
} from '../actions/actions'

function* getAllCategoriesSaga() {
  try {
    const token = localStorage.getItem('token')

    const response = yield call(
      axios.get,
      'http://3.25.162.185:8080/api/user/category/all',
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )

    yield put(getAllCategoriesSuccess(response.data))
  } catch (error) {
    yield put(getAllCategoriesFailure(error))
  }
}

export default function* categoriesSaga() {
  yield takeLatest(GET_ALL_CATEGORIES_REQUEST, getAllCategoriesSaga)
}
