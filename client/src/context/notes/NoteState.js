// import React from "react";
import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const initialState = [];

  const [notes, setNotes] = useState(initialState); //here we taking all the notes present in the database as initially then perform crud on it using useState

  //!get all notes

  const getNote = async () => {
    //API Call

    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token'),
      },
    });
    const json = await response.json(); //here getting all note from db in json format
    // console.log(json);
    setNotes(json); //here showing all notes of particular user in container
  };

  //!ADD NOTES TO DATABASE

  const addNote = async (title, description, tags) => {
    //API Call

    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        "auth-token":
          localStorage.getItem('token'),
      },
      body: JSON.stringify({ title, description, tags }),
    });

    //Logic to add note
    const note = await response.json();
    setNotes(notes.concat(note)); //concat use to return new array with the {existing array + new data(array)}
    // console.log(note);
    //creating new note by user input and adding in db id is auto generate we have to  set title description and other things


    

  };

  //!DELETE NOTES FROM DATABASE
  const deleteNote = async (id) => {
    //API Call

    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        "auth-token":
          localStorage.getItem('token'),
      },
    });
    // const json = response.json();
    // console.log(json);

    //!Logic to edit in client

    //deleting note depending on the id
    // console.log("deleting note with the id" + id);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  //!EDIT NOTES IN DATABASE
  const editNote = async (id, title, description, tags) => {

    //API Call
    
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
        "auth-token":
          localStorage.getItem('token'),
      },
      body: JSON.stringify({ title, description, tags }),
    });
    // const json = await response.json();
    // console.log(json)

    //creating new notes for update
    let newNotes = JSON.parse(JSON.stringify(notes))

    //Logic to edit in client

    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tags = tags;
        break;
      }
    }
    setNotes(newNotes);
  };

  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, getNote }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
