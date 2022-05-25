import React, { useState } from 'react'
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";

function CreateMuscle(props) {

    const [inputText, setInputText] = useState("");

    function handleChange(event) {
        const newValue = event.target.value;
        setInputText(newValue);
    }

    function submitMuscle(event) {
        console.log("submit");
        props.onAdd(inputText);
        // setInputText("");
        event.preventDefault();
    }

  return (
    <div>
        <form className='create-muscle'> 
            <input
                name='muscle'
                onChange={handleChange}
                value={inputText.muscle}
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