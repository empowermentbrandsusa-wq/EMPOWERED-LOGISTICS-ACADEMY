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
const staticTitles = new Map([
  ["/", "Empowered Logistics Academy — Every order creates opportunity"],
  ["/journey", "What happens after Buy Now?"],
  ["/opportunities", "Find your lane"],
  ["/opportunities/compare", "Compare business opportunities"],
  ["/academy", "Logistics Academy"],
  ["/academy/carrier", "Last-mile carrier master course"],
  ["/academy/warehouse", "Warehouse business master course"],
  ["/tools", "Business modeling tools"],
  ["/tools/route", "Route business model"],
  ["/tools/warehouse", "Warehouse startup calculator"],
  ["/resources", "Logistics resource center"],
  ["/resources/government", "Official government resources"],
  ["/search", "Search the Academy"],
  ["/money", "Follow the money"],
  ["/proposal", "Why last-mile logistics?"],
  ["/vehicles", "Vehicle center"],
  ["/start", "Start a logistics business"],
  ["/start/start-small", "Start with what you have"],
  ["/start/business-registration", "Business registration by state"],
  ["/find-your-lane", "Personalized learning pathway"],
  ["/glossary", "Logistics glossary"],
  ["/progress", "Learning progress"],
  ["/partners", "Partners"],
  ["/about", "About the Academy"],
  ["/privacy", "Privacy"],
  ["/404", "Page not found"],
]);
const routeMetadata = new Map([
  ...opportunities.map((o) => [
    `/opportunities/${o.id}`,
    { title: o.title, description: o.tagline },
  ]),
  ...carrier.map((lesson) => [
    `/academy/carrier/${lesson.id}`,
    { title: lesson.title, description: lesson.body },
  ]),
  ...warehouse.map((lesson) => [
    `/academy/warehouse/${lesson.id}`,
    { title: lesson.title, description: lesson.body },
  ]),
]);
const defaultDescription =
  "Learn the system. Find your lane. Build your business.";
const origin = "https://empoweredlogisticsacademy.netlify.app";
const escapeHtml = (value) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
for (const path of [...paths, "/404"]) {
  const markup = render(path);
  const metadata = routeMetadata.get(path);
  const pageTitle = metadata?.title || staticTitles.get(path) || "Academy";
  const title =
    path === "/" ? pageTitle : `${pageTitle} | Empowered Logistics Academy`;
  const description = metadata?.description || defaultDescription;
  const safeTitle = escapeHtml(title);
  const safeDescription = escapeHtml(description);
  const canonicalUrl = `${origin}${path === "/" ? "/" : `${path}/`}`;
  let html = template
    .replace('<div id="root"></div>', `<div id="root">${markup}</div>`)
    .replace(/<title>.*?<\/title>/, `<title>${safeTitle}</title>`)
    .replace(
      /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/,
      `<meta name="description" content="${safeDescription}"/>`,
    )
    .replace(
      /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/,
      `<meta property="og:title" content="${safeTitle}"/>`,
    )
    .replace(
      /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/,
      `<meta property="og:description" content="${safeDescription}"/>`,
    )
    .replace(
      /<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/,
      `<meta property="og:url" content="${canonicalUrl}"/>`,
    )
    .replace(
      /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/,
      `<meta name="twitter:title" content="${safeTitle}"/>`,
    )
    .replace(
      /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/,
      `<meta name="twitter:description" content="${safeDescription}"/>`,
    )
    .replace(
      /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/,
      `<link rel="canonical" href="${canonicalUrl}"/>`,
    );
  if (path === "/404")
    html = html.replace(
      "</head>",
      '    <meta name="robots" content="noindex" />\n  </head>',
    );
  if (path === "/404") await fs.writeFile("dist/404.html", html);
  else {
    const dir = path === "/" ? "dist" : `dist${path}`;
    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(`${dir}/index.html`, html);
  }
}
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths.map((path) => `  <url><loc>${origin}${path === "/" ? "/" : `${path}/`}</loc><lastmod>2026-10-06</lastmod></url>`).join("\n")}
</urlset>
`;
await fs.writeFile("dist/sitemap.xml", sitemap);
await fs.writeFile("docs/routes.json", JSON.stringify(paths, null, 2));
await fs.rm(".ssr", { recursive: true, force: true });
console.log(
  `Prerendered ${paths.length} public routes plus 404 with canonical URLs and sitemap.`,
);
