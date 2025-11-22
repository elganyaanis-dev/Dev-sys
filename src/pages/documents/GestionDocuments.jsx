import React, { useState } from 'react'
import { useApp } from '../../context/AppContext'

const GestionDocuments = () => {
  const { user, documents, addDocument, canAccess } = useApp()
  const [activeTab, setActiveTab] = useState('liste')
  const [newDocument, setNewDocument] = useState({
    type: '', reference: '', titre: '', description: '', 
    confidentialite: 'interne', auteur: '', tags: ''
  })

  const handleAddDocument = (e) => {
    e.preventDefault()
    
    const document = {
      id: documents.length + 1,
      ...newDocument,
      auteur: `${user.prenom} ${user.nom}`,
      date_creation: new Date().toISOString(),
      date_modification: new Date().toISOString(),
      version: '1.0',
      statut: 'actif',
      tags: newDocument.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
    }

    addDocument(document)
    setNewDocument({
      type: '', reference: '', titre: '', description: '', 
      confidentialite: 'interne', auteur: '', tags: ''
    })
  }

  const getDocumentStats = () => {
    const stats = {
      total: documents.length,
      contrats: documents.filter(d => d.type === 'contrat').length,
      procedures: documents.filter(d => d.type === 'procedure').length,
      rapports: documents.filter(d => d.type === 'rapport').length,
      confidentiels: documents.filter(d => d.confidentialite === 'confidentiel').length
    }
    return stats
  }

  const stats = getDocumentStats()

  const documentTypes = [
    { value: 'contrat', label: '📄 Contrat', color: '#007bff' },
    { value: 'procedure', label: '📋 Procédure', color: '#28a745' },
    { value: 'rapport', label: '📊 Rapport', color: '#ffc107' },
    { value: 'note', label: '📝 Note Interne', color: '#6c757d' },
    { value: 'presentation', label: '📽️ Présentation', color: '#6f42c1' },
    { value: 'autre', label: '📁 Autre', color: '#fd7e14' }
  ]

  const confidentialityLevels = [
    { value: 'public', label: '🌐 Public', color: '#28a745' },
    { value: 'interne', label: '🏢 Interne', color: '#007bff' },
    { value: 'confidentiel', label: '🔒 Confidentiel', color: '#dc3545' },
    { value: 'secret', label: '🚨 Secret', color: '#6f42c1' }
  ]

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h2>📑 Gestion Documentaire</h2>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button 
            onClick={() => setActiveTab('liste')}
            style={{ 
              padding: '10px 20px', 
              background: activeTab === 'liste' ? '#1e3c72' : '#6c757d', 
              color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer'
            }}
          >
            📋 Documents
          </button>
          {canAccess(user, 'employee') && (
            <button 
              onClick={() => setActiveTab('ajout')}
              style={{ 
                padding: '10px 20px', 
                background: activeTab === 'ajout' ? '#28a745' : '#6c757d', 
                color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer'
              }}
            >
              ➕ Nouveau Document
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
          <div style={{ color: '#666' }}>Documents Total</div>
        </div>
        <div style={{ background: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', color: '#007bff', fontWeight: 'bold' }}>{stats.contrats}</div>
          <div style={{ color: '#666' }}>Contrats</div>
        </div>
        <div style={{ background: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', color: '#28a745', fontWeight: 'bold' }}>{stats.procedures}</div>
          <div style={{ color: '#666' }}>Procédures</div>
        </div>
        <div style={{ background: 'white', padding: '20px', borderRadius: '1010px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', color: '#dc3545', fontWeight: 'bold' }}>{stats.confidentiels}</div>
          <div style={{ color: '#666' }}>Confidentiels</div>
        </div>
      </div>

      {/* Liste des documents */}
      {activeTab === 'liste' && (
        <div style={{ background: 'white', padding: '25px', borderRadius: '10px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
          <h3 style={{ color: '#1e3c72', marginBottom: '20px' }}>📚 Bibliothèque Documentaire</h3>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '1000px' }}>
              <thead>
                <tr style={{ background: '#f8f9fa' }}>
                  <th style={{ padding: '12px', border: '1px solid #dee2e6', textAlign: 'left' }}>Référence</th>
                  <th style={{ padding: '12px', border: '1px solid #dee2e6', textAlign: 'left' }}>Titre</th>
                  <th style={{ padding: '12px', border: '1px solid #dee2e6', textAlign: 'left' }}>Type</th>
                  <th style={{ padding: '12px', border: '1px solid #dee2e6', textAlign: 'left' }}>Auteur</th>
                  <th style={{ padding: '12px', border: '1px solid #dee2e6', textAlign: 'left' }}>Date</th>
                  <th style={{ padding: '12px', border: '1px solid #dee2e6', textAlign: 'left' }}>Confidentialité</th>
                  <th style={{ padding: '12px', border: '1px solid #dee2e6', textAlign: 'left' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {documents.map(doc => {
                  const docType = documentTypes.find(t => t.value === doc.type)
                  const confLevel = confidentialityLevels.find(c => c.value === doc.confidentialite)
                  
                  return (
                    <tr key={doc.id} style={{ borderBottom: '1px solid #dee2e6' }}>
                      <td style={{ padding: '12px', border: '1px solid #dee2e6' }}>
                        <strong style={{ color: '#1e3c72' }}>{doc.reference}</strong>
                      </td>
                      <td style={{ padding: '12px', border: '1px solid #dee2e6' }}>
                        <div style={{ fontWeight: '600' }}>{doc.titre}</div>
                        {doc.description && (
                          <div style={{ fontSize: '0.8rem', color: '#666', marginTop: '4px' }}>
                            {doc.description.length > 100 ? doc.description.substring(0, 100) + '...' : doc.description}
                          </div>
                        )}
                      </td>
                      <td style={{ padding: '12px', border: '1px solid #dee2e6' }}>
                        <span style={{
                          padding: '4px 8px',
                          borderRadius: '12px',
                          fontSize: '0.8rem',
                          fontWeight: '500',
                          background: docType?.color + '20',
                          color: docType?.color,
                          border: `1px solid ${docType?.color}`
                        }}>
                          {docType?.label}
                        </span>
                      </td>
                      <td style={{ padding: '12px', border: '1px solid #dee2e6' }}>{doc.auteur}</td>
                      <td style={{ padding: '12px', border: '1px solid #dee2e6' }}>
                        {new Date(doc.date_creation).toLocaleDateString('fr-FR')}
                      </td>
                      <td style={{ padding: '12px', border: '1px solid #dee2e6' }}>
                        <span style={{
                          padding: '4px 8px',
                          borderRadius: '12px',
                          fontSize: '0.8rem',
                          fontWeight: '500',
                          background: confLevel?.color + '20',
                          color: confLevel?.color,
                          border: `1px solid ${confLevel?.color}`
                        }}>
                          {confLevel?.label}
                        </span>
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
                        <button style={{ 
                          padding: '5px 10px', 
                          background: '#28a745', 
                          color: 'white', 
                          border: 'none', 
                          borderRadius: '3px', 
                          fontSize: '0.8rem',
                          cursor: 'pointer',
                          marginRight: '5px'
                        }}>
                          📥 Télécharger
                        </button>
                        {canAccess(user, 'admin') && (
                          <button style={{ 
                            padding: '5px 10px', 
                            background: '#dc3545', 
                            color: 'white', 
                            border: 'none', 
                            borderRadius: '3px', 
                            fontSize: '0.8rem',
                            cursor: 'pointer'
                          }}>
                            🗑️ Supprimer
                          </button>
                        )}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Ajout de document */}
      {activeTab === 'ajout' && canAccess(user, 'employee') && (
        <div style={{ background: 'white', padding: '25px', borderRadius: '10px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
          <h3 style={{ color: '#28a745', marginBottom: '20px' }}>📄 Nouveau Document</h3>
          <form onSubmit={handleAddDocument} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Type de Document *</label>
              <select
                value={newDocument.type}
                onChange={(e) => setNewDocument({...newDocument, type: e.target.value})}
                required
                style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }}
              >
                <option value="">Sélectionner un type</option>
                {documentTypes.map(type => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Référence *</label>
              <input
                value={newDocument.reference}
                onChange={(e) => setNewDocument({...newDocument, reference: e.target.value})}
                required
                placeholder="DOC-2024-001"
                style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }}
              />
            </div>
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Titre *</label>
              <input
                value={newDocument.titre}
                onChange={(e) => setNewDocument({...newDocument, titre: e.target.value})}
                required
                style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }}
              />
            </div>
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Description</label>
              <textarea
                value={newDocument.description}
                onChange={(e) => setNewDocument({...newDocument, description: e.target.value})}
                rows="3"
                style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '5px', resize: 'vertical' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Niveau de Confidentialité *</label>
              <select
                value={newDocument.confidentialite}
                onChange={(e) => setNewDocument({...newDocument, confidentialite: e.target.value})}
                required
                style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }}
              >
                {confidentialityLevels.map(level => (
                  <option key={level.value} value={level.value}>{level.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Tags</label>
              <input
                value={newDocument.tags}
                onChange={(e) => setNewDocument({...newDocument, tags: e.target.value})}
                placeholder="tag1, tag2, tag3"
                style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }}
              />
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
                📄 Créer le Document
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Statistiques détaillées */}
      {activeTab === 'statistiques' && (
        <div style={{ background: 'white', padding: '25px', borderRadius: '10px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
          <h3 style={{ color: '#ffc107', marginBottom: '20px' }}>📊 Statistiques Documentaires</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
            <div style={{ padding: '20px', background: '#f8f9fa', borderRadius: '8px' }}>
              <h4 style={{ color: '#1e3c72' }}>Répartition par Type</h4>
              <div style={{ marginTop: '15px' }}>
                {documentTypes.map(type => {
                  const count = documents.filter(d => d.type === type.value).length
                  return (
                    <div key={type.value} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span>{type.label}</span>
                      <span style={{ fontWeight: 'bold', color: type.color }}>{count}</span>
                    </div>
                  )
                })}
              </div>
            </div>
            
            <div style={{ padding: '20px', background: '#f8f9fa', borderRadius: '8px' }}>
              <h4 style={{ color: '#1e3c72' }}>Niveaux de Confidentialité</h4>
              <div style={{ marginTop: '15px' }}>
                {confidentialityLevels.map(level => {
                  const count = documents.filter(d => d.confidentialite === level.value).length
                  return (
                    <div key={level.value} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span>{level.label}</span>
                      <span style={{ fontWeight: 'bold', color: level.color }}>{count}</span>
                    </div>
                  )
                })}
              </div>
            </div>
            
            <div style={{ padding: '20px', background: '#f8f9fa', borderRadius: '8px' }}>
              <h4 style={{ color: '#1e3c72' }}>Activité Récente</h4>
              <div style={{ marginTop: '15px' }}>
                <div style={{ marginBottom: '8px' }}>
                  <div style={{ fontSize: '0.9rem', color: '#666' }}>Documents créés ce mois:</div>
                  <div style={{ fontWeight: 'bold', color: '#1e3c72' }}>
                    {documents.filter(d => {
                      const docDate = new Date(d.date_creation)
                      const now = new Date()
                      return docDate.getMonth() === now.getMonth() && docDate.getFullYear() === now.getFullYear()
                    }).length}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '0.9rem', color: '#666' }}>Auteurs actifs:</div>
                  <div style={{ fontWeight: 'bold', color: '#1e3c72' }}>
                    {new Set(documents.map(d => d.auteur)).size}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default GestionDocuments
