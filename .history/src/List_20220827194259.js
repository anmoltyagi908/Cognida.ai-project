import React from 'react'
import './list.css'
export default function List({data}) {

  return (
    <div className="listdiv">
      <ul>
        {data.map((title) => {
          return (
          <li>{title.name}</li>;
                 <li>{title.date}</li>;)
        })}
      </ul>
    </div>
  )
}
