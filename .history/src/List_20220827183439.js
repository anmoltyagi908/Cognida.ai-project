import React from 'react'
import './list.css'
export default function List(props) {
  return (
    <div className="listdiv">
      <ul>
      {props.map((item) => {
      return    (
      <li>
          <a href={item.url}>{item.name}</a>
          <p>Date:{item.date }</p>
      </li>)
      
    })}
      </ul>

    </div>
  )
}
