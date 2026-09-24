/**
 * Frontend self-check (no test framework needed).
 */
const fs = require("fs");
const path = require("path");

// ponytail: minimal check that essential entry points and configs exist
const requiredFiles = [
  "package.json",
  "tsconfig.json",
  "app/layout.tsx",
  "app/page.tsx",
  "app/globals.css",
];

for (const relPath of requiredFiles) {
  const fullPath = path.join(__dirname, relPath);
  if (!fs.existsSync(fullPath)) {
    console.error(`Check fallido: Archivo requerido faltante: ${relPath}`);
    process.exit(1);
  }
}

console.log("Frontend self-check OK: estructura de archivos verificada.");
