import React from 'react';
import Button from '@mui/material/Button';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Link } from 'react-router-dom';


function ExerciseGroup(props) {

  function handleClick() {
    props.onDelete(props.id);
  }

  return (
    <div className='each-exercise'>
        <Link to={`/home/${props.cat}/${props.name}`} state={{pass_over: [props.cat, props.name]}} style={{textDecoration: 'none'}}>
        <Button variant='contained'>{props.name}</Button>
        {/* <Exercises name={props.name}></Exercises> */}
        </Link>
        
        <Button onClick={handleClick} variant="outlined"><DeleteOutlineIcon /></Button>
    </div>
  )
}

export default ExerciseGroup