import Reducer from "./Reducer";

import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

const reducer = combineReducers({ Reducer });

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;