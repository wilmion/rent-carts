import React from 'react'

import { cycleElement } from '../utils/cycleElement';

import "../sass/components/nav-option.scss";

interface IProps {
    options:string[];
    callback:(option:string) => any
}

const navOptions:React.FC<IProps> = (props) => {

    const toogleOption = (e:any):void => {
        cycleElement(
            e.target , 
            '.nav-options' , 
            'nav-options__option' , 
            'nav-options__option nav-options__option--active' ,
            (e) => {
                const option:string = e.innerText;
                props.callback(option);
            }
        )
    }

    return (
        <section className="nav-options">
            {props.options.map((o , i:number) => (
                <h5 
                    className={`nav-options__option ${i === 0 && "nav-options__option--active"}`} 
                    key={o} 
                    onClick={toogleOption}
                >{o}</h5>
            ))}     
        </section>
    )
}

export default navOptions
