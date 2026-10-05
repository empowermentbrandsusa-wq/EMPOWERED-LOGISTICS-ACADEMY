import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import { PageHead, ButtonLink, ResourceCard } from "../../components/ui";
import { resources, journey } from "../../data";
import { carrier, warehouse } from "../../data/courses";
import { useLocalList } from "../../lib/storage";
export default function Progress() {
  const completed = useLocalList("ela-completed");
  const saved = useLocalList("ela-saved");
  const fundamentals = useLocalList("ela-fundamentals");
  return (
    <>
      <PageHead
        eyebrow="Your learning · on this device"
        title="Keep building your understanding."
        description="No account required. Completion and saved resources live in this browser; they do not sync across devices. Clearing browser data removes them."
      />
      <div className="course-grid">
        {[
          ["Last-mile carrier", carrier, "carrier"],
          ["Warehouse business", warehouse, "warehouse"],
        ].map(([title, list, slug]) => {
          const lessons = list as typeof carrier;
          const count = lessons.filter((l) =>
            completed.items.includes(l.id),
          ).length;
          const next =
            lessons.find((l) => !completed.items.includes(l.id)) || lessons[0];
          return (
            <article className="course-card" key={String(title)}>
              <h2>{String(title)}</h2>
              <strong>{Math.round((count / lessons.length) * 100)}%</strong>
              <progress
                value={count}
                max={lessons.length}
                aria-label={`${title} completion`}
              />
              <ButtonLink to={`/academy/${slug}/${next.id}`}>
                Continue learning
              </ButtonLink>
            </article>
          );
        })}
      </div>
      <section className="course-card">
        <h2>Logistics fundamentals</h2>
        <strong>
          {Math.round(
            (fundamentals.items.filter((id) => journey.some((s) => s.id === id))
              .length /
              journey.length) *
              100,
          )}
          %
        </strong>
        <progress
          value={fundamentals.items.length}
          max={journey.length}
          aria-label="Logistics fundamentals completion"
        />
        <ButtonLink to="/journey">Continue the package journey</ButtonLink>
      </section>
      <h2>Completed lessons</h2>
      <ul className="completed-list">
        {[...carrier, ...warehouse]
          .filter((l) => completed.items.includes(l.id))
          .map((l) => (
            <li key={l.id}>
              <Check size={15} />
              <Link
                to={`/academy/${l.id.startsWith("carrier") ? "carrier" : "warehouse"}/${l.id}`}
              >
                {l.title}
              </Link>
            </li>
          ))}
      </ul>
      {!completed.items.length && <p>Complete a lesson to see it here.</p>}
      <h2>Saved resources</h2>
      <div className="resource-grid">
        {resources
          .filter((r) => saved.items.includes(r.id))
          .map((r) => (
            <ResourceCard key={r.id} resource={r} saved onSave={saved.toggle} />
          ))}
      </div>
      {!saved.items.length && (
        <p>Save resources using their bookmark buttons.</p>
      )}
      <details className="clear-data">
        <summary>Manage local learning data</summary>
        <button className="button secondary" onClick={completed.clear}>
          Clear lesson completion
        </button>
        <button className="button secondary" onClick={saved.clear}>
          Clear saved resources
        </button>
        <button className="button secondary" onClick={fundamentals.clear}>
          Clear fundamentals progress
        </button>
      </details>
      {(saved.warning || completed.warning) && (
        <p role="status">{saved.warning || completed.warning}</p>
      )}
    </>
  );
}
