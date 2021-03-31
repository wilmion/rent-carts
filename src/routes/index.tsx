import React , { lazy , Suspense } from 'react';
import { BrowserRouter , Route , Switch } from 'react-router-dom';

//compoents
const Layout = lazy(() => import('../containers/Layout'));
const Home = lazy(() => import('../pages/Home'));
const Carts = lazy(() => import('../pages/Carts'));
const Cart = lazy(() => import('../pages/Cart'));
const Login = lazy(() => import('../pages/Login'));

const App:React.FC = () => {
    return (
        <Suspense fallback={<div />}>
            <BrowserRouter>
                <Switch>
                    <Layout>
                        <Route path="/" exact component={Home} /> 
                        <Route path="/carts" exact component={Carts} /> 
                        <Route path="/cart/:id" exact component={Cart} /> 
                        <Route path="/login" exact component={Login} /> 
                    </Layout>
                    
                </Switch>
            </BrowserRouter>
        </Suspense>
    )
}

export default App; 
