import { PageHead, ButtonLink } from "../../components/ui";

export default function Privacy() {
  return (
    <>
      <PageHead
        eyebrow="Privacy and local data"
        title="Learn without handing over sensitive information."
        description="This release has no account, application-upload portal or lead-collection backend."
      />
      <section className="content-section">
        <h2>What is stored</h2>
        <p>
          Lesson completion and bookmarked resource IDs are stored in this
          browser using local storage. Calculator assumptions remain in page
          memory and reset when you leave or reload. Search queries appear in
          the page URL and may appear in browser history and hosting logs.
        </p>
        <h2>External websites and media</h2>
        <p>
          Resource links open another publisher’s website. Those sites have
          their own privacy policies. Videos are not automatically embedded or
          played; opening a media resource sends you to its publisher. The
          warehouse photograph is served from this website.
        </p>
        <h2>Hosting and analytics</h2>
        <p>
          No advertising, tracking pixels or analytics code is included in the
          academy application. A hosting provider may process normal request
          information under its own policies. Production privacy disclosures
          must be reviewed when a hosting provider or backend is selected.
        </p>
        <h2>Your controls</h2>
        <p>
          Remove saved learning on the progress page or clear your browser data.
          This application does not request SSNs, bank credentials, identity
          documents or insurance-policy numbers.
        </p>
        <ButtonLink to="/progress">Manage local learning</ButtonLink>
      </section>
    </>
  );
}
