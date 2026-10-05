import { Link } from "react-router-dom";
import {
  ArrowRight,
  Package,
  Truck,
  Warehouse,
  ScanLine,
  RotateCcw,
  ArrowUpRight,
} from "lucide-react";
import { ButtonLink, Badge, ActionCenter } from "../components/ui";
import { parcelStat, resources } from "../data";
export default function Home() {
  const source = resources.find((r) => r.id === parcelStat.sourceId)!;
  return (
    <>
      <section className="home-hero">
        <div className="hero-copy">
          <p className="eyebrow">
            <span className="live-dot" /> An industry hiding in plain sight
          </p>
          <h1>
            Every order
            <br />
            creates
            <br />
            <em>opportunity.</em>
          </h1>
          <p className="lead">
            Someone clicks BUY NOW.
            <br />
            An entire world of businesses gets to work.
          </p>
          <p className="hero-support">
            Learn the system. Find your lane.
            <br />
            Build your business.
          </p>
          <div className="hero-ctas">
            <ButtonLink to="/opportunities">Explore the business</ButtonLink>
            <Link className="text-link" to="/journey">
              Follow a package <ArrowRight size={17} />
            </Link>
          </div>
          <Link className="text-link carrier-cta" to="/academy/carrier">
            Start your carrier journey <ArrowUpRight size={17} />
          </Link>
          <div className="hero-footnote">
            From the first order to the final mile. And back again.
          </div>
        </div>
        <div className="hero-image">
          <img
            src="/warehouse.jpg"
            width="1600"
            height="1067"
            alt="Warehouse inventory arranged across racks and handling lanes"
            fetchPriority="high"
          />
          <div className="image-caption">
            <span>01 / THE SYSTEM</span>
            <strong>
              Behind every delivery,
              <br />
              there’s a business.
            </strong>
            <Link to="/journey" aria-label="Explore the package journey">
              <ArrowUpRight size={25} />
            </Link>
          </div>
          <div className="package-label">
            <Package size={22} />
            <span>
              ORDER CONFIRMED<strong>Next: opportunity.</strong>
            </span>
            <div className="barcode" aria-hidden="true" />
          </div>
        </div>
      </section>
      <section className="scale-section">
        <div>
          <p className="eyebrow">
            The scale of the movement · {parcelStat.year} U.S. parcels
          </p>
          <h2>
            <span>
              <a
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View source for 23.1 billion U.S. parcels in 2025"
              >
                23.1 billion
              </a>
            </span>{" "}
            packages.
            <br />
            Every one of them had to move.
          </h2>
          <a
            className="source-link"
            href={source.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            Verified industry data · Pitney Bowes · 2026 report{" "}
            <ArrowUpRight size={14} />
          </a>
        </div>
        <div className="scale-figures">
          <div>
            <strong>
              <a
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View annual source for the calculated daily average"
              >
                {(parcelStat.day / 1e6).toFixed(1)}M
              </a>
            </strong>
            <span>per average day</span>
          </div>
          <div>
            <strong>
              <a
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View annual source for the calculated per-second average"
              >
                {Math.round(parcelStat.second)}
              </a>
            </strong>
            <span>per average second</span>
          </div>
          <p>
            Calculated from the annual total using 365 days. These are averages,
            not live counts or available contracts.
          </p>
        </div>
      </section>
      <section className="system-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">What happens after BUY NOW?</p>
            <h2>
              Follow the package.
              <br />
              Discover the businesses.
            </h2>
          </div>
          <Link to="/journey">
            Explore all 17 stages <ArrowUpRight size={16} />
          </Link>
        </div>
        <div className="system-grid">
          {[
            [Package, "01", "Order", "Someone receives it."],
            [Warehouse, "02", "Fulfillment", "Someone picks and packs it."],
            [ScanLine, "03", "Sortation", "Someone groups it."],
            [Truck, "04", "Transport", "Someone moves it."],
            [Package, "05", "Delivery", "Someone completes the handoff."],
            [RotateCcw, "06", "Returns", "Someone recovers its value."],
          ].map(([Icon, n, title, body]) => {
            const I = Icon as typeof Package;
            return (
              <Link to="/journey" key={String(n)}>
                <div>
                  <I size={27} />
                  <span>{String(n)}</span>
                </div>
                <h3>{String(title)}</h3>
                <p>{String(body)}</p>
              </Link>
            );
          })}
        </div>
        <p className="big-statement">
          Those aren’t just steps.
          <br />
          <em>They’re businesses.</em>
        </p>
      </section>
      <section className="entry-section">
        <div>
          <p className="eyebrow">
            From doing the work to building the operation
          </p>
          <h2>
            You don’t need a fleet
            <br />
            to learn the business.
          </h2>
          <p>
            Start by understanding the handoffs, the costs and the requirements.
            Explore what fits your resources—and what you need to verify.
          </p>
          <ButtonLink to="/start/start-small">
            Start with what you have
          </ButtonLink>
        </div>
        <div className="entry-lanes">
          {[
            [
              "01",
              "Drive",
              "Understand personal-vehicle and owner-operator pathways.",
              "/vehicles",
            ],
            [
              "02",
              "Operate",
              "Learn how a carrier receives and manages route work.",
              "/academy/carrier",
            ],
            [
              "03",
              "Build",
              "Explore warehouses, fulfillment and logistics services.",
              "/academy/warehouse",
            ],
          ].map(([n, t, d, to]) => (
            <Link key={n} to={to}>
              <span>{n}</span>
              <div>
                <h3>{t}</h3>
                <p>{d}</p>
              </div>
              <ArrowUpRight size={21} />
            </Link>
          ))}
        </div>
      </section>
      <section className="model-banner">
        <Badge>Educational models · your assumptions</Badge>
        <h2>
          Know the numbers.
          <br />
          Before you make the move.
        </h2>
        <p>
          Revenue is the beginning of the conversation.
          <br />
          Model costs, operating income, margin and break-even.
        </p>
        <div>
          <ButtonLink to="/tools/route">Model a route</ButtonLink>
          <ButtonLink to="/proposal" secondary>
            Explore the partner proposal
          </ButtonLink>
        </div>
      </section>
      <ActionCenter
        ids={["parcel", "sba", "tour", "atlanta-operators", "break-even"]}
      />
    </>
  );
}
