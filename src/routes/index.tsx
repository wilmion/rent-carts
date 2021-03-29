import React , { lazy , Suspense } from 'react';
import { BrowserRouter , Route , Switch } from 'react-router-dom';

//compoents
const Layout = lazy(() => import('../containers/Layout'));
const Home = lazy(() => import('../pages/Home'));
const Carts = lazy(() => import('../pages/Carts'));

const App:React.FC = () => {
    return (
        <Suspense fallback={<div />}>
            <BrowserRouter>
                <Switch>
                    <Layout>
                        <Route path="/" exact component={Home} /> 
                        <Route path="/carts" exact component={Carts} /> 
                    </Layout>         
                </Switch>
            </BrowserRouter>
        </Suspense>
    )
}

export default App; 
