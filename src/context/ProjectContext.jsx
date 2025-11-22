import React, { createContext, useContext, useState } from 'react'

const ProjectContext = createContext()

export const useProjects = () => {
  const context = useContext(ProjectContext)
  if (!context) {
    throw new Error('useProjects must be used within a ProjectProvider')
  }
  return context
}

export const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState([])

  const addProject = (project) => {
    setProjects(prev => [...prev, project])
  }

  const value = {
    projects,
    addProject
  }

  return (
    <ProjectContext.Provider value={value}>
      {children}
    </ProjectContext.Provider>
  )
}
