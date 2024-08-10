import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { addCouponRequest } from '../../redux/actions/actions'

const CreateCoupon = () => {
  const dispatch = useDispatch()
  const message = useSelector((state) => state.addCoupon)
  const [formData, setFormData] = useState({
    data: {
      content: '',
      type: '',
      start_date: '',
      end_date: '',
      percent: 0
    }
  })
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      data: { ...formData.data, [e.target.name]: e.target.value }
    })
  }

  const handleStartDateChange = (date) => {
    setFormData({ ...formData, data: { ...formData.data, start_date: date } })
  }

  const handleEndDateChange = (date) => {
    setFormData({ ...formData, data: { ...formData.data, end_date: date } })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const couponData = {
      content: formData.data.content,
      start_date: formData.data.start_date,
      end_date: formData.data.end_date,
      percent: formData.data.percent
    }
    dispatch(addCouponRequest(couponData))
  }
  useEffect(() => {
    if (message.code === 201) {
      setFormData({
        data: {
          content: '',
          start_date: '',
          end_date: '',
          percent: 0
        }
      })
      navigate('/manager/coupons')
    }
  }, [message, navigate])

  return (
    <>
      <div className="flex flex-col justify-center items-center ml-[18%]">
        <div className="flex mt-2 justify-center items-center">
          <h2 className="text-main font-RobotoSemibold text-[20px] uppercase">
            Tạo mã giảm giá
          </h2>
        </div>
        <div className="w-[50%] p-2 rounded-md shadow-md bg-white text-primary mt-5">
          <form
            className="flex flex-col p-5 text-primary gap-5"
            onSubmit={handleSubmit}
          >
            <div className="relative">
              <input
                type="file"
                name="file"
                accept=".jpg, .jpeg, .png"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                onChange={handleChange}
              />
            </div>
            <div className="flex justify-between">
              <div className="flex-1">
                <label className="text-[14px] block font-bold">Title:</label>
                <input
                  className="border-b-2"
                  name="title"
                  onChange={handleChange}
                  style={{ marginTop: '20px' }}
                />
              </div>
              <div className="flex-1">
                <label className="text-[14px] block font-bold">
                  percent(%):
                </label>
                <input
                  className="border-b-2"
                  name="percent"
                  type="number"
                  onChange={handleChange}
                  style={{ marginTop: '20px' }}
                />
              </div>
            </div>
            <div className="flex justify-between">
              <div className="flex-1 items-center justify-center">
                <label>Ngày bắt đầu</label>
                <DatePicker
                  selected={formData.data.start_date}
                  onChange={handleStartDateChange}
                  className="text-center mt-4 p-[3px] rounded-md border-primary border-[1px] mr-20"
                />
              </div>

              <div className="flex-1 items-center justify-center">
                <label>Ngày kết thúc</label>
                <DatePicker
                  selected={formData.data.end_date}
                  onChange={handleEndDateChange}
                  className="text-center mt-4 p-[3px] rounded-md border-primary border-[1px] mr-20"
                />
              </div>
            </div>
            <div className="flex-1">
              <label className="text-[14px] block font-bold">Content:</label>
              <textarea
                className="border-b-2"
                name="content"
                onChange={handleChange}
                style={{ marginTop: '20px', width: '700px', height: '100px' }}
              />
            </div>
            <div className="flex justify-center">
              <button
                className="w-[40%] bg-primary text-white rounded-md shadow-md py-3 uppercase font-RobotoMedium"
                type="submit"
                style={{ marginRight: '100px' }}
              >
                Tạo mã giảm giá
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default CreateCoupon
