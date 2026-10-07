import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Building2,
  CircleDollarSign,
  Gauge,
  Package,
  ShieldAlert,
  Sparkles,
  UserRound,
} from "lucide-react";
import { journey, opportunities } from "../data";
import { useLocalList } from "../lib/storage";
import { ActionCenter, Badge, ButtonLink, TermText } from "../components/ui";
import {
  RevealTabs,
  StepControls,
  SystemStoryRail,
} from "../components/experience";

const chapterStops = [0, 3, 8, 10, 12, 16];

export default function Journey() {
  const [index, setIndex] = useState(0);
  const selectedButton = useRef<HTMLButtonElement>(null);
  const stage = journey[index];
  const store = useLocalList("ela-fundamentals");
  const opportunity = opportunities.find(
    (item) => item.id === stage.opportunity,
  );

  useEffect(() => {
    selectedButton.current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }, [index]);

  const selectStage = (next: number) =>
    setIndex(Math.max(0, Math.min(journey.length - 1, next)));
  return (
    <div className="journey-page">
      <header className="journey-hero">
        <p className="eyebrow">
          A fictional sneaker order · 17 real kinds of handoff
        </p>
        <h1>
          What happens after
          <br />
          <span>BUY NOW?</span>
        </h1>
        <p>
          Keep your eye on the package. Tap a stage. Reveal only the layer you
          want.
        </p>
        <Badge>Educational scenario · networks and contracts vary</Badge>
        <SystemStoryRail compact />
      </header>

      <section
        className="journey-experience"
        aria-labelledby="current-stage-title"
      >
        <div className="journey-map" aria-label="All 17 package stages">
          <p className="rail-hint">
            Swipe or scroll to inspect all 17 stages →
          </p>
          <div className="journey-map-line" aria-hidden="true">
            <span
              style={{ width: `${(index / (journey.length - 1)) * 100}%` }}
            />
            <div
              className="journey-map-package"
              style={{ left: `${(index / (journey.length - 1)) * 100}%` }}
            >
              <Package size={24} />
            </div>
          </div>
          <ol>
            {journey.map((step, position) => (
              <li key={step.id}>
                <button
                  ref={position === index ? selectedButton : undefined}
                  type="button"
                  aria-current={position === index ? "step" : undefined}
                  onClick={() => selectStage(position)}
                >
                  <span>{String(position + 1).padStart(2, "0")}</span>
                  <strong>{step.title}</strong>
                  {chapterStops.includes(position) && (
                    <small>Chapter {chapterStops.indexOf(position) + 1}</small>
                  )}
                </button>
              </li>
            ))}
          </ol>
        </div>

        <div className="journey-stage" aria-live="polite">
          <div className="journey-stage-visual">
            <div>
              <p className="eyebrow">
                Stage {index + 1} of {journey.length}
              </p>
              <h2 id="current-stage-title">{stage.title}</h2>
              <p className="stage-hook">
                <TermText text={stage.what} />
              </p>
            </div>
            <div className={`stage-orbit stage-${index}`} aria-hidden="true">
              <span className="orbit-ring" />
              <Package size={72} strokeWidth={1.15} />
              <small>ELA–001</small>
            </div>
          </div>

          <div className="stage-question">What do you want to know?</div>
          <RevealTabs
            key={stage.id}
            label={`Stage ${index + 1} details`}
            items={[
              {
                label: "Who does the work?",
                icon: <UserRound size={18} />,
                content: (
                  <>
                    <h3>{stage.who}</h3>
                    <p>
                      {index < 3
                        ? "The retailer, its internal operations or an outsourced logistics/software provider may perform this work."
                        : `${opportunity?.title || "A logistics operator"} or an integrated logistics network may perform it, depending on the agreement.`}
                    </p>
                  </>
                ),
              },
              {
                label: "Who pays whom?",
                icon: <CircleDollarSign size={18} />,
                content: (
                  <>
                    <h3>Payment follows the agreement.</h3>
                    <p>
                      <TermText text={stage.payer} />
                    </p>
                  </>
                ),
              },
              {
                label: "How money is made",
                icon: <Building2 size={18} />,
                content: (
                  <>
                    <h3>What the business sells</h3>
                    <p>
                      <TermText text={stage.revenue} />
                    </p>
                    <Link
                      className="text-link"
                      to={`/opportunities/${stage.opportunity}`}
                    >
                      Explore this business model <ArrowRight size={17} />
                    </Link>
                  </>
                ),
              },
              {
                label: "Major costs",
                icon: <Gauge size={18} />,
                content: (
                  <>
                    <h3>Revenue must cover the operation.</h3>
                    <p>
                      <TermText text={stage.cost} />
                    </p>
                  </>
                ),
              },
              {
                label: "Opportunity",
                icon: <Sparkles size={18} />,
                content: (
                  <>
                    <h3>{opportunity?.title || "Business opportunity"}</h3>
                    <p>
                      <TermText text={stage.entry} />
                    </p>
                    <ButtonLink
                      to={`/opportunities/${stage.opportunity}`}
                      secondary
                    >
                      See the opportunity
                    </ButtonLink>
                  </>
                ),
              },
              {
                label: "Risks & next step",
                icon: <ShieldAlert size={18} />,
                content: (
                  <>
                    <h3>Start with verification.</h3>
                    <p>
                      {opportunity?.risks ||
                        "Custody, service quality and contract obligations create operating risk."}
                    </p>
                    <p>
                      <strong>Next:</strong> {stage.entry}
                    </p>
                  </>
                ),
              },
            ]}
          />

          <div className="stage-completion">
            <button
              className="button secondary"
              aria-pressed={store.items.includes(stage.id)}
              onClick={() => store.toggle(stage.id)}
            >
              {store.items.includes(stage.id)
                ? "Stage understood — undo"
                : "I understand this stage"}
            </button>
            <span>
              {store.items.length} of {journey.length} stages marked understood
            </span>
          </div>
          <StepControls
            index={index}
            count={journey.length}
            previousLabel="Previous stage"
            nextLabel="Next stage"
            onPrevious={() => selectStage(index - 1)}
            onNext={() => selectStage(index + 1)}
          />
        </div>
      </section>

      <section className="journey-finish">
        <p className="eyebrow">The lesson behind the journey</p>
        <h2>The package moved because businesses coordinated the handoffs.</h2>
        <p>
          Now follow the money through the same system—or explore the lane that
          caught your attention.
        </p>
        <div>
          <ButtonLink to="/money">Follow the money</ButtonLink>
          <ButtonLink to="/opportunities" secondary>
            Find your lane
          </ButtonLink>
        </div>
      </section>

      <div className="page-container">
        <ActionCenter
          ids={["definitions", "tour", "warehouse-story", "reverse", "dot"]}
          actions={[
            "Sketch who has custody at each handoff.",
            "Choose one stage and explore its business model.",
            "Identify the customer and pricing unit before modeling costs.",
          ]}
        />
      </div>
    </div>
  );
}
