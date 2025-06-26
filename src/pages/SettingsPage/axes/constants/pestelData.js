// src/pages/SettingsPage/axes/constants/pestelData.js

// Données PESTEL avec les thèmes associés
const PESTEL_DATA = {
  politique: {
    name: "Politique",
    description: "Décisions gouvernementales, cadres réglementaires, et stabilité politique",
    color: "red",
    icon: "🏛️",
    themes: [
      "Politique intérieure et partis politiques",
      "Relations internationales et diplomatie",
      "Lois, règlements et politiques publiques",
      "Fiscalité et impôts",
      "Subventions, aides publiques",
      "Conflits géopolitiques",
      "Politique de défense et sécurité",
      "Gouvernance et transparence",
      "Politiques environnementales",
      "Politiques commerciales / protectionnisme"
    ]
  },
  economique: {
    name: "Économique",
    description: "Conjoncture économique, marchés, et conditions financières",
    color: "yellow",
    icon: "💶",
    themes: [
      "Croissance / récession économique",
      "Taux d'intérêt / inflation",
      "Marchés financiers",
      "Marché du travail et emploi",
      "Échanges internationaux / commerce",
      "Investissements publics / privés",
      "Coût des matières premières",
      "Taux de change / stabilité monétaire",
      "Pouvoir d'achat / consommation",
      "Endettement public / privé"
    ]
  },
  socioculturel: {
    name: "Socioculturel",
    description: "Comportements, valeurs et tendances sociales",
    color: "purple",
    icon: "👥",
    themes: [
      "Démographie / vieillissement",
      "Éducation et formation",
      "Modes de vie et consommation",
      "Évolution des valeurs sociétales",
      "Inclusion, diversité et égalité",
      "Attentes des citoyens / consommateurs",
      "Santé publique et bien-être",
      "Mobilité sociale",
      "Urbanisation",
      "Religions et cultures"
    ]
  },
  technologique: {
    name: "Technologique",
    description: "Innovation, ruptures technologiques, et transformation numérique",
    color: "blue",
    icon: "🧪",
    themes: [
      "Intelligence artificielle / automatisation",
      "Cybersécurité",
      "Innovation et R&D",
      "Technologies émergentes (5G, blockchain, etc.)",
      "Transformation numérique",
      "Propriété intellectuelle / brevets",
      "Fintech et technologies financières",
      "Technologies médicales / biotech",
      "Internet des objets (IoT)",
      "Data, cloud et infrastructures IT"
    ]
  },
  ecologique: {
    name: "Environnemental",
    description: "Durabilité, climat et gestion des ressources naturelles",
    color: "green",
    icon: "🌿",
    themes: [
      "Changement climatique",
      "Énergies renouvelables",
      "Pollution (air, eau, sol)",
      "Gestion des déchets",
      "Biodiversité et écosystèmes",
      "Responsabilité environnementale des entreprises (RSE/ESG)",
      "Économie circulaire",
      "Risques naturels et catastrophes",
      "Accès à l'eau / ressources naturelles",
      "Législation environnementale"
    ]
  },
  legal: {
    name: "Légal",
    description: "Juridique, normes, et droits affectant les entreprises et citoyens",
    color: "indigo",
    icon: "⚖️",
    themes: [
      "Droit du travail",
      "Droit de la concurrence",
      "Propriété intellectuelle",
      "Droit des consommateurs",
      "Règlementation sectorielle",
      "Normes internationales (ISO, etc.)",
      "Droit numérique / RGPD",
      "Droit fiscal",
      "Litiges / contentieux",
      "Conformité et audit"
    ]
  }
};

// Options pour les couleurs et les icônes à utiliser dans les formulaires
export const COLOR_OPTIONS = [
  { value: 'blue', label: 'Bleu', bg: 'bg-blue-500' },
  { value: 'green', label: 'Vert', bg: 'bg-green-500' },
  { value: 'purple', label: 'Violet', bg: 'bg-purple-500' },
  { value: 'red', label: 'Rouge', bg: 'bg-red-500' },
  { value: 'yellow', label: 'Jaune', bg: 'bg-yellow-500' },
  { value: 'pink', label: 'Rose', bg: 'bg-pink-500' },
  { value: 'indigo', label: 'Indigo', bg: 'bg-indigo-500' },
  { value: 'gray', label: 'Gris', bg: 'bg-gray-500' }
];

export const ICON_OPTIONS = [
  { value: '🏛️', label: 'Politique' },
  { value: '💶', label: 'Économique' },
  { value: '👥', label: 'Social' },
  { value: '🧪', label: 'Technologique' },
  { value: '🌿', label: 'Environnemental' },
  { value: '⚖️', label: 'Légal' },
  { value: '📊', label: 'Analyse' },
  { value: '🎯', label: 'Objectif' }
];

// Fonction utilitaire pour obtenir la classe de couleur
export const getColorClass = (color) => {
  const colorMap = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    purple: 'bg-purple-500',
    red: 'bg-red-500',
    yellow: 'bg-yellow-500',
    pink: 'bg-pink-500',
    indigo: 'bg-indigo-500',
    gray: 'bg-gray-500'
  };
  return colorMap[color] || 'bg-gray-500';
};

export default PESTEL_DATA;