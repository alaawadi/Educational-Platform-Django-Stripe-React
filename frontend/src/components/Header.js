import React, {useContext} from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../context/AuthContext'
// import { AppBar, Toolbar } from "@material-ui/core";
// import './header.css'

const Header = () => {
    let {user, logoutUser} = useContext(AuthContext)
    let navbar = document.querySelector('.header .navbar');

    let n = document.querySelector('#menu-btn').onclick = () =>{
        navbar.classList.toggle('active');
    }

    let nn = window.onscroll = () =>{
        navbar.classList.remove('active');
    }
    return (
        <div className='header' align="center">
            {/* <Link to="/login" >Login</Link> */}
            <span> | </span>
            <Link to="/login2" >Login2</Link>
            <span> | </span>
            <Link to="/" >Home</Link>
            <span> | </span>
            {user ? (
                 <p  onClick={logoutUser}>Logout</p>
            ): (
                <Link to="/login3" >Login3</Link>
                

            )}
           
            {user &&   <p>Hello {user.username}</p>}
           
        </div>
    )
}

export default Header



