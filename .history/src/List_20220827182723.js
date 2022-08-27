import React from 'react'

export default function List(props) {
  return (
    <div>
      <ul></ul>
      {props.map((item) => {
      return    (
      <li>
          <a href={item.url}>{item.name}</a>
          <p>Date:{item.date }</p>
      </li>)
      
    })}
    </div>
  )
}
