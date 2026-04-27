/**
 * Scans public/images/sites and writes lib/generated/site-images-manifest.json
 * so the app bundle does not need Node `fs` at runtime (client-safe imports).
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const BASE_PATH = path.join(ROOT, "public/images/sites");
const OUT = path.join(ROOT, "lib/generated/site-images-manifest.json");

const IMAGE_EXT = new Set([
  ".png",
  ".jpg",
  ".jpeg",
  ".webp",
  ".gif",
  ".avif",
]);

function emptyMaps() {
  return { screenshot: {}, logo: {} };
}

function classifyBaseName(base) {
  const name = base.toLowerCase();
  let slug = name;
  let type = "screenshot";

  if (/-screenshot$|_screenshot$/.test(name)) {
    slug = name.replace(/(-|_)screenshot$/, "");
    type = "screenshot";
  } else if (/-logo$|_logo$/.test(name)) {
    slug = name.replace(/(-|_)logo$/, "");
    type = "logo";
  } else {
    type = "screenshot";
  }
  return { slug, type };
}

function build() {
  /** @type {Record<string, { screenshot: Record<string, string>; logo: Record<string, string> }>} */
  const byFolder = {};

  if (!fs.existsSync(BASE_PATH)) {
    return { byFolder };
  }

  let categories = fs
    .readdirSync(BASE_PATH)
    .filter((c) => fs.statSync(path.join(BASE_PATH, c)).isDirectory());

  categories.sort((a, b) => {
    const score = (n) => (/\s/.test(n) ? 1 : 0);
    return score(a) - score(b) || a.localeCompare(b);
  });

  for (const category of categories) {
    if (/\s/.test(category)) {
      const hyphen = category.replace(/\s+/g, "-");
      if (categories.includes(hyphen)) continue;
    }

    const categoryPath = path.join(BASE_PATH, category);
    const files = fs.readdirSync(categoryPath);
    if (!byFolder[category]) byFolder[category] = emptyMaps();
    const maps = byFolder[category];

    for (const file of files) {
      const ext = path.extname(file).toLowerCase();
      if (!IMAGE_EXT.has(ext)) continue;

      const { slug, type } = classifyBaseName(
        path.basename(file, path.extname(file)),
      );
      const fullPath = `/images/sites/${category}/${file}`;
      if (!maps[type][slug]) maps[type][slug] = fullPath;
    }
  }

  return { byFolder };
}

const manifest = build();
fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, `${JSON.stringify(manifest, null, 2)}\n`, "utf8");
console.log("Wrote", path.relative(ROOT, OUT));
