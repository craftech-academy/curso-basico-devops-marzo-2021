import { createStore,combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import requestsLoan from "./views/RequestsLoan/reducers/requests";

const store = createStore(
    combineReducers({
        requestsLoan,
    }),
    {},
    applyMiddleware(logger,thunk)
);

export default store;
