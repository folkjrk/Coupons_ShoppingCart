import React, { useState } from 'react';
import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import PopupCart from '../popup/PopupCart'


const Navbar = () => {
    const navigate = useNavigate();
    const [isPopupOpen, setPopupOpen] = useState(false);

    return (
        <div className='navbar'>
            
            <img src="" alt="" className='logo' />
            <ul>
                <li className='nav-item'>
                    <button className='button-navbar' onClick={() => navigate("/")}>Home</button>
                </li>
                <li className='nav-item'>
                    <button className='button-navbar' onClick={() => navigate("/Shop")}>Shop</button>
                </li>
                <li className='nav-item'>
                    <button className='button-navbar' onClick={() => navigate("/About")}>About</button>
                </li>
                <li className='nav-item'>
                    <button className='button-navbar' onClick={() => navigate("/Contact")}>Contact</button>
                </li>
                <li className='nav-item'>
                    <ShoppingBasketIcon className='button-navbar-cartIcon' sx={{ fontSize: 40 }} onClick={() => setPopupOpen(true)} />
                </li>       
                <PopupCart trigger = {isPopupOpen} setTrigger= {setPopupOpen}/>
            </ul>
        </div>
    )
}

export default Navbar;
