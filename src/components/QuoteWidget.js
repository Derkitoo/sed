/**
 * Seduction Codex - Widget interactif "Citation du Jour"
 */

import { BOOKS_DATA } from "../data/books.js";
import { getIcon } from "./Icons.js";
import { Toast } from "./Toast.js";

export class QuoteWidget {
  constructor(containerId, onOpenBook) {
    this.container = document.getElementById(containerId);
    this.onOpenBook = onOpenBook;
    
    // Collect all quotes with their parent book reference
    this.allQuotes = [];
    BOOKS_DATA.forEach(book => {
      book.memorableQuotes.forEach(quote => {
        this.allQuotes.push({
          quote,
          bookId: book.id,
          bookTitle: book.title,
          author: book.author,
          category: book.category,
          philosophyType: book.philosophyType
        });
      });
    });

    this.currentQuote = this.getDailyQuote();
    this.render();
  }

  getDailyQuote() {
    if (this.allQuotes.length === 0) return null;
    const now = new Date();
    // Unique seed for each calendar day
    const daySeed = now.getFullYear() * 1000 + (now.getMonth() + 1) * 31 + now.getDate();
    const index = daySeed % this.allQuotes.length;
    return this.allQuotes[index];
  }

  getRandomQuote() {
    if (this.allQuotes.length <= 1) return this.currentQuote;
    let nextIndex;
    do {
      nextIndex = Math.floor(Math.random() * this.allQuotes.length);
    } while (this.allQuotes[nextIndex].quote === this.currentQuote.quote);
    return this.allQuotes[nextIndex];
  }

  render() {
    if (!this.container || !this.currentQuote) return;

    this.container.innerHTML = `
      <div class="relative overflow-hidden rounded-2xl border border-amber-500/20 bg-gradient-to-br from-slate-900/90 via-slate-900/70 to-rose-950/20 p-5 sm:p-7 shadow-xl shadow-black/40 backdrop-blur-sm transition-all duration-300">
        <!-- Subtle luxury decorative elements -->
        <div class="absolute -top-10 -right-10 w-44 h-44 rounded-full bg-amber-500/5 blur-3xl pointer-events-none"></div>
        <div class="absolute -bottom-10 -left-10 w-44 h-44 rounded-full bg-rose-500/5 blur-3xl pointer-events-none"></div>
        
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-800/80">
          <div class="flex items-center gap-2">
            <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-amber-500/10 text-amber-300 border border-amber-500/30">
              <span class="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
              Aphorisme du Jour
            </span>
            <span class="text-xs text-slate-400 hidden sm:inline">• Réactualisé quotidiennement</span>
          </div>

          <div class="flex items-center gap-2 self-end sm:self-auto">
            <button id="btn-quote-shuffle" title="Tirer une autre citation au sort" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-amber-200 bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 transition-all active:scale-95">
              ${getIcon("refresh", "w-3.5 h-3.5")}
              <span>Tirer au sort</span>
            </button>
            <button id="btn-quote-copy" title="Copier cette citation" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-amber-200 bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 transition-all active:scale-95">
              ${getIcon("copy", "w-3.5 h-3.5")}
              <span>Copier</span>
            </button>
          </div>
        </div>

        <div class="relative pl-6 sm:pl-8 pr-2 py-1">
          <!-- Big stylized quote mark -->
          <span class="absolute left-0 top-0 text-amber-500/25 font-serif text-5xl sm:text-6xl select-none leading-none">“</span>
          
          <p id="quote-text" class="font-serif italic text-base sm:text-lg md:text-xl text-slate-100 leading-relaxed tracking-wide">
            ${this.currentQuote.quote}
          </p>

          <div class="mt-4 flex flex-wrap items-center justify-between gap-3 pt-2">
            <div class="flex flex-col">
              <span class="text-sm font-semibold text-amber-300 font-serif">
                ${this.currentQuote.author}
              </span>
              <span class="text-xs text-slate-400">
                Extrait de <em class="text-slate-300 not-italic font-medium">« ${this.currentQuote.bookTitle} »</em>
              </span>
            </div>

            <button id="btn-quote-view-book" data-book-id="${this.currentQuote.bookId}" class="inline-flex items-center gap-1.5 text-xs font-medium text-amber-400 hover:text-amber-300 group transition-colors">
              <span>Découvrir l'ouvrage</span>
              <span class="transform group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </div>
        </div>
      </div>
    `;

    this.attachEvents();
  }

  attachEvents() {
    const shuffleBtn = this.container.querySelector("#btn-quote-shuffle");
    if (shuffleBtn) {
      shuffleBtn.addEventListener("click", () => {
        this.currentQuote = this.getRandomQuote();
        this.render();
        Toast.show("Nouvelle citation tirée du Codex");
      });
    }

    const copyBtn = this.container.querySelector("#btn-quote-copy");
    if (copyBtn) {
      copyBtn.addEventListener("click", async () => {
        const textToCopy = `"${this.currentQuote.quote}" — ${this.currentQuote.author} (${this.currentQuote.bookTitle})`;
        try {
          await navigator.clipboard.writeText(textToCopy);
          Toast.show("Citation copiée dans le presse-papier !");
        } catch (e) {
          // Fallback
          const ta = document.createElement("textarea");
          ta.value = textToCopy;
          document.body.appendChild(ta);
          ta.select();
          document.execCommand("copy");
          ta.remove();
          Toast.show("Citation copiée dans le presse-papier !");
        }
      });
    }

    const viewBookBtn = this.container.querySelector("#btn-quote-view-book");
    if (viewBookBtn) {
      viewBookBtn.addEventListener("click", () => {
        if (this.onOpenBook) {
          this.onOpenBook(this.currentQuote.bookId);
        }
      });
    }
  }
}
