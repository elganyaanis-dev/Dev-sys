export const ROLES = {
  SUPER_ADMIN: 'super_admin',
  ADMIN: 'admin',
  RH_MANAGER: 'rh_manager',
  PROJECT_MANAGER: 'project_manager',
  TEAM_LEADER: 'team_leader',
  EMPLOYEE: 'employee',
  GUEST: 'guest'
}

export const PERMISSION_LEVELS = {
  [ROLES.SUPER_ADMIN]: 100,
  [ROLES.ADMIN]: 90,
  [ROLES.RH_MANAGER]: 80,
  [ROLES.PROJECT_MANAGER]: 70,
  [ROLES.TEAM_LEADER]: 60,
  [ROLES.EMPLOYEE]: 50,
  [ROLES.GUEST]: 10
}

export const DEPARTMENT_TYPES = {
  OPERATIONAL: 'operational',
  STRATEGIC: 'strategic',
  SUPPORT: 'support'
}

export const CONTRACT_TYPES = {
  CDI: 'cdi',
  CDD: 'cdd',
  STAGE: 'stage',
  CONSULTANT: 'consultant'
}

export const SALARY_COMPONENTS = {
  BASE: 'salaire_base',
  PRIME_ANCIENNETE: 'prime_anciennete',
  PRIME_RESPONSABILITE: 'prime_responsabilite',
  PRIME_PROJET: 'prime_projet',
  PRIME_RISQUE: 'prime_risque',
  HEURES_SUPP: 'heures_supplementaires'
}
