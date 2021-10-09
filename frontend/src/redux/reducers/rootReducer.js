import shopReducer from "./shopReducers";
import authReducer from "./authReducer";
import messagesReducer from "./messagesReducer";

import { combineReducers } from "redux";

const rootReducer = combineReducers({ 
    shops: shopReducer, 
    auth: authReducer, 
    msg: messagesReducer, 
});

export default rootReducer;