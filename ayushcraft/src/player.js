/**
 * AYUSHCRAFT — Player Entity & Controller
 * Second-Pass Animation & Collision Refinement
 */

import { TILE_SIZE } from './tiles.js';
import { audio } from './audio.js';

export class Player {
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

    // Character Emote System State
    this.currentEmote = null; // null | 'wave' | 'thumbsup' | 'celebrate'
    this.emoteTimer = 0;
    this.emoteDuration = 0;
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

    // 0. Emote cancellation on movement or timer progression
    if (this.currentEmote) {
      if (dx !== 0 || dy !== 0 || this.targetPos) {
        this.cancelEmote();
      } else {
        this.emoteTimer -= dt;
        if (this.emoteTimer <= 0) {
          this.cancelEmote();
        }
      }
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

  // Trigger an expressive pixel-art emote
  triggerEmote(type) {
    // If moving or pathing, stop pathing cleanly
    this.targetPos = null;
    this.isMoving = false;
    this.animFrame = 0;
    this.idleTimer = 0;

    this.currentEmote = type;
    this.direction = 'down'; // Face camera for clear, readable gesture display

    if (type === 'wave') {
      this.emoteDuration = 1.2;
      this.emoteTimer = 1.2;
      audio.playWave();
    } else if (type === 'thumbsup') {
      this.emoteDuration = 1.1;
      this.emoteTimer = 1.1;
      audio.playThumbsUp();
    } else if (type === 'celebrate') {
      this.emoteDuration = 1.25;
      this.emoteTimer = 1.25;
      audio.playCelebration();
    }
  }

  // Cancel any active emote immediately
  cancelEmote() {
    this.currentEmote = null;
    this.emoteTimer = 0;
    this.emoteDuration = 0;
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

  // Render player sprite with walk cycle, idle breathing bob, or active emote
  render(ctx, atlas) {
    // 1. Render Active Emote Animation
    if (this.currentEmote && atlas.emotes && atlas.emotes[this.currentEmote]) {
      const emoteFrames = atlas.emotes[this.currentEmote];
      const progress = Math.max(0, Math.min(1, 1 - (this.emoteTimer / this.emoteDuration)));
      let frameIdx = 0;
      let yOffset = 0;

      const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (this.currentEmote === 'wave') {
        if (!prefersReducedMotion) {
          // Wave back and forth across 3 frames: 0 -> 1 -> 0 -> 1 -> 2
          const wavePhase = Math.floor(progress * 7) % 3;
          frameIdx = wavePhase;
        } else {
          frameIdx = 0; // Gentle static raised hand pose
        }
      } else if (this.currentEmote === 'thumbsup') {
        // Frame 0: Transition raise (0.0 -> 0.18), Frame 1: Proud thumbs-up hold
        frameIdx = progress < 0.18 ? 0 : 1;
        if (!prefersReducedMotion && progress >= 0.18 && progress < 0.4) {
          yOffset = 1; // Subtle nod of approval
        }
      } else if (this.currentEmote === 'celebrate') {
        // Frame 0: Anticipation crouch (0 -> 0.18)
        // Frame 1: Jubilant leap in air with both arms raised (0.18 -> 0.82)
        // Frame 2: Smooth landing (0.82 -> 1.0)
        if (progress < 0.18) {
          frameIdx = 0;
          if (!prefersReducedMotion) yOffset = 1;
        } else if (progress < 0.82) {
          frameIdx = 1;
          if (!prefersReducedMotion) {
            const jumpNorm = (progress - 0.18) / (0.82 - 0.18);
            yOffset = -Math.round(Math.sin(jumpNorm * Math.PI) * 7);
          }
        } else {
          frameIdx = 2;
          if (!prefersReducedMotion) yOffset = 0;
        }
      }

      // Ground shadow during celebrate jump (shadow stays anchored to ground)
      if (this.currentEmote === 'celebrate' && yOffset < 0) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.28)';
        ctx.beginPath();
        ctx.ellipse(Math.round(this.x + 16), Math.round(this.y + 30), 8, 2.5, 0, 0, Math.PI * 2);
        ctx.fill();
      }

      const sprite = emoteFrames[frameIdx] || emoteFrames[0];
      if (sprite) {
        ctx.drawImage(sprite, Math.round(this.x), Math.round(this.y + yOffset));
      }

      // Procedural pixel sparkle stars during victory leap (no emojis)
      if (this.currentEmote === 'celebrate' && progress > 0.2 && progress < 0.82 && !prefersReducedMotion) {
        this.renderCelebrationSparkles(ctx, progress);
      }
      return;
    }

    // 2. Standard Walk Cycle & Breathing Idle
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

  // Handcrafted procedural celebration sparkles (Canvas pixels, zero emojis)
  renderCelebrationSparkles(ctx, progress) {
    const cx = Math.round(this.x + 16);
    const cy = Math.round(this.y + 6);
    const t = (progress - 0.2) / 0.62;
    const dist = t * 14;

    const sparkles = [
      { x: cx - dist - 4, y: cy - dist * 0.8, color: '#fde047', size: 2 },
      { x: cx + dist + 4, y: cy - dist * 0.8, color: '#fde047', size: 2 },
      { x: cx - dist * 0.5, y: cy - dist - 5, color: '#38bdf8', size: 2 },
      { x: cx + dist * 0.5, y: cy - dist - 5, color: '#c084fc', size: 2 }
    ];

    sparkles.forEach(s => {
      ctx.fillStyle = s.color;
      ctx.fillRect(Math.round(s.x), Math.round(s.y), s.size, s.size);
    });
  }
}
