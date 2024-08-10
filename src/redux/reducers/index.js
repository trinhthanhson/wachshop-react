import { combineReducers } from 'redux'
import newsReducer from './newsReducer'
import productsReducer from './productsReducer'
import productsCustomerReducer from './productsCustomerReducer'
import ordersReducer from './ordersReducer'
import customersReducer from './customersReducer'
import orderDetailReducer from './orderDetailReducer'
import productDetailReducer from './productDetailReducer'
import addProductReducer from './addProductReducer'
import categoriesReducer from './categoriesReducer'
import updateProductReducer from './updateProductReducer'
import userProfileReducer from './userProfileReducer'
import customerOrdersReducer from './customerOrderReducer'
import cartReducer from './cartReducer'
import addOrderReducer from './addOrderReducer'
import couponsReducer from './couponsReducer'
import addCartReducer from './addCartReducer'
import addCouponReducer from './addCouponReducer'
import brandReducer from './brandReducer'
import staffsReducer from './staffsReducer'
import reviewCustomerReducer from './reviewCustomerReducer'
import couponDetailReducer from './coupondetailReducer'
import reviewProductReducer from './reviewProductReducer'
import roleReducer from './roleReducer'

const rootReducer = combineReducers({
  news: newsReducer,
  products: productsReducer,
  productsCustomer: productsCustomerReducer,
  orders: ordersReducer,
  customers: customersReducer,
  orderDetail: orderDetailReducer,
  productDetail: productDetailReducer,
  addProduct: addProductReducer,
  categories: categoriesReducer,
  brands: brandReducer,
  staffs: staffsReducer,
  updateProduct: updateProductReducer,
  user: userProfileReducer,
  customerOrders: customerOrdersReducer,
  cart: cartReducer,
  reviews: reviewCustomerReducer,
  addOrder: addOrderReducer,
  coupons: couponsReducer,
  coupondetail: couponDetailReducer,
  addCoupon: addCouponReducer,
  addCart: addCartReducer,
  reviewProduct: reviewProductReducer,
  roles: roleReducer
})

export default rootReducer
