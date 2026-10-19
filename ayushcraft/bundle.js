// AYUSHCRAFT Standalone Bundle
(function() {
  if (window.__AYUSHCRAFT__) return; // Prevent double init

  /**
 * AYUSHCRAFT — Tile and Sprite Generator
 * Procedural Pixel-Art Graphics Engine
 */

const TILE_SIZE = 32;

// Offscreen canvas helper
function createTileCanvas(width = TILE_SIZE, height = TILE_SIZE) {
  const c = document.createElement('canvas');
  c.width = width;
  c.height = height;
  const ctx = c.getContext('2d');
  ctx.imageSmoothingEnabled = false;
  return { canvas: c, ctx };
}

// Generate all procedural tile textures
function generateTileAtlas() {
  const tiles = {};

  // 1. GRASS
  {
    const { canvas, ctx } = createTileCanvas();
    ctx.fillStyle = '#489c3b';
    ctx.fillRect(0, 0, 32, 32);
    // Darker patches
    ctx.fillStyle = '#3c8531';
    ctx.fillRect(4, 6, 8, 8);
    ctx.fillRect(20, 18, 6, 8);
    ctx.fillRect(14, 2, 6, 4);
    // Lighter highlights
    ctx.fillStyle = '#5cb84d';
    ctx.fillRect(8, 4, 4, 4);
    ctx.fillRect(18, 12, 4, 6);
    ctx.fillRect(2, 22, 4, 4);
    ctx.fillRect(24, 24, 4, 4);
    tiles['GRASS'] = canvas;
  }

  // 2. DIRT PATH
  {
    const { canvas, ctx } = createTileCanvas();
    ctx.fillStyle = '#8f633d';
    ctx.fillRect(0, 0, 32, 32);
    // Dirt variation
    ctx.fillStyle = '#78502f';
    ctx.fillRect(2, 6, 12, 8);
    ctx.fillRect(18, 18, 10, 8);
    ctx.fillRect(8, 24, 6, 6);
    // Pebbles / gravel
    ctx.fillStyle = '#aa825b';
    ctx.fillRect(6, 8, 4, 4);
    ctx.fillRect(22, 6, 4, 4);
    ctx.fillRect(16, 14, 6, 4);
    ctx.fillRect(12, 26, 4, 4);
    tiles['DIRT_PATH'] = canvas;
  }

  // 3. COBBLESTONE
  {
    const { canvas, ctx } = createTileCanvas();
    ctx.fillStyle = '#636573';
    ctx.fillRect(0, 0, 32, 32);
    ctx.fillStyle = '#41424d'; // Mortar
    ctx.fillRect(0, 15, 32, 2);
    ctx.fillRect(0, 31, 32, 1);
    ctx.fillRect(15, 0, 2, 15);
    ctx.fillRect(23, 16, 2, 16);
    // Stone highlights & cracks
    ctx.fillStyle = '#7a7d8c';
    ctx.fillRect(2, 2, 11, 4);
    ctx.fillRect(18, 2, 12, 4);
    ctx.fillRect(2, 18, 19, 4);
    ctx.fillRect(26, 18, 5, 4);
    tiles['COBBLESTONE'] = canvas;
  }

  // 4. WATER (Base frame)
  {
    const { canvas, ctx } = createTileCanvas();
    ctx.fillStyle = '#2563eb';
    ctx.fillRect(0, 0, 32, 32);
    ctx.fillStyle = '#3b82f6';
    ctx.fillRect(4, 8, 14, 4);
    ctx.fillRect(14, 20, 12, 4);
    ctx.fillStyle = '#60a5fa';
    ctx.fillRect(6, 10, 8, 2);
    ctx.fillRect(18, 22, 6, 2);
    tiles['WATER'] = canvas;
  }

  // 5. WOOD PLANKS
  {
    const { canvas, ctx } = createTileCanvas();
    ctx.fillStyle = '#8f563b';
    ctx.fillRect(0, 0, 32, 32);
    ctx.fillStyle = '#4d2e1f'; // Grain gaps
    ctx.fillRect(0, 7, 32, 2);
    ctx.fillRect(0, 15, 32, 2);
    ctx.fillRect(0, 23, 32, 2);
    ctx.fillRect(0, 31, 32, 1);
    ctx.fillRect(14, 0, 2, 7);
    ctx.fillRect(24, 8, 2, 7);
    ctx.fillRect(8, 16, 2, 7);
    ctx.fillRect(20, 24, 2, 7);
    // Planks highlight
    ctx.fillStyle = '#aa6f4c';
    ctx.fillRect(2, 1, 10, 2);
    ctx.fillRect(18, 1, 12, 2);
    ctx.fillRect(2, 9, 20, 2);
    tiles['WOOD_PLANKS'] = canvas;
  }

  // 6. STONE BRICK
  {
    const { canvas, ctx } = createTileCanvas();
    ctx.fillStyle = '#565969';
    ctx.fillRect(0, 0, 32, 32);
    ctx.fillStyle = '#363842';
    ctx.strokeRect(0, 0, 32, 32);
    ctx.fillRect(0, 15, 32, 2);
    ctx.fillRect(15, 0, 2, 15);
    ctx.fillRect(15, 16, 2, 16);
    ctx.fillStyle = '#71758a';
    ctx.fillRect(2, 2, 11, 2);
    ctx.fillRect(18, 2, 12, 2);
    ctx.fillRect(2, 18, 11, 2);
    ctx.fillRect(18, 18, 12, 2);
    tiles['STONE_BRICK'] = canvas;
  }

  // 7. OBSIDIAN
  {
    const { canvas, ctx } = createTileCanvas();
    ctx.fillStyle = '#171424';
    ctx.fillRect(0, 0, 32, 32);
    ctx.fillStyle = '#30264d';
    ctx.fillRect(4, 4, 10, 10);
    ctx.fillRect(18, 16, 10, 12);
    ctx.fillStyle = '#6b3ea8';
    ctx.fillRect(6, 6, 4, 4);
    ctx.fillRect(22, 20, 4, 4);
    tiles['OBSIDIAN'] = canvas;
  }

  // 8. PORTAL FIELD (Runic energy)
  {
    const { canvas, ctx } = createTileCanvas();
    ctx.fillStyle = '#4c1d95';
    ctx.fillRect(0, 0, 32, 32);
    ctx.fillStyle = '#7c3aed';
    ctx.fillRect(6, 4, 8, 12);
    ctx.fillRect(18, 14, 10, 14);
    ctx.fillStyle = '#c084fc';
    ctx.fillRect(8, 8, 4, 4);
    ctx.fillRect(20, 18, 4, 4);
    tiles['PORTAL'] = canvas;
  }

  // 9. TREE TOP (Foliage 64x64)
  {
    const { canvas, ctx } = createTileCanvas(64, 64);
    // Tree leaves shadow
    ctx.fillStyle = '#1e5e22';
    ctx.fillRect(8, 8, 48, 48);
    // Main foliage
    ctx.fillStyle = '#2e8b34';
    ctx.fillRect(12, 12, 40, 40);
    // Highlights
    ctx.fillStyle = '#48b850';
    ctx.fillRect(16, 16, 16, 14);
    ctx.fillRect(36, 24, 12, 12);
    ctx.fillRect(20, 36, 16, 10);
    tiles['TREE_TOP'] = canvas;
  }

  // 10. TREE TRUNK
  {
    const { canvas, ctx } = createTileCanvas();
    ctx.fillStyle = '#489c3b'; // grass underneath
    ctx.fillRect(0, 0, 32, 32);
    ctx.fillStyle = '#54341b';
    ctx.fillRect(10, 0, 12, 32);
    ctx.fillStyle = '#3a2211';
    ctx.fillRect(10, 0, 3, 32);
    ctx.fillStyle = '#714624';
    ctx.fillRect(15, 0, 4, 32);
    tiles['TREE_TRUNK'] = canvas;
  }

  // 11. REDSTONE WIRE (Unpowered)
  {
    const { canvas, ctx } = createTileCanvas();
    ctx.fillStyle = 'transparent';
    ctx.fillRect(0, 0, 32, 32);
    ctx.fillStyle = '#7f1d1d';
    ctx.fillRect(14, 0, 4, 32);
    ctx.fillRect(0, 14, 32, 4);
    tiles['REDSTONE_WIRE_OFF'] = canvas;
  }

  // 12. REDSTONE WIRE (Powered)
  {
    const { canvas, ctx } = createTileCanvas();
    ctx.fillStyle = 'transparent';
    ctx.fillRect(0, 0, 32, 32);
    ctx.fillStyle = '#ef4444';
    ctx.fillRect(14, 0, 4, 32);
    ctx.fillRect(0, 14, 32, 4);
    ctx.fillStyle = '#fca5a5';
    ctx.fillRect(15, 15, 2, 2);
    tiles['REDSTONE_WIRE_ON'] = canvas;
  }

  // 13. REDSTONE LAMP (OFF)
  {
    const { canvas, ctx } = createTileCanvas();
    ctx.fillStyle = '#451a03';
    ctx.fillRect(0, 0, 32, 32);
    ctx.fillStyle = '#78350f';
    ctx.fillRect(4, 4, 24, 24);
    ctx.fillStyle = '#92400e';
    ctx.fillRect(6, 6, 20, 20);
    ctx.fillStyle = '#b45309';
    ctx.fillRect(10, 10, 12, 12);
    tiles['LAMP_OFF'] = canvas;
  }

  // 14. REDSTONE LAMP (ON)
  {
    const { canvas, ctx } = createTileCanvas();
    ctx.fillStyle = '#78350f';
    ctx.fillRect(0, 0, 32, 32);
    ctx.fillStyle = '#f59e0b';
    ctx.fillRect(4, 4, 24, 24);
    ctx.fillStyle = '#fde047';
    ctx.fillRect(8, 8, 16, 16);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(12, 12, 8, 8);
    tiles['LAMP_ON'] = canvas;
  }

  // 15. BOOKSHELF
  {
    const { canvas, ctx } = createTileCanvas();
    ctx.fillStyle = '#8f563b';
    ctx.fillRect(0, 0, 32, 32);
    ctx.fillStyle = '#4d2e1f';
    ctx.fillRect(2, 4, 28, 10);
    ctx.fillRect(2, 18, 28, 10);
    // Books top shelf
    const colors = ['#dc2626', '#2563eb', '#16a34a', '#d97706', '#9333ea'];
    for (let i = 0; i < 5; i++) {
      ctx.fillStyle = colors[i % colors.length];
      ctx.fillRect(4 + i * 5, 5, 4, 8);
      ctx.fillStyle = '#fef08a';
      ctx.fillRect(5 + i * 5, 7, 2, 2);
    }
    // Books bottom shelf
    for (let i = 0; i < 5; i++) {
      ctx.fillStyle = colors[(i + 2) % colors.length];
      ctx.fillRect(4 + i * 5, 19, 4, 8);
      ctx.fillStyle = '#fef08a';
      ctx.fillRect(5 + i * 5, 21, 2, 2);
    }
    tiles['BOOKSHELF'] = canvas;
  }

  // 16. CRAFTING TABLE
  {
    const { canvas, ctx } = createTileCanvas();
    ctx.fillStyle = '#a16207';
    ctx.fillRect(0, 0, 32, 32);
    ctx.fillStyle = '#713f12';
    ctx.strokeRect(1, 1, 30, 30);
    // Grid on top
    ctx.fillStyle = '#ca8a04';
    ctx.fillRect(4, 4, 24, 24);
    ctx.fillStyle = '#713f12';
    ctx.fillRect(11, 4, 2, 24);
    ctx.fillRect(19, 4, 2, 24);
    ctx.fillRect(4, 11, 24, 2);
    ctx.fillRect(4, 19, 24, 2);
    tiles['WORKBENCH'] = canvas;
  }

  // 17. TELESCOPE / OBSERVATORY INSTRUMENT
  {
    const { canvas, ctx } = createTileCanvas();
    ctx.fillStyle = 'transparent';
    ctx.fillRect(0, 0, 32, 32);
    // Tripod legs
    ctx.fillStyle = '#475569';
    ctx.fillRect(6, 20, 4, 12);
    ctx.fillRect(22, 20, 4, 12);
    ctx.fillRect(14, 16, 4, 16);
    // Brass barrel angled
    ctx.fillStyle = '#d97706';
    ctx.fillRect(8, 8, 18, 8);
    ctx.fillStyle = '#fbbf24';
    ctx.fillRect(10, 6, 12, 4);
    // Lens
    ctx.fillStyle = '#38bdf8';
    ctx.fillRect(24, 6, 4, 10);
    tiles['TELESCOPE'] = canvas;
  }

  // 18. SIGNPOST
  {
    const { canvas, ctx } = createTileCanvas();
    ctx.fillStyle = 'transparent';
    ctx.fillRect(0, 0, 32, 32);
    // Wooden board
    ctx.fillStyle = '#b45309';
    ctx.fillRect(4, 4, 24, 16);
    ctx.fillStyle = '#d97706';
    ctx.fillRect(6, 6, 20, 12);
    // Text lines
    ctx.fillStyle = '#78350f';
    ctx.fillRect(8, 8, 16, 2);
    ctx.fillRect(8, 12, 12, 2);
    // Post
    ctx.fillStyle = '#78350f';
    ctx.fillRect(14, 20, 4, 12);
    tiles['SIGN'] = canvas;
  }

  // 19. NAIL RELIC (Hollow Knight homage)
  {
    const { canvas, ctx } = createTileCanvas();
    ctx.fillStyle = 'transparent';
    ctx.fillRect(0, 0, 32, 32);
    // Stone Pedestal
    ctx.fillStyle = '#334155';
    ctx.fillRect(6, 20, 20, 12);
    ctx.fillStyle = '#64748b';
    ctx.fillRect(8, 18, 16, 4);
    // Silver Nail blade
    ctx.fillStyle = '#cbd5e1';
    ctx.fillRect(15, 2, 2, 16);
    ctx.fillRect(14, 4, 4, 10);
    ctx.fillRect(13, 8, 6, 4);
    // Crossguard & pommel
    ctx.fillStyle = '#94a3b8';
    ctx.fillRect(12, 14, 8, 2);
    ctx.fillStyle = '#475569';
    ctx.fillRect(15, 16, 2, 4);
    tiles['NAIL_RELIC'] = canvas;
  }

  // 20. FENCE
  {
    const { canvas, ctx } = createTileCanvas();
    ctx.fillStyle = 'transparent';
    ctx.fillRect(0, 0, 32, 32);
    ctx.fillStyle = '#78350f';
    ctx.fillRect(4, 2, 6, 30);
    ctx.fillRect(22, 2, 6, 30);
    ctx.fillStyle = '#b45309';
    ctx.fillRect(10, 8, 12, 4);
    ctx.fillRect(10, 20, 12, 4);
    tiles['FENCE'] = canvas;
  }

  return tiles;
}

// Generate Player Character Sprite Atlas (4 directions × 3 walk frames)
function generatePlayerAtlas() {
  const atlas = {};
  const dirs = ['down', 'up', 'left', 'right'];

  dirs.forEach(dir => {
    atlas[dir] = [];
    for (let frame = 0; frame < 3; frame++) {
      const { canvas, ctx } = createTileCanvas(32, 32);

      // Shadow underneath
      ctx.fillStyle = 'rgba(0,0,0,0.25)';
      ctx.beginPath();
      ctx.ellipse(16, 30, 8, 3, 0, 0, Math.PI * 2);
      ctx.fill();

      // Foot offset for walking
      const legOffset = frame === 1 ? -2 : (frame === 2 ? 2 : 0);

      if (dir === 'down') {
        // Back hair / head
        ctx.fillStyle = '#1e1b18';
        ctx.fillRect(10, 4, 12, 10);
        // Face skin
        ctx.fillStyle = '#fcd34d';
        ctx.fillRect(11, 7, 10, 7);
        // Eyes
        ctx.fillStyle = '#1e293b';
        ctx.fillRect(13, 10, 2, 3);
        ctx.fillRect(17, 10, 2, 3);
        // Front hair bangs
        ctx.fillStyle = '#292524';
        ctx.fillRect(10, 4, 12, 4);
        ctx.fillRect(10, 8, 2, 3);

        // Blue Hoodie / Body
        ctx.fillStyle = '#0284c7';
        ctx.fillRect(9, 14, 14, 10);
        ctx.fillStyle = '#38bdf8'; // Zipper / collar
        ctx.fillRect(15, 15, 2, 8);

        // Pants / Boots
        ctx.fillStyle = '#1e293b';
        ctx.fillRect(11, 24, 4, 5 + (legOffset > 0 ? legOffset : 0));
        ctx.fillRect(17, 24, 4, 5 + (legOffset < 0 ? -legOffset : 0));
      } else if (dir === 'up') {
        // Head back
        ctx.fillStyle = '#1e1b18';
        ctx.fillRect(10, 4, 12, 11);
        ctx.fillStyle = '#292524';
        ctx.fillRect(11, 5, 10, 6);

        // Blue Hoodie Back
        ctx.fillStyle = '#0369a1';
        ctx.fillRect(9, 14, 14, 10);
        ctx.fillStyle = '#0284c7'; // Hood
        ctx.fillRect(11, 14, 10, 4);

        // Pants
        ctx.fillStyle = '#1e293b';
        ctx.fillRect(11, 24, 4, 5 + (legOffset > 0 ? legOffset : 0));
        ctx.fillRect(17, 24, 4, 5 + (legOffset < 0 ? -legOffset : 0));
      } else if (dir === 'left') {
        // Head side
        ctx.fillStyle = '#1e1b18';
        ctx.fillRect(11, 4, 10, 10);
        ctx.fillStyle = '#fcd34d';
        ctx.fillRect(10, 7, 7, 7);
        // Eye
        ctx.fillStyle = '#1e293b';
        ctx.fillRect(11, 10, 2, 3);

        // Body
        ctx.fillStyle = '#0284c7';
        ctx.fillRect(11, 14, 10, 10);
        // Arm
        ctx.fillStyle = '#0369a1';
        ctx.fillRect(13 + legOffset, 15, 4, 8);

        // Pants
        ctx.fillStyle = '#1e293b';
        ctx.fillRect(12 + legOffset, 24, 4, 5);
        ctx.fillRect(15 - legOffset, 24, 4, 5);
      } else if (dir === 'right') {
        // Head side
        ctx.fillStyle = '#1e1b18';
        ctx.fillRect(11, 4, 10, 10);
        ctx.fillStyle = '#fcd34d';
        ctx.fillRect(15, 7, 7, 7);
        // Eye
        ctx.fillStyle = '#1e293b';
        ctx.fillRect(19, 10, 2, 3);

        // Body
        ctx.fillStyle = '#0284c7';
        ctx.fillRect(11, 14, 10, 10);
        // Arm
        ctx.fillStyle = '#0369a1';
        ctx.fillRect(15 - legOffset, 15, 4, 8);

        // Pants
        ctx.fillStyle = '#1e293b';
        ctx.fillRect(13 - legOffset, 24, 4, 5);
        ctx.fillRect(16 + legOffset, 24, 4, 5);
      }

      atlas[dir].push(canvas);
    }
  });

  return atlas;
}

  /**
 * AYUSHCRAFT — Retro Web Audio Synthesizer
 * Zero-asset, zero-latency 8-bit sound effects
 */

class SoundManager {
  constructor() {
    this.ctx = null;
    this.muted = true; // Muted by default per design guidelines
  }

  init() {
    if (!this.ctx && (window.AudioContext || window.webkitAudioContext)) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleMute() {
    this.init();
    this.muted = !this.muted;
    return this.muted;
  }

  isMuted() {
    return this.muted;
  }

  playBlip(freq = 440, type = 'square', duration = 0.08, vol = 0.05) {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      gain.gain.setValueAtTime(vol, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {
      // Audio autoplay policy fallback
    }
  }

  playStep() {
    this.playBlip(120, 'triangle', 0.04, 0.02);
  }

  playInteract() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      [523.25, 659.25, 783.99].forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.06);
        gain.gain.setValueAtTime(0.04, now + idx * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.06 + 0.12);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + idx * 0.06);
        osc.stop(now + idx * 0.06 + 0.12);
      });
    } catch (e) {}
  }

  playToggle() {
    this.playBlip(880, 'square', 0.06, 0.03);
  }

  playSecret() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      [440, 554.37, 659.25, 880].forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);
        gain.gain.setValueAtTime(0.05, now + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.2);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 0.2);
      });
    } catch (e) {}
  }
}

