/**
 * AYUSHCRAFT — World Map, Zones, Collisions and Interactable Objects
 * Second-Pass Environmental Composition & Destination Identity
 */

export const MAP_WIDTH = 38;  // in tiles (1216 px)
export const MAP_HEIGHT = 28; // in tiles (896 px)

// Biome / Zone definitions for discovery HUD
export const ZONES = [
  { id: 'observatory', name: 'The Observatory', x1: 2, y1: 2, x2: 13, y2: 11 },
  { id: 'workshop', name: 'The AI Workshop', x1: 24, y1: 2, x2: 35, y2: 11 },
  { id: 'spawn', name: 'Spawn Meadow', x1: 14, y1: 12, x2: 24, y2: 23 },
  { id: 'saveroom', name: 'The Save Room', x1: 2, y1: 14, x2: 12, y2: 26 },
  { id: 'redstone', name: 'Redstone Lab', x1: 25, y1: 14, x2: 36, y2: 26 },
  { id: 'portal', name: 'The Nether Gate', x1: 14, y1: 1, x2: 23, y2: 7 }
];

export function getZoneAt(tileX, tileY) {
  for (const z of ZONES) {
    if (tileX >= z.x1 && tileX <= z.x2 && tileY >= z.y1 && tileY <= z.y2) {
      return z.name;
    }
  }
  return 'The Overworld';
}

