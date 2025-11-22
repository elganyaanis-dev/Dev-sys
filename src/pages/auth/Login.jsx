import React, { useState, useEffect } from 'react'
import { useApp } from '../../context/AppContext'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showTestAccounts, setShowTestAccounts] = useState(false)
  const [failedAttempts, setFailedAttempts] = useState(0)
  const { login, employees, dispatch } = useApp()

  useEffect(() => {
    // Réinitialiser après 5 minutes
    if (failedAttempts > 0) {
      const timer = setTimeout(() => setFailedAttempts(0), 300000)
      return () => clearTimeout(timer)
    }
  }, [failedAttempts])

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Vérification de sécurité
    if (failedAttempts >= 5) {
      alert('Trop de tentatives échouées. Veuillez patienter 5 minutes.')
      return
    }

    const user = employees.find(emp => 
      emp.email === email && emp.password === password && emp.actif !== false
    )
    
    if (user) {
      login(user)
      setFailedAttempts(0)
    } else {
      setFailedAttempts(prev => prev + 1)
      const remainingAttempts = 5 - (failedAttempts + 1)
      alert(`Identifiants incorrects! ${remainingAttempts > 0 ? `${remainingAttempts} tentatives restantes.` : 'Compte bloqué temporairement.'}`)
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
        maxWidth: '400px',
        position: 'relative'
      }}>
        {/* En-tête sécurisé */}
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '15px' }}>
            <div style={{
              width: '50px', height: '50px', background: '#1e3c72', color: 'white',
              borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 'bold', fontSize: '9px', textAlign: 'center'
            }}>
              GCF
            </div>
            <div style={{
              width: '50px', height: '50px', background: '#1e3c72', color: 'white',
              borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 'bold', fontSize: '8px', textAlign: 'center'
            }}>
              RAIL ELECTR
            </div>
          </div>
          <h2 style={{ color: '#1e3c72', margin: '0 0 5px 0' }}>
            ERP Sécurisé
          </h2>
          <p style={{ color: '#666', margin: 0, fontSize: '0.9rem' }}>
            EPE Rail-Electr SPA - Accès Restreint
          </p>
          {failedAttempts > 0 && (
            <div style={{
              background: '#fff3cd',
              border: '1px solid #ffeaa7',
              color: '#856404',
              padding: '8px',
              borderRadius: '5px',
              marginTop: '10px',
              fontSize: '0.8rem'
            }}>
              ⚠️ {5 - failedAttempts} tentative(s) restante(s)
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500', color: '#333' }}>
              Email professionnel
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={failedAttempts >= 5}
              style={{
                width: '100%',
                padding: '12px',
                border: `2px solid ${failedAttempts >= 5 ? '#dc3545' : '#ddd'}`,
                borderRadius: '8px',
                fontSize: '16px',
                backgroundColor: failedAttempts >= 5 ? '#f8f9fa' : 'white'
              }}
              placeholder="votre.email@railelectr.dz"
            />
          </div>

          <div style={{ marginBottom: '25px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500', color: '#333' }}>
              Mot de passe
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={failedAttempts >= 5}
              style={{
                width: '100%',
                padding: '12px',
                border: `2px solid ${failedAttempts >= 5 ? '#dc3545' : '#ddd'}`,
                borderRadius: '8px',
                fontSize: '16px',
                backgroundColor: failedAttempts >= 5 ? '#f8f9fa' : 'white'
              }}
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={failedAttempts >= 5}
            style={{
              width: '100%',
              padding: '12px',
              background: failedAttempts >= 5 ? '#6c757d' : '#1e3c72',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: failedAttempts >= 5 ? 'not-allowed' : 'pointer'
            }}
          >
            {failedAttempts >= 5 ? '⏳ Accès temporairement bloqué' : '🔐 Se connecter'}
          </button>
        </form>

        {/* Section comptes de test sécurisée */}
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <button
            onClick={() => setShowTestAccounts(!showTestAccounts)}
            style={{
              background: 'none',
              border: 'none',
              color: '#1e3c72',
              cursor: 'pointer',
              fontSize: '0.8rem',
              textDecoration: 'underline'
            }}
          >
            {showTestAccounts ? 'Masquer les accès' : 'Accès autorisés'}
          </button>
          
          {showTestAccounts && (
            <div style={{
              marginTop: '15px',
              padding: '15px',
              background: '#f8f9fa',
              borderRadius: '8px',
              fontSize: '0.75rem',
              textAlign: 'left',
              border: '1px solid #dee2e6'
            }}>
              <strong style={{ color: '#1e3c72' }}>Accès de test (Environnement de développement)</strong>
              <div style={{ marginTop: '8px', lineHeight: '1.4' }}>
                <div>• <strong>Administrateur:</strong> dg@railelectr.dz</div>
                <div>• <strong>RH:</strong> rh@railelectr.dz</div>
                <div>• <strong>Chef de Pôle:</strong> pole.est@railelectr.dz</div>
                <div style={{ marginTop: '5px', fontStyle: 'italic', color: '#666' }}>
                  Mot de passe: consulter l'administrateur système
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Pied de page sécurisé */}
        <div style={{
          marginTop: '25px',
          paddingTop: '15px',
          borderTop: '1px solid #eee',
          textAlign: 'center',
          fontSize: '0.7rem',
          color: '#666'
        }}>
          <div>© 2024 EPE Rail-Electr SPA - Système Sécurisé</div>
          <div style={{ marginTop: '5px' }}>
            🔒 Accès restreint aux personnels autorisés
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
