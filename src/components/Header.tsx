import React from 'react';
import { useHistory } from 'react-router';
import { connect } from 'react-redux';

import { AiOutlineMenu , AiFillCloseCircle } from 'react-icons/ai';
import { FaUser } from 'react-icons/fa';
import { BiArrowBack } from 'react-icons/bi';

import { IState , IUser } from '../models/interface';

import "../sass/layout/header.scss"


const Header:React.FC<{user:IUser | null}> = (props) => {
    
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
            <section className="header-menu" >
                <div className="header-menu-close">
                    <AiFillCloseCircle onClick={() => showMenu(-100)} className="header-menu-close__icon" />
                </div>
                <p className="header-menu__section" onClick={() => navigateLink( '/' )} >Home</p>
                <p className="header-menu__section" onClick={() => navigateLink( '/profile' )} >{props.user? "My Acount" :"Log In"}</p>
                <p className="header-menu__section" onClick={() => navigateLink( '/carts' )} >Type Cars</p>
                <p className="header-menu__section" onClick={() => navigateLink( '/about ' )} >About</p>
            </section>
            <section className="header-show" id="header">
                <BiArrowBack className="header-show__icon-left" size="20px" onClick={() => history.goBack()} ></BiArrowBack>
                <h3 className="header-show__title">Find your car</h3>
                <nav className="header-show-nav">
                    <div className="header-show-nav-logo">
                        <img onClick={() => navigateLink('/')} src="https://firebasestorage.googleapis.com/v0/b/rentcarts.appspot.com/o/logo.png?alt=media&token=5392288a-fd79-4cfe-a99e-f4306ccedd88" alt="Favicon"/>
                    </div>
                    <ul className="header-show-nav-list">
                        <li className="header-show-nav-list__item" onClick={() => navigateLink('/')} >Home</li>
                        <li className="header-show-nav-list__item" onClick={() => navigateLink('/carts')} >Cars</li>
                        <li className="header-show-nav-list__item" onClick={() => navigateLink('/about')} >About</li>
                        <li className="header-show-nav-list__item">|</li>
                        {props.user? (
                        <>
                            <li className="header-show-nav-list__item" ><FaUser className="header-show-nav-list__item--icon" /></li>
                            <li className="header-show-nav-list__item" onClick={() => navigateLink( '/profile' )} >{props.user.username}</li>
                        </>
                        ): (
                            <li className="header-show-nav-list__item"><button onClick={() => navigateLink( '/login' )} className="header-show-nav-list__item--button">Log In</button></li>
                        )}
                        
                    </ul>
                </nav>
                <div className="header-show-menu">
                    <AiOutlineMenu size="20px" className="header-show-menu-icon" onClick={() => showMenu(0)} ></AiOutlineMenu>
                </div>
            </section>
        </header> 
    )
}

const mapStateToProps = (state:IState) => ({
    user: state.user
})

export default connect(mapStateToProps , null)(Header)
