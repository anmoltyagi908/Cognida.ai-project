import React from 'react'
import './list.css'
export default function List(props) {
  props.map((item)=>{
    console.log(item.url)
  })
  return (
    <div className="listdiv">
     
    </div>
  )
}
