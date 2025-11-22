export const organigramme = {
  entreprise: {
    nom: "EPE Rail-Electr SPA",
    filiale: "Groupe de Construction Ferroviaire (GCF)",
    directeurGeneral: "Mohamed BENCHERIF"
  },
  
  directionsStrategiques: [
    {
      id: "dg",
      nom: "Direction Générale",
      responsable: "Mohamed BENCHERIF",
      services: [
        { id: "secr", nom: "Secrétariat Général", responsable: "Leila MEZIANI" },
        { id: "com", nom: "Communication Interne", responsable: "Yasmine BOUDJEMAA" },
        { id: "audit", nom: "Audit Interne", responsable: "Omar TOUATI" }
      ]
    },
    {
      id: "dir-com",
      nom: "Direction Commerciale",
      responsable: "Karim ZERROUKI",
      services: [
        { id: "etude", nom: "Études de Marché", responsable: "Nadia CHERIF" },
        { id: "prop", nom: "Propositions Commerciales", responsable: "Samir BENALI" },
        { id: "cli", nom: "Relations Clients", responsable: "Soraya MEKKI" }
      ]
    },
    {
      id: "dir-mar",
      nom: "Direction des Marchés",
      responsable: "Ahmed BOUMEHDI",
      services: [
        { id: "appel", nom: "Appels d'Offres", responsable: "Farid KACIMI" },
        { id: "contrat", nom: "Gestion des Contrats", responsable: "Salima HAMIDOUCHE" },
        { id: "juridique", nom: "Affaires Juridiques", responsable: "Mehdi SAIDOUN" }
      ]
    },
    {
      id: "dir-rh",
      nom: "Direction des Ressources Humaines",
      responsable: "Fatima KEBIR",
      services: [
        { id: "recrut", nom: "Recrutement", responsable: "Amine BOUGUERRA" },
        { id: "paie", nom: "Paie et Administration", responsable: "Khadidja BELKACEM" },
        { id: "formation", nom: "Formation et Développement", responsable: "Rachid GUENDOUZ" },
        { id: "social", nom: "Affaires Sociales", responsable: "Nora ZERGUINE" }
      ]
    },
    {
      id: "dir-sec",
      nom: "Direction Sécurité et Environnement",
      responsable: "Bilal MANSOURI",
      services: [
        { id: "hse", nom: "Hygiène Sécurité Environnement", responsable: "Younes CHAABANE" },
        { id: "prevention", nom: "Prévention des Risques", responsable: "Samira BOUKHEROUBA" },
        { id: "env", nom: "Environnement et Développement Durable", responsable: "Leila TERKI" }
      ]
    }
  ],

  polesOperationnels: [
    {
      id: "pole-centre",
      nom: "Pôle Centre",
      directeur: "Ali HAMMADI",
      zone: "Alger, Blida, Tipaza, Boumerdes",
      services: [
        {
          id: "etude-centre",
          nom: "Service Études Techniques",
          responsable: "Nadir BOUKADOUM",
          chefsProjet: [
            { nom: "Reda MEZIANE", specialite: "Électrification" },
            { nom: "Salima BENGANA", specialite: "Génie Civil" },
            { nom: "Kamel FODIL", specialite: "Systèmes" }
          ]
        },
        {
          id: "real-centre",
          nom: "Service Réalisation",
          responsable: "Mounir SADI",
          equipes: [
            { nom: "Équipe Électrification - Lot 1", chef: "Hakim TALEB" },
            { nom: "Équipe Génie Civil - Lot 2", chef: "Nassima RAHMOUN" },
            { nom: "Équipe Systèmes - Lot 3", chef: "Bilal GUERROUJ" }
          ]
        },
        {
          id: "maintenance-centre",
          nom: "Service Maintenance",
          responsable: "Karima BOUSMAHA",
          techniciens: 15
        }
      ]
    },
    {
      id: "pole-est",
      nom: "Pôle Est",
      directeur: "Karim BOUMEDIENE", 
      zone: "Constantine, Annaba, Skikda, Guelma",
      services: [
        {
          id: "etude-est",
          nom: "Service Études Techniques",
          responsable: "Farès CHERIET",
          chefsProjet: [
            { nom: "Amir ZERGUINE", specialite: "Électrification" },
            { nom: "Nawel BENCHAA", specialite: "Génie Civil" },
            { nom: "Mourad HARKAT", specialite: "Systèmes" }
          ]
        },
        {
          id: "real-est",
          nom: "Service Réalisation", 
          responsable: "Bachir MEHADJI",
          equipes: [
            { nom: "Équipe Annaba", chef: "Sofiane KHERBOUCHE" },
            { nom: "Équipe Constantine", chef: "Yamina BOUCHAREB" },
            { nom: "Équipe Skikda", chef: "Tarek MOKHTARI" }
          ]
        },
        {
          id: "maintenance-est",
          nom: "Service Maintenance",
          responsable: "Samir GUETTOU",
          techniciens: 12
        }
      ]
    },
    {
      id: "pole-ouest",
      nom: "Pôle Ouest",
      directeur: "Mustapha BENZINE",
      zone: "Oran, Tlemcen, Sidi Bel Abbès, Mostaganem",
      services: [
        {
          id: "etude-ouest",
          nom: "Service Études Techniques",
          responsable: "Khalil BENTALHA",
          chefsProjet: [
            { nom: "Nassima FERHAT", specialite: "Électrification" },
            { nom: "Omar BENGUERFI", specialite: "Génie Civil" },
            { nom: "Salima HADDAD", specialite: "Systèmes" }
          ]
        },
        {
          id: "real-ouest",
          nom: "Service Réalisation",
          responsable: "Rachid BOUDIAF",
          equipes: [
            { nom: "Équipe Oran", chef: "Farid KHERBOUCHE" },
            { nom: "Équipe Tlemcen", chef: "Nadia BENALI" },
            { nom: "Équipe Sidi Bel Abbès", chef: "Kamal MEZOUAR" }
          ]
        },
        {
          id: "maintenance-ouest", 
          nom: "Service Maintenance",
          responsable: "Hakim TERKI",
          techniciens: 10
        }
      ]
    },
    {
      id: "pole-sud",
      nom: "Pôle Sud",
      directeur: "Hamid CHAOUCH",
      zone: "Ouargla, Ghardaïa, Laghouat, Béchar",
      services: [
        {
          id: "etude-sud",
          nom: "Service Études Techniques", 
          responsable: "Mounir SEDDIKI",
          chefsProjet: [
            { nom: "Khadija BENSAID", specialite: "Électrification" },
            { nom: "Ali BOUKHEROUBA", specialite: "Génie Civil" },
            { nom: "Nora GUENDOUZ", specialite: "Systèmes" }
          ]
        },
        {
          id: "real-sud",
          nom: "Service Réalisation",
          responsable: "Bilal FERHAT",
          equipes: [
            { nom: "Équipe Ouargla", chef: "Samir HAMMADI" },
            { nom: "Équipe Ghardaïa", chef: "Yasmina KACEM" },
            { nom: "Équipe Béchar", chef: "Reda BENSALEM" }
          ]
        },
        {
          id: "maintenance-sud",
          nom: "Service Maintenance",
          responsable: "Nadir ZEROUAL",
          techniciens: 8
        }
      ]
    },
    {
      id: "gd",
      nom: "Grands Projets et Développement",
      directeur: "Rachid MEZIANI",
      mission: "Gestion des projets nationaux et internationaux",
      services: [
        {
          id: "proj-nat",
          nom: "Projets Nationaux",
          responsable: "Nadia BOUCHAREB",
          projets: [
            "LGV Alger-Oran",
            "Électrification ligne Est-Ouest", 
            "Modernisation gares principales"
          ]
        },
        {
          id: "proj-int",
          nom: "Projets Internationaux",
          responsable: "Mehdi SAHLI",
          projets: [
            "Projet Trans-Maghrebin",
            "Coopération Afrique Sub-Saharienne"
          ]
        },
        {
          id: "innovation",
          nom: "Innovation et R&D",
          responsable: "Samira BENGUERFI", 
          domaines: [
            "Énergies renouvelables ferroviaires",
            "Digitalisation des infrastructures",
            "Développement durable"
          ]
        }
      ]
    }
  ]
}

// Effectif total par pôle
export const effectifs = {
  "Pôle Centre": 145,
  "Pôle Est": 120, 
  "Pôle Ouest": 110,
  "Pôle Sud": 85,
  "Grands Projets": 65,
  "Directions Centrales": 90,
  "Total": 615
}
