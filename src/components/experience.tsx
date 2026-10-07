import { useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BookOpen,
  Boxes,
  Building2,
  Check,
  ChevronLeft,
  CircleDollarSign,
  Package,
  Route,
  ScanLine,
  Store,
  Truck,
  Undo2,
  Users,
  Warehouse,
} from "lucide-react";
import { ButtonLink } from "./ui";

export const systemChapters = [
  { title: "Order", caption: "The promise is recorded.", icon: Store },
  { title: "Fulfillment", caption: "The item becomes an order.", icon: Boxes },
  {
    title: "Sortation",
    caption: "The package finds its lane.",
    icon: ScanLine,
  },
  {
    title: "Middle mile",
    caption: "Networks move it between facilities.",
    icon: Truck,
  },
  {
    title: "Last mile",
    caption: "A carrier accepts the final handoff.",
    icon: Route,
  },
  { title: "Returns", caption: "The system may run in reverse.", icon: Undo2 },
];

export function SystemStoryRail({ compact = false }: { compact?: boolean }) {
  return (
    <ol className={`system-story-rail ${compact ? "compact" : ""}`}>
      {systemChapters.map(({ title, caption, icon: Icon }, index) => (
        <li key={title} style={{ "--step": index } as React.CSSProperties}>
          <span className="story-node" aria-hidden="true">
            <Icon size={compact ? 18 : 24} />
          </span>
          <span>
            <strong>{title}</strong>
            {!compact && <small>{caption}</small>}
          </span>
          {index < systemChapters.length - 1 && (
            <ArrowRight className="story-arrow" size={18} aria-hidden="true" />
          )}
        </li>
      ))}
    </ol>
  );
}

export function StoryScene({
  number,
  eyebrow,
  title,
  body,
  children,
  tone = "light",
}: {
  number: string;
  eyebrow: string;
  title: ReactNode;
  body?: ReactNode;
  children?: ReactNode;
  tone?: "light" | "dark" | "lime";
}) {
  return (
    <section className={`story-scene ${tone}`}>
      <div className="story-scene-index" aria-hidden="true">
        {number}
      </div>
      <div className="story-scene-copy">
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
        {body && <div className="story-scene-body">{body}</div>}
      </div>
      {children && <div className="story-scene-media">{children}</div>}
    </section>
  );
}

export function RevealTabs({
  label,
  items,
  initial = 0,
}: {
  label: string;
  items: { label: string; content: ReactNode; icon?: ReactNode }[];
  initial?: number;
}) {
  const [active, setActive] = useState(initial);
  return (
    <div className="reveal-tabs">
      <div className="reveal-tablist" role="tablist" aria-label={label}>
        {items.map((item, index) => (
          <button
            key={item.label}
            type="button"
            role="tab"
            aria-selected={active === index}
            aria-controls={`${label.replaceAll(" ", "-")}-panel-${index}`}
            id={`${label.replaceAll(" ", "-")}-tab-${index}`}
            onClick={() => setActive(index)}
          >
            {item.icon}
            {item.label}
          </button>
        ))}
      </div>
      <div
        className="reveal-panel"
        role="tabpanel"
        id={`${label.replaceAll(" ", "-")}-panel-${active}`}
        aria-labelledby={`${label.replaceAll(" ", "-")}-tab-${active}`}
      >
        <p className="eyebrow">{items[active].label}</p>
        {items[active].content}
      </div>
    </div>
  );
}

