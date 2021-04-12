import React from 'react'
import { connect } from 'react-redux'

import { ICart, IState } from '../models/interface';
import "../sass/pages/cart-shop.scss";

interface IProps {
    product:ICart | null
}

const Payment:React.FC<IProps> = (props) => {
    return (
        <section className="product-payment">
            product payment shop work's
        </section>
    )
}

const mapStateToProps = (state:IState) => ({
    product: state.product
})
const mapDispatchToProps = {

};

export default connect( mapStateToProps , mapDispatchToProps )(Payment)
