import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCustomersRequest } from '../../redux/actions/actions'
import { getStatus } from '../../constants/Status'
import { getRank } from '../../constants/Rank'
import { MdModeEditOutline } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'

const AllCustomers = () => {
  const dispatch = useDispatch()
  const customers = useSelector((state) => state.customers.customers)
  const navigate = useNavigate()

  useEffect(() => {
    try {
      dispatch(getAllCustomersRequest())
    } catch (error) {
      console.error('Error dispatch', error)
    }
  }, [dispatch])
  return (
    <div className="flex flex-col gap-4 w-[80%] ml-[18%] rounded-md shadow-md bg-white mt-5">
      <table className="w-full text-gray-700">
        <thead className="text-white font-RobotoSemibold text-[18px] ">
          <tr className="bg-primary">
            <td className="rounded-s-md">ID</td>
            <td>Avatar</td>
            <td>Username</td>
            <td>Ngay Tao</td>
            <td>Diem</td>
            <td>Hang</td>
            <td className="rounded-e-md">Trạng Thái</td>
            <td className="rounded-e-md">Actions</td>
          </tr>
        </thead>
        <tbody>
          {customers?.data &&
            customers?.data
              .filter((customer) => customer.username !== 'admin')
              .map((customer) => (
                <tr key={customer.user_id}>
                  <td>{customer?.user_id}</td>
                  <td>
                    <img
                      src={
                        customer?.avatar ||
                        'https://firebasestorage.googleapis.com/v0/b/watch-shop-3a14f.appspot.com/o/images%2Flogo.png?alt=media&token=ff560732-bd5c-43d0-9271-7bcd3d9204ea'
                      }
                      alt={customer?.username}
                      className="w-[68px] h-[50px] object-contain rounded-md bg-primary"
                    />
                  </td>
                  <td>{customer?.username}</td>
                  <td>{new Date(customer.created_at).toLocaleDateString()}</td>
                  <td>{customer?.points.toLocaleString('en')}</td>
                  <td>{getRank(customer?.points)}</td>
                  <td>{getStatus(customer?.status)}</td>
                  <MdModeEditOutline
                    className="cursor-pointer text-primary"
                    style={{ marginTop: '30px' }}
                    fontSize={25}
                    onClick={() =>
                      navigate(`/manager/user-customer/${customer?.user_id}`)
                    }
                  />
                </tr>
              ))}
        </tbody>
      </table>
    </div>
  )
}

export default AllCustomers
