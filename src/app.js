/**
 * Seduction Codex - Application Controller
 * Gestion d'état, filtres dynamiques, persistance locale et navigation PWA
 */

import { BOOKS_DATA, CATEGORIES, PHILOSOPHY_FILTERS } from "./data/books.js";
import { createBookCard } from "./components/BookCard.js";
import { BookDetailModal } from "./components/BookDetailModal.js";
import { QuizModal } from "./components/QuizModal.js";
import { QuoteWidget } from "./components/QuoteWidget.js";
import { PwaInstallBanner } from "./components/PwaInstallBanner.js";
import { Toast } from "./components/Toast.js";
import { getIcon } from "./components/Icons.js";
import { StagesView } from "./components/StagesView.js";
import { JournalView } from "./components/JournalView.js";

class App {
  constructor() {
    this.books = BOOKS_DATA;
    this.selectedCategory = "Tous les ouvrages";
    this.selectedPhilosophy = "all";
    this.searchQuery = "";
    this.showOnlyBookmarks = false;
    this.bookmarks = this.loadBookmarks();

    // DOM Elements
    this.gridElement = document.getElementById("books-grid");
    this.categoryTabsContainer = document.getElementById("category-tabs");
    this.philosophyFiltersContainer = document.getElementById("philosophy-filters");
    this.searchInput = document.getElementById("search-input");
    this.searchClearBtn = document.getElementById("search-clear");
    this.booksCountBadge = document.getElementById("books-count-badge");
    this.bookmarkCountElements = document.querySelectorAll(".bookmark-count");
    this.connectionStatus = document.getElementById("connection-status");

    // Initialize Subcomponents
    this.detailModal = new BookDetailModal("modal-container", (bookId, isBookmarked) => {
      this.toggleBookmark(bookId, isBookmarked);
    });

    this.quizModal = new QuizModal("quiz-container", (bookId) => {
      this.openBookDetail(bookId);
    });

    this.quoteWidget = new QuoteWidget("quote-widget-container", (bookId) => {
      this.openBookDetail(bookId);
    });

    this.stagesView = new StagesView("stages-container", (bookId) => {
      this.openBookDetail(bookId);
    });

    this.journalView = new JournalView("journal-container");

    this.pwaBanner = new PwaInstallBanner("pwa-banner-container", "header-install-btn");

    this.init();
  }

  init() {
    this.renderCategoryTabs();
    this.renderPhilosophyFilters();
    this.renderBooks();
    this.updateBookmarkCounts();
    this.bindEvents();
    this.setupNetworkStatus();
    this.registerServiceWorker();
  }

