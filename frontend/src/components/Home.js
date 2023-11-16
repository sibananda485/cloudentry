import React, { useContext, useEffect, useState } from "react";
import Notes from "./Notes";
import AddNote from "./AddNote";
import { useNavigate } from "react-router-dom";
import noteContext from "../context/notes/notesContext";

export default function Home() {
  useState(true);
  const { setNotes, setUserName} = useContext(noteContext);
  const navigate = useNavigate();

  async function checkUser() {
    try {
      const response = await fetch("https://cloudentry.vercel.app/api/notes/allnotes", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        
      });
      const parse = await response.json();
      if (parse.notes && parse.user) {
        setUserName(parse.user.name);
        setNotes(parse.notes);
      } else {
        console.log(parse.notes);
        localStorage.removeItem("token");
      }

      if (response.status !== 200) {
        navigate("/login");
      }
    } catch (err) {
      navigate("/login");
    }
  }

  useEffect(() => {
    if (localStorage.getItem("token")) {
      try {
        checkUser();
      } catch (err) {
        console.log(err);
      }
    } else {
      navigate("/login");
    }
  }, []);
  
  return (
    <>
      <AddNote />
      <Notes />
    </>
  );
}
