/**
 * Seduction Codex - Composant "Les Étapes de la Séduction (Du début jusqu'à la fin)"
 * Parcours chronologique interactif complet
 */

import { SEDUCTION_STAGES } from "../data/stagesData.js";
import { BOOKS_DATA } from "../data/books.js";
import { getIcon } from "./Icons.js";
import { Toast } from "./Toast.js";

export class StagesView {
  constructor(containerId, onOpenBook) {
    this.container = document.getElementById(containerId);
    this.onOpenBook = onOpenBook;
    this.currentStageIndex = 0;
    this.userProgress = this.loadProgress();

    this.render();
  }

  loadProgress() {
    try {
      const saved = localStorage.getItem("seduction_codex_stages_checklist");
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      return {};
    }
  }

  saveProgress() {
    try {
      localStorage.setItem("seduction_codex_stages_checklist", JSON.stringify(this.userProgress));
    } catch (e) {
      console.error("Failed to save stage checklist", e);
    }
  }

  setStage(index) {
    if (index >= 0 && index < SEDUCTION_STAGES.length) {
      this.currentStageIndex = index;
      this.render();
      
      // Smooth scroll into view if on mobile
      const el = document.getElementById("stage-card-display");
      if (el && window.innerWidth < 768) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }

  render() {
    if (!this.container) return;

    const currentStage = SEDUCTION_STAGES[this.currentStageIndex];
    const relatedBooks = BOOKS_DATA.filter(b => currentStage.relatedBooks.includes(b.id));

    this.container.innerHTML = `
      <div class="space-y-8">
        
        <!-- Section Title Header -->
        <div class="text-center max-w-3xl mx-auto space-y-3">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-300 border border-amber-500/30">
            <span>🏛️ Le Parcours Chronologique Initiatique</span>
          </div>
          <h2 class="font-serif text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-100 tracking-tight">
            Les 5 Étapes de la Séduction : <span class="text-gold-gradient italic">Du Premier Regard à l'Intimité</span>
          </h2>
          <p class="text-xs sm:text-sm md:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
            De la préparation intérieure et l'approche jusqu'au dénouement sensuel, découvrez la progression universelle théorisée par les plus grands maîtres de l'attraction.
          </p>
        </div>

        <!-- Horizontal Interactive Stepper Navigation -->
        <div class="overflow-x-auto pb-2 no-scrollbar">
          <div class="flex items-center justify-between min-w-[680px] sm:min-w-full p-2 bg-slate-950/80 rounded-2xl border border-slate-800 backdrop-blur-md gap-2">
            ${SEDUCTION_STAGES.map((st, idx) => {
              const isActive = idx === this.currentStageIndex;
              const isPast = idx < this.currentStageIndex;

              return `
                <button 
                  class="stage-nav-btn flex-1 flex items-center gap-2.5 p-2.5 sm:p-3 rounded-xl transition-all text-left ${
                    isActive 
                      ? "bg-gradient-to-r from-amber-500/20 to-rose-950/40 border border-amber-500/40 text-amber-200 shadow-lg shadow-black/40" 
                      : isPast
                        ? "text-slate-300 hover:bg-slate-900/80 border border-slate-800/80"
                        : "text-slate-500 hover:text-slate-300 hover:bg-slate-900/50 border border-transparent"
                  }"
                  data-stage-index="${idx}"
                >
                  <div class="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs flex-shrink-0 ${
                    isActive 
                      ? "bg-amber-500 text-slate-950 shadow" 
                      : isPast
                        ? "bg-slate-800 text-amber-400 border border-slate-700"
                        : "bg-slate-900 text-slate-500 border border-slate-800"
                  }">
                    ${isPast ? "✓" : st.phaseNumber}
                  </div>
                  <div class="flex flex-col min-w-0">
                    <span class="text-[10px] uppercase font-bold tracking-wider ${isActive ? 'text-amber-400' : 'text-slate-500'} truncate">
                      ${st.phaseTag}
                    </span>
                    <span class="text-xs font-serif font-bold text-slate-200 truncate">
                      ${st.title.split('&')[0]}
                    </span>
                  </div>
                </button>
              `;
            }).join("")}
          </div>
        </div>

        <!-- Active Stage Main Card -->
        <div id="stage-card-display" class="relative overflow-hidden rounded-3xl border border-amber-500/30 bg-gradient-to-b from-slate-900/95 via-slate-900/85 to-slate-950 p-6 sm:p-8 md:p-10 shadow-2xl shadow-black backdrop-blur-xl animate-fadeIn">
          
          <!-- Background Glows -->
          <div class="absolute -top-12 -right-12 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl pointer-events-none"></div>
          <div class="absolute -bottom-12 -left-12 w-64 h-64 bg-rose-950/20 rounded-full blur-3xl pointer-events-none"></div>

          <!-- Header of Active Stage -->
          <div class="relative flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800/90">
            <div class="space-y-1.5">
              <div class="flex items-center gap-2.5">
                <span class="px-2.5 py-0.5 rounded-full text-xs font-bold ${currentStage.badgeColor} border">
                  Étape ${currentStage.phaseNumber} • ${currentStage.phaseTag}
                </span>
                <span class="text-2xl">${currentStage.icon}</span>
              </div>
              <h3 class="font-serif text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight">
                ${currentStage.title}
              </h3>
              <p class="text-xs sm:text-sm font-medium text-amber-300/90">
                ${currentStage.subtitle}
              </p>
            </div>

            <!-- Master Quote Pill -->
            <div class="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/80 max-w-md">
              <p class="text-xs italic text-slate-300 font-serif leading-relaxed">
                ${currentStage.quote}
              </p>
            </div>
          </div>

          <!-- Overview Narrative -->
          <div class="pt-6 pb-6 text-sm sm:text-base text-slate-200 leading-relaxed font-normal border-b border-slate-800/80">
            <p>${currentStage.overview}</p>
          </div>

          <!-- 3 Columns / Grid of Stage Content -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 py-8 border-b border-slate-800/80">
            
            <!-- Left: Les Déclencheurs Psychologiques -->
            <div class="space-y-4">
              <div class="flex items-center gap-2">
                <span class="w-2 h-2 rounded-full bg-indigo-400"></span>
                <h4 class="font-serif text-lg font-bold text-slate-100">
                  Les Mécanismes Psychologiques Inconscients
                </h4>
              </div>
              <div class="space-y-3">
                ${currentStage.psychologicalDynamics.map(dyn => `
                  <div class="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-1.5 hover:border-slate-700 transition-colors">
                    <h5 class="text-xs font-bold text-indigo-300 tracking-wide uppercase">
                      ✦ ${dyn.concept}
                    </h5>
                    <p class="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      ${dyn.detail}
                    </p>
                  </div>
                `).join("")}
              </div>
            </div>

            <!-- Right: Plan d'Action & Exemples de Répliques -->
            <div class="space-y-4">
              <div class="flex items-center gap-2">
                <span class="w-2 h-2 rounded-full bg-amber-400"></span>
                <h4 class="font-serif text-lg font-bold text-slate-100">
                  Plan d'Action Concret & Dialogue Recommandé
                </h4>
              </div>

              <div class="space-y-3">
                ${currentStage.actionPlan.map((act, aIdx) => `
                  <div class="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-1">
                    <span class="text-xs font-bold text-amber-300">
                      Action #${aIdx + 1} : ${act.title}
                    </span>
                    <p class="text-xs text-slate-300 leading-relaxed">
                      ${act.desc}
                    </p>
                  </div>
                `).join("")}

                <!-- Dialogue box -->
                <div class="p-4 rounded-xl bg-gradient-to-br from-amber-500/10 via-slate-950 to-slate-950 border border-amber-500/30 space-y-2">
                  <div class="flex items-center justify-between">
                    <span class="text-[11px] uppercase tracking-wider font-bold text-amber-400">Exemple de réplique calibrée</span>
                    <span class="text-[10px] text-slate-400">${currentStage.dialogueExamples[0].context}</span>
                  </div>
                  <p class="font-serif italic text-xs sm:text-sm text-slate-200">
                    ${currentStage.dialogueExamples[0].example}
                  </p>
                </div>
              </div>
            </div>

          </div>

          <!-- Green Flags & Fatal Pitfall Section -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 py-8 border-b border-slate-800/80">
            
            <!-- Green Flags (Signaux Verts) -->
            <div class="p-5 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 space-y-3">
              <div class="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <span>🟢 Signaux d'Intérêt (Green Flags)</span>
              </div>
              <p class="text-xs text-emerald-200/80">
                Passez à l'étape suivante lorsque vous observez au moins 2 de ces réactions :
              </p>
              <ul class="space-y-2">
                ${currentStage.greenFlags.map(flag => `
                  <li class="flex items-start gap-2 text-xs text-slate-300">
                    <span class="text-emerald-400 font-bold mt-0.5">✓</span>
                    <span>${flag}</span>
                  </li>
                `).join("")}
              </ul>
            </div>

            <!-- Fatal Pitfall (Piège Fatal) -->
            <div class="p-5 rounded-2xl bg-rose-950/20 border border-rose-500/30 space-y-3 flex flex-col justify-between">
              <div class="space-y-2">
                <div class="flex items-center gap-2 text-rose-400 font-bold text-sm">
                  <span>⚠️ Le Piège Fatal de l'Étape</span>
                </div>
                <p class="text-xs sm:text-sm text-rose-200/90 leading-relaxed">
                  ${currentStage.fatalPitfall}
                </p>
              </div>

              <div class="pt-2 text-[11px] text-rose-400/80 font-medium">
                À éviter impérativement sous peine d'anéantir la tension ou de rompre la confiance.
              </div>
            </div>

          </div>

          <!-- Interactive Checklist & Codex Recommandations -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8">
            
            <!-- Checklist Auto-évaluation -->
            <div class="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
              <div class="flex items-center justify-between">
                <h5 class="text-xs uppercase tracking-wider font-bold text-amber-300 flex items-center gap-2">
                  <span>📋 Auto-évaluation de l'Étape</span>
                </h5>
                <span class="text-[11px] text-slate-400 font-medium">Cochez vos acquis</span>
              </div>

              <div class="space-y-2">
                ${currentStage.checklist.map((item, cIdx) => {
                  const checkKey = `stage_${currentStage.id}_item_${cIdx}`;
                  const isChecked = !!this.userProgress[checkKey];

                  return `
                    <label class="flex items-start gap-3 p-2.5 rounded-xl bg-slate-900 border border-slate-800/80 hover:border-amber-500/40 cursor-pointer transition-colors select-none">
                      <input 
                        type="checkbox" 
                        class="stage-checkbox mt-0.5 w-4 h-4 rounded text-amber-500 focus:ring-amber-400 border-slate-700 bg-slate-800 cursor-pointer"
                        data-key="${checkKey}"
                        ${isChecked ? "checked" : ""}
                      />
                      <span class="text-xs text-slate-300 leading-relaxed ${isChecked ? 'line-through text-slate-500' : ''}">
                        ${item}
                      </span>
                    </label>
                  `;
                }).join("")}
              </div>
            </div>

            <!-- Ouvrages Recommandés pour approfondir -->
            <div class="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
              <div class="flex items-center justify-between">
                <h5 class="text-xs uppercase tracking-wider font-bold text-amber-300 flex items-center gap-2">
                  <span>📖 Traités Clés pour cette Étape</span>
                </h5>
                <span class="text-[11px] text-slate-400">Analyses complètes</span>
              </div>

              <div class="space-y-2.5">
                ${relatedBooks.map(book => `
                  <div class="p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-amber-500/40 transition-all flex items-center justify-between gap-3">
                    <div class="min-w-0">
                      <h6 class="font-serif text-xs sm:text-sm font-bold text-slate-100 truncate">
                        ${book.title}
                      </h6>
                      <p class="text-[11px] text-slate-400 truncate">
                        ${book.author} — <em class="text-amber-400/90 not-italic">${book.badge}</em>
                      </p>
                    </div>
                    <button 
                      class="btn-open-book-from-stage px-3 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-semibold whitespace-nowrap transition-colors"
                      data-book-id="${book.id}"
                    >
                      Consulter →
                    </button>
                  </div>
                `).join("")}
              </div>
            </div>

          </div>

          <!-- Bottom Navigation Step Buttons -->
          <div class="mt-8 pt-6 border-t border-slate-800/90 flex items-center justify-between gap-4">
            <button 
              id="stage-prev-btn" 
              class="px-4 py-2.5 rounded-xl border border-slate-800 bg-slate-950 hover:bg-slate-900 text-slate-300 text-xs font-semibold transition-all flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
              ${this.currentStageIndex === 0 ? "disabled" : ""}
            >
              ← Étape précédente
            </button>

            <div class="text-xs text-slate-500 font-medium">
              Étape ${this.currentStageIndex + 1} sur ${SEDUCTION_STAGES.length}
            </div>

            <button 
              id="stage-next-btn" 
              class="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold shadow-lg shadow-amber-950/40 transition-all flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
              ${this.currentStageIndex === SEDUCTION_STAGES.length - 1 ? "disabled" : ""}
            >
              Étape suivante →
            </button>
          </div>

        </div>

      </div>
    `;

