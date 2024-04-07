import './Navbar.css';
import USC from '../assets/USC.png';
// import logotext from '../assets/logotext.png'
import { useState } from 'react';
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
        
                </a>
                
                <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                    <li className='nav-item'>
                        <a href = "/" >Home</a>
                    </li>
                    <li className='nav-item'>
                        <a href = "/courses" >Courses</a>
                    </li>
                    <li className='nav-item'>
                        <a href = "/about" >About</a>
                    </li>
                </ul>
            </nav>
            
        </div>

    )
}

export default Navbar