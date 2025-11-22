import React, { useState } from 'react'
import { useApp } from '../../context/AppContext'

const GestionProjets = () => {
  const { user, projects, addProject, employees, canAccess, dispatch } = useApp()
  const [activeTab, setActiveTab] = useState('liste')
  const [newProject, setNewProject] = useState({
    code: '', nom: '', client: '', budget: '', date_debut: '', 
    date_fin_prevue: '', chef_projet: '', pole: '', statut: 'planification'
  })

  const generateProjectCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    let result = 'PROJ-'
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return result
  }

  const handleAddProject = (e) => {
    e.preventDefault()
    
    const project = {
      id: projects.length + 1,
      code: newProject.code || generateProjectCode(),
      ...newProject,
      budget: parseInt(newProject.budget),
      date_creation: new Date().toISOString(),
      createur: `${user.prenom} ${user.nom}`,
      equipe: [],
      taches: [],
      documents: []
    }

    addProject(project)
    setNewProject({
      code: '', nom: '', client: '', budget: '', date_debut: '', 
      date_fin_prevue: '', chef_projet: '', pole: '', statut: 'planification'
    })
  }

  const getProjectStats = () => {
    const stats = {
      total: projects.length,
      actifs: projects.filter(p => p.statut === 'actif').length,
      planification: projects.filter(p => p.statut === 'planification').length,
      termines: projects.filter(p => p.statut === 'termine').length,
      budgetTotal: projects.reduce((sum, p) => sum + (p.budget || 0), 0)
    }
    return stats
  }

  const stats = getProjectStats()

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h2>🏗️ Gestion des Projets</h2>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button 
            onClick={() => setActiveTab('liste')}
            style={{ 
              padding: '10px 20px', 
              background: activeTab === 'liste' ? '#1e3c72' : '#6c757d', 
              color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer'
            }}
          >
            📋 Liste des Projets
          </button>
          {canAccess(user, 'project_manager') && (
            <button 
              onClick={() => setActiveTab('ajout')}
              style={{ 
                padding: '10px 20px', 
                background: activeTab === 'ajout' ? '#28a745' : '#6c757d', 
                color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer'
              }}
            >
              ➕ Nouveau Projet
            </button>
          )}
          <button 
            onClick={() => setActiveTab('statistiques')}
            style={{ 
              padding: '10px 20px', 
              background: activeTab === 'statistiques' ? '#ffc107' : '#6c757d', 
              color: 'black', border: 'none', borderRadius: '5px', cursor: 'pointer'
            }}
          >
            📊 Statistiques
          </button>
        </div>
      </div>

      {/* Statistiques rapides */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
        gap: '15px',
        marginBottom: '30px'
      }}>
        <div style={{ background: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', color: '#1e3c72', fontWeight: 'bold' }}>{stats.total}</div>
          <div style={{ color: '#666' }}>Projets Total</div>
        </div>
        <div style={{ background: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', color: '#28a745', fontWeight: 'bold' }}>{stats.actifs}</div>
          <div style={{ color: '#666' }}>Projets Actifs</div>
        </div>
        <div style={{ background: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', color: '#ffc107', fontWeight: 'bold' }}>{stats.planification}</div>
          <div style={{ color: '#666' }}>En Planification</div>
        </div>
        <div style={{ background: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', color: '#17a2b8', fontWeight: 'bold' }}>{stats.budgetTotal.toLocaleString()} DA</div>
          <div style={{ color: '#666' }}>Budget Total</div>
        </div>
      </div>

      {/* Liste des projets */}
      {activeTab === 'liste' && (
        <div style={{ background: 'white', padding: '25px', borderRadius: '10px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
          <h3 style={{ color: '#1e3c72', marginBottom: '20px' }}>📁 Portefeuille de Projets</h3>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '900px' }}>
              <thead>
                <tr style={{ background: '#f8f9fa' }}>
                  <th style={{ padding: '12px', border: '1px solid #dee2e6', textAlign: 'left' }}>Code</th>
                  <th style={{ padding: '12px', border: '1px solid #dee2e6', textAlign: 'left' }}>Nom du Projet</th>
                  <th style={{ padding: '12px', border: '1px solid #dee2e6', textAlign: 'left' }}>Client</th>
                  <th style={{ padding: '12px', border: '1px solid #dee2e6', textAlign: 'left' }}>Budget</th>
                  <th style={{ padding: '12px', border: '1px solid #dee2e6', textAlign: 'left' }}>Chef de Projet</th>
                  <th style={{ padding: '12px', border: '1px solid #dee2e6', textAlign: 'left' }}>Statut</th>
                  <th style={{ padding: '12px', border: '1px solid #dee2e6', textAlign: 'left' }}>Échéance</th>
                  <th style={{ padding: '12px', border: '1px solid #dee2e6', textAlign: 'left' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {projects.map(project => (
                  <tr key={project.id} style={{ borderBottom: '1px solid #dee2e6' }}>
                    <td style={{ padding: '12px', border: '1px solid #dee2e6' }}>
                      <strong style={{ color: '#1e3c72' }}>{project.code}</strong>
                    </td>
                    <td style={{ padding: '12px', border: '1px solid #dee2e6' }}>
                      <div style={{ fontWeight: '600' }}>{project.nom}</div>
                      <div style={{ fontSize: '0.8rem', color: '#666' }}>{project.pole}</div>
                    </td>
                    <td style={{ padding: '12px', border: '1px solid #dee2e6' }}>{project.client}</td>
                    <td style={{ padding: '12px', border: '1px solid #dee2e6' }}>
                      {project.budget?.toLocaleString()} DA
                    </td>
                    <td style={{ padding: '12px', border: '1px solid #dee2e6' }}>{project.chef_projet}</td>
                    <td style={{ padding: '12px', border: '1px solid #dee2e6' }}>
                      <span style={{
                        padding: '4px 8px',
                        borderRadius: '12px',
                        fontSize: '0.8rem',
                        fontWeight: '500',
                        background: 
                          project.statut === 'actif' ? '#d4edda' :
                          project.statut === 'planification' ? '#fff3cd' :
                          project.statut === 'termine' ? '#d1ecf1' : '#e2e3e5',
                        color: 
                          project.statut === 'actif' ? '#155724' :
                          project.statut === 'planification' ? '#856404' :
                          project.statut === 'termine' ? '#0c5460' : '#383d41'
                      }}>
                        {project.statut}
                      </span>
                    </td>
                    <td style={{ padding: '12px', border: '1px solid #dee2e6' }}>
                      {project.date_fin_prevue ? new Date(project.date_fin_prevue).toLocaleDateString('fr-FR') : '-'}
                    </td>
                    <td style={{ padding: '12px', border: '1px solid #dee2e6' }}>
                      <button style={{ 
                        padding: '5px 10px', 
                        background: '#007bff', 
                        color: 'white', 
                        border: 'none', 
                        borderRadius: '3px', 
                        fontSize: '0.8rem',
                        cursor: 'pointer',
                        marginRight: '5px'
                      }}>
                        👁️ Voir
                      </button>
                      {canAccess(user, 'project_manager') && (
                        <button style={{ 
                          padding: '5px 10px', 
                          background: '#28a745', 
                          color: 'white', 
                          border: 'none', 
                          borderRadius: '3px', 
                          fontSize: '0.8rem',
                          cursor: 'pointer'
                        }}>
                          ✏️ Modifier
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Ajout de projet */}
      {activeTab === 'ajout' && canAccess(user, 'project_manager') && (
        <div style={{ background: 'white', padding: '25px', borderRadius: '10px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
          <h3 style={{ color: '#28a745', marginBottom: '20px' }}>🚀 Nouveau Projet</h3>
          <form onSubmit={handleAddProject} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Code Projet</label>
              <input
                value={newProject.code}
                onChange={(e) => setNewProject({...newProject, code: e.target.value})}
                placeholder="Laisser vide pour génération auto"
                style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Nom du Projet *</label>
              <input
                value={newProject.nom}
                onChange={(e) => setNewProject({...newProject, nom: e.target.value})}
                required
                style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Client *</label>
              <input
                value={newProject.client}
                onChange={(e) => setNewProject({...newProject, client: e.target.value})}
                required
                style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Budget (DA) *</label>
              <input
                type="number"
                value={newProject.budget}
                onChange={(e) => setNewProject({...newProject, budget: e.target.value})}
                required
                style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Date de Début *</label>
              <input
                type="date"
                value={newProject.date_debut}
                onChange={(e) => setNewProject({...newProject, date_debut: e.target.value})}
                required
                style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Date de Fin Prévue *</label>
              <input
                type="date"
                value={newProject.date_fin_prevue}
                onChange={(e) => setNewProject({...newProject, date_fin_prevue: e.target.value})}
                required
                style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Chef de Projet *</label>
              <select
                value={newProject.chef_projet}
                onChange={(e) => setNewProject({...newProject, chef_projet: e.target.value})}
                required
                style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }}
              >
                <option value="">Sélectionner un chef de projet</option>
                {employees.filter(emp => 
                  emp.role === 'project_manager' || emp.role === 'admin' || emp.role === 'super_admin'
                ).map(emp => (
                  <option key={emp.id} value={`${emp.prenom} ${emp.nom}`}>
                    {emp.prenom} {emp.nom} - {emp.poste}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Pôle *</label>
              <select
                value={newProject.pole}
                onChange={(e) => setNewProject({...newProject, pole: e.target.value})}
                required
                style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }}
              >
                <option value="">Sélectionner un pôle</option>
                <option value="Pôle Centre">Pôle Centre</option>
                <option value="Pôle Est">Pôle Est</option>
                <option value="Pôle Ouest">Pôle Ouest</option>
                <option value="Pôle Sud">Pôle Sud</option>
                <option value="Grands Projets">Grands Projets</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Statut Initial *</label>
              <select
                value={newProject.statut}
                onChange={(e) => setNewProject({...newProject, statut: e.target.value})}
                required
                style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }}
              >
                <option value="planification">Planification</option>
                <option value="actif">Actif</option>
                <option value="en_attente">En Attente</option>
              </select>
            </div>
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', marginTop: '20px' }}>
              <button type="submit" style={{ 
                padding: '12px 30px', 
                background: '#28a745', 
                color: 'white', 
                border: 'none', 
                borderRadius: '5px', 
                fontSize: '16px',
                cursor: 'pointer'
              }}>
                🚀 Créer le Projet
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Statistiques détaillées */}
      {activeTab === 'statistiques' && (
        <div style={{ background: 'white', padding: '25px', borderRadius: '10px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
          <h3 style={{ color: '#ffc107', marginBottom: '20px' }}>📊 Statistiques des Projets</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
            <div style={{ padding: '20px', background: '#f8f9fa', borderRadius: '8px' }}>
              <h4 style={{ color: '#1e3c72' }}>Répartition par Statut</h4>
              <div style={{ marginTop: '15px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span>Actifs</span>
                  <span style={{ fontWeight: 'bold', color: '#28a745' }}>{stats.actifs}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span>Planification</span>
                  <span style={{ fontWeight: 'bold', color: '#ffc107' }}>{stats.planification}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Terminés</span>
                  <span style={{ fontWeight: 'bold', color: '#17a2b8' }}>{stats.termines}</span>
                </div>
              </div>
            </div>
            
            <div style={{ padding: '20px', background: '#f8f9fa', borderRadius: '8px' }}>
              <h4 style={{ color: '#1e3c72' }}>Budget Global</h4>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1e3c72', marginTop: '10px' }}>
                {stats.budgetTotal.toLocaleString()} DA
              </div>
              <div style={{ color: '#666', fontSize: '0.9rem', marginTop: '5px' }}>
                Budget total alloué
              </div>
            </div>
            
            <div style={{ padding: '20px', background: '#f8f9fa', borderRadius: '8px' }}>
              <h4 style={{ color: '#1e3c72' }}>Projets par Pôle</h4>
              <div style={{ marginTop: '15px' }}>
                {Array.from(new Set(projects.map(p => p.pole))).map(pole => (
                  <div key={pole} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span>{pole || 'Non assigné'}</span>
                    <span style={{ fontWeight: 'bold' }}>
                      {projects.filter(p => p.pole === pole).length}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default GestionProjets
