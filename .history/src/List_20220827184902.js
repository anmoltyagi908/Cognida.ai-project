import React from 'react'
import './list.css'
export default function List() {
  props.map((item)=>{
    console.log(item.url.name)
  })
  return (
    <div className="listdiv">
     <h1> Hello</h1>
    </div>
  )
}
