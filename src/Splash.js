import React from 'react'
import './Splash.css';

function Splash() {
  return (
    <div className='spash'>
        <img className='fitness_icon' src='https://i.pinimg.com/736x/99/ec/1b/99ec1bc01c1c759a9af0f35ed8477531.jpg' alt='' />

        <h1 className='app_name'>App Name</h1>
        <p className='motivation_intro'>Are You Ready to Get Shredded?</p>
        <button>Sign Up Now</button> 
        
    </div>
  )
}

export default Splash;