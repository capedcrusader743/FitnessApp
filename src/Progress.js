import React from 'react'


function Progress(props) {

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
    </div>    
    </div>  
  )
}

export default Progress