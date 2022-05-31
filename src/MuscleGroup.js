import React from 'react';
import Button from '@mui/material/Button';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Link, useLocation } from 'react-router-dom';


function MuscleGroup(props) {

  function handleClick() {
    props.onDelete(props.id);
  }

  // TODO: Pass props to the next link
  return (
      <div className='muscle_group'>
      <Link to={`/home/${props.name}`} state={{from: props.name}} style={{textDecoration: 'none'}}>
        <Button variant='contained'>{props.name}</Button>
        {/* <Exercises name={props.name}></Exercises> */}
      </Link>
      
      <Button onClick={handleClick} variant="outlined"><DeleteOutlineIcon /></Button>
      </div>
  )
}

export default MuscleGroup