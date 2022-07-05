import React, { useState, useEffect } from 'react'
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import { db, auth } from './firebaseConfig';
import { useAuthState } from 'react-firebase-hooks/auth';
import { collection, addDoc, query, where, onSnapshot, serverTimestamp } from 'firebase/firestore';
import { useNavigate, useParams } from 'react-router-dom';

function CreateProgress(props) {

  const [user,loading] = useAuthState(auth);
  const date = new Date();
  const [progress, setProgress] = useState({
    date: date.getMonth() + 1 + "/" + date.getDate(),
    set: ""
  });
  const exercise = useParams();

  // On change of textbox, update the exercise_tocreate variable
  function handleChange(event) {
      const {name, value} = event.target;

      setProgress(prevProgress => {
        return {
          ...prevProgress,
          [name]: value
        };
      });
  }

  function submitProgress(event) {
      event.preventDefault();
      addDoc(collection(db, 'Progress'), {
          date: date.getMonth() + 1 + "/" + date.getDate(),
          set: progress.set,
          w_name: exercise.progress,
          user: user?.uid,
          createdAt: serverTimestamp()
      });

        // Reset text input
        setProgress({
          date: date.getMonth() + 1 + "/" + date.getDate(),
          set: ""
        });
  }


  return (
    <div>
      <input
        name="date"
        onChange={handleChange}
        value={progress.date}
      />
      <input 
        name="set"
        type="text"
        onChange={handleChange}
        value={progress.set}
        placeholder="Weight/Reps"
      />
      <Fab onClick={submitProgress} color="primary" aria-label="add">
          <AddIcon />
      </Fab>
    </div>
  )
}

export default CreateProgress