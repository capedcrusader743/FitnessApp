import React from 'react';
import Button from '@mui/material/Button';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

function MuscleGroup(props) {

  function handleClick() {
    props.onDelete(props.id);
  }

  return (
      <div className='muscle_group'>
      <Button variant='contained'>{props.muscle}</Button>
      <Button onClick={handleClick} variant="outlined"><DeleteOutlineIcon /></Button>
      </div>
  )
}

export default MuscleGroup