import { Link } from "react-router-dom";
import {
  PageHead,
  ActionCenter,
  ButtonLink,
  Flow,
  ResourceCard,
} from "../../components/ui";
import { resources, parcelStat } from "../../data";

import { RouteCalculator } from "../Tools";
import Checklist from "./Checklist";
const launchChecks = [
  "Confirm vehicle acceptance and payload suitability.",
  "Disclose commercial use and obtain appropriate coverage.",
  "Obtain written route scope, service standards and payment terms.",
  "Review the contract, deductions, claims and termination exposure.",
  "Verify business registration, tax and local licensing needs.",
  "Verify federal and state operating requirements for the actual work.",
  "Model compensation, all costs, owner labor and payment timing.",
  "Build a carrier packet for the verified contracting party.",
  "Plan safe check-in, scanning, delivery, POD and returns.",
  "Define backup capacity and launch only after readiness review.",
];
export default function Proposal() {
  return (
    <>
      <PageHead
        eyebrow="A conversation with your future business partner"
        title="Why last-mile logistics?"
        description="An educational mini-proposal: start with one verified service opportunity, learn the operation and grow only when the evidence supports it."
      />
      <div className="proposal-toolbar">
        <button className="button secondary" onClick={() => window.print()}>
          Print / save as PDF
        </button>
        <ButtonLink to="/academy/carrier">Study the carrier pathway</ButtonLink>
      </div>
      <section className="proposal-market">
        <p className="eyebrow">The market · {parcelStat.year}</p>
        <h2>
          <a
            href={resources.find((r) => r.id === "parcel")!.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            23.1 billion U.S. parcels.
          </a>
          <br />
          Each one needed a physical handoff.
        </h2>
        <ResourceCard resource={resources.find((r) => r.id === "parcel")!} />
        <p>
          Large industry volume explains the scale of the system. It does not
          guarantee a route, a customer, an available contract or profitable
          work for us.
        </p>
      </section>
      <section className="content-section">
        <h2>The problem. The system. Our entry point.</h2>
        <p>
          Retailers can accept orders digitally, but the product still has to
          move. Facilities, transport providers and delivery teams coordinate
          the physical handoffs. Our proposed entry point is a{" "}
          <strong>last-mile carrier</strong>: the business taking responsibility
          for contracted final-delivery service.
        </p>
        <Flow
          steps={[
            "Customer order",
            "Fulfillment",
            "Facility transport",
            "Last-mile carrier",
            "Recipient",
          ]}
        />
        <Link to="/journey">Inspect the complete 17-stage system →</Link>
      </section>
      <section className="content-section">
        <h2>How we start</h2>
        <div className="proposal-start">
          <span>
            01<strong>One verified route</strong>
          </span>
          <span>
            02<strong>One appropriate vehicle</strong>
          </span>
          <span>
            03<strong>One driver / operator</strong>
          </span>
        </div>
        <p>
          This is a proposed operating scope. There is no live route offer
          attached. Confirm the commercial and operating requirements before
          spending money or promising service.
        </p>
        <h3>What we learn</h3>
        <p>
          Warehouse check-in, route economics, client requirements, custody,
          proof of delivery, service metrics and cash timing.
        </p>
      </section>
      <section className="content-section">
        <h2>How we could grow</h2>
        <ol className="growth-path">
          {[
            "Route #1",
            "Route #2",
            "Driver #2",
            "Vehicle #2",
            "Multiple routes",
            "Fleet",
            "Direct client relationships",
            "Multiple warehouse relationships",
            "Regional carrier",
          ].map((s, i) => (
            <li key={s}>
              <span>{String(i + 1).padStart(2, "0")}</span>
              <strong>{s}</strong>
              <p>
                {i === 0
                  ? "Validate readiness and economics."
                  : "Advance only when demand, service quality and cash capacity support the step."}
              </p>
            </li>
          ))}
        </ol>
      </section>
      <section className="content-section">
        <h2>What we need to verify before launch</h2>
        <Checklist items={launchChecks} />
      </section>
      <h2>Our assumption-based business model</h2>
      <RouteCalculator />
      <section className="content-section">
        <h2>Next steps</h2>
        <ol>
          <li>Agree on roles, intended service and operating area.</li>
          <li>
            Speak with verified contracting parties and obtain actual
            qualification requirements.
          </li>
          <li>
            Collect vehicle and insurance quotes; review operating rules and
            contract terms.
          </li>
          <li>
            Run normal, low-volume and disruption scenarios with real inputs.
          </li>
          <li>
            Decide whether to launch based on the evidence, not industry scale
            alone.
          </li>
        </ol>
      </section>
      <ActionCenter
        ids={[
          "parcel",
          "census",
          "dot",
          "authority",
          "insurance",
          "sba",
          "break-even",
          "tour",
        ]}
      />
    </>
  );
}
