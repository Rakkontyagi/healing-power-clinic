#!/usr/bin/env node

/**
 * Copy assets script
 * Copies JavaScript, images, and other assets to the dist directory after build
 */

const fs = require('fs');
const path = require('path');

const copyDir = (src, dest) => {
  if (!fs.existsSync(src)) {
    console.log(`Source directory ${src} does not exist, skipping...`);
    return;
  }

  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
};

const distAssetsDir = path.join(__dirname, '..', 'dist', 'assets');
const sourceAssetsDir = path.join(__dirname, '..', 'assets');

// Ensure dist/assets exists
if (!fs.existsSync(distAssetsDir)) {
  fs.mkdirSync(distAssetsDir, { recursive: true });
}

// Copy JS files
const jsSource = path.join(sourceAssetsDir, 'js');
const jsDest = path.join(distAssetsDir, 'js');
copyDir(jsSource, jsDest);
console.log('✓ Copied JavaScript files');

// Copy images
const imagesSource = path.join(sourceAssetsDir, 'images');
const imagesDest = path.join(distAssetsDir, 'images');
if (fs.existsSync(imagesSource)) {
  copyDir(imagesSource, imagesDest);
  console.log('✓ Copied images');
}

// Copy posters/SVGs
const postersSource = path.join(sourceAssetsDir, 'posters');
const postersDest = path.join(distAssetsDir, 'posters');
if (fs.existsSync(postersSource)) {
  copyDir(postersSource, postersDest);
  console.log('✓ Copied posters/SVGs');
}

console.log('✓ All assets copied successfully');
