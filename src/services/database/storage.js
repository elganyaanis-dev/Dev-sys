const STORAGE_KEYS = {
  EMPLOYEES: 'erp_employees_encrypted',
  PROJECTS: 'erp_projects_encrypted',
  DOCUMENTS: 'erp_documents_encrypted',
  PAYSLIPS: 'erp_payslips_encrypted',
  ORGANIGRAMME: 'erp_organigramme_encrypted',
  HISTORIQUE: 'erp_historique_encrypted',
  CONFIG: 'erp_config'
}

// Chiffrement simple (dans un vrai projet utiliser crypto-js)
const encrypt = (data) => btoa(JSON.stringify(data))
const decrypt = (encrypted) => JSON.parse(atob(encrypted))

export const storageService = {
  // Employés
  getEmployees: () => {
    try {
      const encrypted = localStorage.getItem(STORAGE_KEYS.EMPLOYEES)
      return encrypted ? decrypt(encrypted) : []
    } catch (error) {
      console.error('Erreur déchiffrement employés:', error)
      return []
    }
  },

  saveEmployees: (employees) => {
    localStorage.setItem(STORAGE_KEYS.EMPLOYEES, encrypt(employees))
  },

  // Projets
  getProjects: () => {
    try {
      const encrypted = localStorage.getItem(STORAGE_KEYS.PROJECTS)
      return encrypted ? decrypt(encrypted) : []
    } catch (error) {
      return []
    }
  },

  saveProjects: (projects) => {
    localStorage.setItem(STORAGE_KEYS.PROJECTS, encrypt(projects))
  },

  // Documents
  getDocuments: () => {
    try {
      const encrypted = localStorage.getItem(STORAGE_KEYS.DOCUMENTS)
      return encrypted ? decrypt(encrypted) : []
    } catch (error) {
      return []
    }
  },

  saveDocuments: (documents) => {
    localStorage.setItem(STORAGE_KEYS.DOCUMENTS, encrypt(documents))
  },

  // Fiches de paie
  getPayslips: () => {
    try {
      const encrypted = localStorage.getItem(STORAGE_KEYS.PAYSLIPS)
      return encrypted ? decrypt(encrypted) : []
    } catch (error) {
      return []
    }
  },

  savePayslips: (payslips) => {
    localStorage.setItem(STORAGE_KEYS.PAYSLIPS, encrypt(payslips))
  },

  // Historique
  getHistorique: () => {
    try {
      const encrypted = localStorage.getItem(STORAGE_KEYS.HISTORIQUE)
      return encrypted ? decrypt(encrypted) : []
    } catch (error) {
      return []
    }
  },

  saveHistorique: (historique) => {
    localStorage.setItem(STORAGE_KEYS.HISTORIQUE, encrypt(historique))
  },

  // Nettoyage
  clearAll: () => {
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key)
    })
  }
}
