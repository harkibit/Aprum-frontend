import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";

// useDispatch
import CodeMirror from "@uiw/react-codemirror";

import {
  ChevronRightIcon,
  ClockIcon,
  ChipIcon,
  SaveIcon,
  PlayIcon,
  TrashIcon,
} from "@heroicons/react/outline";
import Spinner from "../../components/common/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "react-redux-loading-bar";
import AprumAPI from "../../apis/AprumAPI";
import { useParams } from "react-router-dom";
import {
  editSnippet,
  execSnippet,
  resetCurrentSnippet,
  setSnippetBody,
  setSnippetDescription,
  setSnippetEditMode,
  setSnippetLanguage,
  setSnippetLanguageVersion,
  setSnippetSlug,
  setSnippetTitle,
  setSnippetVisibility,
} from "../../actions/snippetActions";
import { Switch } from "@headlessui/react";
import { push } from "connected-react-router";

const ShowSnippet = () => {
  const { slug } = useParams();

  const [loading, setLoading] = useState(true);
  const [owner, setOwner] = useState(false);

  const dispatch = useDispatch();

  const { exec, currentSnippet } = useSelector((state) => state.snippet);

  const handleSnippetDelete = () => {
    dispatch(showLoading());
    AprumAPI.delete(`/snippets/${slug}`).then(() => {
      dispatch(push("/snippets/personal"));
      dispatch(hideLoading());
    });
  };

  useEffect(() => {
    dispatch(showLoading());
    dispatch(resetCurrentSnippet());
    AprumAPI.get(`/snippets/${slug}`).then((res) => {
      const { owner, snippet } = res.data;
      if (owner) {
        setOwner(true);
        // he's in edit mode because
        // he's the owner
        dispatch(setSnippetEditMode());
      }
      dispatch(setSnippetBody(snippet.body));
      dispatch(setSnippetTitle(snippet.title));
      dispatch(setSnippetSlug(snippet.slug));
      dispatch(setSnippetDescription(snippet.description));
      dispatch(
        setSnippetLanguageVersion({
          versionIndex: snippet.version.index,
          versionId: snippet.version.id,
        })
      );
      dispatch(setSnippetLanguage(snippet.version.language.code));
      dispatch(hideLoading());
      setLoading(false);
    });
  }, []);

  return (
    <>
      <Helmet>
        <title>{currentSnippet.title} | Aprum</title>
      </Helmet>
      <main className="min-h-screen p-4 md:p-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between my-4 space-y-4 md:space-y-0">
          {loading ? (
            <div className="flex flex-col space-y-1">
              <div className="bg-gray-600 animate-pulse w-48 rounded-md h-6"></div>
              <div className="bg-gray-600 animate-pulse w-48 rounded-md h-2"></div>
            </div>
          ) : owner ? (
            <div>
              <input
                placeholder="Title"
                className="bg-transparent my-0.5 text-white block text-2xl md:text-4xl focus:outline-none"
                value={currentSnippet.title}
                onChange={(e) => dispatch(setSnippetTitle(e.target.value))}
              />
              <input
                placeholder="Description"
                className="bg-transparent text-white block text-sm md:text-base font-light focus:outline-none"
                value={currentSnippet.description}
                onChange={(e) =>
                  dispatch(setSnippetDescription(e.target.value))
                }
              />
            </div>
          ) : (
            <div className="flex flex-col">
              <h2 className="text-gray-200 text-3xl md:text-4xl">
                {currentSnippet.title}
              </h2>
              <p className="font-light text-gray-400">
                {currentSnippet.description}
              </p>
            </div>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="shadow-md rounded h-96">
            <CodeMirror
              onChange={(e) => dispatch(setSnippetBody(e.getValue()))}
              value={currentSnippet.body ?? ""}
              options={{
                theme: "ayu-mirage",
                mode: currentSnippet.language,
                autoCloseBrackets: true,
              }}
            />
          </div>
          <div className="h-96">
            <div className="bg-secondary bg-opacity-80 exec_container overflow-y-scroll rounded-t shadow-md">
              <div className="p-4 text-white">
                {exec.outputs.map((output, index) => (
                  <div className="font-light text-sm" key={index}>
                    <div>
                      <span className="italic">aprum_exec</span>
                      <ChevronRightIcon className="inline w-3 h-3 ml-0.5" />
                    </div>
                    <p className="font-normal my-2">{output}</p>
                  </div>
                ))}
                <div className="font-light text-sm">
                  <span className="italic">aprum_exec</span>
                  <ChevronRightIcon className="inline w-3 h-3 mx-0.5" />
                  <span id="cursor">|</span>
                </div>
              </div>
            </div>
            <div className="space-x-4 bg-secondary w-full p-2 text-white flex items-center rounded-b">
              <div className="space-x-2 flex items-center">
                <ClockIcon className="w-4 h-4 inline" />
                <p className="text-xs">{exec.cpuTime ?? "-"}</p>
              </div>
              <div className="space-x-2 flex items-center">
                <ChipIcon className="w-4 h-4 inline" />
                <p className="text-xs">{exec.memory ?? "-"}</p>
              </div>
            </div>
          </div>
        </div>
        {owner && (
          <div className="flex items-center space-x-4 mt-4">
            <span className="text-gray-300">
              {currentSnippet.public ? "Public" : "Private"}
            </span>
            <Switch
              checked={currentSnippet.public}
              onChange={() =>
                dispatch(setSnippetVisibility(!currentSnippet.public))
              }
              className={`${
                currentSnippet.public ? "bg-secondary" : "bg-gray-600"
              } relative inline-flex items-center h-6 rounded-full w-11 transition-all`}
            >
              <span
                className={`${
                  currentSnippet.public ? "translate-x-6" : "translate-x-1"
                } inline-block w-4 h-4 transform bg-white rounded-full transition-all`}
              />
            </Switch>
          </div>
        )}
        <div className="text-white">
          {owner && (
            <>
              <button
                className="rounded-full shadow-md bg-gray-600 p-2 fixed right-10 bottom-36"
                onClick={handleSnippetDelete}
              >
                <TrashIcon className="w-6 h-6" />
              </button>
              <button
                className="rounded-full shadow-md bg-gray-600 p-2 fixed right-10 bottom-24"
                onClick={() => dispatch(editSnippet())}
              >
                <SaveIcon className="w-6 h-6" />
              </button>
            </>
          )}

          <button
            className="rounded-full shadow-md bg-gray-600 p-2 fixed right-10 bottom-12"
            onClick={() => dispatch(execSnippet())}
          >
            <PlayIcon className="w-6 h-6" />
          </button>
        </div>
      </main>
    </>
  );
};

export default ShowSnippet;
