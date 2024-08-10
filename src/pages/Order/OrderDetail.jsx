import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import {
  getAllReviewCustomerRequest,
  getOrderDetailRequest
} from '../../redux/actions/actions'
import axios from 'axios'
//import OrderTraker from '../../components/Order/OrderTraker'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
const OrderDetail = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const orderDetail = useSelector((state) => state.orderDetail.orderDetail)
  const reviews = useSelector((state) => state.reviews.reviews)
  const [showModal, setShowModal] = useState(false)
  const [ratingData, setRatingData] = useState({
    productId: '',
    order_detail_id: '',
    content: '',
    rating: 1
  })

  const handleRateButtonClick = (productId, order_detail_id) => {
    setRatingData((prevData) => ({
      ...prevData,
      productId,
      order_detail_id
    }))
    fetchCurrentReview(order_detail_id) // Fetch the current review
    setShowModal(true)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setRatingData((prevData) => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleStarClick = (rating) => {
    setRatingData((prevData) => ({
      ...prevData,
      rating
    }))
  }
  const handleSubmitRating = async () => {
    try {
      const token = localStorage.getItem('token')
      let response

      if (ratingData.isReviewed) {
        // Update the existing review
        response = await axios.put(
          `http://localhost:9999/api/customer/review/${ratingData.order_detail_id}/update`,
          {
            content: ratingData.content,
            star: ratingData.rating
          },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )
      } else {
        // Add a new review
        response = await axios.post(
          'http://localhost:9999/api/customer/review/add',
          {
            order_detail_id: ratingData.order_detail_id,
            product_id: ratingData.productId,
            content: ratingData.text,
            star: ratingData.rating
          },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )
      }

      console.log('Rating submitted:', response.data)
      dispatch(getOrderDetailRequest(id))
      dispatch(getAllReviewCustomerRequest())
      setShowModal(false)
    } catch (error) {
      console.error('Error submitting rating:', error)
    }
  }

  useEffect(() => {
    try {
      dispatch(getOrderDetailRequest(id))
      dispatch(getAllReviewCustomerRequest())
    } catch (error) {
      console.error('Error dispatch', error)
    }
  }, [dispatch, id])

  const handleCancelOrder = async () => {
    try {
      const token = localStorage.getItem('token')
      axios
        .put(
          `http://localhost:9999/api/customer/order/${id}/status`,
          { status: 6 },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )
        .then(() => {
          dispatch(getOrderDetailRequest(id))
        })
    } catch (error) {
      console.error('Error change order status', error)
    }
  }

  const fetchCurrentReview = async (order_detail_id) => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get(
        `http://localhost:9999/api/customer/review/${order_detail_id}/detail`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      const review = response.data.data
      console.log(review)
      if (review) {
        setRatingData({
          ...ratingData,
          content: review.content,
          rating: review.star,
          productId: review.product_id,
          order_detail_id: review.order_detail_id,
          isReviewed: true // Add a flag to indicate if already reviewed
        })
      } else {
        setRatingData((prevData) => ({
          ...prevData,
          isReviewed: false // No review found
        }))
      }
    } catch (error) {
      console.error('Error fetching review:', error)
    }
  }

  const isReviewed = (orderDetailId) => {
    const reviewsArray = reviews.data // Access the reviews array correctly
    return (
      Array.isArray(reviewsArray) &&
      reviewsArray.some((review) => review.order_detail_id === orderDetailId)
    )
  }

  return (
    <>
      <section className="relative flex flex-col-reverse md:flex-row items-center bg-[url('https://www.highlandscoffee.com.vn/vnt_upload/cake/SPECIALTYCOFFEE/Untitled-1-01.png')]">
        <div className="relative md:w-full pt-[80px]">
          <div className="py-[40px] px-7 lg:px-14 md:py-14 w-full">
            <h1 className="uppercase text-center sm:text-left font-RobotoSemibold text-main text-3xl md:text-3xl xl:text-[3rem] mb-5 mt-0 sm:mt-5 md:leading-tight">
              {/* <OrderTraker activeStep={activeStep} /> */}
            </h1>
          </div>
        </div>
      </section>
      <div className="flex gap-5 mt-8">
        <div className="flex flex-[0.5] gap-4 w-[80%] ml-[6%] rounded-lg shadow-lg bg-white mt-2">
          <div className="w-full ml-5">
            <h5 className="text-left text-lg font-RobotoSemibold text-primary py-3">
              Thông Tin Nhận Hàng
            </h5>
            <p className="p-5">
              <span className="text-primary font-RobotoMedium mr-2">
                Họ Và Tên:
              </span>
              <span className="text-primary font-RobotoSemibold">
                {orderDetail?.recipient_name}
              </span>
            </p>
            <p className="p-5">
              <span className="text-primary font-RobotoMedium mr-2">
                Địa Chỉ Nhận Hàng:
              </span>
              <span className="text-primary font-RobotoSemibold">
                {orderDetail?.address}
              </span>
            </p>
            <p className="p-5">
              <span className="text-primary font-RobotoMedium mr-2">
                Email:
              </span>
              <span className="text-primary font-RobotoSemibold">
                {orderDetail?.customer_created?.email}
              </span>
            </p>
            <p className="p-5">
              <span className="text-primary font-RobotoMedium mr-2">
                Số Điện Thoại:
              </span>
              <span className="text-primary font-RobotoSemibold">
                {orderDetail?.recipient_phone}
              </span>
            </p>
          </div>
        </div>
        <div className="flex-[0.4] w-[80%] ml-[20px] mr-[50px] rounded-md shadow-md bg-white mt-2">
          <div className="ml-5">
            <h5 className="text-left text-lg font-RobotoSemibold text-primary py-3">
              Chi Tiết Hóa Đơn
            </h5>
            <p className="p-5">
              <span className="text-primary font-RobotoMedium mr-2">
                Tổng số lượng:
              </span>
              <span className="text-primary font-RobotoSemibold">
                {orderDetail?.total_quantity}
              </span>
            </p>
            <p className="p-5">
              <span className="text-primary font-RobotoMedium mr-2">
                Tổng tiền:
              </span>
              {orderDetail?.total_price && (
                <span className="text-primary font-RobotoSemibold">
                  {orderDetail.total_price.toLocaleString('en')} VNĐ
                </span>
              )}
            </p>
            <p className="p-5">
              <span className="text-primary font-RobotoMedium mr-2">
                Phí vận chuyển:
              </span>
              <span className="text-primary font-RobotoSemibold">
                {(20000).toLocaleString('en')} VNĐ
              </span>
            </p>
            <p className="p-5">
              <span className="text-primary font-RobotoMedium mr-2">
                Thanh toán:
              </span>
              {orderDetail?.total_price && (
                <span className="text-primary font-RobotoSemibold">
                  {(orderDetail.total_price + 20000).toLocaleString('en')} VNĐ
                </span>
              )}
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4 w-[83%] ml-[6%] rounded-md shadow-md bg-white mt-8">
        <div>
          <table className="w-full text-gray-700 border border-gray-300">
            <thead className="text-white font-RobotoSemibold text-[18px]">
              <tr className="bg-primary">
                <td className="rounded-s-md">STT</td>
                <td>Hình Ảnh</td>
                <td>Sản Phẩm</td>
                <td>Số Lượng</td>
                <td>Đơn Giá</td>
                <td>Ngày Đặt</td>
                {orderDetail?.status === '5' && (
                  <td className="border border-gray-300">Đánh Giá</td>
                )}
              </tr>
            </thead>
            <tbody>
              {orderDetail?.orderDetails &&
                orderDetail.orderDetails.map((orderItem, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td className="flex items-center ">
                      <img
                        className="w-[60px] mt-[2px] rounded-full shadow-md mr-2"
                        src={orderItem?.product.image}
                        alt={orderItem?.product.product_name}
                      />
                    </td>
                    <td>
                      <p>{orderItem?.product.product_name}</p>
                    </td>
                    <td>{orderItem?.quantity}</td>
                    <td>{orderItem.price.toLocaleString('en')} VNĐ</td>
                    <td>
                      {new Date(orderDetail.created_at).toLocaleDateString()}
                    </td>
                    {orderDetail?.status === '5' && (
                      <td>
                        {isReviewed(orderItem.order_detail_id) ? (
                          <button
                            className="bg-blue-500 text-white px-4 py-2 rounded-md border border-gray-300"
                            onClick={() =>
                              handleRateButtonClick(
                                orderItem.product.product_id,
                                orderItem.order_detail_id
                              )
                            }
                          >
                            Xem / Chỉnh sửa
                          </button>
                        ) : (
                          <button
                            className="bg-blue-500 text-white px-4 py-2 rounded-md border border-gray-300"
                            onClick={() =>
                              handleRateButtonClick(
                                orderItem.product.product_id,
                                orderItem.order_detail_id
                              )
                            }
                          >
                            Đánh Giá
                          </button>
                        )}
                      </td>
                    )}
                  </tr>
                ))}
            </tbody>
          </table>

          {showModal && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-6 rounded-md shadow-md w-[600px] relative">
                <button
                  className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                  onClick={() => setShowModal(false)}
                >
                  &times;
                </button>
                <h2 className="text-xl mb-4" style={{ marginLeft: '200px' }}>
                  Đánh giá sản phẩm
                </h2>
                <div className="mb-4">
                  <input
                    type="text"
                    name="order_detail_id"
                    value={ratingData.order_detail_id}
                    readOnly
                    disabled
                    hidden
                    className="border rounded p-2 w-full"
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="text"
                    name="productId"
                    value={ratingData.productId}
                    readOnly
                    disabled
                    hidden
                    className="border rounded p-2 w-full"
                  />
                </div>
                <div className="mb-4">
                  <label>Nội dung đánh giá:</label>
                  <textarea
                    name="content"
                    value={ratingData.content}
                    onChange={handleInputChange}
                    className="border rounded p-2 w-full"
                    rows="4" // Optional: adjust the number of rows to your preference
                  />
                </div>
                <div className="mb-4">
                  <label>Sao:</label>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <FontAwesomeIcon
                        key={star}
                        icon={faStar}
                        className={`cursor-pointer ${
                          ratingData.rating >= star
                            ? 'text-yellow-500'
                            : 'text-gray-300'
                        }`}
                        onClick={() => handleStarClick(star)}
                      />
                    ))}
                  </div>
                </div>
                <div className="flex justify-end">
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded-md mr-2"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-md"
                    onClick={handleSubmitRating}
                  >
                    Đánh giá
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="ml-[5%] w-[80%] flex justify-between my-6">
        <div></div>
        <div className="flex gap-3">
          {orderDetail?.status === '0' && (
            <button
              onClick={() => handleCancelOrder()}
              className="mt-5 bg-main text-white font-RobotoMedium text-[16px] rounded-md p-2 shadow-md hover:bg-hoverRed ease-out duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-r border-none"
            >
              Hủy Đơn Hàng
            </button>
          )}
        </div>
      </div>
    </>
  )
}

export default OrderDetail
