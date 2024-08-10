// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyCv2RnndYWjlpTg426hYhlayRbGkV00GQs',
  authDomain: 'watch-shop-3a14f.firebaseapp.com',
  projectId: 'watch-shop-3a14f',
  storageBucket: 'watch-shop-3a14f.appspot.com',
  messagingSenderId: '389878925104',
  appId: '1:389878925104:web:f68dcb87b404c236e32af5'
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
