/**
 * Seduction Codex - Questionnaire interactif
 * "Quel séducteur / quelle approche êtes-vous ?"
 */

export const QUIZ_QUESTIONS = [
  {
    id: "q1",
    question: "Face à une personne qui vous attire magnétiquement dans un lieu public, quel est votre premier réflexe naturel ?",
    options: [
      {
        text: "J'y vais sans détour, en assumant simplement mon désir de lui parler avec calme et authenticité.",
        archetype: "radical-honest"
      },
      {
        text: "J'observe la dynamique d'ensemble, attire d'abord l'attention de son entourage et installe un regard intrigant.",
        archetype: "strategist"
      },
      {
        text: "J'attends l'instant poétique parfait, un détail esthétique ou une coïncidence pour amorcer un échange subtil.",
        archetype: "poet-aesthete"
      },
      {
        text: "J'analyse ses réactions, cherche un terrain de ressemblance ou un signal d'ouverture avant de créer le contact.",
        archetype: "psychologist"
      }
    ]
  },
  {
    id: "q2",
    question: "Pour vous, qu'est-ce qui génère la plus puissante tension érotique et amoureuse ?",
    options: [
      {
        text: "La franchise brute et le courage de se montrer vulnérable sans chercher à plaire à tout prix.",
        archetype: "radical-honest"
      },
      {
        text: "L'alternance entre présence envoûtante et absence calculée, maintenant l'autre dans une douce incertitude.",
        archetype: "strategist"
      },
      {
        text: "La lenteur, les lettres murmurées, les sous-entendus érudits et l'attente qui fait vibrer l'imaginaire.",
        archetype: "poet-aesthete"
      },
      {
        text: "Le sentiment de complicité intime, la rareté du moment partagé et la réciprocité d'une écoute absolue.",
        archetype: "psychologist"
      }
    ]
  },
  {
    id: "q3",
    question: "Si la personne convoiteuse semble subitement distante ou peu réactive par message, quelle est votre attitude ?",
    options: [
      {
        text: "Je respecte son espace sans angoisse : si l'intérêt n'est pas mutuel, je poursuis ma vie sans rancune.",
        archetype: "radical-honest"
      },
      {
        text: "Je me retire immédiatement avec panache, créant un silence assourdissant qui pique sa curiosité.",
        archetype: "strategist"
      },
      {
        text: "Je savoure cette mélancolie douce, analysant la beauté tragique de l'attente et des silences.",
        archetype: "poet-aesthete"
      },
      {
        text: "Je réévalue les investissements respectifs et je propose plus tard un rendez-vous à haute valeur ajoutée sans forcer.",
        archetype: "psychologist"
      }
    ]
  },
  {
    id: "q4",
    question: "Quel est votre but ultime dans le jeu de la rencontre amoureuse ?",
    options: [
      {
        text: "Une connexion sincère et profonde, libérée de tout jeu de pouvoir et de toute névrose d'approbation.",
        archetype: "radical-honest"
      },
      {
        text: "L'art de fasciner, d'incarner un mythe personnel mémorable et de vivre une aventure cinématographique.",
        archetype: "strategist"
      },
      {
        text: "Éveiller l'âme esthétique de l'autre, transformer chaque rencontre en une œuvre d'art suspendue dans le temps.",
        archetype: "poet-aesthete"
      },
      {
        text: "Maîtriser la psychologie humaine pour tisser des liens d'influence durables et harmonieux.",
        archetype: "psychologist"
      }
    ]
  }
];

