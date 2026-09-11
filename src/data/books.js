/**
 * Seduction Codex - Base de données locale intégrée
 * 8 Ouvrages majeurs répartis en 3 catégories fondamentales
 */

export const BOOKS_DATA = [
  // --- Catégorie 1 : Psychologie & Dynamique Relationnelle ---
  {
    id: "models-mark-manson",
    title: "Models: Attract Women Through Honesty",
    author: "Mark Manson",
    year: 2011,
    category: "Psychologie & Dynamique Relationnelle",
    philosophyType: "Authenticité",
    badge: "Non-Neediness & Vérité",
    accent: "from-amber-600/30 via-rose-950/40 to-slate-900",
    glowColor: "rgba(245, 158, 11, 0.25)",
    iconName: "feather",
    summary: `À contre-courant des manuels de drague manipulateurs et des routines artificielles, Mark Manson pose les fondations d'une séduction fondée sur la vulnérabilité émotionnelle, l'honnêteté radicale et le développement de soi. Pour Manson, l'attraction n'est pas une énigme logique à résoudre par des tours de passe-passe, mais une conséquence naturelle de la maturité émotionnelle.

Le pilier central de l'ouvrage est le concept de « Non-Neediness » (l'absence de dépendance affective ou de besoin d'approbation) : un individu est d'autant plus magnétique qu'il accorde plus de valeur à sa propre perception de lui-même qu'à celle d'autrui. En acceptant le rejet comme un filtre de compatibilité sain plutôt que comme un échec personnel, Manson réconcilie la séduction avec la dignité et le respect mutuel.`,
    keyConcepts: [
      {
        title: "La Vulnérabilité comme puissance suprême",
        description: "Exprimer ses sentiments, ses limites et ses désirs sans masque ni stratégie défensive démontre un courage profond, infiniment plus attirant que toute façade d'invulnérabilité factice."
      },
      {
        title: "Le concept de 'Non-Neediness'",
        description: "L'état d'esprit où votre investissement personnel découle de vos propres valeurs plutôt que du besoin viscéral de plaire ou d'obtenir une réaction approbatrice chez l'autre."
      },
      {
        title: "La Loi de la Polarisation",
        description: "Une communication authentique doit polariser : il vaut mieux susciter un 'Oui' enthousiaste ou un 'Non' franc qu'un entre-deux tiède et stérile. Le rejet précoce économise un temps et une énergie émotionnelle précieux."
      },
      {
        title: "La Démarche des Trois Piliers",
        description: "Un mode de vie captivant (Living an attractive lifestyle), le dépassement de ses anxiétés (Overcoming anxieties) et une communication fluide et honnête (Mastering honest communication)."
      }
    ],
    actionableTakeaways: [
      {
        situation: "Engager la conversation sans artifice",
        advice: "Dites ce qui vous traverse réellement l'esprit plutôt que de chercher la réplique parfaite. Un simple 'Je vous ai remarquée et j'avais envie de venir vous dire bonjour' prononcé avec calme et aplomb surpasse n'importe quel compliment générique.",
        trapToAvoid: "Mémoriser des 'openers' préfabriqués qui vous déconnectent du moment présent et trahissent une anxiété sous-jacente."
      },
      {
        situation: "Faire face au rejet ou au désintérêt",
        advice: "Accueillez un refus avec gratitude et courtoisie. Considérez-le comme une bénédiction : la personne vient de vous signaler qu'il n'y avait pas d'adéquation mutuelle, vous permettant d'investir votre énergie ailleurs.",
        trapToAvoid: "Insister lourdement, bouder ou adopter une attitude passive-agressive pour masquer une blessure d'ego."
      },
      {
        situation: "Partager ses opinions et désaccords",
        advice: "Osez exprimer un désaccord mesuré et respectueux sur un sujet culturel ou personnel. La conformité systématique pour complaire anéantit instantanément la tension érotique et l'estime mutuelle.",
        trapToAvoid: "Agir comme un miroir docile en acquiesçant à tout ce que l'autre dit par peur de déplaire."
      }
    ],
    memorableQuotes: [
      "L'attractivité d'un homme est inversement proportionnelle à son besoin d'approbation extérieure.",
      "La vulnérabilité n'est pas une faiblesse ; c'est le courage d'affronter l'incertitude et l'exposition émotionnelle sans armure.",
      "Si ce n'est pas un 'Putain oui !', alors c'est un 'Non'."
    ],
    tags: ["Honnêteté", "Vulnérabilité", "Confiance en soi", "Sans manipulation", "Polarisation"]
  },

  {
    id: "influence-robert-cialdini",
    title: "Influence et manipulation",
    author: "Robert Cialdini",
    year: 1984,
    category: "Psychologie & Dynamique Relationnelle",
    philosophyType: "Stratégie",
    badge: "Psychologie de la Persuasion",
    accent: "from-blue-950/40 via-indigo-950/40 to-slate-900",
    glowColor: "rgba(99, 102, 241, 0.25)",
    iconName: "target",
    summary: `Chef-d'œuvre fondateur de la psychologie sociale, l'ouvrage du Dr Robert Cialdini décortique les mécanismes automatiques et les biais cognitifs qui gouvernent le consentement humain. Cialdini identifie six grands principes universels qui déclenchent le 'clic-déclic' chez l'individu : la réciprocité, l'engagement et la cohérence, la preuve sociale, la sympathie, l'autorité et la rareté.

Dans le champ des dynamiques relationnelles et de la séduction, ces principes révèlent comment le désir est souvent façonné par des signaux environnementaux et comportementaux : la valeur perçue augmente avec la rareté de l'attention, la sympathie naît de la similarité et de la validation, et la preuve sociale agit comme un accélérateur instinctif d'attraction.`,
    keyConcepts: [
      {
        title: "La Rareté et la Préservation de la liberté",
        description: "Ce qui est difficilement accessible ou temporairement disponible acquiert instantanément une valeur subjective disproportionnée. Une disponibilité illimitée dévalue l'intérêt."
      },
      {
        title: "La Preuve Sociale (Social Proof)",
        description: "Dans l'incertitude, nous déterminons la valeur d'une personne ou d'une attitude en observant comment les autres réagissent à son égard. Être entouré et apprécié génère une aura d'attractivité pré-validée."
      },
      {
        title: "La Réciprocité psychologique",
        description: "La tendance humaine universelle à vouloir rendre un geste, une attention ou une confidence. Donner une écoute ou une attention de qualité incite inconsciemment l'autre à s'investir en retour."
      },
      {
        title: "Engagement & Cohérence",
        description: "Une fois qu'une personne a consenti à un petit investissement (temps, confidence, déplacement), elle tend naturellement à aligner ses actions ultérieures pour demeurer cohérente avec ce choix."
      }
    ],
    actionableTakeaways: [
      {
        situation: "Gérer le rythme des échanges de messages",
        advice: "Dosez votre disponibilité. Avoir une vie riche et des passions prioritaires crée naturellement une rareté saine : répondez quand vous êtes réellement disponible avec une attention entière, sans être collé à votre écran.",
        trapToAvoid: "Jouer artificiellement à 'laisser poireauter 3 heures montre en main', ce qui sent le calcul maladroit et enfantin."
      },
      {
        situation: "Créer un lien de confiance rapide",
        advice: "Mettez en avant les points de ressemblance sincères (passions communes, valeurs, anecdotes d'enfance). Le principe de sympathie de Cialdini montre que nous nous attachons à ce qui nous ressemble.",
        trapToAvoid: "S'inventer des passions fictives uniquement pour faire semblant d'être sur la même longueur d'onde."
      },
      {
        situation: "Favoriser l'investissement mutuel",
        advice: "Invitez l'autre à prendre de petites initiatives (choisir le lieu, recommander une musique). Plus la personne s'investit activement dans l'interaction, plus la connexion prend de la valeur à ses yeux.",
        trapToAvoid: "Tout organiser de A à Z en mode majordome sans jamais laisser l'autre contribuer au moment."
      }
    ],
    memorableQuotes: [
      "La façon la plus simple de rendre quelque chose désirable est de souligner ce que l'on risque de perdre si l'on ne le saisit pas.",
      "Nous aimons ceux qui nous ressemblent et ceux qui nous disent qu'ils nous aiment.",
      "Souvent, ce n'est pas la valeur intrinsèque de l'objet qui guide notre désir, mais le sentiment de sa fugacité."
    ],
    tags: ["Persuasion", "Preuve sociale", "Rareté", "Biais cognitifs", "Dynamiques d'engagement"]
  },

  {
    id: "how-to-win-friends-dale-carnegie",
    title: "Comment se faire des amis",
    author: "Dale Carnegie",
    year: 1936,
    category: "Psychologie & Dynamique Relationnelle",
    philosophyType: "Authenticité",
    badge: "Charisme Sincère & Empathie",
    accent: "from-emerald-950/40 via-teal-950/40 to-slate-900",
    glowColor: "rgba(16, 185, 129, 0.25)",
    iconName: "heart",
    summary: `Classique indémodable des relations humaines vendu à plus de 30 millions d'exemplaires, l'ouvrage de Dale Carnegie repose sur une vérité psychologique fondamentale : le besoin le plus profond de la nature humaine est le désir d'être reconnu, compris et valorisé à sa juste mesure.

Appliqué à la sphère romantique, le travail de Carnegie enseigne l'art de l'écoute absolue et de la générosité attentionnelle. Un séducteur digne de ce nom n'est pas celui qui impressionne par un monologue brillant sur ses propres exploits, mais celui qui réussit le tour de force de faire se sentir la personne en face brillante, fascinante et profondément écoutée.`,
    keyConcepts: [
      {
        title: "L'Intérêt sincère pour autrui",
        description: "On peut se faire plus d'amis en deux mois en s'intéressant sincèrement aux autres qu'en deux ans en tentant de forcer les autres à s'intéresser à soi."
      },
      {
        title: "L'Écoute active & la Maïeutique",
        description: "Être un interlocuteur mémorable ne requiert pas d'éloquence démesurée, mais la capacité rare d'écouter avec ses yeux, son corps et son attention sans préparer sa propre réponse."
      },
      {
        title: "La Valorisation sans flagornerie",
        description: "Distinguer le compliment flatteur (intéressé et creux) de l'appréciation sincère (remarquer un trait de caractère, une nuance subtile chez l'autre)."
      },
      {
        title: "L'Évitement de la critique stérile",
        description: "Blâmer ou corriger autrui braque immédiatement l'ego et détruit le sentiment de sécurité émotionnelle indispensable à l'intimité."
      }
    ],
    actionableTakeaways: [
      {
        situation: "Durant un premier rendez-vous (Date)",
        advice: "Posez des questions ouvertes axées sur les émotions et les passions ('Qu'est-ce qui t'a le plus marqué dans ce projet ?' plutôt que 'En quoi consiste ton poste ?'). Laissez l'autre parler 70% du temps.",
        trapToAvoid: "Monopoliser la parole pour énumérer son CV, ses voyages ou ses réussites matérielles pour épater la galerie."
      },
      {
        situation: "Mémoriser et réutiliser les détails personnels",
        advice: "Notez mentalement le prénom d'un ami cher, le nom d'un animal ou un rêve d'enfant mentionné en passant, et faites-y référence plusieurs jours après. Cela prouve une considération exceptionnelle.",
        trapToAvoid: "Poser trois fois la même question parce qu'on écoutait distraitement sans véritable présence."
      },
      {
        situation: "Faire un compliment qui marque l'esprit",
        advice: "Complimentez un choix de style audacieux, une tournure d'esprit ou une énergie plutôt qu'uniquement une plastique extérieure que tout le monde complimente déjà.",
        trapToAvoid: "Les compliments génériques répétitifs ('Tu es ravissante') qui finissent par sonner comme un bruit de fond sans saveur."
      }
    ],
    memorableQuotes: [
      "Vous pouvez faire plus d'amis en deux mois en vous intéressant aux autres que vous ne pourriez en faire en deux ans en essayant d'amener les autres à s'intéresser à vous.",
      "Le son le plus doux et le plus important que puisse entendre une oreille humaine est son propre prénom.",
      "Parlez à un homme de lui-même, et il vous écoutera pendant des heures."
    ],
    tags: ["Écoute active", "Empathie", "Charisme", "Bienveillance", "Présence"]
  },

  // --- Catégorie 2 : Stratégie & Dynamiques de Pouvoir ---
  {
    id: "art-of-seduction-robert-greene",
    title: "L'Art de séduire",
    author: "Robert Greene",
    year: 2001,
    category: "Stratégie & Dynamiques de Pouvoir",
    philosophyType: "Stratégie",
    badge: "Dramaturgie & Archétypes",
    accent: "from-rose-950/60 via-purple-950/40 to-slate-900",
    glowColor: "rgba(225, 29, 72, 0.3)",
    iconName: "crown",
    summary: `Dans cette encyclopédie magistrale de la psychologie du désir, Robert Greene élève la séduction au rang d'art dramatique et de stratégie politique raffinée. S'appuyant sur l'histoire de figures légendaires (Cléopâtre, Casanova, Byron, Marilyn Monroe, Andy Warhol), Greene postule que la séduction est une forme subtile de guerre psychologique où l'on combat non par la force, mais par le plaisir, le mystère et l'illusion.

Le traité se scinde en deux volets : d'abord l'analyse des 9 archétypes séducteurs (la Sirène, le Libertin, l'Amant Idéal, le Dandy, le Charmeur, etc.) et des 18 types de victimes potentielles ; ensuite, un processus millimétré en 24 manœuvres visant à désarmer les défenses de la cible, semer l'angoisse douce du doute, dramatiser le quotidien et enfin consommer l'abandon consentant.`,
    keyConcepts: [
      {
        title: "Les 9 Archétypes de Séducteurs",
        description: "Chacun incarne une projection fantastique répondant à une frustration du monde moderne : la Sirène (fantasme débridé), le Libertin (désir d'être ardemment convoitée), l'Amant Idéal, le Dandy, l'Enfantin..."
      },
      {
        title: "L'Art de créer le manque & l'absence calculée",
        description: "Une présence trop continue sature le désir. Le séducteur sait se retirer juste au moment où son charme opère, laissant l'imagination de l'autre combler le vide et transformer l'intérêt en obsession."
      },
      {
        title: "La Dramatisation de l'existence",
        description: "La plupart des gens s'ennuient dans la routine. Séduire, c'est rompre la banalité en introduisant de la tension, des faux pas feints, des rebondissements et une esthétique cinématographique."
      },
      {
        title: "Isoler la cible de son monde habituel",
        description: "Créer une bulle d'intimité hermétique (physique ou psychologique) où les repères quotidiens de l'autre s'estompent au profit de la relation naissante."
      }
    ],
    actionableTakeaways: [
      {
        situation: "Éviter l'effet de banalisation dans la séduction",
        advice: "Maintenez une aura de mystère : ne dévoilez pas l'intégralité de vos pensées, de votre passé ou de votre emploi du temps dès les premiers rendez-vous. Laissez des zones d'ombre intrigantes.",
        trapToAvoid: "Tout raconter comme lors d'un déballage confessionnel, détruisant tout espace pour le fantasme et la curiosité."
      },
      {
        situation: "Identifier ce qui manque à l'autre",
        advice: "Scrutez les frustrations inconscientes de votre partenaire (besoin d'aventure, besoin de sécurité, sentiment d'être incompris) pour incarner momentanément le contre-poison à cette mélancolie.",
        trapToAvoid: "Vouloir imposer votre propre scénario sans observer ce que l'autre désire secrètement vivre."
      },
      {
        situation: "Maîtriser les signaux mixtes",
        advice: "Alternez chaleur et retrait poli, attention passionnée et distance intellectuelle. Ce contraste empêche l'autre de vous considérer comme acquis(e) et stimule la dopamine.",
        trapToAvoid: "Tomber dans la cruauté gratuite ou le chaud/froid toxique qui détruit la confiance au lieu d'éveiller le jeu."
      }
    ],
    memorableQuotes: [
      "La séduction est une forme de guerre psychologique où le combat se gagne non par la force, mais par le plaisir.",
      "Si vous voulez séduire quelqu'un, faites-lui croire que c'est lui qui vous séduit.",
      "Le secret de la séduction réside dans la maîtrise de l'absence : soyez présent assez pour séduire, puis disparaissez assez pour hanter."
    ],
    tags: ["Psychologie sombre", "Archétypes", "Mystère", "Tension érotique", "Dramaturgie"]
  },

  {
    id: "the-game-neil-strauss",
    title: "The Game: Les secrets d'un virtuose de la drague",
    author: "Neil Strauss",
    year: 2005,
    category: "Stratégie & Dynamiques de Pouvoir",
    philosophyType: "Stratégie",
    badge: "Sociologie & Déconstruction",
    accent: "from-violet-950/50 via-slate-900 to-amber-950/40",
    glowColor: "rgba(139, 92, 246, 0.25)",
    iconName: "sparkles",
    summary: `Récit autobiographique et immersif du journaliste Neil Strauss (alias 'Style'), "The Game" retrace deux années passées au sein de la sous-culture clandestine de la communauté des séducteurs (PUA - Pick-Up Artists), guidé par des mentors excentriques comme Mystery. L'ouvrage a popularisé des concepts devenus cultes tels que le 'peacocking' (style vestimentaire flamboyant pour capter le regard), le 'negging' (pique légère pour désarmer une beauté inaccessible) ou la règle des 3 secondes.

Cependant, la véritable force du livre réside dans son dénouement sociologique lucide : après avoir atteint le sommet de la maîtrise technique et couché avec des dizaines de femmes, Strauss découvre le vide existentiel abyssal de cette quête mécaniste, l'isolement pathologique de ses pairs et l'impossibilité de construire un amour véritable sur des fondations d'artifice et de mensonge.`,
    keyConcepts: [
      {
        title: "La Dynamique de Groupe & l'approche indirecte",
        description: "Ne jamais foncer tête baissée sur la personne la plus convoitée ; séduire d'abord son groupe d'amis (les 'obstacles') pour obtenir l'approbation implicite de son cercle social."
      },
      {
        title: "La déconstruction des croyances limitantes",
        description: "L'apprentissage intensif démontre que l'anxiété d'approche est une illusion biologique que l'action répétée et la désensibilisation systématique peuvent terrasser."
      },
      {
        title: "L'illusion du masque technique",
        description: "Les routines et répliques rodées permettent de passer la porte initiale mais constituent une prison dorée empêchant toute intimité authentique une fois le rideau baissé."
      },
      {
        title: "Le Syndrome de Peter Pan et la solitude du PUA",
        description: "La poursuite compulsive de la validation sexuelle comme substitut névrotique à un manque d'estime de soi intrinsèque."
      }
    ],
    actionableTakeaways: [
      {
        situation: "Surmonter la peur du jugement en public",
        advice: "Appliquez la règle de l'action immédiate : dès que vous ressentez une envie spontanée d'échanger avec quelqu'un, faites le premier pas dans les secondes qui suivent, avant que votre cerveau rationnel n'invente des excuses paralysantes.",
        trapToAvoid: "Observer la personne pendant une demi-heure de loin en ruminant, ce qui génère une énergie crispée et effrayante."
      },
      {
        situation: "Désarmer l'effet piédestal",
        advice: "Traitez les personnes exceptionnellement courtisées comme des êtres humains ordinaires, avec un brin d'humour taquin et sans chercher à les flatter servilement.",
        trapToAvoid: "Utiliser des remarques désobligeantes ou blessantes pour rabaisser l'autre, ce qui relève du mépris et non de la séduction."
      },
      {
        situation: "Faire la transition vers la sincérité",
        advice: "Une fois le premier contact chaleureusement établi, abandonnez immédiatement toute technique ou posture pour revenir à un dialogue d'égal à égal.",
        trapToAvoid: "Rester bloqué dans un personnage de scène qui empêche toute réelle rencontre d'âmes."
      }
    ],
    memorableQuotes: [
      "Pour séduire une femme, il faut être prêt à risquer de la perdre.",
      "Le jeu n'a de sens que s'il vous conduit à ne plus avoir besoin de jouer.",
      "J'ai découvert que la séduction était une science de l'illusion, mais que l'amour restait une affaire de vérité."
    ],
    tags: ["Sociologie", "Désensibilisation", "Dynamiques sociales", "Déconstruction", "Histoire PUA"]
  },

  // --- Catégorie 3 : Philosophie & Classiques Littéraires ---
  {
    id: "liaisons-dangereuses-laclos",
    title: "Les Liaisons dangereuses",
    author: "Pierre Choderlos de Laclos",
    year: 1782,
    category: "Philosophie & Classiques Littéraires",
    philosophyType: "Philosophie",
    badge: "Guerre Épistolaire & Libertinage",
    accent: "from-rose-950/70 via-red-950/50 to-slate-900",
    glowColor: "rgba(190, 18, 60, 0.3)",
    iconName: "mail",
    summary: `Sommet indépassable du roman épistolaire français du XVIIIe siècle, "Les Liaisons dangereuses" met en scène le vicomte de Valmont et la marquise de Merteuil, deux aristocrates libertins qui ont érigé la conquête amoureuse et la manipulation des réputations au rang de jeu stratégique machiavélique. Pour eux, l'amour véritable est une faiblesse vulgaire ; seul compte l'exercice souverain du pouvoir sur les âmes et les corps.

À travers une correspondance d'une virtuosité psychologique vertigineuse, Laclos dissèque les mécanismes de l'orgueil, le langage comme arme de guerre, et l'illusion du contrôle absolu : car même le stratège le plus froid (Valmont) finit par être piégé par la sincérité du sentiment qu'il prétendait feindre auprès de la présidente de Tourvel, conduisant l'édifice libertin à sa chute tragique.`,
    keyConcepts: [
      {
        title: "L'Éloquence comme instrument de domination",
        description: "Chaque lettre, chaque mot est soupesé pour flatter les failles narcissiques du destinataire et insinuer le poison du doute sous les dehors de la plus pure dévotion."
      },
      {
        title: "La dialectique du chasseur pris au piège",
        description: "À force de feindre l'amour avec un tel perfectionnisme, la frontière entre simulation et émotion réelle s'effondre : la raison capitule devant la contagion affective."
      },
      {
        title: "La maîtrise du regard social et de la réputation",
        description: "Merteuil illustre la nécessité pour une femme du XVIIIe d'afficher une vertu irréprochable en public pour exercer la liberté la plus féroce dans l'ombre."
      },
      {
        title: "La vanité comme moteur d'autodestruction",
        description: "Le refus d'admettre ses sentiments par peur du ridicule ou du jugement de son rival précipite les protagonistes vers leur ruine."
      }
    ],
    actionableTakeaways: [
      {
        situation: "Mesurer la puissance de l'écrit et du verbe",
        advice: "Cultivez le plaisir des mots choisis, de l'élégance épistolaire et des métaphores délicates dans vos messages. Un message bien tourné réveille l'imagination bien plus qu'un émoji standardisé.",
        trapToAvoid: "Tomber dans l'emphase ampoulée ou le cynisme calculateur qui dénaturent l'authenticité de l'échange."
      },
      {
        situation: "Reconnaître les manœuvres de manipulation affective",
        advice: "Analysez avec recul les protestations passionnées trop rapides ou les tentatives de susciter votre culpabilité pour vous protéger des prédateurs émotionnels modernes.",
        trapToAvoid: "Confondre l'intensité dramatique créée de toutes pièces avec une connexion amoureuse saine."
      },
      {
        situation: "Accepter ses sentiments naissants",
        advice: "Quand l'attachement survient, ayez le courage de déposer les armes de la fierté plutôt que de sacrifier une belle histoire sur l'autel de votre ego.",
        trapToAvoid: "Préférer détruire une relation par orgueil plutôt que d'admettre que l'on est touché."
      }
    ],
    memorableQuotes: [
      "J'avais bien le droit sans doute de me reposer sur des lauriers que j'ai cueillis moi-même.",
      "Conquérir est notre destin, il faut le suivre ; mais le sentiment s'y mêle-t-il, l'illusion s'évanouit.",
      "L'amour que l'on feint est souvent plus convaincant que celui que l'on ressent véritablement, jusqu'au jour où l'on en meurt."
    ],
    tags: ["Libertinage", "Épistolaire", "Vanité", "Machiavélisme", "Littérature classique"]
  },

  {
    id: "journal-seducteur-kierkegaard",
    title: "Le Journal du séducteur",
    author: "Søren Kierkegaard",
    year: 1843,
    category: "Philosophie & Classiques Littéraires",
    philosophyType: "Philosophie",
    badge: "Esthétisme & Désir Suspendu",
    accent: "from-amber-950/60 via-stone-900 to-slate-900",
    glowColor: "rgba(217, 119, 6, 0.25)",
    iconName: "book-open",
    summary: `Partie intégrante du chef-d'œuvre "Ou bien... ou bien" (Enten-Eller), ce court roman philosophique nous plonge dans les carnets intimes de Johannes, un esthète raffiné qui entreprend la séduction de la jeune Cordelia Wahl. Pour Johannes, la séduction physique et la possession charnelle vulgaire sont méprisables ; le véritable génie consiste à réveiller poétiquement l'âme d'une femme, à susciter en elle l'éclosion du désir absolu, pour ensuite s'évanouir une fois le sommet esthétique atteint.

Kierkegaard utilise ce récit pour illustrer les limites tragiques du 'stade esthétique' de l'existence : une vie vouée à l'éphémère, à la contemplation du beau et à la mise en scène du sentiment, condamnée au vertige du vide existentiel et à l'incapacité de s'engager dans le stade éthique du mariage ou de la fidélité.`,
    keyConcepts: [
      {
        title: "La Séduction comme éveil poétique",
        description: "L'art de faire naître chez l'autre une conscience aiguë de sa propre beauté et de son pouvoir de désirer, sans jamais précipiter le dénouement."
      },
      {
        title: "L'Anticipation supérieure à la consommation",
        description: "Le plaisir réside dans la préparation, les regards furtifs, la lettre laissée à dessein, l'attente délicieuse plutôt que dans l'assouvissement physique immédiat."
      },
      {
        title: "La théâtralisation de la distance",
        description: "Johannes feint la froideur ou l'indifférence pour forcer Cordelia à franchir elle-même le pas et à s'approprier son propre désir."
      },
      {
        title: "Le Désespoir secret du stade esthétique",
        description: "L'esthète reste un éternel spectateur de ses propres émotions, incapable de ressentir l'amour avec la plénitude du cœur."
      }
    ],
    actionableTakeaways: [
      {
        situation: "Cultiver la poésie et la lenteur du désir",
        advice: "Résistez à l'immédiateté de la société moderne : laissez du temps au désir pour infuser. Un échange de regards soutenu, une promenade contemplative créent une intensité rare.",
        trapToAvoid: "Vouloir tout consommer et conclure dans l'heure, réduisant la rencontre amoureuse à une transaction mécanique."
      },
      {
        situation: "Créer un univers imaginaire partagé",
        advice: "Faites voyager votre partenaire à travers des histoires, des découvertes artistiques et des réflexions existentielles qui transcendent la routine quotidienne.",
        trapToAvoid: "S'enfermer dans des conversations banales sur la météo, le travail ou les soucis domestiques."
      },
      {
        situation: "Ne pas sacrifier la réalité sur l'autel de l'illusion",
        advice: "Rappelez-vous qu'une personne réelle avec ses imperfections vaut mille fois mieux que l'idéal esthétique abstrait et stérile dans lequel s'enferme Johannes.",
        trapToAvoid: "Fuir la relation dès que la réalité imparfaite commence à se manifester."
      }
    ],
    memorableQuotes: [
      "Aimer pour posséder est vulgaire ; aimer pour éveiller chez l'autre le vertige de sa propre liberté, voilà l'art.",
      "Le baiser est une tentative pour boire une autre âme.",
      "Le secret de la séduction ne consiste pas à conquérir une femme, mais à faire en sorte qu'elle ne puisse plus se passer de vous rêver."
    ],
    tags: ["Esthétisme", "Romantisme", "Poésie", "Attente", "Philosophie existentielle"]
  },

  {
    id: "fragments-discours-amoureux-barthes",
    title: "Fragments d'un discours amoureux",
    author: "Roland Barthes",
    year: 1977,
    category: "Philosophie & Classiques Littéraires",
    philosophyType: "Philosophie",
    badge: "Sémiologie du Sentiment",
    accent: "from-indigo-950/60 via-purple-950/40 to-slate-900",
    glowColor: "rgba(99, 102, 241, 0.25)",
    iconName: "feather",
    summary: `Ouvrage culte et révolutionnaire, "Fragments d'un discours amoureux" adopte la forme d'un dictionnaire kaléidoscopique des figures intérieures qui traversent l'esprit de l'amoureux. Roland Barthes donne la parole au sujet aimant qui dit 'je', un sujet devenu marginal et anachronique dans une société contemporaine obsédée par la sexualité crue et l'efficacité économique.

De 'l'Attente au téléphone' au 'Racket' du doute en passant par 'l'Écorché' et 'le Ravissement', Barthes décrypte avec une acuité sémiologique bouleversante comment l'amoureux scrute le moindre signe, interprète un silence comme une sentence de mort ou un sourire comme une résurrection. C'est l'autopsie la plus fine jamais rédigée de la vulnérabilité absolue du sentiment amoureux.`,
    keyConcepts: [
      {
        title: "La Sémiologie du délire interprétatif",
        description: "L'amoureux est une machine à déchiffrer les signes : une virgule déplacée dans un message, un retard de cinq minutes deviennent des traités entiers de passion ou de rejet."
      },
      {
        title: "L'Attente comme structure fondamentale de l'amour",
        description: "'Je suis celui qui attend' : l'identité amoureuse se forge dans le vide temporel où l'autre manque, révélant la dépendance intime du sujet."
      },
      {
        title: "Le Ravissement (l'Éblouissement initial)",
        description: "Ce moment foudroyant où une image, une voix ou une silhouette pénètre le sujet sans qu'il ait pu ériger la moindre défense intellectuelle."
      },
      {
        title: "L'Insoutenable solitude du discours amoureux",
        description: "L'amoureux parle un langage que le monde extérieur, cynique ou pressé, ne comprend plus et qualifie volontiers de folie ou de faiblesse."
      }
    ],
    actionableTakeaways: [
      {
        situation: "Faire face à l'angoisse de l'attente d'une réponse",
        advice: "Prenez conscience que votre souffrance ne vient pas du silence de l'autre, mais du monologue intérieur dramatique que votre propre imaginaire projette sur ce silence. Respirez et recentrez-vous.",
        trapToAvoid: "Envoyer une salve de messages d'angoisse ou de reproches qui étouffent le partenaire et matérialisent votre propre panique."
      },
      {
        situation: "Comprendre la valeur des petits riens",
        advice: "Dans la relation, accordez de l'importance aux micro-signaux poétiques : un mot manuscrit, un regard complice au milieu d'une foule. C'est là que réside la vérité du lien.",
        trapToAvoid: "Mépriser la sensibilité de l'autre ou qualifier ses émotions de 'dramatisation ridicule'."
      },
      {
        situation: "Accepter la beauté de son propre sentiment",
        advice: "Ne rougissez jamais d'aimer ou d'être touché(e). Même non partagé avec la même intensité, le sentiment amoureux enrichit l'âme de celui qui l'éprouve.",
        trapToAvoid: "S'endurcir par cynisme pour ne plus jamais risquer d'avoir mal."
      }
    ],
    memorableQuotes: [
      "Est amoureux celui qui attend. L'autre n'attend jamais.",
      "L'amour est un délire de déchiffrage : chaque geste de l'être aimé devient un hiéroglyphe sacré.",
      "Je veux que tu saches ce que je te cache, voilà l'équation amoureuse active."
    ],
    tags: ["Sémiologie", "Attente", "Sensibilité", "Psychologie amoureuse", "Philosophie"]
  }
];

export const CATEGORIES = [
  "Tous les ouvrages",
  "Psychologie & Dynamique Relationnelle",
  "Stratégie & Dynamiques de Pouvoir",
  "Philosophie & Classiques Littéraires"
];

export const PHILOSOPHY_FILTERS = [
  { id: "all", label: "Toutes les approches", icon: "✦" },
  { id: "Authenticité", label: "Sans manipulation", sub: "Authenticité & Vérité", icon: "🌿" },
  { id: "Stratégie", label: "Jeux de pouvoir", sub: "Stratégie & Influence", icon: "♟️" },
  { id: "Philosophie", label: "Poésie & Analyse", sub: "Classiques & Sémiologie", icon: "📜" }
];
