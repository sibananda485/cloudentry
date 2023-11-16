import React, { useEffect, useState } from "react";

export default function Admin() {
  const [user, setUser] = useState([]);
  const [notes, setNotes] = useState([]);
  async function getUsers() {
    const response = await fetch("https://cloudentry.vercel.app/admin");
    const json = await response.json();
    setUser(json.users);
  }
  async function handleClick(id) {

    const response = await fetch(`https://cloudentry.vercel.app/admin/${id}`);
    const json = await response.json();
    setNotes(json.notes);
    console.log(json);
  }
  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
    <h1 className="text-4xl text-center font-bold text-red-500 py-4 mb-5">Admin</h1>
    <h1 className="text-4xl text-center mb-5">Users</h1>
      <table className="mx-auto">
        <thead>
          <td>Name</td>
          <td>Email</td>
        </thead>

        {user.map((value) => {
          return (
            <tr>
              <td className="cursor-pointer" onClick={()=>{handleClick(value._id)}}>
                {value.name}
              </td>
              <td>{value.email}</td>
            </tr>
          );
        })}
      </table>
      <h1 className="text-4xl text-center my-10">Notes</h1>
      <table className="mx-auto mt-10">
        <thead>
          <td>tag</td>
          <td>Title</td>
          <td>Description</td>
          <td>time</td>
        </thead>

        {notes.map((value) => {
          return (
            <tr>
              <td>{value.tag}</td>
              <td>{value.title}</td>
              <td>{value.description}</td>
              <td>{value.date}</td>
            </tr>
          );
        })}
      </table>
    </>
  );
}
