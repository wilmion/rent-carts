import React from 'react';
import { FaCarCrash } from 'react-icons/fa';

import { visibleHeaderAndFooter } from '../utils/dom/DOM';

import "../sass/pages/404.scss";

const NotFound:React.FC = () => {
    return (
        <section className="not-found">
            <div className="not-found-container">
                <FaCarCrash className="not-found-container__icon" />
                <h3 className="not-found-container__title">404</h3>
                <p className="not-found-container__desc">Error , Not Found</p>
            </div>
        </section>
    )
}

export default NotFound
