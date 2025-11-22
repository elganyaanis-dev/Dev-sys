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
            { nom: "Salima BENGANA", specialite: "Génie Civil" }
          ]
        }
      ]
    }
  ]
}

export const effectifs = {
  "Pôle Centre": 145,
  "Pôle Est": 120, 
  "Pôle Ouest": 110,
  "Pôle Sud": 85,
  "Grands Projets": 65,
  "Directions Centrales": 90,
  "Total": 615
}
