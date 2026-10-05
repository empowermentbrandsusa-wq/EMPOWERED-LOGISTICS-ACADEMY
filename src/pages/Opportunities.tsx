import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { opportunities } from "../data";
import {
  PageHead,
  Badge,
  ActionCenter,
  ButtonLink,
  TermText,
  Flow,
} from "../components/ui";
export default function Opportunities() {
  const part = useLocation().pathname.split("/")[2];
  return part === "compare" ? (
    <Compare />
  ) : part ? (
    <Detail id={part} />
  ) : (
    <Explorer />
  );
}
function Explorer() {
  const [vehicle, setVehicle] = useState("all");
  const [interest, setInterest] = useState("all");
  const [employees, setEmployees] = useState("all");
  const [facility, setFacility] = useState("all");
  const [experience, setExperience] = useState("all");
  const [b2b, setB2b] = useState("all");
  const [capital, setCapital] = useState("all");
  const [responsibility, setResponsibility] = useState("all");
  const filtered = opportunities.filter(
    (o) =>
      (vehicle === "all" ||
        o.tags.includes(vehicle) ||
        o.tags.includes("none")) &&
      (interest === "all" || o.tags.includes(interest)) &&
      (employees === "all" ||
        (employees === "yes"
          ? o.tags.includes("Employees") || o.tags.includes("Facility")
          : !o.tags.includes("Employees"))) &&
      (facility === "all" ||
        (facility === "yes"
          ? o.tags.includes("Facility")
          : !o.tags.includes("Facility"))) &&
      (experience === "all" ||
        experience === "learning" ||
        o.complexity !== "Low") &&
      (b2b === "all" || b2b === "yes" || o.id === "delivery-driver") &&
      (capital === "all" ||
        (capital === "lean"
          ? o.capital.startsWith("Low")
          : o.capital.includes("High") || o.capital === "Variable")) &&
      (responsibility === "all" ||
        (responsibility === "hands-on"
          ? o.tags.includes("Driving")
          : o.complexity === "High")),
  );
  return (
    <div className="page-container">
      <PageHead
        eyebrow="Business opportunity explorer"
        title="Find your lane."
        description="Compare responsibilities, resources and business models. There’s no universal best opportunity—there are tradeoffs worth understanding."
      />
      <div className="filters">
        {[
          [
            "Vehicle access",
            vehicle,
            setVehicle,
            [
              ["all", "Explore all"],
              ["personal", "Personal vehicle"],
              ["van", "Van"],
              ["truck", "Truck"],
              ["none", "No vehicle"],
            ],
          ],
          [
            "Your interest",
            interest,
            setInterest,
            [
              ["all", "All interests"],
              ["Driving", "I want to drive"],
              ["Desk", "Coordination / technology"],
              ["Facility", "Facility operations"],
              ["Employees", "Manage a team"],
            ],
          ],
          [
            "Employees",
            employees,
            setEmployees,
            [
              ["all", "Open to either"],
              ["yes", "Interested in a team"],
              ["no", "Start without a team"],
            ],
          ],
          [
            "Facility access",
            facility,
            setFacility,
            [
              ["all", "Explore both"],
              ["yes", "Facility-based models"],
              ["no", "Without a facility"],
            ],
          ],
          [
            "Business experience",
            experience,
            setExperience,
            [
              ["all", "Any experience"],
              ["learning", "Learning from the start"],
              ["experienced", "Explore operational responsibility"],
            ],
          ],
          [
            "Starting resources",
            capital,
            setCapital,
            [
              ["all", "Compare all capital profiles"],
              ["lean", "Explore lower capital models"],
              ["growth", "Explore capital / facility commitments"],
            ],
          ],
          [
            "Responsibility",
            responsibility,
            setResponsibility,
            [
              ["all", "Compare responsibility levels"],
              ["hands-on", "Hands-on delivery"],
              ["systems", "Manage operating systems"],
            ],
          ],
          [
            "B2B customers",
            b2b,
            setB2b,
            [
              ["all", "Explore either"],
              ["yes", "Business customers"],
              ["no", "Start with delivery labor"],
            ],
          ],
        ].map(([label, value, setter, options]) => (
          <label key={String(label)}>
            {String(label)}
            <select
              value={String(value)}
              onChange={(e) => (setter as (v: string) => void)(e.target.value)}
            >
              {(options as string[][]).map(([v, t]) => (
                <option value={v} key={v}>
                  {t}
                </option>
              ))}
            </select>
          </label>
        ))}
      </div>
      <p role="status" className="small">
        {filtered.length} pathways shown. Filters describe models, not
        eligibility or personalized recommendations.
      </p>
      <Link className="text-link" to="/opportunities/compare">
        Compare opportunities side by side <ArrowUpRight size={16} />
      </Link>
      <div className="opportunity-grid">
        {filtered.map((o, i) => (
          <Link
            className="opportunity-card"
            to={`/opportunities/${o.id}`}
            key={o.id}
          >
            <div className="opportunity-top">
              <span>{String(i + 1).padStart(2, "0")}</span>
              <ArrowUpRight size={22} />
            </div>
            <p className="eyebrow">{o.stage}</p>
            <h2>{o.title}</h2>
            <p>{o.tagline}</p>
            <div className="opportunity-dimensions">
              <span>
                Capital <strong>{o.capital}</strong>
              </span>
              <span>
                Operations <strong>{o.complexity}</strong>
              </span>
            </div>
          </Link>
        ))}
      </div>
      {!filtered.length && (
        <div className="empty-state">
          <h2>No pathways match that combination.</h2>
          <p>
            Broaden one filter to compare adjacent models. This is not an
            eligibility decision.
          </p>
          <button
            className="button"
            onClick={() => {
              setVehicle("all");
              setInterest("all");
              setEmployees("all");
              setFacility("all");
              setExperience("all");
              setB2b("all");
              setCapital("all");
              setResponsibility("all");
            }}
          >
            Reset filters
          </button>
        </div>
      )}
      <ActionCenter ids={["sba", "startup", "tour", "atlanta-operators"]} />
    </div>
  );
}
function Detail({ id }: { id: string }) {
  const o = opportunities.find((x) => x.id === id);
  if (!o)
    return (
      <div className="page-container">
        <PageHead
          eyebrow="Not found"
          title="That opportunity isn’t here."
          description="Return to the explorer to choose a business model."
        />
        <ButtonLink to="/opportunities">Explore opportunities</ButtonLink>
      </div>
    );
  const facility = o.tags.includes("Facility");
  return (
    <div className="page-container">
      <PageHead
        eyebrow={`${o.stage} · Business model`}
        title={o.title}
        description={o.tagline}
      />
      <Badge kind="example">Industry model · specific agreements vary</Badge>
      <Flow
        steps={
          facility
            ? [
                "Client goods",
                "Receiving",
                "Your operation",
                "Outbound handoff",
              ]
            : [
                "Client need",
                "Service agreement",
                "Your operation",
                "Verified handoff",
              ]
        }
      />
      <div className="editorial-layout">
        <article>
          <section>
            <h2>What this business actually does</h2>
            <p>
              {o.selling}. It fits in the {o.stage.toLowerCase()} part of the
              system. Your service agreement determines the scope and custody
              you accept.
            </p>
          </section>
          <div className="detail-grid">
            {[
              [
                "Who are your customers? Who pays you?",
                o.customers +
                  ". Confirm the contracting party and its payment terms before accepting work.",
              ],
              ["What are you selling?", o.selling],
              ["How is revenue generated?", o.pricing],
              ["Major expenses", o.expenses],
              ["Equipment you need", o.equipment],
              ["Vehicles that might work", o.vehicles],
            ].map(([t, p]) => (
              <section key={t}>
                <h3>{t}</h3>
                <p>
                  <TermText text={p} />
                </p>
              </section>
            ))}
          </div>
          <section>
            <h2>Insurance and operating requirements</h2>
            <p>
              {facility
                ? "Verify permitted use, occupancy, fire requirements, workplace safety and inventory-custody coverage with the responsible local authorities and a broker."
                : "Describe cargo, geography, vehicle ratings, for-hire activity and service scope to the relevant agencies and insurer. USDOT safety registration, operating authority and state requirements are separate questions."}{" "}
              Contract coverage can exceed legal minimums. This page does not
              decide your legal requirements.
            </p>
            <p>
              {o.id === "dispatcher"
                ? "If you arrange transport, investigate the boundary between a carrier’s dispatch service and regulated brokerage before selling that service."
                : ""}
            </p>
          </section>
          <section>
            <h2>What does it cost to start?</h2>
            <p>
              No universal startup number is reliable. Build a quote-based
              budget around your exact service.
            </p>
            <div className="tier-grid">
              {[
                [
                  "Lean start",
                  "Validate one scoped service. Use existing eligible resources only after written approval and coverage review. Budget setup costs and cash before first payment.",
                ],
                [
                  "Small professional operation",
                  "Add documented procedures, bookkeeping, appropriate insurance, dependable equipment and backup capacity. Price owner labor.",
                ],
                [
                  "Growth operation",
                  "Add staffing, supervision, systems and equipment only as demand supports it. Budget working capital, idle capacity and contingencies.",
                ],
              ].map(([t, p]) => (
                <div key={t}>
                  <h3>{t}</h3>
                  <p>{p}</p>
                  <strong>Get actual quotes →</strong>
                </div>
              ))}
            </div>
          </section>
          <section>
            <h2>Start small. Find your first customer.</h2>
            <p>{o.firstCustomer}</p>
            <p>
              Ask who handles vendor procurement, what qualifications they
              require, how work is assigned and whether volume is guaranteed.
              Present a precise service area, capacity and reporting process.
              Compare a pilot’s economics before scaling.
            </p>
          </section>
          <section>
            <h2>A day in the operation</h2>
            <Flow
              steps={
                facility
                  ? [
                      "Confirm arrivals",
                      "Receive & reconcile",
                      "Process client work",
                      "Handoff & close",
                    ]
                  : o.tags.includes("Desk")
                    ? [
                        "Review demand",
                        "Coordinate work",
                        "Resolve exceptions",
                        "Report service",
                      ]
                    : [
                        "Check assignment",
                        "Inspect & load",
                        "Complete service",
                        "Return & reconcile",
                      ]
              }
            />
            <p>
              Administrative work continues after the physical work: invoice
              correctly, reconcile deductions, maintain records and plan the
              next service period.
            </p>
          </section>
          <section>
            <h2>Risks, mistakes and what could go wrong</h2>
            <p>
              {o.risks}. Common mistakes include buying capacity before demand
              is validated, ignoring unpaid work and accepting terms you do not
              understand.
            </p>
            <p>
              Build a response for client loss, equipment failure, delayed
              payment and service errors. Define incident escalation and
              maintain a cash reserve based on your actual obligations.
            </p>
          </section>
          <section>
            <h2>How to scale</h2>
            <p>
              Prove reliable service and positive contribution for the current
              scope. Document the workflow, then add capacity with explicit
              demand evidence, training, quality checks and cash planning.
              Growth that reduces reliability can cost the customer
              relationship.
            </p>
            <h3>Skills to learn</h3>
            <p>
              Service costing, contract reading, customer discovery, safe
              operations, bookkeeping, communication, data handling and
              exception management.
            </p>
          </section>
        </article>
        <details className="go-deeper" open>
          <summary className="eyebrow">Go deeper</summary>
          <Link to="/journey">Follow the package</Link>
          <Link to={facility ? "/academy/warehouse" : "/academy/carrier"}>
            Study the operating pathway
          </Link>
          <Link to={facility ? "/tools/warehouse" : "/tools/route"}>
            Model the economics
          </Link>
          <Link to="/start/business-registration">
            Verify business formation
          </Link>
          <Link to="/resources/government">Official resources</Link>
        </details>
      </div>
      <ActionCenter
        ids={[...o.resources, "tour", "break-even"]}
        actions={[
          o.firstCustomer,
          "Obtain the written scope, qualification requirements and payment terms.",
          "Collect equipment and coverage quotes, then run a downside scenario.",
        ]}
      />
    </div>
  );
}
function Compare() {
  const [selected, setSelected] = useState([
    "owner-operator",
    "last-mile-carrier",
    "warehouse-operator",
  ]);
  const chosen = opportunities.filter((o) => selected.includes(o.id));
  return (
    <div className="page-container">
      <PageHead
        eyebrow="Business comparison"
        title="Different models. Different responsibilities."
        description="Select up to four models. These qualitative dimensions describe a service scope—not a ranking, startup quote or eligibility decision."
      />
      <fieldset className="compare-choices">
        <legend>Choose models to compare</legend>
        {opportunities.map((o) => (
          <label key={o.id}>
            <input
              type="checkbox"
              checked={selected.includes(o.id)}
              disabled={!selected.includes(o.id) && selected.length >= 4}
              onChange={() =>
                setSelected((prev) =>
                  prev.includes(o.id)
                    ? prev.filter((v) => v !== o.id)
                    : [...prev, o.id],
                )
              }
            />
            {o.title}
          </label>
        ))}
      </fieldset>
      {chosen.length ? (
        <div
          className="table-scroll"
          tabIndex={0}
          aria-label="Scrollable comparison table"
        >
          <table>
            <caption>Business model tradeoffs</caption>
            <thead>
              <tr>
                <th scope="col">Dimension</th>
                {chosen.map((o) => (
                  <th scope="col" key={o.id}>
                    <Link to={`/opportunities/${o.id}`}>{o.title}</Link>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ["Capital intensity", "capital"],
                ["Startup complexity (qualitative)", "complexity"],
                ["Operational complexity", "complexity"],
                ["Responsibility", "responsibility"],
                ["Customer type", "customers"],
                ["Revenue model", "pricing"],
                ["Major costs", "expenses"],
                ["Equipment / facility dependence", "equipment"],
                ["Vehicle dependence", "vehicles"],
                ["Major risks", "risks"],
                ["First customer", "firstCustomer"],
                ["Staffing needs", "staffing"],
                ["Scaling model", "scaling"],
              ].map(([label, key]) => (
                <tr key={key}>
                  <th scope="row">{label}</th>
                  {chosen.map((o) => (
                    <td key={o.id}>{o[key as keyof typeof o]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="empty-state">Select at least one business model.</p>
      )}
      <ActionCenter ids={["startup", "sba", "break-even", "tour"]} />
    </div>
  );
}