export const carrierStages = [
  {
    title: "Driver",
    signal: "Learn the work",
    change: "You complete assigned deliveries and learn the service standard.",
    risk: "Safety, pay terms, personally borne expenses and performance records.",
    skill: "Scanning, loading, route execution and proof of delivery.",
    action: "Document what a complete, profitable route day actually requires.",
    to: "/academy/carrier/carrier-01",
  },
  {
    title: "Owner-operator",
    signal: "Own the equipment risk",
    change:
      "You provide approved capacity and carry business expenses yourself.",
    risk: "Downtime, insurance, maintenance and rates that ignore unpaid work.",
    skill: "Costing miles, time, stops and vehicle capacity.",
    action:
      "Get written requirements before acquiring or committing a vehicle.",
    to: "/opportunities/owner-operator",
  },
  {
    title: "First route",
    signal: "Prove the model",
    change: "A repeatable service assignment becomes your operating unit.",
    risk: "Volume swings, deductions, returns and customer concentration.",
    skill: "Route economics, reconciliation and exception planning.",
    action: "Model a normal day and a disruption day before accepting work.",
    to: "/academy/carrier/carrier-21",
  },
  {
    title: "Business owner",
    signal: "Build the system",
    change:
      "Your job expands from delivery into compliance, records and client service.",
    risk: "Weak contracts, missing cash reserves and undocumented operations.",
    skill:
      "Bookkeeping, contract review, insurance and customer communication.",
    action: "Build a carrier packet and operating checklist.",
    to: "/academy/carrier/carrier-11",
  },
  {
    title: "First driver",
    signal: "Lead someone else",
    change:
      "Training, lawful classification, supervision and backup become essential.",
    risk: "Payroll pressure, inconsistent service and inadequate coverage.",
    skill: "Hiring, coaching, dispatch and quality control.",
    action: "Price the fully loaded driver cost—not wages alone.",
    to: "/academy/carrier/carrier-22",
  },
  {
    title: "Multiple routes",
    signal: "Control complexity",
    change: "Several vehicles and people must perform as one operation.",
    risk: "Simultaneous failures, idle capacity and thin contribution.",
    skill: "Capacity planning, escalation and daily operating dashboards.",
    action: "Standardize the workflow before adding the next route.",
    to: "/academy/carrier/carrier-24",
  },
  {
    title: "Carrier",
    signal: "Own the service promise",
    change: "The client buys accountable delivery capacity from your company.",
    risk: "Claims, compliance, payment timing and dependence on a large client.",
    skill: "Contract management, reporting and resilient operations.",
    action:
      "Verify procurement, insurance and operating requirements directly.",
    to: "/opportunities/last-mile-carrier",
  },
  {
    title: "Fleet",
    signal: "Allocate capital",
    change:
      "Vehicles, maintenance and staffing become a portfolio of capacity.",
    risk: "Debt, idle equipment and hiring gaps.",
    skill: "Fleet economics, preventive maintenance and utilization.",
    action: "Add equipment only against credible demand and downside reserves.",
    to: "/opportunities/fleet-operator",
  },
  {
    title: "Direct clients",
    signal: "Win the relationship",
    change:
      "You sell and manage the service without relying only on route intermediaries.",
    risk: "Long sales cycles, custom requirements and concentration.",
    skill: "Customer discovery, pricing, proposals and account management.",
    action: "Define one precise service you can deliver exceptionally well.",
    to: "/academy/carrier/carrier-26",
  },
];

