import { call, put, takeEvery } from 'redux-saga/effects'

// Worker Saga: thực hiện cập nhật sản phẩm
function* addProduct(action) {
  try {
    const { dataToSend } = action.payload
    const token = localStorage.getItem('token')

    // Gọi API để thêm sản phẩm
    const response = yield call(() =>
      fetch(`http://localhost:9999/api/staff/product/add`, {
        method: 'POST',
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
    yield put({ type: 'ADD_PRODUCT_SUCCESS', payload: responseData })
  } catch (error) {
    yield put({ type: 'ADD_PRODUCT_FAILURE', error: error.message })
  }
}

// Watcher Saga: theo dõi các hành động ADD_PRODUCT_REQUEST
function* watchAddProduct() {
  yield takeEvery('ADD_PRODUCT_REQUEST', addProduct)
}

export default watchAddProduct
