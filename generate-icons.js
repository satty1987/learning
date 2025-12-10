const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const sizes = [72, 96, 128, 144, 152, 192, 384, 512];
const iconsDir = './src/assets/icons';

// Create icons directory if it doesn't exist
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

// Source image (create a 512x512 PNG logo first)
const sourceImage = './src/assets/logo.png';

async function generateIcons() {
  console.log('Generating PWA icons...');
  
  for (const size of sizes) {
    try {
      await sharp(sourceImage)
        .resize(size, size, {
          fit: 'contain',
          background: { r: 255, g: 255, b: 255, alpha: 0 }
        })
        .png()
        .toFile(path.join(iconsDir, `icon-${size}x${size}.png`));
      
      console.log(`✓ Generated icon-${size}x${size}.png`);
    } catch (error) {
      console.error(`✗ Error generating ${size}x${size}:`, error.message);
    }
  }
  
  // Generate Apple Touch Icons
  const appleSizes = [120, 152, 180];
  for (const size of appleSizes) {
    try {
      await sharp(sourceImage)
        .resize(size, size, {
          fit: 'contain',
          background: { r: 255, g: 255, b: 255, alpha: 1 }
        })
        .png()
        .toFile(path.join(iconsDir, `apple-touch-icon-${size}x${size}.png`));
      
      console.log(`✓ Generated apple-touch-icon-${size}x${size}.png`);
    } catch (error) {
      console.error(`✗ Error generating Apple icon ${size}x${size}:`, error.message);
    }
  }
  
  console.log('✓ All icons generated successfully!');
}

generateIcons();