const audio = new SoundManager();

  /**
 * AYUSHCRAFT — World Map, Zones, Collisions and Interactable Objects
 */



const MAP_WIDTH = 38;  // in tiles (1216 px)
const MAP_HEIGHT = 28; // in tiles (896 px)

// Biome / Zone definitions for discovery HUD
const ZONES = [
  { id: 'observatory', name: 'The Observatory', x1: 2, y1: 2, x2: 13, y2: 12 },
  { id: 'workshop', name: 'The AI Workshop', x1: 24, y1: 2, x2: 35, y2: 12 },
  { id: 'spawn', name: 'Spawn Meadow', x1: 13, y1: 13, x2: 24, y2: 24 },
  { id: 'saveroom', name: 'The Save Room', x1: 2, y1: 14, x2: 12, y2: 26 },
  { id: 'redstone', name: 'Redstone Lab', x1: 25, y1: 14, x2: 36, y2: 26 },
  { id: 'portal', name: 'The Exit Portal', x1: 14, y1: 1, x2: 23, y2: 7 }
];

function getZoneAt(tileX, tileY) {
  for (const z of ZONES) {
    if (tileX >= z.x1 && tileX <= z.x2 && tileY >= z.y1 && tileY <= z.y2) {
      return z.name;
    }
  }
  return 'Overworld';
}

