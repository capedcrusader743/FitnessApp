import React, { useState } from 'react'
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import { db, auth } from './firebaseConfig';
import { useAuthState } from 'react-firebase-hooks/auth';
import { collection, addDoc } from 'firebase/firestore';

function CreateExercise(props) {

    const [user] = useAuthState(auth);
    const [exercise_tocreate, setexercise_tocreate] = useState("");

    // On change of textbox, update the exercise_tocreate variable
    function handleChange(event) {
        const newValue = event.target.value;
        setexercise_tocreate(newValue);
    }

    function submitExercise(event) {
        event.preventDefault();
        addDoc(collection(db, 'Workouts'), {
            category: props.cat,
            name: exercise_tocreate,
            user: user?.uid
        });

        // Reset text input
        setexercise_tocreate('');
    }

  return (
    <div>
      <form className='create-exercise'> 
        <input
          id='exercise-tocreate'
          type="text"
          onChange={handleChange}
          value={exercise_tocreate}
          placeholder='Please enter an exercise...'
        />
        <Fab onClick={submitExercise} color="primary" aria-label="add">
          <AddIcon />
        </Fab>
      </form>
    </div>
  );
}

export default CreateExercise