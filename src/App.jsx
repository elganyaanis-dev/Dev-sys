import React from 'react'

function App() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
      color: 'white',
      padding: '20px'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header avec logos */}
        <header style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          padding: '20px 0',
          borderBottom: '2px solid rgba(255,255,255,0.2)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{
              width: '80px',
              height: '80px',
              background: 'white',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#1e3c72',
              fontWeight: 'bold',
              fontSize: '12px',
              textAlign: 'center'
            }}>
              LOGO GCF
            </div>
            <div style={{
              width: '80px',
              height: '80px',
              background: 'white',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#1e3c72',
              fontWeight: 'bold',
              fontSize: '10px',
              textAlign: 'center'
            }}>
              RAIL ELECTR
            </div>
          </div>
          
          <div style={{ textAlign: 'right' }}>
            <h1 style={{ margin: 0, fontSize: '2.5rem' }}>ERP Rail-Electr</h1>
            <p style={{ margin: 0, opacity: 0.8 }}>Système de Gestion Intégré</p>
          </div>
        </header>

        {/* Contenu principal */}
        <main style={{ padding: '40px 0' }}>
          <div style={{ 
            background: 'rgba(255,255,255,0.1)',
            padding: '40px',
            borderRadius: '15px',
            backdropFilter: 'blur(10px)'
          }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '20px' }}>
              🚀 Bienvenue dans votre ERP
            </h2>
            <p style={{ fontSize: '1.2rem', marginBottom: '30px' }}>
              Système complet de gestion pour <strong>EPE Rail-Electr SPA</strong><br/>
              Filiale du <strong>Groupe de Construction Ferroviaire (GCF)</strong>
            </p>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
              <div style={{ background: 'rgba(255,255,255,0.15)', padding: '20px', borderRadius: '10px' }}>
                <h3>🔐 Authentification</h3>
                <p>Accès sécurisé multi-niveaux</p>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.15)', padding: '20px', borderRadius: '10px' }}>
                <h3>💬 Communication</h3>
                <p>Messagerie professionnelle</p>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.15)', padding: '20px', borderRadius: '10px' }}>
                <h3>🏗️ Projets</h3>
                <p>Gestion par pôle opérationnel</p>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.15)', padding: '20px', borderRadius: '10px' }}>
                <h3>📊 Analytics</h3>
                <p>Reporting intelligent</p>
              </div>
            </div>
          </div>
        </main>

        <footer style={{ 
          textAlign: 'center', 
          padding: '20px 0',
          borderTop: '2px solid rgba(255,255,255,0.2)',
          opacity: 0.7
        }}>
          <p>© 2024 EPE Rail-Electr SPA - Filiale GCF | Système ERP Éco-responsable</p>
        </footer>
      </div>
    </div>
  )
}

export default App
