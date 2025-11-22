import React, { useState, useEffect } from 'react'

// ==================== BASE DE DONNÉES ====================
let organigramme = JSON.parse(localStorage.getItem('organigramme')) || {
  entreprise: {
    nom: "EPE Rail-Electr SPA",
    filiale: "Groupe de Construction Ferroviaire (GCF)",
    directeurGeneral: "Mohamed BENCHERIF"
  },
  poles: [
    { id: 1, nom: "Pôle Centre", directeur: "Ali HAMMADI", effectif: 145, couleur: "#1e3c72" },
    { id: 2, nom: "Pôle Est", directeur: "Karim BOUMEDIENE", effectif: 120, couleur: "#28a745" },
    { id: 3, nom: "Pôle Ouest", directeur: "Mustapha BENZINE", effectif: 110, couleur: "#dc3545" },
    { id: 4, nom: "Pôle Sud", directeur: "Hamid CHAOUCH", effectif: 85, couleur: "#ffc107" },
    { id: 5, nom: "Grands Projets", directeur: "Rachid MEZIANI", effectif: 65, couleur: "#6f42c1" }
  ],
  directions: [
    { id: 1, nom: "Direction Générale", responsable: "Mohamed BENCHERIF" },
    { id: 2, nom: "Ressources Humaines", responsable: "Fatima KEBIR" },
    { id: 3, nom: "Direction Commerciale", responsable: "Karim ZERROUKI" },
    { id: 4, nom: "Direction des Marchés", responsable: "Ahmed BOUMEHDI" },
    { id: 5, nom: "Sécurité et Environnement", responsable: "Bilal MANSOURI" }
  ]
}

let employees = JSON.parse(localStorage.getItem('employees')) || [
  {
    id: 1, matricule: "DG001", nom: "BENCHERIF", prenom: "Mohamed",
    email: "dg@railelectr.dz", password: "admin123", poste: "Directeur Général",
    pole: "Direction Générale", salaire: 450000, dateEmbauche: "2020-01-15",
    role: "admin", telephone: "+213 123 456 789", permissions: ["all"]
  },
  {
    id: 2, matricule: "RH001", nom: "KEBIR", prenom: "Fatima", 
    email: "rh@railelectr.dz", password: "rh123", poste: "Responsable RH",
    pole: "Ressources Humaines", salaire: 280000, dateEmbauche: "2021-03-20",
    role: "rh", telephone: "+213 123 456 788", permissions: ["rh", "documents"]
  },
  {
    id: 3, matricule: "EST001", nom: "BOUMEDIENE", prenom: "Karim",
    email: "pole.est@railelectr.dz", password: "est123", poste: "Chef de Pôle Est", 
    pole: "Pôle Est", salaire: 320000, dateEmbauche: "2019-06-10",
    role: "chef_pole", telephone: "+213 123 456 787", permissions: ["projets", "equipe"]
  }
]

let historiques = JSON.parse(localStorage.getItem('historiques')) || []

// ==================== COMPOSANTS ====================
function Login({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const user = employees.find(emp => emp.email === email && emp.password === password)
    if (user) {
      // Ajouter à l'historique
      historiques.push({
        type: "connexion",
        user: `${user.prenom} ${user.nom}`,
        timestamp: new Date().toISOString(),
        details: "Connexion au système"
      })
      localStorage.setItem('historiques', JSON.stringify(historiques))
      onLogin(user)
    } else {
      alert('Identifiants incorrects!')
    }
  }

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
        {/* Logos */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginBottom: '20px' }}>
          <div style={{
            width: '60px', height: '60px', background: '#1e3c72', color: 'white',
            borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontWeight: 'bold', fontSize: '10px', textAlign: 'center'
          }}>
            GCF
          </div>
          <div style={{
            width: '60px', height: '60px', background: '#1e3c72', color: 'white', 
            borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontWeight: 'bold', fontSize: '9px', textAlign: 'center'
          }}>
            RAIL ELECTR
          </div>
        </div>

        <h2 style={{ textAlign: 'center', color: '#1e3c72', marginBottom: '10px' }}>
          ERP Rail-Electr Pro
        </h2>
        <p style={{ textAlign: 'center', color: '#666', marginBottom: '30px' }}>
          EPE Rail-Electr SPA - Filiale GCF
        </p>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <input
              type="email"
              placeholder="Email professionnel"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ width: '100%', padding: '12px', border: '2px solid #ddd', borderRadius: '8px' }}
            />
          </div>
          <div style={{ marginBottom: '25px' }}>
            <input
              type="password"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ width: '100%', padding: '12px', border: '2px solid #ddd', borderRadius: '8px' }}
            />
          </div>
          <button type="submit" style={{
            width: '100%', padding: '12px', background: '#1e3c72', color: 'white',
            border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: '600'
          }}>
            Se connecter
          </button>
        </form>

        <div style={{ marginTop: '30px', padding: '15px', background: '#f8f9fa', borderRadius: '8px', fontSize: '12px' }}>
          <strong>Comptes de test :</strong><br/>
          • Admin: dg@railelectr.dz / admin123<br/>
          • RH: rh@railelectr.dz / rh123<br/>
          • Pôle Est: pole.est@railelectr.dz / est123
        </div>
      </div>
    </div>
  )
}