export function CarrierPathway({ heading = true }: { heading?: boolean }) {
  const [active, setActive] = useState(0);
  const stage = carrierStages[active];
  return (
    <section className="pathway-experience">
      {heading && (
        <div className="section-heading">
          <div>
            <p className="eyebrow">See the path forward</p>
            <h2>From completing routes to building the company.</h2>
          </div>
          <p className="pathway-note">There is no single required path.</p>
        </div>
      )}
      <div
        className="pathway-stage-rail"
        role="tablist"
        aria-label="Carrier growth stages"
      >
        {carrierStages.map((item, index) => (
          <button
            key={item.title}
            role="tab"
            aria-selected={active === index}
            aria-controls="carrier-stage-panel"
            onClick={() => setActive(index)}
          >
            <span>{String(index + 1).padStart(2, "0")}</span>
            {item.title}
          </button>
        ))}
      </div>
      <div
        className="pathway-stage-panel"
        id="carrier-stage-panel"
        role="tabpanel"
      >
        <div className="pathway-stage-title">
          <span>{String(active + 1).padStart(2, "0")}</span>
          <div>
            <p className="eyebrow">{stage.signal}</p>
            <h3>{stage.title}</h3>
          </div>
        </div>
        <div className="pathway-stage-facts">
          <div>
            <small>What changes</small>
            <p>{stage.change}</p>
          </div>
          <div>
            <small>What can go wrong</small>
            <p>{stage.risk}</p>
          </div>
          <div>
            <small>Skill to build</small>
            <p>{stage.skill}</p>
          </div>
        </div>
        <div className="pathway-next-action">
          <Check size={20} aria-hidden="true" />
          <span>
            <small>Next move</small>
            {stage.action}
          </span>
          <Link to={stage.to}>
            Go deeper <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}

export function WarehouseCompare() {
  return (
    <section
      className="process-compare"
      aria-labelledby="warehouse-compare-title"
    >
      <div className="section-heading">
        <div>
          <p className="eyebrow">See the difference first</p>
          <h2 id="warehouse-compare-title">
            Storage and fulfillment are not the same service.
          </h2>
        </div>
      </div>
      <div className="process-compare-grid">
        <article>
          <Warehouse size={36} aria-hidden="true" />
          <h3>Warehouse</h3>
          <p>Protect inventory and make it locatable.</p>
          <ol>
            {[
              "Inventory arrives",
              "Stored",
              "Located",
              "Moved",
              "Leaves facility",
            ].map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
        </article>
        <article className="accent">
          <Package size={36} aria-hidden="true" />
          <h3>Fulfillment center</h3>
          <p>Turn a customer order into a shipment.</p>
          <ol>
            {[
              "Order received",
              "Item located",
              "Picked",
              "Packed",
              "Labeled",
              "Shipped",
            ].map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
        </article>
      </div>
    </section>
  );
}

export function BookOffer() {
  return (
    <section className="book-offer" aria-labelledby="book-offer-title">
      <div className="book-mock" aria-hidden="true">
        <span>EMPOWERED</span>
        <Package size={48} />
        <strong>
          THE NEXT
          <br />
          CHAPTER
        </strong>
        <small>Book details coming later</small>
      </div>
      <div>
        <p className="eyebrow">You’ve seen how the system works</p>
        <h2 id="book-offer-title">Now go deeper—when the book is ready.</h2>
        <p>
          A future practical guide will connect the system, the economics and
          the operating path in one place. No title, price or retailer has been
          announced.
        </p>
        <div className="book-actions">
          <button
            className="button"
            type="button"
            disabled
            aria-describedby="book-status"
          >
            <BookOpen size={18} /> Buy the book
          </button>
          <span id="book-status" className="small">
            Purchase link coming after publication details are confirmed.
          </span>
        </div>
        <div className="book-next-links">
          <ButtonLink to="/academy/carrier">
            Start your carrier journey
          </ButtonLink>
          <ButtonLink to="/journey" secondary>
            Keep exploring
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}

export function OwnershipMoment() {
  return (
    <div className="ownership-moment">
      <div>
        <Users size={24} />
        <span>Someone does the work.</span>
      </div>
      <ArrowRight aria-hidden="true" />
      <div>
        <Building2 size={24} />
        <span>A business owns the promise.</span>
      </div>
      <ArrowRight aria-hidden="true" />
      <div>
        <CircleDollarSign size={24} />
        <span>The numbers decide if it lasts.</span>
      </div>
    </div>
  );
}

export function StepControls({
  index,
  count,
  onPrevious,
  onNext,
  previousLabel = "Previous",
  nextLabel = "Next",
}: {
  index: number;
  count: number;
  onPrevious: () => void;
  onNext: () => void;
  previousLabel?: string;
  nextLabel?: string;
}) {
  return (
    <div className="experience-controls">
      <button
        className="button secondary"
        disabled={index === 0}
        onClick={onPrevious}
      >
        <ChevronLeft size={17} /> {previousLabel}
      </button>
      <span>
        {index + 1} of {count}
      </span>
      <button
        className="button"
        disabled={index === count - 1}
        onClick={onNext}
      >
        {nextLabel} <ArrowRight size={17} />
      </button>
    </div>
  );
}
