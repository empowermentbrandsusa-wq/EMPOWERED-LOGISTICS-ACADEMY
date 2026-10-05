import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { PageHead } from "../../components/ui";
import { pathways } from "../../data";
export default function Entry() {
  return (
    <>
      <PageHead
        eyebrow="Your starting point"
        title="What are you trying to do?"
        description="Start with your goal. Every pathway includes tradeoffs, practical actions and sources you can verify."
      />
      <div className="pathway-list">
        {pathways.map(([title, to], i) => (
          <Link to={to} key={title}>
            <span>{String(i + 1).padStart(2, "0")}</span>
            <h2>{title}</h2>
            <ArrowUpRight size={22} />
          </Link>
        ))}
      </div>
    </>
  );
}
