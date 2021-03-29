import React from 'react'
import { FaFacebookF , FaYoutube , FaGithub } from 'react-icons/fa';

import "../sass/components/footer.scss";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-section">
                <h4 className="footer-section__title">Company</h4>
            </div>
            <div className="footer-section">
                <h4 className="footer-section__title">My Account</h4>
            </div>
            <div className="footer-section">
                <h4 className="footer-section__title">Back To Top</h4>
            </div>
            <div className="footer-icons">
                <div className="footer-icons-icon">
                    <FaFacebookF className="footer-icons-icon__icon" />
                </div>
                <div className="footer-icons-icon">
                    <FaGithub className="footer-icons-icon__icon" />
                </div>
                <div className="footer-icons-icon">
                    <FaYoutube className="footer-icons-icon__icon" />
                </div>
            </div>
        </footer>
    );
}

export default Footer
