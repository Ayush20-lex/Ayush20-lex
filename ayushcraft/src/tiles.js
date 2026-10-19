/**
 * AYUSHCRAFT — Tile and Sprite Generator
 * Procedural Pixel-Art Graphics Engine
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
export function generatePlayerAtlas() {
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
