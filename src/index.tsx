import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import initialState from './initialState';
import { reducer } from './redux/reducers';

import App from './routes/index';
export const store = createStore(reducer , initialState);

const app:HTMLElement = document.getElementById('app');

ReactDOM.render((
    <Provider store={store}>
        <App />
    </Provider>
), app);