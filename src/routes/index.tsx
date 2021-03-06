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
const Payment = lazy(() => import('../pages/Payment'));
const Login = lazy(() => import('../pages/LogIn'));
const Success = lazy(() => import('../pages/Success'));
const Register = lazy(() => import('../pages/Register'));
const MyAccount = lazy(() => import('../pages/MyAccount'));
const Admin = lazy(() => import('../containers/Admin'));
const AddOrEditProduct = lazy(() => import('../pages/AddOrEditProduct'));
const PaymentDetail = lazy(() => import('../pages/PaymentDetail'));
const AdminUserRentedProducts = lazy(() => import('../pages/AdminUserRentedProducts'));
const NotFound = lazy(() => import('../pages/NotFound'));
const About = lazy(() => import('../pages/About'));

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
                <Layout>
                    <Switch>
                        <Route path="/" exact component={Home} /> 
                        <Route path="/carts" exact component={Carts} /> 
                        <Route path="/cart/:id" exact component={Cart} /> 
                        <Route path="/login" exact component={logged? Home : Login} /> 
                        <Route path="/register" exact component={logged? Home : Register} /> 
                        <Route path="/profile" exact component={logged? MyAccount : Login} /> 
                        <Route path="/checkout/payment" exact component={logged? Payment : Login} /> 
                        <Route path="/checkout/success" exact component={logged? Success : Login} /> 
                        <Route path="/admin/:section" exact component={Admin} />
                        <Route path="/admin/add/:id" exact component={AddOrEditProduct} />
                        <Route path="/admin/payment/:id" exact component={PaymentDetail} />
                        <Route path="/admin/user/:id" exact component={AdminUserRentedProducts} />
                        <Route path="/about" exact component={About} /> 
                        <Route exact component={NotFound} />
                    </Switch>
                </Layout>
            </BrowserRouter>
        </Suspense>
    )
}

const mapStateToProps = (state:IState) => ({
    user: state.user
})

export default connect( mapStateToProps , null )(App); 
