import fs from "node:fs/promises";
const read = async (n) =>
  JSON.parse(await fs.readFile(`src/data/${n}.json`, "utf8"));
const [resources, carrier, warehouse, opportunities, journey] =
  await Promise.all(
    ["resources", "carrier", "warehouse", "opportunities", "journey"].map(read),
  );
const errors = [];
const ids = new Set(resources.map((r) => r.id));
if (ids.size !== resources.length) errors.push("Duplicate resource IDs");
const urls = new Set();
for (const r of resources) {
  if (!r.url.startsWith("https://")) errors.push(`Insecure URL: ${r.id}`);
  if (urls.has(r.url)) errors.push(`Duplicate URL: ${r.id}`);
  urls.add(r.url);
  if (
    r.classification === "Government" &&
    !new URL(r.url).hostname.endsWith(".gov") &&
    !new URL(r.url).hostname.endsWith(".state.tx.us") &&
    !new URL(r.url).hostname.endsWith("usps.com")
  )
    errors.push(`Nonofficial government domain: ${r.id}`);
  for (const k of [
    "title",
    "publisher",
    "description",
    "credibility",
    "lastVerified",
  ])
    if (!r[k]) errors.push(`Missing ${k}: ${r.id}`);
  const age = (Date.now() - Date.parse(r.lastVerified)) / 86400000;
  if (age > 180)
    console.warn(`Stale review: ${r.id} (${Math.floor(age)} days)`);
}
for (const l of [...carrier, ...warehouse]) {
  for (const k of [
    "body",
    "example",
    "implication",
    "cost",
    "action",
    "reviewedAt",
  ])
    if (!l[k]) errors.push(`Missing ${k}: ${l.id}`);
  for (const id of l.resources)
    if (!ids.has(id)) errors.push(`Missing resource ${id} in ${l.id}`);
  if (
    !l.resources.some(
      (id) => resources.find((r) => r.id === id)?.type === "Watch",
    )
  )
    errors.push(`Missing watch resource: ${l.id}`);
  if (!l.quiz.answers[l.quiz.correct]) errors.push(`Invalid quiz ${l.id}`);
}
for (const o of opportunities)
  for (const id of o.resources)
    if (!ids.has(id)) errors.push(`Missing resource ${id}`);
if (
  carrier.length !== 30 ||
  warehouse.length !== 27 ||
  journey.length !== 17 ||
  opportunities.length !== 14
)
  errors.push("Required content counts differ");
console.log({
  resources: resources.length,
  carrier: carrier.length,
  warehouse: warehouse.length,
  journey: journey.length,
  opportunities: opportunities.length,
  errors,
});
if (errors.length) process.exitCode = 1;