// Generate the 2D tile matrix & collision grid
function buildWorldData() {
  const baseMap = [];
  const collisionMap = [];

  for (let y = 0; y < MAP_HEIGHT; y++) {
    baseMap[y] = [];
    collisionMap[y] = [];
    for (let x = 0; x < MAP_WIDTH; x++) {
      // Default: Grassy meadow
      baseMap[y][x] = 'GRASS';
      collisionMap[y][x] = false;

      // Outer boundary fence/trees
      if (x === 0 || x === MAP_WIDTH - 1 || y === 0 || y === MAP_HEIGHT - 1) {
        baseMap[y][x] = 'COBBLESTONE';
        collisionMap[y][x] = true;
      }
    }
  }

  // --- 1. ROADS & PATHS (Dirt and Cobblestone crossroads) ---
  // Central North-South highway (connecting Spawn to Portal)
  for (let y = 6; y <= 22; y++) {
    baseMap[y][18] = 'DIRT_PATH';
    baseMap[y][19] = 'DIRT_PATH';
  }
  // Central East-West highway (connecting Save Room, Spawn, and Redstone Lab)
  for (let x = 8; x <= 29; x++) {
    baseMap[18][x] = 'DIRT_PATH';
    baseMap[19][x] = 'DIRT_PATH';
  }
  // Northwest road to Observatory
  for (let x = 10; x <= 18; x++) {
    baseMap[10][x] = 'COBBLESTONE';
  }
  for (let y = 10; y <= 18; y++) {
    baseMap[y][18] = 'COBBLESTONE';
  }
  // Northeast road to Workshop
  for (let x = 19; x <= 27; x++) {
    baseMap[10][x] = 'COBBLESTONE';
  }

  // --- 2. WATER STREAM / RIVER ---
  // A scenic winding blue river on the western meadow
  const riverCoords = [
    [13, 10], [13, 11], [13, 12], [14, 12], [14, 13], [14, 14],
    [15, 14], [15, 15], [15, 16], [16, 16], [16, 17], [16, 18],
    [17, 18], [17, 19], [17, 20], [17, 21], [18, 21], [18, 22]
  ];
  riverCoords.forEach(([rx, ry]) => {
    // Only place water if not on main road
    if (rx !== 18 && rx !== 19) {
      baseMap[ry][rx] = 'WATER';
      collisionMap[ry][rx] = true;
    }
  });

  // --- 3. THE OBSERVATORY (NW: x: 3 to 11, y: 3 to 9) ---
  // Floor and walls
  for (let oy = 3; oy <= 9; oy++) {
    for (let ox = 3; ox <= 11; ox++) {
      if (oy === 3 || oy === 9 || ox === 3 || ox === 11) {
        baseMap[oy][ox] = 'STONE_BRICK';
        collisionMap[oy][ox] = true;
      } else {
        baseMap[oy][ox] = 'COBBLESTONE';
      }
    }
  }
  // Observatory Doorway (East entrance)
  baseMap[6][11] = 'COBBLESTONE';
  collisionMap[6][11] = false;
  baseMap[7][11] = 'COBBLESTONE';
  collisionMap[7][11] = false;

  // --- 4. THE AI WORKSHOP (NE: x: 26 to 34, y: 3 to 9) ---
  for (let wy = 3; wy <= 9; wy++) {
    for (let wx = 26; wx <= 34; wx++) {
      if (wy === 3 || wy === 9 || wx === 26 || wx === 34) {
        baseMap[wy][wx] = 'WOOD_PLANKS';
        collisionMap[wy][wx] = true;
      } else {
        baseMap[wy][wx] = 'WOOD_PLANKS';
      }
    }
  }
  // Workshop Doorway (West entrance)
  baseMap[6][26] = 'WOOD_PLANKS';
  collisionMap[6][26] = false;
  baseMap[7][26] = 'WOOD_PLANKS';
  collisionMap[7][26] = false;

  // --- 5. THE SAVE ROOM (SW: x: 3 to 11, y: 16 to 22) ---
  for (let sy = 16; sy <= 22; sy++) {
    for (let sx = 3; sx <= 11; sx++) {
      if (sy === 16 || sy === 22 || sx === 3 || sx === 11) {
        baseMap[sy][sx] = 'COBBLESTONE';
        collisionMap[sy][sx] = true;
      } else {
        baseMap[sy][sx] = 'WOOD_PLANKS';
      }
    }
  }
  // Save Room Doorway (East entrance)
  baseMap[19][11] = 'WOOD_PLANKS';
  collisionMap[19][11] = false;

  // --- 6. REDSTONE LAB (SE: x: 26 to 34, y: 16 to 23) ---
  for (let ry = 16; ry <= 23; ry++) {
    for (let rx = 26; rx <= 34; rx++) {
      if (ry === 16 || ry === 23 || rx === 26 || rx === 34) {
        baseMap[ry][rx] = 'STONE_BRICK';
        collisionMap[ry][rx] = true;
      } else {
        baseMap[ry][rx] = 'STONE_BRICK';
      }
    }
  }
  // Redstone Lab Doorway (West entrance)
  baseMap[19][26] = 'STONE_BRICK';
  collisionMap[19][26] = false;

  // --- 7. EXIT PORTAL PLAZA (North: x: 16 to 21, y: 2 to 5) ---
  for (let py = 2; py <= 5; py++) {
    for (let px = 16; px <= 21; px++) {
      baseMap[py][px] = 'COBBLESTONE';
    }
  }
  // Portal structure (Obsidian arch)
  baseMap[2][18] = 'OBSIDIAN';
  baseMap[2][19] = 'OBSIDIAN';
  baseMap[3][17] = 'OBSIDIAN';
  baseMap[4][17] = 'OBSIDIAN';
  baseMap[3][20] = 'OBSIDIAN';
  baseMap[4][20] = 'OBSIDIAN';
  baseMap[3][18] = 'PORTAL';
  baseMap[3][19] = 'PORTAL';
  baseMap[4][18] = 'PORTAL';
  baseMap[4][19] = 'PORTAL';
  collisionMap[2][18] = true;
  collisionMap[2][19] = true;
  collisionMap[3][17] = true;
  collisionMap[4][17] = true;
  collisionMap[3][20] = true;
  collisionMap[4][20] = true;

  return { baseMap, collisionMap };
}

