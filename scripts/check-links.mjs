import fs from "node:fs/promises";
const resources = JSON.parse(
  await fs.readFile("src/data/resources.json", "utf8"),
);
const report = [];
for (let i = 0; i < resources.length; i += 4) {
  await Promise.all(
    resources.slice(i, i + 4).map(async (r) => {
      const result = {
        id: r.id,
        url: r.url,
        checkedAt: new Date().toISOString(),
        status: null,
        finalUrl: null,
      };
      try {
        const response = await fetch(r.url, {
          redirect: "follow",
          signal: AbortSignal.timeout(20000),
          headers: { "User-Agent": "EmpoweredAcademy-LinkCheck/1.0" },
        });
        result.status = response.status;
        result.finalUrl = response.url;
        await response.body?.cancel();
      } catch (e) {
        result.error = e.message;
      }
      report.push(result);
    }),
  );
}
await fs.mkdir("docs", { recursive: true });
await fs.writeFile("docs/link-check.json", JSON.stringify(report, null, 2));
console.log(
  JSON.stringify(
    {
      total: report.length,
      success: report.filter((r) => r.status >= 200 && r.status < 400).length,
      blockedOrFailed: report.filter((r) => !r.status || r.status >= 400),
    },
    null,
    2,
  ),
);
// Network blocks are reported separately from verified missing pages.
if (report.some((r) => r.status === 404 || r.status === 410))
  process.exitCode = 1;
