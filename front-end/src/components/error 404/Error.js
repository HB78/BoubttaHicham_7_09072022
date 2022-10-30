import React from 'react';
import "./error.css";

function Error() {
  return (
    <div className="container_ring">
        <div className="ring"></div>
        <div className="ring"></div>
        <div className="ring"></div>
        <div>
            <h1 className="error_h1">Error 404</h1>
            <div className="error">Page not found</div>
        </div>
    </div>
  )
}

export default Error
