/**
 * Seduction Codex - Fiche détaillée d'un ouvrage (Modal & Full Sheet)
 */

import { getIcon } from "./Icons.js";
import { Toast } from "./Toast.js";

export class BookDetailModal {
  constructor(containerId, onBookmarkToggle) {
    this.container = document.getElementById(containerId);
    this.onBookmarkToggle = onBookmarkToggle;
    this.currentBook = null;
    this.isBookmarked = false;
    this.activeTab = "synthese"; // "synthese" | "concepts" | "pratique" | "citations"

    this.init();
  }

  init() {
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.currentBook) {
        this.close();
      }
    });
  }

  open(book, isBookmarked = false) {
    this.currentBook = book;
    this.isBookmarked = isBookmarked;
    this.activeTab = "synthese";
    document.body.classList.add("overflow-hidden");
    this.render();
  }

  close() {
    this.currentBook = null;
    document.body.classList.remove("overflow-hidden");
    if (this.container) {
      this.container.innerHTML = "";
      this.container.classList.add("hidden");
    }
  }

  setTab(tabId) {
    this.activeTab = tabId;
    this.renderTabContent();
    this.updateTabButtons();
  }

  render() {
    if (!this.container || !this.currentBook) return;

    this.container.classList.remove("hidden");
    const book = this.currentBook;

    const philosophyStyles = {
      "Authenticité": "bg-emerald-950/60 text-emerald-300 border-emerald-700/50",
      "Stratégie": "bg-purple-950/60 text-purple-300 border-purple-700/50",
      "Philosophie": "bg-amber-950/60 text-amber-300 border-amber-700/50"
    };
    const philStyle = philosophyStyles[book.philosophyType] || "bg-slate-800 text-slate-300 border-slate-700";

    this.container.innerHTML = `
      <div id="modal-overlay" class="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
        <div class="relative w-full max-w-3xl max-h-[92vh] sm:max-h-[88vh] flex flex-col rounded-2xl sm:rounded-3xl border border-amber-500/30 bg-slate-900 shadow-2xl shadow-black overflow-hidden animate-slideUp">
          
          <!-- Top Decorative Glow -->
          <div class="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-amber-500 via-rose-500 to-amber-500 opacity-60"></div>
          
          <!-- Modal Header -->
          <div class="relative p-5 sm:p-7 border-b border-slate-800/90 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950">
            <div class="flex items-start justify-between gap-4 mb-2.5">
              <div class="flex flex-wrap items-center gap-2">
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${philStyle}">
                  ${book.philosophyType}
                </span>
                <span class="text-xs text-slate-400 font-medium px-2 py-0.5 rounded-full bg-slate-800 border border-slate-700/60">
                  ${book.year}
                </span>
                <span class="text-xs text-amber-400/90 font-serif italic">
                  ${book.badge}
                </span>
              </div>

              <div class="flex items-center gap-1.5 flex-shrink-0">
                <button 
                  id="modal-btn-bookmark" 
                  class="p-2 rounded-xl text-slate-400 hover:text-amber-400 hover:bg-slate-800 transition-colors"
                  title="${this.isBookmarked ? 'Retirer des favoris' : 'Ajouter aux favoris'}"
                >
                  ${this.isBookmarked ? getIcon("bookmark-filled", "w-5 h-5 text-amber-400") : getIcon("bookmark", "w-5 h-5")}
                </button>
                <button 
                  id="modal-btn-close" 
                  class="p-2 rounded-xl text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors"
                  title="Fermer (Échap)"
                >
                  ${getIcon("x", "w-5 h-5")}
                </button>
              </div>
            </div>

            <h2 class="font-serif text-xl sm:text-2xl md:text-3xl font-bold text-slate-100 tracking-tight leading-snug">
              ${book.title}
            </h2>
            <p class="text-sm sm:text-base text-amber-300 font-medium mt-1">
              ${book.author}
            </p>
            <p class="text-xs text-slate-400 uppercase tracking-wider font-semibold mt-1">
              ${book.category}
            </p>
          </div>

          <!-- Navigation Tabs -->
          <div class="flex border-b border-slate-800 bg-slate-950/60 px-4 sm:px-6 overflow-x-auto no-scrollbar">
            <button data-tab="synthese" class="tab-btn px-4 py-3 text-xs sm:text-sm font-medium transition-colors border-b-2 whitespace-nowrap ${this.activeTab === "synthese" ? "border-amber-400 text-amber-300 font-semibold" : "border-transparent text-slate-400 hover:text-slate-200"}">
              Synthèse de l'Œuvre
            </button>
            <button data-tab="concepts" class="tab-btn px-4 py-3 text-xs sm:text-sm font-medium transition-colors border-b-2 whitespace-nowrap ${this.activeTab === "concepts" ? "border-amber-400 text-amber-300 font-semibold" : "border-transparent text-slate-400 hover:text-slate-200"}">
              Concepts Clés (${book.keyConcepts.length})
            </button>
            <button data-tab="pratique" class="tab-btn px-4 py-3 text-xs sm:text-sm font-medium transition-colors border-b-2 whitespace-nowrap ${this.activeTab === "pratique" ? "border-amber-400 text-amber-300 font-semibold" : "border-transparent text-slate-400 hover:text-slate-200"}">
              Mises en Situation (${book.actionableTakeaways.length})
            </button>
            <button data-tab="citations" class="tab-btn px-4 py-3 text-xs sm:text-sm font-medium transition-colors border-b-2 whitespace-nowrap ${this.activeTab === "citations" ? "border-amber-400 text-amber-300 font-semibold" : "border-transparent text-slate-400 hover:text-slate-200"}">
              Citations (${book.memorableQuotes.length})
            </button>
          </div>

          <!-- Scrollable Tab Body -->
          <div id="modal-tab-body" class="p-5 sm:p-7 overflow-y-auto flex-1 space-y-6 text-slate-200">
            <!-- Rendered dynamically -->
          </div>

          <!-- Modal Footer with Tags -->
          <div class="p-4 sm:p-5 border-t border-slate-800/90 bg-slate-950 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div class="flex flex-wrap items-center gap-1.5">
              <span class="text-slate-400 font-medium">Mots-clés :</span>
              ${book.tags.map(t => `
                <span class="px-2 py-0.5 rounded-md bg-slate-800/80 text-slate-300 border border-slate-700/60 font-medium">
                  #${t}
                </span>
              `).join("")}
            </div>

            <div class="text-slate-400 italic">
              Appuyez sur <kbd class="px-1.5 py-0.5 text-[10px] font-mono bg-slate-800 border border-slate-700 rounded text-slate-300">Échap</kbd> pour fermer
            </div>
          </div>

        </div>
      </div>
    `;

    this.renderTabContent();
    this.attachEvents();
  }

  updateTabButtons() {
    const buttons = this.container.querySelectorAll(".tab-btn");
    buttons.forEach(btn => {
      const tab = btn.getAttribute("data-tab");
      if (tab === this.activeTab) {
        btn.className = "tab-btn px-4 py-3 text-xs sm:text-sm font-semibold transition-colors border-b-2 whitespace-nowrap border-amber-400 text-amber-300";
      } else {
        btn.className = "tab-btn px-4 py-3 text-xs sm:text-sm font-medium transition-colors border-b-2 whitespace-nowrap border-transparent text-slate-400 hover:text-slate-200";
      }
    });
  }

  renderTabContent() {
    const tabBody = this.container.querySelector("#modal-tab-body");
    if (!tabBody || !this.currentBook) return;

    const book = this.currentBook;

    if (this.activeTab === "synthese") {
      const paragraphs = book.summary.split("\n\n");
      tabBody.innerHTML = `
        <div class="space-y-4">
          <div class="p-4 rounded-xl bg-amber-500/5 border border-amber-500/20 text-xs sm:text-sm text-amber-200/90 leading-relaxed font-serif italic">
            ✦ Thèse centrale : ${book.badge} — Une perspective unique sur la dynamique du désir.
          </div>
          ${paragraphs.map(p => `
            <p class="text-sm sm:text-base leading-relaxed text-slate-300 font-normal">
              ${p}
            </p>
          `).join("")}
        </div>
      `;
    } else if (this.activeTab === "concepts") {
      tabBody.innerHTML = `
        <div class="grid grid-cols-1 gap-4">
          ${book.keyConcepts.map((c, idx) => `
            <div class="p-4 sm:p-5 rounded-xl border border-slate-800 bg-slate-950/60 hover:border-amber-500/30 transition-colors">
              <div class="flex items-center gap-2 mb-2">
                <span class="flex-shrink-0 w-6 h-6 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 font-serif font-bold text-xs flex items-center justify-center">
                  ${idx + 1}
                </span>
                <h4 class="font-serif text-base sm:text-lg font-bold text-slate-100">
                  ${c.title}
                </h4>
              </div>
              <p class="text-xs sm:text-sm text-slate-300 leading-relaxed pl-8">
                ${c.description}
              </p>
            </div>
          `).join("")}
        </div>
      `;
    } else if (this.activeTab === "pratique") {
      tabBody.innerHTML = `
        <div class="space-y-4">
          <div class="text-xs text-slate-400 font-medium">
            Mises en situation concrètes & applications dans la vie réelle :
          </div>
          ${book.actionableTakeaways.map((takeaway, idx) => `
            <div class="rounded-xl border border-slate-800 bg-slate-950/60 p-4 sm:p-5 space-y-3">
              <div class="flex items-center gap-2">
                <span class="text-amber-400 font-bold text-sm">#${idx + 1}</span>
                <h4 class="font-semibold text-sm sm:text-base text-slate-100">
                  ${takeaway.situation}
                </h4>
              </div>

              <!-- Practical Advice -->
              <div class="p-3 rounded-lg bg-emerald-950/30 border border-emerald-500/20 text-xs sm:text-sm text-emerald-200/90 leading-relaxed">
                <strong class="text-emerald-400 font-semibold block mb-1">💡 Conseil concret :</strong>
                ${takeaway.advice}
              </div>

              <!-- Trap to Avoid -->
              <div class="p-3 rounded-lg bg-rose-950/30 border border-rose-500/20 text-xs sm:text-sm text-rose-200/90 leading-relaxed">
                <strong class="text-rose-400 font-semibold block mb-1">⚠️ Le piège à éviter :</strong>
                ${takeaway.trapToAvoid}
              </div>
            </div>
          `).join("")}
        </div>
      `;
    } else if (this.activeTab === "citations") {
      tabBody.innerHTML = `
        <div class="space-y-4">
          <div class="text-xs text-slate-400 font-medium">
            Aphorismes et citations mémorables extraits de l'ouvrage :
          </div>
          ${book.memorableQuotes.map((quote, idx) => `
            <div class="relative p-5 rounded-xl border border-slate-800 bg-slate-950/70 group hover:border-amber-500/30 transition-all">
              <p class="font-serif italic text-base sm:text-lg text-slate-200 leading-relaxed pr-10">
                “${quote}”
              </p>
              <div class="mt-3 flex items-center justify-between pt-2 border-t border-slate-800/60">
                <span class="text-xs text-amber-400 font-medium">— ${book.author}</span>
                <button 
                  class="btn-copy-quote inline-flex items-center gap-1 text-xs text-slate-400 hover:text-amber-300 px-2 py-1 rounded bg-slate-800/60 hover:bg-slate-800 transition-colors"
                  data-quote="${quote.replace(/"/g, '&quot;')}"
                  data-author="${book.author}"
                  title="Copier la citation"
                >
                  ${getIcon("copy", "w-3.5 h-3.5")}
                  <span>Copier</span>
                </button>
              </div>
            </div>
          `).join("")}
        </div>
      `;

      // Attach copy listeners
      tabBody.querySelectorAll(".btn-copy-quote").forEach(btn => {
        btn.addEventListener("click", async () => {
          const q = btn.getAttribute("data-quote");
          const a = btn.getAttribute("data-author");
          const formatted = `"${q}" — ${a}`;
          try {
            await navigator.clipboard.writeText(formatted);
          } catch (e) {
            const ta = document.createElement("textarea");
            ta.value = formatted;
            document.body.appendChild(ta);
            ta.select();
            document.execCommand("copy");
            ta.remove();
          }
          Toast.show("Citation copiée dans le presse-papier !");
        });
      });
    }
  }

  attachEvents() {
    // Close button
    const closeBtn = this.container.querySelector("#modal-btn-close");
    if (closeBtn) {
      closeBtn.addEventListener("click", () => this.close());
    }

    // Bookmark button
    const bookmarkBtn = this.container.querySelector("#modal-btn-bookmark");
    if (bookmarkBtn) {
      bookmarkBtn.addEventListener("click", () => {
        this.isBookmarked = !this.isBookmarked;
        if (this.onBookmarkToggle) {
          this.onBookmarkToggle(this.currentBook.id, this.isBookmarked);
        }
        bookmarkBtn.innerHTML = this.isBookmarked 
          ? getIcon("bookmark-filled", "w-5 h-5 text-amber-400") 
          : getIcon("bookmark", "w-5 h-5");
        bookmarkBtn.title = this.isBookmarked ? 'Retirer des favoris' : 'Ajouter aux favoris';
        Toast.show(this.isBookmarked ? "Ajouté à vos favoris" : "Retiré de vos favoris");
      });
    }

    // Overlay click outside
    const overlay = this.container.querySelector("#modal-overlay");
    if (overlay) {
      overlay.addEventListener("click", (e) => {
        if (e.target === overlay) {
          this.close();
        }
      });
    }

    // Tab buttons
    const tabBtns = this.container.querySelectorAll(".tab-btn");
    tabBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        const tab = btn.getAttribute("data-tab");
        this.setTab(tab);
      });
    });
  }
}
