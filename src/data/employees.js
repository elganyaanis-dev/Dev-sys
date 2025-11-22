export const employees = [
  {
    id: 1,
    matricule: "DG001",
    nom: "BENCHERIF",
    prenom: "Mohamed",
    email: "dg@railelectr.dz",
    password: "admin123",
    poste: "Directeur Général",
    direction: "Direction Générale",
    pole: "Tous",
    telephone: "+213 123 456 789",
    dateEmbauche: "2020-01-15",
    salaire: 450000,
    role: "directeur_general",
    permissions: ["all"]
  },
  {
    id: 2,
    matricule: "RH001",
    nom: "KEBIR",
    prenom: "Fatima",
    email: "rh@railelectr.dz",
    password: "rh123",
    poste: "Responsable RH",
    direction: "Ressources Humaines",
    pole: "Siège",
    telephone: "+213 123 456 788",
    dateEmbauche: "2021-03-20",
    salaire: 280000,
    role: "responsable_rh",
    permissions: ["rh", "documents", "communication"]
  },
  {
    id: 3,
    matricule: "EST001",
    nom: "BOUMEDIENE",
    prenom: "Karim",
    email: "pole.est@railelectr.dz",
    password: "est123",
    poste: "Chef de Pôle Est",
    direction: "Opérations",
    pole: "Est",
    telephone: "+213 123 456 787",
    dateEmbauche: "2019-06-10",
    salaire: 320000,
    role: "chef_pole",
    permissions: ["projets", "equipe", "rapports"]
  }
]

export const fichesPaie = [
  {
    id: 1,
    employeeId: 1,
    mois: "2024-01",
    salaireBase: 450000,
    primeAnciennete: 75000,
    primeResponsabilite: 50000,
    totalBrut: 575000,
    cnac: 28750,
    impot: 86250,
    totalNet: 460000,
    statut: "payé"
  },
  {
    id: 2,
    employeeId: 2,
    mois: "2024-01",
    salaireBase: 280000,
    primeAnciennete: 28000,
    totalBrut: 308000,
    cnac: 15400,
    impot: 46200,
    totalNet: 246400,
    statut: "payé"
  }
]
