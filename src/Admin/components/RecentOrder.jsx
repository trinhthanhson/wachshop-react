import { getOrderStatus } from '../../constants/Status'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getAllOrdersRequest } from '../../redux/actions/actions'
import { sortByDate } from '../../utils/sort'
import { useNavigate } from 'react-router-dom'

const RecentOrder = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const orders = useSelector((state) => state.orders.orders)

  useEffect(() => {
    try {
      dispatch(getAllOrdersRequest())
    } catch (error) {
      console.error('Error dispatch', error)
    }
  }, [dispatch])

  return (
    <div className="bg-white px-4 pt-3 pb-4 rounded-md border border-gray-200 flex-1">
      <div className="flex justify-between">
        <strong className="text-sub font-semibold">Đơn hàng gần đây</strong>

        <p
          onClick={() => navigate('/manager/orders')}
          className="cursor-pointer text-sky-600 hover:underline text-[14px] font-semibold"
        >
          More
        </p>
      </div>
      <div className="mt-3">
        <table className="w-full text-gray-700">
          <thead className="text-white font-medium bg-primary">
            <tr
              className="bg-primary"
              style={{
                backgroundColor: 'rgb(171, 171, 171)',
                color: 'rgba(0, 0, 0, 0.8)'
              }}
            >
              <td className="rounded-s-md">STT</td>
              <td>Hình ảnh</td>
              <td>Tên sản phẩm</td>
              <td>Tổng giá</td>
              <td>Ngày đặt</td>
              <td className="rounded-e-md">Trạng thái</td>
            </tr>
          </thead>
          <tbody>
            {orders?.data &&
              sortByDate(orders?.data, 'create_at')
                .slice(0, 3)
                .map((order, index) => (
                  <tr
                    key={index}
                    className="cursor-pointer"
                    onClick={() => navigate(`/manager/order/${order.order_id}`)}
                  >
                    <td>{index + 1}</td>
                    <td className="flex items-center">
                      {[
                        ...new Map(
                          order.orderDetails.map((item) => [
                            item.product.image,
                            item
                          ])
                        ).values()
                      ].map((uniqueItem, index) => (
                        <img
                          key={index}
                          className="w-[60px] mt-[2px] rounded-full shadow-md mr-2"
                          src={uniqueItem.product && uniqueItem.product.image}
                          alt={
                            uniqueItem.product &&
                            uniqueItem.product.product_name
                          }
                        />
                      ))}
                    </td>
                    <td>
                      {order.orderDetails.map((item, index) => (
                        <div key={index}>
                          {item.product && item.product.product_name}
                        </div>
                      ))}
                    </td>
                    <td>{order.total_price.toLocaleString('en')} VND</td>
                    <td>{new Date(order.created_at).toLocaleDateString()}</td>
                    <td>{getOrderStatus(order.status)}</td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default RecentOrder
