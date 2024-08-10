import { all } from 'redux-saga/effects'
import newSaga from './newSaga'
import productSaga from './productSaga'
import productsCustomerSaga from './productsCustomerSaga'
import orderSaga from './orderSaga'
import customerSaga from './customerSaga'
import orderDetailSaga from './orderDetailSaga'
import productDetailSaga from './productDetailSaga'
import postAddProduct from './addProductSaga'
import categoriesSaga from './categoriesSaga'
import putUpdateProduct from './updateProductSaga'
import userProfileSaga from './userProfileSaga'
import customerOrdersSaga from './customerOrdersSaga'
import cartSaga from './cartSaga'
import addOrderSaga from './addOrderSaga'
import couponsSaga from './couponsSaga'
import putAddCart from './addCartSaga'
import postAddCoupon from './addCouponSaga'
import brandSaga from './brandSaga'
import staffSaga from './staffSaga'
import reviewCustomerSaga from './reviewCustomerSaga'
import couponDetailSaga from './coupondetailSaga'
import reviewProductSaga from './reviewProductSaga'
import roleSaga from './roleSaga'

export default function* rootSaga() {
  yield all([
    newSaga(),
    productSaga(),
    productsCustomerSaga(),
    orderSaga(),
    customerSaga(),
    orderDetailSaga(),
    productDetailSaga(),
    postAddProduct(),
    categoriesSaga(),
    brandSaga(),
    staffSaga(),
    reviewCustomerSaga(),
    putUpdateProduct(),
    userProfileSaga(),
    customerOrdersSaga(),
    cartSaga(),
    addOrderSaga(),
    couponsSaga(),
    couponDetailSaga(),
    putAddCart(),
    postAddCoupon(),
    reviewProductSaga(),
    roleSaga()
  ])
}
