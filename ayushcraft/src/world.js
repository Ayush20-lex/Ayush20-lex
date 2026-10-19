/**
 * AYUSHCRAFT — World Map, Zones, Collisions and Interactable Objects
 */

import { TILE_SIZE } from './tiles.js';

export const MAP_WIDTH = 38;  // in tiles (1216 px)
export const MAP_HEIGHT = 28; // in tiles (896 px)

// Biome / Zone definitions for discovery HUD
export const ZONES = [
  { id: 'observatory', name: 'The Observatory', x1: 2, y1: 2, x2: 13, y2: 12 },
  { id: 'workshop', name: 'The AI Workshop', x1: 24, y1: 2, x2: 35, y2: 12 },
  { id: 'spawn', name: 'Spawn Meadow', x1: 13, y1: 13, x2: 24, y2: 24 },
  { id: 'saveroom', name: 'The Save Room', x1: 2, y1: 14, x2: 12, y2: 26 },
  { id: 'redstone', name: 'Redstone Lab', x1: 25, y1: 14, x2: 36, y2: 26 },
  { id: 'portal', name: 'The Exit Portal', x1: 14, y1: 1, x2: 23, y2: 7 }
];

export function getZoneAt(tileX, tileY) {
  for (const z of ZONES) {
    if (tileX >= z.x1 && tileX <= z.x2 && tileY >= z.y1 && tileY <= z.y2) {
      return z.name;
    }
  }
  return 'Overworld';
}

// Generate the 2D tile matrix & collision grid
export function buildWorldData() {
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
export function getInteractableObjects() {
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
