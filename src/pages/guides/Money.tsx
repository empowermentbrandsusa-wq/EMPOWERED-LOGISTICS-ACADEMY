import { useState } from "react";
import {
  ArrowRight,
  Banknote,
  CircleDollarSign,
  PackageCheck,
  ReceiptText,
  ShieldAlert,
  Truck,
  UserRound,
  Warehouse,
} from "lucide-react";
import { ActionCenter, Badge, ButtonLink } from "../../components/ui";
import { RevealTabs } from "../../components/experience";

const moneySteps = [
  {
    title: "Customer",
    icon: UserRound,
    role: "Starts the transaction",
    revenue: "Pays the retailer for goods and any applicable shipping charges.",
    pricing: "Purchase price and checkout terms.",
    expenses: "Purchase cost, potential return shipping and time.",
    risk: "Delivery or return-policy disputes.",
    capital: "Consumer spending; not business capital.",
    margin: "Not a logistics-provider margin.",
  },
  {
    title: "Retailer",
    icon: ReceiptText,
    role: "Owns the customer promise",
    revenue: "Receives customer sales; pays vendors for contracted logistics.",
    pricing: "Product sale; shipping may be included or separately charged.",
    expenses: "Goods, fulfillment, shipping, support and returns.",
    risk: "Demand, inventory and customer promises.",
    capital: "Inventory and working capital.",
    margin:
      "Sales less product and operating costs; shipping charges alone are not profit.",
  },
  {
    title: "Fulfillment",
    icon: Warehouse,
    role: "Turns demand into a shipment",
    revenue: "Receives fees from the brand or retailer when outsourced.",
    pricing: "Storage, receiving, picks, packaging and service fees.",
    expenses: "Space, labor, systems and materials.",
    risk: "Accuracy, damage, peaks and idle capacity.",
    capital: "Facility, equipment and cash before collections.",
    margin: "Utilization and cost per activity determine contribution.",
  },
  {
    title: "Transportation",
    icon: Truck,
    role: "Moves grouped shipments",
    revenue:
      "Receives payment from a shipper, carrier network or intermediary.",
    pricing: "Lane, trip, distance, time or dedicated-service fee.",
    expenses: "Driver, fuel, vehicle, tolls and empty miles.",
    risk: "Delays, equipment failure and price exposure.",
    capital: "Vehicle capacity, coverage and working cash.",
    margin: "Loaded revenue must cover the full movement and empty miles.",
  },
  {
    title: "Carrier",
    icon: PackageCheck,
    role: "Accepts the delivery obligation",
    revenue:
      "Receives contracted payment from a shipper, retailer or prime carrier.",
    pricing: "Route, stop, package or agreed service terms.",
    expenses: "Drivers, vehicles, fuel, insurance, dispatch and claims.",
    risk: "No guaranteed volume, deductions and customer concentration.",
    capital: "Equipment and working capital.",
    margin: "Service contribution must cover fixed expenses and disruptions.",
  },
  {
    title: "Route",
    icon: ArrowRight,
    role: "Organizes the service work",
    revenue: "A route is work allocation, not a separate legal payer.",
    pricing: "The contract defines billable route units.",
    expenses: "Loading, travel, stops, attempts and returns.",
    risk: "Volume changes and unpaid work.",
    capital: "Capacity allocated to the service period.",
    margin: "Packages, stops, time and miles describe different economics.",
  },
  {
    title: "Driver",
    icon: UserRound,
    role: "Completes the physical handoff",
    revenue:
      "Receives wages from an employer or service compensation under a lawful arrangement.",
    pricing: "Hourly, shift or task/service payment; verify obligations.",
    expenses: "Time and personally borne expenses under the arrangement.",
    risk: "Safety, pay disputes and misclassification.",
    capital: "Depends on who supplies equipment.",
    margin:
      "Wages are compensation; owner-operator revenue must still cover business costs.",
  },
];

