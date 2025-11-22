import React, { useState } from 'react'

// Base de données employés
const employees = [
  {
    id: 1,
    nom: "BENCHERIF",
    prenom: "Mohamed",
    email: "dg@railelectr.dz",
    password: "admin123",
    poste: "Directeur Général",
    pole: "Direction Générale",
    role: "dg"
  },
  {
    id: 2,
    nom: "KEBIR", 
    prenom: "Fatima",
    email: "rh@railelectr.dz",
    password: "rh123",
    poste: "Responsable RH",
    pole: "Ressources Humaines",
    role: "rh"
  },
  {
    id: 3,
    nom: "BOUMEDIENE",
    prenom: "Karim", 
    email: "pole.est@railelectr.dz",
    password: "est123",
    poste: "Chef de Pôle Est",
    pole: "Pôle Est",
    role: "chef_pole"
  }
]

function App() {
  const [user, setUser] = useState(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (e) => {
    e.preventDefault()
    const foundUser = employees.find(emp => 
      emp.email === email && emp.password === password
    )
    
    if (foundUser) {
      setUser(foundUser)
    } else {
      alert('Identifiants incorrects!')
    }
  }

  const handleLogout = () => {
    setUser(null)
    setEmail('')
    setPassword('')
  }

  // Si utilisateur connecté, afficher le dashboard
  if (user) {
    return (
      <div style={{ minHeight: '100vh', background: '#f5f7fa' }}>
        {/* Header */}
        <header style={{ 
          background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
          color: 'white',
          padding: '15px 0'
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h1 style={{ margin: 0 }}>🚆 ERP Rail-Electr</h1>
              <p style={{ margin: 0, opacity: 0.8 }}>Connecté en tant que {user.prenom} {user.nom}</p>
            </div>
            <button onClick={handleLogout} style={{ padding: '8px 16px', background: 'rgba(255,255,255,0.2)', color: 'white', border: 'none', borderRadius: '5px' }}>
              Déconnexion
            </button>
          </div>
        </header>

        {/* Navigation */}
        <nav style={{ background: 'white', padding: '15px 0', borderBottom: '1px solid #e0e0e0' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <button style={{ padding: '10px 20px', background: '#1e3c72', color: 'white', border: 'none', borderRadius: '5px' }}>
              🏠 Tableau de Bord
            </button>
            <button style={{ padding: '10px 20px', background: '#28a745', color: 'white', border: 'none', borderRadius: '5px' }}>
              🏢 Organigramme
            </button>
            <button style={{ padding: '10px 20px', background: '#dc3545', color: 'white', border: 'none', borderRadius: '5px' }}>
              👥 RH & Paie
            </button>
            <button style={{ padding: '10px 20px', background: '#ffc107', color: 'black', border: 'none', borderRadius: '5px' }}>
              📊 Projets
            </button>
          </div>
        </nav>

        {/* Contenu selon le rôle */}
        <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
          
          {user.role === 'dg' && (
            <div>
              <h2>🎯 Tableau de Bord - Directeur Général</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginTop: '20px' }}>
                <div style={{ background: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
                  <h3>📈 Chiffre d'Affaires</h3>
                  <p style={{ fontSize: '2rem', color: '#1e3c72' }}>4.2M €</p>
                </div>
                <div style={{ background: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
                  <h3>👥 Effectif Total</h3>
                  <p style={{ fontSize: '2rem', color: '#1e3c72' }}>615</p>
                </div>
                <div style={{ background: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
                  <h3>🏗️ Projets Actifs</h3>
                  <p style={{ fontSize: '2rem', color: '#1e3c72' }}>24</p>
                </div>
              </div>
            </div>
          )}

          {user.role === 'rh' && (
            <div>
              <h2>👥 Dashboard Ressources Humaines</h2>
              <div style={{ background: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
                <h3>Gestion du Personnel</h3>
                <p>• 615 employés</p>
                <p>• 12 congés en attente</p>
                <p>• 3 recrutements en cours</p>
              </div>
            </div>
          )}

          {user.role === 'chef_pole' && (
            <div>
              <h2>🏗️ Dashboard {user.pole}</h2>
              <div style={{ background: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
                <h3>Projets du Pôle</h3>
                <p>• Électrification Ligne Est</p>
                <p>• Modernisation Caténaire</p>
                <p>• Nouvelle gare Constantine</p>
              </div>
            </div>
          )}

        </main>
      </div>
    )
  }

  // Page de connexion
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{
        background: 'white',
        padding: '40px',
        borderRadius: '15px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
        width: '100%',
        maxWidth: '400px'
      }}>
        <h2 style={{ textAlign: 'center', color: '#1e3c72', marginBottom: '10px' }}>
          🚆 ERP Rail-Electr
        </h2>
        <p style={{ textAlign: 'center', color: '#666', marginBottom: '30px' }}>
          EPE Rail-Electr SPA - Filiale GCF
        </p>

        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '20px' }}>
            <input
              type="email"
              placeholder="Email professionnel"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '12px',
                border: '2px solid #ddd',
                borderRadius: '8px',
                fontSize: '16px'
              }}
            />
          </div>

          <div style={{ marginBottom: '25px' }}>
            <input
              type="password"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '12px',
                border: '2px solid #ddd',
                borderRadius: '8px',
                fontSize: '16px'
              }}
            />
          </div>

          <button
            type="submit"
            style={{
              width: '100%',
              padding: '12px',
              background: '#1e3c72',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600'
            }}
          >
            Se connecter
          </button>
        </form>

        <div style={{
          marginTop: '30px',
          padding: '15px',
          background: '#f8f9fa',
          borderRadius: '8px',
          fontSize: '12px'
        }}>
          <strong>Comptes de test :</strong><br/>
          • DG: dg@railelectr.dz / admin123<br/>
          • RH: rh@railelectr.dz / rh123<br/>
          • Pôle Est: pole.est@railelectr.dz / est123
        </div>
      </div>
    </div>
  )
}

export default App
