import React from 'react'
import './list.css'
export default function List({data}) {
  console.log()
  return (
    <div className="listdiv">
        {data.map((title) => {
          return (<div>
                  <li>{title.name}</li>
                 <li>{title.date}</li>
                 </div>
          )

        })}
    </div>
  )
}
