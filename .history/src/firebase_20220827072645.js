import { initializeApp } from 'firebase/app'
import {getAuth, signInWithPopup,GithubAuthProvider,signInWithRedirect,getRedirectResult, GoogleAuthProvider} from 'firebase/auth'
import GoogleButton from 'react-google-button';

const firebaseConfig = {
  apiKey: "AIzaSyAdEwgJ4MegUOCdad0SltjZL0eOlxIGb74",
  authDomain: "cognida-ai.firebaseapp.com",
  projectId: "cognida-ai",
  storageBucket: "cognida-ai.appspot.com",
  messagingSenderId: "798365437243",
  appId: "1:798365437243:web:84d1364541be7991817b1e"
};

// Initialize Firebase and Firebase Authentication
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

GoogleButton.addEventListener('click',(e) => {
  getRedirectResult(auth)
  .then((result) => {
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    const user = result.user;

}).catch((error) => {
  const error 
})

export {auth}
