// One-off: build tab/app icons from the brand logo mark.
// Needs sharp installed:  npm i -D sharp && node scripts/make-favicon.mjs
import sharp from "sharp";

const NAVY = "#0A1524"; // matches the site header / hero card
const SIZE = 512;
const RADIUS = 112; // ~22% — reads as a rounded app icon, not a hard square

// Rounded-square background in the brand navy
const background = Buffer.from(
  `<svg xmlns="http://www.w3.org/2000/svg" width="${SIZE}" height="${SIZE}">
     <rect width="${SIZE}" height="${SIZE}" rx="${RADIUS}" ry="${RADIUS}" fill="${NAVY}"/>
   </svg>`
);

// White NW monogram, sized to leave comfortable padding so it stays legible at 16px
const mark = await sharp("public/logo-mark-white.png")
  .trim()
  .resize({ width: Math.round(SIZE * 0.62), fit: "inside" })
  .toBuffer();

const master = await sharp(background)
  .composite([{ input: mark, gravity: "centre" }])
  .png()
  .toBuffer();

const outputs = [
  ["public/favicon-32.png", 32],
  ["public/favicon-192.png", 192],
  ["public/apple-touch-icon.png", 180],
  ["public/favicon-512.png", 512],
];

for (const [file, size] of outputs) {
  await sharp(master).resize(size, size).png().toFile(file);
  console.log("wrote", file, `${size}x${size}`);
}
