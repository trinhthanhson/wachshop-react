import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

const AdminUserStaffDetail = () => {
  const { id } = useParams()
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    gender: '',
    phone: '',
    email: '',
    status: ''
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const token = localStorage.getItem('token')
  const navigate = useNavigate() // Use useNavigate for redirection

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:9999/api/manager/staff/${id}/find`,
          {
            headers: {
              Authorization: `Bearer ${token}` // Add the Authorization header
            }
          }
        )
        const user = response.data.data
        setFormData({
          firstname: user.first_name,
          lastname: user.last_name,
          gender: user.gender,
          phone: user.phone,
          email: user.email,
          status: user.user.status
        })
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [id, token])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.put(
        `http://localhost:9999/api/manager/staff/${id}/update`,
        {
          status: formData.status // Send the updated status
        },
        {
          headers: {
            Authorization: `Bearer ${token}` // Add the Authorization header
          }
        }
      )
      alert('User updated successfully!')
      navigate('/manager/staffs')
    } catch (error) {
      setError('Failed to update user: ' + error.message)
    }
  }
  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <div className="flex">
      <aside className="w-[200px] bg-gray-800 text-white h-screen">
        {/* Your sidebar content here */}
      </aside>
      <main className="flex-1 p-5 ml-[200px]">
        <h2 className="text-2xl font-semibold mb-4">Thông tin</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label>
            Fist Name:
            <input
              disabled
              type="text"
              name="firstname"
              value={formData.firstname}
              onChange={handleChange}
              className="border rounded p-2 w-full"
            />
          </label>
          <label>
            Last Name:
            <input
              disabled
              type="text"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
              className="border rounded p-2 w-full"
            />
          </label>
          <label>
            Gender:
            <input
              disabled
              type="text"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="border rounded p-2 w-full"
            />
          </label>
          <label>
            Email:
            <input
              disabled
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="border rounded p-2 w-full"
            />
          </label>
          <label>
            Phone:
            <input
              disabled
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="border rounded p-2 w-full"
            />
          </label>
          <label>
            Status:
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="border rounded p-2 w-full"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </label>
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">
            Cập nhật
          </button>
        </form>
      </main>
    </div>
  )
}

export default AdminUserStaffDetail
