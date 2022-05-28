import React from 'react';
import Button from '@mui/material/Button';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Link } from 'react-router-dom';


function MuscleGroup(props) {

  function handleClick() {
    props.onDelete(props.id);
  }

  return (
      <div className='muscle_group'>
      <Link to="/page" style={{textDecoration: 'none'}}>
        <Button variant='contained'>{props.muscle}</Button>
      </Link>
      
      <Button onClick={handleClick} variant="outlined"><DeleteOutlineIcon /></Button>
      </div>
  )
}

export default MuscleGroup