import { useCallback, useEffect, useRef } from 'react'
import CartItem from '../components/Cart/CartItem'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCartRequest } from '../redux/actions/actions'
import { useNavigate } from 'react-router-dom'

const Cart = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const cart = useSelector((state) => state.cart.cart)
  const cartDetailRef = useRef(null)

  const getAllCart = useCallback(() => {
    dispatch(getAllCartRequest())
  }, [dispatch])

  useEffect(() => {
    getAllCart()
  }, [getAllCart])

  const handleQuantityChange = () => {
    getAllCart()
  }

  const handleDeleteSuccess = () => {
    getAllCart()
  }

  const handleOrderButtonClick = () => {
    navigate('/checkout')
    // dispatch(addOrderRequest())
  }

  return (
    <>
      <section className="relative flex flex-col-reverse md:flex-row items-center bg-[url('https://www.highlandscoffee.com.vn/vnt_upload/cake/SPECIALTYCOFFEE/Untitled-1-01.png')]">
        <div className="relative md:w-full pt-[80px]">
          <div className="py-[40px] px-7 lg:px-14 md:py-14 w-full">
            <h1 className="uppercase text-center sm:text-left font-RobotoSemibold text-main text-3xl md:text-3xl xl:text-[3rem] mb-5 mt-0 sm:mt-5 md:leading-tight">
              Giỏ Hàng
            </h1>
          </div>
        </div>
      </section>

      <div className="lg:grid grid-cols-3 lg:px-16 relative my-10">
        <div className="lg:col-span-2 lg:px-5 ">
          <div className="space-y-3">
            {cart?.data?.cartDetails.length > 0 ? (
              cart.data.cartDetails.map((item, index) => (
                <CartItem
                  key={index}
                  cart={item}
                  onQuantityChange={handleQuantityChange}
                  onDeleteSuccess={handleDeleteSuccess}
                />
              ))
            ) : (
              <p
                style={{
                  color: 'red',
                  fontWeight: 'bold',
                  textAlign: 'center',
                  marginTop: '50px'
                }}
              >
                YOUR CART EMPTY.
              </p>
            )}
          </div>
        </div>
        {cart?.data?.cartDetails?.length > 0 && (
          <div
            className="fixed px-4 lg:col-span-1 right-[60px] w-[30%] top-[330px]"
            ref={cartDetailRef}
          >
            <div className="border p-5 bg-white shadow-lg rounded-md">
              <p className="font-bold opacity-60 pb-4 uppercase">
                Chi Tiết Hóa Đơn
              </p>
              <hr />

              <div className="space-y-3 font-semibold">
                <div className="flex justify-between pt-3 text-black ">
                  <span>Tổng</span>
                  <span style={{ justifyContent: 'flex-end' }}>
                    {cart.data.total_price.toLocaleString('en')} VNĐ
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Giảm Giá</span>
                  <span className="text-green-700">0 VNĐ</span>
                </div>
                <div className="flex justify-between">
                  <span>Phí Vận Chuyển</span>
                  <span className="text-green-700">
                    {(20000).toLocaleString('en')} VNĐ
                  </span>
                </div>
                <hr />
                <div className="flex justify-between font-bold text-lg">
                  <span>Thanh Toán</span>
                  <span className="text-green-700">
                    {(cart.data.total_price + 20000).toLocaleString('en')} VNĐ
                  </span>
                </div>
              </div>

              <div className="flex justify-center items-center gap-5">
                <button
                  onClick={() => handleOrderButtonClick()}
                  className="w-[50%] bg-green-500 bg-primary text-white p-2 rounded-md mt-5 shadow-md hover:bg-main transition duration-300 ease-in-out"
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default Cart
