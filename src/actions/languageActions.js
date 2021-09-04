import AprumAPI from "../apis/AprumAPI";
import { LANGUAGES_LOADED, LANGUAGES_LOADING } from "./types";

export const languageLoading = () => ({
  type: LANGUAGES_LOADING,
});

export const languageLoaded = (payload) => ({
  type: LANGUAGES_LOADED,
  payload,
});

export const loadLanguage = () => (dispatch) => {
  dispatch(languageLoading());
  AprumAPI.get("/languages").then((res) => dispatch(languageLoaded(res.data)));
};
