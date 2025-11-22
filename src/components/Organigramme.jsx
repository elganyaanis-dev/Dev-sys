import React, { useState } from 'react'
import { organigramme, effectifs } from '../data/organigramme'

const Organigramme = () => {
  const [poleSelectionne, setPoleSelectionne] = useState(null)

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      {/* En-tête */}
      <div style={{ 
        background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
        color: 'white',
        padding: '30px',
        borderRadius: '15px',
        marginBottom: '30px',
        textAlign: 'center'
      }}>
        <h1 style={{ margin: 0, fontSize: '2.5rem' }}>Organigramme</h1>
        <p style={{ margin: '10px 0 0 0', fontSize: '1.2rem', opacity: 0.9 }}>
          EPE Rail-Electr SPA - Structure Organisationnelle
        </p>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: '20px', 
          marginTop: '20px',
          flexWrap: 'wrap'
        }}>
          <div style={{ background: 'rgba(255,255,255,0.2)', padding: '10px 20px', borderRadius: '20px' }}>
            <strong>Effectif total:</strong> {effectifs.Total} employés
          </div>
          <div style={{ background: 'rgba(255,255,255,0.2)', padding: '10px 20px', borderRadius: '20px' }}>
            <strong>Directeur Général:</strong> {organigramme.entreprise.directeurGeneral}
          </div>
        </div>
      </div>

      {/* Directions Stratégiques */}
      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ color: '#1e3c72', borderBottom: '2px solid #1e3c72', paddingBottom: '10px' }}>
          🏛️ Directions Stratégiques
        </h2>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '20px',
          marginTop: '20px'
        }}>
          {organigramme.directionsStrategiques.map((direction) => (
            <div key={direction.id} style={{
              background: 'white',
              padding: '20px',
              borderRadius: '10px',
              boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
              borderLeft: '4px solid #1e3c72'
            }}>
              <h3 style={{ color: '#1e3c72', margin: '0 0 10px 0' }}>
                {direction.nom}
              </h3>
              <p style={{ margin: '0 0 15px 0', color: '#666' }}>
                <strong>Responsable:</strong> {direction.responsable}
              </p>
              <div>
                <strong>Services:</strong>
                <ul style={{ margin: '10px 0 0 0', paddingLeft: '20px' }}>
                  {direction.services.map((service) => (
                    <li key={service.id} style={{ marginBottom: '5px' }}>
                      {service.nom} - <em>{service.responsable}</em>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pôles Opérationnels */}
      <section>
        <h2 style={{ color: '#1e3c72', borderBottom: '2px solid #1e3c72', paddingBottom: '10px' }}>
          🏗️ Pôles Opérationnels
        </h2>
        
        {/* Sélecteur de pôle */}
        <div style={{ 
          display: 'flex', 
          gap: '10px', 
          margin: '20px 0',
          flexWrap: 'wrap'
        }}>
          {organigramme.polesOperationnels.map((pole) => (
            <button
              key={pole.id}
              onClick={() => setPoleSelectionne(poleSelectionne?.id === pole.id ? null : pole)}
              style={{
                padding: '10px 20px',
                background: poleSelectionne?.id === pole.id ? '#1e3c72' : 'white',
                color: poleSelectionne?.id === pole.id ? 'white' : '#1e3c72',
                border: '2px solid #1e3c72',
                borderRadius: '25px',
                cursor: 'pointer',
                fontWeight: '600',
                transition: 'all 0.3s'
              }}
            >
              {pole.nom} ({effectifs[pole.nom]})
            </button>
          ))}
        </div>

        {/* Détails du pôle sélectionné */}
        {poleSelectionne && (
          <div style={{
            background: 'white',
            padding: '30px',
            borderRadius: '15px',
            boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
            marginTop: '20px',
            border: '2px solid #1e3c72'
          }}>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'flex-start',
              marginBottom: '30px',
              flexWrap: 'wrap',
              gap: '20px'
            }}>
              <div>
                <h3 style={{ color: '#1e3c72', margin: '0 0 10px 0', fontSize: '1.8rem' }}>
                  {poleSelectionne.nom}
                </h3>
                <p style={{ margin: '0 0 5px 0', fontSize: '1.1rem' }}>
                  <strong>Directeur:</strong> {poleSelectionne.directeur}
                </p>
                <p style={{ margin: 0, color: '#666' }}>
                  <strong>Zone:</strong> {poleSelectionne.zone}
                </p>
                {poleSelectionne.mission && (
                  <p style={{ margin: '10px 0 0 0', fontStyle: 'italic' }}>
                    {poleSelectionne.mission}
                  </p>
                )}
              </div>
              <div style={{
                background: '#f8f9fa',
                padding: '15px 25px',
                borderRadius: '10px',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1e3c72' }}>
                  {effectifs[poleSelectionne.nom]}
                </div>
                <div style={{ color: '#666' }}>Employés</div>
              </div>
            </div>

            {/* Services du pôle */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
              gap: '20px' 
            }}>
              {poleSelectionne.services.map((service) => (
                <div key={service.id} style={{
                  background: '#f8f9fa',
                  padding: '20px',
                  borderRadius: '10px',
                  border: '1px solid #ddd'
                }}>
                  <h4 style={{ color: '#1e3c72', margin: '0 0 15px 0' }}>
                    {service.nom}
                  </h4>
                  <p style={{ margin: '0 0 15px 0' }}>
                    <strong>Responsable:</strong> {service.responsable}
                  </p>
                  
                  {service.chefsProjet && (
                    <div style={{ marginBottom: '15px' }}>
                      <strong>Chefs de Projet:</strong>
                      <ul style={{ margin: '5px 0 0 0', paddingLeft: '20px' }}>
                        {service.chefsProjet.map((chef, index) => (
                          <li key={index}>
                            {chef.nom} - {chef.specialite}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {service.equipes && (
                    <div style={{ marginBottom: '15px' }}>
                      <strong>Équipes:</strong>
                      <ul style={{ margin: '5px 0 0 0', paddingLeft: '20px' }}>
                        {service.equipes.map((equipe, index) => (
                          <li key={index}>
                            {equipe.nom} - <em>Chef: {equipe.chef}</em>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {service.techniciens && (
                    <p style={{ margin: 0 }}>
                      <strong>Techniciens:</strong> {service.techniciens}
                    </p>
                  )}

                  {service.projets && (
                    <div>
                      <strong>Projets majeurs:</strong>
                      <ul style={{ margin: '5px 0 0 0', paddingLeft: '20px' }}>
                        {service.projets.map((projet, index) => (
                          <li key={index}>{projet}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {service.domaines && (
                    <div>
                      <strong>Domaines de recherche:</strong>
                      <ul style={{ margin: '5px 0 0 0', paddingLeft: '20px' }}>
                        {service.domaines.map((domaine, index) => (
                          <li key={index}>{domaine}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Vue d'ensemble si aucun pôle sélectionné */}
        {!poleSelectionne && (
          <div style={{
            background: 'white',
            padding: '30px',
            borderRadius: '15px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
            marginTop: '20px',
            textAlign: 'center'
          }}>
            <p style={{ fontSize: '1.2rem', color: '#666', margin: 0 }}>
              👆 Sélectionnez un pôle opérationnel pour voir sa structure détaillée
            </p>
          </div>
        )}
      </section>
    </div>
  )
}

export default Organigramme
