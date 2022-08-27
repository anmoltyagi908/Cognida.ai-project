import React from 'react'
import './list.css'
export default function List() {
    for(var i=0; i<arguments.length; i++){
      console.log(arguments[0].date);
    }
  return (
    <div className="listdiv">
     <h1> Hello</h1>
    </div>
  )
}
