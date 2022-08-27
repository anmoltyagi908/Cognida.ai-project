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
import { lightTheme, darktheme, GlobalStyles, lighttheme, darkTheme} from "./themes";
import styled, { ThemeProvider } from "styled-components";
function App() {


  
  const [currentUser, setCurrentUser] = useState(null)
  const [timeActive, setTimeActive] = useState(false)

  
  const [theme,setTheme] = useState("light");

  const themeToggler = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  }
  const StyledApp = styled.div`
  color: ${(props) => props.theme.fontColor};
  `;
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user)
    })
  }, [])

  return (
    <Router>
      <AuthProvider value={{currentUser, timeActive, setTimeActive}}>
        {/* <Header /> */}

        <Routes>
          <Route exact path='/' element={
            <PrivateRoute>
              <Header />
              <List />
            </PrivateRoute>
          }/>
            <Route exact path='/Upload' element={

            <PrivateRoute>
              <Header />
              <ThemeProvider theme={theme === "light" ? lighttheme : darkTheme}>
      <GlobalStyles />
      <StyledApp>
      <button className='max-w-[240px] m-auto py-4' onClick= {() => themeToggler()}>Theme</button> 
      </StyledApp>
    </ThemeProvider>
              <Upload/>
              
            </PrivateRoute>
          }/>  <Route exact path='/Profile' element={
            <PrivateRoute>
         <
              <Profile/>
            </PrivateRoute>
          }/>
           <Route exact path='/list' element={
            <PrivateRoute>
              <ThemeProvider theme={theme === "light" ? lighttheme : darkTheme}>
      <GlobalStyles />
      <StyledApp>
      <button className='max-w-[240px] m-auto py-4' onClick= {() => themeToggler()}>Theme</button> 
      </StyledApp>
    </ThemeProvider>
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
