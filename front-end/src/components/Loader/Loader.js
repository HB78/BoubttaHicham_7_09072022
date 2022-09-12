import React from 'react'
import "./loader.css"
function Loader() {
  return (
    <div>
      <div className="contains">
        <div className="loader"><span></span></div>
        <p className='loading'>LOADING...</p>
      </div>
    </div>
  )
}

export default Loader
