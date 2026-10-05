import fs from "node:fs/promises";
const files = [];
async function walk(dir) {
  for (const e of await fs.readdir(dir, { withFileTypes: true })) {
    const p = `${dir}/${e.name}`;
    if (e.isDirectory()) await walk(p);
    else if (/\.(tsx?|json)$/.test(p)) files.push(p);
  }
}
await walk("src");
const findings = [];
const checks = [
  ["unsanitized HTML", /dangerouslySetInnerHTML/],
  ["dynamic evaluation", /\beval\s*\(|new Function\s*\(/],
  ["private key", /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/],
  ["AWS access key", /AKIA[0-9A-Z]{16}/],
  ["GitHub token", /gh[pousr]_[A-Za-z0-9]{30,}/],
  ["OpenAI key", /sk-(?:proj-)?[A-Za-z0-9_-]{30,}/],
  ["sensitive console logging", /console\.(?:log|debug)\(/],
];
for (const file of files) {
  const text = await fs.readFile(file, "utf8");
  for (const [name, re] of checks)
    if (re.test(text)) findings.push({ file, check: name });
}
const report = {
  checkedAt: new Date().toISOString(),
  filesReviewed: files.length,
  checks: checks.map(([n]) => n),
  findings,
  scope:
    "Pattern checks support manual source review. Not a penetration test or complete secrets/security audit. Deployment header enforcement requires a live host.",
};
await fs.writeFile("docs/security-check.json", JSON.stringify(report, null, 2));
console.log(report);
if (findings.length) process.exitCode = 1;
