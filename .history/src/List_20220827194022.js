import React from 'react'
import './list.css'
export default function List({data}) {

  return (
    <div className="listdiv">
      <ul>
        {data.map(title => {
          return <div key={title.name}>{title.name}</div>;
        })}
      </ul>
    </div>
  )
}
