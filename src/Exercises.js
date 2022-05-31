import React from 'react'
import { useLocation } from 'react-router-dom';

function Exercises(props) {
  console.log(props);
  const location = useLocation();
  const { from } = location.state;
  console.log(from);
  return (
    <div>Exercises {from}</div>
  )
}

export default Exercises