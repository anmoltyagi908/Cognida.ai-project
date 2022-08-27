import './profile.css'
import {useAuthValue} from './AuthContext'
import { signOut } from 'firebase/auth' 
import { auth } from './firebase'
import Header from'./header.js'
import styled, { ThemeProvider } from "styled-components";
import { lightTheme, darktheme, GlobalStyles, lighttheme, darkTheme} from "./themes";

function Profile() {
  const {currentUser} = useAuthValue()
  
  const StyledApp = styled.div`
  color: ${(props) => props.theme.fontColor};
  `;
  
  function App() {
  
  const [theme,setTheme] = useState("light");
  
  const themeToggler = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };
  

  return (
      <div className='center'>
        {/* <Header /> */}
        <div className='profile'>
        <ThemeProvider theme={theme === "light" ? lighttheme : darkTheme}>
      <GlobalStyles />
      <StyledApp>
          <h1>Profile</h1>
          <p className='text-white'><strong>Email: </strong>{currentUser?.email}</p>
          <p>
            <strong>Email verified: </strong>
            {`${currentUser?.emailVerified}`}
          </p>
          <span onClick={() => signOut(auth)}>Sign Out</span>
          <h1 className='text-center text-3xl font-bold py-8'>Sign in</h1>
      <div className='max-w-[240px] m-auto py-4'>
        <GoogleButton onClick={handleGoogleSignIn} />
       
      </div>
        </div>
      </div>
  
  )
  }
}

export default Profile
