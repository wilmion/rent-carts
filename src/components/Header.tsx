import React from 'react';
import { useHistory } from 'react-router';

import { AiOutlineMenu , AiFillCloseCircle } from 'react-icons/ai';
import { BiArrowBack } from 'react-icons/bi';

import "../sass/layout/header.scss"

const Header = () => {
    
    const history = useHistory();

    const navigateLink = (url:string):void => {
        const menu:HTMLElement = document.querySelector('.header-menu');

        menu.style.transform = 'translateX(-100%)';

        history.push(url);
    }

    const showMenu = (position:number):void => {
        const menu:HTMLElement = document.querySelector('.header-menu');
        menu.style.transform = `translateX(${position}%)`;
    }

    return (
        <header className="header">
            <section className="header-menu">
                <div className="header-menu-close">
                    <AiFillCloseCircle onClick={() => showMenu(-100)} className="header-menu-close__icon" />
                </div>
                <p className="header-menu__section" onClick={() => navigateLink( '/' )} >Home</p>
                <p className="header-menu__section" onClick={() => navigateLink( '/cart' )} >Cart</p>
                <p className="header-menu__section" onClick={() => navigateLink( '/profile' )} >My Acount</p>
                <p className="header-menu__section" onClick={() => navigateLink( '/carts' )} >Type Carts</p>
                <p className="header-menu__section" onClick={() => navigateLink( '/about ' )} >About</p>
            </section>
            <section className="header-show">
                <BiArrowBack className="header-show__icon-left" size="20px" onClick={() => history.goBack()} ></BiArrowBack>
                <h3 className="header-show__title">Find your car</h3>
                <div className="header-show-menu">
                    <AiOutlineMenu size="20px" className="header-show-menu-icon" onClick={() => showMenu(0)} ></AiOutlineMenu>
                </div>
            </section>
        </header> 
    )
}

export default Header
