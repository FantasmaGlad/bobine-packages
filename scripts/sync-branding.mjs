#!/usr/bin/env node
// Le portail consomme les sélecteurs, thèmes et marques du site principal sans recopier leur définition.
import { readFileSync, writeFileSync, copyFileSync, mkdirSync } from 'node:fs';
import { resolve, dirname, join, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';
const root = fileURLToPath(new URL('../', import.meta.url));
const source = resolve(process.argv[2] ?? join(root, '../BobineWeb'));
// La révision enregistrée doit décrire les fichiers copiés : une source modifiée mais non validée est refusée.
if (execFileSync('git', ['status', '--porcelain', '--', 'public'], {cwd:source, encoding:'utf8'}).trim()) {
  console.error('Le dossier public/ de BobineWeb contient des modifications non validées : les valider avant de synchroniser.');
  process.exit(1);
}
const files = ['bobine-controls.css', 'bobine-themes.json'];
for (const file of files) copyFileSync(join(source, 'public', file), join(root, 'assets', file));
const registry = JSON.parse(readFileSync(join(source, 'public/bobine-icons.json'), 'utf8'));
for (const asset of Object.values(registry).filter((a) => a.render === 'image')) {
  const path = asset.src.replace(/^\/images\//, '');
  const destination = resolve(root, path);
  if (!destination.startsWith(resolve(root) + sep)) throw new Error(`Destination hors du dépôt refusée : ${asset.src}`);
  mkdirSync(dirname(destination), {recursive:true});
  copyFileSync(join(source, 'public', asset.src), destination);
}
writeFileSync(join(root, 'assets/branding-source.json'), JSON.stringify({ repository:'FantasmaGlad/BobineWeb', revision:execFileSync('git', ['rev-parse', 'HEAD'], {cwd:source, encoding:'utf8'}).trim(), files }, null, 2) + '\n');
console.log('Sélecteurs, thèmes et logos synchronisés depuis BobineWeb.');
