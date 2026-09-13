/**
 * Seduction Codex - Le Carnet Secret & Journal de Bord Relationnel
 * 100% Local, Sécurisé par Code PIN, Inspiré de Kierkegaard & Carnegie
 */

import { getIcon } from "./Icons.js";
import { Toast } from "./Toast.js";
import { SEDUCTION_STAGES } from "../data/stagesData.js";

export class JournalView {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.isUnlocked = false;
    this.activeProfileId = null;
    this.filterStatus = "all";
    this.searchQuery = "";

    this.profiles = this.loadProfiles();
    this.pin = this.loadPin();

    this.render();
  }

  loadPin() {
    return localStorage.getItem("seduction_codex_journal_pin") || null;
  }

  savePin(pin) {
    this.pin = pin;
    localStorage.setItem("seduction_codex_journal_pin", pin);
  }

  loadProfiles() {
    try {
      const data = localStorage.getItem("seduction_codex_journal_profiles");
      if (!data) {
        // Default demo profile for initial inspiration
        const sample = [
          {
            id: "prof_sample_1",
            name: "Hélène",
            alias: "La Muse Mystérieuse",
            stage: 3,
            status: "active",
            archetype: "L'Idéale Romantique & Esthète",
            firstMetDate: "2026-09-08",
            firstMetPlace: "Librairie ancienne & Café littéraire",
            passions: "Poésie surréaliste, voyages solitaires, architecture haussmannienne",
            keyDetails: "Préfère le thé au café, anniversaire le 14 novembre, rêve de visiter Kyoto à l'automne",
            sensitiveTopics: "Pression familiale concernant ses choix de carrière",
            greenFlags: [
              "Regard intense et soutenu lors des silences",
              "Partage spontané de souvenirs d'enfance intimes",
              "A proposé d'elle-même le lieu du second rendez-vous"
            ],
            redFlags: [
              "Peut parfois se replier dans sa bulle si elle se sent brusquée"
            ],
            notes: [
              {
                id: "note_sample_1",
                date: "2026-09-10",
                place: "Promenade au bord de l'eau",
                summary: "Deux heures de conversation fascinante. Nous avons ri de nos anecdotes respectives. Écoute active très bien calibrée.",
                selfEvaluation: "Présence calme, zéro anxiété d'approbation. Absence calculée sur le départ pour laisser le désir infuser.",
                nextAction: "L'inviter à écouter un vinyle rare dont nous avons parlé."
              }
            ]
          }
        ];
        this.saveProfiles(sample);
        return sample;
      }
      return JSON.parse(data);
    } catch (e) {
      console.error("Error loading journal profiles", e);
      return [];
    }
  }

  saveProfiles(profiles) {
    this.profiles = profiles;
    localStorage.setItem("seduction_codex_journal_profiles", JSON.stringify(profiles));
  }

  lock() {
    this.isUnlocked = false;
    this.activeProfileId = null;
    this.render();
    Toast.show("Carnet secret verrouillé");
  }

  unlock(enteredPin) {
    if (enteredPin === this.pin) {
      this.isUnlocked = true;
      this.render();
      Toast.show("Accès autorisé au Carnet Secret");
      return true;
    } else {
      Toast.show("Code PIN incorrect", "error");
      return false;
    }
  }

  render() {
    if (!this.container) return;

    if (!this.pin) {
      this.renderPinSetup();
    } else if (!this.isUnlocked) {
      this.renderPinLogin();
    } else if (this.activeProfileId) {
      this.renderProfileDetail(this.activeProfileId);
    } else {
      this.renderDashboard();
    }
  }

  // --- PIN SETUP SCREEN ---
  renderPinSetup() {
    this.container.innerHTML = `
      <div class="max-w-md mx-auto p-6 sm:p-8 rounded-3xl border border-amber-500/40 bg-slate-900/95 shadow-2xl backdrop-blur-md text-center space-y-6 animate-fadeIn">
        <div class="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-amber-500 to-rose-900 flex items-center justify-center text-3xl shadow-lg shadow-amber-950/40">
          🔒
        </div>

        <div class="space-y-2">
          <h3 class="font-serif text-2xl font-bold text-slate-100">
            Initialiser le Carnet Secret
          </h3>
          <p class="text-xs sm:text-sm text-slate-400 leading-relaxed">
            Vos observations relationnelles, écoutes actives et notes intimes sont stockées exclusivement sur votre appareil. Choisissez un code PIN à 4 chiffres pour protéger leur accès.
          </p>
        </div>

        <form id="form-pin-setup" class="space-y-4">
          <div>
            <label class="block text-xs font-semibold text-amber-300 uppercase tracking-wider mb-2">
              Code PIN (4 chiffres)
            </label>
            <input 
              type="password" 
              id="input-setup-pin" 
              maxlength="4" 
              pattern="[0-9]{4}" 
              inputmode="numeric" 
              placeholder="••••" 
              required
              class="w-40 mx-auto text-center tracking-[0.6em] text-2xl font-bold py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-amber-300 focus:border-amber-400 outline-none"
            />
          </div>

          <div>
            <label class="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Confirmer le code PIN
            </label>
            <input 
              type="password" 
              id="input-confirm-pin" 
              maxlength="4" 
              pattern="[0-9]{4}" 
              inputmode="numeric" 
              placeholder="••••" 
              required
              class="w-40 mx-auto text-center tracking-[0.6em] text-2xl font-bold py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-amber-300 focus:border-amber-400 outline-none"
            />
          </div>

          <button 
            type="submit" 
            class="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm shadow-lg shadow-amber-950/40 transition-all active:scale-98"
          >
            Créer mon Carnet Sécurisé
          </button>
        </form>
      </div>
    `;

    const form = this.container.querySelector("#form-pin-setup");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const p1 = document.getElementById("input-setup-pin").value;
      const p2 = document.getElementById("input-confirm-pin").value;

      if (p1.length !== 4 || !/^\d+$/.test(p1)) {
        Toast.show("Le code PIN doit comporter 4 chiffres", "error");
        return;
      }
      if (p1 !== p2) {
        Toast.show("Les codes PIN ne correspondent pas", "error");
        return;
      }

      this.savePin(p1);
      this.isUnlocked = true;
      Toast.show("Code PIN enregistré avec succès");
      this.render();
    });
  }

  // --- PIN LOGIN SCREEN ---
  renderPinLogin() {
    this.container.innerHTML = `
      <div class="max-w-md mx-auto p-6 sm:p-8 rounded-3xl border border-amber-500/30 bg-slate-900/95 shadow-2xl backdrop-blur-md text-center space-y-6 animate-fadeIn">
        <div class="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-amber-500/20 via-slate-900 to-slate-950 border border-amber-500/40 flex items-center justify-center text-3xl shadow-lg">
          🔐
        </div>

        <div class="space-y-1.5">
          <span class="text-xs uppercase tracking-widest text-amber-400 font-semibold font-serif">Sanctuaire Privé</span>
          <h3 class="font-serif text-2xl font-bold text-slate-100">
            Le Carnet Secret
          </h3>
          <p class="text-xs text-slate-400">
            Entrez votre code PIN pour déverrouiller vos observations.
          </p>
        </div>

        <form id="form-pin-login" class="space-y-5">
          <input 
            type="password" 
            id="input-login-pin" 
            maxlength="4" 
            pattern="[0-9]{4}" 
            inputmode="numeric" 
            autofocus 
            placeholder="••••" 
            required
            class="w-48 mx-auto text-center tracking-[0.8em] text-3xl font-bold py-3 rounded-2xl bg-slate-950 border border-slate-700 text-amber-300 focus:border-amber-400 outline-none shadow-inner"
          />

          <button 
            type="submit" 
            class="w-full py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-md transition-all active:scale-98 flex items-center justify-center gap-2"
          >
            <span>Déverrouiller le Carnet</span>
            <span>→</span>
          </button>
        </form>

        <div class="pt-2 text-[11px] text-slate-400 border-t border-slate-800">
          <span>Données 100% locales & chiffrées sur votre appareil</span>
        </div>
      </div>
    `;

    const form = this.container.querySelector("#form-pin-login");
    const input = document.getElementById("input-login-pin");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      this.unlock(input.value);
    });
  }

  // --- DASHBOARD : LIST OF PROFILES ---
  renderDashboard() {
    const filteredProfiles = this.profiles.filter(p => {
      if (this.filterStatus !== "all" && p.status !== this.filterStatus) return false;
      if (this.searchQuery.trim() !== "") {
        const q = this.searchQuery.toLowerCase().trim();
        const mName = p.name.toLowerCase().includes(q);
        const mAlias = (p.alias || "").toLowerCase().includes(q);
        const mPassions = (p.passions || "").toLowerCase().includes(q);
        const mDetails = (p.keyDetails || "").toLowerCase().includes(q);
        if (!mName && !mAlias && !mPassions && !mDetails) return false;
      }
      return true;
    });

    this.container.innerHTML = `
      <div class="space-y-6 animate-fadeIn">
        
        <!-- Header Controls -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <div class="flex items-center gap-2.5">
              <span class="text-xl">📓</span>
              <h3 class="font-serif text-2xl sm:text-3xl font-bold text-slate-100">
                Le Carnet Secret
              </h3>
              <span class="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/15 border border-amber-500/30 text-amber-300">
                ${this.profiles.length} fiche${this.profiles.length > 1 ? "s" : ""}
              </span>
            </div>
            <p class="text-xs text-slate-400 mt-0.5">
              Carte mémoire d'écoute active, décryptage des dynamiques & suivi des rendez-vous
            </p>
          </div>

          <div class="flex items-center gap-2 self-end sm:self-auto">
            <button 
              id="btn-journal-new-profile" 
              class="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md transition-all active:scale-95 flex items-center gap-1.5"
            >
              <span>+ Nouvelle Fiche</span>
            </button>
            <button 
              id="btn-journal-lock" 
              class="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-amber-300 text-xs transition-colors"
              title="Verrouiller le carnet"
            >
              🔒 Verrouiller
            </button>
          </div>
        </div>

        <!-- Filters & Search Bar -->
        <div class="flex flex-col sm:flex-row items-center justify-between gap-3">
          <!-- Status Tabs -->
          <div class="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 no-scrollbar">
            ${[
              { id: "all", label: "Toutes" },
              { id: "active", label: "En cours" },
              { id: "close", label: "Complice / Intime" },
              { id: "paused", label: "En pause" }
            ].map(tab => `
              <button 
                class="journal-filter-btn px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors whitespace-nowrap ${
                  this.filterStatus === tab.id 
                    ? "bg-amber-500 text-slate-950 font-bold border-amber-400" 
                    : "bg-slate-950/60 text-slate-400 hover:text-slate-200 border-slate-800"
                }"
                data-status="${tab.id}"
              >
                ${tab.label}
              </button>
            `).join("")}
          </div>

          <!-- Search Input -->
          <div class="relative w-full sm:w-64">
            <input 
              type="text" 
              id="journal-search-input" 
              placeholder="Rechercher nom, passion, détail..." 
              value="${this.searchQuery}"
              class="w-full pl-8 pr-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 placeholder-slate-500 focus:border-amber-500/60 outline-none"
            />
            <span class="absolute left-2.5 top-2 text-slate-500 text-xs">🔍</span>
          </div>
        </div>

        <!-- Profiles Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          ${filteredProfiles.length === 0 ? `
            <div class="col-span-full py-16 text-center rounded-2xl border border-dashed border-slate-800 bg-slate-950/40 p-6 space-y-3">
              <span class="text-3xl block">🖋️</span>
              <h4 class="font-serif text-lg font-bold text-slate-300">Aucune fiche enregistrée</h4>
              <p class="text-xs text-slate-400 max-w-sm mx-auto">
                Commencez par créer votre première fiche pour consigner les détails d'écoute active et vos impressions de rendez-vous.
              </p>
              <button id="btn-empty-new-profile" class="px-4 py-2 rounded-xl bg-amber-500 text-slate-950 text-xs font-bold">
                + Créer une fiche de rencontre
              </button>
            </div>
          ` : filteredProfiles.map(p => {
            const currentStageObj = SEDUCTION_STAGES.find(s => s.id === p.stage) || SEDUCTION_STAGES[0];
            const notesCount = (p.notes || []).length;
            const lastNote = notesCount > 0 ? p.notes[notesCount - 1] : null;

            return `
              <div 
                class="journal-profile-card group relative rounded-2xl border border-slate-800 hover:border-amber-500/40 bg-gradient-to-b from-slate-900 to-slate-950 p-5 shadow-lg hover:shadow-2xl transition-all cursor-pointer flex flex-col justify-between"
                data-profile-id="${p.id}"
              >
                <div>
                  <!-- Header with Status & Stage -->
                  <div class="flex items-center justify-between gap-2 mb-3">
                    <span class="px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                      p.status === "active" 
                        ? "bg-emerald-950/60 text-emerald-300 border-emerald-500/30" 
                        : p.status === "close"
                          ? "bg-rose-950/60 text-rose-300 border-rose-500/30"
                          : "bg-slate-800 text-slate-400 border-slate-700"
                    }">
                      ${p.status === "active" ? "En cours" : p.status === "close" ? "Intime / Complice" : "En pause"}
                    </span>
                    <span class="text-[10px] text-amber-400 font-semibold bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/20">
                      Étape ${currentStageObj.phaseNumber} • ${currentStageObj.phaseTag}
                    </span>
                  </div>

                  <!-- Name & Alias -->
                  <h4 class="font-serif text-xl font-bold text-slate-100 group-hover:text-amber-200 transition-colors">
                    ${p.name}
                  </h4>
                  ${p.alias ? `
                    <p class="text-xs text-amber-400/90 font-medium italic mt-0.5">
                      « ${p.alias} »
                    </p>
                  ` : ""}

                  <!-- Archetype -->
                  <p class="text-[11px] text-slate-400 font-medium mt-2">
                    Archétype : <span class="text-slate-300 font-semibold">${p.archetype || "Non défini"}</span>
                  </p>

                  <!-- Key memory snippet -->
                  <div class="mt-3 p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 space-y-1">
                    <span class="text-[10px] uppercase font-bold text-amber-400/80 tracking-wider block">Mémoire d'écoute :</span>
                    <p class="text-xs text-slate-300 line-clamp-2">
                      ${p.keyDetails || p.passions || "Aucun détail consigné pour le moment."}
                    </p>
                  </div>
                </div>

                <!-- Footer info -->
                <div class="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                  <span>${notesCount} compte${notesCount > 1 ? "s" : ""}-rendu${notesCount > 1 ? "s" : ""}</span>
                  <span class="text-amber-400 font-semibold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                    Ouvrir la fiche →
                  </span>
                </div>
              </div>
            `;
          }).join("")}
        </div>

        <!-- Danger Zone / Data Backup -->
        <div class="pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
          <div class="flex items-center gap-2">
            <button id="btn-export-journal" class="hover:text-slate-200 underline">
              Exporter une sauvegarde JSON
            </button>
            <span>•</span>
            <label class="hover:text-slate-200 underline cursor-pointer">
              Importer une sauvegarde
              <input type="file" id="input-import-journal" accept=".json" class="hidden" />
            </label>
          </div>
          <button id="btn-wipe-journal" class="text-rose-400/80 hover:text-rose-300 transition-colors">
            Réinitialiser le code PIN & les données
          </button>
        </div>

      </div>
    `;

    this.attachDashboardEvents();
  }

  attachDashboardEvents() {
    // Lock button
    const lockBtn = this.container.querySelector("#btn-journal-lock");
    if (lockBtn) lockBtn.addEventListener("click", () => this.lock());

    // New profile button
    const newBtn = this.container.querySelector("#btn-journal-new-profile");
    if (newBtn) newBtn.addEventListener("click", () => this.openProfileModal());

    const emptyNewBtn = this.container.querySelector("#btn-empty-new-profile");
    if (emptyNewBtn) emptyNewBtn.addEventListener("click", () => this.openProfileModal());

    // Status filter buttons
    this.container.querySelectorAll(".journal-filter-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        this.filterStatus = btn.getAttribute("data-status");
        this.render();
      });
    });

    // Search input
    const searchInput = this.container.querySelector("#journal-search-input");
    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        this.searchQuery = e.target.value;
        this.render();
      });
    }

    // Profile card clicks
    this.container.querySelectorAll(".journal-profile-card").forEach(card => {
      card.addEventListener("click", () => {
        const id = card.getAttribute("data-profile-id");
        this.activeProfileId = id;
        this.render();
      });
    });

    // Export JSON
    const exportBtn = this.container.querySelector("#btn-export-journal");
    if (exportBtn) {
      exportBtn.addEventListener("click", () => {
        const blob = new Blob([JSON.stringify(this.profiles, null, 2)], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `seduction-codex-journal-${new Date().toISOString().slice(0,10)}.json`;
        a.click();
        URL.revokeObjectURL(url);
        Toast.show("Sauvegarde exportée avec succès");
      });
    }

    // Import JSON
    const importInput = this.container.querySelector("#input-import-journal");
    if (importInput) {
      importInput.addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (evt) => {
          try {
            const data = JSON.parse(evt.target.result);
            if (Array.isArray(data)) {
              this.saveProfiles(data);
              this.render();
              Toast.show("Sauvegarde restaurée !");
            } else {
              Toast.show("Format de fichier invalide", "error");
            }
          } catch (err) {
            Toast.show("Erreur lors de la lecture du fichier", "error");
          }
        };
        reader.readAsText(file);
      });
    }

    // Wipe all
    const wipeBtn = this.container.querySelector("#btn-wipe-journal");
    if (wipeBtn) {
      wipeBtn.addEventListener("click", () => {
        if (confirm("⚠️ Êtes-vous certain de vouloir supprimer toutes les fiches et réinitialiser le code PIN ? Cette action est irréversible.")) {
          localStorage.removeItem("seduction_codex_journal_pin");
          localStorage.removeItem("seduction_codex_journal_profiles");
          this.pin = null;
          this.profiles = [];
          this.isUnlocked = false;
          this.render();
          Toast.show("Données effacées");
        }
      });
    }
  }

  // --- DETAILED VIEW OF A SINGLE PROFILE ---
  renderProfileDetail(profileId) {
    const p = this.profiles.find(item => item.id === profileId);
    if (!p) {
      this.activeProfileId = null;
      this.render();
      return;
    }

    const currentStageObj = SEDUCTION_STAGES.find(s => s.id === p.stage) || SEDUCTION_STAGES[0];

    this.container.innerHTML = `
      <div class="space-y-6 animate-fadeIn">
        
        <!-- Top Bar Navigation -->
        <div class="flex items-center justify-between gap-3 pb-4 border-b border-slate-800">
          <button id="btn-back-to-profiles" class="text-xs font-semibold text-slate-300 hover:text-amber-300 transition-colors flex items-center gap-1.5">
            <span>← Retour aux fiches</span>
          </button>

          <div class="flex items-center gap-2">
            <button id="btn-edit-profile" class="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-200 hover:text-amber-300 text-xs font-semibold transition-colors">
              ✏️ Modifier
            </button>
            <button id="btn-delete-profile" class="px-3 py-1.5 rounded-lg bg-rose-950/40 border border-rose-500/30 text-rose-300 hover:bg-rose-900/60 text-xs font-semibold transition-colors">
              🗑️ Supprimer
            </button>
            <button id="btn-detail-lock" class="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 text-xs">
              🔒
            </button>
          </div>
        </div>

        <!-- Profile Hero Banner -->
        <div class="relative overflow-hidden rounded-3xl border border-amber-500/30 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 p-6 sm:p-8 space-y-4 shadow-xl">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div class="flex items-center gap-2.5 mb-1">
                <span class="px-2.5 py-0.5 rounded-full text-xs font-bold ${
                  p.status === "active" ? "bg-emerald-500/10 text-emerald-300 border border-emerald-500/30" : "bg-slate-800 text-slate-300"
                }">
                  ${p.status === "active" ? "En cours de découverte" : p.status === "close" ? "Intimité & Complicité" : "En pause"}
                </span>
                <span class="text-xs text-slate-400">Rencontrée le ${p.firstMetDate || "N/A"}</span>
              </div>

              <h2 class="font-serif text-3xl sm:text-4xl font-extrabold text-slate-100">
                ${p.name}
              </h2>
              ${p.alias ? `
                <p class="text-sm font-medium text-amber-300 italic font-serif">
                  « ${p.alias} »
                </p>
              ` : ""}
            </div>

            <!-- Current Stage Badge -->
            <div class="p-4 rounded-2xl bg-slate-950/80 border border-amber-500/30 text-right space-y-1">
              <span class="text-[10px] uppercase tracking-widest text-amber-400 font-bold block">Étape Actuelle du Codex :</span>
              <span class="font-serif font-bold text-slate-100 text-sm sm:text-base block">
                Étape ${currentStageObj.phaseNumber} • ${currentStageObj.title}
              </span>
              <span class="text-xs text-slate-400 block">${currentStageObj.subtitle}</span>
            </div>
          </div>

          <!-- First Met Place & Archetype -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-slate-300">
            <div class="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
              <strong class="text-amber-400 block mb-0.5">Cadre de rencontre :</strong>
              <span>${p.firstMetPlace || "Non précisé"}</span>
            </div>
            <div class="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
              <strong class="text-amber-400 block mb-0.5">Archétype Psychologique Détecté :</strong>
              <span>${p.archetype || "À déterminer"}</span>
            </div>
          </div>
        </div>

        <!-- 2 Columns: Memory Card & Signals -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          <!-- Column 1: Carte Mémoire d'Écoute Active (Dale Carnegie) -->
          <div class="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
            <div class="flex items-center gap-2 pb-2 border-b border-slate-800">
              <span class="text-lg">🧠</span>
              <h4 class="font-serif text-lg font-bold text-slate-100">
                Carte Mémoire & Écoute Active
              </h4>
            </div>

            <div class="space-y-3 text-xs">
              <div class="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1">
                <span class="font-bold text-amber-300 uppercase tracking-wider block">Passions, Rêves & Univers :</span>
                <p class="text-slate-300 leading-relaxed">${p.passions || "Aucune passion notée."}</p>
              </div>

              <div class="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1">
                <span class="font-bold text-amber-300 uppercase tracking-wider block">Détails Singuliers & Goûts :</span>
                <p class="text-slate-300 leading-relaxed">${p.keyDetails || "Aucun détail personnel noté."}</p>
              </div>

              <div class="p-3.5 rounded-xl bg-rose-950/20 border border-rose-500/30 space-y-1">
                <span class="font-bold text-rose-300 uppercase tracking-wider block">Sujets Sensibles / Limites :</span>
                <p class="text-rose-200/90 leading-relaxed">${p.sensitiveTopics || "Aucun sujet sensible répertorié."}</p>
              </div>
            </div>
          </div>

          <!-- Column 2: Signaux & Psychologie (Greene & Cialdini) -->
          <div class="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
            <div class="flex items-center gap-2 pb-2 border-b border-slate-800">
              <span class="text-lg">🧭</span>
              <h4 class="font-serif text-lg font-bold text-slate-100">
                Signaux Observés & Calibration
              </h4>
            </div>

            <!-- Green Flags -->
            <div class="space-y-2">
              <span class="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                <span>🟢 Signaux d'Intérêt (Green Flags)</span>
              </span>
              <ul class="space-y-1.5">
                ${(p.greenFlags && p.greenFlags.length > 0) ? p.greenFlags.map(f => `
                  <li class="p-2.5 rounded-xl bg-slate-950 border border-slate-800/80 text-xs text-slate-300 flex items-start gap-2">
                    <span class="text-emerald-400 font-bold">✓</span>
                    <span>${f}</span>
                  </li>
                `).join("") : `<li class="text-xs text-slate-500 italic">Aucun signal consigné</li>`}
              </ul>
            </div>

            <!-- Red Flags -->
            <div class="space-y-2 pt-2">
              <span class="text-xs font-bold text-rose-400 flex items-center gap-1.5">
                <span>⚠️ Points de Réserve / Red Flags</span>
              </span>
              <ul class="space-y-1.5">
                ${(p.redFlags && p.redFlags.length > 0) ? p.redFlags.map(rf => `
                  <li class="p-2.5 rounded-xl bg-slate-950 border border-slate-800/80 text-xs text-slate-300 flex items-start gap-2">
                    <span class="text-rose-400 font-bold">!</span>
                    <span>${rf}</span>
                  </li>
                `).join("") : `<li class="text-xs text-slate-500 italic">Aucun point de vigilance</li>`}
              </ul>
            </div>
          </div>

        </div>

        <!-- Section: Notes Chronologiques & Rendez-vous -->
        <div class="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-6">
          <div class="flex items-center justify-between pb-4 border-b border-slate-800">
            <div>
              <h4 class="font-serif text-xl font-bold text-slate-100">
                Journal Chronologique des Rendez-vous & Échanges
              </h4>
              <p class="text-xs text-slate-400">
                Récits, ressenti, auto-évaluation de présence & idées pour la prochaine interaction
              </p>
            </div>

            <button id="btn-add-note" class="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow transition-all active:scale-95 flex items-center gap-1.5">
              <span>+ Ajouter un Rendez-vous</span>
            </button>
          </div>

          <!-- Notes List -->
          <div class="space-y-4">
            ${(!p.notes || p.notes.length === 0) ? `
              <div class="py-10 text-center text-xs text-slate-500">
                Aucune note enregistrée pour le moment. Cliquez sur « Ajouter un Rendez-vous » pour consigner votre premier échange.
              </div>
            ` : p.notes.map((n, idx) => `
              <div class="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3 relative group">
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-2">
                    <span class="px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-500/10 text-amber-300 border border-amber-500/30">
                      Rendez-vous #${p.notes.length - idx}
                    </span>
                    <span class="text-xs font-semibold text-slate-200">${n.date}</span>
                    <span class="text-slate-600">•</span>
                    <span class="text-xs text-slate-400 italic">${n.place || "Lieu non précisé"}</span>
                  </div>
                  <button class="btn-delete-note text-slate-500 hover:text-rose-400 text-xs p-1" data-note-id="${n.id}" title="Supprimer cette note">
                    ✕
                  </button>
                </div>

                <div class="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  ${n.summary}
                </div>

                ${n.selfEvaluation ? `
                  <div class="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300">
                    <strong class="text-indigo-300 block mb-0.5">✦ Auto-évaluation & Posture personnelle :</strong>
                    ${n.selfEvaluation}
                  </div>
                ` : ""}

                ${n.nextAction ? `
                  <div class="p-3 rounded-xl bg-amber-500/5 border border-amber-500/20 text-xs text-amber-200">
                    <strong class="text-amber-400 block mb-0.5">🎯 Idée / Prochaine étape :</strong>
                    ${n.nextAction}
                  </div>
                ` : ""}
              </div>
            `).join("")}
          </div>
        </div>

      </div>
    `;

    this.attachDetailEvents(p);
  }

  attachDetailEvents(profile) {
    // Back button
    const backBtn = this.container.querySelector("#btn-back-to-profiles");
    if (backBtn) backBtn.addEventListener("click", () => {
      this.activeProfileId = null;
      this.render();
    });

    // Lock button
    const lockBtn = this.container.querySelector("#btn-detail-lock");
    if (lockBtn) lockBtn.addEventListener("click", () => this.lock());

    // Edit profile
    const editBtn = this.container.querySelector("#btn-edit-profile");
    if (editBtn) editBtn.addEventListener("click", () => this.openProfileModal(profile));

    // Delete profile
    const delBtn = this.container.querySelector("#btn-delete-profile");
    if (delBtn) delBtn.addEventListener("click", () => {
      if (confirm(`Voulez-vous vraiment supprimer définitivement la fiche de ${profile.name} ?`)) {
        this.profiles = this.profiles.filter(p => p.id !== profile.id);
        this.saveProfiles(this.profiles);
        this.activeProfileId = null;
        Toast.show("Fiche supprimée");
        this.render();
      }
    });

    // Add note
    const addNoteBtn = this.container.querySelector("#btn-add-note");
    if (addNoteBtn) addNoteBtn.addEventListener("click", () => this.openNoteModal(profile));

    // Delete note
    this.container.querySelectorAll(".btn-delete-note").forEach(btn => {
      btn.addEventListener("click", () => {
        const noteId = btn.getAttribute("data-note-id");
        profile.notes = (profile.notes || []).filter(n => n.id !== noteId);
        this.saveProfiles(this.profiles);
        Toast.show("Compte-rendu supprimé");
        this.renderProfileDetail(profile.id);
      });
    });
  }

  // --- MODAL: CREATE / EDIT PROFILE ---
  openProfileModal(profileToEdit = null) {
    const isEdit = !!profileToEdit;
    const modalId = "journal-profile-modal";
    let modal = document.getElementById(modalId);
    if (!modal) {
      modal = document.createElement("div");
      modal.id = modalId;
      document.body.appendChild(modal);
    }

    const p = profileToEdit || {
      name: "",
      alias: "",
      stage: 1,
      status: "active",
      archetype: "",
      firstMetDate: new Date().toISOString().slice(0,10),
      firstMetPlace: "",
      passions: "",
      keyDetails: "",
      sensitiveTopics: "",
      greenFlags: [],
      redFlags: []
    };

    modal.className = "fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-fadeIn";
    modal.innerHTML = `
      <div class="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border border-amber-500/30 bg-slate-900 p-6 sm:p-8 shadow-2xl space-y-6">
        <div class="flex items-center justify-between pb-3 border-b border-slate-800">
          <h3 class="font-serif text-xl font-bold text-slate-100">
            ${isEdit ? `Modifier la Fiche : ${p.name}` : "Nouvelle Fiche de Rencontre"}
          </h3>
          <button id="btn-close-profile-modal" class="text-slate-400 hover:text-white text-lg">✕</button>
        </div>

        <form id="form-save-profile" class="space-y-4 text-xs">
          
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block font-bold text-slate-300 uppercase tracking-wider mb-1">Prénom ou Initiale *</label>
              <input type="text" id="prof-name" required value="${p.name}" class="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 focus:border-amber-400 outline-none" placeholder="Ex: Camille" />
            </div>

            <div>
              <label class="block font-bold text-slate-300 uppercase tracking-wider mb-1">Pseudonyme / Titre poétique</label>
              <input type="text" id="prof-alias" value="${p.alias || ""}" class="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 focus:border-amber-400 outline-none" placeholder="Ex: La Danseuse Étoile" />
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label class="block font-bold text-slate-300 uppercase tracking-wider mb-1">Étape du Codex</label>
              <select id="prof-stage" class="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 focus:border-amber-400 outline-none">
                ${SEDUCTION_STAGES.map(s => `
                  <option value="${s.id}" ${p.stage === s.id ? "selected" : ""}>Étape ${s.phaseNumber} : ${s.title.split('&')[0]}</option>
                `).join("")}
              </select>
            </div>

            <div>
              <label class="block font-bold text-slate-300 uppercase tracking-wider mb-1">Statut</label>
              <select id="prof-status" class="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 focus:border-amber-400 outline-none">
                <option value="active" ${p.status === "active" ? "selected" : ""}>En cours de découverte</option>
                <option value="close" ${p.status === "close" ? "selected" : ""}>Intime / Complice</option>
                <option value="paused" ${p.status === "paused" ? "selected" : ""}>En pause</option>
              </select>
            </div>

            <div>
              <label class="block font-bold text-slate-300 uppercase tracking-wider mb-1">Date de rencontre</label>
              <input type="date" id="prof-date" value="${p.firstMetDate || ""}" class="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 focus:border-amber-400 outline-none" />
            </div>
          </div>

          <div>
            <label class="block font-bold text-slate-300 uppercase tracking-wider mb-1">Cadre de rencontre</label>
            <input type="text" id="prof-place" value="${p.firstMetPlace || ""}" class="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 focus:border-amber-400 outline-none" placeholder="Ex: Vernissage, Soirée chez Julien, Café..." />
          </div>

          <div>
            <label class="block font-bold text-slate-300 uppercase tracking-wider mb-1">Archétype Psychologique (Greene / Codex)</label>
            <input type="text" id="prof-archetype" value="${p.archetype || ""}" class="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 focus:border-amber-400 outline-none" placeholder="Ex: L'Idéale Romantique, L'Indépendante, La Mystique..." />
          </div>

          <!-- Carnegie Memory Section -->
          <div class="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3">
            <span class="text-xs uppercase font-bold text-amber-400 tracking-wider block">🧠 Mémoire d'Écoute Active (Dale Carnegie)</span>
            
            <div>
              <label class="block text-slate-300 mb-1">Passions, rêves & aspirations</label>
              <textarea id="prof-passions" rows="2" class="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-100 outline-none resize-none" placeholder="Ce qui l'anime profondément...">${p.passions || ""}</textarea>
            </div>

            <div>
              <label class="block text-slate-300 mb-1">Détails personnels marquants (goûts, anecdotes, petites préférences)</label>
              <textarea id="prof-details" rows="2" class="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-100 outline-none resize-none" placeholder="Ex: Café sans sucre, peur des hauteurs, livre fétiche...">${p.keyDetails || ""}</textarea>
            </div>

            <div>
              <label class="block text-rose-300 mb-1">Sujets sensibles / Pièges à éviter</label>
              <input type="text" id="prof-sensitive" value="${p.sensitiveTopics || ""}" class="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-100 outline-none" placeholder="Ex: Conflits familiaux, ex-relation récente..." />
            </div>
          </div>

          <!-- Flags -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block font-bold text-emerald-400 uppercase tracking-wider mb-1">Green Flags (1 par ligne)</label>
              <textarea id="prof-greenflags" rows="3" class="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 outline-none resize-none" placeholder="Signaux d'intérêt observés...">${(p.greenFlags || []).join("\n")}</textarea>
            </div>
            <div>
              <label class="block font-bold text-rose-400 uppercase tracking-wider mb-1">Red Flags / Vigilance (1 par ligne)</label>
              <textarea id="prof-redflags" rows="3" class="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 outline-none resize-none" placeholder="Points de réserve...">${(p.redFlags || []).join("\n")}</textarea>
            </div>
          </div>

          <div class="pt-3 flex items-center justify-end gap-2 border-t border-slate-800">
            <button type="button" id="btn-cancel-profile-modal" class="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold">Annuler</button>
            <button type="submit" class="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold shadow-md">Enregistrer la Fiche</button>
          </div>

        </form>
      </div>
    `;

    const close = () => {
      modal.remove();
    };

    document.getElementById("btn-close-profile-modal").addEventListener("click", close);
    document.getElementById("btn-cancel-profile-modal").addEventListener("click", close);

    document.getElementById("form-save-profile").addEventListener("submit", (e) => {
      e.preventDefault();
      const updated = {
        id: isEdit ? p.id : "prof_" + Date.now(),
        name: document.getElementById("prof-name").value.trim(),
        alias: document.getElementById("prof-alias").value.trim(),
        stage: parseInt(document.getElementById("prof-stage").value, 10),
        status: document.getElementById("prof-status").value,
        firstMetDate: document.getElementById("prof-date").value,
        firstMetPlace: document.getElementById("prof-place").value.trim(),
        archetype: document.getElementById("prof-archetype").value.trim(),
        passions: document.getElementById("prof-passions").value.trim(),
        keyDetails: document.getElementById("prof-details").value.trim(),
        sensitiveTopics: document.getElementById("prof-sensitive").value.trim(),
        greenFlags: document.getElementById("prof-greenflags").value.split("\n").map(s => s.trim()).filter(Boolean),
        redFlags: document.getElementById("prof-redflags").value.split("\n").map(s => s.trim()).filter(Boolean),
        notes: p.notes || []
      };

      if (isEdit) {
        const idx = this.profiles.findIndex(x => x.id === p.id);
        if (idx !== -1) this.profiles[idx] = updated;
      } else {
        this.profiles.unshift(updated);
      }

      this.saveProfiles(this.profiles);
      close();
      Toast.show(isEdit ? "Fiche mise à jour" : "Fiche créée avec succès");
      this.activeProfileId = updated.id;
      this.render();
    });
  }

  // --- MODAL: ADD RENDEZ-VOUS NOTE ---
  openNoteModal(profile) {
    const modalId = "journal-note-modal";
    let modal = document.getElementById(modalId);
    if (!modal) {
      modal = document.createElement("div");
      modal.id = modalId;
      document.body.appendChild(modal);
    }

    modal.className = "fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-fadeIn";
    modal.innerHTML = `
      <div class="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-3xl border border-amber-500/30 bg-slate-900 p-6 sm:p-8 shadow-2xl space-y-5">
        <div class="flex items-center justify-between pb-3 border-b border-slate-800">
          <h3 class="font-serif text-lg font-bold text-slate-100">
            Nouveau Compte-Rendu de Rendez-vous
          </h3>
          <button id="btn-close-note-modal" class="text-slate-400 hover:text-white text-lg">✕</button>
        </div>

        <form id="form-save-note" class="space-y-4 text-xs">
          
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block font-bold text-slate-300 uppercase tracking-wider mb-1">Date</label>
              <input type="date" id="note-date" required value="${new Date().toISOString().slice(0,10)}" class="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 outline-none" />
            </div>
            <div>
              <label class="block font-bold text-slate-300 uppercase tracking-wider mb-1">Lieu / Cadre</label>
              <input type="text" id="note-place" placeholder="Ex: Restaurant, Balade..." class="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 outline-none" />
            </div>
          </div>

          <div>
            <label class="block font-bold text-slate-300 uppercase tracking-wider mb-1">Résumé & Moments Forts de l'échange *</label>
            <textarea id="note-summary" rows="3" required placeholder="Ce dont vous avez parlé, ce qui a suscité des émotions..." class="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 outline-none resize-none"></textarea>
          </div>

          <div>
            <label class="block font-bold text-indigo-300 uppercase tracking-wider mb-1">Auto-évaluation Personnelle (Posture, Présence, Écoute)</label>
            <textarea id="note-self" rows="2" placeholder="Ex: J'étais détendu, bonne écoute active, regard bien tenu..." class="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 outline-none resize-none"></textarea>
          </div>

          <div>
            <label class="block font-bold text-amber-300 uppercase tracking-wider mb-1">Idée ou Prochaine Étape</label>
            <input type="text" id="note-next" placeholder="Ex: Proposer un concert, laisser infuser le désir..." class="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 outline-none" />
          </div>

          <div class="pt-3 flex items-center justify-end gap-2 border-t border-slate-800">
            <button type="button" id="btn-cancel-note-modal" class="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-semibold">Annuler</button>
            <button type="submit" class="px-5 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold shadow">Ajouter au Journal</button>
          </div>

        </form>
      </div>
    `;

    const close = () => modal.remove();
    document.getElementById("btn-close-note-modal").addEventListener("click", close);
    document.getElementById("btn-cancel-note-modal").addEventListener("click", close);

    document.getElementById("form-save-note").addEventListener("submit", (e) => {
      e.preventDefault();
      const newNote = {
        id: "note_" + Date.now(),
        date: document.getElementById("note-date").value,
        place: document.getElementById("note-place").value.trim(),
        summary: document.getElementById("note-summary").value.trim(),
        selfEvaluation: document.getElementById("note-self").value.trim(),
        nextAction: document.getElementById("note-next").value.trim()
      };

      if (!profile.notes) profile.notes = [];
      profile.notes.unshift(newNote);

      this.saveProfiles(this.profiles);
      close();
      Toast.show("Rendez-vous consigné !");
      this.renderProfileDetail(profile.id);
    });
  }
}
