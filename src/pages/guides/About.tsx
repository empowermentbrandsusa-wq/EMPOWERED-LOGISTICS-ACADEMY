import { PageHead, ActionCenter } from "../../components/ui";

export default function About() {
  return (
    <>
      <PageHead
        eyebrow="Empowerment through education and information"
        title="Ownership starts with understanding."
        description="Every order creates opportunity. Learn the system. Find your lane. Build your business."
      />
      <section className="content-section">
        <h2>Make the invisible system understandable.</h2>
        <p>
          Empowered Logistics Academy starts after the customer presses BUY NOW.
          We follow the product, explain the businesses and help first-time
          entrepreneurs see where they could fit.
        </p>
        <p>
          Our focus is clear education, realistic operating tradeoffs and
          traceable sources. We seek credible operators and culturally relevant
          voices while keeping official requirements separate from practitioner
          experience.
        </p>
        <h2>How we handle evidence</h2>
        <p>
          Official agencies and original research take priority. Company
          examples show one operation, not a universal rule. Educational
          scenarios and visitor assumptions are labeled separately. We do not
          publish guaranteed earnings or pretend one startup budget applies to
          every business.
        </p>
        <h2>How content stays current</h2>
        <p>
          Review dates appear in lessons and resources. Maintainers update
          centralized content records; the content-check script flags aging
          reviews. Regulatory and commercial requirements still need direct
          confirmation before acting.
        </p>
      </section>
      <ActionCenter
        ids={["parcel", "definitions", "tour", "atlanta-operators", "sba"]}
      />
    </>
  );
}