  // --- Bookmarks Persistence ---
  loadBookmarks() {
    try {
      const saved = localStorage.getItem("seduction_codex_bookmarks");
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch (e) {
      return new Set();
    }
  }

  saveBookmarks() {
    try {
      localStorage.setItem("seduction_codex_bookmarks", JSON.stringify([...this.bookmarks]));
    } catch (e) {
      console.error("Failed to save bookmarks to localStorage", e);
    }
    this.updateBookmarkCounts();
  }

  toggleBookmark(bookId, forceState = null) {
    const newState = forceState !== null ? forceState : !this.bookmarks.has(bookId);
    if (newState) {
      this.bookmarks.add(bookId);
      Toast.show("Ouvrage ajouté à vos favoris");
    } else {
      this.bookmarks.delete(bookId);
      Toast.show("Ouvrage retiré de vos favoris");
    }
    this.saveBookmarks();
    this.renderBooks();
  }

  updateBookmarkCounts() {
    this.bookmarkCountElements.forEach(el => {
      el.textContent = this.bookmarks.size;
    });
  }

  // --- Rendering UI Filters ---
  renderCategoryTabs() {
    if (!this.categoryTabsContainer) return;

    this.categoryTabsContainer.innerHTML = CATEGORIES.map(cat => {
      const isSelected = this.selectedCategory === cat && !this.showOnlyBookmarks;
      let count = cat === "Tous les ouvrages" ? this.books.length : this.books.filter(b => b.category === cat).length;

      return `
        <button 
          data-category="${cat}"
          class="cat-tab-btn px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all whitespace-nowrap flex items-center gap-2 border ${
            isSelected 
              ? "bg-amber-500 text-slate-950 font-bold border-amber-400 shadow-lg shadow-amber-500/20" 
              : "bg-slate-900/80 text-slate-300 hover:text-white border-slate-800 hover:border-slate-700"
          }"
        >
          <span>${cat}</span>
          <span class="px-1.5 py-0.2 rounded-full text-[10px] ${isSelected ? 'bg-slate-950/20 text-slate-950' : 'bg-slate-800 text-slate-400'}">
            ${count}
          </span>
        </button>
      `;
    }).join("") + `
      <button 
        id="btn-filter-bookmarks"
        class="cat-tab-btn px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all whitespace-nowrap flex items-center gap-2 border ${
          this.showOnlyBookmarks 
            ? "bg-amber-500 text-slate-950 font-bold border-amber-400 shadow-lg shadow-amber-500/20" 
            : "bg-slate-900/80 text-slate-300 hover:text-white border-slate-800 hover:border-slate-700"
        }"
      >
        <span class="text-amber-400">★</span>
        <span>Mes Favoris</span>
        <span class="px-1.5 py-0.2 rounded-full text-[10px] ${this.showOnlyBookmarks ? 'bg-slate-950/20 text-slate-950' : 'bg-slate-800 text-slate-400'} bookmark-count">
          ${this.bookmarks.size}
        </span>
      </button>
    `;

    // Bind tab clicks
    this.categoryTabsContainer.querySelectorAll(".cat-tab-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        if (btn.id === "btn-filter-bookmarks") {
          this.showOnlyBookmarks = true;
        } else {
          this.showOnlyBookmarks = false;
          this.selectedCategory = btn.getAttribute("data-category");
        }
        this.renderCategoryTabs();
        this.renderBooks();
      });
    });
  }

  renderPhilosophyFilters() {
    if (!this.philosophyFiltersContainer) return;

    this.philosophyFiltersContainer.innerHTML = PHILOSOPHY_FILTERS.map(phil => {
      const isSelected = this.selectedPhilosophy === phil.id;
      return `
        <button 
          data-phil="${phil.id}"
          class="phil-filter-btn px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 border ${
            isSelected 
              ? "bg-slate-800 text-amber-300 border-amber-500/50 shadow-sm" 
              : "bg-slate-950/50 text-slate-400 hover:text-slate-200 border-slate-800/80 hover:border-slate-700"
          }"
        >
          <span>${phil.icon}</span>
          <span>${phil.label}</span>
        </button>
      `;
    }).join("");

    this.philosophyFiltersContainer.querySelectorAll(".phil-filter-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        this.selectedPhilosophy = btn.getAttribute("data-phil");
        this.renderPhilosophyFilters();
        this.renderBooks();
      });
    });
  }

  // --- Filtering Logic & Book Cards ---
  getFilteredBooks() {
    return this.books.filter(book => {
      // Bookmarks filter
      if (this.showOnlyBookmarks && !this.bookmarks.has(book.id)) {
        return false;
      }

      // Category filter
      if (!this.showOnlyBookmarks && this.selectedCategory !== "Tous les ouvrages" && book.category !== this.selectedCategory) {
        return false;
      }

      // Philosophy filter
      if (this.selectedPhilosophy !== "all" && book.philosophyType !== this.selectedPhilosophy) {
        return false;
      }

      // Realtime text search
      if (this.searchQuery.trim() !== "") {
        const q = this.searchQuery.toLowerCase().trim();
        const matchTitle = book.title.toLowerCase().includes(q);
        const matchAuthor = book.author.toLowerCase().includes(q);
        const matchSummary = book.summary.toLowerCase().includes(q);
        const matchBadge = book.badge.toLowerCase().includes(q);
        const matchTags = book.tags.some(t => t.toLowerCase().includes(q));
        const matchConcepts = book.keyConcepts.some(c => 
          c.title.toLowerCase().includes(q) || c.description.toLowerCase().includes(q)
        );

        if (!matchTitle && !matchAuthor && !matchSummary && !matchBadge && !matchTags && !matchConcepts) {
          return false;
        }
      }

      return true;
    });
  }

  renderBooks() {
    if (!this.gridElement) return;

    const filtered = this.getFilteredBooks();

    // Update count badge
    if (this.booksCountBadge) {
      if (this.showOnlyBookmarks) {
        this.booksCountBadge.textContent = `${filtered.length} favori${filtered.length > 1 ? "s" : ""}`;
      } else {
        this.booksCountBadge.textContent = `${filtered.length} ouvrage${filtered.length > 1 ? "s" : ""}`;
      }
    }

    if (filtered.length === 0) {
      this.gridElement.innerHTML = `
        <div class="col-span-full py-16 px-4 text-center rounded-3xl border border-dashed border-slate-800 bg-slate-900/40 backdrop-blur-sm space-y-4">
          <div class="w-14 h-14 mx-auto rounded-2xl bg-slate-800/80 flex items-center justify-center text-slate-400 text-2xl">
            📜
          </div>
          <div class="space-y-1">
            <h4 class="font-serif text-lg font-bold text-slate-200">Aucun manuscrit trouvé</h4>
            <p class="text-xs sm:text-sm text-slate-400 max-w-md mx-auto">
              ${this.showOnlyBookmarks 
                ? "Vous n'avez pas encore marqué d'ouvrages comme favoris. Cliquez sur le signet d'un livre pour l'enregistrer." 
                : "Aucun ouvrage ne correspond à vos critères de recherche ou de filtre."}
            </p>
          </div>
          <button id="btn-reset-filters" class="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-semibold shadow-md transition-colors active:scale-95">
            ${getIcon("refresh", "w-3.5 h-3.5")}
            <span>Réinitialiser les filtres</span>
          </button>
        </div>
      `;

      const resetBtn = this.gridElement.querySelector("#btn-reset-filters");
      if (resetBtn) {
        resetBtn.addEventListener("click", () => this.resetFilters());
      }
      return;
    }

    this.gridElement.innerHTML = "";
    filtered.forEach(book => {
      const isBookmarked = this.bookmarks.has(book.id);
      const card = createBookCard(book, isBookmarked);

      // Bookmark button on card
      const bookmarkBtn = card.querySelector(".btn-bookmark");
      if (bookmarkBtn) {
        bookmarkBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          this.toggleBookmark(book.id);
        });
      }

      // Open detail
      const detailBtn = card.querySelector(".btn-open-detail");
      if (detailBtn) {
        detailBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          this.openBookDetail(book.id);
        });
      }

      // Card general click
      card.addEventListener("click", () => {
        this.openBookDetail(book.id);
      });

      this.gridElement.appendChild(card);
    });
  }

  openBookDetail(bookId) {
    const book = this.books.find(b => b.id === bookId);
    if (book) {
      this.detailModal.open(book, this.bookmarks.has(book.id));
    }
  }

  resetFilters() {
    this.selectedCategory = "Tous les ouvrages";
    this.selectedPhilosophy = "all";
    this.searchQuery = "";
    this.showOnlyBookmarks = false;
    if (this.searchInput) this.searchInput.value = "";
    if (this.searchClearBtn) this.searchClearBtn.classList.add("hidden");
    this.renderCategoryTabs();
    this.renderPhilosophyFilters();
    this.renderBooks();
  }

  // --- Search & Global Events ---
  bindEvents() {
    // Search input
    if (this.searchInput) {
      this.searchInput.addEventListener("input", (e) => {
        this.searchQuery = e.target.value;
        if (this.searchClearBtn) {
          if (this.searchQuery.length > 0) {
            this.searchClearBtn.classList.remove("hidden");
          } else {
            this.searchClearBtn.classList.add("hidden");
          }
        }
        this.renderBooks();
      });

      if (this.searchClearBtn) {
        this.searchClearBtn.addEventListener("click", () => {
          this.searchInput.value = "";
          this.searchQuery = "";
          this.searchClearBtn.classList.add("hidden");
          this.renderBooks();
        });
      }
    }

    // Keyboard shortcut '/' to focus search
    window.addEventListener("keydown", (e) => {
      if (e.key === "/" && document.activeElement !== this.searchInput && !this.detailModal.currentBook && !this.quizModal.isOpen) {
        e.preventDefault();
        this.searchInput?.focus();
      }
    });

    // Quiz Launchers
    document.querySelectorAll(".btn-open-quiz").forEach(btn => {
      btn.addEventListener("click", () => {
        this.quizModal.open();
      });
    });

    // Navigation triggers (Header & Mobile Bottom Nav)
    document.querySelectorAll(".nav-link-explore").forEach(btn => {
      btn.addEventListener("click", () => {
        this.resetFilters();
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    });

    document.querySelectorAll(".nav-link-bookmarks").forEach(btn => {
      btn.addEventListener("click", () => {
        this.showOnlyBookmarks = true;
        this.renderCategoryTabs();
        this.renderBooks();
        window.scrollTo({ top: document.getElementById("catalogue-anchor")?.offsetTop - 80 || 0, behavior: "smooth" });
      });
    });

    document.querySelectorAll(".nav-link-stages").forEach(btn => {
      btn.addEventListener("click", () => {
        const el = document.getElementById("stages-section");
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      });
    });

    document.querySelectorAll(".nav-link-journal").forEach(btn => {
      btn.addEventListener("click", () => {
        const el = document.getElementById("journal-section");
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      });
    });

    document.querySelectorAll(".nav-link-manifesto").forEach(btn => {
      btn.addEventListener("click", () => {
        const el = document.getElementById("manifesto-section");
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      });
    });
  }

  // --- Network Online / Offline Detection ---
  setupNetworkStatus() {
    const updateStatus = () => {
      if (!this.connectionStatus) return;
      if (navigator.onLine) {
        this.connectionStatus.classList.add("hidden");
      } else {
        this.connectionStatus.classList.remove("hidden");
        this.connectionStatus.innerHTML = `
          <div class="bg-amber-500/20 border-b border-amber-500/30 text-amber-200 text-xs px-4 py-1.5 text-center font-medium flex items-center justify-center gap-2">
            <span class="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
            <span>Mode Hors-ligne actif — Consultation complète du Codex depuis le cache local</span>
          </div>
        `;
      }
    };

    window.addEventListener("online", () => {
      updateStatus();
      Toast.show("Connexion Internet rétablie");
    });

    window.addEventListener("offline", () => {
      updateStatus();
      Toast.show("Passage en mode hors-ligne. Le Codex reste 100% accessible.");
    });

    updateStatus();
  }

  // --- Service Worker Registration ---
  registerServiceWorker() {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker.register("./sw.js")
          .then(reg => {
            console.log("[PWA] Service Worker registered successfully, scope:", reg.scope);
          })
          .catch(err => {
            console.warn("[PWA] Service Worker registration failed:", err);
          });
      });
    }
  }
}

// Start application once DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  window.app = new App();
});