// Interactive Objects List
function getInteractableObjects() {
  return [
    // 1. SPAWN NOTICE BOARD
    {
      id: 'spawn_sign',
      tileX: 18,
      tileY: 17,
      name: 'Spawn Notice Board',
      tileType: 'SIGN',
      isSolid: true,
      prompt: '[E] Read Sign',
      type: 'sign',
      data: {
        title: 'Welcome to AyushCraft',
        text: '“Hey, I’m Ayush. I build software, explore machine learning, tune Linux systems, and occasionally get lost in a good game.”\n\nWalk North to discover AirLytics NCR at the Observatory, visit the AI Workshop to the East, explore the Redstone Lab, or step through the Portal for contact coordinates!'
      }
    },

    // 2. OBSERVATORY TERMINAL (AirLytics NCR)
    {
      id: 'observatory_terminal',
      tileX: 7,
      tileY: 6,
      name: 'AirLytics NCR Telemetry Terminal',
      tileType: 'TELESCOPE',
      isSolid: true,
      prompt: '[E] Inspect AirLytics NCR',
      type: 'modal',
      data: {
        title: '🛰️ AirLytics NCR — Environmental Intelligence',
        subtitle: 'Smart India Hackathon (SIH26082) · Ministry of Earth Sciences / NCMRWF',
        badges: ['72-Hour AQI Forecast', '68 CPCB Stations Mesh', '61.12 µg/m³ RMSE Baseline', 'API-Grounded AI Assistant'],
        description: 'A 72-hour air quality forecast engine for Delhi NCR that proves where every figure came from. Designed with absolute data provenance—traceable to individual monitoring stations, valid hourly observations, and CPCB arithmetic criteria.',
        highlights: [
          'Live 68-station CPCB mesh adhering to strict 2014 rolling-window rules without silent neighbour interpolation.',
          'Validated ML blend baseline at 61.12 µg/m³ RMSE (27% better than raw CAMS over 4M+ observations across an annual cycle).',
          'NASA VIIRS satellite fire corridor tracking with transport alignment against wind vector fields.',
          'API-grounded assistant bounded to 8 read-only system endpoints with traceable tool calls and receipts.'
        ],
        stack: ['Python', 'FastAPI', 'TypeScript', 'React 19', 'Vite', 'Open-Meteo', 'NASA FIRMS'],
        links: [
          { text: 'Live Platform ↗', url: 'https://airlytics-ncr.vercel.app/', primary: true },
          { text: 'GitHub Repository ↗', url: 'https://github.com/Ayush20-lex/airlytics-ncr', primary: false }
        ]
      }
    },

    // 3. OBSERVATORY WEATHER VANE
    {
      id: 'observatory_vane',
      tileX: 5,
      tileY: 4,
      name: 'Meteorological Weather Sensor',
      tileType: 'SIGN',
      isSolid: true,
      prompt: '[E] Check Atmospheric Readings',
      type: 'sign',
      data: {
        title: 'Atmospheric Sensor Array',
        text: 'Telemetry Station Active.\nMonitoring wind vector transport, surface boundary layer inversions, and particulate matter diffusion across Delhi NCR.'
      }
    },

    // 4. AI WORKSHOP WORKBENCH
    {
      id: 'ai_workbench',
      tileX: 30,
      tileY: 5,
      name: 'Autonomous Assistant Workbench',
      tileType: 'WORKBENCH',
      isSolid: true,
      prompt: '[E] Examine AI Assistant Project',
      type: 'modal',
      data: {
        title: '⚡ Autonomous Developer Assistant',
        subtitle: 'Personal Software Engineering & Contextual Agent System',
        badges: ['Personal AI Project', 'Terminal-First Tooling', 'Context Architecture'],
        description: 'A personal software assistant designed to orchestrate local development workflows, manage project context, and automate terminal-centric tasks.',
        highlights: [
          'Grounded execution contract: strictly limits tool execution to verified local workspace boundaries.',
          'Contextual task orchestration for shell automation, project navigation, and developer productivity.',
          'Self-contained architecture designed with strict credential safety and zero telemetry leakage.'
        ],
        stack: ['Python', 'AsyncIO', 'Terminal APIs', 'LLM Tooling', 'Linux Environment'],
        links: []
      }
    },

    // 5. AI WORKSHOP BOOKSHELF
    {
      id: 'ai_library',
      tileX: 32,
      tileY: 4,
      name: 'AI & Systems Library',
      tileType: 'BOOKSHELF',
      isSolid: true,
      prompt: '[E] Browse Knowledge Grimoires',
      type: 'sign',
      data: {
        title: 'Engineering Library',
        text: 'Shelves filled with volumes on Distributed Systems, Statistical Machine Learning, Linux Kernel Concepts, and Data Pipeline Architectures.'
      }
    },

    // 6. REDSTONE LAB — TECH ARSENAL PEDESTAL
    {
      id: 'redstone_core',
      tileX: 30,
      tileY: 18,
      name: 'Verified Technical Arsenal',
      tileType: 'STONE_BRICK',
      isSolid: true,
      prompt: '[E] Inspect Verified Tech Stack',
      type: 'modal',
      data: {
        title: '🛠️ Technical Arsenal & Environments',
        subtitle: 'Verified Technologies Supported by Real Projects & Academic Engineering',
        badges: ['Core Languages', 'Data & Backend', 'Systems & Tools'],
        description: 'A disciplined, verified toolkit without inflated claims. Only technologies proven by active codebases and systems are featured.',
        highlights: [
          'Core Languages: Python (primary backend/ML), TypeScript (modern web), Java, Bash / Shell, SQL.',
          'AI & Data: FastAPI, React 19, Pandas, NumPy, Scikit-Learn.',
          'Systems & Tooling: Linux (terminal-centric workflow), Git, GitHub, VS Code, Vite, Vercel.'
        ],
        stack: ['Python', 'TypeScript', 'Java', 'Bash', 'SQL', 'FastAPI', 'React 19', 'Linux', 'Git'],
        links: [
          { text: 'View GitHub Repositories ↗', url: 'https://github.com/Ayush20-lex?tab=repositories', primary: true }
        ]
      }
    },

    // 7. REDSTONE LAMP (Interactive Toggle)
    {
      id: 'redstone_lamp_1',
      tileX: 30,
      tileY: 20,
      name: 'Logic Gate Lamp',
      tileType: 'LAMP_OFF',
      isSolid: true,
      isOn: false,
      prompt: '[E] Toggle Redstone Circuit',
      type: 'toggle',
      data: {}
    },

    // 8. THE SAVE ROOM — HOLLOW KNIGHT NAIL RELIC
    {
      id: 'save_room_relic',
      tileX: 7,
      tileY: 19,
      name: 'Ancient Nail Relic',
      tileType: 'NAIL_RELIC',
      isSolid: true,
      prompt: '[E] Examine Relic & Personal Lore',
      type: 'modal',
      data: {
        title: '🗡️ The Save Room — Gaming & Personal Lore',
        subtitle: 'Where exploration, challenge, and discipline meet outside the terminal',
        badges: ['Metroidvanias', 'Anime & Novels', 'Calisthenics'],
        description: 'A peaceful rest stop inspired by the atmosphere and discovery of Metroidvania classics.',
        highlights: [
          'Metroidvania Mastery: Captivated by non-linear world design, environmental lore, and precision combat in Hollow Knight, Castlevania, and Ori.',
          'Light Novels & Manhwa: Passionate about expansive worldbuilding, strategic tension, and progression stories.',
          'Calisthenics: Dedicated to bodyweight strength, hand balancing, and physical progression—applying the same patient discipline found in debugging code.'
        ],
        stack: ['Hollow Knight', 'Metroidvanias', 'Light Novels', 'Manhwa', 'Calisthenics'],
        links: []
      }
    },

    // 9. EXIT PORTAL (Connect & Warp Coordinates)
    {
      id: 'exit_portal',
      tileX: 18,
      tileY: 3,
      name: 'Inter-Dimensional Exit Portal',
      tileType: 'PORTAL',
      isSolid: true,
      prompt: '[E] Step Through Exit Portal',
      type: 'modal',
      data: {
        title: '🌌 Exit Portal — Terminal Coordinates',
        subtitle: 'Connect with Ayush Kumar across cyberspace',
        badges: ['Developer Contact', 'Open to Collaborations', 'Internships & Projects'],
        description: 'Thank you for exploring AyushCraft! Whether you are interested in environmental intelligence, machine learning systems, or want to discuss gaming and tech, my portal coordinates are open.',
        highlights: [
          'GitHub: Explore public codebases and open-source contributions.',
          'LinkedIn: Professional background, academic journey, and networking.',
          'Email: Direct reachout for software collaborations, internships, and inquiries.'
        ],
        stack: ['GitHub', 'LinkedIn', 'Gmail'],
        links: [
          { text: 'GitHub Profile ↗', url: 'https://github.com/Ayush20-lex', primary: true },
          { text: 'LinkedIn Profile ↗', url: 'https://www.linkedin.com/in/ayush-kumar-942081322/', primary: true },
          { text: 'Send Email ↗', url: 'mailto:ayushkumargbp@gmail.com', primary: false }
        ]
      }
    }
  ];
}

  /**
 * AYUSHCRAFT — Player Entity & Controller
 */




