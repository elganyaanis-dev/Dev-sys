import React, { createContext, useState, useContext } from 'react'
import { employees } from '../data/employees'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)

  const login = (email, password) => {
    setLoading(true)
    
    // Simuler un délai de chargement
    setTimeout(() => {
      const foundUser = employees.find(emp => 
        emp.email === email && emp.password === password
      )
      
      if (foundUser) {
        const { password: _, ...userWithoutPassword } = foundUser
        setUser(userWithoutPassword)
        localStorage.setItem('user', JSON.stringify(userWithoutPassword))
      }
      
      setLoading(false)
    }, 1000)
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  // Vérifier si l'utilisateur est déjà connecté au chargement
  React.useEffect(() => {
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
  }, [])

  const value = {
    user,
    login,
    logout,
    loading,
    isAuthenticated: !!user
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
