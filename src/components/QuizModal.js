/**
 * Seduction Codex - Quiz Interactif "Quel séducteur / quelle approche êtes-vous ?"
 */

import { QUIZ_QUESTIONS, ARCHETYPES } from "../data/quizData.js";
import { BOOKS_DATA } from "../data/books.js";
import { getIcon } from "./Icons.js";

export class QuizModal {
  constructor(containerId, onOpenBook) {
    this.container = document.getElementById(containerId);
    this.onOpenBook = onOpenBook;
    this.currentStep = 0; // 0 to 3 for questions, 4 for result
    this.answers = [];
    this.isOpen = false;

    this.init();
  }

  init() {
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.isOpen) {
        this.close();
      }
    });
  }

  open() {
    this.isOpen = true;
    this.currentStep = 0;
    this.answers = [];
    document.body.classList.add("overflow-hidden");
    this.render();
  }

  close() {
    this.isOpen = false;
    document.body.classList.remove("overflow-hidden");
    if (this.container) {
      this.container.innerHTML = "";
      this.container.classList.add("hidden");
    }
  }

  calculateResult() {
    const counts = {};
    this.answers.forEach(arch => {
      counts[arch] = (counts[arch] || 0) + 1;
    });

    let topArchetype = "radical-honest";
    let maxCount = -1;
    for (const [arch, count] of Object.entries(counts)) {
      if (count > maxCount) {
        maxCount = count;
        topArchetype = arch;
      }
    }

    return ARCHETYPES[topArchetype] || ARCHETYPES["radical-honest"];
  }

  render() {
    if (!this.container || !this.isOpen) return;

    this.container.classList.remove("hidden");

    if (this.currentStep < QUIZ_QUESTIONS.length) {
      this.renderQuestionStep();
    } else {
      this.renderResultStep();
    }
  }

  renderQuestionStep() {
    const q = QUIZ_QUESTIONS[this.currentStep];
    const progress = Math.round(((this.currentStep + 1) / QUIZ_QUESTIONS.length) * 100);

    this.container.innerHTML = `
      <div id="quiz-overlay" class="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
        <div class="relative w-full max-w-2xl flex flex-col rounded-2xl sm:rounded-3xl border border-amber-500/30 bg-slate-900 shadow-2xl shadow-black overflow-hidden animate-slideUp">
          
          <!-- Top Glow -->
          <div class="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-amber-500 via-rose-500 to-amber-500"></div>

          <!-- Header -->
          <div class="p-5 sm:p-6 border-b border-slate-800 bg-slate-950 flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="text-xl">🧭</span>
              <div>
                <h3 class="font-serif font-bold text-slate-100 text-sm sm:text-base">
                  Diagnostic de Tempérament
                </h3>
                <p class="text-xs text-amber-400 font-medium">Question ${this.currentStep + 1} sur ${QUIZ_QUESTIONS.length}</p>
              </div>
            </div>

            <button id="quiz-btn-close" class="p-2 rounded-xl text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors">
              ${getIcon("x", "w-5 h-5")}
            </button>
          </div>

          <!-- Progress Bar -->
          <div class="w-full bg-slate-800 h-1.5">
            <div class="bg-gradient-to-r from-amber-500 to-amber-300 h-1.5 transition-all duration-300" style="width: ${progress}%"></div>
          </div>

          <!-- Question Body -->
          <div class="p-6 sm:p-8 space-y-6">
            <h4 class="font-serif text-lg sm:text-xl md:text-2xl font-bold text-slate-100 leading-snug">
              ${q.question}
            </h4>

            <!-- Options -->
            <div class="space-y-3">
              ${q.options.map((opt, idx) => `
                <button 
                  class="quiz-option-btn w-full text-left p-4 rounded-xl border border-slate-800 bg-slate-950/60 hover:border-amber-500/50 hover:bg-slate-800/60 transition-all flex items-start gap-3.5 group active:scale-[0.99]"
                  data-archetype="${opt.archetype}"
                >
                  <span class="flex-shrink-0 w-7 h-7 rounded-lg bg-slate-800 group-hover:bg-amber-500/20 group-hover:text-amber-300 border border-slate-700 group-hover:border-amber-500/40 text-slate-300 text-xs font-semibold flex items-center justify-center transition-colors">
                    ${String.fromCharCode(65 + idx)}
                  </span>
                  <span class="text-xs sm:text-sm text-slate-200 group-hover:text-white leading-relaxed">
                    ${opt.text}
                  </span>
                </button>
              `).join("")}
            </div>
          </div>

          <!-- Footer with Back Navigation -->
          <div class="p-4 sm:p-5 border-t border-slate-800 bg-slate-950 flex items-center justify-between text-xs text-slate-400">
            ${this.currentStep > 0 ? `
              <button id="quiz-btn-prev" class="inline-flex items-center gap-1.5 text-slate-300 hover:text-amber-300 transition-colors font-medium">
                ← Question précédente
              </button>
            ` : `<span></span>`}
            <span class="italic">Sélectionnez la réponse qui résonne le plus</span>
          </div>

        </div>
      </div>
    `;

    this.attachQuestionEvents();
  }

  attachQuestionEvents() {
    const closeBtn = this.container.querySelector("#quiz-btn-close");
    if (closeBtn) closeBtn.addEventListener("click", () => this.close());

    const prevBtn = this.container.querySelector("#quiz-btn-prev");
    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        if (this.currentStep > 0) {
          this.currentStep--;
          this.answers.pop();
          this.render();
        }
      });
    }

    const optionBtns = this.container.querySelectorAll(".quiz-option-btn");
    optionBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        const archetype = btn.getAttribute("data-archetype");
        this.answers.push(archetype);
        this.currentStep++;
        this.render();
      });
    });

    const overlay = this.container.querySelector("#quiz-overlay");
    if (overlay) {
      overlay.addEventListener("click", (e) => {
        if (e.target === overlay) this.close();
      });
    }
  }

  renderResultStep() {
    const result = this.calculateResult();
    const recommendedBook = BOOKS_DATA.find(b => b.id === result.recommendedBookId);

    this.container.innerHTML = `
      <div id="quiz-overlay" class="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
        <div class="relative w-full max-w-2xl max-h-[90vh] flex flex-col rounded-2xl sm:rounded-3xl border border-amber-500/40 bg-slate-900 shadow-2xl shadow-black overflow-hidden animate-slideUp">
          
          <!-- Top Glow -->
          <div class="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-amber-500 via-rose-500 to-amber-400"></div>

          <!-- Header -->
          <div class="p-5 sm:p-6 border-b border-slate-800 bg-slate-950 flex items-center justify-between">
            <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-300 border border-amber-500/30">
              ✦ Votre Archétype Révélé
            </span>

            <button id="quiz-btn-close" class="p-2 rounded-xl text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors">
              ${getIcon("x", "w-5 h-5")}
            </button>
          </div>

          <!-- Body -->
          <div class="p-6 sm:p-8 overflow-y-auto space-y-6">
            <div class="text-center space-y-2">
              <span class="text-5xl inline-block mb-1">${result.icon}</span>
              <h3 class="font-serif text-2xl sm:text-3xl font-bold text-slate-100 tracking-tight">
                ${result.title}
              </h3>
              <p class="text-sm sm:text-base text-amber-400 font-medium">
                ${result.subtitle}
              </p>
            </div>

            <!-- Description -->
            <div class="p-4 sm:p-5 rounded-2xl bg-slate-950/70 border border-slate-800 text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
              ${result.description}
            </div>

            <!-- Strengths -->
            <div class="space-y-2">
              <h4 class="text-xs uppercase tracking-wider font-semibold text-amber-300">Vos Atouts Majeurs :</h4>
              <ul class="grid grid-cols-1 sm:grid-cols-3 gap-2">
                ${result.strengths.map(s => `
                  <li class="p-2.5 rounded-xl bg-slate-950 border border-slate-800/90 text-[11px] sm:text-xs text-slate-300 flex items-center gap-2">
                    <span class="text-emerald-400 font-bold">✓</span>
                    <span>${s}</span>
                  </li>
                `).join("")}
              </ul>
            </div>

            <!-- Pitfall -->
            <div class="p-3.5 rounded-xl bg-rose-950/30 border border-rose-500/30 text-xs sm:text-sm text-rose-200">
              <strong class="text-rose-400 font-semibold block mb-1">⚠️ Point de vigilance :</strong>
              ${result.pitfall}
            </div>

            <!-- Recommended Book Highlight -->
            ${recommendedBook ? `
              <div class="rounded-2xl border border-amber-500/30 bg-gradient-to-br from-amber-500/10 via-slate-950 to-slate-950 p-4 sm:p-5 space-y-3">
                <div class="flex items-center justify-between">
                  <span class="text-[11px] uppercase tracking-widest text-amber-400 font-semibold">Ouvrage Fondateur Recommandé :</span>
                  <span class="text-xs text-slate-400">${recommendedBook.year}</span>
                </div>
                <div>
                  <h5 class="font-serif text-base sm:text-lg font-bold text-slate-100">
                    ${recommendedBook.title}
                  </h5>
                  <p class="text-xs text-amber-300/90">Par ${recommendedBook.author} — <em class="text-slate-400 not-italic">${recommendedBook.badge}</em></p>
                </div>
                <button 
                  id="quiz-btn-view-book" 
                  data-book-id="${recommendedBook.id}"
                  class="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-semibold text-xs sm:text-sm shadow-lg shadow-amber-950/40 transition-all active:scale-98"
                >
                  <span>Explorer l'analyse complète de cet ouvrage</span>
                  <span>→</span>
                </button>
              </div>
            ` : ""}
          </div>

          <!-- Footer -->
          <div class="p-4 sm:p-5 border-t border-slate-800 bg-slate-950 flex items-center justify-between">
            <button id="quiz-btn-restart" class="text-xs font-medium text-slate-400 hover:text-amber-300 transition-colors inline-flex items-center gap-1.5">
              ${getIcon("refresh", "w-3.5 h-3.5")}
              <span>Refaire le diagnostic</span>
            </button>
            <button id="quiz-btn-finish" class="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition-colors">
              Fermer
            </button>
          </div>

        </div>
      </div>
    `;

    this.attachResultEvents();
  }

  attachResultEvents() {
    const closeBtn = this.container.querySelector("#quiz-btn-close");
    if (closeBtn) closeBtn.addEventListener("click", () => this.close());

    const finishBtn = this.container.querySelector("#quiz-btn-finish");
    if (finishBtn) finishBtn.addEventListener("click", () => this.close());

    const restartBtn = this.container.querySelector("#quiz-btn-restart");
    if (restartBtn) {
      restartBtn.addEventListener("click", () => {
        this.currentStep = 0;
        this.answers = [];
        this.render();
      });
    }

    const viewBookBtn = this.container.querySelector("#quiz-btn-view-book");
    if (viewBookBtn) {
      viewBookBtn.addEventListener("click", () => {
        const bookId = viewBookBtn.getAttribute("data-book-id");
        this.close();
        if (this.onOpenBook) {
          this.onOpenBook(bookId);
        }
      });
    }

    const overlay = this.container.querySelector("#quiz-overlay");
    if (overlay) {
      overlay.addEventListener("click", (e) => {
        if (e.target === overlay) this.close();
      });
    }
  }
}
