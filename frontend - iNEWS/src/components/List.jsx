import React from 'react'

const List = ({children}) => {
  return (
    <ul className="divide-y divide-slate-600">
      {children}
    </ul>
  )
}

export default List