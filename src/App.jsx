import React from 'react'
import { useAuth } from './context/AuthContext'
import Login from './pages/Login'
import Organigramme from './components/Organigramme'

function App() {
  const { user, logout } = useAuth()

  if (!user) {
    return <Login />
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: '#f5f7fa'
    }}>
      {/* Header */}
      <header style={{ 
        background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
        color: 'white',
        padding: '15px 0',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}>
        <div style={{ 
          maxWidth: '1200px', 
          margin: '0 auto',
          padding: '0 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '15px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <div style={{
              width: '50px',
              height: '50px',
              background: 'white',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#1e3c72',
              fontWeight: 'bold',
              fontSize: '10px',
              textAlign: 'center'
            }}>
              LOGO GCF
            </div>
            <div style={{
              width: '50px',
              height: '50px',
              background: 'white',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#1e3c72',
              fontWeight: 'bold',
              fontSize: '8px',
              textAlign: 'center'
            }}>
              RAIL ELECTR
            </div>
            <div>
              <h1 style={{ margin: 0, fontSize: '1.5rem' }}>ERP Rail-Electr</h1>
              <p style={{ margin: 0, opacity: 0.8, fontSize: '0.9rem' }}>Système de Gestion Intégré</p>
            </div>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{ textAlign: 'right' }}>
              <p style={{ margin: 0, fontWeight: '600' }}>{user.prenom} {user.nom}</p>
              <p style={{ margin: 0, fontSize: '0.8rem', opacity: 0.8 }}>
                {user.poste} - {user.pole}
              </p>
            </div>
            <button
              onClick={logout}
              style={{
                padding: '8px 16px',
                background: 'rgba(255,255,255,0.2)',
                color: 'white',
                border: '1px solid rgba(255,255,255,0.3)',
                borderRadius: '5px',
                cursor: 'pointer',
                fontWeight: '500'
              }}
            >
              Déconnexion
            </button>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav style={{
        background: 'white',
        padding: '15px 0',
        borderBottom: '1px solid #e0e0e0'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 20px',
          display: 'flex',
          gap: '10px',
          flexWrap: 'wrap'
        }}>
          <button style={{
            padding: '10px 20px',
            background: '#1e3c72',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            fontWeight: '600'
          }}>
            🏠 Tableau de Bord
          </button>
          <button style={{
            padding: '10px 20px',
            background: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            fontWeight: '600'
          }}>
            🏢 Organigramme
          </button>
          <button style={{
            padding: '10px 20px',
            background: '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            fontWeight: '600'
          }}>
            💬 Messagerie
          </button>
          <button style={{
            padding: '10px 20px',
            background: '#ffc107',
            color: 'black',
            border: 'none',
            borderRadius: '5px',
            fontWeight: '600'
          }}>
            📊 Projets
          </button>
          <button style={{
            padding: '10px 20px',
            background: '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            fontWeight: '600'
          }}>
            👥 RH
          </button>
        </div>
      </nav>

      {/* Contenu principal */}
      <main>
        <Organigramme />
      </main>
    </div>
  )
}

export default App
