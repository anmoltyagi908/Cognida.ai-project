import './profile.css'
import {useAuthValue} from './AuthContext'
import { signOut } from 'firebase/auth' 
import { auth } from './firebase'
import Header from'./header.js'


function Profile() {
  const {currentUser} = useAuthValue()

  return (
      <div className='center'>
        {/* <Header /> */}
        <div className='profile'>
          <h1>Profile</h1>
          <p className=''><strong>Email: </strong>{currentUser?.email}</p>
          <p>
            <strong>Email verified: </strong>
            {`${currentUser?.emailVerified}`}
          </p>
          <span onClick={() => signOut(auth)}>Sign Out</span>
        </div>
      </div>
  )
}

export default Profile
