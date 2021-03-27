import React from 'react'

import Header from '../components/Header';

import "../sass/globals.scss";

export const Layout:React.FC = (props) => {
    return (
        <>
            <Header></Header>
            <main className="main">
                {props.children}
            </main>   
        </>
    )
}

export default Layout;
