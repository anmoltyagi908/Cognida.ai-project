import React from 'react'

export default function List(props) {
  return (
    <div>
      {props.map((item) => {
      return    (
      <li>
           <div>
          <a href={item.url}>{item.name}</a>
          <p>Date:{item.date }</p>
          </div>
      </li>)
      
    })}
    </div>
  )
}
