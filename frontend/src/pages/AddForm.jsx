import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import 'animate.css/animate.min.css';

export default function AddForm() {
    const [note, setNote] = useState({
        title: "",
        details: "",
    });

    const changeHandler = (event) => {
      const { name, value} = event.target;
      setNote( {...note, [name]: value});
    };

    const navigate = useNavigate();
    const submitHandler = (event) => {
      event.preventDefault();
      
      // In Kubernetes, we should only use the relative path
      // This will route through Nginx to the backend service
      const apiUrl = "/api";
      console.log('Attempting POST to:', `${apiUrl}/addNote`);
      console.log('Note Data:', note);
      
      axios
          .post(`${apiUrl}/addNote`, note)
          .then((response) => {
              console.log('Success response:', response.data);
              navigate('/');
              Swal.fire({
                  title: 'Your note has been added successfully!',
                  showClass: {
                      popup: 'animate__animated animate__fadeInDown'
                  },
                  hideClass: {
                      popup: 'animate__animated animate__fadeOutUp'
                  }
              });
          })
          .catch((err) => {
              console.error('Failed to add note:', err);
              Swal.fire('Error', 'Could not add note. Try again later.', 'error');
          });
    };
    
    return (
        <div>
            <h1 className="headline">
                Add <span>Note</span>
            </h1>
            <form className="note-form" onSubmit={submitHandler}>
                <input
                    type="text"
                    name="title"
                    value={note.title}
                    onChange={changeHandler}
                    placeholder="Title of Note ..."
                    required
                />
                <textarea
                    name="details"
                    rows="5"
                    value={note.details}
                    onChange={changeHandler}
                    placeholder="Describe Your Note ..."
                    required
                ></textarea>
                <button type="submit">Save Note</button>
            </form>
        </div>
    );
}