import React , { lazy , Suspense } from 'react'
import { BrowserRouter , Route , Switch } from 'react-router-dom'

//compoents

const Home = lazy(() => import('../pages/Home'));

const App:React.FC = () => {
    return (
        <Suspense fallback={<div />}>
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact component={Home} /> 
                </Switch>
            </BrowserRouter>
        </Suspense>
    )
}

export default App; 
