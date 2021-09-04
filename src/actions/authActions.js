import { push } from "connected-react-router";
import { hideLoading, showLoading } from "react-redux-loading-bar";
import { toast } from "react-toastify";
import AprumAPI from "../apis/AprumAPI";
import {
  AUTH_FAILED,
  AUTH_LOADING,
  AUTH_SUCCESS,
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  USER_LOADING,
} from "./types";

// Action creators
export const authLoading = () => ({
  type: AUTH_LOADING,
});

export const userLoading = () => ({
  type: USER_LOADING,
});

export const authSuccess = (token) => ({
  type: AUTH_SUCCESS,
  payload: token,
});

export const authFailed = () => ({
  type: AUTH_FAILED,
});

export const loginSuccess = (user) => ({
  type: LOGIN_SUCCESS,
  payload: user,
});

export const loginFailed = () => ({
  type: LOGIN_FAILED,
});

// Actions

export const loadUser = () => (dispatch) => {
  dispatch(showLoading());
  dispatch(userLoading());
  AprumAPI.get("/user")
    .then((res) => {
      const { data: user } = res;
      dispatch(loginSuccess(user));
    })
    .catch(() => dispatch(loginFailed()))
    .finally(() => dispatch(hideLoading()));
};

export const loginUser = (values, actions) => (dispatch) => {
  dispatch(authLoading());
  dispatch(showLoading());
  AprumAPI.post("/auth/login", {
    email: values.email,
    password: values.password,
  })
    .then((res) => {
      const { token } = res.data;
      dispatch(authSuccess(token));
      dispatch(loadUser());
      dispatch(push("/"));
    })
    .catch(() => {
      dispatch(authFailed());
      actions.resetForm();
      toast.error("Please check your credentials and try again");
    })
    .finally(() => dispatch(hideLoading()));
};

export const registerUser = (values, actions) => (dispatch) => {
  dispatch(showLoading());
  AprumAPI.post("/auth/register", {
    username: values.username,
    email: values.email,
    password: values.password,
  })
    .then(() => {
      dispatch(loginUser(values));
      toast.success("You've been registered successfully!");
    })
    .catch((err) => {
      dispatch(authFailed());
      const { status, data } = err.response;
      if (status === 422) {
        Object.keys(data).forEach((key) =>
          actions.setFieldError(key, data[key][0])
        );
        actions.setSubmitting(false);
      }
    })
    .finally(() => dispatch(hideLoading()));
};
