import PropTypes from 'prop-types'
import {
  addCartRequest,
  getAllCouponsRequest
} from '../../redux/actions/actions'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'

const CardProductItem = ({ product }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const coupons = useSelector((state) => state.coupons.coupons.data)
  const [discountedPrice, setDiscountedPrice] = useState(null)
  const [priceDiscount, setPriceDiscount] = useState(null)
  const {
    product_id,
    product_name,
    priceUpdateDetails,
    image,
    category,
    brand,
    status,
    quantity
  } = product

  const price = priceUpdateDetails[0]?.price_new || 0
  const formattedPrice = price.toLocaleString('en')
  console.log(status)
  useEffect(() => {
    dispatch(getAllCouponsRequest())
  }, [dispatch])

  useEffect(() => {
    if (Array.isArray(coupons) && coupons.length > 0) {
      const now = new Date()

      // Find valid coupon
      const validCoupon = coupons.find((coupon) => {
        const startDate = new Date(coupon.start_date)
        const endDate = new Date(coupon.end_date)
        return now >= startDate && now <= endDate
      })

      if (validCoupon && validCoupon.couponDetails.length > 0) {
        // Filter active coupon details for the current product
        const activeCouponDetails = validCoupon.couponDetails.filter(
          (detail) =>
            detail.status === 'Active' && detail.product_id === product_id
        )

        if (activeCouponDetails.length > 0) {
          // Assuming each detail has a percentage discount
          const maxPercent = Math.max(
            ...activeCouponDetails.map(
              (detail) => parseFloat(detail.percent) || 0
            )
          )

          // Calculate discount amount and apply it
          const discountAmount = price * maxPercent
          const newPrice = price - discountAmount
          setDiscountedPrice(Math.ceil(newPrice).toLocaleString('en'))
          setPriceDiscount(Math.ceil(newPrice))
        }
      }
    }
  }, [coupons, price, product_id])

  const handleAddToCart = () => {
    dispatch(
      addCartRequest({
        product_name: `${product_name}`,
        price: priceDiscount || price
      })
    )
  }

  const handleBuyNow = () => {
    navigate('/buynow', {
      state: {
        product: product,
        quantity: 1,
        price: priceDiscount || product.priceUpdateDetails[0]?.price_new
      }
    })
  }

  return (
    <div className="bg-white rounded-xl shadow-lg mb-10 relative justify-between col-span-1 w-full md:w-[48%] xl:w-[32%] hover:scale-105 transition duration-500 ease-in-out cursor-pointer">
      <div>
        <div
          className="bg-primary rounded-bl-[35px] py-2 pl-8 pr-5 text-center absolute top-0 right-0 w-fit"
          style={{ left: '8px' }}
        >
          <p className="text-white font-RobotoMedium text-sm 3xl:text-base">
            {brand?.brand_name}
          </p>
        </div>
        <div className="bg-primary rounded-bl-[35px] py-2 pl-8 pr-5 text-center absolute top-0 right-0 w-fit">
          <p className="text-white font-RobotoMedium text-sm 3xl:text-base">
            {category?.category_name}
          </p>
        </div>

        <div className="mb-0 md:h-[200px] lg:h-[250px] xl:h-[35vh]">
          <a href={`/products/${product_id}`}>
            <img
              className="w-full h-full object-contain object-center"
              src={image}
              alt={product_name}
            />
          </a>
        </div>
        <div className="pt-5 pb-3">
          <h3 className="px-5 text-black font-RobotoSemibold text-xl 3xl:text-2xl leading-[1.3]">
            {product_name}
          </h3>
          <hr className="mt-5" />
          <div className="flex py-3 relative">
            {status === 'Active' ? (
              quantity > 0 ? (
                <div className="w-1/2 px-5">
                  <p className="text-base font-RobotoMedium 3xl:text-lg text-primary">
                    Sản phẩm còn hàng
                  </p>
                  <div className="">
                    <span className="relative">
                      <p className="text-base font-RobotoSemibold 3xl:text-lg text-main">
                        Mua sắm ngay
                      </p>
                    </span>
                  </div>
                </div>
              ) : (
                <div className="w-1/2 px-5">
                  <p className="text-base font-RobotoMedium 3xl:text-lg text-primary"></p>
                  <div className="">
                    <span className="relative">
                      <p className="text-center text-base font-RobotoSemibold 3xl:text-lg text-red-500">
                        Sản phẩm hết hàng
                      </p>
                    </span>
                  </div>
                </div>
              )
            ) : (
              <div className="w-full px-5">
                <p className="text-center text-base font-RobotoSemibold 3xl:text-lg text-red-500">
                  Ngừng bán
                </p>
              </div>
            )}

            <div className="w-1/2 px-5">
              <p className="text-base font-RobotoMedium 3xl:text-lg text-primary">
                Giá
              </p>
              <p className="text-base font-RobotoSemibold 3xl:text-lg text-main">
                {discountedPrice
                  ? `${discountedPrice} VNĐ`
                  : `${formattedPrice} VNĐ`}
              </p>
              {discountedPrice && (
                <p className="text-sm text-red-500 line-through">
                  {formattedPrice} VNĐ
                </p>
              )}
              <div className="absolute h-full border-l border-grayWhite top-0 left-[50%]"></div>
            </div>
          </div>
          <>
            <hr className="" />
            <div className="w-full flex items-center justify-center relative gap-5 transition-opacity duration-300 ease-in-out">
              {status === 'Active' && quantity > 0 ? (
                <>
                  <div className="w-full m-5">
                    <button
                      className="font-RobotoMedium w-full bg-white text-primary border-primary hover:bg-primary border-[1px] p-2 rounded-md shadow-md hover:text-white transition duration-300 ease-in-out"
                      onClick={() => handleAddToCart()}
                    >
                      Thêm Vào Giỏ
                    </button>
                  </div>

                  <div className="w-full m-5">
                    <button
                      onClick={handleBuyNow}
                      className="font-RobotoMedium w-full bg-white text-main border-main hover:bg-main border-[1px] p-2 rounded-md shadow-md hover:text-white transition duration-300 ease-in-out"
                    >
                      Mua Ngay
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="w-full m-5">
                    <button
                      className="font-RobotoMedium w-full bg-gray-200 text-gray-500 border-gray-300 p-2 rounded-md shadow-md cursor-not-allowed"
                      disabled
                    >
                      Thêm Vào Giỏ
                    </button>
                  </div>

                  <div className="w-full m-5">
                    <button
                      className="font-RobotoMedium w-full bg-gray-200 text-gray-500 border-gray-300 p-2 rounded-md shadow-md cursor-not-allowed"
                      disabled
                    >
                      Mua Ngay
                    </button>
                  </div>
                </>
              )}
            </div>
          </>
        </div>
      </div>
    </div>
  )
}

CardProductItem.propTypes = {
  product: PropTypes.object.isRequired
}

export default CardProductItem
