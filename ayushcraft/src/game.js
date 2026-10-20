/**
 * AYUSHCRAFT — Core Game Engine & Canvas Renderer
 * Second-Pass Viewport, Rendering & Environmental Storytelling
 */

import { TILE_SIZE, generateTileAtlas, generatePlayerAtlas } from './tiles.js';
import { buildWorldData, getInteractableObjects, getZoneAt, MAP_WIDTH, MAP_HEIGHT } from './world.js';
import { Player } from './player.js';
import { UIManager } from './ui.js';
import { audio } from './audio.js';

export class Game {
  constructor() {
    this.canvas = document.getElementById('game-canvas');
    this.ctx = this.canvas.getContext('2d');
    this.ctx.imageSmoothingEnabled = false;

    // Viewport & Adaptive Scale
    this.viewWidth = 640;
    this.viewHeight = 360;
    this.camera = { x: 0, y: 0 };

    // Atlases
    this.tiles = generateTileAtlas();
    this.playerAtlas = generatePlayerAtlas();

    // World & Objects
    const { baseMap, collisionMap } = buildWorldData();
    this.baseMap = baseMap;
    this.collisionMap = collisionMap;
    this.objects = getInteractableObjects();

    // Entities
    this.player = new Player(18.5 * TILE_SIZE, 18.5 * TILE_SIZE);

    // Systems
    this.ui = new UIManager(this);

    // Discovery Milestones & Celebration State
    this.discoveredMilestones = new Set();
    this.pendingCelebration = false;

    // Input States
    this.input = { up: false, down: false, left: false, right: false };
    this.lastTime = performance.now();

    // Environmental Animation Clocks
    this.animClock = 0;

    // Setup input & responsive canvas
    this.initInput();
    this.resizeCanvas();
    window.addEventListener('resize', () => this.resizeCanvas());
    window.addEventListener('orientationchange', () => {
      setTimeout(() => this.resizeCanvas(), 80);
    });
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', () => this.resizeCanvas());
    }

