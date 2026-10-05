import { useState } from "react";
import { useLocation } from "react-router-dom";
import { resources } from "../data";
import { PageHead, ResourceCard, Badge } from "../components/ui";
import { useLocalList } from "../lib/storage";
export default function Resources() {
  const official = useLocation().pathname.endsWith("/government");
  const [query, setQuery] = useState("");
  const [type, setType] = useState("all");
  const [topic, setTopic] = useState("all");
  const store = useLocalList("ela-saved");
  const filtered = resources.filter(
    (r) =>
      (!official || r.classification === "Government") &&
      (type === "all" || r.type === type) &&
      (topic === "all" || r.topic === topic) &&
      `${r.title} ${r.publisher} ${r.description} ${r.topic}`
        .toLowerCase()
        .includes(query.toLowerCase()),
  );
  return (
    <div className="page-container">
      <PageHead
        eyebrow="Verified links. Visible sources."
        title={
          official ? "Official resource center." : "Keep learning. Take action."
        }
        description="Inspect original resources, understand why they’re useful and verify current requirements directly. The academy does not collect your application documents."
      />
      <Badge kind="verified">Sources reviewed October 4, 2026</Badge>
      <div className="filters">
        <label>
          Find a resource
          <input
            type="search"
            value={query}
            maxLength={200}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Insurance, tax, fulfillment…"
          />
        </label>
        <label>
          Resource type
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="all">All types</option>
            {["Official", "Watch", "Read", "Tool", "Data"].map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </label>
        <label>
          Topic
          <select value={topic} onChange={(e) => setTopic(e.target.value)}>
            <option value="all">All topics</option>
            {[...new Set(resources.map((r) => r.topic))].map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </label>
      </div>
      <p role="status" className="small">
        {filtered.length} resources. External links open in a new tab. Some
        publishers may limit access.
      </p>
      {store.warning && <p role="status">{store.warning}</p>}
      <div className="resource-grid">
        {filtered.map((r) => (
          <ResourceCard
            key={r.id}
            resource={r}
            saved={store.items.includes(r.id)}
            onSave={store.toggle}
          />
        ))}
      </div>
      {!filtered.length && (
        <p className="empty-state">
          No resources match. Try a broader topic or clear the search.
        </p>
      )}
      <section className="action-strip">
        <h2>Know what kind of information you’re reading.</h2>
        <div className="type-legend">
          <p>
            <Badge kind="verified">Verified fact</Badge> Appropriate original
            source supports a factual claim.
          </p>
          <p>
            <Badge kind="example">Industry example</Badge> A real operation or
            service model; not universal.
          </p>
          <p>
            <Badge>Educational model</Badge> A fictional scenario for
            understanding the mechanics.
          </p>
          <p>
            <Badge kind="assumption">User assumption</Badge> A number you enter;
            not a quote or forecast from the academy.
          </p>
        </div>
        <p>
          Links and requirements change. Review dates document our checks;
          always confirm the current official requirement before acting.
        </p>
      </section>
    </div>
  );
}
