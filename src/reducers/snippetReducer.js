import {
  RESET_CURRENT_SNIPPET,
  SET_SNIPPET_BODY,
  SET_SNIPPET_DESCRIPTION,
  SET_SNIPPET_LANGUAGE,
  SET_SNIPPET_LANGUAGE_VERSION,
  SET_SNIPPET_TITLE,
  SET_SNIPPET_VISIBILITY,
  SNIPPET_EXEC_FAILED,
  SNIPPET_EXEC_LOADING,
  SNIPPET_EXEC_SUCCESS,
} from "../actions/types";

const initialState = {
  exec: {
    isLoading: false,
    outputs: [],
    cpuTime: null,
    memory: null,
  },
  currentSnippet: {
    title: "My New Snippet",
    description: "",
    body: null,
    language: null,
    public: false,
    version: {
      versionIndex: null,
      versionId: null,
    },
  },
};

const snippetReducer = (state = initialState, action) => {
  switch (action.type) {
    case SNIPPET_EXEC_LOADING:
      return {
        ...state,
        exec: {
          ...state.exec,
          isLoading: true,
          cpuTime: null,
          memory: null,
        },
      };
    case SNIPPET_EXEC_SUCCESS:
      return {
        ...state,
        exec: {
          isLoading: false,
          outputs: [action.payload.output, ...state.exec.outputs],
          cpuTime: action.payload.cpuTime,
          memory: action.payload.memory,
        },
      };
    case SNIPPET_EXEC_FAILED:
      return {
        ...state,
        exec: {
          ...state.exec,
          isLoading: false,
        },
      };
    case SET_SNIPPET_BODY:
      return {
        ...state,
        currentSnippet: {
          ...state.currentSnippet,
          body: action.payload,
        },
      };
    case SET_SNIPPET_LANGUAGE:
      return {
        ...state,
        currentSnippet: {
          ...state.currentSnippet,
          language: action.payload,
        },
      };
    case SET_SNIPPET_LANGUAGE_VERSION:
      return {
        ...state,
        currentSnippet: {
          ...state.currentSnippet,
          version: action.payload,
        },
      };
    case SET_SNIPPET_TITLE:
      return {
        ...state,
        currentSnippet: {
          ...state.currentSnippet,
          title: action.payload,
        },
      };
    case SET_SNIPPET_DESCRIPTION:
      return {
        ...state,
        currentSnippet: {
          ...state.currentSnippet,
          description: action.payload,
        },
      };
    case RESET_CURRENT_SNIPPET:
      return {
        ...state,
        currentSnippet: {
          ...state.currentSnippet,
          title: "My New Snippet",
          description: "",
          body: null,
          public: false,
        },
      };
    case SET_SNIPPET_VISIBILITY:
      return {
        ...state,
        currentSnippet: {
          ...state.currentSnippet,
          public: action.payload,
        },
      };
    default:
      return state;
  }
};

export default snippetReducer;
