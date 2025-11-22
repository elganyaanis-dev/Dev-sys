import React, { createContext, useContext, useReducer, useEffect } from 'react'
import { storageService } from '../services/database/storage'
import { ROLES, PERMISSION_LEVELS } from '../utils/constants/roles'

const AppContext = createContext()

// État initial
const initialState = {
  user: null,
  employees: [],
  projects: [],
  documents: [],
  payslips: [],
  organigramme: null,
  historique: [],
  loading: false,
  notifications: []
}

// Reducer pour gestion d'état complexe
function appReducer(state, action) {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload }
    
    case 'SET_USER':
      return { ...state, user: action.payload }
    
    case 'SET_EMPLOYEES':
      storageService.saveEmployees(action.payload)
      return { ...state, employees: action.payload }
    
    case 'ADD_EMPLOYEE':
      const newEmployees = [...state.employees, action.payload]
      storageService.saveEmployees(newEmployees)
      return { ...state, employees: newEmployees }
    
    case 'UPDATE_EMPLOYEE':
      const updatedEmployees = state.employees.map(emp =>
        emp.id === action.payload.id ? action.payload : emp
      )
      storageService.saveEmployees(updatedEmployees)
      return { ...state, employees: updatedEmployees }
    
    case 'SET_PROJECTS':
      storageService.saveProjects(action.payload)
      return { ...state, projects: action.payload }
    
    case 'ADD_PROJECT':
      const newProjects = [...state.projects, action.payload]
      storageService.saveProjects(newProjects)
      return { ...state, projects: newProjects }
    
    case 'SET_DOCUMENTS':
      storageService.saveDocuments(action.payload)
      return { ...state, documents: action.payload }
    
    case 'ADD_DOCUMENT':
      const newDocuments = [...state.documents, action.payload]
      storageService.saveDocuments(newDocuments)
      return { ...state, documents: newDocuments }
    
    case 'SET_PAYSLIPS':
      storageService.savePayslips(action.payload)
      return { ...state, payslips: action.payload }
    
    case 'ADD_PAYSLIP':
      const newPayslips = [...state.payslips, action.payload]
      storageService.savePayslips(newPayslips)
      return { ...state, payslips: newPayslips }
    
    case 'ADD_HISTORIQUE':
      const newHistorique = [...state.historique, {
        ...action.payload,
        timestamp: new Date().toISOString()
      }]
      storageService.saveHistorique(newHistorique)
      return { ...state, historique: newHistorique }
    
    case 'ADD_NOTIFICATION':
      return {
        ...state,
        notifications: [...state.notifications, action.payload]
      }
    
    case 'CLEAR_NOTIFICATION':
      return {
        ...state,
        notifications: state.notifications.filter(n => n.id !== action.payload)
      }
    
    default:
      return state
  }
}

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState)

  // Charger les données au démarrage
  useEffect(() => {
    const loadInitialData = async () => {
      dispatch({ type: 'SET_LOADING', payload: true })
      
      // Charger depuis le stockage local
      const employees = storageService.getEmployees()
      const projects = storageService.getProjects()
      const documents = storageService.getDocuments()
      const payslips = storageService.getPayslips()
      const historique = storageService.getHistorique()

      // Données initiales si vide
      if (employees.length === 0) {
        const initialEmployees = [
          {
            id: 1,
            matricule: 'DG001',
            nom: 'BENCHERIF',
            prenom: 'Mohamed',
            email: 'dg@railelectr.dz',
            password: 'admin123',
            telephone: '+213551234567',
            date_naissance: '1975-03-15',
            date_embauche: '2020-01-15',
            type_contrat: 'CDI',
            poste: 'Directeur Général',
            departement: 'Direction Générale',
            salaire_base: 450000,
            banque: 'BADR',
            rib: '001234567890123456789012',
            role: ROLES.SUPER_ADMIN,
            permissions: ['all'],
            actif: true
          }
        ]
        storageService.saveEmployees(initialEmployees)
        dispatch({ type: 'SET_EMPLOYEES', payload: initialEmployees })
      } else {
        dispatch({ type: 'SET_EMPLOYEES', payload: employees })
      }

      dispatch({ type: 'SET_PROJECTS', payload: projects })
      dispatch({ type: 'SET_DOCUMENTS', payload: documents })
      dispatch({ type: 'SET_PAYSLIPS', payload: payslips })
      dispatch({ type: 'SET_HISTORIQUE', payload: historique })
      
      dispatch({ type: 'SET_LOADING', payload: false })
    }

    loadInitialData()
  }, [])

  // Vérifier les permissions
  const hasPermission = (user, requiredPermission) => {
    if (!user) return false
    if (user.permissions?.includes('all')) return true
    return user.permissions?.includes(requiredPermission)
  }

  const canAccess = (user, minRole) => {
    if (!user) return false
    const userLevel = PERMISSION_LEVELS[user.role] || 0
    const requiredLevel = PERMISSION_LEVELS[minRole] || 0
    return userLevel >= requiredLevel
  }

  const value = {
    ...state,
    dispatch,
    hasPermission,
    canAccess,
    
    // Actions
    login: (userData) => {
      dispatch({ type: 'SET_USER', payload: userData })
      dispatch({
        type: 'ADD_HISTORIQUE',
        payload: {
          type: 'connexion',
          user: `${userData.prenom} ${userData.nom}`,
          details: 'Connexion au système ERP'
        }
      })
    },

    logout: () => {
      if (state.user) {
        dispatch({
          type: 'ADD_HISTORIQUE',
          payload: {
            type: 'deconnexion',
            user: `${state.user.prenom} ${state.user.nom}`,
            details: 'Déconnexion du système ERP'
          }
        })
      }
      dispatch({ type: 'SET_USER', payload: null })
    },

    addEmployee: (employee) => {
      dispatch({ type: 'ADD_EMPLOYEE', payload: employee })
      dispatch({
        type: 'ADD_HISTORIQUE',
        payload: {
          type: 'ajout_employe',
          user: `${state.user.prenom} ${state.user.nom}`,
          details: `Nouvel employé: ${employee.prenom} ${employee.nom}`
        }
      })
    },

    addProject: (project) => {
      dispatch({ type: 'ADD_PROJECT', payload: project })
      dispatch({
        type: 'ADD_HISTORIQUE',
        payload: {
          type: 'ajout_projet',
          user: `${state.user.prenom} ${state.user.nom}`,
          details: `Nouveau projet: ${project.nom}`
        }
      })
    }
  }

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within an AppProvider')
  }
  return context
}
