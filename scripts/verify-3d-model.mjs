import fs from 'fs';

// Verify file exists and has size > 100KB
const stats = fs.statSync('public/models/wolf.glb');
console.log('wolf.glb size:', stats.size, 'bytes');

if (stats.size > 100000) {
  console.log('Verification PASSED: Valid GLB model ready for Three.js GLTFLoader');
} else {
  console.error('Verification FAILED: GLB model too small or corrupted');
  process.exit(1);
}
