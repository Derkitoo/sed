/**
 * Seduction Codex - Notification Toast
 */

export class Toast {
  static container = null;

  static init() {
    if (!this.container) {
      this.container = document.createElement("div");
      this.container.id = "toast-container";
      this.container.className = "fixed bottom-20 md:bottom-8 right-4 left-4 md:left-auto md:max-w-md z-50 flex flex-col gap-2 pointer-events-none";
      document.body.appendChild(this.container);
    }
  }

  static show(message, type = "success", duration = 3200) {
    this.init();

    const toast = document.createElement("div");
    toast.className = `pointer-events-auto transform translate-y-3 opacity-0 transition-all duration-300 ease-out flex items-center gap-3 px-4 py-3 rounded-xl border shadow-2xl backdrop-blur-md text-sm font-medium ${
      type === "success"
        ? "bg-slate-900/95 border-amber-500/40 text-amber-100 shadow-amber-950/40"
        : "bg-slate-900/95 border-rose-500/40 text-rose-100 shadow-rose-950/40"
    }`;

    const iconHtml = type === "success" 
      ? `<span class="flex-shrink-0 w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xs">✓</span>`
      : `<span class="flex-shrink-0 w-6 h-6 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center font-bold text-xs">!</span>`;

    toast.innerHTML = `
      ${iconHtml}
      <span class="flex-1 leading-snug">${message}</span>
    `;

    this.container.appendChild(toast);

    // Trigger enter animation
    requestAnimationFrame(() => {
      toast.classList.remove("translate-y-3", "opacity-0");
      toast.classList.add("translate-y-0", "opacity-100");
    });

    // Dismiss timer
    setTimeout(() => {
      toast.classList.remove("translate-y-0", "opacity-100");
      toast.classList.add("-translate-y-2", "opacity-0");
      setTimeout(() => {
        toast.remove();
      }, 300);
    }, duration);
  }
}
