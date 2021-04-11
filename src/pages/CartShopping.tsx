import React from 'react'
import { connect } from 'react-redux'

import { IState } from '../models/interface';
import "../sass/pages/cart-shop.scss";

interface IProps {
    cart:any[]
}

const CartShopping:React.FC<IProps> = (props) => {
    return (
        <section className="cart-shop">
            cart shop work's
        </section>
    )
}

const mapStateToProps = (state:IState) => ({
    cart: state.cart
})
const mapDispatchToProps = {

};

export default connect( mapStateToProps , mapDispatchToProps )(CartShopping)
