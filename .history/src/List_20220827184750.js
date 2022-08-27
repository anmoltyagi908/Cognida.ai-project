import React from 'react'
import './list.css'
export default function List(props) {
  props.map((item)=>{
    console.log(item.date)
  })
  return (
    <div className="listdiv">
     
    </div>
  )
}
