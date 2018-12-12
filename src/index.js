import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { reduxFirestore, getFirestore } from 'redux-firestore';
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase';
import { Router, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";

import fbConfig from './config/fbConfig';
import rootReducer from './reducers/rootReducer';
import registerServiceWorker from './registerServiceWorker';

import App from './App';

const store = createStore(rootReducer,
    compose(
        applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })),
        reduxFirestore(fbConfig),
        reactReduxFirebase(fbConfig)
    )
)

const hist = createBrowserHistory();

ReactDOM.render(
    <Provider store={store}>
        <Router history={hist}>
            <Switch>
                <App />
            </Switch>
        </Router>
    </Provider>
    , document.getElementById('root'));
registerServiceWorker();
