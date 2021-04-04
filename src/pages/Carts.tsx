import React, { useState } from 'react'

import CartCardMoreDetail from '../components/CartCardMoreDetails';
import Loading from '../components/Loading';
import NavOptions from '../components/NavOptions';

import { connect } from 'react-redux';

import { ICart, IState } from '../models/interface';

import "../sass/pages/carts.scss";

let all:boolean = true;

interface IProps {
    carts:ICart[]
}

const Carts:React.FC<IProps> = (props) => {

    const [response , setResponse] = useState<ICart[]>([]);
    const res = props.carts;

    const toogleOption = (option:string):void => {
        all = (option === 'All Cars');
        const data:ICart[] = !all? res.filter((c) => c.features.typeCart === option) : res;

        setResponse(data);
    }

    const renderData = ():JSX.Element => {
        let carts:ICart[];

        if(!all){
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
            <NavOptions options={['All Cars','Hatchback','Sedan','SUV','Pickup']} callback={toogleOption} />
            {res && res.length > 0? renderData() : <Loading />}
        </section>
    )
}

const mapStateToProps = (state:IState) => ({
    carts: state.carts
})

export default connect(mapStateToProps , null)(Carts)
