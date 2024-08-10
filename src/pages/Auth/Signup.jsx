import { useNavigate } from 'react-router-dom'
import './authStyle.css'
import Helmet from '../../components/Helmet/Helmet'
import axios from 'axios'
import { useState } from 'react'

const Signup = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [repassword, setRepassword] = useState('')
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')
  const [errors, setErrors] = useState({})
  const [isOtpSent, setIsOtpSent] = useState(false)
  const [otpError, setOtpError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleGoBack = () => {
    navigate('/login')
  }

  const handleGoHome = () => {
    navigate('/')
  }

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handleRepasswordChange = (event) => {
    setRepassword(event.target.value)
  }

  const handleFirstnameChange = (e) => {
    setFirstname(e.target.value)
  }

  const handleLastnameChange = (e) => {
    setLastname(e.target.value)
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }

  const handleOtpChange = (e) => {
    setOtp(e.target.value)
  }

  const handleSentOtp = async () => {
    const newErrors = {}
    if (!username) newErrors.username = 'Username không được để trống'
    if (!password) newErrors.password = 'Mật khẩu không được để trống'
    if (!repassword) newErrors.repassword = 'Vui lòng nhập lại mật khẩu'
    else if (password !== repassword)
      newErrors.repassword = 'Mật khẩu không trùng khớp'
    if (!firstname) newErrors.firstname = 'Họ không được để trống'
    if (!lastname) newErrors.lastname = 'Tên không được để trống'
    if (!email) newErrors.email = 'Email không được để trống'
    else if (!/@/.test(email)) newErrors.email = 'Email phải chứa ký tự @'

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    setLoading(true) // Bắt đầu trạng thái loading

    try {
      const otpResponse = await axios.post(
        'http://localhost:9999/api/auth/sent-otp',
        {
          email
        }
      )
      if (otpResponse.data.code === 200) {
        setIsOtpSent(true)
      } else {
        console.log('Gửi OTP không thành công')
      }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false) // Kết thúc trạng thái loading
    }
  }

  const handleSignup = async () => {
    try {
      const response = await axios.post(
        'http://localhost:9999/api/auth/sign-up',
        {
          username,
          password,
          firstname,
          lastname,
          email,
          otp,
          role_name: 'CUSTOMER'
        }
      )
      const { code } = response.data
      if (code === 201) {
        navigate('/login')
        console.log('Đăng ký thành công')
      } else {
        setOtpError('OTP không chính xác')
        console.log('Đăng ký không thành công')
      }
    } catch (error) {
      setOtpError('Có lỗi xảy ra, vui lòng thử lại')
      console.error('Error:', error)
    }
  }

  return (
    <Helmet title="Signup">
      <div className="w-full h-full relative z-[-1]">
        <img
          className="fixed h-full w-full"
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
          className="cursor-pointer layout_login absolute flex-col justify-center items-center mt-[10%] ml-[30%] w-[40%] rounded-[15px]"
          style={{
            backgroundColor: 'rgb(6 6 6 / 50%)',
            height: isOtpSent ? '300px' : '550px'
          }}
        >
          <img
            onClick={handleGoBack}
            className="w-[24px] h-[24px] ml-4 bg-white"
            src="https://icons.veryicon.com/png/o/miscellaneous/arrows/go-back-2.png"
            alt="Go back"
          />
          <h1 className="text-center mb-8 font-bold text-[25px] text-main text-white">
            {isOtpSent ? 'Nhập OTP' : 'Thông Tin Đăng Ký'}
          </h1>

          {isOtpSent ? (
            <>
              <div className="input">
                <label className="text-white">OTP</label>
                <input
                  type="text"
                  value={otp}
                  onChange={handleOtpChange}
                  className="h-8 w-[45%] outline-0 bg-[#ebebeb] p-2 rounded"
                />
              </div>
              {otpError && (
                <p
                  className="text-center"
                  style={{ color: 'rgb(255 191 124)' }}
                >
                  {otpError}
                </p>
              )}
              <div className="btn_submit">
                <button className="w-fit" type="submit" onClick={handleSignup}>
                  Xác Nhận OTP
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="input">
                <label className="text-white">Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={handleUsernameChange}
                  className="h-8 w-[45%] outline-0 bg-[#ebebeb] p-2 rounded"
                />
              </div>
              {errors.username && (
                <p
                  className="text-center "
                  style={{ color: 'rgb(255 191 124)', marginLeft: '120px' }}
                >
                  {errors.username}
                </p>
              )}
              <div className="input">
                <label className="text-white">Mật khẩu</label>
                <input
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                  className="h-8 w-[45%] outline-0 bg-[#ebebeb] p-2 rounded"
                />
              </div>
              {errors.password && (
                <p
                  className="text-red-500 text-center "
                  style={{ color: 'rgb(255 191 124)', marginLeft: '120px' }}
                >
                  {errors.password}
                </p>
              )}
              <div className="input">
                <label className="text-white">Nhập lại mật khẩu</label>
                <input
                  type="password"
                  value={repassword}
                  onChange={handleRepasswordChange}
                  className="h-8 w-[45%] outline-0 bg-[#ebebeb] p-2 rounded"
                />
              </div>
              {errors.repassword && (
                <p
                  className="text-red-500 text-center "
                  style={{ color: 'rgb(255 191 124)', marginLeft: '80px' }}
                >
                  {errors.repassword}
                </p>
              )}
              <div className="input">
                <label className="text-white">Họ</label>
                <input
                  type="text"
                  value={firstname}
                  onChange={handleFirstnameChange}
                  className="h-8 w-[45%] outline-0 bg-[#ebebeb] p-2 rounded"
                />
              </div>
              {errors.firstname && (
                <p
                  className="text-center "
                  style={{ color: 'rgb(255 191 124)', marginLeft: '80px' }}
                >
                  {errors.firstname}
                </p>
              )}
              <div className="input">
                <label className="text-white">Tên</label>
                <input
                  type="text"
                  value={lastname}
                  onChange={handleLastnameChange}
                  className="h-8 w-[45%] outline-0 bg-[#ebebeb] p-2 rounded"
                />
              </div>
              {errors.lastname && (
                <p
                  className=" text-center "
                  style={{ color: 'rgb(255 191 124)', marginLeft: '80px' }}
                >
                  {errors.lastname}
                </p>
              )}
              <div className="input">
                <label className="text-white">Email</label>
                <input
                  pattern="@"
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  className="h-8 w-[45%] outline-0 bg-[#ebebeb] p-2 rounded"
                />
              </div>
              {errors.email && (
                <p
                  className=" text-center "
                  style={{ color: 'rgb(255 191 124)', marginLeft: '90px' }}
                >
                  {errors.email}
                </p>
              )}
              <div className="btn_submit">
                <button
                  className={`w-fit ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  type="submit"
                  onClick={handleSentOtp}
                  disabled={loading}
                >
                  {loading ? 'Đang gửi...' : 'Đăng Ký'}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </Helmet>
  )
}

export default Signup
