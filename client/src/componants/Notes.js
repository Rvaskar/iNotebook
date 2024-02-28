import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/notes/noteContext";
import Noteitem from "./Noteitem";
import Addnote from "./Addnote";
import { useNavigate } from 'react-router-dom';
import "./navbar.css";

const Notes = (props) => {
  const context = useContext(noteContext);
  let navigate = useNavigate();
  const { notes, getNote, editNote } = context;

  useEffect(() => {
    if(localStorage.getItem('token')){

      getNote();
    }
    else{
      navigate("/login")
    }
  }, []);

  //! creating ref hook it's use to set reference any one componant creating any ref name
  
  const ref = useRef(null);
  const refClose = useRef(null);
  const [note, setNote] = useState({id:"" ,etitle: "", edescription: "", etags: "" }); //here set initial values for the all field we change using state

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etags: currentNote.tags,
    });
    
  };

  const handleClick = (e) => {
    //here e means event
    // console.log("update note", note)
    editNote(note.id, note.etitle, note.edescription, note.etags)
    refClose.current.click();
    props.showAlert("Updated Successfully", "success");
  };
  const onChange = (e) => {
    //here e means event
    setNote({ ...note, [e.target.name]: e.target.value }); //targeting values with particular field where onchange event occurs
  };

  return (
    <>
      <Addnote showAlert={props.showAlert} />

      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        ref={ref}
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade "
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog ">
          <div className="modal-content bg-transparent addContainer">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit notes
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {/* form for update notes */}

              <form>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    value={note.etitle}
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
                    id="edescription"
                    name="edescription"
                    value={note.edescription}
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
                    id="etags"
                    name="etags"
                    value={note.etags}
                    onChange={onChange}
                  />
                </div>
              </form>

              {/* updating form complete  */}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref = {refClose}
              >
                Close
              </button>
              <button
                type="button"
                disabled={note.etitle.length < 5 || note.edescription.length < 5 }
                className="btn btn-primary"
                onClick={handleClick}
              >
                Update Notes
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row my-5">
        <h1>Your Notes</h1>
        <div className="container">
            {notes.length === 0 && "No notes to display"}
          </div>
        {notes.map((note) => {
          return (
            <Noteitem key={note._id} updateNote={updateNote} note={note} showAlert={props.showAlert} />
          ); //note.title
        })}
      </div>
    </>
  );
};

export default Notes;
