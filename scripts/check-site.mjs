import { access, readFile, readdir } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const requiredFiles = [
  "index.html",
  "years/index.json",
  "years/2026/index.html",
  "assets/css/base.css",
  "assets/js/site.js",
  "assets/demo/2026/cover-party.svg",
  "assets/demo/2026/black-tea.svg",
  "assets/demo/2026/jasmine.svg",
  "assets/demo/2026/birthday-demo.mp4",
  ".github/workflows/pages.yml",
];

await Promise.all(requiredFiles.map((file) => access(path.join(root, file))));

const years = JSON.parse(await readFile(path.join(root, "years/index.json"), "utf8"));
if (!Array.isArray(years) || years.length === 0) {
  throw new Error("years/index.json must contain at least one year.");
}

for (const year of years) {
  await access(path.join(root, year.href, "index.html"));
}

const demoAssets = await readdir(path.join(root, "assets/demo/2026"));
if (demoAssets.length < 6) {
  throw new Error("2026 should include enough replaceable demo media.");
}

console.log(`Checked ${requiredFiles.length} required files and ${years.length} year entry.`);
