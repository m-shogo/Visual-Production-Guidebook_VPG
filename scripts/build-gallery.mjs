import { readdirSync, readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { load as loadYaml } from "js-yaml";

const root = dirname(dirname(fileURLToPath(import.meta.url)));

function loadDir(name) {
  const dir = join(root, "data", name);
  return readdirSync(dir)
    .filter((f) => f.endsWith(".yaml"))
    .map((f) => loadYaml(readFileSync(join(dir, f), "utf8")));
}

const techniques = loadDir("techniques");
const recipes = loadDir("recipes");
const references = loadDir("references");

function youtubeThumb(url) {
  const m = url && url.match(/(?:v=|youtu\.be\/)([\w-]{11})/);
  return m ? `https://img.youtube.com/vi/${m[1]}/hqdefault.jpg` : null;
}

function referencesFor(id, kind) {
  const key = kind === "technique" ? "technique_ids" : "recipe_ids";
  return references.filter((r) => (r[key] || []).includes(id));
}

function escapeHtml(s) {
  return String(s ?? "").replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  }[c]));
}

function card(entry, kind) {
  const refs = referencesFor(entry.id, kind);
  const thumbRef = refs.find((r) => youtubeThumb(r.url));
  const thumb = thumbRef ? youtubeThumb(thumbRef.url) : null;
  const linkUrl = thumbRef ? thumbRef.url : refs[0]?.url;
  const categories = kind === "technique" ? entry.categories || [] : [];
  const tags = entry.impression_tags || [];

  return `
    <a class="card" href="${escapeHtml(linkUrl || "#")}" target="_blank" rel="noopener"
       data-categories="${escapeHtml(categories.join(" "))}" data-tags="${escapeHtml(tags.join(" "))}"
       data-kind="${kind}">
      <div class="thumb">${
        thumb
          ? `<img src="${escapeHtml(thumb)}" alt="${escapeHtml(entry.name_ja)}" loading="lazy">`
          : `<div class="placeholder">Referenceなし</div>`
      }</div>
      <div class="body">
        <div class="kind">${kind === "recipe" ? "Recipe" : "Technique"}</div>
        <h3>${escapeHtml(entry.name_ja)}<span class="en">${escapeHtml(entry.name_en)}</span></h3>
        <p>${escapeHtml(entry.one_liner)}</p>
        <div class="tags">${tags.map((t) => `<span>${escapeHtml(t)}</span>`).join("")}</div>
        <div class="status status-${entry.status}">${entry.status}</div>
      </div>
    </a>`;
}

const cardsHtml = [
  ...techniques.map((t) => card(t, "technique")),
  ...recipes.map((r) => card(r, "recipe")),
].join("\n");

const html = `<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>映像演出図鑑 — ギャラリー（プロトタイプ）</title>
<style>
  :root { color-scheme: dark; }
  * { box-sizing: border-box; }
  body { font-family: -apple-system, "Hiragino Sans", system-ui, sans-serif; margin: 0; padding: 24px; background: #111; color: #eee; }
  h1 { font-size: 20px; margin: 0 0 4px; }
  .note { color: #999; font-size: 13px; margin-bottom: 24px; }
  .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 16px; }
  .card { display: block; text-decoration: none; color: inherit; background: #1c1c1c; border-radius: 8px; overflow: hidden; border: 1px solid #333; transition: border-color 0.15s; }
  .card:hover { border-color: #777; }
  .thumb { aspect-ratio: 16/9; background: #000; display: flex; align-items: center; justify-content: center; }
  .thumb img { width: 100%; height: 100%; object-fit: cover; display: block; }
  .placeholder { color: #555; font-size: 12px; }
  .body { padding: 10px 12px; }
  .kind { font-size: 10px; text-transform: uppercase; color: #888; letter-spacing: 0.05em; }
  h3 { margin: 4px 0; font-size: 15px; line-height: 1.3; }
  h3 .en { display: block; font-size: 11px; color: #999; font-weight: normal; }
  p { margin: 4px 0; font-size: 13px; color: #ccc; line-height: 1.4; }
  .tags { display: flex; flex-wrap: wrap; gap: 4px; margin-top: 6px; }
  .tags span { font-size: 10px; background: #2a2a2a; padding: 2px 6px; border-radius: 10px; color: #aaa; }
  .status { margin-top: 8px; font-size: 10px; display: inline-block; padding: 2px 6px; border-radius: 4px; }
  .status-draft { background: #443; color: #dd8; }
  .status-validated { background: #234; color: #8cf; }
  .status-published { background: #243; color: #8fc; }
</style>
</head>
<body>
  <h1>映像演出図鑑 — ギャラリー（プロトタイプ）</h1>
  <p class="note">Phase A2の最小UI。data/*.yaml から自動生成（pnpm run gallery で再生成）。サムネイルはYouTube公式サムネイルURLを使用、クリックで元動画へ遷移。</p>
  <div class="grid">
    ${cardsHtml}
  </div>
</body>
</html>
`;

const outDir = join(root, "dist");
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "index.html"), html);
console.log(
  `dist/index.html を生成しました（Technique ${techniques.length}件 / Recipe ${recipes.length}件 / Reference ${references.length}件）`
);
