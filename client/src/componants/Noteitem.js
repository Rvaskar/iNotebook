import React ,{useContext} from "react";
import noteContext from "../context/notes/noteContext";
import "./navbar.css";  

const Noteitem = (props) => {

  const context = useContext(noteContext)
  const {deleteNote} = context;  //use to taking notes from NoteState componant
  const { note,updateNote } = props;

  return (
    <div className="col-md-4">

      <div className="card my-3 addContainer2 bg-transparent text-light">
        <div className="card-body" >
          <h5 className="card-title">{note.title}</h5>   {/*here we set title and description for notes*/}
          <p className="card-text">
            {note.description}
          </p>
            <i className="fa-solid fa-trash-can mx-2" onClick={()=>{deleteNote(note._id); props.showAlert("Deleted Successfully", "success");}}></i>
            <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>{updateNote(note)}}></i>
        </div>
      </div>
    </div>
  );
};

export default Noteitem;
