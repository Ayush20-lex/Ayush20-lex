/**
 * AYUSHCRAFT — Core Game Engine & Canvas Renderer
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

    // Viewport & Scale
    this.viewWidth = 640;  // Virtual resolution width
    this.viewHeight = 440; // Virtual resolution height
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

    // Input States
    this.input = { up: false, down: false, left: false, right: false };
    this.lastTime = performance.now();

    // Water animation timer
    this.animClock = 0;

    // Mobile / Touch controls setup
    this.initInput();
    this.resizeCanvas();
    window.addEventListener('resize', () => this.resizeCanvas());

    // Start loop
    requestAnimationFrame((t) => this.loop(t));
  }

  resizeCanvas() {
    const dpr = window.devicePixelRatio || 1;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    // Scale pixel canvas maintaining aspect ratio
    const scale = Math.min(windowWidth / this.viewWidth, windowHeight / this.viewHeight);
    const canvasWidth = Math.floor(this.viewWidth * Math.max(1, Math.floor(scale)));
    const canvasHeight = Math.floor(this.viewHeight * Math.max(1, Math.floor(scale)));

    this.canvas.width = this.viewWidth;
    this.canvas.height = this.viewHeight;

    this.canvas.style.width = `${canvasWidth}px`;
    this.canvas.style.height = `${canvasHeight}px`;

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
    });

    window.addEventListener('keyup', (e) => {
      if (e.key === 'w' || e.key === 'W' || e.key === 'ArrowUp') this.input.up = false;
      if (e.key === 's' || e.key === 'S' || e.key === 'ArrowDown') this.input.down = false;
      if (e.key === 'a' || e.key === 'A' || e.key === 'ArrowLeft') this.input.left = false;
      if (e.key === 'd' || e.key === 'D' || e.key === 'ArrowRight') this.input.right = false;
    });

    // Canvas click / tap to move
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
        // If nearby, interact directly; otherwise walk toward it and trigger on arrival
        const dist = Math.hypot(this.player.x + 16 - (clickedObj.tileX * 32 + 16), this.player.y + 20 - (clickedObj.tileY * 32 + 16));
        if (dist < 50) {
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

    // Mobile Virtual D-Pad buttons
    const bindTouch = (id, dir) => {
      const btn = document.getElementById(id);
      if (!btn) return;
      btn.addEventListener('touchstart', (e) => {
        e.preventDefault();
        this.input[dir] = true;
      });
      btn.addEventListener('touchend', (e) => {
        e.preventDefault();
        this.input[dir] = false;
      });
      btn.addEventListener('mousedown', () => this.input[dir] = true);
      btn.addEventListener('mouseup', () => this.input[dir] = false);
    };

    bindTouch('dpad-up', 'up');
    bindTouch('dpad-down', 'down');
    bindTouch('dpad-left', 'left');
    bindTouch('dpad-right', 'right');

    const touchActionBtn = document.getElementById('touch-action-btn');
    if (touchActionBtn) {
      touchActionBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.interact();
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
    if (obj.type === 'sign') {
      this.ui.openSign(obj.data.title, obj.data.text);
    } else if (obj.type === 'modal') {
      this.ui.openModal(obj.data);
    } else if (obj.type === 'toggle') {
      // Toggle Redstone lamp logic
      obj.isOn = !obj.isOn;
      obj.tileType = obj.isOn ? 'LAMP_ON' : 'LAMP_OFF';
      audio.playToggle();
      this.ui.updateLocation(obj.isOn ? 'Redstone Circuit: Active ⚡' : 'Redstone Circuit: Inactive');
    }
  }

  update(dt) {
    this.animClock += dt;

    if (!this.ui.isModalOpen()) {
      this.player.update(dt, this.input, this.collisionMap, this.objects);

      // Check if player reached clicked target object
      if (this.pendingClickedObject) {
        const dist = Math.hypot(
          this.player.x + 16 - (this.pendingClickedObject.tileX * 32 + 16),
          this.player.y + 20 - (this.pendingClickedObject.tileY * 32 + 16)
        );
        if (dist < 50) {
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
    this.camera.x = Math.max(0, Math.min(this.camera.x, maxCamX));
    this.camera.y = Math.max(0, Math.min(this.camera.y, maxCamY));

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

        // Animated water highlights
        if (tileType === 'WATER') {
          const waveShift = Math.sin(this.animClock * 3 + x + y) * 2;
          this.ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
          this.ctx.fillRect(x * TILE_SIZE + 6 + waveShift, y * TILE_SIZE + 10, 8, 2);
        }

        // Animated portal swirls
        if (tileType === 'PORTAL') {
          const shimmer = (Math.sin(this.animClock * 4 + x * 2) + 1) * 0.15;
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

      // If nearby, draw a little floating highlight indicator
      if (this.player.nearbyObject === obj) {
        const hoverBob = Math.sin(this.animClock * 6) * 3;
        this.ctx.fillStyle = '#fde047';
        this.ctx.beginPath();
        const px = obj.tileX * TILE_SIZE + 16;
        const py = obj.tileY * TILE_SIZE - 6 + hoverBob;
        this.ctx.moveTo(px - 5, py);
        this.ctx.lineTo(px + 5, py);
        this.ctx.lineTo(px, py + 5);
        this.ctx.fill();
      }
    });

    // 3. Render Trees (Foliage canopy)
    const treeLocations = [
      [15, 14], [22, 14], [14, 22], [22, 22],
      [1, 1], [2, 1], [35, 1], [36, 1],
      [12, 6], [24, 6], [12, 18], [24, 18]
    ];
    treeLocations.forEach(([tx, ty]) => {
      const treeImg = this.tiles['TREE_TOP'];
      if (treeImg) {
        this.ctx.drawImage(treeImg, tx * TILE_SIZE - 16, ty * TILE_SIZE - 28);
      }
    });

    // 4. Render Player
    this.player.render(this.ctx, this.playerAtlas);

    // 5. Restore camera
    this.ctx.restore();

    // 6. Vignette overlay for atmosphere
    const grad = this.ctx.createRadialGradient(
      this.viewWidth / 2, this.viewHeight / 2, this.viewWidth * 0.4,
      this.viewWidth / 2, this.viewHeight / 2, this.viewWidth * 0.75
    );
    grad.addColorStop(0, 'rgba(0,0,0,0)');
    grad.addColorStop(1, 'rgba(0,0,0,0.45)');
    this.ctx.fillStyle = grad;
    this.ctx.fillRect(0, 0, this.viewWidth, this.viewHeight);
  }

  loop(timestamp) {
    const dt = Math.min((timestamp - this.lastTime) / 1000, 0.05); // clamp max dt to prevent jumps
    this.lastTime = timestamp;

    this.update(dt);
    this.render();

    requestAnimationFrame((t) => this.loop(t));
  }
}
