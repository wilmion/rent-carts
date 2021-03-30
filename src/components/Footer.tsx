import React from 'react'
import { FaFacebookF , FaYoutube , FaGithub } from 'react-icons/fa';

import { navigateURL } from '../utils/navigateURL';

import "../sass/components/footer.scss";
import {Link} from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-section">
                <Link to="/about" className="footer-section__title">Company</Link>
            </div>
            <div className="footer-section">
                <Link to="/profile" className="footer-section__title">My Account</Link>
            </div>
            <div className="footer-section">
                <Link to="#header" className="footer-section__title">Back To Top</Link>
            </div>
            <div className="footer-icons">
                <div className="footer-icons-icon">
                    <FaFacebookF className="footer-icons-icon__icon" onClick={() => navigateURL('https://www.facebook.com/groups/reactjslatino/?multi_permalinks=1843460149162610')} />
                </div>
                <div className="footer-icons-icon">
                    <FaGithub className="footer-icons-icon__icon" onClick={() => navigateURL('https://github.com/wilmion/rent-carts')} />
                </div>
                <div className="footer-icons-icon">
                    <FaYoutube className="footer-icons-icon__icon" onClick={() => navigateURL('https://www.youtube.com/channel/UCOwla7VPongSVz4HlW-lMtA')} />
                </div>
            </div>
        </footer>
    );
}

export default Footer
