import { resources, opportunities, glossary, pathways } from "../data";
import { carrier, warehouse } from "../data/courses";
export interface SearchEntry {
  title: string;
  type: string;
  text: string;
  url: string;
  external?: boolean;
}
export const searchIndex: SearchEntry[] = [
  ...carrier.map((l) => ({
    title: l.title,
    type: "Carrier lesson",
    text: `${l.body} ${l.action}`,
    url: `/academy/carrier/${l.id}`,
  })),
  ...warehouse.map((l) => ({
    title: l.title,
    type: "Warehouse lesson",
    text: `${l.body} ${l.action}`,
    url: `/academy/warehouse/${l.id}`,
  })),
  ...opportunities.map((o) => ({
    title: o.title,
    type: "Opportunity",
    text: `${o.tagline} ${o.firstCustomer} ${o.equipment}`,
    url: `/opportunities/${o.id}`,
  })),
  ...resources.map((r) => ({
    title: r.title,
    type: `${r.classification} ${r.type}`,
    text: `${r.description} ${r.topic} ${r.publisher}`,
    url: r.url,
    external: true,
  })),
  ...Object.entries(glossary).map(([t, d]) => ({
    title: t,
    type: "Glossary",
    text: d,
    url: "/glossary",
  })),
  ...pathways.map(([t, url]) => ({ title: t, type: "Pathway", text: t, url })),
  ...[
    [
      "Route economics calculator",
      "/tools/route",
      "packages stops miles revenue profit expenses",
    ],
    [
      "Warehouse simulator",
      "/tools/warehouse",
      "rent square footage employees startup cost",
    ],
    [
      "Business registration",
      "/start/business-registration",
      "state Georgia LLC EIN local licensing",
    ],
    ["Start small", "/start/start-small", "SUV personal vehicle rental van"],
    ["Why last-mile logistics?", "/proposal", "partner proposal business plan"],
    [
      "Follow a package",
      "/journey",
      "BUY NOW order fulfillment warehouse delivery",
    ],
    ["Follow the money", "/money", "who pays whom"],
  ].map(([title, url, text]) => ({ title, url, text, type: "Tool / guide" })),
];
export function search(query: string) {
  const normalized = query.trim().toLowerCase().slice(0, 200);
  if (!normalized) return [];
  const aliases: Record<string, string> = {
    routes: "route",
    insurance: "insurance",
    dot: "usdot",
    profits: "profit",
    car: "vehicle",
    get: "find",
    getting: "find",
  };
  const words = normalized
    .split(/\W+/)
    .filter(
      (w) =>
        w.length > 1 &&
        ![
          "how",
          "do",
          "does",
          "the",
          "to",
          "can",
          "my",
          "is",
          "an",
          "with",
          "what",
          "for",
          "it",
          "start",
        ].includes(w),
    )
    .map((w) => aliases[w] || w);
  if (!words.length) return [];
  return searchIndex
    .map((entry) => ({
      entry,
      score: words.reduce(
        (n, w) =>
          n +
          (entry.title.toLowerCase().includes(w)
            ? 5
            : entry.text.toLowerCase().includes(w)
              ? 1
              : 0),
        0,
      ),
    }))
    .filter((e) => e.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 40)
    .map((e) => e.entry);
}
