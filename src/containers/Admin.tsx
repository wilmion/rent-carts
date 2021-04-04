import React from 'react'
import { useHistory , useParams } from 'react-router';

import NavOptions from '../components/NavOptions';
import AdminProducts from '../pages/AdminProducts';

interface IProps {
    activeDefault:number;
}

const Admin:React.FC<IProps> = (props) => {

    const params = useParams<{section:string}>()
    const history = useHistory()
    
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
            {
                getActiveIndex() === 0 && <AdminProducts />
            }
        </section>
    )
}

export default Admin