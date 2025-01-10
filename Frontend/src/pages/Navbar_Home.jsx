



import React from 'react'
import { Link } from 'react-router-dom'
import '../static/styles/Home/Navbar_Home.css'

function Navbar_Home(props) {

    function showSidebar(){
        const sidebar = document.querySelector('.sidebar')
        sidebar.style.display = 'flex'
    }
    function hideSidebar(){
        const sidebar = document.querySelector('.sidebar')
        sidebar.style.display = 'none'
    }

    return (
        
        <div>
            <nav>

                    {/*  For Sidebar for Mobile Section */}
                <ul className="sidebar">
                    <li onClick={() => hideSidebar()}><a href="#"><svg xmlns="http://www.w3.org/2000/svg" height="26" viewBox="0 96 960 960" width="26"><path d="m249 849-42-42 231-231-231-231 42-42 231 231 231-231 42 42-231 231 231 231-42 42-231-231-231 231Z"/></svg></a></li>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/">About</Link></li>
                    <li><Link to="/">Forum</Link></li>
                    <li><Link to="/">Blog</Link></li>

                        {/* Dropdown Login Button */}
                    <li className="nav-item dropdown"> 
                        <a className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Login
                        </a>
                        <ul className="dropdown-menu">
                            <li><Link className="dropdown-item " to="/students/:id/">Student Login </Link></li>
                            <li><Link className="dropdown-item " to="/teachers/:id/">Teacher Login </Link></li>
                            <li><Link className="dropdown-item  px-1" to="/schools/:id/">School Admin Login</Link></li>
                        </ul>
                    </li>

                </ul>



                        {/* Navbar_Home Links for the computer or wider screen */}
                <ul>
                    <li style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                            {/* Toggle Mode switch */}
                        <a onClick={props.toggleMode} style={{fontSize: '1.5rem', cursor: 'pointer', backgroundColor: 'none'}}> 
                            {props.mode.color === 'white'? (<i className="bi bi-sun-fill text-warning"></i>) : (<i className="bi bi-moon-fill text-dark"></i>) } 
                        </a>

                            {/* Logo */}
                        <Link to="/"> <b> School <sup><u>HUB</u></sup> </b> </Link>
                    </li>
                    <li className="hideOnMobile"><Link to="/">Home</Link></li>
                    <li className="hideOnMobile"><Link to="/">About</Link></li>
                    <li className="hideOnMobile"><Link to="/">Forum</Link></li>
                    <li className="hideOnMobile"><Link to="/sujan">Blog</Link></li>

                        {/* Dropdown Login Button */}
                    <li className="hideOnMobile nav-item dropdown"> 
                        <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Login
                        </a>
                        <ul className="dropdown-menu">
                            <li><Link className="dropdown-item " to="/students/:id/">Student Login </Link></li>
                            <li><Link className="dropdown-item " to="/teachers/:id/">Teacher Login </Link></li>
                            <li><Link className="dropdown-item  px-2" to="/schools/:id/">School Admin Login</Link></li>
                        </ul>
                    </li>

                    <li className="menu-button" onClick={() => showSidebar()}><a href="#"><svg xmlns="http://www.w3.org/2000/svg" height="26" viewBox="0 96 960 960" width="26"><path d="M120 816v-60h720v60H120Zm0-210v-60h720v60H120Zm0-210v-60h720v60H120Z"/></svg></a></li>
                </ul>
            </nav>

        

        </div>

    )
}

export default Navbar_Home