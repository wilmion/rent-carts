import React from 'react'
import { useHistory , useParams } from 'react-router';
import { connect } from 'react-redux';

import NavOptions from '../components/NavOptions';
import AdminProducts from '../pages/AdminProducts';
import AdminUsers from '../pages/AdminUsers';
import AdminPayments from '../pages/AdminPayments';

import { IState, IUser } from '../models/interface';

interface IProps {
    user:IUser;
}

const Admin:React.FC<IProps> = (props) => {

    const params = useParams<{section:string}>()
    const history = useHistory()

    if(props.user && props.user.email !== "wilmion92@gmail.com") {history.push('/');}
    
    const getActiveIndex = ():number => {
        switch(params.section) {
            case 'products':
                return 0;
            case 'users':
                return 1;
            case 'payments':
                return 2;
            default:
                history.push('/');
                return 0;
        }
    }

    return (
        <section className="admin">
            <NavOptions callback={(option:string) => history.push('/admin/' + option.toLowerCase())} options={['Products' , 'Users' , 'Payments']} activeIndex={getActiveIndex()} />
            {getActiveIndex() === 0 && <AdminProducts />}
            {getActiveIndex() === 1 && <AdminUsers />}
            {getActiveIndex() === 2 && <AdminPayments />}
        </section>
    )
}

const mapStateToProps = (state:IState) => ({
    user: state.user
})

export default connect( mapStateToProps , null )(Admin)
