import React from 'react'
import './list.css'
export default function List({data}) {

  return (
    <div className="listdiv">
      <ul>
      {arr.map(title => {
        return <div key={title}>{title}</div>;
      })}
      </ul>
    </div>
  )
}
