import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { createBrowserHistory } from "history";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux'
import indexRoutes from "./routes/index.jsx";
import './App.css';

import { RouterToUrlQuery } from 'react-url-query';
import store from './store'

import fetchIntercept from 'fetch-intercept';



export const getCookie = name => {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        let cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
};


const unregister = fetchIntercept.register({
    request: function (url, config) {
        // Modify the url or config here

        config['headers']= {
            "Content-Type": "application/json",
            'X-CSRFToken': getCookie('csrftoken'),
        };
        config['credentials'] = 'include';

        return [url, config];
    },

    requestError: function (error) {
        // Called when an error occurred during another 'request' interceptor call
        return Promise.reject(error);
    },

    response: function (response) {
        // Modify the response object
        return response;
    },

    responseError: function (error) {
        // Handle an fetch error
        return Promise.reject(error);
    }
});




const hist = createBrowserHistory();

ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter history={hist} basename="/dashboard/">
          <RouterToUrlQuery>
        <Switch >
          {indexRoutes.map((prop, key) => {
            return <Route path={prop.path} component={prop.component} key={key} />;
          })}
        </Switch>
          </RouterToUrlQuery>
      </BrowserRouter>
    </Provider>,
document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