// Generate the 2D tile matrix & collision grid with organic composition
export function buildWorldData() {
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
      // Coherent meadow base with subtle deterministic micro-variation
      // Alternating GRASS and GRASS_VAR2 prevents repetitive wallpaper grid
      baseMap[y][x] = ((x * 7 + y * 13) % 5 === 0) ? 'GRASS_VAR2' : 'GRASS';
      collisionMap[y][x] = false;

      // Outer world boundary walls (Stone Brick with weathered mossy accents)
      if (x === 0 || x === MAP_WIDTH - 1 || y === 0 || y === MAP_HEIGHT - 1) {
        baseMap[y][x] = (x + y) % 3 === 0 ? 'COBBLE_MOSSY' : 'STONE_BRICK';
        collisionMap[y][x] = true;
      }
    }
  }

  // --- 1. NATURAL WINDING RIVER & SHORELINE TRANSITIONS ---
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

  // Shoreline organic riverbank transitions (mossy turf, reeds, and river pebbles)
  riverTiles.forEach(([rx, ry]) => {
    // West bank
    if (rx > 1 && (baseMap[ry][rx - 1] === 'GRASS' || baseMap[ry][rx - 1] === 'GRASS_VAR2')) {
      const bankR = (rx * 11 + ry * 17) % 7;
      if (bankR === 0 || bankR === 1) {
        baseMap[ry][rx - 1] = 'GRASS_TALL'; // River reeds
      } else if (bankR === 2 || bankR === 3) {
        baseMap[ry][rx - 1] = 'GRASS_MOSSY'; // Lush shaded turf
      } else if (bankR === 4) {
        baseMap[ry][rx - 1] = 'GRASS_PEBBLE'; // Rounded river stone
      }
    }
    // East bank
    if (rx < MAP_WIDTH - 2 && (baseMap[ry][rx + 1] === 'GRASS' || baseMap[ry][rx + 1] === 'GRASS_VAR2')) {
      const bankR = (rx * 13 + ry * 19) % 7;
      if (bankR === 0 || bankR === 1) {
        baseMap[ry][rx + 1] = 'GRASS_MOSSY';
      } else if (bankR === 2) {
        baseMap[ry][rx + 1] = 'GRASS_TALL';
      } else if (bankR === 3) {
        baseMap[ry][rx + 1] = 'GRASS_PEBBLE';
      }
    }
  });

  // Tall grass reeds along outer perimeter walls (where grass grows tall against masonry)
  for (let x = 1; x < MAP_WIDTH - 1; x++) {
    if (baseMap[1][x] === 'GRASS' && x % 4 === 0) baseMap[1][x] = 'GRASS_TALL';
    if (baseMap[MAP_HEIGHT - 2][x] === 'GRASS' && x % 4 === 2) baseMap[MAP_HEIGHT - 2][x] = 'GRASS_TALL';
  }
  for (let y = 1; y < MAP_HEIGHT - 1; y++) {
    if (baseMap[y][1] === 'GRASS' && y % 4 === 1) baseMap[y][1] = 'GRASS_TALL';
    if (baseMap[y][MAP_WIDTH - 2] === 'GRASS' && y % 4 === 3) baseMap[y][MAP_WIDTH - 2] = 'GRASS_TALL';
  }

  // --- INTENTIONAL SCENIC FLOWER CLUSTERS ---
  // Cluster A: Spawn Meadow Garden (Framing the fountain plaza and bench)
  const spawnGarden = [
    [16, 15, 'GRASS_FLOWERS'], [21, 15, 'GRASS_FLOWERS_WHITE'],
    [16, 21, 'GRASS_FLOWERS_WHITE'], [21, 21, 'GRASS_FLOWERS'],
    [15, 17, 'GRASS_FLOWERS'], [22, 17, 'GRASS_FLOWERS_WHITE'],
    [16, 16, 'GRASS_TALL'], [21, 16, 'GRASS_TALL']
  ];
  spawnGarden.forEach(([gx, gy, type]) => {
    if (baseMap[gy][gx] === 'GRASS' || baseMap[gy][gx] === 'GRASS_VAR2') {
      baseMap[gy][gx] = type;
    }
  });

  // Cluster B: Scenic Riverbank Meadow Bend (West of river, near y: 10-14)
  const riverMeadow = [
    [11, 11, 'GRASS_FLOWERS'], [10, 12, 'GRASS_FLOWERS_WHITE'],
    [11, 13, 'GRASS_FLOWERS'], [12, 11, 'GRASS_TALL'],
    [10, 14, 'GRASS_PEBBLE']
  ];
  riverMeadow.forEach(([gx, gy, type]) => {
    if (baseMap[gy][gx] === 'GRASS' || baseMap[gy][gx] === 'GRASS_VAR2') {
      baseMap[gy][gx] = type;
    }
  });

  // Cluster C: Observatory Meadow Verge (North-West meadow corner)
  const obsMeadow = [
    [10, 10, 'GRASS_FLOWERS_WHITE'], [9, 11, 'GRASS_FLOWERS'],
    [12, 10, 'GRASS_TALL'], [8, 11, 'GRASS_MOSSY']
  ];
  obsMeadow.forEach(([gx, gy, type]) => {
    if (baseMap[gy][gx] === 'GRASS' || baseMap[gy][gx] === 'GRASS_VAR2') {
      baseMap[gy][gx] = type;
    }
  });

  // --- 2. HIGHWAYS, COBBLE PATHS & CROSSROADS ---
  // Central North-South highway (connecting Nether Gate Citadel to Spawn & South)
  for (let y = 6; y <= 21; y++) {
    baseMap[y][18] = 'DIRT_PATH';
    baseMap[y][19] = 'DIRT_PATH';
  }

  // East-West central highway crossing the footbridge
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

  // NW path branch: Connects Spawn crossroads to Observatory approach
  for (let y = 10; y <= 16; y++) {
    baseMap[y][15] = 'DIRT_PATH';
  }
  for (let x = 12; x <= 15; x++) {
    baseMap[10][x] = 'DIRT_PATH';
  }
  // Dedicated Observatory Approach Avenue leading directly to East entrance (11, 6..7)
  for (let y = 6; y <= 10; y++) {
    baseMap[y][12] = 'DIRT_PATH';
  }

  // NE path branch: Connects Spawn crossroads to AI Workshop approach
  for (let y = 10; y <= 16; y++) {
    baseMap[y][22] = 'DIRT_PATH';
  }
  for (let x = 22; x <= 25; x++) {
    baseMap[10][x] = 'DIRT_PATH';
  }
  // Dedicated Workshop Approach Avenue leading directly to West entrance (26, 6..7)
  for (let y = 6; y <= 10; y++) {
    baseMap[y][25] = 'DIRT_PATH';
  }

  // --- 3. THE OBSERVATORY (NW: x: 3 to 11, y: 3 to 9) ---
  // Architecture: Stately stone walls, celestial slate floor with brass inlay
  for (let oy = 3; oy <= 9; oy++) {
    for (let ox = 3; ox <= 11; ox++) {
      if (oy === 3 || oy === 9 || ox === 3 || ox === 11) {
        baseMap[oy][ox] = (ox + oy) % 2 === 0 ? 'STONE_BRICK' : 'COBBLE_MOSSY';
        collisionMap[oy][ox] = true; // Continuous solid perimeter walls
      } else {
        baseMap[oy][ox] = 'OBSERVATORY_FLOOR';
      }
    }
  }
  // Architectural Stone Portal on East wall (facing approach avenue at x: 12)
  baseMap[6][11] = 'OBSERVATORY_ENTRANCE_T';
  collisionMap[6][11] = false;
  baseMap[7][11] = 'OBSERVATORY_ENTRANCE_B';
  collisionMap[7][11] = false;

  // --- 4. THE AI WORKSHOP (NE: x: 26 to 34, y: 3 to 9) ---
  // Architecture: Warm timber log lodge with parquet parquet floor
  for (let wy = 3; wy <= 9; wy++) {
    for (let wx = 26; wx <= 34; wx++) {
      if (wy === 3 || wy === 9 || wx === 26 || wx === 34) {
        baseMap[wy][wx] = 'WOOD_PLANKS';
        collisionMap[wy][wx] = true; // Continuous solid perimeter walls
      } else {
        baseMap[wy][wx] = 'WORKSHOP_FLOOR';
      }
    }
  }
  // Architectural Carved Timber Portal on West wall (facing approach avenue at x: 25)
  baseMap[6][26] = 'WORKSHOP_ENTRANCE_T';
  collisionMap[6][26] = false;
  baseMap[7][26] = 'WORKSHOP_ENTRANCE_B';
  collisionMap[7][26] = false;

  // --- 5. THE SAVE ROOM (SW: x: 3 to 11, y: 16 to 23) ---
  // Architecture: Weathered stone hearth sanctuary with royal velvet runner rug
  for (let sy = 16; sy <= 23; sy++) {
    for (let sx = 3; sx <= 11; sx++) {
      if (sy === 16 || sy === 23 || sx === 3 || sx === 11) {
        baseMap[sy][sx] = 'COBBLESTONE';
        collisionMap[sy][sx] = true; // Continuous solid perimeter walls
      } else {
        // Velvet runner rug extending from entrance archway (sx=10) down the center to the relic (sx=6)
        if (sx >= 6 && sx <= 10 && (sy === 18 || sy === 19)) {
          baseMap[sy][sx] = 'SAVEROOM_RUG';
        } else if (sx >= 6 && sx <= 8 && (sy === 20 || sy === 21)) {
          baseMap[sy][sx] = 'SAVEROOM_RUG';
        } else {
          baseMap[sy][sx] = 'WOOD_PLANKS';
        }
      }
    }
  }
  // Architectural Sanctuary Arch on East wall (aligned with highway and footbridge at y: 18..19)
  baseMap[18][11] = 'SAVEROOM_ENTRANCE_T';
  collisionMap[18][11] = false;
  baseMap[19][11] = 'SAVEROOM_ENTRANCE_B';
  collisionMap[19][11] = false;
  // Ensure y: 20 is sealed with solid cobblestone
  baseMap[20][11] = 'COBBLESTONE';
  collisionMap[20][11] = true;

  // --- 6. REDSTONE LAB (SE: x: 26 to 34, y: 16 to 23) ---
  // Architecture: Dark basalt masonry with conduit channels and logic circuitry
  for (let ry = 16; ry <= 23; ry++) {
    for (let rx = 26; rx <= 34; rx++) {
      if (ry === 16 || ry === 23 || rx === 26 || rx === 34) {
        baseMap[ry][rx] = 'STONE_BRICK';
        collisionMap[ry][rx] = true; // Continuous solid perimeter walls
      } else {
        baseMap[ry][rx] = 'LAB_FLOOR';
      }
    }
  }
  // Architectural Fortified Basalt Portal on West wall (aligned with highway at y: 18..19)
  baseMap[18][26] = 'REDSTONE_ENTRANCE_T';
  collisionMap[18][26] = false;
  baseMap[19][26] = 'REDSTONE_ENTRANCE_B';
  collisionMap[19][26] = false;
  // Ensure y: 20 is sealed with solid stone brick
  baseMap[20][26] = 'STONE_BRICK';
  collisionMap[20][26] = true;

  // Redstone floor wire connecting core (30,18) to lamp (30,21)
  baseMap[19][30] = 'REDSTONE_WIRE_OFF';
  baseMap[20][30] = 'REDSTONE_WIRE_OFF';

  // --- 7. THE NETHER GATE / EXIT PORTAL (North: x: 16 to 21, y: 2 to 5) ---
  // Open Scenic Cobblestone Plaza at the northern terminus of the highway
  for (let py = 2; py <= 5; py++) {
    for (let px = 16; px <= 21; px++) {
      baseMap[py][px] = 'COBBLESTONE';
    }
  }
  // Imposing Minecraft-style Obsidian Portal Arch
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
export function getInteractableObjects() {
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
        badges: ['72-Hour AQI Forecast', '68 CPCB Stations Mesh', '61.12 µg/m³ Evaluated RMSE', 'API-Grounded AI Assistant'],
        stats: [
          { value: '68 Stations', label: 'CPCB Mesh Coverage' },
          { value: '72 Hours', label: 'Predictive Horizon' },
          { value: '61.12 µg/m³', label: 'Evaluated Benchmark RMSE' },
          { value: '8 Endpoints', label: 'Grounded Assistant' }
        ],
        description: 'A 72-hour air quality forecast platform for Delhi-NCR with strict data provenance—traceable to individual monitoring stations, valid hourly observations, and CPCB arithmetic criteria.',
        highlights: [
          'CPCB Mesh: 68 continuous ambient stations strictly following 2014 arithmetic rolling rules (no synthetic interpolation).',
          'Documented Evaluation: 61.12 µg/m³ RMSE ML blend baseline evaluated across 4,069,348 observations (27% improvement over CAMS).',
          'Live Deployed Engine: Operational on Vercel with blend baseline and archive replay (deep model weights not loaded in serverless runtime).',
          'Bounded Assistant: Read-only AI assistant restricted to 8 verified system endpoints with traceable tool calls and station citations.'
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

    // 8C. SAVE ROOM LANTERN (Mounted on North wall alcove beside entrance)
    {
      id: 'save_room_lantern',
      tileX: 10,
      tileY: 17,
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
