import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Profile from './Profile'
import Register from './Register'
import VerifyEmail from './VerifyEmail';
import Login from './Login'
import Header from "./header.js"
import {useState, useEffect} from 'react'
import {AuthProvider} from './AuthContext'
import {auth} from './firebase'
import {onAuthStateChanged} from 'firebase/auth'
import PrivateRoute from './PrivateRoute'
import {Navigate} from 'react-router-dom'
import Upload from './Upload.js'
import List from './List';
function App() {

  const [currentUser, setCurrentUser] = useState(null)
  const [timeActive, setTimeActive] = useState(false)

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user)
    })
  }, [])

  return (
    <Router>
      <AuthProvider value={{currentUser, timeActive, setTimeActive}}>
        <Header />

        <Routes>
          <Route exact path='/' element={
            <PrivateRoute>
              {/* <Header /> */}
              <List />
            </PrivateRoute>
          }/>
            <Route exact path='/Upload' element={
            <PrivateRoute>
              <Upload/>
              
            </PrivateRoute>
          }/>  <Route exact path='/Profile' element={
            <PrivateRoute>
              <Profile/>
            </PrivateRoute>
          }/>
           <Route exact path='/list' element={
            <PrivateRoute>
              <Header />
              <List/>
            </PrivateRoute>
          }/>

          <Route path="/login" element={
            !currentUser?.emailVerified 
            ? <Login/>
            : <Navigate to='/' replace/>
          } />
          <Route path="/register" element={
            !currentUser?.emailVerified 
            ? <Register/>
            : <Navigate to='/' replace/>
          } />
          <Route path='/verify-email' element={<VerifyEmail/>} /> 
        </Routes>  
      </AuthProvider>
  </Router>
  );
}

export default App;
