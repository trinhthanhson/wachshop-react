// ProtectedRoute.js
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'

const ProtectedRoute = ({ element: Component, roles }) => {
  const user = useSelector((state) => state.userProfile.user)

  if (!user) {
    return <Navigate to="/login" />
  }

  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/home" />
  }

  return <Component />
}

ProtectedRoute.propTypes = {
  element: PropTypes.elementType.isRequired,
  roles: PropTypes.arrayOf(PropTypes.string).isRequired
}

export default ProtectedRoute
