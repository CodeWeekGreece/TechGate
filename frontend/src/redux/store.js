import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from "./reducers/rootReducer";


const middelware = [thunk]

const composeEnhancers = composeWithDevTools({ trace: true, traceLimit: 25 })

const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(...middelware)),
);

export default store;