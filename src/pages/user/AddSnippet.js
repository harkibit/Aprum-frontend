import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useSelector, useDispatch } from "react-redux";
import CodeMirror from "@uiw/react-codemirror";

import {
  ChevronRightIcon,
  ChipIcon,
  ClockIcon,
  LightBulbIcon,
  PlayIcon,
  SaveIcon,
} from "@heroicons/react/outline";

import { loadLanguage } from "../../actions/languageActions";
import {
  editSnippet,
  execSnippet,
  resetCurrentSnippet,
  saveSnippet,
  setSnippetBody,
  setSnippetDescription,
  setSnippetLanguage,
  setSnippetLanguageVersion,
  setSnippetTitle,
  setSnippetVisibility,
} from "../../actions/snippetActions";

import { Switch } from "@headlessui/react";

import "codemirror/addon/edit/closebrackets";
import "codemirror/theme/ayu-mirage.css";

const AddSnippet = () => {
  const dispatch = useDispatch();
  const { exec, currentSnippet } = useSelector((state) => state.snippet);
  const language = useSelector((state) => state.language);

  const [selectedIndex, setSelectedIndex] = useState(0);

  const defaultCodeMirrorValue = "/* build something amazing! */";
  const handleKeyEvent = (key) => {
    switch (key) {
      case "ctrl+F5":
        dispatch(execSnippet());
        break;
      case "ctrl+s":
        currentSnippet.editMode
          ? dispatch(editSnippet())
          : dispatch(saveSnippet());
        break;
    }
  };

  const handleSnippetLanguageChange = (e) => {
    const { selectedIndex, value } = e.target;
    setSelectedIndex(selectedIndex);
    dispatch(setSnippetLanguage(value));

    const version = language.languages[selectedIndex].versions[0];
    dispatch(
      setSnippetLanguageVersion({
        versionIndex: version.index,
        versionId: version.id,
      })
    );
  };

  const handleSnippetLanguageVersionChange = (e) => {
    const index = e.target.selectedIndex;
    const version = language.languages[selectedIndex].versions[index];
    dispatch(
      setSnippetLanguageVersion({
        versionIndex: version.index,
        versionId: version.id,
      })
    );
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      const { key, metaKey, ctrlKey } = e;
      if ((key === "s" || key === "F5") && (ctrlKey || metaKey)) {
        e.preventDefault();
        handleKeyEvent(`ctrl+${key}`);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentSnippet.editMode]);

  useEffect(() => {
    // load supported languages into the redux store
    // reset currentSnippet to default state
    dispatch(loadLanguage());
    dispatch(resetCurrentSnippet());
  }, []);

  useEffect(() => {
    // init currentSnippet state in redux store
    const { languages } = language;
    if (languages.length > 0) {
      const language = languages[0];
      const version = language.versions[0];
      dispatch(setSnippetLanguage(language.code));
      dispatch(
        setSnippetLanguageVersion({
          versionIndex: version.index,
          versionId: version.id,
        })
      );
    }
  }, [language]);

  return (
    <>
      <Helmet>
        <title>Add Snippet | Aprum</title>
      </Helmet>
      <main className="min-h-screen p-4 md:p-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between my-4 space-y-4 md:space-y-0">
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
              onChange={(e) => dispatch(setSnippetDescription(e.target.value))}
            />
          </div>
          <div className="flex items-center space-x-2 md:space-x-4">
            {language.isLoading ? (
              <>
                <div className="bg-gray-600 animate-pulse w-28 rounded-md h-8"></div>
                <div className="bg-gray-600 animate-pulse w-40 rounded-md h-8"></div>
              </>
            ) : (
              <>
                <select
                  onChange={handleSnippetLanguageChange}
                  className="bg-gray-600 ring-offset-2 shadow-md ring-offset-gray-800 text-gray-200 py-1.5 px-8 focus:ring-1 ring-primary rounded-md focus:outline-none"
                >
                  {language.languages.map((language) => (
                    <option value={language.code} key={language.id}>
                      {language.name}
                    </option>
                  ))}
                </select>
                <select
                  onChange={handleSnippetLanguageVersionChange}
                  className="bg-gray-600 ring-offset-2 shadow-md ring-offset-gray-800 text-gray-200 py-1.5 px-8 focus:ring-1 ring-primary rounded-md focus:outline-none"
                >
                  {language.languages[selectedIndex]?.versions.map(
                    (version) => (
                      <option key={version.id}>{version.name}</option>
                    )
                  )}
                </select>
              </>
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="shadow-md rounded h-96">
            <CodeMirror
              onChange={(e) => dispatch(setSnippetBody(e.getValue()))}
              value={currentSnippet.body ?? defaultCodeMirrorValue}
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
        <div className="mt-5 flex items-center justify-start md:justify-between">
          <div className="text-gray-400 items-center space-x-2 hidden md:flex">
            <LightBulbIcon className="w-6 h-6" />
            <p>
              Tip: Press Ctrl+F5 to execute the snippet, and Ctrl+S to save the
              snippet
            </p>
          </div>
          <div className="flex items-center space-x-4">
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
        </div>
        <div className="md:hidden text-white">
          <button
            className="rounded-full shadow-md bg-gray-600 p-2 fixed right-10 bottom-24"
            onClick={() => dispatch(execSnippet())}
          >
            <PlayIcon className="w-6 h-6" />
          </button>
          <button
            className="rounded-full shadow-md bg-gray-600 p-2 fixed right-10 bottom-12"
            onClick={() =>
              currentSnippet.editMode
                ? dispatch(editSnippet())
                : dispatch(saveSnippet())
            }
          >
            <SaveIcon className="w-6 h-6" />
          </button>
        </div>
      </main>
    </>
  );
};

export default AddSnippet;
