import React from 'react'
import './list.css'
export default function List({data}) {

  return (
    <div className="listdiv">
      <ul>
        {data.map((title) => {
          return <div>{title.name}</div>;
        })}
      </ul>
    </div>
  )
}
