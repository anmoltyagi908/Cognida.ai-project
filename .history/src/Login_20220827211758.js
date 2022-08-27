import {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import './forms.css'
import { GoogleButton } from 'react-google-button';
import { UserAuth } from './context/AuthContext';
// import { useNavigate } from 'react-router-dom';
import {signInWithEmailAndPassword, sendEmailVerification, GoogleAuthProvider,signInWithRedirect, getRedirectResult} from 'firebase/auth'
import {auth} from './firebase'
import './home.css'
import {useNavigate} from 'react-router-dom'
import {useAuthValue} from './AuthContext'



function Login(){



  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('') 
  const [error, setError] = useState('')
  const {setTimeActive} = useAuthValue()
  const navigate = useNavigate()

  const login = e => {
    e.preventDefault()
    signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      if(!auth.currentUser.emailVerified) {
        sendEmailVerification(auth.currentUser)
        .then(() => {
          setTimeActive(true)
          navigate('/verify-email')
        })
      .catch(err => alert(err.message))
    }else{
      navigate('/')
    }
    })
    .catch(err => setError(err.message))
  }

  const Signin = () => {
    const { googleSignIn, user } = UserAuth();
    const navigate = useNavigate();
  
    const handleGoogleSignIn = async () => {
      try {
        await googleSignIn();
      } catch (error) {
        console.log(error);
      }
    };
  
    useEffect(() => {
      if (user != null) {
        navigate('/account');
      }
    }, [user]);
   
  
  return(
    <div className='center'>

      <div className='auth'>
        <h1>Log in</h1>
        {error && <div className='auth__error'>{error}</div>}
        <form onSubmit={login} name='login_form'>
          <input 
            type='email' 
            value={email}
            required
            placeholder="Enter your email"
            onChange={e => setEmail(e.target.value)}/>

          <input 
            type='password'
            value={password}
            required
            placeholder='Enter your password'
            onChange={e => setPassword(e.target.value)}/>

          <button onClick={handleGoogleSignIn} type='submit'>Login</button>
          <button type='submit'>Continue with Google</button>

        </form>
        <p>
          Don't have and account? 
          <Link to='/register'>Create one here</Link>
        </p>
      </div>
    </div>
  )
}


export default Login