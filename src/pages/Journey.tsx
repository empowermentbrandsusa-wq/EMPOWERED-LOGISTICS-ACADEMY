import { useState } from "react";
import { Link } from "react-router-dom";
import { Package, ArrowLeft, ArrowRight } from "lucide-react";
import { journey, opportunities } from "../data";
import { useLocalList } from "../lib/storage";
import { PageHead, Badge, ActionCenter, TermText } from "../components/ui";
export default function Journey() {
  const [index, setIndex] = useState(0);
  const s = journey[index];
  const store = useLocalList("ela-fundamentals");
  return (
    <div className="page-container">
      <PageHead
        eyebrow="The package journey"
        title="What happens after BUY NOW?"
        description="One fictional sneaker order. Seventeen handoffs. Discover what moves, who does the work and where a business fits."
      />
      <Badge>Educational scenario · networks and contracts vary</Badge>
      <div className="journey-layout">
        <aside className="stage-list" aria-label="Journey stages">
          <ol>
            {journey.map((step, i) => (
              <li key={step.id}>
                <button
                  aria-current={i === index ? "step" : undefined}
                  onClick={() => setIndex(i)}
                >
                  <span>{String(i + 1).padStart(2, "0")}</span>
                  {step.title}
                </button>
              </li>
            ))}
          </ol>
        </aside>
        <section className="journey-detail" aria-live="polite">
          <div className="journey-visual">
            <div className="tracking-number">FICTIONAL ORDER ELA–001</div>
            <Package size={80} strokeWidth={1} />
            <span className="journey-count">
              {String(index + 1).padStart(2, "0")} / 17
            </span>
            <div className="journey-progress">
              <div style={{ width: `${((index + 1) / 17) * 100}%` }} />
            </div>
          </div>
          <p className="eyebrow">Stage {index + 1}</p>
          <h2>{s.title}</h2>
          <div className="detail-grid">
            {[
              ["What just happened", s.what],
              ["Who did it", s.who],
              [
                "What company does this",
                index < 3
                  ? "A retailer, its internal operations or an outsourced logistics/software provider."
                  : opportunities.find((o) => o.id === s.opportunity)?.title +
                    " or an integrated logistics network, depending on the agreement.",
              ],
              ["Who pays that company", s.payer],
              ["How money is earned", s.revenue],
              ["What it costs to operate", s.cost],
              ["How you could enter", s.entry],
            ].map(([title, text]) => (
              <div key={title}>
                <h3>{title}</h3>
                <p>
                  <TermText text={text} />
                </p>
              </div>
            ))}
          </div>
          <Link className="text-link" to={`/opportunities/${s.opportunity}`}>
            Explore the {s.opportunity.replace(/-/g, " ")} business{" "}
            <ArrowRight size={18} />
          </Link>
          <button
            className="button secondary"
            aria-pressed={store.items.includes(s.id)}
            onClick={() => store.toggle(s.id)}
          >
            {store.items.includes(s.id)
              ? "Stage complete — undo"
              : "Mark stage understood"}
          </button>
          <div className="lesson-nav">
            <button
              className="button secondary"
              disabled={index === 0}
              onClick={() => setIndex((i) => i - 1)}
            >
              <ArrowLeft size={16} />
              Previous stage
            </button>
            <button
              className="button"
              disabled={index === journey.length - 1}
              onClick={() => setIndex((i) => i + 1)}
            >
              Next stage <ArrowRight size={16} />
            </button>
          </div>
        </section>
      </div>
      <ActionCenter
        ids={["definitions", "tour", "warehouse-story", "reverse", "dot"]}
        actions={[
          "Sketch who has custody of the parcel at each handoff.",
          "Choose one stage and explore its business model.",
          "Identify the customer and pricing unit before modeling costs.",
        ]}
      />
    </div>
  );
}
