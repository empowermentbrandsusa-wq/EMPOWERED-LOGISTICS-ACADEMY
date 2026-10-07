import { Link } from "react-router-dom";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Package,
  ScanLine,
  ShoppingBag,
  Truck,
} from "lucide-react";
import { ActionCenter, Badge, ButtonLink } from "../components/ui";
import {
  BookOffer,
  CarrierPathway,
  OwnershipMoment,
  StoryScene,
  SystemStoryRail,
} from "../components/experience";
import { parcelStat, resources } from "../data";

export default function Home() {
  const source = resources.find(
    (resource) => resource.id === parcelStat.sourceId,
  )!;
  return (
    <>
      <section className="experience-hero">
        <div className="experience-hero-copy">
          <p className="eyebrow">
            <span className="live-dot" /> Your order starts a system
          </p>
          <h1>
            You just pressed <span>BUY NOW.</span>
          </h1>
          <p className="experience-question">What happens next?</p>
          <p className="hero-support">
            Follow one package. See the businesses. Find the part you could own.
          </p>
          <div className="hero-ctas">
            <ButtonLink to="/journey">Start the journey</ButtonLink>
            <Link className="text-link" to="/opportunities">
              Find your lane <ArrowRight size={17} />
            </Link>
          </div>
          <a className="scroll-cue" href="#the-system">
            See what your click started <ArrowDown size={18} />
          </a>
        </div>
        <div
          className="buy-now-visual"
          aria-label="Illustration of an online sneaker order becoming a package"
        >
          <div className="phone-order">
            <span className="phone-speaker" />
            <ShoppingBag size={38} aria-hidden="true" />
            <small>ORDER ELA–001</small>
            <strong>Everyday sneaker</strong>
            <span className="order-price">Illustrative order</span>
            <span className="buy-button">BUY NOW</span>
          </div>
          <div className="order-signal" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <div className="hero-package">
            <div className="package-tape" />
            <Package size={58} strokeWidth={1.35} />
            <span>ORDER CONFIRMED</span>
          </div>
          <div className="hero-route-line" aria-hidden="true" />
        </div>
      </section>

      <section className="system-reveal" id="the-system">
        <div className="story-intro">
          <p className="eyebrow">One click. Many handoffs.</p>
          <h2>
            Your screen goes still.
            <br />
            <em>The system starts moving.</em>
          </h2>
          <p>
            Scroll through the six chapters. Tap into all 17 stages when you
            want the full journey.
          </p>
        </div>
        <SystemStoryRail />
        <div className="system-reveal-action">
          <div className="moving-parcel" aria-hidden="true">
            <Package size={24} />
          </div>
          <Link to="/journey">
            Follow all 17 handoffs <ArrowUpRight size={17} />
          </Link>
        </div>
      </section>

      <StoryScene
        number="01"
        eyebrow="First, the order becomes work"
        title={
          <>
            The retailer makes a promise.
            <br />
            Operations must keep it.
          </>
        }
        body={
          <p>
            Payment is accepted. Inventory is located. A facility receives a
            task. The physical product has not moved yet—but several businesses
            may already be involved.
          </p>
        }
      >
        <div
          className="micro-scene order-scene"
          aria-label="Order record moving to inventory and fulfillment"
        >
          <span>
            <CheckCircle2 /> Order recorded
          </span>
          <ArrowRight />
          <span>
            <ScanLine /> Inventory found
          </span>
          <ArrowRight />
          <span>
            <Package /> Work released
          </span>
        </div>
      </StoryScene>

      <StoryScene
        number="02"
        eyebrow="Then, the order becomes a package"
        title={
          <>
            Someone picks it.
            <br />
            Someone packs it.
            <br />
            <em>Someone gets paid to do it.</em>
          </>
        }
        body={
          <p>
            A fulfillment operation turns digital demand into a labeled physical
            shipment. Space, labor, materials and software make that handoff
            possible.
          </p>
        }
        tone="dark"
      >
        <div
          className="sort-scene"
          aria-label="Packages moving from picking through packing and sortation"
        >
          {["PICK", "PACK", "LABEL", "SORT"].map((label, index) => (
            <div
              key={label}
              style={{ "--scene-step": index } as React.CSSProperties}
            >
              <Package size={30} />
              <span>{label}</span>
            </div>
          ))}
        </div>
      </StoryScene>

      <StoryScene
        number="03"
        eyebrow="Distance changes the job"
        title={<>The package joins a network.</>}
        body={
          <p>
            Grouped shipments travel between facilities before a local operation
            assigns the final delivery work. This is where middle mile becomes
            last mile.
          </p>
        }
      >
        <div
          className="distance-scene"
          aria-label="Middle-mile truck traveling from a distribution facility to a local delivery facility"
        >
          <span>
            <strong>Distribution</strong>
            <small>Grouped freight</small>
          </span>
          <div className="truck-lane">
            <Truck size={42} />
            <i />
          </div>
          <span>
            <strong>Local facility</strong>
            <small>Routes are prepared</small>
          </span>
        </div>
      </StoryScene>

      <StoryScene
        number="04"
        eyebrow="The final handoff"
        title={
          <>
            A carrier accepts the route.
            <br />
            <em>A driver completes the promise.</em>
          </>
        }
        body={
          <p>
            The driver is visible. Behind that driver may be a carrier
            responsible for vehicles, insurance, dispatch, staffing, reporting
            and service quality.
          </p>
        }
        tone="lime"
      >
        <OwnershipMoment />
      </StoryScene>

      <section className="scale-section visual-scale">
        <div>
          <p className="eyebrow">
            Now see the scale · {parcelStat.year} U.S. parcels
          </p>
          <h2>
            <span>
              <a href={source.url} target="_blank" rel="noopener noreferrer">
                23.1 billion
              </a>
            </span>{" "}
            packages.
            <br />
            Every one needed a system.
          </h2>
          <a
            className="source-link"
            href={source.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            Source: Pitney Bowes Parcel Shipping Index · 2026 report{" "}
            <ArrowUpRight size={14} />
          </a>
        </div>
        <div className="scale-figures">
          <div>
            <strong>{(parcelStat.day / 1e6).toFixed(1)}M</strong>
            <span>per average day</span>
          </div>
          <div>
            <strong>{Math.round(parcelStat.second)}</strong>
            <span>per average second</span>
          </div>
          <p>
            Calculated from the annual total using 365 days. These are
            averages—not live counts, contracts or earnings.
          </p>
        </div>
      </section>

      <section className="choice-moment">
        <p className="eyebrow">Choose what you want to understand next</p>
        <h2>See the system from three angles.</h2>
        <div className="choice-moment-grid">
          <Link to="/journey">
            <span>01</span>
            <Package />
            <h3>Follow the package</h3>
            <p>See custody, work and business opportunity at every handoff.</p>
            <ArrowUpRight />
          </Link>
          <Link to="/money">
            <span>02</span>
            <ScanLine />
            <h3>Follow the money</h3>
            <p>See who pays whom and why revenue is not profit.</p>
            <ArrowUpRight />
          </Link>
          <Link to="/opportunities">
            <span>03</span>
            <Truck />
            <h3>Find your lane</h3>
            <p>Answer a few questions and surface pathways worth exploring.</p>
            <ArrowUpRight />
          </Link>
        </div>
      </section>

      <section className="home-pathway">
        <CarrierPathway />
      </section>

      <section className="model-banner experience-model">
        <Badge>Educational models · your assumptions</Badge>
        <h2>
          Revenue looks exciting.
          <br />
          <em>Costs decide what survives.</em>
        </h2>
        <p>
          Model the driver, fuel, vehicle, insurance, maintenance and
          administrative cost before calling a route profitable.
        </p>
        <div>
          <ButtonLink to="/tools/route">Model a route</ButtonLink>
          <ButtonLink to="/proposal" secondary>
            See the partner story
          </ButtonLink>
        </div>
      </section>

      <BookOffer />

      <ActionCenter
        ids={["parcel", "sba", "tour", "atlanta-operators", "break-even"]}
        actions={[
          "Follow the complete package journey.",
          "Choose one lane to investigate—not five at once.",
          "Verify requirements and model a downside case before spending.",
        ]}
      />
    </>
  );
}