function Organigramme({ user, onUpdate }) {
  const [editing, setEditing] = useState(null)

  const handleEdit = (type, id, field, value) => {
    if (type === 'pole') {
      organigramme.poles = organigramme.poles.map(p => 
        p.id === id ? {...p, [field]: value} : p
      )
    } else if (type === 'direction') {
      organigramme.directions = organigramme.directions.map(d =>
        d.id === id ? {...d, [field]: value} : d
      )
    }
    localStorage.setItem('organigramme', JSON.stringify(organigramme))
    onUpdate()
  }

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h2>🏢 Organigramme Interactif</h2>
        {user.role === 'admin' && (
          <button onClick={() => setEditing(!editing)} style={{ padding: '8px 16px', background: '#28a745', color: 'white', border: 'none', borderRadius: '5px' }}>
            {editing ? '🔒 Verrouiller' : '✏️ Modifier'}
          </button>
        )}
      </div>

      {/* Pôles Opérationnels */}
      <section style={{ marginBottom: '40px' }}>
        <h3 style={{ color: '#1e3c72', borderBottom: '2px solid #1e3c72', paddingBottom: '10px' }}>
          🏗️ Pôles Opérationnels
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginTop: '20px' }}>
          {organigramme.poles.map(pole => (
            <div key={pole.id} style={{
              background: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
              borderLeft: `4px solid ${pole.couleur}`
            }}>
              <h4 style={{ color: pole.couleur }}>
                {editing ? (
                  <input 
                    value={pole.nom} 
                    onChange={(e) => handleEdit('pole', pole.id, 'nom', e.target.value)}
                    style={{ border: '1px solid #ddd', padding: '5px', borderRadius: '3px' }}
                  />
                ) : pole.nom}
              </h4>
              <p><strong>Directeur:</strong> {
                editing ? (
                  <input 
                    value={pole.directeur} 
                    onChange={(e) => handleEdit('pole', pole.id, 'directeur', e.target.value)}
                    style={{ border: '1px solid #ddd', padding: '5px', borderRadius: '3px', width: '150px' }}
                  />
                ) : pole.directeur
              }</p>
              <p><strong>Effectif:</strong> {pole.effectif} employés</p>
            </div>
          ))}
        </div>
      </section>

      {/* Directions */}
      <section>
        <h3 style={{ color: '#1e3c72', borderBottom: '2px solid #1e3c72', paddingBottom: '10px' }}>
          🏛️ Directions Stratégiques
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '15px', marginTop: '20px' }}>
          {organigramme.directions.map(direction => (
            <div key={direction.id} style={{
              background: 'white', padding: '15px', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
            }}>
              <h5>{direction.nom}</h5>
              <p><strong>Responsable:</strong> {
                editing ? (
                  <input 
                    value={direction.responsable} 
                    onChange={(e) => handleEdit('direction', direction.id, 'responsable', e.target.value)}
                    style={{ border: '1px solid #ddd', padding: '3px', borderRadius: '3px', width: '120px' }}
                  />
                ) : direction.responsable
              }</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

function GestionRH({ user, onUpdate }) {
  const [newEmployee, setNewEmployee] = useState({ nom: '', prenom: '', email: '', poste: '', pole: '' })

  const handleAddEmployee = (e) => {
    e.preventDefault()
    const employee = {
      id: employees.length + 1,
      matricule: `EMP${String(employees.length + 1).padStart(3, '0')}`,
      ...newEmployee,
      password: 'password123',
      dateEmbauche: new Date().toISOString().split('T')[0],
      salaire: 150000,
      role: 'employe',
      permissions: ['basic']
    }
    employees.push(employee)
    localStorage.setItem('employees', JSON.stringify(employees))
    
    // Historique
    historiques.push({
      type: "ajout_employe",
      user: `${user.prenom} ${user.nom}`,
      timestamp: new Date().toISOString(),
      details: `Nouvel employé: ${employee.prenom} ${employee.nom}`
    })
    localStorage.setItem('historiques', JSON.stringify(historiques))
    
    setNewEmployee({ nom: '', prenom: '', email: '', poste: '', pole: '' })
    onUpdate()
    alert('Employé ajouté avec succès!')
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>👥 Gestion des Ressources Humaines</h2>
      
      {/* Ajouter employé */}
      {user.role === 'admin' && (
        <div style={{ background: 'white', padding: '20px', borderRadius: '10px', marginBottom: '30px' }}>
          <h3>➕ Ajouter un Employé</h3>
          <form onSubmit={handleAddEmployee} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
            <input
              placeholder="Nom"
              value={newEmployee.nom}
              onChange={(e) => setNewEmployee({...newEmployee, nom: e.target.value})}
              required
              style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '5px' }}
            />
            <input
              placeholder="Prénom"
              value={newEmployee.prenom}
              onChange={(e) => setNewEmployee({...newEmployee, prenom: e.target.value})}
              required
              style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '5px' }}
            />
            <input
              type="email"
              placeholder="Email"
              value={newEmployee.email}
              onChange={(e) => setNewEmployee({...newEmployee, email: e.target.value})}
              required
              style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '5px' }}
            />
            <input
              placeholder="Poste"
              value={newEmployee.poste}
              onChange={(e) => setNewEmployee({...newEmployee, poste: e.target.value})}
              required
              style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '5px' }}
            />
            <select
              value={newEmployee.pole}
              onChange={(e) => setNewEmployee({...newEmployee, pole: e.target.value})}
              required
              style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '5px' }}
            >
              <option value="">Sélectionner un pôle</option>
              {organigramme.poles.map(pole => (
                <option key={pole.id} value={pole.nom}>{pole.nom}</option>
              ))}
              {organigramme.directions.map(dir => (
                <option key={dir.id} value={dir.nom}>{dir.nom}</option>
              ))}
            </select>
            <button type="submit" style={{ padding: '8px', background: '#28a745', color: 'white', border: 'none', borderRadius: '5px' }}>
              Ajouter
            </button>
          </form>
        </div>
      )}

      {/* Liste des employés */}
      <div style={{ background: 'white', padding: '20px', borderRadius: '10px' }}>
        <h3>📋 Liste du Personnel ({employees.length} employés)</h3>
        <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f8f9fa' }}>
                <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>Matricule</th>
                <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>Nom & Prénom</th>
                <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>Poste</th>
                <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>Pôle/Direction</th>
                <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>Salaire</th>
              </tr>
            </thead>
            <tbody>
              {employees.map(emp => (
                <tr key={emp.id}>
                  <td style={{ padding: '10px', border: '1px solid #ddd' }}>{emp.matricule}</td>
                  <td style={{ padding: '10px', border: '1px solid #ddd' }}>{emp.prenom} {emp.nom}</td>
                  <td style={{ padding: '10px', border: '1px solid #ddd' }}>{emp.poste}</td>
                  <td style={{ padding: '10px', border: '1px solid #ddd' }}>{emp.pole}</td>
                  <td style={{ padding: '10px', border: '1px solid #ddd' }}>{emp.salaire?.toLocaleString()} DA</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function Historique({ user }) {
  return (
    <div style={{ padding: '20px' }}>
      <h2>📊 Historique des Activités</h2>
      <div style={{ background: 'white', padding: '20px', borderRadius: '10px', maxHeight: '500px', overflowY: 'auto' }}>
        {historiques.slice().reverse().map((hist, index) => (
          <div key={index} style={{
            padding: '10px',
            borderLeft: `4px solid ${
              hist.type === 'connexion' ? '#28a745' :
              hist.type === 'ajout_employe' ? '#007bff' : '#6c757d'
            }`,
            background: '#f8f9fa',
            marginBottom: '10px',
            borderRadius: '0 5px 5px 0'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <strong>{hist.user}</strong>
              <span style={{ color: '#666', fontSize: '0.9em' }}>
                {new Date(hist.timestamp).toLocaleString('fr-FR')}
              </span>
            </div>
            <div style={{ color: '#555' }}>{hist.details}</div>
            <div style={{ color: '#888', fontSize: '0.8em' }}>Type: {hist.type}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ==================== APPLICATION PRINCIPALE ====================
function App() {
  const [user, setUser] = useState(null)
  const [currentPage, setCurrentPage] = useState('dashboard')
  const [updateTrigger, setUpdateTrigger] = useState(0)

  const handleLogin = (userData) => {
    setUser(userData)
  }

  const handleLogout = () => {
    historiques.push({
      type: "deconnexion",
      user: `${user.prenom} ${user.nom}`,
      timestamp: new Date().toISOString(),
      details: "Déconnexion du système"
    })
    localStorage.setItem('historiques', JSON.stringify(historiques))
    setUser(null)
    setCurrentPage('dashboard')
  }

  const handleUpdate = () => {
    setUpdateTrigger(prev => prev + 1)
  }

  if (!user) {
    return <Login onLogin={handleLogin} />
  }

  // Rendu du contenu selon la page
  const renderContent = () => {
    switch (currentPage) {
      case 'organigramme':
        return <Organigramme user={user} onUpdate={handleUpdate} />
      case 'rh':
        return <GestionRH user={user} onUpdate={handleUpdate} />
      case 'historique':
        return <Historique user={user} />
      case 'dashboard':
      default:
        return (
          <div style={{ padding: '20px' }}>
            <h2>🎯 Tableau de Bord - {user.prenom} {user.nom}</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginTop: '20px' }}>
              <div style={{ background: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
                <h3>👥 Effectif Total</h3>
                <p style={{ fontSize: '2rem', color: '#1e3c72' }}>{employees.length}</p>
              </div>
              <div style={{ background: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
                <h3>🏗️ Pôles Actifs</h3>
                <p style={{ fontSize: '2rem', color: '#1e3c72' }}>{organigramme.poles.length}</p>
              </div>
              <div style={{ background: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
                <h3>📈 Activités Récentes</h3>
                <p style={{ fontSize: '2rem', color: '#1e3c72' }}>{historiques.length}</p>
              </div>
            </div>
          </div>
        )
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f5f7fa' }}>
      {/* Header */}
      <header style={{ 
        background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
        color: 'white',
        padding: '15px 0'
      }}>
        <div style={{ 
          maxWidth: '1200px', margin: '0 auto', padding: '0 20px', 
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <div style={{ display: 'flex', gap: '10px' }}>
              <div style={{
                width: '40px', height: '40px', background: 'white', color: '#1e3c72',
                borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 'bold', fontSize: '8px', textAlign: 'center'
              }}>
                GCF
              </div>
              <div style={{
                width: '40px', height: '40px', background: 'white', color: '#1e3c72',
                borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 'bold', fontSize: '7px', textAlign: 'center'
              }}>
                RAIL ELECTR
              </div>
            </div>
            <div>
              <h1 style={{ margin: 0, fontSize: '1.3rem' }}>ERP Rail-Electr Pro</h1>
              <p style={{ margin: 0, opacity: 0.8, fontSize: '0.8rem' }}>
                {user.prenom} {user.nom} - {user.poste}
              </p>
            </div>
          </div>
          <button onClick={handleLogout} style={{ 
            padding: '8px 16px', background: 'rgba(255,255,255,0.2)', color: 'white', 
            border: 'none', borderRadius: '5px', cursor: 'pointer'
          }}>
            Déconnexion
          </button>
        </div>
      </header>

      {/* Navigation */}
      <nav style={{ background: 'white', padding: '15px 0', borderBottom: '1px solid #e0e0e0' }}>
        <div style={{ 
          maxWidth: '1200px', margin: '0 auto', padding: '0 20px', 
          display: 'flex', gap: '10px', flexWrap: 'wrap'
        }}>
          <button 
            onClick={() => setCurrentPage('dashboard')}
            style={{ 
              padding: '10px 20px', 
              background: currentPage === 'dashboard' ? '#1e3c72' : '#6c757d', 
              color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer'
            }}
          >
            🏠 Dashboard
          </button>
          <button 
            onClick={() => setCurrentPage('organigramme')}
            style={{ 
              padding: '10px 20px', 
              background: currentPage === 'organigramme' ? '#28a745' : '#6c757d', 
              color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer'
            }}
          >
            🏢 Organigramme
          </button>
          <button 
            onClick={() => setCurrentPage('rh')}
            style={{ 
              padding: '10px 20px', 
              background: currentPage === 'rh' ? '#dc3545' : '#6c757d', 
              color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer'
            }}
          >
            👥 RH & Personnel
          </button>
          <button 
            onClick={() => setCurrentPage('historique')}
            style={{ 
              padding: '10px 20px', 
              background: currentPage === 'historique' ? '#ffc107' : '#6c757d', 
              color: 'black', border: 'none', borderRadius: '5px', cursor: 'pointer'
            }}
          >
            📊 Historique
          </button>
        </div>
      </nav>

      {/* Contenu principal */}
      <main key={updateTrigger}>
        {renderContent()}
      </main>
    </div>
  )
}

export default App
