import React from 'react'
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

import { IPaymentApi, IState } from '../models/interface';

import "../sass/pages/payment-detail.scss";

interface IProps {
    payments: IPaymentApi[]
}

const PaymentDetail:React.FC<IProps> = (props) => {

    const params = useParams<{id:string}>();

    const payment:IPaymentApi = props.payments.find(p => p._id === params.id);

    console.log(params , payment);
    const generateInformation = ():Array<string> => {
        let values:Array<string> = [];
        for(const prop in payment) {
            values.push(prop)
        }
        return values;
    }

    return (
        <section className="payment-detail">
            <h2 className="payment-detail__title">Payment Method PAYPAL</h2>
            <img src="https://e7.pngegg.com/pngimages/711/9/png-clipart-paypal-logo-brand-font-payment-paypal-text-logo-thumbnail.png" alt="xdxdxdxdxdxdxdxdxx"/>
            <h5 className="payment-detail__section-title">Information: </h5>
            <section className="payment-detail-contain">
                {generateInformation().map(prop => <div className="payment-detail-contain-prop" key={prop}>
                    <div className="payment-detail-contain-prop__key"><p>{prop}</p></div>
                    <input type="text" id="propietyName" defaultValue={payment[prop]} name="propietyName" className="payment-detail-contain-prop__input"/>
                </div>)}
                <button type="button" className="payment-detail-contain__button">Update</button>
            </section>
        </section>
    )
}

const mapStateToProps = (state:IState) => ({
    payments: state.payments
})

export default connect( mapStateToProps , null )(PaymentDetail)
