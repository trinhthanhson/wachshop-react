import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserProfileRequest } from '../../redux/actions/actions'
import axios from 'axios'
import { format, parseISO } from 'date-fns'

const StaffProfile = () => {
  const dispatch = useDispatch()
  const token = localStorage.getItem('token')
  const user = useSelector((state) => state.user.user.data)

  const [isEditing, setIsEditing] = useState(false)
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

  const handleSave = async () => {
    try {
      const response = await axios.put(
        `http://localhost:9999/api/staff/user/profile/update`,
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
  return (
    <div className="flex flex-col w-full ml-[15.1%] rounded-md shadow-md bg-white -mt-4">
      <section className="relative flex flex-col-reverse md:flex-row items-center bg-white">
        <div className="relative">
          <div className="lg:px-14 w-full">
            <div className="relative">
              <div className="w-1/2 border-b-[0px] sm:border-b-[1px] sm:border border-primary"></div>
              <div className="absolute top-[-1px] w-[15%] border-b-[0px] sm:border-b-[2px] sm:border-main"></div>
            </div>
            <h1 className="uppercase text-center sm:text-left font-RobotoMedium text-primary text-3xl md:text-3xl xl:text-[3rem] mb-5 mt-0 sm:mt-5 md:leading-tight">
              User Profile
            </h1>
          </div>
        </div>

        <div className="relative md:w-[55%]">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/watch-shop-3a14f.appspot.com/o/images%2Fbackground.jpg?alt=media&token=edae71b6-7155-4d79-b78c-636c0a929ce6"
            alt="banner"
            className="w-full object-cover object-bottom h-full lg:h-[400px]"
            style={{ marginLeft: '-115px' }}
          />
          <div
            className="absolute inset-0 bg-gradient-to-l from-transparent to-white"
            style={{ marginLeft: '-115px' }}
          ></div>
        </div>
      </section>

      <section className="relative flex flex-col-reverse md:flex-row items-center bg-white gap-5 mx-[10%]">
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
        </div>

        <div className="mb-5 relative md:w-[50%] border-primary border-[1px] shadow-lg rounded-xl p-5">
          <div className="py-[40px] px-7 lg:px-14 w-full">
            {isEditing ? (
              <>
                <div className="flex justify-center mt-5">
                  <div className="flex w-full justify-between border-b-[1px] font-RobotoMedium">
                    <div className="flex-1 text-left">Họ</div>
                    <div className="flex-1 text-right">
                      <input
                        type="text"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex justify-center mt-5">
                  <div className="flex w-full justify-between border-b-[1px] font-RobotoMedium">
                    <div className="flex-1 text-left">Tên</div>
                    <div className="flex-1 text-right">
                      <input
                        type="text"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex justify-center mt-5">
                  <div className="flex w-full justify-between border-b-[1px] font-RobotoMedium">
                    <div className="flex-1 text-left">Email</div>
                    <div className="flex-1 text-right">
                      <input
                        type="text"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex justify-center mt-5">
                  <div className="flex w-full justify-between border-b-[1px] font-RobotoMedium">
                    <div className="flex-1 text-left">Phone</div>
                    <div className="flex-1 text-right">
                      <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex justify-center mt-5">
                  <div className="flex w-full justify-between border-b-[1px] font-RobotoMedium">
                    <div className="flex-1 text-left">Birthday</div>
                    <div className="flex-1 text-center ml-10">
                      <input
                        type="date"
                        name="birthday"
                        value={formData.birthday}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex justify-center mt-5">
                  <div className="flex w-full justify-between border-b-[1px] font-RobotoMedium">
                    <div className="flex-1 text-left">Address</div>
                    <div className="flex-1 text-right">
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex justify-center mt-5">
                  <div className="flex w-full justify-between border-b-[1px] font-RobotoMedium">
                    <div className="flex-1 text-left">CCCD</div>
                    <div className="flex-1 text-right">
                      <input
                        type="text"
                        name="citizen_id"
                        value={formData.citizen_id}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="flex justify-center mt-5">
                  <div className="flex w-full justify-between border-b-[1px] font-RobotoMedium">
                    <div className="flex-1 text-left">Họ và Tên</div>
                    <div className="flex-1 text-right">
                      {user?.first_name} {user?.last_name}
                    </div>
                  </div>
                </div>
                <div className="flex justify-center mt-5">
                  <div className="flex w-full justify-between border-b-[1px] font-RobotoMedium">
                    <div className="flex-1 text-left">Email</div>
                    <div className="flex-1 text-right">{user?.email}</div>
                  </div>
                </div>
                <div className="flex justify-center mt-5">
                  <div className="flex w-full justify-between border-b-[1px] font-RobotoMedium">
                    <div className="flex-1 text-left">Phone</div>
                    <div className="flex-1 text-right">{user?.phone}</div>
                  </div>
                </div>
                <div className="flex justify-center mt-5">
                  <div className="flex w-full justify-between border-b-[1px] font-RobotoMedium">
                    <div className="flex-1 text-left">Birthday</div>
                    <div className="flex-1 text-right">
                      {new Date(user?.birthday).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                <div className="flex justify-center mt-5">
                  <div className="flex w-full justify-between border-b-[1px] font-RobotoMedium">
                    <div className="flex-1 text-left">Addess</div>
                    <div className="flex-1 text-right">{user?.address}</div>
                  </div>
                </div>
                <div className="flex justify-center mt-5">
                  <div className="flex w-full justify-between border-b-[1px] font-RobotoMedium">
                    <div className="flex-1 text-left">CCCD</div>
                    <div className="flex-1 text-right">{user?.citizen_id}</div>
                  </div>
                </div>
                <div className="flex justify-center mt-5">
                  <div className="flex w-full justify-between border-b-[1px] font-RobotoMedium">
                    <div className="flex-1 text-left">Ngày tham gia</div>
                    <div className="flex-1 text-right">
                      {new Date(user?.created_at).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

export default StaffProfile
