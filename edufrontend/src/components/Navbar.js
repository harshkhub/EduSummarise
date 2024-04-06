

import './Navbar.css';
import USC from '../assets/USC.png';
import logotext from '../assets/logotext.png'
import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import Search from './Search';
import { Link } from 'react-router-dom';

const Navbar = () =>{

    const[click, setClick] = useState(false)
    const handleClick = () => setClick(!click)
    const closeMenu = () => setClick(false)

    return(
        <div className='header'>
            <nav className='navbar'>
                <a href='/' className='logo'>
                    <img src={USC} alt='logo'/>
                    <img className='title-logo' src={logotext} alt='Class scheduler' />
                </a>
                <div className='hamburger' onClick ={handleClick}>
                {click ? (<FaTimes size={30} style={{ color: '#990000' }} />)
                        : (<FaBars size={30} style={{ color: '#990000' }} />)}
                </div>
                <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                    <li className='nav-item'>
                        <a href = "/" >Home</a>
                    </li>
                    <li className='nav-item'>
                        <a href = "/search" >Courses</a>
                    </li>
                    <li className='nav-item'>
                        <a href = "/calendar" >About</a>
                    </li>
                </ul>
            </nav>
            <Search/>
        </div>

    )
}

export default Navbar