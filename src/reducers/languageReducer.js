import { LANGUAGES_LOADED, LANGUAGES_LOADING } from "../actions/types";

const initialState = {
  isLoading: false,
  languages: [],
};

const languageReducer = (state = initialState, action) => {
  switch (action.type) {
    case LANGUAGES_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case LANGUAGES_LOADED:
      return {
        ...state,
        isLoading: false,
        languages: action.payload,
      };
    default:
      return state;
  }
};

export default languageReducer;
