import React, { createContext, useContext, useState } from 'react'
const Context = createContext()
export const useContext = () => {
  const ctx = useContext(Context)
  if (!ctx) throw new Error('Context must be used within Provider')
  return ctx
}
export const Provider = ({ children }) => {
  const [data, setData] = useState([])
  return (
    <Context.Provider value={{ data, setData }}>
      {children}
    </Context.Provider>
  )
}
