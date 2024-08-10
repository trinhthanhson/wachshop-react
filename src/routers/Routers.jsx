import { useEffect, useState } from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import Home from '../pages/Home'
import About from '../pages/About/About'
import Origin from '../pages/About/Origin'
import Services from '../pages/About/Services'
import Jobs from '../pages/About/Jobs'
import News from '../pages/News/News'
import Menu from '../pages/Menu/Menu'
import Products from '../pages/Menu/Products'
import Page404 from '../pages/Page404'
import Contact from '../pages/Contact'
import ProductDetail from '../pages/Menu/ProductDetail'
import NewDetail from '../pages/News/NewDetail'
import Discover from '../pages/Discover'
import Cart from '../pages/Cart'
import Layout from '../Admin/components/Layout'
import Dashboard from '../Admin/pages/Dashboard'
import AllProducts from '../Admin/pages/AllProducts'
import AllOrder from '../Admin/pages/AllOrder'
import AllCustomers from '../Admin/pages/AllCustomer'
import AllCategory from '../Admin/pages/AllCategory'
import AdminOrderDetail from '../Admin/pages/AdminOrderDetail'
import AdminProductDetail from '../Admin/pages/AdminProductDetail'
import CreateProduct from '../Admin/pages/CreateProduct'
import UpdateProduct from '../Admin/pages/UpdateProduct'
import Login from '../pages/Auth/Login'
import Signup from '../pages/Auth/Signup'
import CustomerProfile from '../pages/Auth/CustomerProfile'
import StaffProfile from '../Admin/pages/StaffProfile'
import OrdersHistory from '../pages/Order/OrdersHistory'
import OrderDetail from '../pages/Order/OrderDetail'
import AllCoupons from '../Admin/pages/AllCoupons'
import CreateCoupon from '../Admin/pages/CreateCoupon'
import Checkout from '../pages/Order/Checkout'
import ProductDetailByCategory from '../pages/Menu/ProductByCategory'
import OrderBuyNow from '../pages/Order/OrderBuyNow'
import AdminUserCustomerDetail from '../Admin/pages/AdminUserCustomerDetail'
import AllBrand from '../Admin/pages/AllBrand'
import AllStaff from '../Admin/pages/AllStaff'
import AdminUserStaffDetail from '../Admin/pages/AdminUserStaffDetail'
import AllCouponDetail from '../Admin/pages/AllCouponDetail'
import { decryptData } from '../cryptoUtils/cryptoUtils'
import ProductByBrand from '../pages/Menu/ProductByBrand'
import OrderAcceptShipper from '../Admin/pages/OrderAcceptShipper'
import OrderShipperDetail from '../Admin/pages/OrderShipperDetail'
import OrderReceiveShipper from '../Admin/pages/OrderReceiveShipper'

const Routers = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [role, setRole] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  useEffect(() => {
    // Lấy role từ localStorage và giải mã
    const roleName = localStorage.getItem('role_name')
    if (roleName) {
      try {
        const decryptedRole = decryptData(roleName)
        setRole(decryptedRole)
        if (
          decryptedRole === 'MANAGER' ||
          decryptedRole === 'STAFF' ||
          decryptedRole === 'SHIPPER'
        ) {
          setIsLoggedIn(true)
        }
      } catch (error) {
        console.error('Error decrypting role:', error)
      }
    }
  }, [])

  useEffect(() => {
    if (isLoggedIn) {
      if (role === 'MANAGER' || role === 'STAFF') {
        // Redirect to /manager if the user is a manager or staff and is on /buynow or /
        if (location.pathname === '/buynow' || location.pathname === '/') {
          navigate('/manager')
        }
      } else if (role === 'SHIPPER') {
        if (location.pathname === '/buynow' || location.pathname === '/') {
          navigate('/manager/shipper')
        }
      }
    }
    if (role === 'CUSTOMER') {
      if (location.pathname.startsWith('/manager')) {
        navigate('/home')
      }
    }
  }, [role, location.pathname, navigate, isLoggedIn])
  // Your component code here

  return (
    <Routes>
      <Route path="*" element={<Page404 />} />
      <Route index element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/profile" element={<CustomerProfile />} />
      <Route path="/home" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/origin" element={<Origin />} />
      <Route path="/services" element={<Services />} />
      <Route path="/jobs" element={<Jobs />} />
      <Route path="/news" element={<News />} />
      <Route path="/news/:id" element={<NewDetail />} />
      <Route path="/menu" element={<Menu />} />
      <Route path="/products" element={<Products />} />
      <Route path="/products/:id" element={<ProductDetail />} />
      <Route path="/buynow" element={<OrderBuyNow />} />
      <Route
        path="/products/:category_id/category"
        element={<ProductDetailByCategory />}
      />
      <Route path="/products/:brand_id/brand" element={<ProductByBrand />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/discover" element={<Discover />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/orders-history" element={<OrdersHistory />} />
      <Route path="/order/:id" element={<OrderDetail />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/manager/shipper" element={<OrderAcceptShipper />} />
      <Route path="/manager/shipper/:id" element={<OrderShipperDetail />} />

      <Route
        path="/manager/shipper/receive"
        element={<OrderReceiveShipper />}
      />

      <Route path="/manager" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="/manager/products" element={<AllProducts />} />
        <Route path="/manager/create-product" element={<CreateProduct />} />
        <Route path="/manager/update-product/:id" element={<UpdateProduct />} />
        <Route
          path="/manager/user-customer/:id"
          element={<AdminUserCustomerDetail />}
        />
        <Route
          path="/manager/user-staff/:id"
          element={<AdminUserStaffDetail />}
        />
        <Route path="/manager/product/:id" element={<AdminProductDetail />} />
        <Route
          path="/manager/coupon-detail/:id"
          element={<AllCouponDetail />}
        />
        <Route path="/manager/orders" element={<AllOrder />} />
        <Route path="/manager/order/:id" element={<AdminOrderDetail />} />
        <Route path="/manager/customers" element={<AllCustomers />} />
        <Route path="/manager/staffs" element={<AllStaff />} />
        <Route path="/manager/category" element={<AllCategory />} />
        <Route path="/manager/brand" element={<AllBrand />} />
        <Route path="/manager/profile" element={<StaffProfile />} />
        <Route path="/manager/coupons" element={<AllCoupons />} />
        <Route path="/manager/create-coupon" element={<CreateCoupon />} />
      </Route>
    </Routes>
  )
}

export default Routers
