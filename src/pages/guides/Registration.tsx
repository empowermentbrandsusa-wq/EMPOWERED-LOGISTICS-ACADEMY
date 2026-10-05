import { useState } from "react";

import { PageHead, ActionCenter, ResourceCard } from "../../components/ui";
import { resources } from "../../data";
const states =
  "Alabama|Alaska|Arizona|Arkansas|California|Colorado|Connecticut|Delaware|Florida|Georgia|Hawaii|Idaho|Illinois|Indiana|Iowa|Kansas|Kentucky|Louisiana|Maine|Maryland|Massachusetts|Michigan|Minnesota|Mississippi|Missouri|Montana|Nebraska|Nevada|New Hampshire|New Jersey|New Mexico|New York|North Carolina|North Dakota|Ohio|Oklahoma|Oregon|Pennsylvania|Rhode Island|South Carolina|South Dakota|Tennessee|Texas|Utah|Vermont|Virginia|Washington|West Virginia|Wisconsin|Wyoming|District of Columbia".split(
    "|",
  );
export default function Registration() {
  const [state, setState] = useState("Georgia");
  const stateResource: Record<string, string> = {
    California: "ca-registration",
    Florida: "fl-registration",
    Texas: "tx-registration",
  };
  return (
    <>
      <PageHead
        eyebrow="Location-aware startup guide"
        title="Business formation is a starting point."
        description="Registration, tax accounts, local licensing and transport requirements are separate decisions. Verify them for the state and local area where you actually operate."
      />
      <label className="state-selector">
        What state are you operating in?
        <select value={state} onChange={(e) => setState(e.target.value)}>
          {states.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </label>
      <section className="content-section" aria-live="polite">
        <h2>Your {state} verification pathway</h2>
        {state === "Georgia" ? (
          <div className="resource-grid">
            {resources
              .filter((r) =>
                ["ga-llc", "ga-tax", "ga-transport", "ga-workers"].includes(
                  r.id,
                ),
              )
              .map((r) => (
                <ResourceCard key={r.id} resource={r} />
              ))}
          </div>
        ) : (
          <>
            <p>
              We have not published a complete state-specific regulatory guide
              for {state}. Use the official SBA launch guide’s state resources
              to locate the appropriate registration agency. Confirm that
              agency’s current rules; do not apply Georgia’s requirements to
              your business.
            </p>
            {stateResource[state] && (
              <ResourceCard
                resource={resources.find((r) => r.id === stateResource[state])!}
              />
            )}
            <ResourceCard
              resource={resources.find((r) => r.id === "state-directory")!}
            />
            <ResourceCard resource={resources.find((r) => r.id === "sba")!} />
          </>
        )}
        <div className="detail-grid">
          <section>
            <h3>Business registration</h3>
            <p>
              Confirm entity choice, name availability, registered-agent
              requirements and ongoing filings with the state’s official
              business-registration agency.
            </p>
          </section>
          <section>
            <h3>Tax registration</h3>
            <p>
              Verify EIN needs with the IRS and applicable business, employment
              and other tax accounts with your state tax agency.
            </p>
          </section>
          <section>
            <h3>Local licensing</h3>
            <p>
              Contact your city and county about business licensing, zoning and
              permitted use. Formation does not settle these questions.
            </p>
          </section>
          <section>
            <h3>Transportation and insurance</h3>
            <p>
              Describe the actual operation to the responsible federal/state
              agencies and broker. Check cargo, geography, ratings, for-hire
              activity and contract requirements.
            </p>
          </section>
        </div>
      </section>
      <ActionCenter
        ids={[
          "sba",
          "ein",
          "dot",
          "authority",
          "insurance",
          "tax",
          "local-directory",
        ]}
        actions={[
          "Identify your operating state, city and county.",
          "Contact the official registration, tax and local licensing offices.",
          "Verify operation-specific requirements before accepting a contract.",
        ]}
      />
    </>
  );
}
