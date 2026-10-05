import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { PageHead, ActionCenter, ButtonLink } from "../../components/ui";

export default function StartSmall() {
  return (
    <>
      <PageHead
        eyebrow="Start with what you have"
        title="You don’t need a fleet to learn the business."
        description="Learn the workflow first. Some opportunities may permit existing equipment, but suitability, coverage and contract requirements come before accepting work."
      />
      <div className="start-small-grid">
        {[
          [
            "Personal vehicle",
            "Some delivery opportunities permit appropriate personal vehicles. Eligibility varies by vehicle, cargo and contracting company. Disclose commercial use to your insurer; personal coverage may exclude the work.",
          ],
          [
            "Rented vehicle",
            "Some rentals may work when the rental agreement, coverage and contracting company permit commercial delivery. Verify mileage structure, cargo restrictions, authorized drivers and coverage before accepting work.",
          ],
          [
            "Compact cargo van",
            "Purpose-built cargo access in a smaller footprint can suit constrained parking. Capacity and service support still need review.",
          ],
          [
            "Full-size cargo van",
            "More cargo area may serve approved parcel routes. Higher capacity brings added cost and does not guarantee work.",
          ],
          [
            "High-roof van",
            "Vertical room can improve internal access and organization. Verify clearances, payload and contract value before paying a premium.",
          ],
          [
            "Box truck",
            "May fit bulky, palletized or facility-to-facility work. Loading equipment, qualifications and operation-specific requirements need careful review.",
          ],
        ].map(([t, p], i) => (
          <article key={t}>
            <span className="eyebrow">0{i + 1}</span>
            <h2>{t}</h2>
            <p>{p}</p>
            <Link to="/vehicles">
              Compare vehicle considerations <ArrowUpRight size={15} />
            </Link>
          </article>
        ))}
      </div>
      <ButtonLink to="/academy/carrier">Start your carrier journey</ButtonLink>
      <ActionCenter
        ids={["insurance", "dot", "sba", "tour"]}
        actions={[
          "Identify an actual service opportunity and request its vehicle requirements.",
          "Obtain written vehicle-use permission and appropriate coverage.",
          "Model all miles, time and costs before committing to equipment.",
        ]}
      />
    </>
  );
}
