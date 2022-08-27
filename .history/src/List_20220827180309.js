import React from 'react'

export default function List() {
  return (
    <div>
      {imageUrls.map((item) => {
      return    (<li>
           <div>
          <a href={item.url}>{item.name}</a>
          <p>Date:{item.date }</p>
          </div>
      </li>)
      
    })}
    </div>
  )
}
