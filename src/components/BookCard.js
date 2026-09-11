/**
 * Seduction Codex - Carte d'ouvrage (BookCard)
 */

import { getIcon } from "./Icons.js";

export function createBookCard(book, isBookmarked = false) {
  // Philosophy badge styling
  const philosophyStyles = {
    "Authenticité": "bg-emerald-950/60 text-emerald-300 border-emerald-700/50",
    "Stratégie": "bg-purple-950/60 text-purple-300 border-purple-700/50",
    "Philosophie": "bg-amber-950/60 text-amber-300 border-amber-700/50"
  };

  const currentPhilStyle = philosophyStyles[book.philosophyType] || "bg-slate-800 text-slate-300 border-slate-700";

  // Trim summary preview
  const shortSummary = book.summary.split("\n\n")[0];
  const truncatedSummary = shortSummary.length > 210 ? shortSummary.slice(0, 207) + "..." : shortSummary;

  const card = document.createElement("article");
  card.className = "group relative flex flex-col justify-between rounded-2xl border border-slate-800/90 bg-gradient-to-b from-slate-900/90 to-slate-950/90 p-5 sm:p-6 shadow-lg shadow-black/30 hover:border-amber-500/40 hover:shadow-2xl hover:shadow-amber-950/20 transition-all duration-300 hover:-translate-y-1";
  card.setAttribute("data-book-id", book.id);

  card.innerHTML = `
    <!-- Top accent subtle glow line -->
    <div class="absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-amber-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

    <div>
      <!-- Header with Badges & Bookmark -->
      <div class="flex items-start justify-between gap-2 mb-3.5">
        <div class="flex flex-wrap items-center gap-1.5">
          <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium border ${currentPhilStyle}">
            ${book.philosophyType}
          </span>
          <span class="text-[11px] text-slate-400 font-medium px-2 py-0.5 rounded-full bg-slate-800/60 border border-slate-700/50">
            ${book.year}
          </span>
        </div>

        <button 
          class="btn-bookmark p-2 rounded-xl text-slate-400 hover:text-amber-400 hover:bg-slate-800/80 transition-colors focus:outline-none focus:ring-1 focus:ring-amber-500/50" 
          data-book-id="${book.id}"
          title="${isBookmarked ? 'Retirer des favoris' : 'Ajouter aux favoris'}"
          aria-label="${isBookmarked ? 'Retirer des favoris' : 'Ajouter aux favoris'}"
        >
          ${isBookmarked ? getIcon("bookmark-filled", "w-4 h-4 text-amber-400") : getIcon("bookmark", "w-4 h-4")}
        </button>
      </div>

      <!-- Title & Author -->
      <h3 class="font-serif text-lg sm:text-xl font-bold text-slate-100 group-hover:text-amber-200 transition-colors leading-snug tracking-tight mb-1">
        ${book.title}
      </h3>
      <p class="text-xs sm:text-sm font-medium text-amber-400/90 mb-3 flex items-center gap-1.5">
        <span>Par ${book.author}</span>
        <span class="text-slate-600">•</span>
        <span class="text-slate-400 text-xs">${book.badge}</span>
      </p>

      <!-- Category Label -->
      <p class="text-[11px] uppercase tracking-wider text-slate-400 font-semibold mb-3">
        ${book.category}
      </p>

      <!-- Summary snippet -->
      <p class="text-xs sm:text-sm text-slate-300/90 leading-relaxed line-clamp-3 mb-4 font-normal">
        ${truncatedSummary}
      </p>

      <!-- Key Concepts Highlights -->
      <div class="space-y-1.5 mb-5 pt-3 border-t border-slate-800/80">
        <span class="text-[11px] text-amber-300/80 uppercase tracking-widest font-semibold block">Concepts Clés :</span>
        <div class="flex flex-wrap gap-1.5">
          ${book.keyConcepts.slice(0, 2).map(c => `
            <span class="inline-block px-2 py-0.5 rounded text-[11px] font-medium bg-slate-800/90 text-slate-300 border border-slate-700/60">
              ✦ ${c.title}
            </span>
          `).join("")}
          ${book.keyConcepts.length > 2 ? `
            <span class="inline-block px-1.5 py-0.5 rounded text-[10px] font-medium text-slate-400">
              +${book.keyConcepts.length - 2} autres
            </span>
          ` : ""}
        </div>
      </div>
    </div>

    <!-- Card Action Footer -->
    <div class="pt-3 border-t border-slate-800/80 flex items-center justify-between mt-auto">
      <div class="flex flex-wrap gap-1">
        ${book.tags.slice(0, 2).map(t => `
          <span class="text-[10px] text-slate-400">#${t}</span>
        `).join(" ")}
      </div>

      <button 
        class="btn-open-detail inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400 group-hover:text-amber-300 transition-colors py-1 px-2 rounded-lg hover:bg-amber-500/10 active:scale-95"
        data-book-id="${book.id}"
      >
        <span>Consulter l'analyse</span>
        <span class="transform group-hover:translate-x-1 transition-transform">→</span>
      </button>
    </div>
  `;

  return card;
}
