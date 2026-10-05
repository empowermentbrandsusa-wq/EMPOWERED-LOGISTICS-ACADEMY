import { useLocation } from "react-router-dom";
import { PageHead, ButtonLink } from "../components/ui";
import Entry from "./guides/Entry";
import Money from "./guides/Money";
import Proposal from "./guides/Proposal";
import Vehicles from "./guides/Vehicles";
import StartSmall from "./guides/StartSmall";
import Registration from "./guides/Registration";
import Glossary from "./guides/Glossary";
import Progress from "./guides/Progress";
import Partners from "./guides/Partners";
import About from "./guides/About";
import Privacy from "./guides/Privacy";
export default function Guides() {
  const path = useLocation().pathname;
  let content;
  if (path === "/find-your-lane") content = <Entry />;
  else if (path === "/money") content = <Money />;
  else if (path === "/proposal") content = <Proposal />;
  else if (path === "/vehicles") content = <Vehicles />;
  else if (path === "/start/start-small" || path === "/start")
    content = <StartSmall />;
  else if (path === "/start/business-registration") content = <Registration />;
  else if (path === "/glossary") content = <Glossary />;
  else if (path === "/progress") content = <Progress />;
  else if (path === "/partners") content = <Partners />;
  else if (path === "/about") content = <About />;
  else if (path === "/privacy") content = <Privacy />;
  else
    content = (
      <>
        <PageHead
          eyebrow="404 · Page not found"
          title="Let’s find your next step."
          description="This address does not match a published page. Your learning pathways are still here."
        />
        <ButtonLink to="/">Return home</ButtonLink>
        <ButtonLink to="/search" secondary>
          Search the academy
        </ButtonLink>
      </>
    );
  return <div className="page-container">{content}</div>;
}
