import React , { lazy , Suspense } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter , Route , Switch } from 'react-router-dom';
import { IState, IUser } from '../models/interface';

import { getCookie } from '../utils/getCookie';
import { logIn } from '../utils/redux/login';

//compoents
const Layout = lazy(() => import('../containers/Layout'));
const Home = lazy(() => import('../pages/Home'));
const Carts = lazy(() => import('../pages/Carts'));
const Cart = lazy(() => import('../pages/Cart'));
const Login = lazy(() => import('../pages/Login'));
const Register = lazy(() => import('../pages/Register'));
const MyAccount = lazy(() => import('../pages/MyAccount'));
const Admin = lazy(() => import('../containers/Admin'));
const AddOrEditProduct = lazy(() => import('../pages/AddOrEditProduct'));
const PaymentDetail = lazy(() => import('../pages/PaymentDetail'));

let loggeaded:boolean = false

const App:React.FC<{user:IUser | null}> = (props) => {

    const token:string = getCookie('token');
    const id:string = getCookie('id')

    const logged = props.user;
    if(token !== '' && id !== '' &&  !loggeaded) {
        loggeaded = true;
        logIn( token , id );
    }

    return (
        <Suspense fallback={<div />}>
            <BrowserRouter>
                <Switch>
                    <Layout>
                        <Route path="/" exact component={Home} /> 
                        <Route path="/carts" exact component={Carts} /> 
                        <Route path="/cart/:id" exact component={Cart} /> 
                        <Route path="/login" exact component={logged? Home : Login} /> 
                        <Route path="/register" exact component={logged? Home : Register} /> 
                        <Route path="/profile" exact component={logged? MyAccount : Login} /> 
                        <Route path="/admin/:section" exact component={Admin} /> 
                        <Route path="/admin/add/:id" exact component={AddOrEditProduct} /> 
                        <Route path="/admin/payment/:id" exact component={PaymentDetail} /> 
                    </Layout>
                    
                </Switch>
            </BrowserRouter>
        </Suspense>
    )
}

const mapStateToProps = (state:IState) => ({
    user: state.user
})

export default connect( mapStateToProps , null )(App); 
