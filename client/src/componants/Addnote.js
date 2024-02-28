import React, { useState, useContext } from "react";
import "./navbar.css";
import noteContext from "../context/notes/noteContext";

const Addnote = (props) => {
  const context = useContext(noteContext);
  const { addNote } = context; //use to taking notes from NoteState componant

  const [note, setNote] = useState({ title: "", description: "", tags: "" }); //here set initial values for the all field we change using state

  const handleClick = (e) => {
    //! here e means event
    e.preventDefault(); //use to prevent window reload on click
    addNote(note.title, note.description, note.tags); //setting value for different field in noteState componant using add not context
    setNote({ title: "", description: "", tags: "" }); //setting empty value after submitting

    props.showAlert("Added Successfully", "success");
  };
  const onChange = (e) => {
    //here e means event
    setNote({ ...note, [e.target.name]: e.target.value }); //targeting values with particular field where onchange event occurs
  };

  return (
    <div className="container my-3 addContainer">
      <h1>Add a Note</h1>
      <form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={note.title}
            aria-describedby="emailHelp"
            onChange={onChange} //adding onchange event
            minLength={5}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            value={note.description}
            onChange={onChange}
            minLength={5}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tags" className="form-label">
            tags
          </label>
          <input
            type="text"
            className="form-control"
            id="tags"
            name="tags"
            value={note.tags}
            onChange={onChange}
            minLength={5}
            required
          />
        </div>

        <button
          type="submit"
          disabled={note.title.length < 5 || note.description.length < 5}
          className="btn btn-primary"
          onClick={handleClick}
        >
          {" "}
          {/*adding  onclick event */}
          Add Note
        </button>
      </form>
    </div>
  );
};

export default Addnote;