class Player {
  constructor(startX = 18.5 * TILE_SIZE, startY = 19 * TILE_SIZE) {
    this.x = startX;
    this.y = startY;
    this.width = 24;
    this.height = 24;
    this.speed = 135; // pixels per second

    this.direction = 'down';
    this.isMoving = false;
    this.animTimer = 0;
    this.animFrame = 0;
    this.stepAudioTimer = 0;

    // Click/tap to move destination
    this.targetPos = null;

    // Proximity interaction candidate
    this.nearbyObject = null;
  }

  update(dt, input, collisionMap, objects) {
    let dx = 0;
    let dy = 0;

    // 1. Keyboard & D-Pad Movement Input
    if (input.up) dy -= 1;
    if (input.down) dy += 1;
    if (input.left) dx -= 1;
    if (input.right) dx += 1;

    // 2. Mouse / Tap-to-move destination handling
    if (this.targetPos && dx === 0 && dy === 0) {
      const diffX = this.targetPos.x - (this.x + 16);
      const diffY = this.targetPos.y - (this.y + 20);
      const dist = Math.hypot(diffX, diffY);

      if (dist > 8) {
        dx = diffX / dist;
        dy = diffY / dist;
      } else {
        this.targetPos = null; // Reached target
      }
    } else if (dx !== 0 || dy !== 0) {
      // Manual input cancels pathing
      this.targetPos = null;
    }

    // Normalize diagonal movement
    if (dx !== 0 && dy !== 0) {
      const len = Math.hypot(dx, dy);
      dx /= len;
      dy /= len;
    }

    // Set facing direction
    if (Math.abs(dx) > Math.abs(dy)) {
      if (dx < -0.1) this.direction = 'left';
      else if (dx > 0.1) this.direction = 'right';
    } else {
      if (dy < -0.1) this.direction = 'up';
      else if (dy > 0.1) this.direction = 'down';
    }

    this.isMoving = (dx !== 0 || dy !== 0);

    // 3. Collision Detection & Position Update
    if (this.isMoving) {
      const moveX = dx * this.speed * dt;
      const moveY = dy * this.speed * dt;

      // Try X movement with collision check
      if (!this.checkCollision(this.x + moveX, this.y, collisionMap, objects)) {
        this.x += moveX;
      }

      // Try Y movement with collision check
      if (!this.checkCollision(this.x, this.y + moveY, collisionMap, objects)) {
        this.y += moveY;
      }

      // Animation Cycle
      this.animTimer += dt;
      if (this.animTimer > 0.14) {
        this.animTimer = 0;
        this.animFrame = (this.animFrame + 1) % 4; // 0, 1, 2, 3
      }

      // Step Audio Chime
      this.stepAudioTimer += dt;
      if (this.stepAudioTimer > 0.32) {
        this.stepAudioTimer = 0;
        audio.playStep();
      }
    } else {
      this.animFrame = 0;
      this.animTimer = 0;
    }

    // 4. Check Proximity to Interactable Objects (within ~40 pixels)
    this.updateProximity(objects);
  }

