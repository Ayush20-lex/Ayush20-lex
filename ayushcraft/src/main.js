/**
 * AYUSHCRAFT — Main Entry Point
 */

import { Game } from './game.js';

window.addEventListener('DOMContentLoaded', () => {
  const game = new Game();
  window.__AYUSHCRAFT__ = game; // Exposed for debugging / QA testing
});
