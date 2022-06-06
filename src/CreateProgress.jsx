import React, { useState } from 'react'
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import { db, auth } from './firebaseConfig';
import { useAuthState } from 'react-firebase-hooks/auth';
import { collection, addDoc } from 'firebase/firestore';

function CreateProgress(props) {

  const [user] = useAuthState(auth);
  const date = new Date();
  const [progress, setProgress] = useState({
    date: date.getMonth() + 1 + "/" + date.getDate(),
    set: ""
  });

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
          user: user?.uid
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
        placeholder="Enter Set"
      />
      <Fab onClick={submitProgress} color="primary" aria-label="add">
          <AddIcon />
      </Fab>
    </div>
  )
}

export default CreateProgress