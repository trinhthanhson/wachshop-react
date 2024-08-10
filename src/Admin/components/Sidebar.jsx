import { Link, useLocation } from 'react-router-dom/dist'
import {
  DASHBOARD_SIDEBAR_BOTTOM_LINKS,
  DASHBOARD_SIDEBAR_TOP_LINKS
} from '../../constants/MenuLink'
import {
  HiOutlineLogout,
  HiOutlineUser,
  HiOutlineUserGroup
} from 'react-icons/hi'
import { useEffect, useState } from 'react'
import { getUserProfileRequest } from '../../redux/actions/actions'
import { useSelector, useDispatch } from 'react-redux'

const Sidebar = () => {
  const location = useLocation()
  const dispatch = useDispatch()
  // const navigate = useNavigate();
  const user = useSelector((state) => state.user.user.data)
  useEffect(() => {
    try {
      dispatch(getUserProfileRequest())
    } catch (error) {
      console.error('Error dispatch', error)
    }
  }, [dispatch])
  const handleLogout = () => {
    localStorage.removeItem('token')
    window.location.href = '/login'
  }
  const [hoveredIndex, setHoveredIndex] = useState(null)
  const isManager = user?.user?.role.role_name === 'MANAGER'
  const isAdmin = user?.user?.role.role_name === 'ADMIN'
  return (
    <div
      className="fixed bg-primary w-60 h-full p-3 flex flex-col text-white font-RobotoMedium"
      style={{ backgroundColor: 'rgb(199 199 199)' }}
    >
      <div className="flex items-center justify-center gap-3">
        <img
          src="https://firebasestorage.googleapis.com/v0/b/watch-shop-3a14f.appspot.com/o/images%2Flogo.png?alt=media&token=ff560732-bd5c-43d0-9271-7bcd3d9204ea"
          alt="logo"
          className="w-[125px]"
        />
        <div className="text-[16px]"></div>
      </div>
      <div className="flex-1 mt-6">
        {DASHBOARD_SIDEBAR_TOP_LINKS.map((link) => (
          <Link key={link.key} to={link.path}>
            <div
              key={link.key}
              className={`flex items-center gap-3 p-3 cursor-pointer hover:no-underline ${location.pathname === link.path ? '' : 'text-textNoneActive'}`}
              style={{
                color: '#000c',
                backgroundColor:
                  hoveredIndex === link.key || location.pathname === link.path
                    ? 'rgb(171, 171, 171)'
                    : 'transparent'
              }}
              onMouseEnter={() => setHoveredIndex(link.key)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div>{link.icon}</div>
              <div>{link.label}</div>
            </div>
          </Link>
        ))}

        {isManager && (
          <Link key="staffs" to="/manager/staffs">
            <div
              className={`flex items-center gap-3 p-3 cursor-pointer hover:no-underline ${location.pathname === '/manager/staffs' ? '' : 'text-textNoneActive'}`}
              style={{
                color: '#000c',
                backgroundColor:
                  hoveredIndex === 'staffs' ||
                  location.pathname === '/manager/staffs'
                    ? 'rgb(171, 171, 171)'
                    : 'transparent'
              }}
              onMouseEnter={() => setHoveredIndex('staffs')}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div>
                <HiOutlineUserGroup />
              </div>
              <div>Staffs</div>
            </div>
          </Link>
        )}
        {isAdmin && (
          <Link key="role" to="/admin/role">
            <div
              className={`flex items-center gap-3 p-3 cursor-pointer hover:no-underline ${location.pathname === '/admin/role' ? '' : 'text-textNoneActive'}`}
              style={{
                color: '#000c',
                backgroundColor:
                  hoveredIndex === 'role' || location.pathname === '/admin/role'
                    ? 'rgb(171, 171, 171)'
                    : 'transparent'
              }}
              onMouseEnter={() => setHoveredIndex('role')}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div>
                <HiOutlineUser />
              </div>
              <div>Roles</div>
            </div>
          </Link>
        )}
      </div>
      <hr className="opacity-40" />
      <div className="">
        {DASHBOARD_SIDEBAR_BOTTOM_LINKS.map((link) => (
          <Link key={link.key} to={link.path}>
            <div
              key={link.key}
              className={`flex items-center gap-3 p-3 cursor-pointer hover:no-underline ${location.pathname === link.path ? '' : 'text-textNoneActive'}`}
              style={{
                color: '#000c',
                backgroundColor:
                  hoveredIndex === link.key || location.pathname === link.path
                    ? 'rgb(171, 171, 171)'
                    : 'transparent'
              }}
              onMouseEnter={() => setHoveredIndex(link.key)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div>{link.icon}</div>
              <div>{link.label}</div>
            </div>
          </Link>
        ))}
        <div
          className="flex items-center gap-3 p-3 cursor-pointer text-main"
          style={{ color: 'rgb(253 0 15)' }}
        >
          <HiOutlineLogout />
          <div onClick={handleLogout}>Logout</div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
