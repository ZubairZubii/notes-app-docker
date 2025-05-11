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
      
      // Try these URLs in order until one works
      const backendUrls = [
          import.meta.env.VITE_APP_API_URL,
          'http://localhost:5000',
          'http://server:5000',
          '/api'
      ];
      
      const url = backendUrls[0] || backendUrls[1];
      console.log('Attempting POST to:', `${url}/addNote`);
      console.log('Note Data:', note);
      
      axios
          .post(`${url}/addNote`, note)
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
              
              // Try the next URL if available
              if (backendUrls.length > 1) {
                  const nextUrl = backendUrls[1];
                  console.log('Retrying with next URL:', `${nextUrl}/addNote`);
                  
                  axios.post(`${nextUrl}/addNote`, note)
                      .then((response) => {
                          console.log('Success with fallback URL:', response.data);
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
                      .catch((secondErr) => {
                          console.error('Failed with second URL:', secondErr);
                          Swal.fire('Error', 'Could not add note. Try again later.', 'error');
                      });
              } else {
                  Swal.fire('Error', 'Could not add note. Try again later.', 'error');
              }
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