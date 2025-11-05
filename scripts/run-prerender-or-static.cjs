#!/usr/bin/env node

/**
 * Static build fallback script
 * This script is a placeholder for the prerender process.
 * Since the site is already static HTML, it just confirms the build completed.
 */

const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, '..', 'dist');

// Check if dist directory exists
if (!fs.existsSync(distDir)) {
  console.error('Error: dist directory not found. Build may have failed.');
  process.exit(1);
}

// Check if index.html exists in dist
const indexPath = path.join(distDir, 'index.html');
if (!fs.existsSync(indexPath)) {
  console.error('Error: index.html not found in dist directory.');
  process.exit(1);
}

console.log('✓ Static build completed successfully');
console.log(`✓ Output directory: ${distDir}`);

// Count HTML files in dist
const countFiles = (dir, ext) => {
  let count = 0;
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      count += countFiles(filePath, ext);
    } else if (file.endsWith(ext)) {
      count++;
    }
  });

  return count;
};

const htmlCount = countFiles(distDir, '.html');
console.log(`✓ Generated ${htmlCount} HTML pages`);

process.exit(0);
