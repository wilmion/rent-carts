import React from 'react'

import "../sass/components/cart-card.scss";

interface IProps {
    name:string,
    image:string,
    price:number
}
const cartCard:React.FC<IProps> = (props) => {
    return (
        <section className="cart-card">
            <h3 className="cart-card__name">{props.name}</h3>
            <h5 className="cart-card__price"><strong>${props.price}</strong>/day</h5>
            <img src={props.image} alt={props.name} />
            <button type="submit" className="cart-card__button">Book Now</button>
        </section>
    )
}

export default cartCard
