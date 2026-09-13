/**
 * Seduction Codex - Application Controller (App Router & State Manager)
 * Architecture Native-like SPA : Navigation par écrans/onglets sans scroll de page
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
    this.activeView = "catalogue"; // "catalogue" | "stages" | "journal" | "quiz" | "bookmarks" | "manifesto"
    this.bookmarks = this.loadBookmarks();

    // DOM Elements
    this.viewport = document.getElementById("app-viewport");
    this.gridElement = document.getElementById("books-grid");
    this.bookmarksGrid = document.getElementById("bookmarks-grid");
    this.categoryTabsContainer = document.getElementById("category-tabs");
    this.philosophyFiltersContainer = document.getElementById("philosophy-filters");
    this.searchInput = document.getElementById("search-input");
    this.searchClearBtn = document.getElementById("search-clear");
    this.booksCountBadge = document.getElementById("books-count-badge");
    this.bookmarkCountElements = document.querySelectorAll(".bookmark-count");
    this.activeScreenLabel = document.getElementById("active-screen-label");
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
    this.renderBookmarksView();
    this.updateBookmarkCounts();
    this.bindEvents();
    this.setupNetworkStatus();
    this.registerServiceWorker();

    // Check URL Hash for direct screen routing
    const initialHash = window.location.hash.replace("#", "").trim();
    const validViews = ["catalogue", "stages", "journal", "quiz", "bookmarks", "manifesto"];
    if (validViews.includes(initialHash)) {
      this.switchView(initialHash);
    } else {
      this.switchView("catalogue");
    }

    // Handle browser back/forward gestures
    window.addEventListener("hashchange", () => {
      const hash = window.location.hash.replace("#", "").trim();
      if (validViews.includes(hash) && hash !== this.activeView) {
        this.switchView(hash, false);
      }
    });
  }

  // --- NATIVE-LIKE SCREEN ROUTER ---
  switchView(viewName, updateHash = true) {
    this.activeView = viewName;

    // View labels mapping
    const labels = {
      catalogue: "Catalogue",
      stages: "Les 5 Étapes",
      journal: "Carnet Secret",
      quiz: "Quiz d'Archétype",
      bookmarks: "Mes Favoris",
      manifesto: "Vision & Piliers"
    };

    if (this.activeScreenLabel) {
      this.activeScreenLabel.textContent = labels[viewName] || "Catalogue";
    }

    // Hide all screens, show current screen
    document.querySelectorAll(".app-screen").forEach(screen => {
      screen.classList.add("hidden");
    });

    const targetScreen = document.getElementById(`view-${viewName}`);
    if (targetScreen) {
      targetScreen.classList.remove("hidden");
    }

    // Reset contained viewport scroll to top
    if (this.viewport) {
      this.viewport.scrollTop = 0;
    }

    // Update Desktop Nav Tabs styling
    document.querySelectorAll(".nav-tab").forEach(tab => {
      const tabView = tab.getAttribute("data-view");
      if (tabView === viewName) {
        tab.className = "nav-switch-btn nav-tab px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm";
      } else {
        tab.className = "nav-switch-btn nav-tab px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 text-slate-400 hover:text-slate-200 hover:bg-slate-800/40";
      }
    });

    // Update Mobile Bottom Nav Tabs styling
    document.querySelectorAll(".mobile-tab").forEach(tab => {
      const tabView = tab.getAttribute("data-view");
      if (tabView === viewName) {
        tab.className = "nav-switch-btn mobile-tab flex flex-col items-center gap-1 py-1 px-2 rounded-xl transition-all text-amber-400 font-bold bg-amber-500/10";
      } else {
        tab.className = "nav-switch-btn mobile-tab flex flex-col items-center gap-1 py-1 px-2 rounded-xl transition-all text-slate-400 hover:text-slate-200";
      }
    });

    // Screen specific refreshes
    if (viewName === "bookmarks") {
      this.renderBookmarksView();
    } else if (viewName === "stages") {
      this.stagesView.render();
    } else if (viewName === "journal") {
      this.journalView.render();
    }

    // Update URL hash without scrolling
    if (updateHash && window.location.hash !== `#${viewName}`) {
      window.history.pushState(null, "", `#${viewName}`);
    }
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
      console.error("Failed to save bookmarks", e);
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
    this.renderBookmarksView();
  }

  updateBookmarkCounts() {
    this.bookmarkCountElements.forEach(el => {
      el.textContent = this.bookmarks.size;
    });
  }

  // --- Rendering UI Filters & Catalogue ---
  renderCategoryTabs() {
    if (!this.categoryTabsContainer) return;

    this.categoryTabsContainer.innerHTML = CATEGORIES.map(cat => {
      const isSelected = this.selectedCategory === cat;
      let count = cat === "Tous les ouvrages" ? this.books.length : this.books.filter(b => b.category === cat).length;

      return `
        <button 
          data-category="${cat}"
          class="cat-tab-btn px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all whitespace-nowrap flex items-center gap-1.5 border ${
            isSelected 
              ? "bg-amber-500 text-slate-950 font-bold border-amber-400 shadow-md" 
              : "bg-slate-900/80 text-slate-300 hover:text-white border-slate-800 hover:border-slate-700"
          }"
        >
          <span>${cat}</span>
          <span class="px-1.5 py-0.1 rounded-full text-[10px] ${isSelected ? 'bg-slate-950/20 text-slate-950' : 'bg-slate-800 text-slate-400'}">
            ${count}
          </span>
        </button>
      `;
    }).join("");

    this.categoryTabsContainer.querySelectorAll(".cat-tab-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        this.selectedCategory = btn.getAttribute("data-category");
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

  getFilteredBooks() {
    return this.books.filter(book => {
      // Category filter
      if (this.selectedCategory !== "Tous les ouvrages" && book.category !== this.selectedCategory) {
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

    if (this.booksCountBadge) {
      this.booksCountBadge.textContent = `${filtered.length} ouvrage${filtered.length > 1 ? "s" : ""}`;
    }

    if (filtered.length === 0) {
      this.gridElement.innerHTML = `
        <div class="col-span-full py-16 px-4 text-center rounded-2xl border border-dashed border-slate-800 bg-slate-900/40 space-y-3">
          <span class="text-3xl block">📜</span>
          <h4 class="font-serif text-lg font-bold text-slate-200">Aucun manuscrit trouvé</h4>
          <p class="text-xs sm:text-sm text-slate-400 max-w-md mx-auto">
            Aucun ouvrage ne correspond à vos critères de recherche.
          </p>
          <button id="btn-reset-filters" class="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-semibold shadow transition-colors">
            Réinitialiser les filtres
          </button>
        </div>
      `;

      const resetBtn = this.gridElement.querySelector("#btn-reset-filters");
      if (resetBtn) resetBtn.addEventListener("click", () => this.resetFilters());
      return;
    }

    this.gridElement.innerHTML = "";
    filtered.forEach(book => {
      const card = this.createCardElement(book);
      this.gridElement.appendChild(card);
    });
  }

  renderBookmarksView() {
    if (!this.bookmarksGrid) return;

    const bookmarkedBooks = this.books.filter(b => this.bookmarks.has(b.id));

    if (bookmarkedBooks.length === 0) {
      this.bookmarksGrid.innerHTML = `
        <div class="col-span-full py-16 px-4 text-center rounded-3xl border border-dashed border-slate-800 bg-slate-900/40 space-y-4">
          <span class="text-4xl block">⭐</span>
          <div class="space-y-1">
            <h4 class="font-serif text-xl font-bold text-slate-200">Aucun favori pour le moment</h4>
            <p class="text-xs sm:text-sm text-slate-400 max-w-md mx-auto">
              Parcourez le catalogue et cliquez sur le signet d'un livre pour l'ajouter à vos favoris et le retrouver ici en un clic.
            </p>
          </div>
          <button class="nav-switch-btn px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold" data-view="catalogue">
            Parcourir les 8 Ouvrages
          </button>
        </div>
      `;
      this.bookmarksGrid.querySelectorAll(".nav-switch-btn").forEach(btn => {
        btn.addEventListener("click", () => this.switchView("catalogue"));
      });
      return;
    }

    this.bookmarksGrid.innerHTML = "";
    bookmarkedBooks.forEach(book => {
      const card = this.createCardElement(book);
      this.bookmarksGrid.appendChild(card);
    });
  }

  createCardElement(book) {
    const isBookmarked = this.bookmarks.has(book.id);
    const card = createBookCard(book, isBookmarked);

    const bookmarkBtn = card.querySelector(".btn-bookmark");
    if (bookmarkBtn) {
      bookmarkBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        this.toggleBookmark(book.id);
      });
    }

    const detailBtn = card.querySelector(".btn-open-detail");
    if (detailBtn) {
      detailBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        this.openBookDetail(book.id);
      });
    }

    card.addEventListener("click", () => {
      this.openBookDetail(book.id);
    });

    return card;
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
    if (this.searchInput) this.searchInput.value = "";
    if (this.searchClearBtn) this.searchClearBtn.classList.add("hidden");
    this.renderCategoryTabs();
    this.renderPhilosophyFilters();
    this.renderBooks();
  }

  // --- Event Bindings ---
  bindEvents() {
    // Screen Switch Buttons (Tabs, Header, Shortcuts)
    document.addEventListener("click", (e) => {
      const switchBtn = e.target.closest(".nav-switch-btn");
      if (switchBtn) {
        const targetView = switchBtn.getAttribute("data-view");
        if (targetView) {
          this.switchView(targetView);
        }
      }
    });

    // Quiz triggers
    document.querySelectorAll(".btn-open-quiz").forEach(btn => {
      btn.addEventListener("click", () => {
        this.quizModal.open();
      });
    });

    const quizScreenLaunchBtn = document.getElementById("btn-launch-quiz-screen");
    if (quizScreenLaunchBtn) {
      quizScreenLaunchBtn.addEventListener("click", () => {
        this.quizModal.open();
      });
    }

    // Search Input
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

    // Global shortcut '/' to focus search in catalogue
    window.addEventListener("keydown", (e) => {
      if (e.key === "/" && document.activeElement !== this.searchInput && !this.detailModal.currentBook && !this.quizModal.isOpen) {
        e.preventDefault();
        this.switchView("catalogue");
        setTimeout(() => this.searchInput?.focus(), 50);
      }
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
            <span>Mode Hors-ligne actif — Consultation complète depuis le cache local</span>
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
            console.log("[PWA] Service Worker actif, scope:", reg.scope);
          })
          .catch(err => {
            console.warn("[PWA] Erreur enregistrement Service Worker:", err);
          });
      });
    }
  }
}

// Start application once DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  window.app = new App();
});