export default function Money() {
  const [index, setIndex] = useState(0);
  const step = moneySteps[index];
  const Icon = step.icon;
  return (
    <div className="money-page">
      <header className="money-hero">
        <p className="eyebrow">Follow the money</p>
        <h1>
          A customer spends <span>$100.</span>
          <br />
          Who gets paid next?
        </h1>
        <p>
          The honest answer: it depends on the product, contract, company and
          market. So this experience shows the relationships—not a fake
          universal split.
        </p>
        <Badge kind="example">
          Illustrative example · not an allocation of a real order
        </Badge>
      </header>

      <section
        className="money-experience"
        aria-label="Illustrative money flow"
      >
        <div className="money-origin">
          <CircleDollarSign size={48} />
          <span>
            <small>Customer checkout</small>
            <strong>$100 order</strong>
          </span>
        </div>
        <div className="money-caution">
          <ShieldAlert size={18} />
          <span>
            The $100 is retailer sales revenue—not $100 available to divide
            among logistics providers.
          </span>
        </div>
        <p className="rail-hint">Swipe or scroll through the participants →</p>
        <div
          className="money-track"
          role="tablist"
          aria-label="Money participants"
        >
          {moneySteps.map((item, position) => {
            const StepIcon = item.icon;
            return (
              <button
                key={item.title}
                role="tab"
                aria-selected={index === position}
                aria-controls="money-participant-panel"
                onClick={() => setIndex(position)}
              >
                <span>{String(position + 1).padStart(2, "0")}</span>
                <StepIcon size={23} />
                <strong>{item.title}</strong>
                <small>{item.role}</small>
              </button>
            );
          })}
        </div>

        <article
          className="money-participant"
          id="money-participant-panel"
          role="tabpanel"
          aria-live="polite"
        >
          <div className="money-participant-lead">
            <div className="money-participant-icon">
              <Icon size={42} />
            </div>
            <div>
              <p className="eyebrow">
                Participant {index + 1} · {step.role}
              </p>
              <h2>{step.title}</h2>
              <p>{step.revenue}</p>
            </div>
          </div>
          <RevealTabs
            key={step.title}
            label={`${step.title} economics`}
            items={[
              {
                label: "How pricing works",
                icon: <ReceiptText size={18} />,
                content: (
                  <>
                    <h3>Compensation structure</h3>
                    <p>{step.pricing}</p>
                  </>
                ),
              },
              {
                label: "What costs money",
                icon: <Banknote size={18} />,
                content: (
                  <>
                    <h3>Major expenses</h3>
                    <p>{step.expenses}</p>
                  </>
                ),
              },
              {
                label: "What can go wrong",
                icon: <ShieldAlert size={18} />,
                content: (
                  <>
                    <h3>Operating risk</h3>
                    <p>{step.risk}</p>
                  </>
                ),
              },
              {
                label: "What must be funded",
                icon: <CircleDollarSign size={18} />,
                content: (
                  <>
                    <h3>Capital requirements</h3>
                    <p>{step.capital}</p>
                  </>
                ),
              },
              {
                label: "How profit may emerge",
                icon: <PackageCheck size={18} />,
                content: (
                  <>
                    <h3>Margin mechanics</h3>
                    <p>{step.margin}</p>
                  </>
                ),
              },
            ]}
          />
        </article>
      </section>

      <section className="revenue-separation">
        <div>
          <span>REVENUE</span>
          <strong>Money coming in</strong>
        </div>
        <ArrowRight />
        <div>
          <span>– COSTS</span>
          <strong>Labor, vehicle, fuel, insurance, systems</strong>
        </div>
        <ArrowRight />
        <div>
          <span>= OPERATING RESULT</span>
          <strong>Positive, break-even or negative</strong>
        </div>
      </section>

      <section className="money-next">
        <p className="eyebrow">Make the example yours</p>
        <h2>Do not borrow somebody else’s earnings claim.</h2>
        <p>
          Enter the actual route, stop, mile and cost assumptions you are
          evaluating.
        </p>
        <ButtonLink to="/tools/route">Build your route model</ButtonLink>
      </section>

      <div className="page-container">
        <ActionCenter ids={["break-even", "tax", "startup", "tour"]} />
      </div>
    </div>
  );
}
