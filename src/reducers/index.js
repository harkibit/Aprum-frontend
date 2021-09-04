import { connectRouter } from "connected-react-router";
import { loadingBarReducer } from "react-redux-loading-bar";
import { combineReducers } from "redux";

import authReducer from "./authReducer";
import languageReducer from "./languageReducer";
import snippetReducer from "./snippetReducer";

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    auth: authReducer,
    loadingBar: loadingBarReducer,
    snippet: snippetReducer,
    language: languageReducer,
  });

export default createRootReducer;
