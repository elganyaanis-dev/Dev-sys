// Correction manuelle de l'erreur de syntaxe
const fs = require('fs');

let content = fs.readFileSync('src/pages/projects/GestionProjets.jsx', 'utf8');

// Remplacer l'erreur spécifique
content = content.replace(
  "project.statut === 'termine' : '#0c5460' : '#383d41'",
  "project.statut === 'termine' ? '#0c5460' : '#383d41'"
);

fs.writeFileSync('src/pages/projects/GestionProjets.jsx', content);
console.log('✅ Correction appliquée !');
