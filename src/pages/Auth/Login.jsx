import { useState, useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './authStyle.css'
import Helmet from '../../components/Helmet/Helmet'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { getUserProfileRequest } from '../../redux/actions/actions'
import CoffeeCanvas from '../../components/Canvas/Coffee'
import { encryptData } from '../../cryptoUtils/cryptoUtils'
import debounce from 'lodash/debounce'

const Login = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user.user.data)
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showForgotPassword, setShowForgotPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const userRole = user?.user?.role.role_name
  const [isLoggingIn, setIsLoggingIn] = useState(false)
  const [loading, setLoading] = useState(false)
  const handleGoHome = () => {
    navigate('/')
  }
  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handleLogin = useCallback(
    debounce(async () => {
      try {
        if (typeof username !== 'string' || typeof password !== 'string') {
          throw new Error('Invalid input data')
        }

        setIsLoggingIn(true)

        const response = await axios.post(
          'http://localhost:9999/api/auth/sign-in',
          {
            username,
            password
          }
        )

        const { token, status } = response.data

        if (status && token) {
          const secretKey = import.meta.env.VITE_SECRET_KEY

          if (!secretKey) {
            throw new Error('Secret key is not defined')
          }

          localStorage.setItem('token', token)
          // Dispatch action to fetch user profile
          await dispatch(getUserProfileRequest())

          console.log('Đăng nhập thành công')
        } else {
          setMessage(
            'Đăng nhập không thành công! Vui lòng kiểm tra lại username hoặc password'
          )
          console.log('Đăng nhập không thành công')
        }
      } catch (error) {
        setMessage('Đã xảy ra lỗi khi đăng nhập. Vui lòng thử lại.')
        console.error('Error:', error)
      } finally {
        setIsLoggingIn(false)
      }
    }, 300),
    [username, password, dispatch]
  )

  // Điều hướng sau khi dữ liệu người dùng được cập nhật
  useEffect(() => {
    if (userRole) {
      localStorage.setItem('role_name', encryptData(userRole))
      if (userRole === 'MANAGER' || userRole === 'STAFF') {
        navigate('/manager')
      } else if (userRole === 'CUSTOMER') {
        if (location.pathname.startsWith('/manager')) {
          navigate('/home')
        }
        navigate('/home')
      } else if (userRole === 'SHIPPER') {
        navigate('/manager/shipper')
      }
    }
  }, [userRole, navigate])
  const handleForgotPassword = () => {
    setShowForgotPassword(true)
  }

  const handleCloseForgotPassword = () => {
    setShowForgotPassword(false)
    setMessage('')
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }

  const handleForgotPasswordSubmit = async () => {
    if (!email) {
      setMessage('Vui lòng nhập email')
    }
    setLoading(true)
    try {
      const response = await axios.post(
        'http://localhost:9999/api/auth/forgot-password',
        { email }
      )
      const { code, message } = response.data
      if (code === 200 && message === 'success') {
        setMessage(
          'The password reset password has been sent to your email. Please go to your email to get the password to log in'
        )
      } else {
        setMessage('Incorrect email please enter the correct registered email')
      }
    } catch (error) {
      console.error('Error:', error)
      setMessage('Failed to send reset password. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Helmet title="Login">
      <div className="full-screen relative z-[-1]">
        <img
          className="fixed h-full w-full hover:cursor-none"
          src="https://firebasestorage.googleapis.com/v0/b/watch-shop-3a14f.appspot.com/o/images%2Fbackground.jpg?alt=media&token=edae71b6-7155-4d79-b78c-636c0a929ce6"
          alt="Background"
        />

        <img
          onClick={handleGoHome}
          className="absolute cursor-pointer w-[100px] h-[80px] ml-3 py-[10px] pl-3"
          src="https://firebasestorage.googleapis.com/v0/b/watch-shop-3a14f.appspot.com/o/images%2Flogo.png?alt=media&token=ff560732-bd5c-43d0-9271-7bcd3d9204ea"
          alt="Logo"
        />

        <div
          className="layout_login absolute flex justify-center items-center mt-[8%] ml-[8%] w-[75%] rounded-[15px]"
          style={{ backgroundColor: 'rgb(6 6 6 / 50%)' }}
        >
          <div className="flex-col col-span-1 w-1/3 h-full object-contain border-r-2 border-neutral-400">
            <CoffeeCanvas />
          </div>

          <div className="flex-col col-span-1 w-2/3">
            {showForgotPassword ? (
              <div className="forgot-password-form flex flex-col items-center justify-center">
                <h1 className="text-center mb-8 text-main text-[25px] uppercase text-white">
                  Forgot Password
                </h1>
                <div className="input">
                  <label className="text-white">Email</label>
                  <input
                    type="text"
                    value={email}
                    onChange={handleEmailChange}
                    className="h-8 w-[45%] outline-0 bg-[#ebebeb] p-2 rounded"
                    style={{ width: '300px' }}
                  />
                </div>
                <div className="btn_submit" style={{ width: '300px' }}>
                  <button
                    className="uppercase"
                    type="button"
                    onClick={handleForgotPasswordSubmit}
                    disabled={loading}
                  >
                    {loading ? 'Đang gửi...' : 'Gửi'}
                  </button>
                </div>
                {message && <p className="text-white mt-4">{message}</p>}
                <div className="btn_submit" style={{ width: '300px' }}>
                  <button
                    className="text-white mt-4 underline"
                    onClick={handleCloseForgotPassword}
                  >
                    Back to Login
                  </button>
                </div>
              </div>
            ) : (
              <>
                <h1 className="font-RobotoSemibold text-center mb-8 text-main text-[25px] uppercase text-white">
                  Đăng Nhập
                </h1>
                {message && (
                  <p
                    className="text-white mt-4"
                    style={{ color: 'rgb(255 191 124)', marginLeft: '200px' }}
                  >
                    {message}
                  </p>
                )}
                <div className="input">
                  <label className="text-white">Username</label>
                  <input
                    type="text"
                    value={username}
                    onChange={handleUsernameChange}
                    className="h-8 w-[45%] outline-0 bg-[#ebebeb] p-2 rounded"
                  />
                </div>
                <div className="input">
                  <label className="text-white">Mật Khẩu</label>
                  <input
                    type="password"
                    value={password}
                    onChange={handlePasswordChange}
                    className="h-8 w-[45%] outline-0 bg-[#ebebeb] p-2 rounded mb-2"
                  />
                </div>
                <a
                  onClick={handleForgotPassword}
                  className="link_forgotPass text-white"
                >
                  Quên Mật Khẩu
                </a>

                <div className="btn_submit">
                  <button
                    className="uppercase"
                    type="button"
                    onClick={handleLogin}
                    disabled={isLoggingIn}
                  >
                    {isLoggingIn ? 'Đang đăng nhập...' : 'Đăng nhập'}
                  </button>
                </div>
                <div className="ml-[26%] text-white">
                  <span>Bạn chưa có tài khoản? </span>
                  <a className="link_signup" href="/signup">
                    Đăng Ký Ngay
                  </a>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </Helmet>
  )
}

export default Login
