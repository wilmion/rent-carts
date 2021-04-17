import React from 'react'

import { GiCarDoor } from 'react-icons/gi';
import { FaExchangeAlt , FaUserAlt } from 'react-icons/fa';

import { ICart } from '../models/interface';

import "../sass/components/cart-card-more-details.scss";
import { useHistory } from 'react-router-dom';

const CartCardMoreDetails:React.FC<ICart> = (props) => {

    const history = useHistory();

    const simplifyTransmition = (transmition:'Automatic' | 'Mecanic'):string => {
        let simplify:string;
        switch(transmition) {
            case 'Automatic':
                simplify = 'AT';
                break;
            case 'Mecanic':
                simplify = 'MEC';
                break;
        }
        return simplify;
    }

    return (
        <section className="cart-card-details">
            <article className="cart-card-details-header">
                <img src={props.image} alt={props.name} onClick={() => history.push('/cart/' + props._id)} />
                <div className="cart-card-details-header-detail">
                    <p className="cart-card-details-header-detail__mark">{props.mark}</p>
                    <div className="cart-card-details-header-detail-title">
                        <h4 className="cart-card-details-header-detail-title__title">{props.name}</h4>
                        <p className="cart-card-details-header-detail-title__creationYear">{props.creationYear}</p>
                    </div>
                    <h5 className="cart-card-details-header-detail__price">${props.price}/<small>day</small></h5>
                </div>
            </article>
            <article className="cart-card-details-footer">
                <div className="cart-card-details-footer-feature">
                    <FaUserAlt className="cart-card-details-footer-feature__icon" />
                    <p className="cart-card-details-footer-feature__value">{props.features.capacity}</p>
                </div>
                <div className="cart-card-details-footer-feature">
                    <FaExchangeAlt className="cart-card-details-footer-feature__icon" />
                    <p className="cart-card-details-footer-feature__value" id="type-transmition" >{simplifyTransmition(props.features.typeTransmission)}</p>
                </div>
                <div className="cart-card-details-footer-feature">
                    <GiCarDoor className="cart-card-details-footer-feature__icon" />
                    <p className="cart-card-details-footer-feature__value">{props.features.doors}</p>
                </div>
                <h5 className="cart-card-details-footer__prop">{props.features.typeCart}</h5>
                <h5 className="cart-card-details-footer__prop">{props.features.cc}cc</h5>
            </article>
        </section>
    )
}

export default CartCardMoreDetails
