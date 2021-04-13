import React from 'react'

import { Link } from 'react-router-dom'
import { AiFillCheckCircle } from 'react-icons/ai';

import "../sass/pages/success.scss";

const Success:React.FC = (props) => {
    return (
        <section className="checkout-success" >
            <AiFillCheckCircle className="checkout-success__check" />
            <h2 className="checkout-success__title">Success</h2>
            <p className="checkout-success__desc">Your Payment is passed , visit <Link to="/profile" className="checkout-success__desc--link">profile</Link></p>
        </section>
    )
}

export default Success
