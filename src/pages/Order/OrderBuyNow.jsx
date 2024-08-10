import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const OrderBuyNow = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { product, quantity, price } = location.state || {}
  console.log(price)
  const [address, setAddress] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [recipientName, setRecipientName] = useState('')
  const [recipientPhone, setRecipientPhone] = useState('')
  const [shippingAddress, setShippingAddress] = useState('')
  const [note, setNote] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const [errors, setErrors] = useState({
    recipientName: '',
    recipientPhone: '',
    shippingAddress: ''
  })
  if (!product) {
    return <div>No product selected for buying now.</div>
  }

  const token = localStorage.getItem('token')

  // Calculate total price
  const totalPrice = quantity * price

  const handleOpenModal = () => setIsModalOpen(true)
  const handleCloseModal = () => setIsModalOpen(false)

  const handleAddressSave = () => {
    let hasError = false
    const newErrors = {
      recipientName: '',
      recipientPhone: '',
      shippingAddress: ''
    }

    if (!recipientName) {
      newErrors.recipientName = 'Recipient name is required.'
      hasError = true
    }

    if (!shippingAddress) {
      newErrors.shippingAddress = 'Shipping address is required.'
      hasError = true
    }

    if (!recipientPhone) {
      newErrors.recipientPhone = 'Recipient phone is required.'
      hasError = true
    }

    if (hasError) {
      setErrors(newErrors)
      return
    }
    // Clear errors and set address
    setErrors({
      recipientName: '',
      recipientPhone: '',
      shippingAddress: ''
    })
    setAddress(`${recipientName}, ${recipientPhone}, ${shippingAddress}`)
    setError(null)

    handleCloseModal()
  }

  const handleOrder = async () => {
    if (!address) {
      setError('Please enter a shipping address.')
      return
    }

    setLoading(true)
    setError(null)
    setSuccess(null)

    try {
      const response = await fetch(
        'http://localhost:9999/api/customer/order/buy-now',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            product_id: product.product_id,
            quantity,
            price,
            address,
            recipient_name: recipientName,
            note,
            recipient_phone: recipientPhone
          })
        }
      )

      if (!response.ok) {
        throw new Error('Failed to place order')
      }

      const data = await response.json()
      if (data.code === 201) {
        navigate(`/orders-history`)
        setSuccess('Order placed successfully!')
      } else {
        setSuccess('Order placed failed!')
      }
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }
  const handlePayNow = async () => {
    if (!address) {
      setError('Please enter a shipping address.')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const response = await fetch(
        'http://localhost:9999/api/customer/payment/submit',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            product_id: product.product_id,
            quantity,
            price,
            address,
            recipient_name: recipientName,
            note,
            recipient_phone: recipientPhone
          })
        }
      )

      if (!response.ok) {
        throw new Error('Failed to initiate payment')
      }

      const data = await response.json()
      console.log(data.message)
      if (data.message) {
        // Chuyển hướng người dùng đến URL thanh toán
        window.location.href = data.message
      } else {
        setError('Failed to retrieve payment URL')
      }
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const isFormComplete = recipientName && recipientPhone && shippingAddress

  return (
    <div className="flex flex-col justify-center items-center min-h-screen p-5 bg-gray-100">
      <div
        className="w-full h-full bg-white border border-gray-200 p-5 rounded-lg shadow-lg"
        style={{ marginTop: '50px' }}
      >
        {error && (
          <p className=" mt-4" style={{ color: 'red' }}>
            {error}
          </p>
        )}
        <h1 className="text-2xl font-bold mb-4">MUA NGAY</h1>

        <div className="flex items-center mt-5">
          <input
            type="text"
            value={address}
            readOnly
            placeholder="Nhập thông tin giao hàng"
            className="border border-gray-300 p-2 rounded mr-2 w-[1000px]"
          />
          <button
            className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={handleOpenModal}
          >
            Nhập thông tin giao hàng
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 border-t border-gray-300">
          {/* Headers Row */}
          <div className="flex justify-center items-center border-b border-gray-300 p-2 font-semibold">
            Image
          </div>
          <div className="flex justify-center items-center border-b border-gray-300 p-2 font-semibold">
            Product Name
          </div>
          <div className="flex justify-center items-center border-b border-gray-300 p-2 font-semibold">
            Quantity
          </div>
          <div className="flex justify-center items-center border-b border-gray-300 p-2 font-semibold">
            Price
          </div>
          <div className="flex justify-center items-center border-b border-gray-300 p-2 font-semibold">
            Total Price
          </div>

          {/* Data Row */}
          <div className="flex justify-center items-center border-b border-r border-gray-300 p-2">
            <img
              src={product.image}
              alt={product.product_name}
              className="w-48 h-48 object-cover rounded-lg border border-gray-200 w-[400px]"
            />
          </div>
          <div className="flex items-center border-b border-r border-gray-300 p-2">
            <span>{product.product_name}</span>
          </div>
          <div className="flex items-center border-b border-r border-gray-300 p-2 justify-center">
            <span>{quantity}</span>
          </div>
          <div className="flex items-center border-b border-r border-gray-300 p-2 justify-center">
            <span>{price.toLocaleString('en')} VNĐ</span>
          </div>
          <div className="flex items-center border-b p-2 justify-center">
            <span>{totalPrice.toLocaleString('en')} VNĐ</span>
          </div>
        </div>
        <div className="flex mt-5 space-x-4">
          <button
            className={`p-2 rounded ${isFormComplete ? 'bg-green' : 'bg-gray'} text-white hover:bg-green`}
            onClick={handleOrder}
            disabled={!isFormComplete}
            style={{ marginTop: '20px' }}
          >
            {loading ? 'Placing order...' : 'Đặt hàng'}
          </button>
          <button
            className={`p-2 rounded ${isFormComplete ? 'bg-green' : 'bg-gray'} text-white hover:bg-green`}
            onClick={handlePayNow}
            disabled={!isFormComplete}
            style={{ marginTop: '20px' }}
          >
            Pay Now
          </button>
        </div>
        {success && <p className="text-green-500 mt-4">{success}</p>}

        {/* Address Modal */}
        {/* Address Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50">
            <div
              className="bg-white border border-gray-200 p-5 rounded-lg shadow-lg w-80"
              style={{ width: 600 }}
            >
              <h2 className="text-xl font-bold mb-4">
                Nhập thông tin giao hàng
              </h2>
              <div className="mb-4">
                <label className="block mb-2 font-semibold">
                  Tên người nhận
                </label>
                <input
                  type="text"
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  className="border border-gray-300 p-2 rounded w-full"
                />
                {errors.recipientName && (
                  <p className="text-red mt-1">{errors.recipientName}</p>
                )}
              </div>
              <div className="mb-4">
                <label className="block mb-2 font-semibold">Địa chỉ</label>
                <input
                  type="text"
                  value={shippingAddress}
                  onChange={(e) => setShippingAddress(e.target.value)}
                  className="border border-gray-300 p-2 rounded w-full"
                />
                {errors.shippingAddress && (
                  <p className="text-red mt-1">{errors.shippingAddress}</p>
                )}
              </div>
              <div className="mb-4">
                <label className="block mb-2 font-semibold">
                  Số điện thoại người nhận
                </label>
                <input
                  type="number"
                  value={recipientPhone}
                  onChange={(e) => setRecipientPhone(e.target.value)}
                  className="border border-gray-300 p-2 rounded w-full"
                />
                {errors.recipientPhone && (
                  <p className="text-red">{errors.recipientPhone}</p>
                )}
              </div>
              <div className="mb-4">
                <label className="block mb-2 font-semibold">Note</label>
                <input
                  type="text"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="border border-gray-300 p-2 rounded w-full"
                />
              </div>

              <div className="flex justify-end">
                <button
                  className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2"
                  style={{ marginTop: 10 }}
                  onClick={handleAddressSave}
                >
                  Save
                </button>
                <button
                  className="p-2 bg-gray-300 text-black rounded hover:bg-gray-400"
                  style={{ marginTop: 10 }}
                  onClick={handleCloseModal}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default OrderBuyNow
