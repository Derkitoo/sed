/**
 * Seduction Codex - Gestionnaire d'installation PWA & Bannière personnalisée
 */

import { getIcon } from "./Icons.js";
import { Toast } from "./Toast.js";

export class PwaInstallBanner {
  constructor(bannerContainerId, headerInstallBtnId) {
    this.container = document.getElementById(bannerContainerId);
    this.headerBtn = document.getElementById(headerInstallBtnId);
    this.deferredPrompt = null;
    this.isInstalled = false;

    this.init();
  }

  init() {
    // Check if already in standalone mode
    if (window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone === true) {
      this.isInstalled = true;
      if (this.headerBtn) {
        this.headerBtn.classList.add("hidden");
      }
      return;
    }

    // Intercept native prompt
    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      this.deferredPrompt = e;
      
      // Check if user dismissed banner recently
      const dismissed = sessionStorage.getItem("pwa-prompt-dismissed");
      if (!dismissed) {
        this.showBanner();
      }

      if (this.headerBtn) {
        this.headerBtn.classList.remove("hidden");
      }
    });

    window.addEventListener("appinstalled", () => {
      this.isInstalled = true;
      this.deferredPrompt = null;
      this.hideBanner();
      if (this.headerBtn) {
        this.headerBtn.classList.add("hidden");
      }
      Toast.show("Seduction Codex est maintenant installé sur votre appareil !");
    });

    if (this.headerBtn) {
      this.headerBtn.addEventListener("click", () => this.triggerInstall());
    }
  }

  showBanner() {
    if (!this.container || this.isInstalled) return;

    this.container.classList.remove("hidden");
    this.container.innerHTML = `
      <div class="fixed bottom-16 md:bottom-6 left-3 right-3 sm:left-auto sm:right-6 sm:max-w-md z-40 animate-slideUp">
        <div class="p-4 rounded-2xl border border-amber-500/30 bg-slate-900/95 backdrop-blur-md shadow-2xl shadow-black flex items-center justify-between gap-3">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-rose-700 flex items-center justify-center text-slate-950 font-serif font-bold text-lg shadow-inner flex-shrink-0">
              SC
            </div>
            <div>
              <h4 class="font-serif font-bold text-slate-100 text-xs sm:text-sm">Installer Seduction Codex</h4>
              <p class="text-[11px] text-slate-400">Accès hors-ligne instantané & expérience plein écran</p>
            </div>
          </div>

          <div class="flex items-center gap-1.5 flex-shrink-0">
            <button id="pwa-install-action" class="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-xs transition-colors shadow active:scale-95">
              Installer
            </button>
            <button id="pwa-dismiss-action" class="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 transition-colors" title="Plus tard">
              ${getIcon("x", "w-4 h-4")}
            </button>
          </div>
        </div>
      </div>
    `;

    const installAction = this.container.querySelector("#pwa-install-action");
    if (installAction) {
      installAction.addEventListener("click", () => this.triggerInstall());
    }

    const dismissAction = this.container.querySelector("#pwa-dismiss-action");
    if (dismissAction) {
      dismissAction.addEventListener("click", () => {
        sessionStorage.setItem("pwa-prompt-dismissed", "true");
        this.hideBanner();
      });
    }
  }

  hideBanner() {
    if (this.container) {
      this.container.innerHTML = "";
      this.container.classList.add("hidden");
    }
  }

  async triggerInstall() {
    if (!this.deferredPrompt) {
      Toast.show("Pour installer : menu de votre navigateur > 'Ajouter à l'écran d'accueil'");
      return;
    }

    this.deferredPrompt.prompt();
    const { outcome } = await this.deferredPrompt.userChoice;
    if (outcome === "accepted") {
      this.hideBanner();
    }
    this.deferredPrompt = null;
  }
}
