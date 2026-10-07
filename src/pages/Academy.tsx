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
import { CarrierPathway, WarehouseCompare } from "../components/experience";
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
  const phaseNames =
    course === "carrier"
      ? [
          "Understand the work",
          "Build the business foundation",
          "Run the route",
          "Add people and capacity",
          "Scale the carrier",
        ]
      : [
          "Understand the facility",
          "Design the operation",
          "Control inventory",
          "Win and serve clients",
          "Model and scale",
        ];
  const phases = phaseNames.map((name, phaseIndex) => ({
    name,
    lessons: lessons.slice(
      phaseIndex * 6,
      phaseIndex === phaseNames.length - 1
        ? lessons.length
        : phaseIndex * 6 + 6,
    ),
  }));
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
      {course === "carrier" ? <CarrierPathway /> : <WarehouseCompare />}
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
      <div className="course-list-intro">
        <p className="eyebrow">Deep education · choose your next lesson</p>
        <h2>
          {course === "carrier"
            ? "Build the operating knowledge behind each stage."
            : "See the operation, then study the decisions underneath it."}
        </h2>
        <p>
          You do not have to consume everything at once. Start with the next
          relevant decision and return as your responsibilities grow.
        </p>
      </div>
      <div className="course-phases">
        {phases.map((phase, phaseIndex) => (
          <details
            className="course-phase"
            key={phase.name}
            open={phase.lessons.some((lesson) => lesson.id === next.id)}
          >
            <summary>
              <span>{String(phaseIndex + 1).padStart(2, "0")}</span>
              <div>
                <small>Phase {phaseIndex + 1}</small>
                <strong>{phase.name}</strong>
              </div>
              <em>
                {
                  phase.lessons.filter((lesson) =>
                    store.items.includes(lesson.id),
                  ).length
                }
                /{phase.lessons.length}
              </em>
            </summary>
            <ol className="lesson-list experience-lesson-list">
              {phase.lessons.map((l) => (
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
          </details>
        ))}
      </div>
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
      {course === "carrier" && (
        <section
          className="future-pathway"
          aria-labelledby="future-carrier-title"
        >
          <Badge>Future guided product · no price announced</Badge>
          <div>
            <p className="eyebrow">Start your own last-mile carrier</p>
            <h2 id="future-carrier-title">
              The free Academy teaches the system. A future guided pathway can
              help organize the build.
            </h2>
            <p>
              The current 30 lessons remain available. A later guided offer may
              package setup, banking, insurance, vehicle strategy, carrier
              packets, route evaluation, operations, hiring and scaling into a
              structured implementation experience.
            </p>
          </div>
          <button className="button" type="button" disabled>
            Enrollment is not open
          </button>
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
          <section className="lesson-reveals">
            <p className="eyebrow">Choose what to unpack</p>
            <h2>Go one layer deeper.</h2>
            {l.sections.map((s, index) => (
              <details key={s.title} open={index === 0}>
                <summary>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  {s.title}
                </summary>
                <p>
                  <TermText text={s.text} />
                </p>
              </details>
            ))}
          </section>
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
