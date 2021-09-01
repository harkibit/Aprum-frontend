import { loadingBarReducer } from "react-redux-loading-bar";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  loading: loadingBarReducer,
});

export default rootReducer;
