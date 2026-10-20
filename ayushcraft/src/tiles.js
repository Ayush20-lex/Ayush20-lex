/**
 * AYUSHCRAFT — Tile and Sprite Generator
 * Procedural Pixel-Art Graphics Engine (Second-Pass Polish)
 */

export const TILE_SIZE = 32;

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
export function generateTileAtlas() {
  const tiles = {};

  // 1. GRASS — Natural Meadow Base (Soft, calm blade texturing)
  {
    const { canvas, ctx } = createTileCanvas();
    ctx.fillStyle = '#499a39';
    ctx.fillRect(0, 0, 32, 32);
    // Subtle blade shadows (small 2x2 and 2x3 pixels, no blocky blotches)
    ctx.fillStyle = '#3c852e';
    ctx.fillRect(6, 8, 2, 3);
    ctx.fillRect(20, 14, 2, 3);
    ctx.fillRect(10, 22, 2, 2);
    ctx.fillRect(26, 26, 2, 2);
    // Subtle sunlit blade highlights
    ctx.fillStyle = '#59b544';
    ctx.fillRect(8, 7, 2, 2);
    ctx.fillRect(22, 13, 2, 2);
    ctx.fillRect(12, 21, 2, 2);
    ctx.fillRect(28, 25, 2, 2);
    tiles['GRASS'] = canvas;
  }

  // 1A. GRASS_VAR2 — Alternate Subtle Blade Grain (Breaks up tiling repetition)
  {
    const { canvas, ctx } = createTileCanvas();
    ctx.fillStyle = '#499a39';
    ctx.fillRect(0, 0, 32, 32);
    // Offset blade accents
    ctx.fillStyle = '#3c852e';
    ctx.fillRect(14, 6, 2, 3);
    ctx.fillRect(4, 16, 2, 3);
    ctx.fillRect(24, 18, 2, 2);
    ctx.fillRect(16, 26, 2, 2);
    // Highlights
    ctx.fillStyle = '#59b544';
    ctx.fillRect(16, 5, 2, 2);
    ctx.fillRect(6, 15, 2, 2);
    ctx.fillRect(26, 17, 2, 2);
    ctx.fillRect(18, 25, 2, 2);
    tiles['GRASS_VAR2'] = canvas;
  }

  // 1B. GRASS_FLOWERS — Wild Meadow Poppies & Buttercups
  {
    const { canvas, ctx } = createTileCanvas();
    ctx.drawImage(tiles['GRASS'], 0, 0);
    // Red Poppies
    ctx.fillStyle = '#dc2626';
    ctx.fillRect(8, 10, 4, 4);
    ctx.fillRect(22, 16, 3, 3);
    ctx.fillStyle = '#fef08a'; // Pollen center
    ctx.fillRect(9, 11, 2, 2);
    ctx.fillRect(23, 17, 1, 1);
    // Yellow Buttercup
    ctx.fillStyle = '#eab308';
    ctx.fillRect(15, 22, 3, 3);
    ctx.fillStyle = '#f97316';
    ctx.fillRect(16, 23, 1, 1);
    tiles['GRASS_FLOWERS'] = canvas;
  }

  // 1C. GRASS_FLOWERS_WHITE — Chamomile / White Daisies
  {
    const { canvas, ctx } = createTileCanvas();
    ctx.drawImage(tiles['GRASS'], 0, 0);
    // White Daisies
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(10, 12, 4, 4);
    ctx.fillRect(22, 8, 3, 3);
    ctx.fillStyle = '#f59e0b'; // Gold center
    ctx.fillRect(11, 13, 2, 2);
    ctx.fillRect(23, 9, 1, 1);
    tiles['GRASS_FLOWERS_WHITE'] = canvas;
  }

  // 1D. GRASS_TALL — Bushy Grass Reeds & Tufts
  {
    const { canvas, ctx } = createTileCanvas();
    ctx.drawImage(tiles['GRASS'], 0, 0);
    ctx.fillStyle = '#2d6a22';
    // Tall graceful blades
    ctx.fillRect(11, 12, 2, 10);
    ctx.fillRect(15, 9, 2, 13);
    ctx.fillRect(19, 13, 2, 9);
    ctx.fillStyle = '#6ee755';
    ctx.fillRect(12, 10, 1, 5);
    ctx.fillRect(16, 7, 1, 6);
    ctx.fillRect(20, 11, 1, 4);
    tiles['GRASS_TALL'] = canvas;
  }

  // 1E. GRASS_PEBBLE — Meadow with Natural Field Stones
  {
    const { canvas, ctx } = createTileCanvas();
    ctx.drawImage(tiles['GRASS'], 0, 0);
    // River pebbles
    ctx.fillStyle = '#64748b';
    ctx.fillRect(9, 16, 4, 3);
    ctx.fillRect(21, 12, 3, 2);
    ctx.fillStyle = '#94a3b8';
    ctx.fillRect(10, 16, 2, 1);
    ctx.fillRect(22, 12, 1, 1);
    tiles['GRASS_PEBBLE'] = canvas;
  }

  // 1F. GRASS_MOSSY — Shaded Forest Floor & Riverbank Turf
  {
    const { canvas, ctx } = createTileCanvas();
    ctx.fillStyle = '#37772b';
    ctx.fillRect(0, 0, 32, 32);
    ctx.fillStyle = '#295b20';
    ctx.fillRect(2, 4, 12, 10);
    ctx.fillRect(16, 14, 14, 12);
    ctx.fillStyle = '#4d993e';
    ctx.fillRect(6, 18, 6, 6);
    ctx.fillRect(20, 6, 6, 5);
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

  // 6E. OBSERVATORY ENTRANCE (East wall: 2-tile tall architectural stone portal)
  // Top Tile (y: 6) — Stone Lintel Header & Brass Corner Bracket
  {
    const { canvas, ctx } = createTileCanvas();
    // Smooth flagstone threshold floor connecting outside cobblestone to inside slate
    ctx.fillStyle = '#484c59';
    ctx.fillRect(0, 0, 32, 32);
    // Subtle flagstone texture
    ctx.fillStyle = '#3c404c';
    ctx.fillRect(4, 10, 12, 10);
    ctx.fillRect(18, 14, 10, 12);
    // Heavy chiseled stone lintel across top edge (meeting solid wall above)
    ctx.fillStyle = '#262833';
    ctx.fillRect(0, 0, 32, 6);
    ctx.fillStyle = '#1c1d26';
    ctx.fillRect(0, 0, 32, 2);
    // Drop shadow under lintel
    ctx.fillStyle = 'rgba(0, 0, 0, 0.35)';
    ctx.fillRect(0, 6, 32, 3);
    // Outer stone doorframe jamb bevel (facing outside on right)
    ctx.fillStyle = '#626677';
    ctx.fillRect(30, 6, 2, 26);
    // Stately brass lintel bracket on outer corner
    ctx.fillStyle = '#d97706';
    ctx.fillRect(26, 2, 5, 5);
    ctx.fillStyle = '#fbbf24';
    ctx.fillRect(27, 3, 3, 3);
    // Soft interior slate shadow on inside edge (left)
    ctx.fillStyle = 'rgba(15, 23, 42, 0.4)';
    ctx.fillRect(0, 6, 3, 26);
    tiles['OBSERVATORY_ENTRANCE_T'] = canvas;
    tiles['OBSERVATORY_ENTRANCE'] = canvas; // Fallback alias
  }

  // Bottom Tile (y: 7) — Stone Doorpost Base & Brass Sill Bracket
  {
    const { canvas, ctx } = createTileCanvas();
    // Smooth flagstone threshold floor
    ctx.fillStyle = '#484c59';
    ctx.fillRect(0, 0, 32, 32);
    ctx.fillStyle = '#3c404c';
    ctx.fillRect(6, 6, 14, 12);
    // Heavy chiseled stone sill across bottom edge (meeting solid wall below)
    ctx.fillStyle = '#262833';
    ctx.fillRect(0, 26, 32, 6);
    ctx.fillStyle = '#3a3d4a';
    ctx.fillRect(0, 25, 32, 1);
    // Outer stone doorframe jamb bevel (facing outside on right)
    ctx.fillStyle = '#626677';
    ctx.fillRect(30, 0, 2, 25);
    // Stately brass sill bracket on outer corner
    ctx.fillStyle = '#d97706';
    ctx.fillRect(26, 25, 5, 5);
    ctx.fillStyle = '#fbbf24';
    ctx.fillRect(27, 26, 3, 3);
    // Soft interior slate shadow on inside edge (left)
    ctx.fillStyle = 'rgba(15, 23, 42, 0.4)';
    ctx.fillRect(0, 0, 3, 25);
    tiles['OBSERVATORY_ENTRANCE_B'] = canvas;
  }

  // 6F. WORKSHOP ENTRANCE (West wall: 2-tile tall carved timber lodge portal)
  // Top Tile (y: 6) — Dark Oak Lintel Beam & Forged Iron Strap
  {
    const { canvas, ctx } = createTileCanvas();
    // Warm cedar threshold plank floor connecting avenue to workshop
    ctx.fillStyle = '#a16207';
    ctx.fillRect(0, 0, 32, 32);
    // Cedar wood grain highlights
    ctx.fillStyle = '#b45309';
    ctx.fillRect(4, 8, 24, 4);
    ctx.fillRect(6, 18, 20, 4);
    // Heavy dark oak lintel beam across top edge (meeting solid wall above)
    ctx.fillStyle = '#452613';
    ctx.fillRect(0, 0, 32, 6);
    ctx.fillStyle = '#2d180b';
    ctx.fillRect(0, 0, 32, 2);
    // Overhang shadow
    ctx.fillStyle = 'rgba(0, 0, 0, 0.35)';
    ctx.fillRect(0, 6, 32, 3);
    // Doorframe post bevel on outside edge (left)
    ctx.fillStyle = '#5c331a';
    ctx.fillRect(0, 6, 3, 26);
    // Forged iron corner strap bracket with bolt
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(1, 1, 6, 6);
    ctx.fillStyle = '#94a3b8';
    ctx.fillRect(3, 3, 2, 2);
    // Interior parquet shadow on right
    ctx.fillStyle = 'rgba(30, 15, 5, 0.35)';
    ctx.fillRect(29, 6, 3, 26);
    tiles['WORKSHOP_ENTRANCE_T'] = canvas;
    tiles['WORKSHOP_ENTRANCE'] = canvas; // Fallback alias
  }

  // Bottom Tile (y: 7) — Dark Oak Base Post & Forged Iron Strap
  {
    const { canvas, ctx } = createTileCanvas();
    // Warm cedar threshold plank floor
    ctx.fillStyle = '#a16207';
    ctx.fillRect(0, 0, 32, 32);
    ctx.fillStyle = '#b45309';
    ctx.fillRect(6, 6, 20, 4);
    ctx.fillRect(4, 16, 24, 4);
    // Heavy dark oak base beam across bottom edge (meeting solid wall below)
    ctx.fillStyle = '#452613';
    ctx.fillRect(0, 26, 32, 6);
    ctx.fillStyle = '#5c331a';
    ctx.fillRect(0, 25, 32, 1);
    // Doorframe post bevel on outside edge (left)
    ctx.fillStyle = '#5c331a';
    ctx.fillRect(0, 0, 3, 25);
    // Forged iron corner strap bracket with bolt
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(1, 25, 6, 6);
    ctx.fillStyle = '#94a3b8';
    ctx.fillRect(3, 27, 2, 2);
    // Interior parquet shadow on right
    ctx.fillStyle = 'rgba(30, 15, 5, 0.35)';
    ctx.fillRect(29, 0, 3, 25);
    tiles['WORKSHOP_ENTRANCE_B'] = canvas;
  }

  // 6G. REDSTONE LAB ENTRANCE (West wall: Fortified Basalt Portal with Iron Gussets)
  // Top Tile (y: 18) — Reinforced Basalt Lintel & Redstone Diode
  {
    const { canvas, ctx } = createTileCanvas();
    // Dark industrial metal threshold plate floor
    ctx.fillStyle = '#262733';
    ctx.fillRect(0, 0, 32, 32);
    // Steel treadplate traction grooves
    ctx.fillStyle = '#343644';
    ctx.fillRect(6, 10, 18, 3);
    ctx.fillRect(8, 20, 16, 3);
    // Heavy basalt lintel across top edge (meeting solid stone brick wall above)
    ctx.fillStyle = '#181922';
    ctx.fillRect(0, 0, 32, 6);
    ctx.fillStyle = '#0f1017';
    ctx.fillRect(0, 0, 32, 2);
    // Portal shadow under lintel
    ctx.fillStyle = 'rgba(0, 0, 0, 0.45)';
    ctx.fillRect(0, 6, 32, 3);
    // Outer iron frame jamb bevel on outside edge (left)
    ctx.fillStyle = '#47495a';
    ctx.fillRect(0, 6, 3, 26);
    // Reinforced iron corner gusset with active redstone indicator diode
    ctx.fillStyle = '#343640';
    ctx.fillRect(0, 0, 7, 7);
    ctx.fillStyle = '#ef4444'; // Glowing redstone status node
    ctx.fillRect(2, 2, 3, 3);
    ctx.fillStyle = '#fecaca';
    ctx.fillRect(3, 3, 1, 1);
    // Interior lab depth shadow on right
    ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
    ctx.fillRect(29, 6, 3, 26);
    tiles['REDSTONE_ENTRANCE_T'] = canvas;
    tiles['REDSTONE_ENTRANCE'] = canvas; // Fallback alias
  }

  // Bottom Tile (y: 19) — Reinforced Basalt Base & Redstone Diode
  {
    const { canvas, ctx } = createTileCanvas();
    // Dark industrial metal threshold plate floor
    ctx.fillStyle = '#262733';
    ctx.fillRect(0, 0, 32, 32);
    // Steel treadplate traction grooves
    ctx.fillStyle = '#343644';
    ctx.fillRect(8, 8, 16, 3);
    ctx.fillRect(6, 18, 18, 3);
    // Heavy basalt base across bottom edge (meeting solid stone brick wall below)
    ctx.fillStyle = '#181922';
    ctx.fillRect(0, 26, 32, 6);
    ctx.fillStyle = '#343640';
    ctx.fillRect(0, 25, 32, 1);
    // Outer iron frame jamb bevel on outside edge (left)
    ctx.fillStyle = '#47495a';
    ctx.fillRect(0, 0, 3, 25);
    // Reinforced iron corner gusset with active redstone indicator diode
    ctx.fillStyle = '#343640';
    ctx.fillRect(0, 25, 7, 7);
    ctx.fillStyle = '#ef4444'; // Glowing redstone status node
    ctx.fillRect(2, 27, 3, 3);
    ctx.fillStyle = '#fecaca';
    ctx.fillRect(3, 28, 1, 1);
    // Interior lab depth shadow on right
    ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
    ctx.fillRect(29, 0, 3, 25);
    tiles['REDSTONE_ENTRANCE_B'] = canvas;
  }

  // 6H. SAVE ROOM ENTRANCE (East wall: Sanctuary Stone Arch with Velvet Runner)
  // Top Tile (y: 18) — Weathered Stone Lintel & Golden Carpet Border
  {
    const { canvas, ctx } = createTileCanvas();
    // Dark stone sill background
    ctx.fillStyle = '#2d2e38';
    ctx.fillRect(0, 0, 32, 32);
    // Weathered cobblestone lintel across top edge (meeting solid wall above)
    ctx.fillStyle = '#202129';
    ctx.fillRect(0, 0, 32, 6);
    ctx.fillStyle = '#16171d';
    ctx.fillRect(0, 0, 32, 2);
    // Royal blue velvet carpet runner flowing through the doorway
    ctx.fillStyle = '#1e3a8a';
    ctx.fillRect(0, 6, 32, 26);
    // Embroidered gold trim along the top border of the carpet
    ctx.fillStyle = '#f59e0b';
    ctx.fillRect(0, 6, 32, 2);
    ctx.fillStyle = '#fbbf24';
    ctx.fillRect(2, 6, 28, 1);
    // Outer stone doorframe bevel on outside edge (right)
    ctx.fillStyle = '#4e505f';
    ctx.fillRect(30, 6, 2, 26);
    // Warm lantern light glow
    ctx.fillStyle = 'rgba(254, 240, 138, 0.12)';
    ctx.fillRect(0, 0, 32, 32);
    tiles['SAVEROOM_ENTRANCE_T'] = canvas;
    tiles['SAVEROOM_ENTRANCE'] = canvas; // Fallback alias
  }

  // Bottom Tile (y: 19) — Weathered Stone Base & Golden Carpet Border
  {
    const { canvas, ctx } = createTileCanvas();
    // Dark stone sill background
    ctx.fillStyle = '#2d2e38';
    ctx.fillRect(0, 0, 32, 32);
    // Royal blue velvet carpet runner flowing through the doorway
    ctx.fillStyle = '#1e3a8a';
    ctx.fillRect(0, 0, 32, 26);
    // Embroidered gold trim along the bottom border of the carpet
    ctx.fillStyle = '#f59e0b';
    ctx.fillRect(0, 24, 32, 2);
    ctx.fillStyle = '#fbbf24';
    ctx.fillRect(2, 25, 28, 1);
    // Weathered cobblestone base across bottom edge (meeting solid wall below)
    ctx.fillStyle = '#202129';
    ctx.fillRect(0, 26, 32, 6);
    ctx.fillStyle = '#3c3d47';
    ctx.fillRect(0, 25, 32, 1);
    // Outer stone doorframe bevel on outside edge (right)
    ctx.fillStyle = '#4e505f';
    ctx.fillRect(30, 0, 2, 25);
    // Warm lantern light glow
    ctx.fillStyle = 'rgba(254, 240, 138, 0.12)';
    ctx.fillRect(0, 0, 32, 32);
    tiles['SAVEROOM_ENTRANCE_B'] = canvas;
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

  // 9C. TREE BIRCH TOP (Canopy 64x64 — Varied oval silhouette with lighter foliage)
  {
    const { canvas, ctx } = createTileCanvas(64, 64);
    // Base shadow
    ctx.fillStyle = '#17471b';
    ctx.beginPath();
    ctx.ellipse(32, 33, 22, 26, 0, 0, Math.PI * 2);
    ctx.fill();
    // Mid foliage body
    ctx.fillStyle = '#2f8736';
    ctx.beginPath();
    ctx.ellipse(32, 29, 20, 24, 0, 0, Math.PI * 2);
    ctx.fill();
    // Clustered light birch leaf highlights
    ctx.fillStyle = '#52ba5a';
    ctx.beginPath();
    ctx.arc(26, 20, 10, 0, Math.PI * 2);
    ctx.arc(38, 22, 9, 0, Math.PI * 2);
    ctx.arc(32, 34, 10, 0, Math.PI * 2);
    ctx.fill();
    // Sunlit bright tips
    ctx.fillStyle = '#82ee8a';
    ctx.fillRect(22, 16, 5, 3);
    ctx.fillRect(35, 18, 5, 3);
    ctx.fillRect(28, 27, 4, 3);
    tiles['TREE_BIRCH'] = canvas;
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
export function generatePlayerAtlas() {
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
