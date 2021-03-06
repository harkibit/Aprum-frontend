import { createBrowserHistory } from "history";
import { applyMiddleware, createStore } from "redux";
import { routerMiddleware } from "connected-react-router";
import { composeWithDevTools } from "redux-devtools-extension";

import thunk from "redux-thunk";
import createRootReducer from "./reducers";

export const history = createBrowserHistory();
export default createStore(
  createRootReducer(history),
  composeWithDevTools(applyMiddleware(thunk, routerMiddleware(history)))
);
