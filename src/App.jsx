import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import { AuthProvider } from './context/AuthContext'
import Login from './pages/auth/Login'
import Dashboard from './pages/dashboard/Dashboard'
import GestionRH from './pages/rh/GestionRH'
import GestionProjets from './pages/projects/GestionProjets'
import GestionDocuments from './pages/documents/GestionDocuments'

function App() {
  return (
    <AppProvider>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/rh" element={<GestionRH />} />
            <Route path="/projets" element={<GestionProjets />} />
            <Route path="/documents" element={<GestionDocuments />} />
            <Route path="/" element={<Navigate to="/login" replace />} />
          </Routes>
        </Router>
      </AuthProvider>
    </AppProvider>
  )
}

export default App
