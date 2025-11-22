import React from 'react'

function App() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      textAlign: 'center',
      padding: '20px'
    }}>
      <div>
        <h1 style={{ fontSize: '3rem', marginBottom: '20px' }}>
          🚆 ERP Rail-Electr SPA
        </h1>
        <p style={{ fontSize: '1.5rem', marginBottom: '30px' }}>
          Système de Gestion - Filiale GCF
        </p>
        <div style={{
          background: 'rgba(255,255,255,0.2)',
          padding: '30px',
          borderRadius: '15px',
          backdropFilter: 'blur(10px)'
        }}>
          <h2>Connexion</h2>
          <div style={{ margin: '20px 0' }}>
            <input 
              placeholder="Email" 
              style={{ padding: '10px', margin: '5px', width: '200px' }}
            />
          </div>
          <div style={{ margin: '20px 0' }}>
            <input 
              type="password" 
              placeholder="Mot de passe" 
              style={{ padding: '10px', margin: '5px', width: '200px' }}
            />
          </div>
          <button style={{
            padding: '10px 30px',
            background: 'white',
            color: '#1e3c72',
            border: 'none',
            borderRadius: '5px',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}>
            Se connecter
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
