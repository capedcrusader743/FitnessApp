import React, { useState } from 'react'
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import { db, auth } from './firebaseConfig';
import { useAuthState } from 'react-firebase-hooks/auth';
import { collection, addDoc } from 'firebase/firestore';

function CreateMuscle(props) {

    const [muscle, setMuscle] = useState("");
    const [user] = useAuthState(auth);

    function handleChange(event) {
        const newValue = event.target.value;
        setMuscle(newValue);
    }

    // async
    function submitMuscle(event) {
        event.preventDefault();
        // await before addDoc
        addDoc(collection(db, 'Categories'), {
            name: muscle,
            user: user?.uid
        }); 

        // Reset text input
        setMuscle('');
    }

  return (
    <div>
        <form className='create-muscle'> 
            <input
                id='muscle'
                type="text"
                onChange={handleChange}
                value={muscle}
                placeholder='Please enter a muscle group...'
            />
            <Fab onClick={submitMuscle} color="primary" aria-label="add">
                <AddIcon />
            </Fab>
        </form>
    </div>
  );
}

export default CreateMuscle