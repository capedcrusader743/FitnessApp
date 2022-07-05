import React from 'react'
import Button from '@mui/material/Button';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

function Progress(props) {

  function handleClick() {
    props.onDelete(props.id);
  }

  return (
    <div>
    <div className='content-container'>
      <div className='row'>
        <div className='left-panel box'>
            {props.date}
        </div>
        <div className='right-panel box'>
            {props.set}
        </div>
      </div>
      <Button onClick={handleClick} variant="outlined"><DeleteOutlineIcon /></Button>
    </div>    
    </div>  
  )
}

export default Progress