import React from 'react'

import { BiErrorCircle } from 'react-icons/bi'

import "../sass/components/error-window.scss";

interface IProps {
    message:string;
    callback:() => any;
}

const ErrorWindow:React.FC<IProps> = (props) => {
    setTimeout(() => {
        const error:HTMLElement = document.querySelector('.error');
        error.style.transform = 'translateX(5%)'
    },60)
    const handleClose = ():void => {
        const error:HTMLElement = document.querySelector('.error');
        error.style.transform = 'translateX(-100%)'
        setTimeout(() => {
            props.callback();
        } , 1000);
    }

    return (
        <article className="error ">
            <div className="error-header">
                <BiErrorCircle className="error-header__icon" />
                <h4 className="error-header__title">A error Ocurred!!</h4>
            </div>
            <p className="error__message">{props.message}</p>
            <button className="error__close" onClick={handleClose} >Click for close</button>
        </article>
    )
}

export default ErrorWindow
