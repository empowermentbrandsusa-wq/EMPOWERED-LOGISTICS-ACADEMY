import { PageHead, ActionCenter, ButtonLink } from "../../components/ui";

import Checklist from "./Checklist";
export default function Partners() {
  return (
    <>
      <PageHead
        eyebrow="For operators and business partners"
        title="Build the understanding before the partnership."
        description="Explore the system, agree on a service scope and verify the commercial and operational requirements together."
      />
      <section className="content-section">
        <h2>A serious carrier operation needs evidence.</h2>
        <p>
          This academy is an educational platform. It is not advertising an
          active carrier fleet, route inventory or guaranteed delivery capacity.
          Use the proposal to structure a real conversation and the course to
          inspect the responsibilities.
        </p>
        <ButtonLink to="/proposal">Explore the proposal</ButtonLink>
        <ButtonLink to="/academy/carrier" secondary>
          Review carrier operations
        </ButtonLink>
      </section>
      <section className="content-section">
        <h2>If your business needs delivery capacity</h2>
        <Checklist
          items={[
            "Define cargo, service geography, volume and delivery windows.",
            "Identify the actual contracting carrier and verify credentials and coverage.",
            "Request service standards, exception handling, POD and reporting procedures.",
            "Review pricing, liability, customer data handling and termination terms.",
            "Pilot a scoped service before committing to expansion.",
          ]}
        />
      </section>
      <ActionCenter ids={["dot", "authority", "insurance", "sba", "tour"]} />
    </>
  );
}
