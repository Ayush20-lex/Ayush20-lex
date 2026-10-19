/**
 * AYUSHCRAFT — UI System, Dialogue Windows & Accessible Journal
 * Native Pixel-Art Crafting Interface & Scannable Modals
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
        this.soundToggleBtn.setAttribute('title', isMuted ? 'Enable sound effects' : 'Disable sound effects');
      });
    }

    // Journal button
    if (this.journalBtn) {
      this.journalBtn.addEventListener('click', () => {
        this.openJournal();
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

  // Priority 4: Redesigned Notice Sign Dialogue (Native Wood/Parchment Plaque)
  openSign(title, text) {
    audio.playInteract();
    this.activeModal = 'sign';

    this.modalTitle.innerHTML = title;

    // Format text lines into structured paragraphs or list items
    const lines = text.split('\n');
    let formattedHtml = '';
    let inList = false;

    lines.forEach(line => {
      const trimmed = line.trim();
      if (!trimmed) {
        if (inList) {
          formattedHtml += '</ul>';
          inList = false;
        }
        return;
      }

      if (trimmed.startsWith('•') || trimmed.startsWith('-')) {
        if (!inList) {
          formattedHtml += '<ul class="dialogue-list">';
          inList = true;
        }
        formattedHtml += `<li>${trimmed.replace(/^[•\-]\s*/, '')}</li>`;
      } else {
        if (inList) {
          formattedHtml += '</ul>';
          inList = false;
        }
        formattedHtml += `<p class="dialogue-paragraph">${trimmed}</p>`;
      }
    });
    if (inList) formattedHtml += '</ul>';

    this.modalBody.innerHTML = `
      <div class="sign-dialogue-content">
        ${formattedHtml}
        <div class="dialogue-action-row">
          <button class="pixel-btn primary" id="dialogue-ok-btn">Understood [Esc]</button>
        </div>
      </div>
    `;

    this.modalBackdrop.classList.add('open');
    document.getElementById('dialogue-ok-btn')?.focus();
    document.getElementById('dialogue-ok-btn')?.addEventListener('click', () => this.closeModal());
  }

  // Priority 4: Redesigned Scannable Modal (AirLytics, AI Assistant, Redstone, Relic, Portal)
  openModal(data) {
    audio.playInteract();
    this.activeModal = 'info';

    this.modalTitle.innerHTML = data.title || 'Information';

    // Stats Metric Grid (AirLytics & Key Projects)
    let statsHtml = '';
    if (data.stats && data.stats.length > 0) {
      statsHtml = `<div class="panel-stats-grid">` +
        data.stats.map(s => `
          <div class="stat-card">
            <div class="stat-value">${s.value}</div>
            <div class="stat-label">${s.label}</div>
          </div>
        `).join('') +
        `</div>`;
    }

    // Category Badges (Shown when no stats grid is present to avoid redundancy)
    let badgesHtml = '';
    if (data.badges && (!data.stats || data.stats.length === 0)) {
      badgesHtml = `<div class="panel-badge-row">` +
        data.badges.map(b => `<span class="meta-chip highlight">${b}</span>`).join('') +
        `</div>`;
    }

    // Key Architectural Highlights
    let highlightsHtml = '';
    if (data.highlights) {
      highlightsHtml = `
        <div class="panel-section">
          <h3 class="section-heading">Key Architectural Highlights</h3>
          <ul class="highlights-list">
            ${data.highlights.map(h => `<li><span class="bullet-gem">◆</span> <div class="highlight-text">${h}</div></li>`).join('')}
          </ul>
        </div>
      `;
    }

    // Verified Stack
    let stackHtml = '';
    if (data.stack) {
      stackHtml = `
        <div class="stack-row">
          <span class="stack-label">Verified Stack:</span>
          <div class="stack-chips">
            ${data.stack.map(tech => `<span class="stack-chip">${tech}</span>`).join('')}
          </div>
        </div>
      `;
    }

    // Action Links
    let linksHtml = '';
    if (data.links && data.links.length > 0) {
      linksHtml = `<div class="link-buttons">` +
        data.links.map(l => `
          <a href="${l.url}" target="_blank" rel="noopener noreferrer" class="ext-btn ${l.primary ? 'primary' : 'secondary'}">
            ${l.text}
          </a>
        `).join('') +
        `</div>`;
    }

    this.modalBody.innerHTML = `
      ${data.subtitle ? `<div class="panel-subtitle">${data.subtitle}</div>` : ''}
      ${badgesHtml}
      ${statsHtml}
      <p class="panel-description">${data.description}</p>
      ${highlightsHtml}
      ${stackHtml}
      ${linksHtml}
    `;

    this.modalBackdrop.classList.add('open');
    this.modalCloseBtn?.focus();
  }

  // Priority 4: Redesigned Accessible Explorer's Journal & Fast Travel
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

      <div id="journal-tab-content" class="journal-tab-pane">
        <!-- Default: Overview -->
        <p><strong>Ayush Kumar</strong> — Computer Science & Engineering undergraduate based in India.</p>
        <p>I build data-driven software, environmental intelligence systems, and developer tooling. My focus is mathematical and provenance-driven engineering: creating systems where every prediction, forecast, and output can be verified back to valid measurements.</p>
        
        <div class="panel-badge-row">
          <span class="meta-chip">Machine Learning</span>
          <span class="meta-chip">Environmental Forecasting</span>
          <span class="meta-chip">Linux & Terminal Tooling</span>
          <span class="meta-chip">Metroidvania Gamer</span>
          <span class="meta-chip">Calisthenics</span>
        </div>

        <div class="journal-hint-card">
          💡 <strong>Fast Travel Tip:</strong> Select any tab above to inspect project field notes directly, or click <em>Fast Travel</em> to warp your character to that biome!
        </div>
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
        <div class="journal-hint-card">
          💡 <strong>Fast Travel Tip:</strong> Select any tab above to inspect project field notes directly, or click <em>Fast Travel</em> to warp your character to that biome!
        </div>
      `,
      'tab-airlytics': `
        <h3 class="section-heading">🛰️ AirLytics NCR (Smart India Hackathon SIH26082)</h3>
        <p>A 72-hour air quality forecast for Delhi NCR designed with absolute data provenance—traceable to individual monitoring stations and CPCB 2014 arithmetic rules.</p>
        
        <div class="panel-stats-grid">
          <div class="stat-card">
            <div class="stat-value">68 Stations</div>
            <div class="stat-label">CPCB Mesh</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">72 Hours</div>
            <div class="stat-label">Predictive Horizon</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">61.12 µg/m³</div>
            <div class="stat-label">RMSE Baseline</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">8 Endpoints</div>
            <div class="stat-label">Grounded Assistant</div>
          </div>
        </div>

        <ul class="highlights-list">
          <li><span class="bullet-gem">◆</span> <div class="highlight-text"><strong>68-Station CPCB Mesh:</strong> Strictly audited 24-hour rolling windows with dominant pollutant criteria.</div></li>
          <li><span class="bullet-gem">◆</span> <div class="highlight-text"><strong>61.12 µg/m³ RMSE:</strong> ML blend baseline evaluated over 4M+ observations across an annual cycle.</div></li>
          <li><span class="bullet-gem">◆</span> <div class="highlight-text"><strong>API-Grounded AI Assistant:</strong> Strictly bounded to 8 read-only API endpoints with verifiable tool calls.</div></li>
          <li><span class="bullet-gem">◆</span> <div class="highlight-text"><strong>NASA VIIRS:</strong> Fire corridor tracking aligned with meteorological wind vector transport.</div></li>
        </ul>

        <div class="link-buttons">
          <a href="https://airlytics-ncr.vercel.app/" target="_blank" class="ext-btn primary">🌐 Live Platform ↗</a>
          <a href="https://github.com/Ayush20-lex/airlytics-ncr" target="_blank" class="ext-btn secondary">📦 GitHub Repo ↗</a>
          <button class="pixel-btn" id="warp-observatory">⚡ Fast Travel to Observatory</button>
        </div>
      `,
      'tab-ai': `
        <h3 class="section-heading">⚡ Autonomous Developer Assistant</h3>
        <p>A personal software engineering assistant designed for terminal-first developer environments.</p>
        
        <ul class="highlights-list">
          <li><span class="bullet-gem">◆</span> <div class="highlight-text"><strong>Context-Driven Orchestration:</strong> Terminal workflow automation and project indexing.</div></li>
          <li><span class="bullet-gem">◆</span> <div class="highlight-text"><strong>Grounded Execution Contract:</strong> Strict workspace boundaries preventing unauthorized operations.</div></li>
          <li><span class="bullet-gem">◆</span> <div class="highlight-text"><strong>Confidentiality First:</strong> Zero credential leakage architecture and local-first execution.</div></li>
        </ul>

        <div class="link-buttons">
          <button class="pixel-btn" id="warp-workshop">⚡ Fast Travel to Workshop</button>
        </div>
      `,
      'tab-stack': `
        <h3 class="section-heading">🛠️ Verified Technical Arsenal</h3>
        <p>Technologies proven through active codebases, systems programming, and production deployments:</p>
        
        <ul class="highlights-list">
          <li><span class="bullet-gem">◆</span> <div class="highlight-text"><strong>Languages:</strong> Python (primary backend/ML), TypeScript, Java, Bash / Shell, SQL.</div></li>
          <li><span class="bullet-gem">◆</span> <div class="highlight-text"><strong>Frameworks:</strong> FastAPI, React 19, Pandas, NumPy, Scikit-Learn.</div></li>
          <li><span class="bullet-gem">◆</span> <div class="highlight-text"><strong>Systems & Tools:</strong> Linux (daily driver), Git, GitHub, VS Code, Vite, Vercel.</div></li>
        </ul>

        <div class="link-buttons">
          <a href="https://github.com/Ayush20-lex?tab=repositories" target="_blank" class="ext-btn primary">🐙 View Repositories ↗</a>
          <button class="pixel-btn" id="warp-redstone">⚡ Fast Travel to Redstone Lab</button>
        </div>
      `,
      'tab-lore': `
        <h3 class="section-heading">🗡️ Outside the Terminal (Gaming & Personal Lore)</h3>
        <p>Where challenge, exploration, and discipline meet outside the terminal:</p>
        
        <ul class="highlights-list">
          <li><span class="bullet-gem">◆</span> <div class="highlight-text"><strong>Metroidvanias:</strong> Deep appreciation for non-linear exploration, atmospheric lore, and precision combat (<em>Hollow Knight</em>, <em>Castlevania</em>, <em>Ori</em>).</div></li>
          <li><span class="bullet-gem">◆</span> <div class="highlight-text"><strong>Anime & Light Novels:</strong> Expansive worldbuilding, strategic tension, and progression narratives.</div></li>
          <li><span class="bullet-gem">◆</span> <div class="highlight-text"><strong>Calisthenics:</strong> Progressive bodyweight strength and physical discipline.</div></li>
        </ul>

        <div class="link-buttons">
          <button class="pixel-btn" id="warp-saveroom">⚡ Fast Travel to Save Room</button>
        </div>
      `,
      'tab-contact': `
        <h3 class="section-heading">🌌 Coordinates & Contact</h3>
        <p>Open for software engineering collaborations, environmental data projects, AI tooling, and technical chats.</p>
        
        <div class="link-buttons">
          <a href="https://github.com/Ayush20-lex" target="_blank" class="ext-btn primary">🐙 GitHub Profile ↗</a>
          <a href="https://www.linkedin.com/in/ayush-kumar-942081322/" target="_blank" class="ext-btn primary">💼 LinkedIn Profile ↗</a>
          <a href="mailto:ayushkumargbp@gmail.com" class="ext-btn secondary">✉️ Email: ayushkumargbp@gmail.com ↗</a>
          <button class="pixel-btn" id="warp-portal">⚡ Fast Travel to Nether Gate</button>
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
      this.game.player.x = 8 * 32;
      this.game.player.y = 7 * 32;
      this.game.player.direction = 'up';
      this.closeModal();
    });
    document.getElementById('warp-workshop')?.addEventListener('click', () => {
      this.game.player.x = 30 * 32;
      this.game.player.y = 7 * 32;
      this.game.player.direction = 'up';
      this.closeModal();
    });
    document.getElementById('warp-redstone')?.addEventListener('click', () => {
      this.game.player.x = 30 * 32;
      this.game.player.y = 20 * 32;
      this.game.player.direction = 'up';
      this.closeModal();
    });
    document.getElementById('warp-saveroom')?.addEventListener('click', () => {
      this.game.player.x = 8 * 32;
      this.game.player.y = 20 * 32;
      this.game.player.direction = 'up';
      this.closeModal();
    });
    document.getElementById('warp-portal')?.addEventListener('click', () => {
      this.game.player.x = 18 * 32;
      this.game.player.y = 5 * 32;
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
