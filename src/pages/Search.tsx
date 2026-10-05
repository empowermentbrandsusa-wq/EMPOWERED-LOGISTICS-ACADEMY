import { useSearchParams, Link } from "react-router-dom";
import { Search as SearchIcon, ArrowUpRight } from "lucide-react";
import { PageHead } from "../components/ui";
import { search } from "../lib/search";
export default function Search() {
  const [params, setParams] = useSearchParams();
  const query = params.get("q") || "";
  const results = search(query);
  return (
    <div className="page-container search-page">
      <PageHead
        eyebrow="Search the academy"
        title="What do you want to understand?"
        description="Search lessons, terms, tools, business models and verified resources."
      />
      <label className="global-search">
        <SearchIcon size={24} />
        <span className="sr-only">Search all academy content</span>
        <input
          type="search"
          autoFocus
          placeholder="How do I get a route?"
          maxLength={200}
          value={query}
          onChange={(e) => setParams({ q: e.target.value }, { replace: true })}
        />
      </label>
      {!query && (
        <div className="suggestions">
          {[
            "How do I get a route?",
            "Can I use my SUV?",
            "Insurance",
            "What is a 3PL?",
            "Warehouse costs",
          ].map((q) => (
            <button
              className="button secondary"
              key={q}
              onClick={() => setParams({ q })}
            >
              {q}
            </button>
          ))}
        </div>
      )}
      <p role="status">
        {query
          ? `${results.length} results for “${query}”`
          : "Choose a starting point or type a question."}
      </p>
      <div className="search-results">
        {results.map((r, i) => (
          <article key={r.url + r.title + i}>
            <p className="eyebrow">{r.type}</p>
            <h2>
              {r.external ? (
                <a href={r.url} target="_blank" rel="noopener noreferrer">
                  {r.title}
                  <ArrowUpRight size={19} />
                </a>
              ) : (
                <Link to={r.url}>
                  {r.title}
                  <ArrowUpRight size={19} />
                </Link>
              )}
            </h2>
            <p>
              {r.text.slice(0, 220)}
              {r.text.length > 220 ? "…" : ""}
            </p>
          </article>
        ))}
      </div>
      {query && !results.length && (
        <div className="empty-state">
          <h2>No match yet.</h2>
          <p>Try a shorter term such as “route,” “insurance” or “warehouse.”</p>
          <Link to="/resources">Browse resources</Link>
        </div>
      )}
    </div>
  );
}
