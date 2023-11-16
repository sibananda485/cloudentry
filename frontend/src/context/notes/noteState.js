import React, { useState } from "react";
import noteContext from "./notesContext";
 
const NoteState = (props) => {
  const [notes, setNotes] = useState([]);
  const [userName, setUserName] = useState();

  async function getNotes(toast) {
    if (toast) {
      try {
        const response = await toast.promise(
          fetch("https://cloudentry.vercel.app/api/notes/allnotes", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "auth-token": localStorage.getItem("token"),
            },
            
          }),
          {
            pending: "Please wait",
          }
        );

        const parse = await response.json();
        if (parse.notes && parse.user) {
          setUserName(parse.user.name);
          setNotes(parse.notes);
        } else {
          localStorage.removeItem("token");
        }
      } catch (err) {
        if (toast) {
          toast("Internal error please try later");
        }
      }
    } else {
      try {
        const response = await fetch(
          "https://cloudentry.vercel.app/api/notes/allnotes",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "auth-token": localStorage.getItem("token"),
            },
            
          }
        );

        const parse = await response.json();
        if (parse.notes && parse.user) {
          setUserName(parse.user.name);
          setNotes(parse.notes);
        } else {
          localStorage.removeItem("token");
        }
      } catch (err) {
        if (toast) {
          toast("Internal error please try later");
        }
      }
    }
  }

  const addNote = async (newData, toast) => {
    const response = await toast.promise(fetch(`https://cloudentry.vercel.app/api/notes/setnotes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      
      body: JSON.stringify(newData),
    }),{pending:"Please wait"})
    const result = await response.json();
    if (response.status === 201)
      toast.info(result.message, { theme: "colored" });
    else toast.error(result.message, { theme: "colored" });
    getNotes();
  };

  const deleteNote = async (id, toast) => {
    const response = await toast.promise(fetch(
      `https://cloudentry.vercel.app/api/notes/deletenote/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        
      }
    ),{pending:"Please wait"})
    const result = await response.json();
    if (response.status === 200)
      toast.warn(result.message, { theme: "colored" });
    else toast.error(result.message, { theme: "colored" });
    getNotes();
  };

  const updateNotes = async (newData) => {
    const updateData = {
      title: newData.title,
      description: newData.description,
      tag: newData.tag,
    };
    const response = await fetch(
      `https://cloudentry.vercel.app/api/notes/updatenote/${newData._id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify(updateData),
        
      }
    );
    getNotes();
    return response;
  };

  return (
    <noteContext.Provider
      value={{
        notes,
        addNote,
        deleteNote,
        updateNotes,
        setNotes,
        getNotes,
        setUserName,
        userName,
      }}
    >
      {props.children}
    </noteContext.Provider>
  );
};

export default NoteState;