export const ARCHETYPES = {
  "radical-honest": {
    id: "radical-honest",
    title: "L'Honnête Radical",
    subtitle: "L'Élégance de la Vérité & du Non-Neediness",
    icon: "🌿",
    accent: "from-amber-600/40 via-emerald-950/40 to-slate-900",
    badge: "Courage & Transparence",
    description: "Vous refusez les masques sociaux et les manœuvres artificielles. Pour vous, la véritable séduction émane d'une sécurité intérieure inébranlable : vous assumez vos désirs, vos failles et vos limites sans crainte du rejet. Vous polarisez avec franchise et attirez les personnes séduites par votre authenticité rare.",
    recommendedBookId: "models-mark-manson",
    secondaryBookId: "how-to-win-friends-dale-carnegie",
    strengths: [
      "Zéro anxiété liée au besoin de plaire",
      "Écoute pure et présence authentique",
      "Capacité à créer un climat de sécurité immédiat"
    ],
    pitfall: "Gare à la maladresse ou à la brutalité : l'honnêteté gagne toujours à s'accompagner d'empathie et d'élégance de forme."
  },
  "strategist": {
    id: "strategist",
    title: "Le Stratège Dramaturge",
    subtitle: "Le Maître du Mystère & des Contrastes",
    icon: "♟️",
    accent: "from-rose-950/60 via-purple-950/50 to-slate-900",
    badge: "Dramatisation & Envoûtement",
    description: "Vous percevez le monde amoureux comme une pièce de théâtre fascinante où l'ennui est le seul véritable péché capital. Vous savez introduire de la tension, doser le mystère et vous retirer au bon moment pour stimuler le fantasme chez l'autre.",
    recommendedBookId: "art-of-seduction-robert-greene",
    secondaryBookId: "the-game-neil-strauss",
    strengths: [
      "Aura magnétique et présence inoubliable",
      "Art de rompre la banalité quotidienne",
      "Compréhension aiguë des ressorts du fantasme"
    ],
    pitfall: "Attention à ne pas vous enfermer dans votre propre personnage de scène au détriment d'une sincérité intime."
  },
  "poet-aesthete": {
    id: "poet-aesthete",
    title: "L'Esthète Poète",
    subtitle: "L'Artisan du Désir Suspendu",
    icon: "📜",
    accent: "from-amber-950/60 via-stone-900 to-slate-900",
    badge: "Sémiologie & Raffinement",
    description: "Pour vous, la séduction est une affaire d'esprit, de mots délicats et de nuances presque imperceptibles. Vous privilégiez la poésie de l'attente et l'éveil intellectuel de l'autre à l'assouvissement physique immédiat. Votre charme repose sur votre culture, votre regard et la musicalité de votre verbe.",
    recommendedBookId: "journal-seducteur-kierkegaard",
    secondaryBookId: "fragments-discours-amoureux-barthes",
    strengths: [
      "Sensibilité émotionnelle et verbale d'exception",
      "Capacité à faire vivre des émotions hors du temps",
      "Déchiffrage intuitif des signes subtils"
    ],
    pitfall: "Veillez à ne pas sur-intellectualiser la relation au point d'en oublier l'ancrage physique et la spontanéité du réel."
  },
  "psychologist": {
    id: "psychologist",
    title: "Le Psychologue Perspicace",
    subtitle: "L'Expert de la Persuasion & du Charisme Émotionnel",
    icon: "🎯",
    accent: "from-blue-950/50 via-indigo-950/50 to-slate-900",
    badge: "Perspicacité & Réciprocité",
    description: "Vous comprenez intuitivement ce qui anime le cœur et l'esprit d'autrui. Vous appliquez avec finesse les principes d'écoute active, de rareté, de preuve sociale et de réciprocité. Vous savez faire sentir à votre partenaire qu'il est la personne la plus intéressante de la pièce.",
    recommendedBookId: "influence-robert-cialdini",
    secondaryBookId: "liaisons-dangereuses-laclos",
    strengths: [
      "Observation minutieuse et adaptabilité relationnelle",
      "Générosité d'écoute créant une confiance absolue",
      "Maîtrise du timing et de l'engagement mutuel"
    ],
    pitfall: "Ne laissez pas la réflexion analytique étouffer vos impulsions spontanées et votre propre abandon émotionnel."
  }
};
