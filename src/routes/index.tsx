import React , { lazy , Suspense } from 'react';
import { BrowserRouter , Route , Switch } from 'react-router-dom';

import { getCookie } from '../utils/getCookie';
import { logIn } from '../utils/redux/login';

//compoents
const Layout = lazy(() => import('../containers/Layout'));
const Home = lazy(() => import('../pages/Home'));
const Carts = lazy(() => import('../pages/Carts'));
const Cart = lazy(() => import('../pages/Cart'));
const Login = lazy(() => import('../pages/Login'));
const Register = lazy(() => import('../pages/Register'));

const App:React.FC = () => {

    const token:string = getCookie('token');
    const id:string = getCookie('id')

    const logged:boolean = token !== '' && id !== '';
    if(logged) {
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
                    </Layout>
                    
                </Switch>
            </BrowserRouter>
        </Suspense>
    )
}

export default App; 
