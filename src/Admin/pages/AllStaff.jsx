import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  getAllRoleRequest,
  getAllStaffsRequest
} from '../../redux/actions/actions'
import { getStatus } from '../../constants/Status'
import { MdModeEditOutline } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import { IoIosAddCircle } from 'react-icons/io'
import axios from 'axios'

const AllStaff = () => {
  const dispatch = useDispatch()
  const staffs = useSelector((state) => state.staffs.staffs)
  const navigate = useNavigate()
  const [isModalVisible, setIsModalVisible] = useState(false)
  const roles = useSelector((state) => state.roles?.roles?.data) || []
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [email, setEmail] = useState('')
  const [role_name, setRole] = useState('')
  const filteredRoles = roles.filter((role) => role.role_name !== 'ADMIN')

  const handleUsernameChange = (event) => setUsername(event.target.value)
  const handlePasswordChange = (event) => setPassword(event.target.value)
  const handleFirstnameChange = (event) => setFirstname(event.target.value)
  const handleLastnameChange = (event) => setLastname(event.target.value)
  const handleEmailChange = (event) => setEmail(event.target.value)
  const handleRoleChange = (event) => setRole(event.target.value)
  const [loading, setLoading] = useState(false) // Trạng thái loading

  useEffect(() => {
    try {
      dispatch(getAllStaffsRequest())
      dispatch(getAllRoleRequest())
    } catch (error) {
      console.error('Error dispatch', error)
    }
  }, [dispatch])

  const showModal = () => setIsModalVisible(true)
  const handleCancel = () => {
    setIsModalVisible(false)
    setUsername('')
    setPassword('')
    setFirstname('')
    setLastname('')
    setEmail('')
    setRole('')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true) // Bắt đầu loading

    const newStaff = {
      username,
      password,
      firstname,
      lastname,
      email,
      role_name
    }

    // Lấy token từ localStorage, sessionStorage, hoặc một nguồn khác
    const token = localStorage.getItem('token') // Thay đổi tùy theo cách lưu token của bạn

    try {
      const response = await axios.post(
        'http://localhost:9999/api/manager/staff/add',
        newStaff,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Thêm token vào tiêu đề Authorization
            'Content-Type': 'application/json' // Đặt Content-Type nếu cần thiết
          }
        }
      )
      console.log(response)
      if (response.data.status === 201) {
        alert('Thêm nhân viên thành công')
        handleCancel() // Reset dữ liệu và đóng modal
      } else {
        alert(response.data.message)
        handleCancel()
      }
    } catch (error) {
      console.error('Error adding staff', error)
      alert('Có lỗi xảy ra, vui lòng thử lại')
    } finally {
      setLoading(false) // Kết thúc loading
    }
  }

  return (
    <>
      <div className="flex flex-col gap-4 w-[80%] ml-[18%] rounded-md shadow-md bg-white mt-5">
        <table className="w-full text-gray-700">
          <thead className="text-white font-RobotoSemibold text-[18px]">
            <tr className="bg-primary">
              <td className="rounded-s-md">ID</td>
              <td>Avatar</td>
              <td>Username</td>
              <td>Ngày Tạo</td>
              <td className="rounded-e-md">Trạng Thái</td>
              <td className="rounded-e-md">Actions</td>
            </tr>
          </thead>
          <tbody>
            {staffs?.data &&
              staffs?.data
                .filter((staff) => staff.username !== 'admin')
                .map((staff) => (
                  <tr key={staff.user_id}>
                    <td>{staff?.user_id}</td>
                    <td>
                      <img
                        src={
                          staff?.avatar ||
                          'https://firebasestorage.googleapis.com/v0/b/watch-shop-3a14f.appspot.com/o/images%2Flogo.png?alt=media&token=ff560732-bd5c-43d0-9271-7bcd3d9204ea'
                        }
                        alt={staff?.username}
                        className="w-[68px] h-[50px] object-contain rounded-md bg-primary"
                      />
                    </td>
                    <td>{staff?.username}</td>
                    <td>{new Date(staff.created_at).toLocaleDateString()}</td>
                    <td>{getStatus(staff?.status)}</td>
                    <td>
                      <MdModeEditOutline
                        className="cursor-pointer text-primary"
                        style={{ marginTop: '30px' }}
                        fontSize={25}
                        onClick={() =>
                          navigate(`/manager/user-staff/${staff?.user_id}`)
                        }
                      />
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
      <div className="fixed right-6 bottom-3">
        <IoIosAddCircle
          fontSize={50}
          className="cursor-pointer text-primary"
          onClick={showModal}
        />
      </div>
      {isModalVisible && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-md shadow-md w-1/3">
            <h2 className="text-2xl mb-4">Thêm Nhân Viên Mới</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block mb-2">Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={handleUsernameChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">First Name</label>
                <input
                  type="text"
                  value={firstname}
                  onChange={handleFirstnameChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Last Name</label>
                <input
                  type="text"
                  value={lastname}
                  onChange={handleLastnameChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Role</label>
                <select
                  value={role_name}
                  onChange={handleRoleChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                >
                  <option value="">Select Role</option>
                  {filteredRoles.map((role) => (
                    <option key={role.role_name} value={role.role_name}>
                      {role.role_name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-4 py-2 mr-2 bg-gray-300 rounded-md"
                >
                  Huỷ
                </button>
                <button
                  type="submit"
                  className={`px-4 py-2 bg-blue-500 text-white rounded-md ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={loading} // Disable nút khi loading
                >
                  {loading ? 'Đang thêm...' : 'Thêm'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

export default AllStaff
