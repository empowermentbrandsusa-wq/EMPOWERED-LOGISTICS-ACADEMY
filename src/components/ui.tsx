import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  Bookmark,
  Play,
  ExternalLink,
  ArrowRight,
} from "lucide-react";
import { useId, useState, type ReactNode } from "react";
import { resources, glossary } from "../data";
import type { Resource } from "../data";
import { useLocalList } from "../lib/storage";
export function ButtonLink({
  to,
  children,
  secondary = false,
}: {
  to: string;
  children: ReactNode;
  secondary?: boolean;
}) {
  return (
    <Link className={`button ${secondary ? "secondary" : ""}`} to={to}>
      {children}
      <ArrowUpRight size={17} />
    </Link>
  );
}
export function PageHead({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <header className="page-head">
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      <p className="lead">{description}</p>
    </header>
  );
}
export function Badge({
  children,
  kind = "model",
}: {
  children: ReactNode;
  kind?: string;
}) {
  return <span className={`badge ${kind}`}>{children}</span>;
}
export function TermText({ text }: { text: string }) {
  const componentId = useId();
  const terms = Object.keys(glossary).sort((a, b) => b.length - a.length);
  const pattern = new RegExp(
    `\\b(${terms.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})\\b`,
    "gi",
  );
  return (
    <>
      {text.split(pattern).map((p, i) => {
        const term = terms.find((t) => t.toLowerCase() === p.toLowerCase());
        return term ? (
          <GlossaryTerm
            key={i}
            text={p}
            definition={glossary[term]}
            id={`${componentId}-term-${i}`}
          />
        ) : (
          p
        );
      })}
    </>
  );
}
function GlossaryTerm({
  text,
  definition,
  id,
}: {
  text: string;
  definition: string;
  id: string;
}) {
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const visible = (hovered || focused) && !dismissed;
  return (
    <span
      className="term"
      onMouseEnter={() => {
        setHovered(true);
        setDismissed(false);
      }}
      onMouseLeave={() => setHovered(false)}
    >
      <button
        type="button"
        aria-label={`Define ${text}`}
        aria-describedby={visible ? id : undefined}
        onFocus={() => {
          setFocused(true);
          setDismissed(false);
        }}
        onBlur={() => setFocused(false)}
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            setDismissed(true);
            event.preventDefault();
          }
        }}
      >
        {text}
      </button>
      <span role="tooltip" id={id} hidden={!visible}>
        {definition}
      </span>
    </span>
  );
}
export function Flow({ steps }: { steps: string[] }) {
  return (
    <ol className="flow">
      {steps.map((s, i) => (
        <li key={s}>
          <span className="eyebrow">{String(i + 1).padStart(2, "0")}</span>
          <strong>{s}</strong>
          {i < steps.length - 1 && <ArrowRight size={18} aria-hidden="true" />}
        </li>
      ))}
    </ol>
  );
}
export function ResourceCard({
  resource: r,
  saved,
  onSave,
}: {
  resource: Resource;
  saved?: boolean;
  onSave?: (id: string) => void;
}) {
  return (
    <article
      className={`resource ${r.type === "Watch" ? "video-resource" : ""}`}
    >
      {r.type === "Watch" && (
        <div className="video-preview">
          <Play size={28} aria-hidden="true" />
          <span>Open intentional video tour</span>
        </div>
      )}
      <div className="resource-meta">
        <Badge
          kind={r.classification === "Government" ? "verified" : "example"}
        >
          {r.classification} · {r.type}
        </Badge>
        {onSave && (
          <button
            className={`icon-button ${saved ? "saved" : ""}`}
            onClick={() => onSave(r.id)}
            aria-label={`${saved ? "Unsave" : "Save"} ${r.title}`}
            aria-pressed={saved}
          >
            <Bookmark size={18} />
          </button>
        )}
      </div>
      <h3>
        <a href={r.url} target="_blank" rel="noopener noreferrer">
          {r.title} <ExternalLink size={14} aria-label="opens in a new tab" />
        </a>
      </h3>
      <p className="small">{r.creator || r.publisher}</p>
      <p>{r.description}</p>
      <details>
        <summary>Source notes & dates</summary>
        <p>{r.credibility}</p>
        <p className="small">
          Published: {r.publicationDate || "Not stated"} · Last reviewed:{" "}
          {r.lastVerified}
          <br />
          {new URL(r.url).hostname}
        </p>
      </details>
    </article>
  );
}
export function ActionCenter({
  ids = ["sba", "startup", "dot", "tour"],
  actions = [
    "Define the service you want to offer.",
    "Get written requirements and quotes before committing.",
    "Model a conservative case and a disruption case.",
  ],
}: {
  ids?: string[];
  actions?: string[];
}) {
  const store = useLocalList("ela-saved");
  const selected = resources.filter((r) => ids.includes(r.id));
  return (
    <section className="action-center">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Sources & further learning</p>
          <h2>Ready to go deeper?</h2>
        </div>
        <Link to="/resources">
          Resource center <ArrowUpRight size={16} />
        </Link>
      </div>
      <div className="resource-groups">
        {[
          [
            "Official resources",
            selected.filter(
              (r) =>
                r.classification === "Government" &&
                !["Tool", "Watch"].includes(r.type),
            ),
          ],
          ["Watch", selected.filter((r) => r.type === "Watch")],
          [
            "Read",
            selected.filter(
              (r) => r.classification !== "Government" && r.type !== "Watch",
            ),
          ],
          ["Tools", selected.filter((r) => r.type === "Tool")],
        ].map(([title, list]) => (
          <div key={String(title)}>
            <h3>{String(title)}</h3>
            {(list as Resource[]).length ? (
              (list as Resource[]).map((r) => (
                <ResourceCard
                  key={r.id}
                  resource={r}
                  saved={store.items.includes(r.id)}
                  onSave={store.toggle}
                />
              ))
            ) : (
              <p className="small">
                Explore the <Link to="/resources">curated resource center</Link>{" "}
                for more verified material.
              </p>
            )}
          </div>
        ))}
      </div>
      <div className="action-strip">
        <h3>Take action</h3>
        <ol>
          {actions.map((a) => (
            <li key={a}>{a}</li>
          ))}
        </ol>
        <ButtonLink to="/tools/route" secondary>
          Model your economics
        </ButtonLink>
      </div>
      {store.warning && <p role="status">{store.warning}</p>}
    </section>
  );
}
