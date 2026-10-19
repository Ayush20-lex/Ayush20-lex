/**
 * AYUSHCRAFT — UI System, Dialogue Windows & Accessible Journal
 */

import { audio } from './audio.js';

export class UIManager {
  constructor(game) {
    this.game = game;
    this.activeModal = null;
    this.currentZone = '';

    // Cache DOM Elements
    this.locationPill = document.getElementById('location-pill');
    this.locationText = document.getElementById('location-text');
    this.interactPrompt = document.getElementById('interact-prompt');
    this.promptText = document.getElementById('prompt-text');

    this.modalBackdrop = document.getElementById('modal-backdrop');
    this.modalTitle = document.getElementById('modal-title');
    this.modalBody = document.getElementById('modal-body');
    this.modalCloseBtn = document.getElementById('modal-close-btn');

    this.soundToggleBtn = document.getElementById('sound-toggle-btn');
    this.journalBtn = document.getElementById('journal-btn');

    this.initEvents();
  }

  initEvents() {
    // Modal close button
    if (this.modalCloseBtn) {
      this.modalCloseBtn.addEventListener('click', () => this.closeModal());
    }

    // Backdrop click to close
    if (this.modalBackdrop) {
      this.modalBackdrop.addEventListener('click', (e) => {
        if (e.target === this.modalBackdrop) this.closeModal();
      });
    }

    // Interact prompt click
    if (this.interactPrompt) {
      this.interactPrompt.addEventListener('click', () => {
        this.game.interact();
      });
    }

    // Sound toggle
    if (this.soundToggleBtn) {
      this.soundToggleBtn.addEventListener('click', () => {
        const isMuted = audio.toggleMute();
        this.soundToggleBtn.innerHTML = isMuted ? '🔇 Sound: Off' : '🔊 Sound: On';
      });
    }

    // Journal button
    if (this.journalBtn) {
      this.journalBtn.addEventListener('click', () => {
        this.openJournal();
      });
    }

    // Interact prompt click
    if (this.interactPrompt) {
      this.interactPrompt.addEventListener('click', () => {
        this.game.interact();
      });
    }

    // Global keyboard listener
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeModal();
      } else if (e.key === 'j' || e.key === 'J') {
        if (!this.activeModal) this.openJournal();
        else this.closeModal();
      }
    });
  }

  updateLocation(zoneName) {
    if (this.currentZone !== zoneName) {
      this.currentZone = zoneName;
      if (this.locationText && this.locationPill) {
        this.locationText.textContent = zoneName;
        this.locationPill.classList.add('active');
        clearTimeout(this.locTimeout);
        this.locTimeout = setTimeout(() => {
          this.locationPill.classList.remove('active');
        }, 2800);
      }
    }
  }

  setInteractPrompt(visible, text = '[E] Interact') {
    if (!this.interactPrompt) return;
    if (visible && !this.activeModal) {
      this.promptText.textContent = text;
      this.interactPrompt.classList.add('visible');
    } else {
      this.interactPrompt.classList.remove('visible');
    }
  }

  // Open Notice Sign Dialogue
  openSign(title, text) {
    audio.playInteract();
    this.activeModal = 'sign';

    this.modalTitle.innerHTML = `📜 ${title}`;
    this.modalBody.innerHTML = `
      <div class="dialogue-box">
        <p class="dialogue-text">${text.replace(/\n/g, '<br/>')}</p>
        <div style="text-align: right; margin-top: 10px;">
          <button class="pixel-btn" id="dialogue-ok-btn">Understood [Esc]</button>
        </div>
      </div>
    `;

    this.modalBackdrop.classList.add('open');
    document.getElementById('dialogue-ok-btn')?.addEventListener('click', () => this.closeModal());
  }

  // Open Rich Modal (AirLytics, AI Assistant, Redstone, Relic, Portal)
  openModal(data) {
    audio.playInteract();
    this.activeModal = 'info';

    this.modalTitle.innerHTML = data.title || 'Information';

    let badgesHtml = '';
    if (data.badges) {
      badgesHtml = `<div class="panel-badge-row">` +
        data.badges.map(b => `<span class="meta-chip highlight">${b}</span>`).join('') +
        `</div>`;
    }

    let highlightsHtml = '';
    if (data.highlights) {
      highlightsHtml = `<h3>Key Architectural Highlights</h3><ul>` +
        data.highlights.map(h => `<li style="margin-left: 18px; margin-bottom: 6px;">${h}</li>`).join('') +
        `</ul>`;
    }

    let stackHtml = '';
    if (data.stack) {
      stackHtml = `<div style="margin-top: 12px; font-family: var(--font-mono); font-size: 12px; color: #57412e;">
        <strong>Verified Stack:</strong> ${data.stack.join(' · ')}
      </div>`;
    }

    let linksHtml = '';
    if (data.links && data.links.length > 0) {
      linksHtml = `<div class="link-buttons">` +
        data.links.map(l => `<a href="${l.url}" target="_blank" rel="noopener noreferrer" class="ext-btn ${l.primary ? '' : 'secondary'}">${l.text}</a>`).join('') +
        `</div>`;
    }

    this.modalBody.innerHTML = `
      ${data.subtitle ? `<p style="font-family: var(--font-mono); font-size: 12px; color: #78350f; font-weight: 700; margin-bottom: 4px;">${data.subtitle}</p>` : ''}
      ${badgesHtml}
      <p style="font-size: 14.5px; line-height: 1.6; margin-top: 8px;">${data.description}</p>
      ${highlightsHtml}
      ${stackHtml}
      ${linksHtml}
    `;

    this.modalBackdrop.classList.add('open');
  }

  // Open Accessible Explorer's Journal
  openJournal() {
    audio.playInteract();
    this.activeModal = 'journal';

    this.modalTitle.innerHTML = `📖 Explorer’s Journal & Fast Travel`;

    this.modalBody.innerHTML = `
      <div class="journal-tabs">
        <button class="journal-tab active" data-tab="tab-overview">Overview</button>
        <button class="journal-tab" data-tab="tab-airlytics">AirLytics NCR</button>
        <button class="journal-tab" data-tab="tab-ai">AI Assistant</button>
        <button class="journal-tab" data-tab="tab-stack">Tech Stack</button>
        <button class="journal-tab" data-tab="tab-lore">Gaming & Lore</button>
        <button class="journal-tab" data-tab="tab-contact">Contact & Warp</button>
      </div>

      <div id="journal-tab-content" style="padding-top: 14px;">
        <!-- Default: Overview -->
        <p><strong>Ayush Kumar</strong> — Computer Science & Engineering undergraduate based in India.</p>
        <p>I build data-driven software, environmental intelligence systems, and developer tooling. My focus is mathematical and provenance-driven code: creating systems where every prediction, forecast, and output can be verified back to valid measurements.</p>
        <div class="panel-badge-row">
          <span class="meta-chip">Machine Learning</span>
          <span class="meta-chip">Environmental Forecasting</span>
          <span class="meta-chip">Linux & Terminal Tooling</span>
          <span class="meta-chip">Metroidvania Gamer</span>
          <span class="meta-chip">Calisthenics</span>
        </div>
        <p style="margin-top: 14px; font-family: var(--font-mono); font-size: 12px; color: #78350f;">
          <em>Tip: Select any tab above to inspect project details without having to steer the character, or click "Fast Travel" to warp your player directly to that biome!</em>
        </p>
      </div>
    `;

    // Tab switcher logic
    const tabs = this.modalBody.querySelectorAll('.journal-tab');
    const container = this.modalBody.querySelector('#journal-tab-content');

    const tabContents = {
      'tab-overview': `
        <p><strong>Ayush Kumar</strong> — Computer Science & Engineering undergraduate in India.</p>
        <p>I build data-driven software, environmental intelligence systems, and developer tooling. My focus is mathematical and provenance-driven code: creating systems where every prediction, forecast, and output can be verified back to valid measurements.</p>
        <div class="panel-badge-row">
          <span class="meta-chip">Machine Learning</span>
          <span class="meta-chip">Environmental Forecasting</span>
          <span class="meta-chip">Linux & Terminal Tooling</span>
          <span class="meta-chip">Metroidvania Gamer</span>
          <span class="meta-chip">Calisthenics</span>
        </div>
      `,
      'tab-airlytics': `
        <h3>🛰️ AirLytics NCR (Smart India Hackathon SIH26082)</h3>
        <p>A 72-hour air quality forecast for Delhi NCR that proves where every figure came from—traceable to individual monitoring stations and CPCB 2014 arithmetic rules.</p>
        <ul>
          <li><strong>68-Station CPCB Mesh:</strong> Strictly audited 24-hour rolling windows with dominant pollutant criteria.</li>
          <li><strong>61.12 µg/m³ RMSE:</strong> Blend baseline evaluated over 4M+ observations across an annual cycle.</li>
          <li><strong>API-Grounded AI Assistant:</strong> Strictly bounded to 8 read-only API endpoints with verifiable tool calls.</li>
          <li><strong>NASA VIIRS:</strong> Fire corridor tracking aligned with meteorological wind fields.</li>
        </ul>
        <div class="link-buttons" style="margin-top: 12px;">
          <a href="https://airlytics-ncr.vercel.app/" target="_blank" class="ext-btn">Live Platform ↗</a>
          <a href="https://github.com/Ayush20-lex/airlytics-ncr" target="_blank" class="ext-btn secondary">GitHub Repo ↗</a>
          <button class="pixel-btn" id="warp-observatory">⚡ Fast Travel to Observatory</button>
        </div>
      `,
      'tab-ai': `
        <h3>⚡ Autonomous Developer Assistant</h3>
        <p>A personal software engineering assistant designed for terminal-first developer environments.</p>
        <ul>
          <li>Context-driven task execution and workspace management.</li>
          <li>Grounded execution boundary preventing unauthorized actions and data leakage.</li>
          <li>Strict zero-credential leakage architecture.</li>
        </ul>
        <div class="link-buttons" style="margin-top: 12px;">
          <button class="pixel-btn" id="warp-workshop">⚡ Fast Travel to Workshop</button>
        </div>
      `,
      'tab-stack': `
        <h3>🛠️ Verified Technical Arsenal</h3>
        <p>Technologies supported by real codebases and verified engineering work:</p>
        <p><strong>Languages:</strong> Python, TypeScript, Java, Bash / Shell, SQL</p>
        <p><strong>Data & AI:</strong> FastAPI, React 19, Pandas, NumPy, Scikit-Learn</p>
        <p><strong>Systems & Tools:</strong> Linux, Git, GitHub, VS Code, Vite, Vercel</p>
        <div class="link-buttons" style="margin-top: 12px;">
          <a href="https://github.com/Ayush20-lex?tab=repositories" target="_blank" class="ext-btn">Browse Repositories ↗</a>
          <button class="pixel-btn" id="warp-redstone">⚡ Fast Travel to Redstone Lab</button>
        </div>
      `,
      'tab-lore': `
        <h3>🗡️ Outside the Terminal (Gaming & Personal Lore)</h3>
        <p><strong>Metroidvanias:</strong> Deep appreciation for non-linear exploration, atmospheric lore, and precision combat (<em>Hollow Knight</em>, <em>Castlevania</em>, <em>Ori</em>).</p>
        <p><strong>Anime & Light Novels:</strong> Passionate about intricate power systems, strategy, and rich worldbuilding.</p>
        <p><strong>Calisthenics:</strong> Progressive bodyweight training and physical discipline.</p>
        <div class="link-buttons" style="margin-top: 12px;">
          <button class="pixel-btn" id="warp-saveroom">⚡ Fast Travel to Save Room</button>
        </div>
      `,
      'tab-contact': `
        <h3>🌌 Coordinates & Contact</h3>
        <p>Open for software engineering collaborations, AI systems development, internships, and tech/gaming chats.</p>
        <div class="link-buttons">
          <a href="https://github.com/Ayush20-lex" target="_blank" class="ext-btn">GitHub Profile ↗</a>
          <a href="https://www.linkedin.com/in/ayush-kumar-942081322/" target="_blank" class="ext-btn">LinkedIn Profile ↗</a>
          <a href="mailto:ayushkumargbp@gmail.com" class="ext-btn secondary">Email: ayushkumargbp@gmail.com ↗</a>
          <button class="pixel-btn" id="warp-portal">⚡ Fast Travel to Exit Portal</button>
        </div>
      `
    };

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const target = tab.getAttribute('data-tab');
        container.innerHTML = tabContents[target] || '';
        this.bindWarpButtons();
      });
    });

    this.bindWarpButtons();
    this.modalBackdrop.classList.add('open');
  }

  bindWarpButtons() {
    document.getElementById('warp-observatory')?.addEventListener('click', () => {
      this.game.player.x = 7 * 32;
      this.game.player.y = 7 * 32;
      this.game.player.direction = 'up';
      this.closeModal();
    });
    document.getElementById('warp-workshop')?.addEventListener('click', () => {
      this.game.player.x = 30 * 32;
      this.game.player.y = 6 * 32;
      this.game.player.direction = 'up';
      this.closeModal();
    });
    document.getElementById('warp-redstone')?.addEventListener('click', () => {
      this.game.player.x = 30 * 32;
      this.game.player.y = 19 * 32;
      this.game.player.direction = 'up';
      this.closeModal();
    });
    document.getElementById('warp-saveroom')?.addEventListener('click', () => {
      this.game.player.x = 7 * 32;
      this.game.player.y = 20 * 32;
      this.game.player.direction = 'up';
      this.closeModal();
    });
    document.getElementById('warp-portal')?.addEventListener('click', () => {
      this.game.player.x = 18 * 32;
      this.game.player.y = 4 * 32;
      this.game.player.direction = 'up';
      this.closeModal();
    });
  }

  closeModal() {
    this.activeModal = null;
    if (this.modalBackdrop) {
      this.modalBackdrop.classList.remove('open');
    }
  }

  isModalOpen() {
    return this.activeModal !== null;
  }
}
