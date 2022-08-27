import { logDOM } from '@testing-library/react'
import React from 'react'
// import logo from './logo.png'
import './header.css'
import { Link } from 'react-router-dom'

const header = () => { 
  return (
    <div>
        <div id="header">
            <div className='item companyLogo'><img src='https://cognida.ai/images/cognida_logo_white.png'  alt="cognida.ai" /></div>
            {/* <div className='item'></div> */}
            <div className='headerOption item'>
                <Link to="/upload">Upload</Link>
                <Link to="/list">List</Link>
                <Link to="/p"></Profile></Link>
            </div>
        </div>
    </div>
  )
}

export default header