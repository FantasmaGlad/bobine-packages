#!/usr/bin/env node
// Contrôle du portail : pages générées à jour, aucun script ni style intégré, liens locaux valides, empreinte affichée.
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const root = join(fileURLToPath(new URL(".", import.meta.url)), "..");
const FP = "B77D 96D7 2F84 F36A CAA3 F872 9CBF 497D 829E E15A";
const errors = [];

const gen = spawnSync(process.execPath, [join(root, "scripts/build-portal.mjs"), "--check"], { encoding: "utf8" });
if (gen.status !== 0) errors.push(`pages périmées : ${gen.stderr.trim()}`);

for (const page of ["index.html", "fr/index.html"]) {
  const html = readFileSync(join(root, page), "utf8");
  for (const [, attrs] of html.matchAll(/<script\b([^>]*)>/gi)) if (!/^\s*src="\/assets\/[a-z-]+\.js"\s+defer\s*$/.test(attrs)) errors.push(`${page} : script autre que ceux du portail`);
  if (/<script\b[^>]*>[^<]+<\/script>/i.test(html)) errors.push(`${page} : script intégré`);
  if (/<style\b|\sstyle=/i.test(html)) errors.push(`${page} : style intégré`);
  if (!html.includes(FP)) errors.push(`${page} : empreinte absente`);
  if (!html.includes("<!-- install -->") || !html.includes("<!-- /install -->")) errors.push(`${page} : marqueurs du bloc d'installation absents (miroir Tor)`);
  for (const [, ref] of html.matchAll(/(?:href|src)="(\/[^"#?]*)"/g)) {
    const target = join(root, ref, ref.endsWith("/") ? "index.html" : "");
    if (!existsSync(target)) errors.push(`${page} : lien local cassé ${ref}`);
  }
}

if (errors.length) { console.error(errors.map((e) => `::error::${e}`).join("\n")); process.exit(1); }
console.log("check-portal : pages à jour, sans script ni style intégré, liens locaux valides.");
