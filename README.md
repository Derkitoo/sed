# Seduction Codex — Compendium des Dynamiques Relationnelles & de Pouvoir

Une **Progressive Web App (PWA) 100% responsive, interactive et offline-first**, conçue avec une direction artistique soignée (dark mode ardoise & or feutré, typographie éditoriale luxe).

---

## 🏛️ Les 8 Ouvrages Décryptés dans le Codex

L'application embarque une base de données locale intégrée avec analyse complète, concepts clés, mises en situation concrètes, citations marquantes et tags :

### 1. Psychologie & Dynamique Relationnelle
* **Models: Attract Women Through Honesty** (*Mark Manson*) — Vulnérabilité, honnêteté radicale, non-neediness et rejet de la manipulation.
* **Influence et manipulation** (*Robert Cialdini*) — Rareté, réciprocité, preuve sociale, sympathie et dynamiques d'engagement.
* **Comment se faire des amis** (*Dale Carnegie*) — Écoute active bienveillante, considération sincère d'autrui et charisme d'empathie.

### 2. Stratégie & Dynamiques de Pouvoir
* **L'Art de séduire** (*Robert Greene*) — Les 9 archétypes du séducteur, dramatisation de l'existence, absence calculée et guerre psychologique.
* **The Game** (*Neil Strauss*) — Immersion dans la communauté PUA, dynamiques de groupe et déconstruction lucide du vide émotionnel.

### 3. Philosophie & Classiques Littéraires
* **Les Liaisons dangereuses** (*Choderlos de Laclos*) — Libertinage machiavélique, guerre épistolaire et piège de l'amour feint.
* **Le Journal du séducteur** (*Søren Kierkegaard*) — Séduction esthétique, intellectualisation du désir et poésie de l'attente.
* **Fragments d'un discours amoureux** (*Roland Barthes*) — Sémiologie des signaux amoureux, attente et vulnérabilité absolue du sujet aimant.

---

## ✨ Fonctionnalités Majeures

1. **Dashboard & Filtres Dynamiques en temps réel :**
   - Onglets de catégories (Psychologie, Stratégie, Philosophie, Favoris).
   - Filtre rapide par approche philosophique (*Sans manipulation*, *Jeux de pouvoir*, *Poésie/Analyse*).
   - Moteur de recherche instantané (titre, auteur, concepts clés, tags) avec raccourci clavier `/`.

2. **Fiche Détaillée Complète (Modal & Bottom Sheet) :**
   - Onglet **Synthèse** de l'œuvre et thèse centrale.
   - Onglet **Concepts Clés** expliqués en détail.
   - Onglet **Mises en Situation Pratiques** (Conseil concret + Le piège à éviter).
   - Onglet **Citations Mémorables** avec bouton 1-clic pour copier dans le presse-papier et feedback toast.
   - Bouton de mise en favori (bookmarks) persistant dans le `localStorage`.

3. **Diagnostic / Quiz Interactif "Quel séducteur/approche êtes-vous ?" :**
   - Mini-questionnaire à 4 questions psychologiques et comportementales.
   - Calcul de score et révélation de l'archétype (*L'Honnête Radical*, *Le Stratège Dramaturge*, *L'Esthète Poète*, *Le Psychologue Perspicace*).
   - Présentation des atouts, du point de vigilance et lien direct vers l'ouvrage recommandé.

4. **Widget Interactif "Citation du Jour" :**
   - Citation aléatoire seedée quotidiennement, avec options de tirage aléatoire, copie rapide et découverte du livre associé.

5. **Exigences PWA & Offline-First :**
   - **Manifest Web** (`manifest.webmanifest`) avec icônes maskable 192x192 et 512x512.
   - **Service Worker** (`sw.js`) assurant la mise en cache complète des ressources pour un fonctionnement fluide hors-ligne.
   - **Bannière d'installation native** interceptant `beforeinstallprompt` avec option d'installation instantanée ou ajournée.
   - **Indicateur de connectivité** prévenant discrètement l'utilisateur lors du basculement hors-ligne.

6. **UX/UI Mobile-First & Raffinement Luxe :**
   - Barre de navigation inférieure (Bottom Navigation Bar) sur mobile avec support des encoches (`env(safe-area-inset-bottom)`).
   - Navigation fluide et adaptable sur tablette et grand écran (top header).
   - Micro-animations, retour haptique visuel et notifications toast élégantes.

---

## 🚀 Lancement & Test Local

Pour tester l'application dans n'importe quel navigateur moderne :

```bash
# Avec npx serve (recommandé pour tester le Service Worker PWA)
npx serve . -l 3000

# Ou simplement ouvrir avec l'extension Live Server de votre éditeur
```

Rendez-vous ensuite sur `http://localhost:3000`.
