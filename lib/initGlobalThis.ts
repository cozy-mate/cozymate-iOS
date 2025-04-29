export function initGlobalThis() {
  if (typeof globalThis.RNFB_SILENCE_MODULAR_DEPRECATION_WARNINGS === 'undefined') {
    globalThis.RNFB_SILENCE_MODULAR_DEPRECATION_WARNINGS = true;
  }
}
