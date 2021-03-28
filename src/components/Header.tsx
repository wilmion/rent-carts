import React from 'react';
import { useHistory } from 'react-router';

import { AiOutlineMenu } from 'react-icons/ai';
import { BiArrowBack } from 'react-icons/bi';

import "../sass/layout/header.scss"

const Header = () => {
    const history = useHistory();
    return (
        <header className="header">
            <BiArrowBack className="header__icon-left" size="20px" onClick={() => history.goBack()} ></BiArrowBack>
            <h3 className="header__title">Find your car</h3>
            <div className="header-menu">
                <AiOutlineMenu size="20px" className="header-menu-icon" ></AiOutlineMenu>
            </div>
        </header> 
    )
}

export default Header
