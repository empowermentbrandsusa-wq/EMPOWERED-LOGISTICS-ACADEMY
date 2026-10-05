import fs from "node:fs/promises";
const resources = JSON.parse(
  await fs.readFile("src/data/resources.json", "utf8"),
);
const approvedUrls = new Map([
  ["parcel", "https://www.pitneybowes.com/us/shipping-index.html"],
  ["dot", "https://www.fmcsa.dot.gov/registration/do-i-need-usdot-number"],
  [
    "authority",
    "https://www.fmcsa.dot.gov/registration/get-mc-number-authority-operate",
  ],
  [
    "insurance",
    "https://www.fmcsa.dot.gov/registration/insurance-filing-requirements",
  ],
  ["sba", "https://www.sba.gov/counseling/launch-your-business/"],
  ["startup", "https://www.sba.gov/counseling/plan-your-business/"],
  [
    "break-even",
    "https://legacy.sba.gov/business-guide/plan-your-business/calculate-your-startup-costs/break-even-point",
  ],
  [
    "ein",
    "https://www.irs.gov/businesses/small-businesses-self-employed/get-an-employer-identification-number",
  ],
  ["tax", "https://www.irs.gov/businesses/small-businesses-self-employed"],
  ["ga-llc", "https://georgia.gov/register-llc"],
  ["ga-tax", "https://dor.georgia.gov/taxes/register-new-business-georgia"],
  [
    "ga-workers",
    "https://sbwc.georgia.gov/frequently-asked-questions/workers-compensation-insurance-faqs",
  ],
  ["ga-transport", "https://dps.georgia.gov/motor-carrier-compliance"],
  ["labor", "https://www.dol.gov/agencies/whd/flsa/misclassification"],
  ["osha", "https://www.osha.gov/warehousing"],
  ["forklift", "https://www.osha.gov/powered-industrial-trucks"],
  ["census", "https://www.census.gov/retail/data.html"],
  ["bts", "https://www.bts.gov/topics/freight-transportation"],
  [
    "tour",
    "https://www.aboutamazon.com/news/operations/join-our-team-on-a-guided-video-tour-through-a-fulfillment-center",
  ],
  [
    "warehouse-story",
    "https://www.aboutamazon.com/news/operations/amazon-fulfillment-center-photo-tour",
  ],
  ["reverse", "https://lot.dhl.com/reverse-logistics-explained/"],
  [
    "definitions",
    "https://cscmp.org/CSCMP/cscmp/educate/scm_definitions_and_glossary_of_terms.aspx",
  ],
  [
    "atlanta-operators",
    "https://www.ajc.com/news/business/local-black-owned-logistics-hubs-help-support-small-businesses/QLS36NM775A6DOVBQ7RHA7QURE/",
  ],
  ["state-directory", "https://www.usa.gov/state-governments"],
  ["local-directory", "https://www.usa.gov/local-governments"],
  [
    "ca-registration",
    "https://www.sos.ca.gov/business-programs/business-entities/starting-business",
  ],
  ["fl-registration", "https://dos.fl.gov/sunbiz/start-business"],
  ["tx-registration", "https://www.sos.state.tx.us/corp/do-business.shtml"],
  ["safer", "https://safer.fmcsa.dot.gov/CompanySnapshot.aspx"],
  [
    "carrier-video",
    "https://www.fmcsa.dot.gov/carrier-safety/new-entrant/new-entrant-program-videos",
  ],
  ["usps", "https://www.usps.com/business/business-shipping.htm"],
  ["saltbox", "https://www.saltbox.com/location/atlanta-upper-westside"],
]);
const report = [];
for (let i = 0; i < resources.length; i += 4) {
  await Promise.all(
    resources.slice(i, i + 4).map(async (r) => {
      const approvedUrl = approvedUrls.get(r.id);
      const result = {
        id: r.id,
        url: r.url,
        checkedAt: new Date().toISOString(),
        status: null,
      };
      try {
        if (!approvedUrl || approvedUrl !== r.url)
          throw new Error("Resource URL is not in the reviewed allowlist");
        const response = await fetch(approvedUrl, {
          redirect: "manual",
          signal: AbortSignal.timeout(20000),
          headers: { "User-Agent": "EmpoweredAcademy-LinkCheck/1.0" },
        });
        result.status =
          Number.isInteger(response.status) &&
          response.status >= 100 &&
          response.status <= 599
            ? response.status
            : null;
        await response.body?.cancel();
      } catch {
        result.error = "request-failed";
      }
      report.push(result);
    }),
  );
}
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
