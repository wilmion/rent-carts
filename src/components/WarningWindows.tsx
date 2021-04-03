import React,{useState} from 'react'

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
        window.style.transform = `translateX(0%)`;
    },70)
    
    return (
        <section className="warning-window" id="warning-window">
        
        </section>
    )
}



export default WarningWindows
