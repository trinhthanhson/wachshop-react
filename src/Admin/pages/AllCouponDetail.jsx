import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCouponDetailRequest } from '../../redux/actions/actions'
import { MdDelete } from 'react-icons/md'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { getStatus } from '../../constants/Status'

const AllCouponDetail = () => {
  const dispatch = useDispatch()
  const coupondetail = useSelector((state) => state.coupondetail.coupondetail)
  const { id } = useParams() // Lấy id từ URL parameters
  useEffect(() => {
    try {
      dispatch(getAllCouponDetailRequest(id)) // Truyền id vào action creator
    } catch (error) {
      console.error('Error dispatch', error)
    }
  }, [dispatch, id]) // Thêm id vào dependency array
  const handleDeleteCoupon = async (couponId, status) => {
    const token = localStorage.getItem('token') // Lấy token từ localStorage
    const confirmDelete = window.confirm('Bạn muốn thay đổi trạng thái?')
    if (confirmDelete) {
      try {
        await axios.put(
          `http://localhost:9999/api/staff/coupon/${couponId}/delete`,
          {
            status: status
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json' // Đảm bảo định dạng JSON
            }
          }
        )
        alert('Thay đổi thành công')
        dispatch(getAllCouponDetailRequest(id)) // Refresh the coupon list after deletion
      } catch (error) {
        alert('Error deleting coupon. Please try again.')
      }
    }
  }
  return (
    <>
      <div className="flex flex-col gap-4 w-[80%] ml-[18%] rounded-md shadow-md bg-white mt-5">
        <table className="w-full text-gray-700">
          <thead className="text-white font-RobotoSemibold text-[18px] ">
            <tr className="bg-primary">
              <td className="rounded-s-md">ID</td>
              <td>Ảnh</td>
              <td>Tên sản phẩm</td>
              <td>Giá sản phẩm</td>
              <td>Giá đã giảm</td>
              <td>Trạng thái</td>
              <td className="rounded-e-md">Action</td>
            </tr>
          </thead>
          <tbody>
            {coupondetail &&
              coupondetail.map((coupondetail) => (
                <tr key={coupondetail.coupon_id}>
                  <td>{coupondetail?.coupon_id}</td>
                  <td>
                    <img
                      src={
                        coupondetail?.product?.image ||
                        'https://firebasestorage.googleapis.com/v0/b/watch-shop-3a14f.appspot.com/o/images%2Flogo.png?alt=media&token=ff560732-bd5c-43d0-9271-7bcd3d9204ea'
                      }
                      alt={coupondetail?.type}
                      className="w-[68px] object-contain rounded-md bg-primary"
                    />
                  </td>
                  <td>{coupondetail?.product?.product_name}</td>
                  <td>
                    {coupondetail?.product?.priceUpdateDetails[0].price_new}
                  </td>
                  <td>
                    {Math.ceil(
                      coupondetail?.product?.priceUpdateDetails[0].price_new -
                        coupondetail?.product?.priceUpdateDetails[0].price_new *
                          coupondetail?.percent
                    ).toLocaleString('en')}
                  </td>
                  <td>{getStatus(coupondetail?.status)}</td>
                  <td>
                    <span>
                      <MdDelete
                        className="cursor-pointer text-primary"
                        fontSize={25}
                        onClick={() =>
                          handleDeleteCoupon(
                            coupondetail?.coupon_detail_id,
                            coupondetail?.status
                          )
                        }
                      />
                    </span>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default AllCouponDetail
