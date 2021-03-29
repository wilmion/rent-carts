import React from 'react'

import Header from '../components/Header';
import Footer from '../components/Footer';

import "../sass/globals.scss";

export const Layout:React.FC = (props) => {
    return (
        <>
            <Header />
            <main className="main">
                {props.children}
            </main>
            <Footer />   
        </>
    )
}

export default Layout;
