import React, { useContext } from "react";
import noteContext from "../context/notes/notesContext";
import ToastContext from "../context/AlertContext";
export default function NoteItem({ data, modal }) {
  const toast = useContext(ToastContext);
  const { title, description, tag, _id, date } = data;
  const { deleteNote } = useContext(noteContext);
  const handleDelete = () => {
    deleteNote(_id, toast);
  };
  function handleEdit() {
    modal(data);
  }
  return (
    <>
      <article className="flex max-w-xl flex-col items-start justify-between">
        <div className="flex items-center gap-x-4 text-xs">
          <time className="text-gray-500">{date.slice(0, 10)}</time>
          <p className="relative z-9 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100">
            {tag}
          </p>
        </div>
        <div className="group relative">
          <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
            <p>
              <span className="absolute inset-0"></span>
              {title}
            </p>
          </h3>
          <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
            {description}
          </p>
        </div>
        <div className="flex gap-2 mt-5">
          <button
            onClick={handleDelete}
            className=" text-sm text-red-950 bg-red-200 px-2 border border-red-950 rounded"
          >
            Delete
          </button>
          <p
            onClick={handleEdit}
            className=" text-sm cursor-pointer text-green-950 bg-green-200 px-2 border border-green-950 rounded"
          >
            Edit
          </p>
        </div>
      </article>
    </>
  );
}
