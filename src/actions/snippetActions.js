import { NullOrEmpty } from "../utils";
import { toast } from "react-toastify";
import AprumAPI from "../apis/AprumAPI";

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
  SNIPPET_SAVE_LOADING,
  SNIPPET_SAVE_SUCCESS,
} from "./types";

export const snippetExecLoading = () => ({
  type: SNIPPET_EXEC_LOADING,
});

export const snippetExecSuccess = (data) => ({
  type: SNIPPET_EXEC_SUCCESS,
  payload: data,
});

export const snippetExecFailed = () => ({
  type: SNIPPET_EXEC_FAILED,
});

export const resetCurrentSnippet = () => ({
  type: RESET_CURRENT_SNIPPET,
});
// Current snippet
export const setSnippetBody = (body) => ({
  type: SET_SNIPPET_BODY,
  payload: body,
});

export const setSnippetLanguage = (language) => ({
  type: SET_SNIPPET_LANGUAGE,
  payload: language,
});

export const setSnippetVisibility = (payload) => ({
  type: SET_SNIPPET_VISIBILITY,
  payload,
});

export const setSnippetLanguageVersion = (version) => ({
  type: SET_SNIPPET_LANGUAGE_VERSION,
  payload: version,
});

export const setSnippetTitle = (title) => {
  return {
    type: SET_SNIPPET_TITLE,
    payload: title,
  };
};

export const setSnippetDescription = (description) => {
  // const payload = description && description !== "" ? description : null;
  return {
    type: SET_SNIPPET_DESCRIPTION,
    payload: description,
  };
};

export const snippetSaveLoading = () => ({
  type: SNIPPET_SAVE_LOADING,
});

export const snippetSaveSuccess = () => ({
  type: SNIPPET_SAVE_SUCCESS,
});
//

export const execSnippet = () => (dispatch, getState) => {
  dispatch(snippetExecLoading());

  let resolveToast, rejectToast;
  const toastPromise = new Promise((resolve, reject) => {
    resolveToast = resolve;
    rejectToast = reject;
  });

  toast.promise(toastPromise, {
    pending: "Execution pending",
    success: "Snippet executed successfully",
    error: "Execution failed",
  });

  const {
    language: language_code,
    version,
    body,
  } = getState().snippet.currentSnippet;

  const version_index = version.versionIndex;

  AprumAPI.post("/execute", {
    body,
    language_code,
    version_index,
  })
    .then((res) => {
      dispatch(snippetExecSuccess(res.data));
      resolveToast();
    })
    .catch(() => {
      dispatch(snippetExecFailed());
      rejectToast();
    });
};

export const saveSnippet = () => (dispatch, getState) => {
  const currentSnippet = getState().snippet.currentSnippet;
  const { title, version } = currentSnippet;

  dispatch(snippetSaveLoading());

  let resolveToast, rejectToast;
  const toastPromise = new Promise((resolve, reject) => {
    resolveToast = resolve;
    rejectToast = reject;
  });

  toast.promise(toastPromise, {
    pending: "Saving ...",
    success: "Saved!",
    error: "Saving failed",
  });

  AprumAPI.post("/snippets", {
    ...currentSnippet,
    title: NullOrEmpty(title) ? "My New Snippet" : title,
    version_id: version.versionId,
  })
    .then(() => {
      dispatch(snippetSaveSuccess());

      resolveToast();
    })
    .catch(() => rejectToast())
    .finally(() => dispatch(resetCurrentSnippet()));
};
