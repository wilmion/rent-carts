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
            Payments work's
        </section>
    )
}

const mapStateToProps = (state:IState) => ({
    payments: []
})

export default connect( mapStateToProps , null )(AdminPayments);