  // Check collision using bounding box at player's feet
  checkCollision(newX, newY, collisionMap, objects) {
    // Collision box positioned at player's feet: (x + 6, y + 16, width 20, height 14)
    const boxLeft = newX + 6;
    const boxRight = newX + 26;
    const boxTop = newY + 16;
    const boxBottom = newY + 30;

    // Check Tile Map Collisions
    const minTileX = Math.floor(boxLeft / TILE_SIZE);
    const maxTileX = Math.floor(boxRight / TILE_SIZE);
    const minTileY = Math.floor(boxTop / TILE_SIZE);
    const maxTileY = Math.floor(boxBottom / TILE_SIZE);

    for (let ty = minTileY; ty <= maxTileY; ty++) {
      for (let tx = minTileX; tx <= maxTileX; tx++) {
        if (!collisionMap[ty] || collisionMap[ty][tx] === true) {
          return true; // Wall or map edge
        }
      }
    }

    // Check Solid Interactable Objects
    for (const obj of objects) {
      if (obj.isSolid) {
        const objLeft = obj.tileX * TILE_SIZE + 2;
        const objRight = (obj.tileX + 1) * TILE_SIZE - 2;
        const objTop = obj.tileY * TILE_SIZE + 2;
        const objBottom = (obj.tileY + 1) * TILE_SIZE - 2;

        if (boxLeft < objRight && boxRight > objLeft && boxTop < objBottom && boxBottom > objTop) {
          return true;
        }
      }
    }

    return false;
  }

