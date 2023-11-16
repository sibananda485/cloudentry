import React, { useContext, useState } from "react";
import noteContext from "../context/notes/notesContext";
import ToastContext from "../context/AlertContext";

export default function AddNote() {
  const toast = useContext(ToastContext);
  const { addNote } = useContext(noteContext);
  const [inputData, setInputData] = useState({
    title: "",
    description: "",
    tag: "",
  });

  const handleChange = (e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  };
  const handleClick = (e) => {
    e.preventDefault();
    addNote(inputData, toast);
    setInputData({ title: "", description: "", tag: "" });
  };
  return (
    <>
      <div className="pb-7 flex flex-col justify-center">
        <div className="mx-8 sm:mx-auto sm:w-[40%] sm:max-w-3xl">
          <h2 className="my-7 text-3xl font-bold leading-9 tracking-tight ">
            Add a note
          </h2>
        </div>

        <div className="mx-8 sm:mx-auto sm:w-[40%] sm:max-w-3xl">
          <form className="space-y-6" onSubmit={handleClick}>
            <div>
              <label htmlFor="title" className="block text-lg leading-">
                Title
              </label>
              <div className="mt-2">
                <input
                  onChange={handleChange}
                  value={inputData?.title}
                  id="title"
                  name="title"
                  type="text"
                  required
                  className="block px-2 w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="description"
                  className="block text-lg leading-6"
                >
                  Description
                </label>
              </div>
              <div className="mt-2">
                <input
                  onChange={handleChange}
                  id="description"
                  name="description"
                  value={inputData?.description}
                  required
                  className="block w-full px-2 rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="description"
                  className="block text-lg leading-6"
                >
                  Tag
                </label>
              </div>
              <div className="mt-2">
                <input
                  onChange={handleChange}
                  id="tag"
                  name="tag"
                  value={inputData?.tag}
                  className="block w-full px-2 rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Add
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
