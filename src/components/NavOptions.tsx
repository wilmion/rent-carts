import React from 'react'

import { cycleElement } from '../utils/cycleElement';

import "../sass/components/nav-option.scss";

interface IProps {
    options:string[];
    callback:(option:string) => any;
    activeIndex?:number
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
    const activeDefault = ():number => {
        return props.activeIndex? props.activeIndex : 0;
    } 

    return (
        <section className="nav-options">
            {props.options.map((o , i:number) => (
                <h5 
                    className={`nav-options__option ${i === activeDefault() && "nav-options__option--active"}`} 
                    id={`nav_option${i}`}
                    key={o} 
                    onClick={toogleOption}
                >{o}</h5>
            ))}     
        </section>
    )
}

export default navOptions
