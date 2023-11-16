import React, { useContext, useEffect, useState } from "react";
import NoteItem from "./NoteItem";
import notesContext from "../context/notes/notesContext";
import Modals from "./Modals";
import ToastContext from "../context/AlertContext";

export default function Notes() {
  const toast = useContext(ToastContext);
  const { notes, getNotes } = useContext(notesContext);
  const [modal, setModal] = useState(false);
  const [modalData, setModalData] = useState(null);

  function showModal(data) {
    setModal(true);
    setModalData(data);
  }
  useEffect(() => {
    getNotes(toast);
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {modal && <Modals data={modalData} setModal={setModal} />}
      <div className="bg-white py-5 pb-36">
        <h1 className="text-black mb-5 text-3xl font-bold leading-9 tracking-tight text-center">
          Your Notes on Cloud
        </h1>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto mt-0 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:pt-10 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {notes.map((value, i) => {
              return <NoteItem key={i} data={value} modal={showModal} />;
            })}
          </div>
        </div>
      </div>
    </>
  );
}
