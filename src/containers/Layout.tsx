import React from 'react'

import Header from '../components/Header';
import Footer from '../components/Footer';

import { getDataFromAPI } from '../utils/redux/getDataFromApi'

import "../sass/globals.scss";

export const Layout:React.FC = (props) => {
    getDataFromAPI()
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
