import { call, put, takeEvery } from 'redux-saga/effects'

// Saga worker function to handle the update product action
function* updateProduct(action) {
  try {
    const { id, dataToSend } = action.payload
    const token = localStorage.getItem('token')

    const response = yield call(() =>
      fetch(`http://localhost:9999/api/staff/product/${id}/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(dataToSend)
      })
    )

    if (!response.ok) {
      throw new Error('Network response was not ok')
    }

    const responseData = yield response.json()
    yield put({ type: 'UPDATE_PRODUCT_SUCCESS', payload: responseData })
  } catch (error) {
    yield put({ type: 'UPDATE_PRODUCT_FAILURE', error: error.message })
  }
}

// Saga watcher function to watch for UPDATE_PRODUCT_REQUEST actions
function* watchUpdateProduct() {
  yield takeEvery('UPDATE_PRODUCT_REQUEST', updateProduct)
}

export default watchUpdateProduct
