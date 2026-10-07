import fs from "node:fs/promises";
const paths = JSON.parse(await fs.readFile("docs/routes.json", "utf8"));
const errors = [];
for (const path of paths) {
  const file = path === "/" ? "dist/index.html" : `dist${path}/index.html`;
  const html = await fs.readFile(file, "utf8");
  if (!html.includes("<h1"))
    errors.push(`${path}: missing prerendered content`);
  for (const pattern of [
    /<title>[^<]+<\/title>/,
    /<meta\s+name="description"\s+content="[^"]+"/,
    /<meta\s+property="og:title"\s+content="[^"]+"/,
    /<meta\s+property="og:description"\s+content="[^"]+"/,
    /<meta\s+property="og:url"\s+content="https:\/\/empoweredlogisticsacademy\.netlify\.app\//,
    /<meta\s+name="twitter:card"\s+content="summary_large_image"/,
    /<link\s+rel="canonical"\s+href="https:\/\/empoweredlogisticsacademy\.netlify\.app\//,
  ])
    if (!pattern.test(html))
      errors.push(`${path}: missing metadata ${pattern}`);
}
const carrier = await fs.readFile(
  "dist/academy/carrier/carrier-10/index.html",
  "utf8",
);
if (
  !carrier.includes(
    "USDOT safety registration and operating authority are distinct.",
  )
)
  errors.push("Lesson content missing");
if (
  !/<meta\s+name="description"\s+content="USDOT safety registration/.test(
    carrier,
  )
)
  errors.push("Lesson metadata does not match content");
const home = await fs.readFile("dist/index.html", "utf8");
const assets = [...home.matchAll(/(?:src|href)="(\/assets\/[^"?#]+)"/g)].map(
  (m) => m[1],
);
for (const asset of assets)
  try {
    await fs.access(`dist${asset}`);
  } catch {
    errors.push(`Missing built asset ${asset}`);
  }
await fs.access("dist/404.html");
const notFound = await fs.readFile("dist/404.html", "utf8");
if (!notFound.includes('<meta name="robots" content="noindex"'))
  errors.push("404 page is missing noindex metadata");
await fs.access("dist/robots.txt");
const sitemap = await fs.readFile("dist/sitemap.xml", "utf8");
for (const path of paths) {
  const url = `https://empoweredlogisticsacademy.netlify.app${path === "/" ? "/" : `${path}/`}`;
  if (!sitemap.includes(`<loc>${url}</loc>`))
    errors.push(`${path}: missing from sitemap`);
}
console.log({
  prerenderedRoutes: paths.length,
  homepageAssets: assets.length,
  errors,
});
if (errors.length) process.exitCode = 1;
