import fs from "node:fs/promises";
import { render } from "../.ssr/entry-server.js";
const template = await fs.readFile("dist/index.html", "utf8");
const read = async (n) =>
  JSON.parse(await fs.readFile(`src/data/${n}.json`, "utf8"));
const [carrier, warehouse, opportunities] = await Promise.all(
  ["carrier", "warehouse", "opportunities"].map(read),
);
const paths = [
  "/",
  "/journey",
  "/opportunities",
  "/opportunities/compare",
  "/academy",
  "/academy/carrier",
  "/academy/warehouse",
  "/tools",
  "/tools/route",
  "/tools/warehouse",
  "/resources",
  "/resources/government",
  "/search",
  "/money",
  "/proposal",
  "/vehicles",
  "/start",
  "/start/start-small",
  "/start/business-registration",
  "/find-your-lane",
  "/glossary",
  "/progress",
  "/partners",
  "/about",
  "/privacy",
  ...opportunities.map((o) => `/opportunities/${o.id}`),
  ...carrier.map((l) => `/academy/carrier/${l.id}`),
  ...warehouse.map((l) => `/academy/warehouse/${l.id}`),
];
for (const path of [...paths, "/404"]) {
  const markup = render(path);
  const h1 =
    markup.match(/<h1[^>]*>(.*?)<\/h1>/)?.[1]?.replace(/<[^>]+>/g, "") ||
    "Empowered Logistics Academy";
  const title =
    path === "/"
      ? "Empowered Logistics Academy — Every order creates opportunity"
      : `${h1} | Empowered Logistics Academy`;
  const description =
    markup.match(/<p class="lead">(.*?)<\/p>/)?.[1]?.replace(/<[^>]+>/g, "") ||
    "Learn the system. Find your lane. Build your business.";
  const escape = (s) => s.replace(/"/g, "&quot;");
  let html = template
    .replace('<div id="root"></div>', `<div id="root">${markup}</div>`)
    .replace(/<title>.*?<\/title>/, `<title>${title}</title>`)
    .replace(
      /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/,
      `<meta name="description" content="${escape(description)}"/>`,
    )
    .replace(
      /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/,
      `<meta property="og:title" content="${escape(title)}"/>`,
    )
    .replace(
      /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/,
      `<meta property="og:description" content="${escape(description)}"/>`,
    );
  if (path === "/404") await fs.writeFile("dist/404.html", html);
  else {
    const dir = path === "/" ? "dist" : `dist${path}`;
    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(`${dir}/index.html`, html);
  }
}
await fs.writeFile("docs/routes.json", JSON.stringify(paths, null, 2));
await fs.rm(".ssr", { recursive: true, force: true });
console.log(
  `Prerendered ${paths.length} public routes plus 404. No hosting origin configured; canonical URLs and sitemap intentionally await deployment.`,
);
