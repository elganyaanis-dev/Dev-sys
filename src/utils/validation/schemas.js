export const employeeSchema = {
  matricule: { required: true, pattern: /^[A-Z0-9]{6}$/ },
  nom: { required: true, minLength: 2, maxLength: 50 },
  prenom: { required: true, minLength: 2, maxLength: 50 },
  email: { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
  telephone: { required: true, pattern: /^\+213[5-7][0-9]{8}$/ },
  date_naissance: { required: true },
  date_embauche: { required: true },
  type_contrat: { required: true },
  poste: { required: true },
  departement: { required: true },
  salaire_base: { required: true, min: 0 },
  banque: { required: true },
  rib: { required: true, pattern: /^[0-9]{24}$/ }
}

export const projectSchema = {
  code: { required: true, pattern: /^PROJ-[A-Z0-9]{6}$/ },
  nom: { required: true, minLength: 5, maxLength: 100 },
  client: { required: true },
  budget: { required: true, min: 0 },
  date_debut: { required: true },
  date_fin_prevue: { required: true },
  chef_projet: { required: true },
  pole: { required: true },
  statut: { required: true }
}

export const documentSchema = {
  type: { required: true },
  reference: { required: true },
  titre: { required: true },
  auteur: { required: true },
  date_creation: { required: true },
  confidentialite: { required: true }
}
