import React,{useState} from 'react';

import { AiFillWarning } from 'react-icons/ai';

import "../sass/components/warning-windows.scss";

interface IProps {
    message:string;
    cb:() => void
}

const WarningWindows:React.FC<IProps> = (props) => {

    const handleSubmit = ():void => {
        const window : HTMLElement = document.getElementById('warning-window');
        window.style.transform = `translateX(-100%)`;
        setTimeout(() => {
            props.cb();
        },1000)
    }

    setTimeout(() => {
        const window : HTMLElement = document.getElementById('warning-window');
        window.style.transform = `translateX(5%)`;
    },70)
    
    return (
        <section className="warning-window" id="warning-window">
            <section className="warning-window-header">
                <AiFillWarning className="warning-window-header__icon" />
                <h4 className="warning-window-header__title">Warning</h4>
            </section>
            <p className="warning-window__text">{props.message}</p>
            <button className="warning-window__submit" onClick={handleSubmit} >OK!</button>
        </section>
    )
}



export default WarningWindows