  // Find nearest interactable object
  updateProximity(objects) {
    const playerCenterX = this.x + 16;
    const playerCenterY = this.y + 20;
    let closest = null;
    let minDistance = 50; // Proximity threshold in pixels

    for (const obj of objects) {
      const objCenterX = obj.tileX * TILE_SIZE + 16;
      const objCenterY = obj.tileY * TILE_SIZE + 16;
      const dist = Math.hypot(playerCenterX - objCenterX, playerCenterY - objCenterY);

      if (dist < minDistance) {
        closest = obj;
        minDistance = dist;
      }
    }

    this.nearbyObject = closest;
  }

  // Render player sprite from the atlas
  render(ctx, atlas) {
    // Convert 4-frame cycle (0, 1, 2, 3) to 3 sprite frames (0, 1, 0, 2)
    let frameIdx = 0;
    if (this.isMoving) {
      if (this.animFrame === 1) frameIdx = 1;
      else if (this.animFrame === 3) frameIdx = 2;
    }

    const sprite = atlas[this.direction][frameIdx];
    if (sprite) {
      ctx.drawImage(sprite, Math.round(this.x), Math.round(this.y));
    }
  }
}

  /**
 * AYUSHCRAFT — UI System, Dialogue Windows & Accessible Journal
 */



class UIManager {
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

  /**
 * AYUSHCRAFT — Core Game Engine & Canvas Renderer
 */







class Game {
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


  window.addEventListener('DOMContentLoaded', () => {
    if (window.__AYUSHCRAFT__) return;
    const game = new Game();
    window.__AYUSHCRAFT__ = game;
  });
})();
