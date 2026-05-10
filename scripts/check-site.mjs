import { access, readFile, readdir } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const yearlyAssets = {
  2022: [
    "cover.jpg",
    "portrait.jpg",
    "detail-growth.jpg",
    "detail-toy.jpg",
    "detail-nap.jpg",
  ],
  2023: [
    "cover.jpg",
    "portrait.jpg",
    "window-note.jpg",
    "snack-note.jpg",
    "sunbeam-note.jpg",
  ],
  2024: [
    "cover.jpg",
    "poster.jpg",
    "scene-lights.jpg",
    "scene-ticket.jpg",
    "scene-film.jpg",
  ],
  2025: [
    "cover.jpg",
    "duo.jpg",
    "first-seat.jpg",
    "two-bowls.jpg",
    "first-photo.jpg",
  ],
  2026: [
    "cover-party.jpg",
    "black-tea.png",
    "jasmine.png",
    "gallery-together.jpeg",
    "gallery-cake.jpeg",
    "gallery-ribbon.png",
    "gallery-gift.jpeg",
    "video-poster.png",
    "birthday-demo.mp4",
  ],
};

const requiredFiles = [
  "index.html",
  "years/index.json",
  "assets/css/base.css",
  "assets/js/site.js",
  ".github/workflows/pages.yml",
  ...Object.entries(yearlyAssets).flatMap(([year, assets]) => [
    `years/${year}/index.html`,
    ...assets.map((asset) => `assets/demo/${year}/${asset}`),
  ]),
];

await Promise.all(requiredFiles.map((file) => access(path.join(root, file))));

const years = JSON.parse(await readFile(path.join(root, "years/index.json"), "utf8"));
if (!Array.isArray(years) || years.length === 0) {
  throw new Error("years/index.json must contain at least one year.");
}

for (const year of years) {
  await access(path.join(root, year.href, "index.html"));
  await access(path.join(root, year.cover));
}

for (const year of Object.keys(yearlyAssets)) {
  const demoAssets = await readdir(path.join(root, `assets/demo/${year}`));
  if (demoAssets.length < yearlyAssets[year].length) {
    throw new Error(`${year} should include enough replaceable demo media.`);
  }
}

console.log(`Checked ${requiredFiles.length} required files and ${years.length} year entries.`);
