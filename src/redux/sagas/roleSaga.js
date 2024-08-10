import { takeLatest, call, put } from 'redux-saga/effects'
import axios from 'axios'
import { GET_ALL_ROLE_REQUEST } from '../actions/types'

import { getAllRoleFailure, getAllRoleSuccess } from '../actions/actions'

function* getAllRoleSaga() {
  try {
    const token = localStorage.getItem('token')

    const response = yield call(
      axios.get,
      'http://localhost:9999/api/manager/role/all',
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )

    yield put(getAllRoleSuccess(response.data))
  } catch (error) {
    yield put(getAllRoleFailure(error))
  }
}

export default function* roleSaga() {
  yield takeLatest(GET_ALL_ROLE_REQUEST, getAllRoleSaga)
}
