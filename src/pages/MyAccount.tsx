import React from 'react';
import { connect } from 'react-redux';

import { IState } from '../models/interface';

import "../sass/pages/myAccount.scss";

const MyAccount = () => {
    return (
        <section className="my-profile">

        </section>
    )
}

const mapStateToProps = (state:IState) => ({
    user:state.user
})

export default connect(mapStateToProps , null)(MyAccount)
