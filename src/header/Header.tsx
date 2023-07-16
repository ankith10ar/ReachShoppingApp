import React from 'react';
import './Header.css';
import logo from '../assets/logo.png'
import cartIcon from '../assets/cart.png'
import hamburgerIcon from '../assets/hamburger.png'

function Header(props: { setFilterWindow: any; }) {

    const {setFilterWindow} = props;

    return (
        <>
            <div className="header">
                <img className="shop-logo" src={logo} alt="logo"></img>
                <div className="header-right">
                    <div className="nav-links">
                        <a className="page-link selected">
                            Products
                        </a>
                    </div>
                    <div className="cart">
                        <img src={cartIcon} className="cart-icon" alt="cart">
                        </img>
                        <span>2</span>
                    </div>
                    <div className="hamburger-menu">
                        <a href="#" onClick={(e) => setFilterWindow( (prev: string) => prev!=="showFilter"? "showFilter": "") } >
                            <img src={hamburgerIcon} className="hamburger-icon" alt="cart" />
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Header;