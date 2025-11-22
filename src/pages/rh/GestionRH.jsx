import React, { useState } from 'react'
import { useApp } from '../../context/AppContext'
import { ROLES, CONTRACT_TYPES } from '../../utils/constants/roles'

const GestionRH = () => {
  const { user, employees, addEmployee, canAccess, dispatch } = useApp()
  const [activeTab, setActiveTab] = useState('liste')
  const [newEmployee, setNewEmployee] = useState({
    nom: '', prenom: '', email: '', telephone: '', 
    date_naissance: '', date_embauche: '', type_contrat: 'CDI',
    poste: '', departement: '', salaire_base: '', banque: '', rib: ''
  })

  const handleAddEmployee = (e) => {
    e.preventDefault()
    
    const employee = {
      id: employees.length + 1,
      matricule: `EMP${String(employees.length + 1).padStart(3, '0')}`,
      ...newEmployee,
      salaire_base: parseInt(newEmployee.salaire_base),
      password: 'password123',
      role: ROLES.EMPLOYEE,
      permissions: ['basic'],
      actif: true
    }

    addEmployee(employee)
    setNewEmployee({
      nom: '', prenom: '', email: '', telephone: '', 
      date_naissance: '', date_embauche: '', type_contrat: 'CDI',
      poste: '', departement: '', salaire_base: '', banque: '', rib: ''
    })
  }

  const generatePayslip = (employee, mois) => {
    const salaireBase = employee.salaire_base || 0
    const primeAnciennete = salaireBase * 0.05 // 5% d'ancienneté
    const totalBrut = salaireBase + primeAnciennete
    const cnac = totalBrut * 0.05 // 5% CNAC
    const impot = totalBrut * 0.15 // 15% impot
    const totalNet = totalBrut - cnac - impot

    const payslip = {
      id: Date.now(),
      employeeId: employee.id,
      mois: mois,
      salaire_base: salaireBase,
      prime_anciennete: primeAnciennete,
      total_brut: totalBrut,
      cnac: cnac,
      impot: impot,
      total_net: totalNet,
      statut: 'généré',
      date_generation: new Date().toISOString()
    }

    dispatch({ type: 'ADD_PAYSLIP', payload: payslip })
    dispatch({
      type: 'ADD_HISTORIQUE',
      payload: {
        type: 'generation_paie',
        user: `${user.prenom} ${user.nom}`,
        details: `Fiche de paie générée pour ${employee.prenom} ${employee.nom} - ${mois}`
      }
    })

    alert(`Fiche de paie générée pour ${employee.prenom} ${employee.nom}`)
  }

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h2>👥 Gestion des Ressources Humaines</h2>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button 
            onClick={() => setActiveTab('liste')}
            style={{ 
              padding: '10px 20px', 
              background: activeTab === 'liste' ? '#1e3c72' : '#6c757d', 
              color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer'
            }}
          >
            📋 Liste du Personnel
          </button>
          {canAccess(user, 'rh_manager') && (
            <button 
              onClick={() => setActiveTab('ajout')}
              style={{ 
                padding: '10px 20px', 
                background: activeTab === 'ajout' ? '#28a745' : '#6c757d', 
                color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer'
              }}
            >
              ➕ Ajouter Employé
            </button>
          )}
          <button 
            onClick={() => setActiveTab('paie')}
            style={{ 
              padding: '10px 20px', 
              background: activeTab === 'paie' ? '#dc3545' : '#6c757d', 
              color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer'
            }}
          >
            💰 Gestion de Paie
          </button>
        </div>
      </div>

      {/* Liste du personnel */}
      {activeTab === 'liste' && (
        <div style={{ background: 'white', padding: '25px', borderRadius: '10px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
          <h3 style={{ color: '#1e3c72', marginBottom: '20px' }}>📊 Effectif Total: {employees.length} employés</h3>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '800px' }}>
              <thead>
                <tr style={{ background: '#f8f9fa' }}>
                  <th style={{ padding: '12px', border: '1px solid #dee2e6', textAlign: 'left' }}>Matricule</th>
                  <th style={{ padding: '12px', border: '1px solid #dee2e6', textAlign: 'left' }}>Nom & Prénom</th>
                  <th style={{ padding: '12px', border: '1px solid #dee2e6', textAlign: 'left' }}>Poste</th>
                  <th style={{ padding: '12px', border: '1px solid #dee2e6', textAlign: 'left' }}>Département</th>
                  <th style={{ padding: '12px', border: '1px solid #dee2e6', textAlign: 'left' }}>Contrat</th>
                  <th style={{ padding: '12px', border: '1px solid #dee2e6', textAlign: 'left' }}>Salaire</th>
                  <th style={{ padding: '12px', border: '1px solid #dee2e6', textAlign: 'left' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {employees.map(emp => (
                  <tr key={emp.id} style={{ borderBottom: '1px solid #dee2e6' }}>
                    <td style={{ padding: '12px', border: '1px solid #dee2e6' }}>
                      <strong>{emp.matricule}</strong>
                    </td>
                    <td style={{ padding: '12px', border: '1px solid #dee2e6' }}>
                      {emp.prenom} {emp.nom}
                      <div style={{ fontSize: '0.8rem', color: '#666' }}>{emp.email}</div>
                    </td>
                    <td style={{ padding: '12px', border: '1px solid #dee2e6' }}>{emp.poste}</td>
                    <td style={{ padding: '12px', border: '1px solid #dee2e6' }}>{emp.departement}</td>
                    <td style={{ padding: '12px', border: '1px solid #dee2e6' }}>{emp.type_contrat}</td>
                    <td style={{ padding: '12px', border: '1px solid #dee2e6' }}>
                      {emp.salaire_base?.toLocaleString()} DA
                    </td>
                    <td style={{ padding: '12px', border: '1px solid #dee2e6' }}>
                      <button 
                        onClick={() => generatePayslip(emp, '2024-01')}
                        style={{ 
                          padding: '5px 10px', 
                          background: '#28a745', 
                          color: 'white', 
                          border: 'none', 
                          borderRadius: '3px', 
                          fontSize: '0.8rem',
                          cursor: 'pointer',
                          marginRight: '5px'
                        }}
                      >
                        Paie
                      </button>
                      {canAccess(user, 'rh_manager') && (
                        <button style={{ 
                          padding: '5px 10px', 
                          background: '#007bff', 
                          color: 'white', 
                          border: 'none', 
                          borderRadius: '3px', 
                          fontSize: '0.8rem',
                          cursor: 'pointer'
                        }}>
                          Modifier
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

      {/* Ajout d'employé */}
      {activeTab === 'ajout' && canAccess(user, 'rh_manager') && (
        <div style={{ background: 'white', padding: '25px', borderRadius: '10px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
          <h3 style={{ color: '#28a745', marginBottom: '20px' }}>➕ Nouvel Employé</h3>
          <form onSubmit={handleAddEmployee} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '15px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Nom *</label>
              <input
                value={newEmployee.nom}
                onChange={(e) => setNewEmployee({...newEmployee, nom: e.target.value})}
                required
                style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Prénom *</label>
              <input
                value={newEmployee.prenom}
                onChange={(e) => setNewEmployee({...newEmployee, prenom: e.target.value})}
                required
                style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Email *</label>
              <input
                type="email"
                value={newEmployee.email}
                onChange={(e) => setNewEmployee({...newEmployee, email: e.target.value})}
                required
                style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Téléphone *</label>
              <input
                value={newEmployee.telephone}
                onChange={(e) => setNewEmployee({...newEmployee, telephone: e.target.value})}
                required
                placeholder="+213XXXXXXXXX"
                style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Date de Naissance *</label>
              <input
                type="date"
                value={newEmployee.date_naissance}
                onChange={(e) => setNewEmployee({...newEmployee, date_naissance: e.target.value})}
                required
                style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Date d'Embauche *</label>
              <input
                type="date"
                value={newEmployee.date_embauche}
                onChange={(e) => setNewEmployee({...newEmployee, date_embauche: e.target.value})}
                required
                style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Type de Contrat *</label>
              <select
                value={newEmployee.type_contrat}
                onChange={(e) => setNewEmployee({...newEmployee, type_contrat: e.target.value})}
                required
                style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }}
              >
                <option value="CDI">CDI</option>
                <option value="CDD">CDD</option>
                <option value="STAGE">Stage</option>
                <option value="CONSULTANT">Consultant</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Poste *</label>
              <input
                value={newEmployee.poste}
                onChange={(e) => setNewEmployee({...newEmployee, poste: e.target.value})}
                required
                style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Département *</label>
              <input
                value={newEmployee.departement}
                onChange={(e) => setNewEmployee({...newEmployee, departement: e.target.value})}
                required
                style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Salaire de Base *</label>
              <input
                type="number"
                value={newEmployee.salaire_base}
                onChange={(e) => setNewEmployee({...newEmployee, salaire_base: e.target.value})}
                required
                style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Banque *</label>
              <input
                value={newEmployee.banque}
                onChange={(e) => setNewEmployee({...newEmployee, banque: e.target.value})}
                required
                style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>RIB *</label>
              <input
                value={newEmployee.rib}
                onChange={(e) => setNewEmployee({...newEmployee, rib: e.target.value})}
                required
                placeholder="24 caractères"
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
                ✅ Ajouter l'Employé
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Gestion de paie */}
      {activeTab === 'paie' && (
        <div style={{ background: 'white', padding: '25px', borderRadius: '10px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
          <h3 style={{ color: '#dc3545', marginBottom: '20px' }}>💰 Gestion de la Paie</h3>
          <p>Module de gestion des fiches de paie en cours de développement...</p>
        </div>
      )}
    </div>
  )
}

export default GestionRH
