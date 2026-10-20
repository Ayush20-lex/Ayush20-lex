// AYUSHCRAFT Standalone Bundle
(function() {
  if (window.__AYUSHCRAFT__) return; // Prevent double init

  /**
 * AYUSHCRAFT — Tile and Sprite Generator
 * Procedural Pixel-Art Graphics Engine (Second-Pass Polish)
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

  // 1. GRASS — Natural Meadow Base
  {
    const { canvas, ctx } = createTileCanvas();
    ctx.fillStyle = '#499a39';
    ctx.fillRect(0, 0, 32, 32);
    // Darker soil & shade specks
    ctx.fillStyle = '#3c852e';
    ctx.fillRect(4, 6, 4, 4);
    ctx.fillRect(18, 16, 5, 4);
    ctx.fillRect(24, 6, 4, 3);
    ctx.fillRect(8, 22, 5, 4);
    // Lighter blade highlights
    ctx.fillStyle = '#5cba48';
    ctx.fillRect(6, 4, 3, 3);
    ctx.fillRect(16, 12, 3, 3);
    ctx.fillRect(2, 18, 3, 3);
    ctx.fillRect(26, 22, 3, 3);
    ctx.fillRect(12, 26, 3, 3);
    tiles['GRASS'] = canvas;
  }

  // 1B. GRASS_FLOWERS — Wild Meadow Poppies & Buttercups
  {
    const { canvas, ctx } = createTileCanvas();
    ctx.drawImage(tiles['GRASS'], 0, 0);
    // Red Poppies
    ctx.fillStyle = '#dc2626';
    ctx.fillRect(6, 8, 4, 4);
    ctx.fillRect(22, 18, 4, 4);
    ctx.fillStyle = '#fef08a'; // Pollen center
    ctx.fillRect(7, 9, 2, 2);
    ctx.fillRect(23, 19, 2, 2);
    // Yellow Buttercup
    ctx.fillStyle = '#eab308';
    ctx.fillRect(14, 22, 4, 4);
    ctx.fillStyle = '#f97316';
    ctx.fillRect(15, 23, 2, 2);
    tiles['GRASS_FLOWERS'] = canvas;
  }

  // 1C. GRASS_FLOWERS_WHITE — Chamomile / White Daisies
  {
    const { canvas, ctx } = createTileCanvas();
    ctx.drawImage(tiles['GRASS'], 0, 0);
    // White Daisies
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(8, 14, 4, 4);
    ctx.fillRect(20, 6, 4, 4);
    ctx.fillRect(24, 24, 3, 3);
    ctx.fillStyle = '#f59e0b'; // Gold center
    ctx.fillRect(9, 15, 2, 2);
    ctx.fillRect(21, 7, 2, 2);
    ctx.fillRect(25, 25, 1, 1);
    tiles['GRASS_FLOWERS_WHITE'] = canvas;
  }

  // 1D. GRASS_TALL — Bushy Grass Tufts
  {
    const { canvas, ctx } = createTileCanvas();
    ctx.drawImage(tiles['GRASS'], 0, 0);
    ctx.fillStyle = '#2d6a22';
    // Tall blades
    ctx.fillRect(10, 10, 2, 12);
    ctx.fillRect(14, 8, 2, 14);
    ctx.fillRect(18, 11, 2, 11);
    ctx.fillStyle = '#6ee755';
    ctx.fillRect(11, 8, 1, 6);
    ctx.fillRect(15, 6, 1, 7);
    ctx.fillRect(19, 9, 1, 5);
    tiles['GRASS_TALL'] = canvas;
  }

  // 1E. GRASS_PEBBLE — Meadow with Natural Field Stones
  {
    const { canvas, ctx } = createTileCanvas();
    ctx.drawImage(tiles['GRASS'], 0, 0);
    // River pebbles
    ctx.fillStyle = '#64748b';
    ctx.fillRect(8, 16, 5, 4);
    ctx.fillRect(20, 10, 4, 3);
    ctx.fillStyle = '#94a3b8';
    ctx.fillRect(9, 16, 3, 2);
    ctx.fillRect(21, 10, 2, 1);
    tiles['GRASS_PEBBLE'] = canvas;
  }

  // 1F. GRASS_MOSSY — Shaded Forest Floor
  {
    const { canvas, ctx } = createTileCanvas();
    ctx.fillStyle = '#37772b';
    ctx.fillRect(0, 0, 32, 32);
    ctx.fillStyle = '#295b20';
    ctx.fillRect(2, 4, 12, 10);
    ctx.fillRect(16, 14, 14, 12);
    ctx.fillStyle = '#4d993e';
    ctx.fillRect(6, 18, 6, 6);
    tiles['GRASS_MOSSY'] = canvas;
  }

  // 2. DIRT PATH — Warm Beaten Trail
  {
    const { canvas, ctx } = createTileCanvas();
    ctx.fillStyle = '#92653d';
    ctx.fillRect(0, 0, 32, 32);
    // Subtle earth grain
    ctx.fillStyle = '#7a512d';
    ctx.fillRect(2, 4, 14, 10);
    ctx.fillRect(16, 16, 14, 12);
    ctx.fillRect(4, 20, 8, 8);
    // Sand & tiny stone flecks
    ctx.fillStyle = '#b08253';
    ctx.fillRect(6, 6, 3, 3);
    ctx.fillRect(22, 8, 4, 3);
    ctx.fillRect(14, 18, 3, 3);
    ctx.fillRect(24, 24, 3, 2);
    // Edging shadow
    ctx.fillStyle = '#654122';
    ctx.fillRect(0, 0, 32, 1);
    ctx.fillRect(0, 31, 32, 1);
    tiles['DIRT_PATH'] = canvas;
  }

  // 2B. WOOD_BRIDGE — Wooden Footbridge over Water
  {
    const { canvas, ctx } = createTileCanvas();
    ctx.fillStyle = '#784627';
    ctx.fillRect(0, 0, 32, 32);
    // Plank splits
    ctx.fillStyle = '#452513';
    ctx.fillRect(0, 7, 32, 2);
    ctx.fillRect(0, 15, 32, 2);
    ctx.fillRect(0, 23, 32, 2);
    ctx.fillRect(0, 31, 32, 1);
    // Plank highlights
    ctx.fillStyle = '#9c5f37';
    ctx.fillRect(2, 1, 28, 2);
    ctx.fillRect(2, 9, 28, 2);
    ctx.fillRect(2, 17, 28, 2);
    ctx.fillRect(2, 25, 28, 2);
    // Iron bolts
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(3, 4, 2, 2);
    ctx.fillRect(27, 4, 2, 2);
    ctx.fillRect(3, 12, 2, 2);
    ctx.fillRect(27, 12, 2, 2);
    ctx.fillRect(3, 20, 2, 2);
    ctx.fillRect(27, 20, 2, 2);
    tiles['WOOD_BRIDGE'] = canvas;
  }

  // 3. COBBLESTONE — Chiseled Stone Pathway
  {
    const { canvas, ctx } = createTileCanvas();
    ctx.fillStyle = '#646675';
    ctx.fillRect(0, 0, 32, 32);
    ctx.fillStyle = '#3c3d47'; // Mortar grooves
    ctx.fillRect(0, 15, 32, 2);
    ctx.fillRect(0, 31, 32, 1);
    ctx.fillRect(15, 0, 2, 15);
    ctx.fillRect(23, 16, 2, 16);
    // Highlighted stone faces
    ctx.fillStyle = '#7f8294';
    ctx.fillRect(2, 2, 11, 4);
    ctx.fillRect(18, 2, 12, 4);
    ctx.fillRect(2, 18, 19, 4);
    ctx.fillRect(26, 18, 5, 4);
    // Shadow bevels
    ctx.fillStyle = '#4c4e59';
    ctx.fillRect(2, 11, 11, 3);
    ctx.fillRect(18, 11, 12, 3);
    ctx.fillRect(2, 27, 19, 3);
    tiles['COBBLESTONE'] = canvas;
  }

  // 3B. COBBLE_MOSSY — Weathered Mossy Cobblestone
  {
    const { canvas, ctx } = createTileCanvas();
    ctx.drawImage(tiles['COBBLESTONE'], 0, 0);
    ctx.fillStyle = '#3c852e';
    ctx.fillRect(4, 12, 8, 4);
    ctx.fillRect(14, 2, 5, 6);
    ctx.fillRect(20, 22, 8, 5);
    ctx.fillStyle = '#5cba48';
    ctx.fillRect(6, 13, 4, 2);
    ctx.fillRect(22, 23, 4, 2);
    tiles['COBBLE_MOSSY'] = canvas;
  }

  // 4. WATER — Dynamic Crystal Blue River
  {
    const { canvas, ctx } = createTileCanvas();
    ctx.fillStyle = '#1d5ec9';
    ctx.fillRect(0, 0, 32, 32);
    // Secondary flow wave
    ctx.fillStyle = '#256ee8';
    ctx.fillRect(2, 6, 16, 5);
    ctx.fillRect(14, 18, 16, 5);
    // Surface highlights
    ctx.fillStyle = '#60a5fa';
    ctx.fillRect(4, 8, 10, 2);
    ctx.fillRect(18, 20, 10, 2);
    ctx.fillStyle = '#93c5fd';
    ctx.fillRect(6, 9, 4, 1);
    ctx.fillRect(20, 21, 4, 1);
    tiles['WATER'] = canvas;
  }

  // 4B. WATER_SHORE — Water with Gentle Sandy Bank
  {
    const { canvas, ctx } = createTileCanvas();
    ctx.drawImage(tiles['WATER'], 0, 0);
    // Sandy fringe on top
    ctx.fillStyle = '#8f633d';
    ctx.fillRect(0, 0, 32, 4);
    ctx.fillStyle = '#b08253';
    ctx.fillRect(0, 4, 32, 2);
    // Foam line
    ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.fillRect(2, 6, 28, 2);
    tiles['WATER_SHORE'] = canvas;
  }

  // 5. WOOD PLANKS — Warm Timber Lodge Floor
  {
    const { canvas, ctx } = createTileCanvas();
    ctx.fillStyle = '#8a5336';
    ctx.fillRect(0, 0, 32, 32);
    ctx.fillStyle = '#4d2b1a'; // Gaps
    ctx.fillRect(0, 7, 32, 2);
    ctx.fillRect(0, 15, 32, 2);
    ctx.fillRect(0, 23, 32, 2);
    ctx.fillRect(0, 31, 32, 1);
    ctx.fillRect(14, 0, 2, 7);
    ctx.fillRect(24, 8, 2, 7);
    ctx.fillRect(8, 16, 2, 7);
    ctx.fillRect(20, 24, 2, 7);
    // Highlights
    ctx.fillStyle = '#a86a47';
    ctx.fillRect(2, 1, 10, 2);
    ctx.fillRect(18, 1, 12, 2);
    ctx.fillRect(2, 9, 20, 2);
    ctx.fillRect(12, 17, 18, 2);
    tiles['WOOD_PLANKS'] = canvas;
  }

  // 5B. WORKSHOP_FLOOR — Polished Parquet Tiles
  {
    const { canvas, ctx } = createTileCanvas();
    ctx.fillStyle = '#9e6442';
    ctx.fillRect(0, 0, 32, 32);
    ctx.fillStyle = '#5c351f';
    ctx.strokeRect(0, 0, 32, 32);
    ctx.fillRect(15, 0, 2, 32);
    ctx.fillRect(0, 15, 32, 2);
    // Inlaid diamond grain
    ctx.fillStyle = '#bf825e';
    ctx.fillRect(2, 2, 12, 12);
    ctx.fillRect(18, 18, 12, 12);
    ctx.fillStyle = '#7d4527';
    ctx.fillRect(18, 2, 12, 12);
    ctx.fillRect(2, 18, 12, 12);
    tiles['WORKSHOP_FLOOR'] = canvas;
  }

  // 6. STONE BRICK — Classic Castle Masonry
  {
    const { canvas, ctx } = createTileCanvas();
    ctx.fillStyle = '#555866';
    ctx.fillRect(0, 0, 32, 32);
    ctx.fillStyle = '#343640';
    ctx.strokeRect(0, 0, 32, 32);
    ctx.fillRect(0, 15, 32, 2);
    ctx.fillRect(15, 0, 2, 15);
    ctx.fillRect(15, 16, 2, 16);
    ctx.fillStyle = '#717588';
    ctx.fillRect(2, 2, 11, 2);
    ctx.fillRect(18, 2, 12, 2);
    ctx.fillRect(2, 18, 11, 2);
    ctx.fillRect(18, 18, 12, 2);
    tiles['STONE_BRICK'] = canvas;
  }

  // 6B. OBSERVATORY_FLOOR — Midnight Celestial Slate with Brass Inlay
  {
    const { canvas, ctx } = createTileCanvas();
    ctx.fillStyle = '#1e2438';
    ctx.fillRect(0, 0, 32, 32);
    ctx.fillStyle = '#141829';
    ctx.strokeRect(0, 0, 32, 32);
    // Brass quadrant circle
    ctx.strokeStyle = '#d97706';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(16, 16, 10, 0, Math.PI * 2);
    ctx.stroke();
    // Starry cyan core
    ctx.fillStyle = '#38bdf8';
    ctx.fillRect(15, 15, 2, 2);
    ctx.fillStyle = '#ca8a04';
    ctx.fillRect(15, 5, 2, 2);
    ctx.fillRect(15, 25, 2, 2);
    ctx.fillRect(5, 15, 2, 2);
    ctx.fillRect(25, 15, 2, 2);
    tiles['OBSERVATORY_FLOOR'] = canvas;
  }

  // 6C. LAB_FLOOR — Deep Basalt Conduit Flooring
  {
    const { canvas, ctx } = createTileCanvas();
    ctx.fillStyle = '#1c1c24';
    ctx.fillRect(0, 0, 32, 32);
    ctx.fillStyle = '#101017';
    ctx.strokeRect(0, 0, 32, 32);
    // Conduit recessed channels
    ctx.fillStyle = '#2b2b36';
    ctx.fillRect(14, 0, 4, 32);
    ctx.fillRect(0, 14, 32, 4);
    // Circuit trace nodes
    ctx.fillStyle = '#7f1d1d';
    ctx.fillRect(15, 15, 2, 2);
    tiles['LAB_FLOOR'] = canvas;
  }

  // 6D. SAVEROOM_RUG — Royal Blue Velvet Carpet
  {
    const { canvas, ctx } = createTileCanvas();
    ctx.fillStyle = '#1e3a8a';
    ctx.fillRect(0, 0, 32, 32);
    // Silver / Gold embroidered border
    ctx.fillStyle = '#cbd5e1';
    ctx.fillRect(2, 2, 28, 2);
    ctx.fillRect(2, 28, 28, 2);
    ctx.fillRect(2, 2, 2, 28);
    ctx.fillRect(28, 2, 2, 28);
    // Inner velvet field
    ctx.fillStyle = '#172554';
    ctx.fillRect(6, 6, 20, 20);
    // Hollow Knight soul symbol or geometric diamond
    ctx.fillStyle = '#93c5fd';
    ctx.beginPath();
    ctx.moveTo(16, 8);
    ctx.lineTo(24, 16);
    ctx.lineTo(16, 24);
    ctx.lineTo(8, 16);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = '#1e3a8a';
    ctx.fillRect(14, 14, 4, 4);
    tiles['SAVEROOM_RUG'] = canvas;
  }

  // 7. OBSIDIAN — Nether Portal Framing
  {
    const { canvas, ctx } = createTileCanvas();
    ctx.fillStyle = '#141121';
    ctx.fillRect(0, 0, 32, 32);
    ctx.fillStyle = '#2a1f47';
    ctx.fillRect(4, 4, 10, 10);
    ctx.fillRect(18, 16, 10, 12);
    ctx.fillStyle = '#6b3ea8';
    ctx.fillRect(6, 6, 4, 4);
    ctx.fillRect(22, 20, 4, 4);
    ctx.fillStyle = '#a855f7';
    ctx.fillRect(7, 7, 2, 2);
    tiles['OBSIDIAN'] = canvas;
  }

  // 8. PORTAL FIELD — Interdimensional Swirl
  {
    const { canvas, ctx } = createTileCanvas();
    ctx.fillStyle = '#4c1d95';
    ctx.fillRect(0, 0, 32, 32);
    ctx.fillStyle = '#6d28d9';
    ctx.fillRect(4, 4, 10, 12);
    ctx.fillRect(16, 14, 12, 14);
    ctx.fillStyle = '#a855f7';
    ctx.fillRect(8, 8, 6, 6);
    ctx.fillRect(20, 18, 6, 6);
    ctx.fillStyle = '#e9d5ff';
    ctx.fillRect(10, 10, 2, 2);
    ctx.fillRect(22, 20, 2, 2);
    tiles['PORTAL'] = canvas;
  }

  // 9. TREE OAK TOP (Canopy 64x64)
  {
    const { canvas, ctx } = createTileCanvas(64, 64);
    // Leaf shadow
    ctx.fillStyle = '#1b521e';
    ctx.beginPath();
    ctx.arc(32, 34, 26, 0, Math.PI * 2);
    ctx.fill();
    // Mid foliage body
    ctx.fillStyle = '#2d8033';
    ctx.beginPath();
    ctx.arc(32, 30, 24, 0, Math.PI * 2);
    ctx.fill();
    // Clustered leafy highlights
    ctx.fillStyle = '#42a84a';
    ctx.beginPath();
    ctx.arc(24, 22, 12, 0, Math.PI * 2);
    ctx.arc(40, 24, 11, 0, Math.PI * 2);
    ctx.arc(30, 36, 11, 0, Math.PI * 2);
    ctx.fill();
    // Sunlit bright tips
    ctx.fillStyle = '#6be374';
    ctx.fillRect(20, 16, 6, 4);
    ctx.fillRect(36, 18, 6, 4);
    ctx.fillRect(26, 28, 5, 4);
    tiles['TREE_TOP'] = canvas;
  }

  // 9B. TREE PINE TOP (Canopy 64x64)
  {
    const { canvas, ctx } = createTileCanvas(64, 64);
    // Dark spruce silhouette
    ctx.fillStyle = '#143d22';
    // Tier 3 (bottom)
    ctx.beginPath();
    ctx.moveTo(32, 16); ctx.lineTo(10, 56); ctx.lineTo(54, 56); ctx.closePath();
    ctx.fill();
    // Tier 2 (mid)
    ctx.fillStyle = '#1c542f';
    ctx.beginPath();
    ctx.moveTo(32, 10); ctx.lineTo(14, 40); ctx.lineTo(50, 40); ctx.closePath();
    ctx.fill();
    // Tier 1 (top)
    ctx.fillStyle = '#2b7844';
    ctx.beginPath();
    ctx.moveTo(32, 4); ctx.lineTo(20, 24); ctx.lineTo(44, 24); ctx.closePath();
    ctx.fill();
    // Needle highlights
    ctx.fillStyle = '#4ade80';
    ctx.fillRect(31, 8, 2, 4);
    ctx.fillRect(25, 22, 3, 2);
    ctx.fillRect(36, 22, 3, 2);
    ctx.fillRect(20, 38, 4, 2);
    ctx.fillRect(40, 38, 4, 2);
    tiles['TREE_PINE'] = canvas;
  }

  // 10. TREE TRUNK
  {
    const { canvas, ctx } = createTileCanvas();
    ctx.drawImage(tiles['GRASS'], 0, 0);
    // Dark sturdy bark
    ctx.fillStyle = '#452613';
    ctx.fillRect(10, 0, 12, 32);
    // Tree shadow edge
    ctx.fillStyle = '#2b160a';
    ctx.fillRect(10, 0, 3, 32);
    // Light grain
    ctx.fillStyle = '#663b1d';
    ctx.fillRect(15, 0, 4, 32);
    // Root flare at ground
    ctx.fillStyle = '#452613';
    ctx.fillRect(7, 24, 3, 8);
    ctx.fillRect(22, 24, 3, 8);
    tiles['TREE_TRUNK'] = canvas;
  }

  // 11. REDSTONE WIRE (Unpowered)
  {
    const { canvas, ctx } = createTileCanvas();
    ctx.drawImage(tiles['LAB_FLOOR'], 0, 0);
    ctx.fillStyle = '#7f1d1d';
    ctx.fillRect(14, 0, 4, 32);
    ctx.fillRect(0, 14, 32, 4);
    tiles['REDSTONE_WIRE_OFF'] = canvas;
  }

  // 12. REDSTONE WIRE (Powered & Radiant)
  {
    const { canvas, ctx } = createTileCanvas();
    ctx.drawImage(tiles['LAB_FLOOR'], 0, 0);
    // Glow bloom
    ctx.fillStyle = 'rgba(239, 68, 68, 0.3)';
    ctx.fillRect(11, 0, 10, 32);
    ctx.fillRect(0, 11, 32, 10);
    // Glowing wire
    ctx.fillStyle = '#ef4444';
    ctx.fillRect(14, 0, 4, 32);
    ctx.fillRect(0, 14, 32, 4);
    // High-energy core
    ctx.fillStyle = '#fecaca';
    ctx.fillRect(15, 15, 2, 2);
    ctx.fillRect(15, 4, 2, 2);
    ctx.fillRect(15, 26, 2, 2);
    ctx.fillRect(4, 15, 2, 2);
    ctx.fillRect(26, 15, 2, 2);
    tiles['REDSTONE_WIRE_ON'] = canvas;
  }

  // 13. REDSTONE LAMP (OFF)
  {
    const { canvas, ctx } = createTileCanvas();
    ctx.fillStyle = '#3c1806';
    ctx.fillRect(0, 0, 32, 32);
    ctx.fillStyle = '#69300f';
    ctx.fillRect(4, 4, 24, 24);
    ctx.fillStyle = '#853e14';
    ctx.fillRect(7, 7, 18, 18);
    ctx.fillStyle = '#3c1806';
    ctx.strokeRect(1, 1, 30, 30);
    tiles['LAMP_OFF'] = canvas;
  }

  // 14. REDSTONE LAMP (ON — Brilliant Amber Glow)
  {
    const { canvas, ctx } = createTileCanvas();
    ctx.fillStyle = '#78350f';
    ctx.fillRect(0, 0, 32, 32);
    ctx.fillStyle = '#f59e0b';
    ctx.fillRect(3, 3, 26, 26);
    ctx.fillStyle = '#fde047';
    ctx.fillRect(6, 6, 20, 20);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(10, 10, 12, 12);
    tiles['LAMP_ON'] = canvas;
  }

  // 15. BOOKSHELF — Knowledge Grimoires
  {
    const { canvas, ctx } = createTileCanvas();
    ctx.fillStyle = '#713f12';
    ctx.fillRect(0, 0, 32, 32);
    ctx.fillStyle = '#451a03';
    ctx.fillRect(2, 4, 28, 10);
    ctx.fillRect(2, 18, 28, 10);
    // Colorful book spines
    const bookColors = ['#dc2626', '#2563eb', '#16a34a', '#d97706', '#9333ea', '#0284c7'];
    for (let i = 0; i < 5; i++) {
      ctx.fillStyle = bookColors[i % bookColors.length];
      ctx.fillRect(4 + i * 5, 5, 4, 8);
      ctx.fillStyle = '#fef08a';
      ctx.fillRect(5 + i * 5, 7, 2, 2);
    }
    for (let i = 0; i < 5; i++) {
      ctx.fillStyle = bookColors[(i + 3) % bookColors.length];
      ctx.fillRect(4 + i * 5, 19, 4, 8);
      ctx.fillStyle = '#fef08a';
      ctx.fillRect(5 + i * 5, 21, 2, 2);
    }
    tiles['BOOKSHELF'] = canvas;
  }

  // 16. CRAFTING WORKBENCH
  {
    const { canvas, ctx } = createTileCanvas();
    ctx.fillStyle = '#8f563b';
    ctx.fillRect(0, 0, 32, 32);
    ctx.fillStyle = '#4d2e1f';
    ctx.strokeRect(1, 1, 30, 30);
    // Grid top
    ctx.fillStyle = '#b45309';
    ctx.fillRect(4, 4, 24, 24);
    ctx.fillStyle = '#78350f';
    ctx.fillRect(11, 4, 2, 24);
    ctx.fillRect(19, 4, 2, 24);
    ctx.fillRect(4, 11, 24, 2);
    ctx.fillRect(4, 19, 24, 2);
    // Blueprint paper & saw
    ctx.fillStyle = '#fef3c7';
    ctx.fillRect(6, 6, 8, 8);
    ctx.fillStyle = '#64748b';
    ctx.fillRect(16, 14, 8, 3);
    tiles['WORKBENCH'] = canvas;
  }

  // 17. TELESCOPE — AirLytics Observatory Telemetry Array
  {
    const { canvas, ctx } = createTileCanvas();
    ctx.fillStyle = 'transparent';
    ctx.fillRect(0, 0, 32, 32);
    // Stone mount base
    ctx.fillStyle = '#334155';
    ctx.fillRect(4, 24, 24, 8);
    // Sturdy brass tripod
    ctx.fillStyle = '#475569';
    ctx.fillRect(6, 16, 4, 10);
    ctx.fillRect(22, 16, 4, 10);
    ctx.fillRect(14, 14, 4, 12);
    // Polished brass barrel pointed skyward
    ctx.fillStyle = '#d97706';
    ctx.fillRect(8, 6, 18, 8);
    ctx.fillStyle = '#fbbf24';
    ctx.fillRect(10, 4, 14, 4);
    // Cyan optical lens
    ctx.fillStyle = '#38bdf8';
    ctx.fillRect(24, 4, 4, 10);
    ctx.fillStyle = '#e0f2fe';
    ctx.fillRect(25, 6, 2, 3);
    tiles['TELESCOPE'] = canvas;
  }

  // 18. SIGNPOST — Handcrafted Directional Post
  {
    const { canvas, ctx } = createTileCanvas();
    ctx.fillStyle = 'transparent';
    ctx.fillRect(0, 0, 32, 32);
    // Sturdy oak board
    ctx.fillStyle = '#78350f';
    ctx.fillRect(3, 4, 26, 16);
    ctx.fillStyle = '#b45309';
    ctx.fillRect(5, 6, 22, 12);
    // Carved script lines
    ctx.fillStyle = '#451a03';
    ctx.fillRect(7, 8, 18, 2);
    ctx.fillRect(7, 12, 14, 2);
    // Signpost pillar
    ctx.fillStyle = '#5c2d12';
    ctx.fillRect(14, 20, 4, 12);
    tiles['SIGN'] = canvas;
  }

  // 19. NAIL RELIC — Pure Nail from Hollow Knight
  {
    const { canvas, ctx } = createTileCanvas();
    ctx.fillStyle = 'transparent';
    ctx.fillRect(0, 0, 32, 32);
    // Carved Hallownest stone altar
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(4, 20, 24, 12);
    ctx.fillStyle = '#475569';
    ctx.fillRect(6, 18, 20, 4);
    // Soul aura shimmer around blade
    ctx.fillStyle = 'rgba(56, 189, 248, 0.25)';
    ctx.fillRect(11, 2, 10, 16);
    // Gleaming Silver Nail Blade
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(15, 2, 2, 16);
    ctx.fillStyle = '#cbd5e1';
    ctx.fillRect(14, 4, 4, 10);
    ctx.fillRect(13, 8, 6, 4);
    // Nail Crossguard & Hilt
    ctx.fillStyle = '#94a3b8';
    ctx.fillRect(11, 14, 10, 2);
    ctx.fillStyle = '#334155';
    ctx.fillRect(15, 16, 2, 4);
    tiles['NAIL_RELIC'] = canvas;
  }

  // 20. LANTERN — Iron Hanging Warm Amber Lantern
  {
    const { canvas, ctx } = createTileCanvas();
    ctx.fillStyle = 'transparent';
    ctx.fillRect(0, 0, 32, 32);
    // Iron post & chain
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(15, 2, 2, 6);
    ctx.fillRect(10, 8, 12, 3);
    // Glass cage & warm amber flame
    ctx.fillStyle = '#f59e0b';
    ctx.fillRect(11, 11, 10, 10);
    ctx.fillStyle = '#fef08a';
    ctx.fillRect(13, 13, 6, 6);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(15, 15, 2, 2);
    // Lantern base
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(10, 21, 12, 3);
    tiles['LANTERN'] = canvas;
  }

  // 21. BENCH — Warm Wooden Rest Bench
  {
    const { canvas, ctx } = createTileCanvas();
    ctx.fillStyle = 'transparent';
    ctx.fillRect(0, 0, 32, 32);
    // Bench backrest
    ctx.fillStyle = '#78350f';
    ctx.fillRect(4, 6, 24, 6);
    ctx.fillStyle = '#9a3412';
    ctx.fillRect(6, 8, 20, 3);
    // Seat
    ctx.fillStyle = '#b45309';
    ctx.fillRect(4, 14, 24, 6);
    // Legs
    ctx.fillStyle = '#451a03';
    ctx.fillRect(6, 20, 4, 10);
    ctx.fillRect(22, 20, 4, 10);
    tiles['BENCH'] = canvas;
  }

  // 22. FLOWER_BOX — Wooden Planter Box with Blossoms
  {
    const { canvas, ctx } = createTileCanvas();
    ctx.fillStyle = 'transparent';
    ctx.fillRect(0, 0, 32, 32);
    // Wooden box
    ctx.fillStyle = '#78350f';
    ctx.fillRect(4, 16, 24, 12);
    ctx.fillStyle = '#9a3412';
    ctx.fillRect(6, 18, 20, 8);
    // Colorful flowers blooming
    ctx.fillStyle = '#ef4444';
    ctx.fillRect(6, 10, 5, 6);
    ctx.fillStyle = '#38bdf8';
    ctx.fillRect(14, 8, 5, 7);
    ctx.fillStyle = '#facc15';
    ctx.fillRect(21, 10, 5, 6);
    tiles['FLOWER_BOX'] = canvas;
  }

  // 23. WEATHER_VANE — Meteorological Wind Array
  {
    const { canvas, ctx } = createTileCanvas();
    ctx.fillStyle = 'transparent';
    ctx.fillRect(0, 0, 32, 32);
    // Copper finial & arrow
    ctx.fillStyle = '#d97706';
    ctx.fillRect(15, 2, 2, 26);
    ctx.fillRect(6, 8, 20, 2);
    // Cardinal points
    ctx.fillStyle = '#f59e0b';
    ctx.fillRect(4, 6, 4, 6);
    ctx.fillRect(24, 7, 4, 4);
    // Anemometer cups
    ctx.fillStyle = '#64748b';
    ctx.fillRect(10, 14, 4, 4);
    ctx.fillRect(18, 14, 4, 4);
    tiles['WEATHER_VANE'] = canvas;
  }

  return tiles;
}

// Generate Player Character Sprite Atlas (4 directions × 3 frames + idle breathing)
function generatePlayerAtlas() {
  const atlas = {};
  const dirs = ['down', 'up', 'left', 'right'];

  dirs.forEach(dir => {
    atlas[dir] = [];
    for (let frame = 0; frame < 3; frame++) {
      const { canvas, ctx } = createTileCanvas(32, 32);

      // Shadow underneath
      ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
      ctx.beginPath();
      ctx.ellipse(16, 30, 9, 3, 0, 0, Math.PI * 2);
      ctx.fill();

      // Foot offset for walking
      const legOffset = frame === 1 ? -2 : (frame === 2 ? 2 : 0);
      const armOffset = frame === 1 ? 2 : (frame === 2 ? -2 : 0);

      if (dir === 'down') {
        // Back hair silhouette
        ctx.fillStyle = '#1c1917';
        ctx.fillRect(10, 3, 12, 11);
        // Face skin
        ctx.fillStyle = '#fed7aa';
        ctx.fillRect(11, 6, 10, 8);
        // Eyes (focused, dark slate)
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(13, 9, 2, 3);
        ctx.fillRect(17, 9, 2, 3);
        // Textured bangs
        ctx.fillStyle = '#292524';
        ctx.fillRect(10, 3, 12, 4);
        ctx.fillRect(10, 7, 2, 3);
        ctx.fillRect(20, 7, 2, 2);

        // Blue Hoodie Body (Rich vibrant indie contrast)
        ctx.fillStyle = '#0284c7';
        ctx.fillRect(9, 14, 14, 10);
        // Collar & White Zipper
        ctx.fillStyle = '#f8fafc';
        ctx.fillRect(15, 14, 2, 8);
        // Hoodie pocket
        ctx.fillStyle = '#0369a1';
        ctx.fillRect(11, 20, 10, 3);

        // Arms
        ctx.fillStyle = '#0284c7';
        ctx.fillRect(6, 14 + armOffset, 3, 8);
        ctx.fillRect(23, 14 - armOffset, 3, 8);
        // Hands
        ctx.fillStyle = '#fed7aa';
        ctx.fillRect(6, 21 + armOffset, 3, 2);
        ctx.fillRect(23, 21 - armOffset, 3, 2);

        // Dark Cargo Joggers
        ctx.fillStyle = '#1e293b';
        ctx.fillRect(11, 24, 4, 5 + (legOffset > 0 ? legOffset : 0));
        ctx.fillRect(17, 24, 4, 5 + (legOffset < 0 ? -legOffset : 0));

        // White Sneakers
        ctx.fillStyle = '#f1f5f9';
        ctx.fillRect(10, 28 + (legOffset > 0 ? legOffset : 0), 5, 3);
        ctx.fillRect(17, 28 + (legOffset < 0 ? -legOffset : 0), 5, 3);
      } else if (dir === 'up') {
        // Head back with messy hair
        ctx.fillStyle = '#1c1917';
        ctx.fillRect(10, 3, 12, 12);
        ctx.fillStyle = '#292524';
        ctx.fillRect(11, 4, 10, 8);

        // Blue Hoodie Back
        ctx.fillStyle = '#0369a1';
        ctx.fillRect(9, 14, 14, 10);
        // Folded Hood
        ctx.fillStyle = '#0284c7';
        ctx.fillRect(11, 13, 10, 5);

        // Arms swinging
        ctx.fillStyle = '#0369a1';
        ctx.fillRect(6, 14 - armOffset, 3, 8);
        ctx.fillRect(23, 14 + armOffset, 3, 8);

        // Joggers
        ctx.fillStyle = '#1e293b';
        ctx.fillRect(11, 24, 4, 5 + (legOffset > 0 ? legOffset : 0));
        ctx.fillRect(17, 24, 4, 5 + (legOffset < 0 ? -legOffset : 0));

        // Shoes back
        ctx.fillStyle = '#e2e8f0';
        ctx.fillRect(11, 28 + (legOffset > 0 ? legOffset : 0), 4, 3);
        ctx.fillRect(17, 28 + (legOffset < 0 ? -legOffset : 0), 4, 3);
      } else if (dir === 'left') {
        // Profile head
        ctx.fillStyle = '#1c1917';
        ctx.fillRect(11, 3, 10, 11);
        ctx.fillStyle = '#fed7aa';
        ctx.fillRect(10, 6, 7, 8);
        // Eye
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(11, 9, 2, 3);

        // Body profile
        ctx.fillStyle = '#0284c7';
        ctx.fillRect(11, 14, 10, 10);
        // Arm swing
        ctx.fillStyle = '#0369a1';
        ctx.fillRect(13 + legOffset, 14, 4, 8);
        ctx.fillStyle = '#fed7aa';
        ctx.fillRect(14 + legOffset, 21, 3, 2);

        // Pants legs
        ctx.fillStyle = '#1e293b';
        ctx.fillRect(12 + legOffset, 24, 4, 5);
        ctx.fillRect(15 - legOffset, 24, 4, 5);

        // Sneakers
        ctx.fillStyle = '#f1f5f9';
        ctx.fillRect(10 + legOffset, 28, 6, 3);
        ctx.fillRect(14 - legOffset, 28, 5, 3);
      } else if (dir === 'right') {
        // Profile head
        ctx.fillStyle = '#1c1917';
        ctx.fillRect(11, 3, 10, 11);
        ctx.fillStyle = '#fed7aa';
        ctx.fillRect(15, 6, 7, 8);
        // Eye
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(19, 9, 2, 3);

        // Body profile
        ctx.fillStyle = '#0284c7';
        ctx.fillRect(11, 14, 10, 10);
        // Arm swing
        ctx.fillStyle = '#0369a1';
        ctx.fillRect(15 - legOffset, 14, 4, 8);
        ctx.fillStyle = '#fed7aa';
        ctx.fillRect(15 - legOffset, 21, 3, 2);

        // Pants legs
        ctx.fillStyle = '#1e293b';
        ctx.fillRect(13 - legOffset, 24, 4, 5);
        ctx.fillRect(16 + legOffset, 24, 4, 5);

        // Sneakers
        ctx.fillStyle = '#f1f5f9';
        ctx.fillRect(16 - legOffset, 28, 6, 3);
        ctx.fillRect(13 + legOffset, 28, 5, 3);
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
 * Second-Pass Environmental Composition & Destination Identity
 */

const MAP_WIDTH = 38;  // in tiles (1216 px)
const MAP_HEIGHT = 28; // in tiles (896 px)

// Biome / Zone definitions for discovery HUD
const ZONES = [
  { id: 'observatory', name: 'The Observatory', x1: 2, y1: 2, x2: 13, y2: 11 },
  { id: 'workshop', name: 'The AI Workshop', x1: 24, y1: 2, x2: 35, y2: 11 },
  { id: 'spawn', name: 'Spawn Meadow', x1: 14, y1: 12, x2: 24, y2: 23 },
  { id: 'saveroom', name: 'The Save Room', x1: 2, y1: 14, x2: 12, y2: 26 },
  { id: 'redstone', name: 'Redstone Lab', x1: 25, y1: 14, x2: 36, y2: 26 },
  { id: 'portal', name: 'The Nether Gate', x1: 14, y1: 1, x2: 23, y2: 7 }
];

function getZoneAt(tileX, tileY) {
  for (const z of ZONES) {
    if (tileX >= z.x1 && tileX <= z.x2 && tileY >= z.y1 && tileY <= z.y2) {
      return z.name;
    }
  }
  return 'The Overworld';
}

// Generate the 2D tile matrix & collision grid with organic composition
function buildWorldData() {
  const baseMap = [];
  const collisionMap = [];

  // Deterministic pseudorandom generator for natural terrain variation
  let seed = 42;
  function random() {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  }

  for (let y = 0; y < MAP_HEIGHT; y++) {
    baseMap[y] = [];
    collisionMap[y] = [];
    for (let x = 0; x < MAP_WIDTH; x++) {
      // Natural grass variation
      const r = random();
      if (r < 0.62) {
        baseMap[y][x] = 'GRASS';
      } else if (r < 0.74) {
        baseMap[y][x] = 'GRASS_FLOWERS';
      } else if (r < 0.83) {
        baseMap[y][x] = 'GRASS_FLOWERS_WHITE';
      } else if (r < 0.92) {
        baseMap[y][x] = 'GRASS_TALL';
      } else {
        baseMap[y][x] = 'GRASS_PEBBLE';
      }
      collisionMap[y][x] = false;

      // Outer world boundary walls (Stone Brick with moss)
      if (x === 0 || x === MAP_WIDTH - 1 || y === 0 || y === MAP_HEIGHT - 1) {
        baseMap[y][x] = (x + y) % 3 === 0 ? 'COBBLE_MOSSY' : 'STONE_BRICK';
        collisionMap[y][x] = true;
      }
    }
  }

  // --- 1. NATURAL WINDING RIVER & SHORE ---
  // A scenic winding river separating the western sanctuaries from spawn
  const riverTiles = [
    // North source
    [13, 8], [13, 9], [14, 9],
    // Mid reach
    [14, 10], [14, 11], [13, 11], [13, 12], [13, 13],
    [12, 13], [12, 14], [12, 15], [13, 15], [13, 16],
    [13, 17], // Approaching bridge
    [13, 18], [13, 19], // Bridge crossing zone
    [13, 20], [14, 20], [14, 21], [14, 22], [14, 23],
    [15, 23], [15, 24], [15, 25], [16, 25], [16, 26]
  ];

  riverTiles.forEach(([rx, ry]) => {
    // Leave room for the bridge at y: 18 and 19
    if (ry === 18 || ry === 19) {
      baseMap[ry][rx] = 'WOOD_BRIDGE';
      collisionMap[ry][rx] = false; // Walkable bridge!
    } else {
      baseMap[ry][rx] = 'WATER';
      collisionMap[ry][rx] = true; // River is impassable without bridge
    }
  });

  // Shoreline sand/grass edges alongside the river
  riverTiles.forEach(([rx, ry]) => {
    if (rx > 1 && baseMap[ry][rx - 1] === 'GRASS' && random() > 0.4) {
      baseMap[ry][rx - 1] = 'GRASS_MOSSY';
    }
    if (rx < MAP_WIDTH - 2 && baseMap[ry][rx + 1] === 'GRASS' && random() > 0.4) {
      baseMap[ry][rx + 1] = 'GRASS_MOSSY';
    }
  });

  // --- 2. HIGHWAYS, COBBLE PATHS & CROSSROADS ---
  // Central North-South highway (connecting Nether Gate to Spawn)
  for (let y = 6; y <= 21; y++) {
    baseMap[y][18] = 'DIRT_PATH';
    baseMap[y][19] = 'DIRT_PATH';
  }

  // East-West central trail crossing the bridge
  for (let x = 8; x <= 28; x++) {
    if (x === 13) continue; // Kept as WOOD_BRIDGE
    baseMap[18][x] = 'DIRT_PATH';
    baseMap[19][x] = 'DIRT_PATH';
  }

  // Spawn plaza cobblestone compass inlay
  for (let py = 16; py <= 20; py++) {
    for (let px = 17; px <= 20; px++) {
      baseMap[py][px] = 'COBBLESTONE';
    }
  }

  // NW path branch towards Observatory
  for (let y = 10; y <= 16; y++) {
    baseMap[y][15] = 'COBBLESTONE';
  }
  for (let x = 11; x <= 15; x++) {
    baseMap[10][x] = 'COBBLESTONE';
  }

  // NE path branch towards AI Workshop
  for (let y = 10; y <= 16; y++) {
    baseMap[y][22] = 'COBBLESTONE';
  }
  for (let x = 22; x <= 26; x++) {
    baseMap[10][x] = 'COBBLESTONE';
  }

  // --- 3. THE OBSERVATORY (NW: x: 3 to 11, y: 3 to 9) ---
  // Architecture: Stately stone walls, celestial slate floor with brass inlay
  for (let oy = 3; oy <= 9; oy++) {
    for (let ox = 3; ox <= 11; ox++) {
      if (oy === 3 || oy === 9 || ox === 3 || ox === 11) {
        baseMap[oy][ox] = (ox + oy) % 2 === 0 ? 'STONE_BRICK' : 'COBBLE_MOSSY';
        collisionMap[oy][ox] = true;
      } else {
        baseMap[oy][ox] = 'OBSERVATORY_FLOOR';
      }
    }
  }
  // Observatory doorway on East wall (facing the road)
  baseMap[6][11] = 'COBBLESTONE';
  collisionMap[6][11] = false;
  baseMap[7][11] = 'COBBLESTONE';
  collisionMap[7][11] = false;

  // --- 4. THE AI WORKSHOP (NE: x: 26 to 34, y: 3 to 9) ---
  // Architecture: Warm timber log lodge with parquet parquet floor
  for (let wy = 3; wy <= 9; wy++) {
    for (let wx = 26; wx <= 34; wx++) {
      if (wy === 3 || wy === 9 || wx === 26 || wx === 34) {
        baseMap[wy][wx] = 'WOOD_PLANKS';
        collisionMap[wy][wx] = true;
      } else {
        baseMap[wy][wx] = 'WORKSHOP_FLOOR';
      }
    }
  }
  // Workshop doorway on West wall (facing the road)
  baseMap[6][26] = 'WOOD_PLANKS';
  collisionMap[6][26] = false;
  baseMap[7][26] = 'WOOD_PLANKS';
  collisionMap[7][26] = false;

  // --- 5. THE SAVE ROOM (SW: x: 3 to 11, y: 16 to 23) ---
  // Architecture: Weathered stone hearth sanctuary with royal velvet runner rug
  for (let sy = 16; sy <= 23; sy++) {
    for (let sx = 3; sx <= 11; sx++) {
      if (sy === 16 || sy === 23 || sx === 3 || sx === 11) {
        baseMap[sy][sx] = 'COBBLESTONE';
        collisionMap[sy][sx] = true;
      } else {
        // Velvet runner rug down the center of the room
        if (sx >= 6 && sx <= 8 && sy >= 18 && sy <= 21) {
          baseMap[sy][sx] = 'SAVEROOM_RUG';
        } else {
          baseMap[sy][sx] = 'WOOD_PLANKS';
        }
      }
    }
  }
  // Save Room doorway on East wall
  baseMap[19][11] = 'COBBLESTONE';
  collisionMap[19][11] = false;
  baseMap[20][11] = 'COBBLESTONE';
  collisionMap[20][11] = false;

  // --- 6. REDSTONE LAB (SE: x: 26 to 34, y: 16 to 23) ---
  // Architecture: Dark basalt masonry with conduit channels and logic circuitry
  for (let ry = 16; ry <= 23; ry++) {
    for (let rx = 26; rx <= 34; rx++) {
      if (ry === 16 || ry === 23 || rx === 26 || rx === 34) {
        baseMap[ry][rx] = 'STONE_BRICK';
        collisionMap[ry][rx] = true;
      } else {
        baseMap[ry][rx] = 'LAB_FLOOR';
      }
    }
  }
  // Redstone Lab doorway on West wall
  baseMap[19][26] = 'STONE_BRICK';
  collisionMap[19][26] = false;
  baseMap[20][26] = 'STONE_BRICK';
  collisionMap[20][26] = false;

  // Redstone floor wire connecting core (30,18) to lamp (30,21)
  baseMap[19][30] = 'REDSTONE_WIRE_OFF';
  baseMap[20][30] = 'REDSTONE_WIRE_OFF';

  // --- 7. THE NETHER GATE / EXIT PORTAL (North: x: 16 to 21, y: 2 to 5) ---
  for (let py = 2; py <= 5; py++) {
    for (let px = 16; px <= 21; px++) {
      baseMap[py][px] = 'COBBLESTONE';
    }
  }
  // Imposing Obsidian Portal Arch
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

// Interactive Objects List & Rich Metadata
function getInteractableObjects() {
  return [
    // 1. SPAWN NOTICE BOARD (Directional Compass & Orientation)
    {
      id: 'spawn_sign',
      tileX: 19,
      tileY: 16,
      name: 'Spawn Notice Board',
      tileType: 'SIGN',
      isSolid: true,
      prompt: '[E] Read Explorer Guide',
      type: 'sign',
      data: {
        title: '🧭 Welcome to AYUSHCRAFT',
        text: '“Hey, I’m Ayush. I build software, explore machine learning, tune Linux systems, and occasionally get lost in a good game.”\n\n' +
              '🗺️ Compass Directions from Spawn:\n' +
              '• North ⬆️ : The Nether Gate (Exit & Contact Coordinates)\n' +
              '• North-West ↖️ : The Observatory (AirLytics NCR Telemetry)\n' +
              '• North-East ↗️ : The AI Workshop (Autonomous Assistant & Code)\n' +
              '• South-West ↙️ : The Save Room (Hollow Knight Nail Relic & Gaming Lore)\n' +
              '• South-East ↘️ : The Redstone Lab (Verified Tech Arsenal & Logic Circuit)\n\n' +
              'Press [E] or tap any landmark to inspect it!'
      }
    },

    // 1B. SPAWN REST BENCH
    {
      id: 'spawn_bench',
      tileX: 17,
      tileY: 17,
      name: 'Meadow Rest Bench',
      tileType: 'BENCH',
      isSolid: true,
      prompt: '[E] Sit & Rest',
      type: 'sign',
      data: {
        title: 'Meadow Rest Bench',
        text: 'A quiet carved oak bench beneath the open sky.\n\nTake your time exploring the map at your own pace, or press [J] at any time to open your Explorer’s Journal.'
      }
    },

    // 1C. SPAWN FLOWER BOX
    {
      id: 'spawn_flowers',
      tileX: 20,
      tileY: 17,
      name: 'Blossoming Planter Box',
      tileType: 'FLOWER_BOX',
      isSolid: true,
      prompt: '[E] Admire Blossoms',
      type: 'sign',
      data: {
        title: 'Meadow Flower Box',
        text: 'Handcrafted planter box filled with vibrant red poppies and mountain buttercups. The world is built with care, pixel by pixel.'
      }
    },

    // 2. OBSERVATORY TERMINAL (AirLytics NCR)
    {
      id: 'observatory_terminal',
      tileX: 8,
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
        stats: [
          { value: '68 Stations', label: 'CPCB Mesh Coverage' },
          { value: '72 Hours', label: 'Predictive Horizon' },
          { value: '61.12 µg/m³', label: 'RMSE Baseline' },
          { value: '8 Endpoints', label: 'Grounded Assistant' }
        ],
        description: 'A 72-hour air quality forecast engine for Delhi NCR designed with absolute data provenance—traceable to individual monitoring stations, valid hourly observations, and CPCB arithmetic criteria.',
        highlights: [
          'Live 68-station CPCB mesh adhering to strict 2014 rolling-window rules without silent neighbour interpolation.',
          'Validated ML blend baseline at 61.12 µg/m³ RMSE (27% better than raw CAMS over 4M+ observations across an annual cycle).',
          'NASA VIIRS satellite fire corridor tracking with transport alignment against meteorological wind vector fields.',
          'API-grounded assistant strictly bounded to 8 read-only system endpoints with traceable tool calls and receipts.'
        ],
        stack: ['Python', 'FastAPI', 'TypeScript', 'React 19', 'Vite', 'Open-Meteo', 'NASA FIRMS'],
        links: [
          { text: '🌐 Launch Live Platform ↗', url: 'https://airlytics-ncr.vercel.app/', primary: true },
          { text: '📦 GitHub Repository ↗', url: 'https://github.com/Ayush20-lex/airlytics-ncr', primary: false }
        ]
      }
    },

    // 3. OBSERVATORY WEATHER VANE
    {
      id: 'observatory_vane',
      tileX: 5,
      tileY: 4,
      name: 'Meteorological Weather Sensor',
      tileType: 'WEATHER_VANE',
      isSolid: true,
      prompt: '[E] Check Atmospheric Readings',
      type: 'sign',
      data: {
        title: 'Atmospheric Sensor Array',
        text: 'Telemetry Sensor Active.\n\nMonitoring boundary layer height, wind vector transport, and surface thermal inversions across Delhi-NCR. Data streams feed directly into the predictive forecasting pipeline.'
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
        stats: [
          { value: 'Terminal-First', label: 'Developer Interface' },
          { value: 'Local Only', label: 'Zero Telemetry Leak' },
          { value: 'Permissioned', label: 'Human-in-the-Loop' },
          { value: 'AsyncIO', label: 'Non-Blocking Engine' }
        ],
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
        text: 'Shelves filled with volumes on Distributed Systems, Statistical Machine Learning, Linux Kernel Internals, and Data Pipeline Architectures.'
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
        stats: [
          { value: 'Python & TS', label: 'Primary Languages' },
          { value: 'FastAPI', label: 'High-Throughput API' },
          { value: 'React 19', label: 'Modern Frontend' },
          { value: 'Linux & Git', label: 'Daily Workflows' }
        ],
        description: 'A disciplined, verified toolkit without inflated claims. Only technologies proven by active codebases and systems are featured.',
        highlights: [
          'Core Languages: Python (primary backend/ML), TypeScript (modern web), Java, Bash / Shell, SQL.',
          'AI & Data: FastAPI, React 19, Pandas, NumPy, Scikit-Learn.',
          'Systems & Tooling: Linux (terminal-centric workflow), Git, GitHub, VS Code, Vite, Vercel.'
        ],
        stack: ['Python', 'TypeScript', 'Java', 'Bash', 'SQL', 'FastAPI', 'React 19', 'Linux', 'Git'],
        links: [
          { text: '🐙 View GitHub Repositories ↗', url: 'https://github.com/Ayush20-lex?tab=repositories', primary: true }
        ]
      }
    },

    // 7. REDSTONE LAMP (Interactive Circuit Toggle)
    {
      id: 'redstone_lamp_1',
      tileX: 30,
      tileY: 21,
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
      tileX: 8,
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
        stats: [
          { value: 'Hollow Knight', label: 'Favorite Mastery' },
          { value: 'Metroidvanias', label: 'Level Design Passion' },
          { value: 'Calisthenics', label: 'Bodyweight Discipline' },
          { value: 'Light Novels', label: 'Expansive Lore' }
        ],
        description: 'A peaceful rest sanctuary inspired by the atmosphere, bench checkpoints, and discovery of Metroidvania classics.',
        highlights: [
          'Metroidvania Mastery: Captivated by non-linear world design, environmental lore, and precision combat in Hollow Knight, Castlevania, and Ori.',
          'Light Novels & Manhwa: Passionate about expansive worldbuilding, strategic tension, and progression stories.',
          'Calisthenics: Dedicated to bodyweight strength, hand balancing, and physical progression—applying the same patient discipline found in debugging code.'
        ],
        stack: ['Hollow Knight', 'Metroidvanias', 'Light Novels', 'Manhwa', 'Calisthenics'],
        links: []
      }
    },

    // 8B. SAVE ROOM BENCH
    {
      id: 'save_room_bench',
      tileX: 6,
      tileY: 18,
      name: 'Hallownest Rest Bench',
      tileType: 'BENCH',
      isSolid: true,
      prompt: '[E] Rest on the Bench',
      type: 'sign',
      data: {
        title: 'Save Room Rest Bench',
        text: 'A quiet bench carved from dark stone, lit by the warm amber glow of a lantern.\n\nRest here to catch your breath. The world around you will stay peaceful and still.'
      }
    },

    // 8C. SAVE ROOM LANTERN
    {
      id: 'save_room_lantern',
      tileX: 10,
      tileY: 18,
      name: 'Amber Glow Lantern',
      tileType: 'LANTERN',
      isSolid: true,
      prompt: '[E] Warm Hands by Lantern',
      type: 'sign',
      data: {
        title: 'Luminescent Lantern',
        text: 'An iron hanging lantern flickering with a gentle, warm amber light. It casts peaceful dancing shadows across the velvet carpet.'
      }
    },

    // 9. EXIT PORTAL (Nether Gate Coordinates)
    {
      id: 'exit_portal',
      tileX: 18,
      tileY: 3,
      name: 'Inter-Dimensional Nether Gate',
      tileType: 'PORTAL',
      isSolid: true,
      prompt: '[E] Step Through Nether Gate',
      type: 'modal',
      data: {
        title: '🌌 The Nether Gate — Warp Coordinates',
        subtitle: 'Connect with Ayush Kumar across cyberspace',
        badges: ['Developer Contact', 'Open to Collaborations', 'Internships & Projects'],
        stats: [
          { value: 'Ayush20-lex', label: 'GitHub Identity' },
          { value: 'Open', label: 'Collaborations' },
          { value: 'Engineering', label: 'Academic Focus' },
          { value: 'India', label: 'Timezone (UTC+5:30)' }
        ],
        description: 'Thank you for exploring AyushCraft! Whether you are interested in environmental intelligence, machine learning systems, or want to discuss gaming and tech, my portal coordinates are open.',
        highlights: [
          'GitHub: Explore public codebases and open-source contributions.',
          'LinkedIn: Professional background, academic journey, and networking.',
          'Email: Direct reachout for software collaborations, internships, and inquiries.'
        ],
        stack: ['GitHub', 'LinkedIn', 'Gmail'],
        links: [
          { text: '🐙 GitHub Profile ↗', url: 'https://github.com/Ayush20-lex', primary: true },
          { text: '💼 LinkedIn Profile ↗', url: 'https://www.linkedin.com/in/ayush-kumar-942081322/', primary: true },
          { text: '✉️ Send Email ↗', url: 'mailto:ayushkumargbp@gmail.com', primary: false }
        ]
      }
    }
  ];
}

  /**
 * AYUSHCRAFT — Player Entity & Controller
 * Second-Pass Animation & Collision Refinement
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
    this.idleTimer = 0;
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
        this.targetPos = null; // Reached target destination
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
      this.idleTimer = 0;
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

      // Animation Cycle for walk
      this.animTimer += dt;
      if (this.animTimer > 0.13) {
        this.animTimer = 0;
        this.animFrame = (this.animFrame + 1) % 4; // 0, 1, 2, 3
      }

      // Footstep audio chime
      this.stepAudioTimer += dt;
      if (this.stepAudioTimer > 0.32) {
        this.stepAudioTimer = 0;
        audio.playStep();
      }
    } else {
      this.animFrame = 0;
      this.animTimer = 0;
      this.idleTimer += dt;
    }

    // 4. Check Proximity to Interactable Objects (within ~46 pixels)
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
          return true; // Impassable wall, water, or map edge
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

  // Render player sprite with walk cycle and idle breathing bob
  render(ctx, atlas) {
    // Convert 4-frame cycle (0, 1, 2, 3) to 3 sprite frames (0, 1, 0, 2)
    let frameIdx = 0;
    let yOffset = 0;

    if (this.isMoving) {
      if (this.animFrame === 1) frameIdx = 1;
      else if (this.animFrame === 3) frameIdx = 2;
    } else {
      // Subtle idle breathing pulse: 1 pixel bob every ~2.2s
      const cycle = Math.sin(this.idleTimer * 2.8);
      if (cycle > 0.8) {
        yOffset = -1;
      }
    }

    const sprite = atlas[this.direction][frameIdx];
    if (sprite) {
      ctx.drawImage(sprite, Math.round(this.x), Math.round(this.y + yOffset));
    }
  }
}

  /**
 * AYUSHCRAFT — UI System, Dialogue Windows & Accessible Journal
 * Native Pixel-Art Crafting Interface & Scannable Modals
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
        const iconEl = document.getElementById('sound-icon');
        const textEl = document.getElementById('sound-text');
        if (iconEl && textEl) {
          iconEl.textContent = isMuted ? '🔇' : '🔊';
          textEl.textContent = isMuted ? 'Mute' : 'Audio';
        } else {
          this.soundToggleBtn.innerHTML = isMuted ? '<span class="btn-icon">🔇</span><span class="btn-text">Mute</span>' : '<span class="btn-icon">🔊</span><span class="btn-text">Audio</span>';
        }
        this.soundToggleBtn.classList.toggle('active', !isMuted);
        this.soundToggleBtn.setAttribute('title', isMuted ? 'Sound: Muted (Click to enable)' : 'Sound: Active (Click to mute)');
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

  /**
 * AYUSHCRAFT — Core Game Engine & Canvas Renderer
 * Second-Pass Viewport, Rendering & Environmental Storytelling
 */







class Game {
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
      // Toggle Redstone lamp logic with live wire feedback
      obj.isOn = !obj.isOn;
      obj.tileType = obj.isOn ? 'LAMP_ON' : 'LAMP_OFF';

      // Update connected floor wire tiles in Redstone Lab
      const wireTile = obj.isOn ? 'REDSTONE_WIRE_ON' : 'REDSTONE_WIRE_OFF';
      this.baseMap[19][30] = wireTile;
      this.baseMap[20][30] = wireTile;

      audio.playToggle();
      this.ui.updateLocation(obj.isOn ? 'Redstone Circuit: Active ⚡ (15V Signal)' : 'Redstone Circuit: Inactive');
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

    // 3. Render Tree Groves (Natural Oak & Evergreen Clusters)
    const oakTrees = [
      [15, 13], [22, 13], [14, 22], [22, 22],
      [1, 1], [36, 1], [11, 7], [24, 7],
      [11, 24], [24, 24]
    ];
    oakTrees.forEach(([tx, ty]) => {
      const oakImg = this.tiles['TREE_TOP'];
      if (oakImg) {
        this.ctx.drawImage(oakImg, tx * TILE_SIZE - 16, ty * TILE_SIZE - 28);
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


  window.addEventListener('DOMContentLoaded', () => {
    if (window.__AYUSHCRAFT__) return;
    const game = new Game();
    window.__AYUSHCRAFT__ = game;
  });
})();