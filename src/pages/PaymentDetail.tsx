import React from 'react'
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

import { IPaymentApi, IState } from '../models/interface';

import "../sass/pages/payment-detail.scss";

interface IProps {
    payments: IPaymentApi[]
}

const PaymentDetail:React.FC<IProps> = () => {

    const params = useParams<{id:string}>();

    console.log(params);

    return (
        <section className="payment-detail">
            Payment work's
        </section>
    )
}

const mapStateToProps = (state:IState) => ({
    payments: state.payments
})

export default connect( mapStateToProps , null )(PaymentDetail)
