import './profile.css'
import {useAuthValue} from './AuthContext'
import { signOut } from 'firebase/auth' 
import { auth } from './firebase'
import Header from'./header.js'
import { useState } from 'react';
import { lightTheme, darktheme, GlobalStyles, lighttheme, darkTheme} from "./themes";
import styled, { ThemeProvider } from "styled-components";

function Profile() {
  const {currentUser} = useAuthValue()
  
const [theme,setTheme] = useState("light");

const themeToggler = () => {
  theme === "light" ? setTheme("dark") : setTheme("light");
};
  const StyledApp = styled.div`
  color: ${(props) => props.theme.fontColor};
  `;
 
  

  return (
      <div className='center'>
        {/* <Header /> */}
        <div className='profile'>
          <h1>Profile</h1>
          <p className='text-white'><strong>Email: </strong>{currentUser?.email}</p>
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