    this.attachEvents();
  }

  attachEvents() {
    // Stage navigation buttons on stepper
    this.container.querySelectorAll(".stage-nav-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const index = parseInt(btn.getAttribute("data-stage-index"), 10);
        this.setStage(index);
      });
    });

    // Prev / Next buttons
    const prevBtn = this.container.querySelector("#stage-prev-btn");
    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        if (this.currentStageIndex > 0) {
          this.setStage(this.currentStageIndex - 1);
        }
      });
    }

    const nextBtn = this.container.querySelector("#stage-next-btn");
    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        if (this.currentStageIndex < SEDUCTION_STAGES.length - 1) {
          this.setStage(this.currentStageIndex + 1);
        }
      });
    }

    // Checklist checkboxes
    this.container.querySelectorAll(".stage-checkbox").forEach(chk => {
      chk.addEventListener("change", (e) => {
        const key = chk.getAttribute("data-key");
        this.userProgress[key] = chk.checked;
        this.saveProgress();

        const textSpan = chk.nextElementSibling;
        if (textSpan) {
          if (chk.checked) {
            textSpan.classList.add("line-through", "text-slate-500");
          } else {
            textSpan.classList.remove("line-through", "text-slate-500");
          }
        }
        Toast.show(chk.checked ? "Acquis validé !" : "Acquis retiré");
      });
    });

    // Book triggers
    this.container.querySelectorAll(".btn-open-book-from-stage").forEach(btn => {
      btn.addEventListener("click", () => {
        const bookId = btn.getAttribute("data-book-id");
        if (this.onOpenBook) {
          this.onOpenBook(bookId);
        }
      });
    });
  }
}
