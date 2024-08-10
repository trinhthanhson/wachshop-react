import CryptoJS from 'crypto-js'

// Lấy khóa bí mật từ biến môi trường
const secretKey = import.meta.env.VITE_SECRET_KEY
// Mã hóa dữ liệu
export const encryptData = (data) => {
  if (!secretKey) {
    throw new Error('Secret key is not defined')
  }
  return CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString()
}

// Giải mã dữ liệu
export const decryptData = (cipherText) => {
  if (!secretKey) {
    throw new Error('Secret key is not defined')
  }
  try {
    const bytes = CryptoJS.AES.decrypt(cipherText, secretKey)
    const decryptedData = bytes.toString(CryptoJS.enc.Utf8)
    return decryptedData ? JSON.parse(decryptedData) : null
  } catch (error) {
    console.error('Error decrypting data:', error)
    return null
  }
}
