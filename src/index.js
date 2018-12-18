import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { reduxFirestore, getFirestore } from 'redux-firestore';
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase';
import { Router, Switch, Route } from "react-router-dom";
import { createBrowserHistory } from "history";

import "./assets/css/nucleo-icons.css"
import "./assets/css/black-dashboard-react.css"

import fbConfig from './config/fbConfig';
import rootReducer from './reducers/rootReducer';
import registerServiceWorker from './registerServiceWorker';

// import App from './App';
import AdminLayout from './layouts/Admin';

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
                <Route path="/" render={props => <AdminLayout {...props} />} />
                {/* <Redirect from="/" to="/dashboard" /> */}
            </Switch>
        </Router>
    </Provider>
    , document.getElementById('root'));
registerServiceWorker();
