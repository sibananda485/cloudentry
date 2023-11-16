import React, { useEffect, useState, useContext } from "react";
import noteContext from "../context/notes/notesContext";
import ToastContext from "../context/AlertContext";

export default function Modals({ data, setModal }) {
  const toast = useContext(ToastContext);
  const { updateNotes } = useContext(noteContext);
  const [inputData, setInputData] = useState({
    title: "",
    description: "",
    tag: "",
  });
  useEffect(() => {
    setInputData({ ...data });
    // eslint-disable-next-line
  }, []); 
  function handleChange(e) {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  }
  async function handleClick() {
    const response = await updateNotes(inputData);
    const result = await response.json();
    if (response.status === 200) {
      setModal(false);
      toast.success(result.message, { theme: "colored" });
    } else {
      toast.error(result.message, { theme: "colored" });
    }
  }
  return (
    <>
      <div
        className="relative z-10"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div className="">
                  <h2 className="text-green-800 text-xl text-center font-semibold">
                    Edit notes
                  </h2>
                  <label
                    className="text-black inline-block mb-1"
                    htmlFor="title"
                  >
                    Title
                  </label>
                  <input
                    name="title"
                    value={inputData.title}
                    onChange={handleChange}
                    type="text"
                    className="text-black px-1 border border-gray-300 w-full mb-3"
                  />
                  <label
                    className="text-black inline-block mb-1"
                    htmlFor="description"
                  >
                    Description
                  </label>
                  <input
                    name="description"
                    value={inputData.description}
                    onChange={handleChange}
                    type="text"
                    className="text-black px-1 border border-gray-300 w-full mb-3"
                  />
                  <label className="text-black inline-block mb-1" htmlFor="tag">
                    Tags
                  </label>
                  <input
                    name="tag"
                    value={inputData.tag}
                    onChange={handleChange}
                    type="text"
                    className="text-black px-1 border border-gray-300 w-full mb-3"
                  />
                </div>
              </div>
              {/* Buttons */}
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  onClick={handleClick}
                  type="button"
                  className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto"
                >
                  Update
                </button>
                <button
                  onClick={() => {
                    setModal(false);
                  }}
                  type="button"
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-red-50 px-3 py-2 text-sm font-semibold text-red-950 shadow-sm ring-1 ring-inset ring-red-300 hover:bg-red-50 sm:mt-0 sm:w-auto"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
