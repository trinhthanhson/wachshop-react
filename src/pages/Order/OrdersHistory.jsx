import { useEffect, useState } from 'react'
import OrderItem from '../../components/Order/OrderItem'
import { getCustomerOrdersRequest } from '../../redux/actions/actions'
import { useDispatch, useSelector } from 'react-redux'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { sortByDate } from '../../utils/sort'

const OrdersHistory = () => {
  const dispatch = useDispatch()
  const customerOrders = useSelector(
    (state) => state.customerOrders.customerOrders
  )
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [status, setStatus] = useState(null)
  const [totalPrice, setTotalPrice] = useState(0)
  const [filteredOrders, setFilteredOrders] = useState([])

  useEffect(() => {
    dispatch(getCustomerOrdersRequest())
  }, [dispatch])

  useEffect(() => {
    if (customerOrders.data) {
      const sortedOrders = sortByDate(customerOrders.data, 'create_at')

      const filtered = sortedOrders.filter((order) => {
        const orderDate = new Date(order.create_at).getTime()
        const startDateTimestamp = startDate ? startDate.getTime() : null
        const endDateTimestamp = endDate ? endDate.getTime() : null

        if (startDateTimestamp && orderDate < startDateTimestamp) {
          return false
        }

        if (endDateTimestamp && orderDate > endDateTimestamp) {
          return false
        }

        if (status && order.status !== status) {
          return false
        }
        return true
      })

      setFilteredOrders(filtered || [])

      const total = filtered
        ? filtered.reduce((acc, order) => acc + order.total_price, 0)
        : 0
      setTotalPrice(total)
    }
  }, [customerOrders.data, startDate, endDate, status])

  const handleReset = () => {
    setStartDate(null)
    setEndDate(null)
    setStatus(null)
  }

  return (
    <>
      <section className="relative flex flex-col-reverse md:flex-row items-center bg-[url('https://www.highlandscoffee.com.vn/vnt_upload/cake/SPECIALTYCOFFEE/Untitled-1-01.png')]">
        <div className="relative md:w-full pt-[80px]">
          <div className="py-[40px] px-7 lg:px-14 md:py-14 w-full">
            <h1 className="uppercase text-center sm:text-left font-RobotoSemibold text-main text-3xl md:text-3xl xl:text-[3rem] mb-5 mt-0 sm:mt-5 md:leading-tight">
              Lịch Sử Đơn Hàng
            </h1>
          </div>
        </div>
      </section>

      <section className="mt-[80px] mb-[20px] md:mt-[100px] md:mb-[100px] px-4">
        <div className="flex py-5 flex-col sm:flex-row justify-start sm:justify-between items-center lg:w-10/12 mx-auto">
          <div className="p-2 flex items-center justify-center gap-2">
            <label>Ngày bắt đầu</label>
            <DatePicker
              className="text-center p-[3px] rounded-md border-primary border-[1px]"
              selected={startDate}
              onChange={(date) => setStartDate(date)}
            />
          </div>

          <div className="p-2 flex items-center justify-center gap-2">
            <label>Ngày kết thúc</label>
            <DatePicker
              className="text-center p-[3px] rounded-md border-primary border-[1px]"
              selected={endDate}
              onChange={(date) => setEndDate(date)}
            />
          </div>

          <div className="p-2 flex items-center justify-center gap-2">
            <label>Trạng thái</label>
            <select
              className="p-[3px] rounded-md border-primary border-[1px] text-center"
              value={status || ''}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="">Tất cả</option>
              <option value="0">Chờ xác nhận</option>
              <option value="1">Đã xác nhận</option>
              <option value="2">Đang vận chuyển</option>
              <option value="3">Chờ thanh toán</option>
              <option value="4">Đã thanh toán</option>
              <option value="5">Đã giao</option>
              <option value="6">Đã huỷ</option>
            </select>
          </div>

          <div className="p-2">
            <button
              onClick={() => handleReset()}
              className="text-[14px] bg-primary text-white rounded-md shadow-md uppercase px-5 py-[7px] font-RobotoMedium hover:bg-hoverPrimary transition duration-200 ease-in-out"
            >
              Reset filter
            </button>
          </div>
        </div>

        <div className="w-full lg:px-32 relative my-10">
          <div className="space-y-3">
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order, index) => (
                <OrderItem key={index} order={order} />
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
                KHÔNG CÓ ĐƠN HÀNG NÀO
              </p>
            )}
          </div>
        </div>

        <div className="ml-[8%] flex py-3 justify-between font-RobotoMedium lg:w-10/12">
          <div className="text-primary rounded-md p-2">
            Số đơn hàng: {filteredOrders ? filteredOrders.length : 0}
          </div>
          <div className="text-primary rounded-md p-2">
            Tổng: {totalPrice.toLocaleString('en')} VNĐ
          </div>
        </div>
      </section>
    </>
  )
}

export default OrdersHistory
