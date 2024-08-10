import { initializeApp } from '@firebase/app'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage' // Import necessary functions from Firebase Storage SDK

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCv2RnndYWjlpTg426hYhlayRbGkV00GQs',
  authDomain: 'watch-shop-3a14f.firebaseapp.com',
  projectId: 'watch-shop-3a14f',
  storageBucket: 'watch-shop-3a14f.appspot.com',
  messagingSenderId: '389878925104',
  appId: '1:389878925104:web:f68dcb87b404c236e32af5'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const storage = getStorage(app)

// Function to upload image to Firebase and get URL
export const uploadImageToFirebase = async (file) => {
  const storageRef = ref(storage, `images/products/${file.name}`)
  await uploadBytes(storageRef, file)
  const url = await getDownloadURL(storageRef)
  return url
}
