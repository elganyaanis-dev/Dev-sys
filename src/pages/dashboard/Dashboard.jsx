import React from 'react'
import { useApp } from '../../context/AppContext'

const Dashboard = () => {
  const { user, employees, projects, documents, historique, canAccess } = useApp()

  const stats = {
    totalEmployees: employees.length,
    activeEmployees: employees.filter(e => e.actif !== false).length,
    totalProjects: projects.length,
    activeProjects: projects.filter(p => p.statut === 'actif').length,
    totalDocuments: documents.length,
    recentActivities: historique.filter(h => 
      new Date(h.timestamp) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    ).length
  }

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Bonjour'
    if (hour < 18) return 'Bon après-midi'
    return 'Bonsoir'
  }

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      {/* En-tête personnalisé */}
      <div style={{ 
        background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
        color: 'white',
        padding: '30px',
        borderRadius: '15px',
        marginBottom: '30px'
      }}>
        <h1 style={{ margin: '0 0 10px 0', fontSize: '2.2rem' }}>
          {getGreeting()}, {user.prenom} 👋
        </h1>
        <p style={{ margin: 0, opacity: 0.9, fontSize: '1.1rem' }}>
          Bienvenue dans votre espace de travail EPE Rail-Electr
        </p>
        <div style={{ 
          display: 'flex', 
          gap: '15px', 
          marginTop: '20px',
          flexWrap: 'wrap'
        }}>
          <div style={{ 
            background: 'rgba(255,255,255,0.2)', 
            padding: '10px 20px', 
            borderRadius: '20px',
            backdropFilter: 'blur(10px)'
          }}>
            <strong>Poste:</strong> {user.poste}
          </div>
          <div style={{ 
            background: 'rgba(255,255,255,0.2)', 
            padding: '10px 20px', 
            borderRadius: '20px',
            backdropFilter: 'blur(10px)'
          }}>
            <strong>Département:</strong> {user.departement}
          </div>
          <div style={{ 
            background: 'rgba(255,255,255,0.2)', 
            padding: '10px 20px', 
            borderRadius: '20px',
            backdropFilter: 'blur(10px)'
          }}>
            <strong>Matricule:</strong> {user.matricule}
          </div>
        </div>
      </div>

      {/* Statistiques principales */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
        gap: '20px',
        marginBottom: '30px'
      }}>
        <div style={{ 
          background: 'white', 
          padding: '25px', 
          borderRadius: '10px', 
          boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
          borderLeft: '4px solid #1e3c72'
        }}>
          <h3 style={{ margin: '0 0 10px 0', color: '#1e3c72' }}>👥 Effectif Total</h3>
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#1e3c72' }}>
            {stats.totalEmployees}
          </div>
          <div style={{ color: '#666', fontSize: '0.9rem' }}>
            {stats.activeEmployees} actifs
          </div>
        </div>

        <div style={{ 
          background: 'white', 
          padding: '25px', 
          borderRadius: '10px', 
          boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
          borderLeft: '4px solid #28a745'
        }}>
          <h3 style={{ margin: '0 0 10px 0', color: '#28a745' }}>🏗️ Projets Actifs</h3>
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#28a745' }}>
            {stats.activeProjects}
          </div>
          <div style={{ color: '#666', fontSize: '0.9rem' }}>
            sur {stats.totalProjects} projets
          </div>
        </div>

        <div style={{ 
          background: 'white', 
          padding: '25px', 
          borderRadius: '10px', 
          boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
          borderLeft: '4px solid #dc3545'
        }}>
          <h3 style={{ margin: '0 0 10px 0', color: '#dc3545' }}>📑 Documents</h3>
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#dc3545' }}>
            {stats.totalDocuments}
          </div>
          <div style={{ color: '#666', fontSize: '0.9rem' }}>
            dans le système
          </div>
        </div>

        <div style={{ 
          background: 'white', 
          padding: '25px', 
          borderRadius: '10px', 
          boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
          borderLeft: '4px solid #ffc107'
        }}>
          <h3 style={{ margin: '0 0 10px 0', color: '#ffc107' }}>📊 Activités Récentes</h3>
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#ffc107' }}>
            {stats.recentActivities}
          </div>
          <div style={{ color: '#666', fontSize: '0.9rem' }}>
            cette semaine
          </div>
        </div>
      </div>

      {/* Accès rapides */}
      <div style={{ marginBottom: '30px' }}>
        <h2 style={{ color: '#1e3c72', marginBottom: '20px' }}>🚀 Accès Rapides</h2>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '15px' 
        }}>
          {canAccess(user, 'employee') && (
            <div style={{ 
              background: 'white', 
              padding: '20px', 
              borderRadius: '10px', 
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'transform 0.2s'
            }} onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
               onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}>
              <div style={{ fontSize: '2rem', marginBottom: '10px' }}>📋</div>
              <div style={{ fontWeight: '600', color: '#1e3c72' }}>Mes Documents</div>
            </div>
          )}

          {canAccess(user, 'rh_manager') && (
            <div style={{ 
              background: 'white', 
              padding: '20px', 
              borderRadius: '10px', 
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'transform 0.2s'
            }} onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
               onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}>
              <div style={{ fontSize: '2rem', marginBottom: '10px' }}>👥</div>
              <div style={{ fontWeight: '600', color: '#1e3c72' }}>Gestion RH</div>
            </div>
          )}

          {canAccess(user, 'project_manager') && (
            <div style={{ 
              background: 'white', 
              padding: '20px', 
              borderRadius: '10px', 
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'transform 0.2s'
            }} onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
               onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}>
              <div style={{ fontSize: '2rem', marginBottom: '10px' }}>🏗️</div>
              <div style={{ fontWeight: '600', color: '#1e3c72' }}>Projets</div>
            </div>
          )}

          <div style={{ 
            background: 'white', 
            padding: '20px', 
            borderRadius: '10px', 
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            textAlign: 'center',
            cursor: 'pointer',
            transition: 'transform 0.2s'
          }} onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
             onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}>
            <div style={{ fontSize: '2rem', marginBottom: '10px' }}>📊</div>
            <div style={{ fontWeight: '600', color: '#1e3c72' }}>Rapports</div>
          </div>
        </div>
      </div>

      {/* Activités récentes */}
      <div style={{ background: 'white', padding: '25px', borderRadius: '10px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
        <h3 style={{ color: '#1e3c72', marginBottom: '20px' }}>📈 Activités Récentes</h3>
        <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
          {historique.slice(-10).reverse().map((activity, index) => (
            <div key={index} style={{
              padding: '12px',
              borderLeft: `4px solid ${
                activity.type === 'connexion' ? '#28a745' :
                activity.type === 'ajout_employe' ? '#007bff' :
                activity.type === 'ajout_projet' ? '#ffc107' : '#6c757d'
              }`,
              background: '#f8f9fa',
              marginBottom: '8px',
              borderRadius: '0 5px 5px 0'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <strong>{activity.user}</strong>
                  <div style={{ color: '#555', marginTop: '2px' }}>{activity.details}</div>
                </div>
                <div style={{ color: '#666', fontSize: '0.8rem', textAlign: 'right' }}>
                  {new Date(activity.timestamp).toLocaleString('fr-FR')}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
