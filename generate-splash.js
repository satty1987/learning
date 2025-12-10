const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const splashDir = './src/assets/splash';
const sourceImage = './src/assets/logo.png';

// iOS splash screen sizes
const splashSizes = [
  { width: 640, height: 1136, name: 'launch-640x1136.png' },
  { width: 750, height: 1334, name: 'launch-750x1334.png' },
  { width: 1242, height: 2208, name: 'launch-1242x2208.png' },
  { width: 1125, height: 2436, name: 'launch-1125x2436.png' },
  { width: 1536, height: 2048, name: 'launch-1536x2048.png' },
  { width: 1668, height: 2224, name: 'launch-1668x2224.png' },
  { width: 2048, height: 2732, name: 'launch-2048x2732.png' }
];

if (!fs.existsSync(splashDir)) {
  fs.mkdirSync(splashDir, { recursive: true });
}

async function generateSplashScreens() {
  console.log('Generating splash screens...');
  
  for (const size of splashSizes) {
    try {
      // Create gradient background
      const svg = `
        <svg width="${size.width}" height="${size.height}">
          <defs>
            <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#8b5cf6;stop-opacity:1" />
              <stop offset="100%" style="stop-color:#ec4899;stop-opacity:1" />
            </linearGradient>
          </defs>
          <rect width="${size.width}" height="${size.height}" fill="url(#grad)"/>
        </svg>
      `;
      
      const background = Buffer.from(svg);
      
      // Create centered logo (30% of screen height)
      const logoSize = Math.floor(size.height * 0.3);
      
      await sharp(background)
        .composite([{
          input: await sharp(sourceImage)
            .resize(logoSize, logoSize, { fit: 'contain' })
            .toBuffer(),
          gravity: 'center'
        }])
        .png()
        .toFile(path.join(splashDir, size.name));
      
      console.log(`✓ Generated ${size.name}`);
    } catch (error) {
      console.error(`✗ Error generating ${size.name}:`, error.message);
    }
  }
  
  console.log('✓ All splash screens generated!');
}

generateSplashScreens();