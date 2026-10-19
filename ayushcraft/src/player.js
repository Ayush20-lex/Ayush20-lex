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
