import { useParams, useNavigate } from 'react-router-dom'
import CardProductSimilar from '../../components/Products/CardProductSimilar'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import {
  addCartRequest,
  getAllProductsCustomerRequest,
  getAllCouponsRequest,
  getReviewProductRequest
} from '../../redux/actions/actions'
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa'

const ProductDetail = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const [quantity, setQuantity] = useState(1)
  const [discountedPrice, setDiscountedPrice] = useState(null)
  const navigate = useNavigate()
  const [priceDiscount, setPriceDiscount] = useState(null)
  const productsCustomer = useSelector(
    (state) => state.productsCustomer.productsCustomer.data
  )
  const coupons = useSelector((state) => state.coupons.coupons.data)
  const reviews = useSelector((state) => state.reviewProduct?.reviews)
  console.log(reviews)
  const selectedProduct = productsCustomer
    ? productsCustomer.find((item) => item.product_id === id)
    : null
  const currentProduct = productsCustomer
    ? productsCustomer.filter((item) => item.product_id !== id)
    : []

  useEffect(() => {
    dispatch(getAllProductsCustomerRequest())
    dispatch(getAllCouponsRequest())
    dispatch(getReviewProductRequest(id)) // Thêm dòng này
  }, [dispatch, id])

  useEffect(() => {
    if (selectedProduct && Array.isArray(coupons) && coupons.length > 0) {
      const now = new Date()

      const validCoupon = coupons.find((coupon) => {
        const startDate = new Date(coupon.start_date)
        const endDate = new Date(coupon.end_date)
        return now >= startDate && now <= endDate
      })

      if (validCoupon && validCoupon.couponDetails.length > 0) {
        const activeCouponDetails = validCoupon.couponDetails.filter(
          (detail) =>
            detail.status === 'Active' &&
            detail.product_id === selectedProduct.product_id
        )

        if (activeCouponDetails.length > 0) {
          const maxPercent = Math.max(
            ...activeCouponDetails.map(
              (detail) => parseFloat(detail.percent) || 0
            )
          )

          const price = selectedProduct.priceUpdateDetails[0]?.price_new || 0
          const discountAmount = price * maxPercent
          const newPrice = price - discountAmount
          setDiscountedPrice(Math.ceil(newPrice).toLocaleString('en'))
          setPriceDiscount(Math.ceil(newPrice))
        }
      }
    }
  }, [coupons, selectedProduct])

  const handleAddToCart = () => {
    dispatch(
      addCartRequest({
        product_name: `${selectedProduct?.product_name}`,
        price: priceDiscount || selectedProduct.priceUpdateDetails[0].price_new,
        quantity: quantity
      })
    )
  }

  const handleQuantityChange = (event) => {
    let value = parseInt(event.target.value, 10)

    // Kiểm tra nếu giá trị là số hợp lệ và trong phạm vi cho phép
    if (!isNaN(value) && value >= 1 && value <= selectedProduct?.quantity) {
      setQuantity(value)
    } else if (value > selectedProduct?.quantity) {
      setQuantity(selectedProduct?.quantity) // Đặt giá trị tối đa nếu vượt quá giới hạn
    } else {
      setQuantity(1) // Đặt giá trị tối thiểu nếu nhỏ hơn 1
    }
  }
  const handleBuyNow = () => {
    navigate('/buynow', {
      state: {
        product: selectedProduct,
        quantity: quantity,
        price: priceDiscount || selectedProduct.priceUpdateDetails[0]?.price_new
      }
    })
  }
  const calculateAverageRating = () => {
    if (reviews?.data.length === 0) return 0
    const totalRating = reviews?.data.reduce(
      (sum, review) => sum + review.star,
      0
    )
    return (totalRating / reviews?.data.length).toFixed(1)
  }
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating)
    const halfStar = rating % 1 !== 0
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0)

    return (
      <>
        {Array(fullStars)
          .fill()
          .map((_, index) => (
            <FaStar key={`full-${index}`} className="text-primary" />
          ))}
        {halfStar && <FaStarHalfAlt className="text-primary" />}
        {Array(emptyStars)
          .fill()
          .map((_, index) => (
            <FaRegStar key={`empty-${index}`} className="text-primary" />
          ))}
      </>
    )
  }

  return (
    <div className="pt-[120px]">
      <section className="pt-[0] pb-[30px] w-full">
        <div className="border border-grey mx-auto flex flex-wrap rounded-lg shadow-xl bg-white items-center relative max-w-[80%]">
          <div className="w-full lg:w-[40%] xl:w-[50%] h-[50%]">
            <div className="w-[350px] h-[350px] md:pt-[20px] md:ml-12">
              <img
                className="w-full object-cover object-center h-[270px] sm:h-[350px] lg:h-full p-0 sm:ml-[80px]"
                src={selectedProduct?.image}
                alt="image-product"
              />
            </div>
          </div>
          <div className="w-full lg:w-[60%] xl:w-[50%] h-full flex">
            <div className="flex flex-col justify-between 3xl:justify-center items-start p-5 lg:p-10 w-full">
              <h1 className="leading-tight font-RobotoMedium text-primary text-3xl md:text-4xl lg:text-[26px] 3xl:text-[35px] mb-[10px] 3xl:mb-3">
                {selectedProduct?.product_name}
              </h1>
              <hr className="mb-5 w-full" />
              <div className="grid grid-cols-12 items-center justify-between w-full mb-5">
                <div className="col-span-12 sm:col-span-6 mb-2 sm:mb-0 pr-[10px] mr-[10px]">
                  <p className="font-serif text-sub text-[18px] 3xl:text-[17px]">
                    Giá
                  </p>
                  <p className="text-main font-RobotoMedium text-[18px] lg:text-[17px] 3xl:text-[20px]">
                    {discountedPrice
                      ? `${discountedPrice} VNĐ`
                      : `${selectedProduct?.priceUpdateDetails[0]?.price_new.toLocaleString('en')} VNĐ`}
                  </p>
                  {discountedPrice && (
                    <p className="text-sm text-red-500 line-through">
                      {selectedProduct?.priceUpdateDetails[0]?.price_new.toLocaleString(
                        'en'
                      )}{' '}
                      VNĐ
                    </p>
                  )}
                </div>
                <div className="col-span-12 sm:col-span-6 mb-2 sm:mb-0 pr-[10px] mr-[10px]">
                  <p className="font-serif text-sub text-[18px] 3xl:text-[17px]">
                    Loại
                  </p>
                  <p className="text-main font-RobotoMedium text-[18px] lg:text-[17px] 3xl:text-[20px]">
                    {selectedProduct?.category?.category_name}
                  </p>
                </div>
                <div className="col-span-12 sm:col-span-6 mb-2 sm:mb-0 pr-[10px] mr-[10px]  mt-[20px]">
                  <p className="font-serif text-sub text-[18px] 3xl:text-[17px]">
                    Hãng
                  </p>
                  <p className="text-main font-RobotoMedium text-[18px] lg:text-[17px] 3xl:text-[20px]">
                    {selectedProduct?.brand?.brand_name}
                  </p>
                </div>
              </div>
              <hr className="mb-5 w-full" />
              {selectedProduct?.description && (
                <>
                  <hr className="mb-5 w-full" />
                  <div className="w-full mb-5">
                    <div>
                      <p className="font-medium text-[14px] text-justify text-primary">
                        {selectedProduct?.description}
                      </p>
                    </div>
                  </div>
                </>
              )}
              <hr className="mb-5 w-full" />

              <div className="mb-5 w-full">
                <label
                  htmlFor="quantity"
                  className="font-serif text-sub text-[18px] 3xl:text-[17px]"
                >
                  Số lượng
                </label>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  min="1"
                  max={selectedProduct?.quantity}
                  value={quantity}
                  onChange={handleQuantityChange}
                  className="w-[10%] mt-2 p-2 border border-grey rounded-lg "
                  style={{ marginLeft: '20px' }}
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4 items-center sm:justify-between w-full">
                {selectedProduct?.status === 'Inactive' ? (
                  <button
                    disabled
                    className="w-full p-3 text-center bg-gray-300 text-gray-700 border border-gray-300 rounded-lg cursor-not-allowed"
                  >
                    Ngưng Bán
                  </button>
                ) : selectedProduct?.quantity > 0 ? (
                  <>
                    <div className="w-full">
                      <div className="flex justify-center items-center p-3 text-center border border-grey text-primary hover:text-white hover:bg-primary hover:border-none rounded-lg">
                        <button
                          onClick={handleAddToCart}
                          className="font-serif text-[16px] lg:text-[17px] sm:text-lg text-inherit 3xl:text-[20px]"
                        >
                          Thêm Vào Giỏ
                        </button>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className={`ml-1 w-4 h-4 sm:ml-2 sm:w-5 sm:h-5`}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
                          />
                        </svg>
                      </div>
                    </div>

                    <div className="w-full">
                      <a className="block">
                        <div
                          onClick={handleBuyNow}
                          className="font-serif rounded-lg p-3 text-center border border-grey bg-primary text-white hover:bg-[#271A15] hover:text-white"
                        >
                          <p className="text-[16px] lg:text-[17px] sm:text-lg text-inherit 3xl:text-[20px] hover:border-none">
                            Mua Ngay
                          </p>
                        </div>
                      </a>
                    </div>
                  </>
                ) : (
                  <div
                    className="w-full p-3 text-center text-red-500 bg-red-100 border border-red-500 rounded-lg"
                    style={{ marginLeft: '180px', backgroundColor: '#ecaaaa' }}
                  >
                    <p className="text-[16px] lg:text-[17px] sm:text-lg 3xl:text-[20px]">
                      Đã hết hàng
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="pt-[0] pb-[30px] w-full">
        <div className="border border-grey mx-auto flex flex-wrap rounded-lg shadow-xl bg-white items-center relative max-w-[80%]">
          <div className="w-full">
            <div className="p-5">
              <div className="flex items-center mb-5">
                <h2 className="text-primary text-2xl flex items-center">
                  Reviews ({calculateAverageRating()} / 5)
                </h2>
                <FaStar
                  className="ml-1 text-yellow-500"
                  style={{ marginTop: '0.1em' }}
                />
              </div>
              {reviews?.data?.length > 0 ? (
                reviews?.data.slice(0, 10).map((review, index) => (
                  <div
                    key={index}
                    className="mb-5 flex justify-between items-center border-b border-grey pb-3"
                  >
                    <p className="text-main text-lg font-medium">
                      {review.review_created.first_name +
                        ' ' +
                        review.review_created.last_name}
                    </p>
                    <p className="text-sub text-md">{review.content}</p>
                    <div className="text-primary text-sm flex items-center">
                      {renderStars(review.star)}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-main text-lg">No reviews yet.</p>
              )}
            </div>
          </div>
        </div>
      </section>
      <section className="pt-[30px] pb-[50px] bg-gray-100 w-full">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-primary mb-6">
            Thông Tin Chi Tiết
          </h2>
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 md:col-span-6">
              <h3 className="text-xl font-semibold text-primary mb-2">
                Chi tiết sản phẩm
              </h3>
              <p className="text-justify text-justify font-semibold text-primary mb-2">
                Công nghệ: {selectedProduct?.technology}
              </p>
              <p className="text-justify text-justify font-semibold text-primary mb-2">
                Kính: {selectedProduct?.glass}
              </p>
              <p className="text-justify text-justify font-semibold text-primary mb-2">
                Chức năng: {selectedProduct?.func}
              </p>
              <p className="text-justify text-justify font-semibold text-primary mb-2">
                Màu sắc: {selectedProduct?.color}
              </p>
              <p className="text-justify text-justify font-semibold text-primary mb-2">
                Loại máy: {selectedProduct?.machine}
              </p>
              <p className="text-justify text-justify font-semibold text-primary mb-2">
                Giới tính: {selectedProduct?.sex}
              </p>
              <p className="text-justify text-justify font-semibold text-primary mb-2">
                Độ chính xác: {selectedProduct?.accuracy}
              </p>
              <p className="text-justify text-justify font-semibold text-primary mb-2">
                Tuổi thọ pin: {selectedProduct?.battery_life}
              </p>
              <p className="text-justify text-justify font-semibold text-primary mb-2">
                Khả năng chống nước: {selectedProduct?.water_resistance}
              </p>
              <p className="text-justify text-justify font-semibold text-primary mb-2">
                Trọng lương: {selectedProduct?.weight}
              </p>
              <p className="text-justify text-justify font-semibold text-primary mb-2">
                Các tính năng khác: {selectedProduct?.other_features}
              </p>
            </div>
            <div className="col-span-12 md:col-span-6">
              <h3 className="text-xl font-semibold text-primary mb-2">Mô tả</h3>
              <p className="text-justify font-semibold text-primary mb-2">
                {selectedProduct?.detail}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative bg-white py-[50px] md:py-[80px]">
        <div className="container mx-auto">
          <div className="w-full mb-10">
            <h1 className="leading-tight text-3xl md:text-4xl lg:text-5xl xl:text-[3rem] 3xl:text-[3.2rem] text-primary text-center font-RobotoMedium title relative pb-6 w-full md:w-2/3 mx-auto">
              Sản Phẩm Tương Tự
            </h1>
          </div>
          <div className="w-full md:w-[80%] lg:w-[90%] 3xl:w-[85%] max-w-[90%] mx-auto md:grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {currentProduct.slice(0, 10).map((item) => (
              <CardProductSimilar key={item.product_id} product={item} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default ProductDetail
