import React from 'react'
import './list.css'
export default function List() {
    for(var i=0; i<arguments.length; i++){
      console.log(arguments[i]);
    }
    console.log(arguments.length);


  return (
    <div className="listdiv">
    
    </div>
  )
}
