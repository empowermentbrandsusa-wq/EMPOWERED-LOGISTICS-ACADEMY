import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Check, ArrowRight } from "lucide-react";
import { reviewedAt } from "../data";
import { carrier, warehouse } from "../data/courses";
import type { Lesson } from "../data";
import {
  PageHead,
  ButtonLink,
  ActionCenter,
  Badge,
  TermText,
  Flow,
} from "../components/ui";
import { useLocalList } from "../lib/storage";
export default function Academy() {
  const [, , course, id] = useLocation().pathname.split("/");
  if (!course)
    return (
      <div className="page-container">
        <PageHead
          eyebrow="The academy"
          title="Learn the operation. Build your understanding."
          description="Two structured pathways, practical actions and knowledge checks. Progress is optional and stored only on this device."
        />
        <div className="course-grid">
          {[
            [
              "carrier",
              "Last-Mile Carrier",
              "30 lessons · from first route to regional operations",
            ],
            [
              "warehouse",
              "Warehouse Business",
              "27 lessons · from space selection to a scalable service",
            ],
          ].map(([slug, t, d]) => (
            <article className="course-card" key={slug}>
              <p className="eyebrow">Operating pathway</p>
              <h2>{t}</h2>
              <p>{d}</p>
              <ButtonLink to={`/academy/${slug}`}>
                Explore the course
              </ButtonLink>
            </article>
          ))}
        </div>
        <ButtonLink to="/journey" secondary>
          Start with logistics fundamentals
        </ButtonLink>
        <ActionCenter />
      </div>
    );
  if (!["carrier", "warehouse"].includes(course))
    return (
      <div className="page-container">
        <h1>Course not found</h1>
        <ButtonLink to="/academy">Return to academy</ButtonLink>
      </div>
    );
  const lessons = course === "carrier" ? carrier : warehouse;
  if (id) {
    const lesson = lessons.find((l) => l.id === id);
    return lesson ? (
      <LessonPage
        key={lesson.id}
        lesson={lesson}
        course={course}
        lessons={lessons}
      />
    ) : (
      <div className="page-container">
        <h1>Lesson not found</h1>
        <ButtonLink to={`/academy/${course}`}>View course</ButtonLink>
      </div>
    );
  }
  return <Course course={course} lessons={lessons} />;
}
function Course({ course, lessons }: { course: string; lessons: Lesson[] }) {
  const store = useLocalList("ela-completed");
  const done = lessons.filter((l) => store.items.includes(l.id)).length;
  const next = lessons.find((l) => !store.items.includes(l.id)) || lessons[0];
  return (
    <div className="page-container">
      <PageHead
        eyebrow={`${lessons.length} lessons · Last reviewed ${reviewedAt}`}
        title={
          course === "carrier"
            ? "The last-mile carrier pathway."
            : "The warehouse business pathway."
        }
        description={
          course === "carrier"
            ? "Understand how to become the business receiving route work—and the responsibilities that come with it."
            : "Understand what warehouse businesses sell, how the operation works and what to verify before committing to space."
        }
      />
      <div className="course-progress">
        <div>
          <strong>{Math.round((done / lessons.length) * 100)}% complete</strong>
          <progress
            value={done}
            max={lessons.length}
            aria-label="Course completion"
          />
          <span>
            {done} of {lessons.length} lessons · saved on this device
          </span>
        </div>
        <ButtonLink to={`/academy/${course}/${next.id}`}>
          Continue learning
        </ButtonLink>
      </div>
      <ol className="lesson-list">
        {lessons.map((l) => (
          <li key={l.id}>
            <Link to={`/academy/${course}/${l.id}`}>
              <span className="lesson-number">
                {String(l.number).padStart(2, "0")}
              </span>
              <div>
                <h2>{l.title}</h2>
                <p>{l.body.split(".")[0]}.</p>
              </div>
              {store.items.includes(l.id) ? (
                <Check aria-label="Completed" />
              ) : (
                <ArrowRight aria-hidden="true" />
              )}
            </Link>
          </li>
        ))}
      </ol>
      {course === "warehouse" && (
        <section className="model-banner">
          <h2>Build a mock warehouse business.</h2>
          <p>
            Turn space, staffing and revenue assumptions into an operating
            model.
          </p>
          <ButtonLink to="/tools/warehouse">Open the simulator</ButtonLink>
        </section>
      )}
      <ActionCenter
        ids={
          course === "carrier"
            ? ["dot", "authority", "insurance", "labor", "tour"]
            : [
                "osha",
                "forklift",
                "warehouse-story",
                "atlanta-operators",
                "tour",
              ]
        }
      />
    </div>
  );
}
function LessonPage({
  lesson: l,
  course,
  lessons,
}: {
  lesson: Lesson;
  course: string;
  lessons: Lesson[];
}) {
  const store = useLocalList("ela-completed");
  const [answer, setAnswer] = useState<number | null>(null);
  const options = l.number % 2 ? [...l.quiz.answers].reverse() : l.quiz.answers;
  const correct = l.quiz.answers[l.quiz.correct];
  return (
    <div className="page-container">
      <PageHead
        eyebrow={`Lesson ${l.number} of ${lessons.length} · ${course} pathway · reviewed ${l.reviewedAt}`}
        title={l.title}
        description={l.body}
      />
      <div className="editorial-layout">
        <article className="lesson-body">
          <section>
            <h2>Understand the workflow</h2>
            <p className="lead">
              <TermText text={l.body} />
            </p>
            <Flow steps={l.diagram} />
          </section>
          {l.sections.map((s) => (
            <section key={s.title}>
              <h2>{s.title}</h2>
              <p>
                <TermText text={s.text} />
              </p>
            </section>
          ))}
          <section className="example-box">
            <Badge>Educational example</Badge>
            <h2>See it in practice</h2>
            <p>
              <TermText text={l.example} />
            </p>
          </section>
          <section>
            <h2>Business implications</h2>
            <p>{l.implication}</p>
            <h3>Cost considerations</h3>
            <p>{l.cost}</p>
          </section>
          <section className="action-strip">
            <h2>Action checklist</h2>
            <label className="check-row">
              <input type="checkbox" />
              {l.action}
            </label>
            <label className="check-row">
              <input type="checkbox" />
              Inspect the relevant source and record the requirements you still
              need to confirm.
            </label>
            <label className="check-row">
              <input type="checkbox" />
              Identify the expense and operational risk that could change your
              decision.
            </label>
          </section>
          <fieldset className="knowledge-check">
            <legend>Knowledge check</legend>
            <p>{l.quiz.question}</p>
            {options.map((a, i) => (
              <label key={a}>
                <input
                  type="radio"
                  name={l.id}
                  checked={answer === i}
                  onChange={() => setAnswer(i)}
                />
                {a}
              </label>
            ))}
            {answer !== null && (
              <p
                role="status"
                className={options[answer] === correct ? "success" : "error"}
              >
                {options[answer] === correct
                  ? "Correct. Apply that principle to your own operation."
                  : `Review the workflow. The stronger answer is: ${correct}.`}
              </p>
            )}
          </fieldset>
          <button
            className="button"
            aria-pressed={store.items.includes(l.id)}
            onClick={() => store.toggle(l.id)}
          >
            {store.items.includes(l.id)
              ? "Marked complete — undo"
              : "Mark lesson complete"}
            <Check size={17} />
          </button>
          {store.warning && <p role="status">{store.warning}</p>}
          <div className="lesson-nav">
            {l.number > 1 && (
              <ButtonLink
                to={`/academy/${course}/${lessons[l.number - 2].id}`}
                secondary
              >
                Previous lesson
              </ButtonLink>
            )}
            {l.number < lessons.length ? (
              <ButtonLink to={`/academy/${course}/${lessons[l.number].id}`}>
                Next lesson
              </ButtonLink>
            ) : (
              <ButtonLink
                to={course === "warehouse" ? "/tools/warehouse" : "/proposal"}
              >
                Put it into practice
              </ButtonLink>
            )}
          </div>
        </article>
        <details className="go-deeper" open>
          <summary className="eyebrow">Go deeper</summary>
          <Link to={`/academy/${course}`}>All course lessons</Link>
          <Link to="/resources">Watch & read</Link>
          <Link to="/resources/government">Official sources</Link>
          <Link
            to={course === "warehouse" ? "/tools/warehouse" : "/tools/route"}
          >
            Model costs
          </Link>
          <Link to="/glossary">Glossary</Link>
        </details>
      </div>
      <ActionCenter
        ids={l.resources}
        actions={[
          l.action,
          "Verify time-sensitive requirements with the responsible agency.",
        ]}
      />
    </div>
  );
}
