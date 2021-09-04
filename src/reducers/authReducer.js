import {
  AUTH_FAILED,
  AUTH_LOADING,
  AUTH_SUCCESS,
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  USER_LOADING,
} from "../actions/types";

const token = localStorage.getItem("token");
const initialState = {
  isLoading: false,
  isAuthenticated: token ? true : false,
  token,
  currentUser: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_LOADING:
    case USER_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case AUTH_SUCCESS:
      localStorage.setItem("token", action.payload);
      return {
        ...state,
        token: action.payload,
        isAuthenticated: true,
      };
    case AUTH_FAILED:
    case LOGIN_FAILED:
      localStorage.removeItem("token");
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default authReducer;
