import React from 'react';
import Button from '@mui/material/Button';

function MuscleGroup(props) {
  return (
      <div className='muscle_group'>
          <Button variant='contained'>{props.muscle}</Button>
      </div>
  )
}

export default MuscleGroup