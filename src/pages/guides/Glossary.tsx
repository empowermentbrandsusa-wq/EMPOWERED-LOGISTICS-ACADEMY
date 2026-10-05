import { useState } from "react";
import { PageHead, ActionCenter } from "../../components/ui";
import { glossary } from "../../data";

export default function Glossary() {
  const [query, setQuery] = useState("");
  const terms = Object.entries(glossary).filter(([t, d]) =>
    `${t} ${d}`.toLowerCase().includes(query.toLowerCase()),
  );
  return (
    <>
      <PageHead
        eyebrow="Plain-English logistics"
        title="Understand the language."
        description="Terminology should help you learn, not stand in your way. Underlined terms inside lessons reveal short definitions on focus or hover."
      />
      <label>
        Find a term
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          maxLength={200}
        />
      </label>
      <dl className="glossary-list">
        {terms.map(([t, d]) => (
          <div key={t}>
            <dt>{t}</dt>
            <dd>{d}</dd>
          </div>
        ))}
      </dl>
      {!terms.length && (
        <p role="status">No terms match. Try a shorter search.</p>
      )}
      <ActionCenter ids={["definitions", "tour", "warehouse-story"]} />
    </>
  );
}
