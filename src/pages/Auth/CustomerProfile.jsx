import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserProfileRequest } from '../../redux/actions/actions'
import { getRank } from '../../constants/Rank'
import axios from 'axios'
import { format, parseISO } from 'date-fns'

const CustomerProfile = () => {
  const dispatch = useDispatch()
  const token = localStorage.getItem('token')
  const user = useSelector((state) => state.user.user.data)

  const [isEditing, setIsEditing] = useState(false)
  const [isChangingPassword, setIsChangingPassword] = useState(false)
  const [formData, setFormData] = useState({
    address: '',
    birthday: '',
    citizen_id: '',
    phone: '',
    email: '',
    first_name: '',
    last_name: '',
    tax_id: ''
  })
  const [passwordData, setPasswordData] = useState({
    password: '',
    newPassword: '',
    rePassword: ''
  })

  useEffect(() => {
    dispatch(getUserProfileRequest())
  }, [dispatch])

  useEffect(() => {
    if (user) {
      setFormData({
        address: user.address,
        birthday: user.birthday
          ? format(parseISO(user.birthday), 'yyyy-MM-dd')
          : '',
        phone: user.phone,
        citizen_id: user.citizen_id,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        tax_id: user.tax_id
      })
    }
  }, [user])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handlePasswordChange = (e) => {
    const { name, value } = e.target
    setPasswordData({
      ...passwordData,
      [name]: value
    })
  }

  const handleSave = async () => {
    try {
      const response = await axios.put(
        `http://localhost:9999/api/customer/update-info`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      console.log('Profile updated:', response.data)
      setIsEditing(false)
      dispatch(getUserProfileRequest())
    } catch (error) {
      console.error('Error updating profile:', error)
    }
  }

  const handleChangePassword = async () => {
    if (passwordData.newPassword !== passwordData.rePassword) {
      alert('Mật khẩu mới không khớp.')
      return
    }
    try {
      // eslint-disable-next-line no-unused-vars
      const response = await axios.put(
        `http://localhost:9999/api/user/change-password`,
        passwordData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      alert('Đổi mật khẩu thành công')
      setIsChangingPassword(false)
      setPasswordData({
        password: '',
        newPassword: '',
        rePassword: ''
      })
    } catch (error) {
      alert(error.response.data.message)
    }
  }

  return (
    <>
      <section className="relative flex flex-col-reverse md:flex-row items-center bg-white">
        <div className="relative md:w-[35%]">
          <div className="py-[40px] px-7 lg:px-14 md:py-14 w-full">
            <div className="relative">
              <div className="w-1/2 border-b-[0px] sm:border-b-[1px] sm:border border-primary"></div>
              <div className="absolute top-[-1px] w-[15%] border-b-[0px] sm:border-b-[2px] sm:border-main"></div>
            </div>
            <h1 className="uppercase text-center sm:text-left font-RobotoMedium text-primary hover:text-lightYellow text-3xl md:text-3xl xl:text-[3rem] mb-5 mt-0 sm:mt-5 md:leading-tight cursor-pointer">
              User Profile
            </h1>
          </div>
        </div>
        <div className="relative md:w-[65%]">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/watch-shop-3a14f.appspot.com/o/images%2Fbackground.jpg?alt=media&token=edae71b6-7155-4d79-b78c-636c0a929ce6"
            alt="banner"
            className="w-full object-cover object-bottom h-full lg:h-[400px]"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-white"></div>
        </div>
      </section>

      <section className="relative flex flex-col-reverse md:flex-row items-center bg-white gap-5 p-5 mx-[10%]">
        <div className="relative md:w-[30%] border-primary border-[1px] shadow-lg rounded-xl">
          <div className="flex justify-center">
            <img
              src={
                user?.avatar ||
                'https://png.pngtree.com/png-clipart/20230914/original/pngtree-christmas-corgi-vector-png-image_12160999.png'
              }
              alt="avt-cus"
              className="bg-primary rounded-full w-[150px] absolute -top-[80px]"
            />
            <div className="text-center">
              <h1 className="font-RobotoMedium text-primary text-2xl text-center mt-20">
                {user?.first_name} {user?.last_name}
              </h1>
              <p className="text-primary font-RobotoMedium text-[14px] my-4">
                {user?.user?.role?.role_name}
              </p>
              <p
                className="text-primary font-RobotoMedium text-[14px] my-4"
                style={{ marginLeft: '70px' }}
              >
                {getRank(user?.user?.points)}
              </p>
            </div>
          </div>

          <div className="text-center my-4">
            {!isEditing ? (
              <button
                className="items-center justify-center w-[200px] rounded-md text-primary border-primary border hover:bg-primary hover:text-white py-2.5 px-10 transition-colors"
                onClick={() => setIsEditing(true)}
              >
                Edit Profile
              </button>
            ) : (
              <button
                className="items-center justify-center w-[200px] rounded-md text-primary border-primary border hover:bg-primary hover:text-white py-2.5 px-10 transition-colors"
                onClick={handleSave}
              >
                Save
              </button>
            )}
          </div>
          {!isChangingPassword ? (
            <button
              className="items-center justify-center w-[200px] rounded-md text-primary border-primary border hover:bg-primary hover:text-white py-2.5 px-10 transition-colors ml-[115px]"
              onClick={() => setIsChangingPassword(true)}
            >
              Đổi mật khẩu
            </button>
          ) : (
            <div className="flex flex-col items-center">
              <input
                type="password"
                name="password"
                placeholder="Mật khẩu cũ"
                value={passwordData.password}
                onChange={handlePasswordChange}
                className="mb-2 p-2 border border-grey rounded-lg w-[80%]"
              />
              <input
                type="password"
                name="newPassword"
                placeholder="Mật khẩu mới"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                className="mb-2 p-2 border border-grey rounded-lg w-[80%]"
              />
              <input
                type="password"
                name="rePassword"
                placeholder="Nhập lại mật khẩu mới"
                value={passwordData.rePassword}
                onChange={handlePasswordChange}
                className="mb-2 p-2 border border-grey rounded-lg w-[80%]"
              />
              <button
                className="items-center justify-center w-[200px] rounded-md text-primary border-primary border hover:bg-primary hover:text-white py-2.5 px-10 transition-colors"
                onClick={handleChangePassword}
              >
                Xác nhận
              </button>
            </div>
          )}
        </div>

        <div className="mb-5 relative md:w-[70%] border-primary border-[1px] shadow-lg rounded-xl p-5">
          <div className="py-[40px] px-7 lg:px-14 w-full">
            {isEditing ? (
              <>
                <div className="flex justify-center mt-5">
                  <div className="flex w-full justify-between border-b-[1px] font-RobotoMedium text-primary text-[14px] pb-1">
                    <label htmlFor="first_name" className="w-[30%]">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="first_name"
                      name="first_name"
                      value={formData.first_name}
                      onChange={handleInputChange}
                      className="w-[70%] border-0 text-[14px] outline-none"
                    />
                  </div>
                </div>
                <div className="flex justify-center mt-5">
                  <div className="flex w-full justify-between border-b-[1px] font-RobotoMedium text-primary text-[14px] pb-1">
                    <label htmlFor="last_name" className="w-[30%]">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="last_name"
                      name="last_name"
                      value={formData.last_name}
                      onChange={handleInputChange}
                      className="w-[70%] border-0 text-[14px] outline-none"
                    />
                  </div>
                </div>
                <div className="flex justify-center mt-5">
                  <div className="flex w-full justify-between border-b-[1px] font-RobotoMedium text-primary text-[14px] pb-1">
                    <label htmlFor="email" className="w-[30%]">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-[70%] border-0 text-[14px] outline-none"
                    />
                  </div>
                </div>
                <div className="flex justify-center mt-5">
                  <div className="flex w-full justify-between border-b-[1px] font-RobotoMedium text-primary text-[14px] pb-1">
                    <label htmlFor="phone" className="w-[30%]">
                      Phone
                    </label>
                    <input
                      type="text"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-[70%] border-0 text-[14px] outline-none"
                    />
                  </div>
                </div>
                <div className="flex justify-center mt-5">
                  <div className="flex w-full justify-between border-b-[1px] font-RobotoMedium text-primary text-[14px] pb-1">
                    <label htmlFor="birthday" className="w-[30%]">
                      Birthday
                    </label>
                    <input
                      type="date"
                      id="birthday"
                      name="birthday"
                      value={formData.birthday}
                      onChange={handleInputChange}
                      className="w-[70%] border-0 text-[14px] outline-none"
                    />
                  </div>
                </div>
                <div className="flex justify-center mt-5">
                  <div className="flex w-full justify-between border-b-[1px] font-RobotoMedium text-primary text-[14px] pb-1">
                    <label htmlFor="address" className="w-[30%]">
                      Address
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-[70%] border-0 text-[14px] outline-none"
                    />
                  </div>
                </div>
                <div className="flex justify-center mt-5">
                  <div className="flex w-full justify-between border-b-[1px] font-RobotoMedium text-primary text-[14px] pb-1">
                    <label htmlFor="citizen_id" className="w-[30%]">
                      Citizen ID
                    </label>
                    <input
                      type="text"
                      id="citizen_id"
                      name="citizen_id"
                      value={formData.citizen_id}
                      onChange={handleInputChange}
                      className="w-[70%] border-0 text-[14px] outline-none"
                    />
                  </div>
                </div>
                <div className="flex justify-center mt-5">
                  <div className="flex w-full justify-between border-b-[1px] font-RobotoMedium text-primary text-[14px] pb-1">
                    <label htmlFor="tax_id" className="w-[30%]">
                      Tax ID
                    </label>
                    <input
                      type="text"
                      id="tax_id"
                      name="tax_id"
                      value={formData.tax_id}
                      onChange={handleInputChange}
                      className="w-[70%] border-0 text-[14px] outline-none"
                    />
                  </div>
                </div>
              </>
            ) : (
              <div className="flex flex-col gap-4 mt-4">
                <div className="flex justify-between border-b-[1px] border-primary pb-1">
                  <label htmlFor="first_name" className="w-[30%]">
                    First Name
                  </label>
                  <span>{formData.first_name}</span>
                </div>
                <div className="flex justify-between border-b-[1px] border-primary pb-1">
                  <label htmlFor="last_name" className="w-[30%]">
                    Last Name
                  </label>
                  <span>{formData.last_name}</span>
                </div>
                <div className="flex justify-between border-b-[1px] border-primary pb-1">
                  <label htmlFor="email" className="w-[30%]">
                    Email
                  </label>
                  <span>{formData.email}</span>
                </div>
                <div className="flex justify-between border-b-[1px] border-primary pb-1">
                  <label htmlFor="phone" className="w-[30%]">
                    Phone
                  </label>
                  <span>{formData.phone}</span>
                </div>
                <div className="flex justify-between border-b-[1px] border-primary pb-1">
                  <label htmlFor="birthday" className="w-[30%]">
                    Birthday
                  </label>
                  <span>{formData.birthday}</span>
                </div>
                <div className="flex justify-between border-b-[1px] border-primary pb-1">
                  <label htmlFor="address" className="w-[30%]">
                    Address
                  </label>
                  <span>{formData.address}</span>
                </div>
                <div className="flex justify-between border-b-[1px] border-primary pb-1">
                  <label htmlFor="citizen_id" className="w-[30%]">
                    Citizen ID
                  </label>
                  <span>{formData.citizen_id}</span>
                </div>
                <div className="flex justify-between border-b-[1px] border-primary pb-1">
                  <label htmlFor="tax_id" className="w-[30%]">
                    Tax ID
                  </label>
                  <span>{formData.tax_id}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  )
}

export default CustomerProfile
