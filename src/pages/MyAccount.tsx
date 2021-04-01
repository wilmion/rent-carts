import React from 'react';
import { connect } from 'react-redux';

import { IState, IUser } from '../models/interface';

import "../sass/pages/myAccount.scss";

interface IProps {
    user: IUser
}

const MyAccount:React.FC<IProps> = (props) => {
    return (
        <section className="my-profile">

        </section>
    )
}

const mapStateToProps = (state:IState) => ({
    user:state.user
})

export default connect(mapStateToProps , null)(MyAccount)
