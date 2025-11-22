import React, { useState } from 'react'
import { AppProvider, useApp } from './context/AppContext'
import Login from './pages/auth/Login'
import Dashboard from './pages/dashboard/Dashboard'
import GestionRH from './pages/rh/GestionRH'
import GestionProjets from './pages/projects/GestionProjets'
import GestionDocuments from './pages/documents/GestionDocuments'

// Composant de navigation
function Navigation({ currentPage, onPageChange, user, canAccess }) {
  const navigationItems = [
    { id: 'dashboard', label: '🏠 Dashboard', icon: '🏠', access: 'employee' },
    { id: 'rh', label: '👥 RH', icon: '👥', access: 'employee' },
    { id: 'projets', label: '🏗️ Projets', icon: '🏗️', access: 'employee' },
    { id: 'documents', label: '📑 Documents', icon: '📑', access: 'employee' },
  ]

  return (
    <nav style={{ 
      background: 'white', 
      padding: '15px 0', 
      borderBottom: '1px solid #e0e0e0',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto', 
        padding: '0 20px', 
        display: 'flex', 
        gap: '10px', 
        flexWrap: 'wrap',
        alignItems: 'center'
      }}>
        {navigationItems.map(item => {
          if (!canAccess(user, item.access)) return null
          
          return (
            <button
              key={item.id}
              onClick={() => onPageChange(item.id)}
              style={{
                padding: '12px 20px',
                background: currentPage === item.id ? '#1e3c72' : '#f8f9fa',
                color: currentPage === item.id ? 'white' : '#1e3c72',
                border: `2px solid ${currentPage === item.id ? '#1e3c72' : '#e0e0e0'}`,
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '14px',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
              onMouseEnter={(e) => {
                if (currentPage !== item.id) {
                  e.target.style.background = '#e9ecef'
                  e.target.style.borderColor = '#1e3c72'
                }
              }}
              onMouseLeave={(e) => {
                if (currentPage !== item.id) {
                  e.target.style.background = '#f8f9fa'
                  e.target.style.borderColor = '#e0e0e0'
                }
              }}
            >
              <span style={{ fontSize: '16px' }}>{item.icon}</span>
              {item.label}
            </button>
          )
        })}
        
        {/* Espace flexible pour pousser le profil à droite */}
        <div style={{ flex: 1 }}></div>
        
        {/* Indicateur de connexion */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '8px 16px',
          background: '#f8f9fa',
          borderRadius: '20px',
          border: '1px solid #e0e0e0'
        }}>
          <div style={{
            width: '8px',
            height: '8px',
            background: '#28a745',
            borderRadius: '50%',
            animation: 'pulse 2s infinite'
          }}></div>
          <div style={{ fontSize: '12px', color: '#666', fontWeight: '500' }}>
            Connecté
          </div>
        </div>
      </div>
    </nav>
  )
}

// Composant header
function Header({ user, onLogout }) {
  return (
    <header style={{ 
      background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
      color: 'white',
      padding: '20px 0',
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
        gap: '20px'
      }}>
        {/* Logo et titre */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ display: 'flex', gap: '12px' }}>
            <div style={{
              width: '60px',
              height: '60px',
              background: 'white',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#1e3c72',
              fontWeight: 'bold',
              fontSize: '11px',
              textAlign: 'center',
              boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
            }}>
              GROUPE GCF
            </div>
            <div style={{
              width: '60px',
              height: '60px',
              background: 'white',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#1e3c72',
              fontWeight: 'bold',
              fontSize: '10px',
              textAlign: 'center',
              boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
            }}>
              RAIL ELECTR
            </div>
          </div>
          <div>
            <h1 style={{ 
              margin: 0, 
              fontSize: '1.8rem',
              background: 'linear-gradient(45deg, #fff, #e3f2fd)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: '700'
            }}>
              ERP Rail-Electr Pro
            </h1>
            <p style={{ 
              margin: 0, 
              opacity: 0.9, 
              fontSize: '0.95rem',
              fontWeight: '300'
            }}>
              Système de Gestion Intégré - EPE Rail-Electr SPA
            </p>
          </div>
        </div>
        
        {/* Informations utilisateur */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '20px',
          background: 'rgba(255,255,255,0.1)',
          padding: '12px 20px',
          borderRadius: '10px',
          backdropFilter: 'blur(10px)'
        }}>
          <div style={{ textAlign: 'right' }}>
            <p style={{ 
              margin: 0, 
              fontWeight: '600',
              fontSize: '1rem'
            }}>
              {user.prenom} {user.nom}
            </p>
            <p style={{ 
              margin: 0, 
              fontSize: '0.85rem', 
              opacity: 0.8,
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              <span style={{ 
                background: 'rgba(255,255,255,0.2)', 
                padding: '2px 8px', 
                borderRadius: '10px',
                fontSize: '0.75rem'
              }}>
                {user.poste}
              </span>
              <span>•</span>
              <span>{user.matricule}</span>
            </p>
          </div>
          <button
            onClick={onLogout}
            style={{
              padding: '8px 16px',
              background: 'rgba(255,255,255,0.2)',
              color: 'white',
              border: '1px solid rgba(255,255,255,0.3)',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: '500',
              fontSize: '0.85rem',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'rgba(255,255,255,0.3)'
              e.target.style.transform = 'translateY(-1px)'
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'rgba(255,255,255,0.2)'
              e.target.style.transform = 'translateY(0)'
            }}
          >
            🚪 Déconnexion
          </button>
        </div>
      </div>
    </header>
  )
}

// Composant principal de l'application
function AppContent() {
  const { user, logout, canAccess } = useApp()
  const [currentPage, setCurrentPage] = useState('dashboard')

  if (!user) {
    return <Login />
  }

  const renderContent = () => {
    switch (currentPage) {
      case 'rh':
        return <GestionRH />
      case 'projets':
        return <GestionProjets />
      case 'documents':
        return <GestionDocuments />
      case 'dashboard':
      default:
        return <Dashboard />
    }
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    }}>
      <Header user={user} onLogout={logout} />
      <Navigation 
        currentPage={currentPage} 
        onPageChange={setCurrentPage}
        user={user}
        canAccess={canAccess}
      />
      
      {/* Contenu principal */}
      <main style={{ 
        minHeight: 'calc(100vh - 160px)',
        padding: '0'
      }}>
        {renderContent()}
      </main>

      {/* Pied de page */}
      <footer style={{
        background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
        color: 'white',
        padding: '30px 20px',
        marginTop: '50px'
      }}>
        <div style={{ 
          maxWidth: '1200px', 
          margin: '0 auto',
          textAlign: 'center'
        }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            gap: '20px',
            marginBottom: '20px',
            flexWrap: 'wrap'
          }}>
            <div style={{
              background: 'rgba(255,255,255,0.1)',
              padding: '10px 20px',
              borderRadius: '20px',
              backdropFilter: 'blur(10px)'
            }}>
              <strong>EPE Rail-Electr SPA</strong>
            </div>
            <div style={{
              background: 'rgba(255,255,255,0.1)',
              padding: '10px 20px',
              borderRadius: '20px',
              backdropFilter: 'blur(10px)'
            }}>
              <strong>Filiale GCF</strong>
            </div>
            <div style={{
              background: 'rgba(255,255,255,0.1)',
              padding: '10px 20px',
              borderRadius: '20px',
              backdropFilter: 'blur(10px)'
            }}>
              <strong>ERP Professionnel v2.0</strong>
            </div>
          </div>
          
          <p style={{ 
            margin: '0', 
            opacity: 0.8,
            fontSize: '0.9rem',
            lineHeight: '1.6'
          }}>
            © 2024 EPE Rail-Electr SPA - Groupe de Construction Ferroviaire<br />
            Système ERP Sécurisé - Développé sur mesure pour les besoins de l'entreprise<br />
            <span style={{ 
              background: 'rgba(255,255,255,0.2)', 
              padding: '2px 8px', 
              borderRadius: '10px',
              fontSize: '0.8rem',
              marginTop: '10px',
              display: 'inline-block'
            }}>
              🔒 Accès Restreint aux Personnels Autorisés
            </span>
          </p>
        </div>
      </footer>

      {/* Styles d'animation */}
      <style>
        {`
          @keyframes pulse {
            0% { opacity: 1; }
            50% { opacity: 0.5; }
            100% { opacity: 1; }
          }
          
          /* Scrollbar personnalisée */
          ::-webkit-scrollbar {
            width: 8px;
          }
          
          ::-webkit-scrollbar-track {
            background: #f1f1f1;
            border-radius: 4px;
          }
          
          ::-webkit-scrollbar-thumb {
            background: #1e3c72;
            border-radius: 4px;
          }
          
          ::-webkit-scrollbar-thumb:hover {
            background: #2a5298;
          }
          
          /* Animations globales */
          * {
            transition: background-color 0.3s ease, border-color 0.3s ease;
          }
        `}
      </style>
    </div>
  )
}

// Composant racine
function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  )
}

export default App
