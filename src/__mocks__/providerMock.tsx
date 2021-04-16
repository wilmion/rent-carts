import React from 'react';
import { createBrowserHistory } from 'history'
import { createStore } from 'redux'; 
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { reducer } from '../redux/reducers';
import initialState from '../initialState';

const history = createBrowserHistory();
const store = createStore(reducer , initialState)

const providerMock:React.FC = props => {
    return (
        <Provider store={store}>
            <Router history={history}>
                {props.children}
            </Router>         
        </Provider>
    )
}

export default providerMock
