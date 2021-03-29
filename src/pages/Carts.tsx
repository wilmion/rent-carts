import React from 'react'
import { useGet } from '../hooks/apiConsumer';

import CartCardMoreDetail from '../components/CartCardMoreDetails';
import Loading from '../components/Loading';

import { cycleElement } from '../utils/cycleElement';

import { ICart } from '../models/interface';

import "../sass/pages/carts.scss";

let all:boolean = false;

const Carts = () => {

    const [response , setResponse , res ] = useGet('carts' , []);

    const toogleOption = (e:any):void => {
        cycleElement(
            e.target , 
            '.carts-options' , 
            'carts-options__option' , 
            'carts-options__option carts-options__option--active' ,
            (e) => {
                const option:string = e.innerText;

                all = !(option !== 'All Cars');
                const data:ICart[] = option !== 'All Cars'? res.filter((c) => c.features.typeCart === option) : res;

                setResponse(data);
            }
        )
    }

    const renderData = ():JSX.Element => {
        let carts:ICart[];

        if(all){
            carts = response;
        } else {
            carts = [];
            res.forEach((r:ICart , i:number) => {
                if(i < 10){
                    carts.push(r);
                }
            })
        }

        return (<>{carts.map(c => <CartCardMoreDetail key={c._id} {...c} />)}</>)

    }

    return (
        <section className="carts">
            <section className="carts-options">
                <h5 className="carts-options__option carts-options__option--active" onClick={toogleOption}>All Cars</h5>
                <h5 className="carts-options__option" onClick={toogleOption} >Hatchback</h5>
                <h5 className="carts-options__option" onClick={toogleOption}>Sedan</h5>
                <h5 className="carts-options__option" onClick={toogleOption}>SUV</h5>
                <h5 className="carts-options__option" onClick={toogleOption}>Pickup</h5>
            </section>
            {res? renderData() : <Loading />}
        </section>
    )
}

export default Carts
