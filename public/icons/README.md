# App Icons

This directory contains app icons for PWA and native mobile apps.

## Required Icons

Generate the following PNG icons from the `icon.svg` source:

### PWA Icons
- `icon-72x72.png`
- `icon-96x96.png`
- `icon-128x128.png`
- `icon-144x144.png`
- `icon-152x152.png`
- `icon-192x192.png`
- `icon-384x384.png`
- `icon-512x512.png`
- `maskable-icon-512x512.png` (with safe zone padding)

### Apple Touch Icons
- `apple-touch-icon.png` (180x180)

### Favicon
- `favicon.ico` (16x16, 32x32, 48x48 multi-size)

### Shortcut Icons
- `shortcut-journey.png` (192x192)
- `shortcut-wudu.png` (192x192)
- `shortcut-salah.png` (192x192)

## Generate Icons

You can use tools like:
- [RealFaviconGenerator](https://realfavicongenerator.net/)
- [PWA Asset Generator](https://github.com/nicksavage/pwa-asset-generator)
- Sharp/ImageMagick CLI tools

### Using Sharp (Node.js)
```bash
npm install sharp
node scripts/generate-icons.js
```

### Using ImageMagick
```bash
# Generate PNG from SVG
convert -background none icon.svg -resize 512x512 icon-512x512.png

# Generate all sizes
for size in 72 96 128 144 152 192 384 512; do
  convert icon-512x512.png -resize ${size}x${size} icon-${size}x${size}.png
done
```
