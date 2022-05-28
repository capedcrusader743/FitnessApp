import React, { useState } from 'react'
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import { db } from './firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

function CreateMuscle(props) {

    const [muscle, setMuscle] = useState("");

    function handleChange(event) {
        const newValue = event.target.value;
        setMuscle(newValue);
    }

    function submitMuscle(event) {
        event.preventDefault();
        const muscleGroupRef = collection(db, 'MuscleGroup');
        addDoc(muscleGroupRef, { muscle })
            .then(response => {
                console.log(response.id);
            })
            .catch(error => {
                console.log(error.message);
        })
        // setMuscle("");
    }

  return (
    <div>
        <form className='create-muscle'> 
            <input
                id='muscle'
                type="text"
                onChange={handleChange}
                value={muscle}
                placeholder='Muscle'
            />
            <Fab onClick={submitMuscle} color="primary" aria-label="add">
                <AddIcon />
            </Fab>
        </form>
    </div>
  );
}

export default CreateMuscle