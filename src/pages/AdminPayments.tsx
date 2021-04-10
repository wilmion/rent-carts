import React from 'react'
import { connect } from 'react-redux';
import crypto from 'crypto-js';

import Loading from '../components/Loading';

import { IState , IPayment, IPaymentApi } from '../models/interface'

import "../sass/pages/admin-payments.scss";
import { useHistory } from 'react-router-dom';


interface IProps {
    payments?: IPaymentApi[];
}

const AdminPayments:React.FC<IProps> = (props) => {
    const paymentsAPI:IPaymentApi[] = props.payments;

    const history = useHistory();

    const goTo = (id:string):void => {
        history.push(`/admin/payment/${id}`);
    }

    let payments:IPayment[] = [];

    paymentsAPI.forEach(p => {
        const data:IPayment = JSON.parse(crypto.AES.decrypt( p.data , process.env.CRYPTO_SECRET ).toString(crypto.enc.Utf8))
        payments.push({
            _id: p._id,
            dataEncrypt: p.data,
            ...data
        })
    })

    if(payments.length === 0) return <Loading></Loading>
    return (
        <section className="admin-payments">
            <h2 className="admin-payments__title">Payment's</h2>
            <section className="admin-payments-contain">
                {payments.map(p => (
                    <article className="admin-payments-contain-item" key={p._id} >
                        <div className="admin-payments-contain-item__image">
                            <img src={p.image} alt={p.method} />
                        </div>
                        <section className="admin-payments-contain-item-information">
                            <h4 className="admin-payments-contain-item-information__title">{p.method.toUpperCase()}</h4>
                            <h5 className="admin-payments-contain-item-information__data">{p.dataEncrypt}</h5>
                            <button className="admin-payments-contain-item-information__edit" onClick={() => goTo(p._id)} >EDIT</button>
                        </section>
                    </article>
                ))}
                
            </section>
        </section>
    )
}

const mapStateToProps = (state:IState) => ({
    payments: state.payments
})

export default connect( mapStateToProps , null )(AdminPayments);
