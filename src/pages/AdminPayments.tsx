import React from 'react'
import { connect } from 'react-redux';

import { IState } from '../models/interface'

import "../sass/pages/admin-payments.scss";


interface IProps {
    payments?: Array<any>;
}

const AdminPayments:React.FC<IProps> = (props) => {
    return (
        <section className="admin-payments">
            <h2 className="admin-payments__title">Payment's</h2>
            <section className="admin-payments-contain">
                <article className="admin-payments-contain-item">
                    <div className="admin-payments-contain-item__image">
                        <img src="https://www.paypalobjects.com/webstatic/icon/pp258.png" alt="icon"/>
                    </div>
                    <section className="admin-payments-contain-item-information">
                        <h4 className="admin-payments-contain-item-information__title">PAYPAL</h4>
                        <h5 className="admin-payments-contain-item-information__data">yWLdLwgitBnKNs3we0wGE4iAkCW1X1yW</h5>
                        <button className="admin-payments-contain-item-information__edit">EDIT</button>
                    </section>
                </article>
            </section>
        </section>
    )
}

const mapStateToProps = (state:IState) => ({
    payments: []
})

export default connect( mapStateToProps , null )(AdminPayments);