    // Start loop
    requestAnimationFrame((t) => this.loop(t));
  }

  // Priority 2: Responsive Full-Screen Sizing & Sharp Integer/Proportional Scaling
  resizeCanvas() {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    // Choose optimal pixel zoom
    // 2.0x on standard desktop for crisp 64px virtual tile scale
    // Adaptive 1.35x - 1.6x on mobile screens to ensure 8-10 tiles fit comfortably
    let zoom = 2.0;
    if (windowWidth <= 520) {
      zoom = Math.max(1.35, Math.min(1.6, windowWidth / 260));
    } else if (windowWidth < 768 || windowHeight < 500) {
      zoom = 1.5;
    } else if (windowWidth < 1100 || windowHeight < 680) {
      zoom = 1.75;
    } else if (windowWidth > 1920) {
      zoom = 2.5;
    } else {
      zoom = 2.0;
    }

    // Set internal canvas resolution so it fills the screen cleanly
    this.viewWidth = Math.ceil(windowWidth / zoom);
    this.viewHeight = Math.ceil(windowHeight / zoom);

    this.canvas.width = this.viewWidth;
    this.canvas.height = this.viewHeight;

    this.canvas.style.width = '100%';
    this.canvas.style.height = '100%';

    this.ctx.imageSmoothingEnabled = false;
  }

  initInput() {
    // Keyboard listeners
    window.addEventListener('keydown', (e) => {
      if (this.ui.isModalOpen()) return;

      if (e.key === 'w' || e.key === 'W' || e.key === 'ArrowUp') this.input.up = true;
      if (e.key === 's' || e.key === 'S' || e.key === 'ArrowDown') this.input.down = true;
      if (e.key === 'a' || e.key === 'A' || e.key === 'ArrowLeft') this.input.left = true;
      if (e.key === 'd' || e.key === 'D' || e.key === 'ArrowRight') this.input.right = true;

      if (e.key === 'e' || e.key === 'E' || e.key === 'Enter' || e.key === ' ') {
        this.interact();
      }

      // Character Emote Shortcuts (1/V: Wave, 2/T: Thumbs-up, 3/C: Celebrate)
      if (e.key === '1' || e.key === 'v' || e.key === 'V') {
        this.player.triggerEmote('wave');
      } else if (e.key === '2' || e.key === 't' || e.key === 'T') {
        this.player.triggerEmote('thumbsup');
      } else if (e.key === '3' || e.key === 'c' || e.key === 'C') {
        this.player.triggerEmote('celebrate');
      }
    });

    window.addEventListener('keyup', (e) => {
      if (e.key === 'w' || e.key === 'W' || e.key === 'ArrowUp') this.input.up = false;
      if (e.key === 's' || e.key === 'S' || e.key === 'ArrowDown') this.input.down = false;
      if (e.key === 'a' || e.key === 'A' || e.key === 'ArrowLeft') this.input.left = false;
      if (e.key === 'd' || e.key === 'D' || e.key === 'ArrowRight') this.input.right = false;
    });

    // Canvas click / tap to move or interact
    this.canvas.addEventListener('click', (e) => {
      if (this.ui.isModalOpen()) return;

      const rect = this.canvas.getBoundingClientRect();
      const scaleX = this.viewWidth / rect.width;
      const scaleY = this.viewHeight / rect.height;

      const clickScreenX = (e.clientX - rect.left) * scaleX;
      const clickScreenY = (e.clientY - rect.top) * scaleY;

      const worldTargetX = clickScreenX + this.camera.x;
      const worldTargetY = clickScreenY + this.camera.y;

      // Check if clicked directly on an interactive object
      const clickedObj = this.objects.find(obj => {
        const ox = obj.tileX * TILE_SIZE;
        const oy = obj.tileY * TILE_SIZE;
        return (
          worldTargetX >= ox && worldTargetX <= ox + TILE_SIZE &&
          worldTargetY >= oy && worldTargetY <= oy + TILE_SIZE
        );
      });

      if (clickedObj) {
        const dist = Math.hypot(
          this.player.x + 16 - (clickedObj.tileX * 32 + 16),
          this.player.y + 20 - (clickedObj.tileY * 32 + 16)
        );
        if (dist < 52) {
          this.triggerObject(clickedObj);
          return;
        }
        this.pendingClickedObject = clickedObj;
        this.player.targetPos = { x: clickedObj.tileX * 32 + 16, y: clickedObj.tileY * 32 + 36 };
      } else {
        this.pendingClickedObject = null;
        this.player.targetPos = { x: worldTargetX, y: worldTargetY };
      }
    });

    // Mobile Virtual Touch D-Pad bindings
    const bindTouch = (id, dir) => {
      const btn = document.getElementById(id);
      if (!btn) return;

      const press = (e) => {
        if (e.cancelable) e.preventDefault();
        this.input[dir] = true;
      };
      const release = (e) => {
        if (e.cancelable) e.preventDefault();
        this.input[dir] = false;
      };

      btn.addEventListener('touchstart', press, { passive: false });
      btn.addEventListener('touchend', release, { passive: false });
      btn.addEventListener('touchcancel', release, { passive: false });

      btn.addEventListener('mousedown', (e) => {
        e.preventDefault();
        this.input[dir] = true;
      });
      btn.addEventListener('mouseup', (e) => {
        e.preventDefault();
        this.input[dir] = false;
      });
      btn.addEventListener('mouseleave', () => {
        this.input[dir] = false;
      });
    };

    bindTouch('dpad-up', 'up');
    bindTouch('dpad-down', 'down');
    bindTouch('dpad-left', 'left');
    bindTouch('dpad-right', 'right');

    const touchActionBtn = document.getElementById('touch-action-btn');
    if (touchActionBtn) {
      const handleAction = (e) => {
        if (e.cancelable) e.preventDefault();
        this.interact();
      };
      touchActionBtn.addEventListener('touchstart', handleAction, { passive: false });
      touchActionBtn.addEventListener('click', handleAction);
    }

    // Mobile Touch Emote Button & Quick Options Tray
    const touchEmoteBtn = document.getElementById('touch-emote-btn');
    this.emotePopover = document.getElementById('emote-popover');
    const emoteOptionBtns = document.querySelectorAll('.emote-option-btn');

    if (touchEmoteBtn) {
      const EMOTE_CYCLE = ['wave', 'thumbsup', 'celebrate'];
      const EMOTE_ICONS = { wave: '👋', thumbsup: '👍', celebrate: '🎉' };
      let cycleIndex = 0;
      let popoverTimer = null;

      const refreshPopoverTimer = () => {
        if (!this.emotePopover) return;
        this.emotePopover.classList.add('open');
        clearTimeout(popoverTimer);
        popoverTimer = setTimeout(() => {
          this.emotePopover?.classList.remove('open');
        }, 3600);
      };

      const handleEmoteCycle = (e) => {
        if (e.cancelable) e.preventDefault();
        const emoteType = EMOTE_CYCLE[cycleIndex];
        this.player.triggerEmote(emoteType);

        const iconSpan = document.getElementById('touch-emote-icon');
        if (iconSpan) {
          iconSpan.textContent = EMOTE_ICONS[emoteType];
        }

        cycleIndex = (cycleIndex + 1) % EMOTE_CYCLE.length;
        refreshPopoverTimer();
      };

      touchEmoteBtn.addEventListener('touchstart', handleEmoteCycle, { passive: false });
      touchEmoteBtn.addEventListener('click', handleEmoteCycle);

      // Direct selection buttons in the floating tray
      emoteOptionBtns.forEach(btn => {
        const handleDirectEmote = (e) => {
          if (e.cancelable) e.preventDefault();
          e.stopPropagation();
          const chosenEmote = btn.getAttribute('data-emote');
          if (chosenEmote) {
            this.player.triggerEmote(chosenEmote);
            const iconSpan = document.getElementById('touch-emote-icon');
            if (iconSpan && EMOTE_ICONS[chosenEmote]) {
              iconSpan.textContent = EMOTE_ICONS[chosenEmote];
            }
            const idx = EMOTE_CYCLE.indexOf(chosenEmote);
            if (idx !== -1) {
              cycleIndex = (idx + 1) % EMOTE_CYCLE.length;
            }
            refreshPopoverTimer();
          }
        };
        btn.addEventListener('touchstart', handleDirectEmote, { passive: false });
        btn.addEventListener('click', handleDirectEmote);
      });
    }
  }

  interact() {
    if (this.ui.isModalOpen()) return;

    if (this.player.nearbyObject) {
      this.triggerObject(this.player.nearbyObject);
    }
  }

  triggerObject(obj) {
    const MAJOR_MILESTONES = ['observatory_terminal', 'ai_workbench', 'redstone_chest', 'save_room_relic', 'nether_portal', 'redstone_lever'];
    const isFirstDiscovery = MAJOR_MILESTONES.includes(obj.id) && !this.discoveredMilestones.has(obj.id);

    if (obj.type === 'sign') {
      this.ui.openSign(obj.data.title, obj.data.text);
      if (isFirstDiscovery) {
        this.discoveredMilestones.add(obj.id);
        this.pendingCelebration = true;
      }
    } else if (obj.type === 'modal') {
      this.ui.openModal(obj.data);
      if (isFirstDiscovery) {
        this.discoveredMilestones.add(obj.id);
        this.pendingCelebration = true;
      }
    } else if (obj.type === 'toggle') {
      // Toggle Redstone lamp logic with live wire feedback
      obj.isOn = !obj.isOn;
      obj.tileType = obj.isOn ? 'LAMP_ON' : 'LAMP_OFF';

      // Update connected floor wire tiles in Redstone Lab
      const wireTile = obj.isOn ? 'REDSTONE_WIRE_ON' : 'REDSTONE_WIRE_OFF';
      this.baseMap[19][30] = wireTile;
      this.baseMap[20][30] = wireTile;

      audio.playToggle();
      this.ui.updateLocation(obj.isOn ? 'Redstone Circuit: Active ⚡ (15V Signal)' : 'Redstone Circuit: Inactive');

      // First-time activation celebration
      if (obj.isOn && isFirstDiscovery) {
        this.discoveredMilestones.add(obj.id);
        this.player.triggerEmote('celebrate');
      }
    }
  }

  update(dt) {
    this.animClock += dt;

    if (!this.ui.isModalOpen()) {
      this.player.update(dt, this.input, this.collisionMap, this.objects);
      if (this.player.isMoving && this.emotePopover?.classList.contains('open')) {
        this.emotePopover.classList.remove('open');
      }

      // Check if player reached clicked target object
      if (this.pendingClickedObject) {
        const dist = Math.hypot(
          this.player.x + 16 - (this.pendingClickedObject.tileX * 32 + 16),
          this.player.y + 20 - (this.pendingClickedObject.tileY * 32 + 16)
        );
        if (dist < 52) {
          const obj = this.pendingClickedObject;
          this.pendingClickedObject = null;
          this.player.targetPos = null;
          this.triggerObject(obj);
        }
      }
    }

    // Camera follow player with bounds clamping
    this.camera.x = Math.round(this.player.x + 16 - this.viewWidth / 2);
    this.camera.y = Math.round(this.player.y + 20 - this.viewHeight / 2);

    const maxCamX = MAP_WIDTH * TILE_SIZE - this.viewWidth;
    const maxCamY = MAP_HEIGHT * TILE_SIZE - this.viewHeight;

    if (maxCamX > 0) {
      this.camera.x = Math.max(0, Math.min(this.camera.x, maxCamX));
    } else {
      this.camera.x = Math.round(maxCamX / 2);
    }

    if (maxCamY > 0) {
      this.camera.y = Math.max(0, Math.min(this.camera.y, maxCamY));
    } else {
      this.camera.y = Math.round(maxCamY / 2);
    }

    // Update Proximity HUD Prompt
    if (this.player.nearbyObject) {
      this.ui.setInteractPrompt(true, this.player.nearbyObject.prompt || '[E] Interact');
    } else {
      this.ui.setInteractPrompt(false);
    }

    // Update Zone HUD
    const currentTileX = Math.floor((this.player.x + 16) / TILE_SIZE);
    const currentTileY = Math.floor((this.player.y + 20) / TILE_SIZE);
    this.ui.updateLocation(getZoneAt(currentTileX, currentTileY));
  }

  render() {
    this.ctx.clearRect(0, 0, this.viewWidth, this.viewHeight);

    // Save camera translation
    this.ctx.save();
    this.ctx.translate(-this.camera.x, -this.camera.y);

    // 1. Render Base Ground Tiles
    const minX = Math.max(0, Math.floor(this.camera.x / TILE_SIZE));
    const maxX = Math.min(MAP_WIDTH - 1, Math.ceil((this.camera.x + this.viewWidth) / TILE_SIZE));
    const minY = Math.max(0, Math.floor(this.camera.y / TILE_SIZE));
    const maxY = Math.min(MAP_HEIGHT - 1, Math.ceil((this.camera.y + this.viewHeight) / TILE_SIZE));

    for (let y = minY; y <= maxY; y++) {
      for (let x = minX; x <= maxX; x++) {
        const tileType = this.baseMap[y][x];
        const tileImg = this.tiles[tileType];
        if (tileImg) {
          this.ctx.drawImage(tileImg, x * TILE_SIZE, y * TILE_SIZE);
        }

        // Priority 5: Handcrafted River Flow Animation & Foam
        if (tileType === 'WATER') {
          const waveShift = Math.sin(this.animClock * 2.8 + x * 0.7 + y * 0.9) * 3;
          this.ctx.fillStyle = 'rgba(255, 255, 255, 0.22)';
          this.ctx.fillRect(x * TILE_SIZE + 6 + waveShift, y * TILE_SIZE + 8, 7, 2);
          this.ctx.fillRect(x * TILE_SIZE + 16 - waveShift, y * TILE_SIZE + 20, 8, 2);
        }

        // Priority 5: Active Redstone Sparks
        if (tileType === 'REDSTONE_WIRE_ON') {
          const spark = Math.sin(this.animClock * 12 + x + y) > 0.4;
          if (spark) {
            this.ctx.fillStyle = '#fef08a';
            this.ctx.fillRect(x * TILE_SIZE + 15, y * TILE_SIZE + 15, 2, 2);
          }
        }

        // Portal swirling mystical energy
        if (tileType === 'PORTAL') {
          const shimmer = (Math.sin(this.animClock * 3.5 + x * 1.5 + y) + 1) * 0.18;
          this.ctx.fillStyle = `rgba(192, 132, 252, ${shimmer})`;
          this.ctx.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
        }
      }
    }

    // 2. Render Interactive Objects & Decorations
    this.objects.forEach(obj => {
      const tileImg = this.tiles[obj.tileType];
      if (tileImg) {
        this.ctx.drawImage(tileImg, obj.tileX * TILE_SIZE, obj.tileY * TILE_SIZE);
      }

      // Priority 5: Handcrafted Storytelling Details
      // A: Save Room Lantern gentle amber breathing flicker
      if (obj.id === 'save_room_lantern') {
        const flicker = Math.sin(this.animClock * 4.5) * 0.08 + Math.sin(this.animClock * 11) * 0.04;
        const rad = 28 + Math.sin(this.animClock * 2) * 2;
        const grad = this.ctx.createRadialGradient(
          obj.tileX * TILE_SIZE + 16, obj.tileY * TILE_SIZE + 16, 4,
          obj.tileX * TILE_SIZE + 16, obj.tileY * TILE_SIZE + 16, rad
        );
        grad.addColorStop(0, `rgba(245, 158, 11, ${0.28 + flicker})`);
        grad.addColorStop(1, 'rgba(245, 158, 11, 0)');
        this.ctx.fillStyle = grad;
        this.ctx.beginPath();
        this.ctx.arc(obj.tileX * TILE_SIZE + 16, obj.tileY * TILE_SIZE + 16, rad, 0, Math.PI * 2);
        this.ctx.fill();
      }

      // B: Hollow Knight Nail Relic Soul Shimmer
      if (obj.id === 'save_room_relic') {
        const distToPlayer = Math.hypot(
          this.player.x + 16 - (obj.tileX * 32 + 16),
          this.player.y + 20 - (obj.tileY * 32 + 16)
        );
        if (distToPlayer < 65) {
          const soulPulse = (Math.sin(this.animClock * 4) + 1) * 0.15;
          this.ctx.fillStyle = `rgba(56, 189, 248, ${0.15 + soulPulse})`;
          this.ctx.beginPath();
          this.ctx.arc(obj.tileX * TILE_SIZE + 16, obj.tileY * TILE_SIZE + 12, 16, 0, Math.PI * 2);
          this.ctx.fill();
        }
      }

      // C: Active Redstone Lamp Light Bloom
      if (obj.id === 'redstone_lamp_1' && obj.isOn) {
        const lampGrad = this.ctx.createRadialGradient(
          obj.tileX * TILE_SIZE + 16, obj.tileY * TILE_SIZE + 16, 6,
          obj.tileX * TILE_SIZE + 16, obj.tileY * TILE_SIZE + 16, 42
        );
        lampGrad.addColorStop(0, 'rgba(254, 240, 138, 0.45)');
        lampGrad.addColorStop(1, 'rgba(234, 179, 8, 0)');
        this.ctx.fillStyle = lampGrad;
        this.ctx.beginPath();
        this.ctx.arc(obj.tileX * TILE_SIZE + 16, obj.tileY * TILE_SIZE + 16, 42, 0, Math.PI * 2);
        this.ctx.fill();
      }

      // Proximity pointer bob
      if (this.player.nearbyObject === obj) {
        const hoverBob = Math.sin(this.animClock * 6.5) * 3;
        this.ctx.fillStyle = '#fde047';
        this.ctx.beginPath();
        const px = obj.tileX * TILE_SIZE + 16;
        const py = obj.tileY * TILE_SIZE - 7 + hoverBob;
        this.ctx.moveTo(px - 5, py);
        this.ctx.lineTo(px + 5, py);
        this.ctx.lineTo(px, py + 5);
        this.ctx.fill();
      }
    });

    // 3. Render Tree Groves (Natural Oak, Birch & Evergreen Clusters)
    const oakTrees = [
      [14, 12], [23, 12], [14, 22],
      [1, 1], [36, 1], [4, 2], [33, 2]
    ];
    oakTrees.forEach(([tx, ty]) => {
      const oakImg = this.tiles['TREE_TOP'];
      if (oakImg) {
        this.ctx.drawImage(oakImg, tx * TILE_SIZE - 16, ty * TILE_SIZE - 28);
      }
    });

    const birchTrees = [
      [22, 22], [24, 24], [11, 24]
    ];
    birchTrees.forEach(([tx, ty]) => {
      const birchImg = this.tiles['TREE_BIRCH'] || this.tiles['TREE_TOP'];
      if (birchImg) {
        this.ctx.drawImage(birchImg, tx * TILE_SIZE - 16, ty * TILE_SIZE - 28);
      }
    });

    const pineTrees = [
      [2, 12], [2, 13], [35, 12], [35, 13],
      [11, 12], [16, 26]
    ];
    pineTrees.forEach(([tx, ty]) => {
      const pineImg = this.tiles['TREE_PINE'];
      if (pineImg) {
        this.ctx.drawImage(pineImg, tx * TILE_SIZE - 16, ty * TILE_SIZE - 28);
      }
    });

    // 4. Render Player Character
    this.player.render(this.ctx, this.playerAtlas);

    // 5. Restore camera
    this.ctx.restore();

    // 6. Restrained Atmospheric Vignette
    const grad = this.ctx.createRadialGradient(
      this.viewWidth / 2, this.viewHeight / 2, this.viewWidth * 0.42,
      this.viewWidth / 2, this.viewHeight / 2, this.viewWidth * 0.85
    );
    grad.addColorStop(0, 'rgba(0,0,0,0)');
    grad.addColorStop(1, 'rgba(0,0,0,0.38)');
    this.ctx.fillStyle = grad;
    this.ctx.fillRect(0, 0, this.viewWidth, this.viewHeight);
  }

  loop(timestamp) {
    const dt = Math.min((timestamp - this.lastTime) / 1000, 0.05);
    this.lastTime = timestamp;

    this.update(dt);
    this.render();

    requestAnimationFrame((t) => this.loop(t));
  }
}
