import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { PageHead, ActionCenter, ButtonLink, Badge } from "../../components/ui";

const moneySteps = [
  [
    "Customer",
    "Pays the retailer for goods and any applicable shipping charges.",
    "Purchase price and checkout terms.",
    "Purchase cost, potential return shipping and time.",
    "Delivery or return-policy disputes.",
    "Consumer spending; not business capital.",
    "Not a logistics-provider margin.",
  ],
  [
    "Retailer",
    "Receives customer sales; pays vendors for contracted logistics.",
    "Product sale; shipping may be included or separately charged.",
    "Goods, fulfillment, shipping, support and returns.",
    "Demand, inventory and customer promises.",
    "Inventory and working capital.",
    "Sales less product and operating costs; shipping charges alone are not profit.",
  ],
  [
    "Fulfillment / logistics",
    "Receives fees from the brand or retailer when outsourced.",
    "Storage, receiving, picks, packaging and service fees.",
    "Space, labor, systems and materials.",
    "Accuracy, damage, peaks and idle capacity.",
    "Facility/equipment and cash before collections.",
    "Utilization and cost per activity determine contribution.",
  ],
  [
    "Transportation",
    "Receives payment from a shipper, carrier network or intermediary.",
    "Lane, trip, distance, time or dedicated-service fee.",
    "Driver, fuel, vehicle, tolls and empty miles.",
    "Delays, equipment failure and price exposure.",
    "Vehicle capacity, coverage and working cash.",
    "Loaded revenue must cover the full movement and empty miles.",
  ],
  [
    "Carrier",
    "Receives contracted payment from a shipper, retailer or prime carrier.",
    "Route, stop, package or agreed service terms.",
    "Drivers, vehicles, fuel, insurance, dispatch and claims.",
    "No guaranteed volume, deductions and customer concentration.",
    "Equipment and working capital.",
    "Service contribution must cover fixed expenses and disruptions.",
  ],
  [
    "Route",
    "A route is work allocation, not a separate legal payer.",
    "The contract defines billable route units.",
    "Loading, travel, stops, attempts and returns.",
    "Volume changes and unpaid work.",
    "Capacity allocated to the service period.",
    "Packages, stops, time and miles describe different economics.",
  ],
  [
    "Driver",
    "Receives wages from an employer or service compensation under a lawful arrangement.",
    "Hourly, shift or task/service payment; verify obligations.",
    "Time and personally borne expenses under the arrangement.",
    "Safety, pay disputes and misclassification.",
    "Depends on who supplies equipment.",
    "Wages are compensation; owner-operator revenue must still cover business costs.",
  ],
];
export default function Money() {
  const [index, setIndex] = useState(0);
  const s = moneySteps[index];
  return (
    <>
      <PageHead
        eyebrow="Follow the money"
        title="Who gets paid—and for what?"
        description="Click each participant. Money does not necessarily move as one simple pass-through payment; contracts and integrated operations differ."
      />
      <div className="money-flow" role="group" aria-label="Money participants">
        {moneySteps.map(([t], i) => (
          <button
            aria-pressed={i === index}
            key={t}
            onClick={() => setIndex(i)}
          >
            {t}
            <ArrowRight size={16} />
          </button>
        ))}
      </div>
      <section className="money-detail" aria-live="polite">
        <Badge kind="example">Illustrative service model</Badge>
        <h2>{s[0]}</h2>
        <div className="detail-grid">
          {[
            "Revenue source",
            "Pricing structure",
            "Major expenses",
            "Risk",
            "Capital requirements",
            "Margin mechanics",
          ].map((t, i) => (
            <div key={t}>
              <h3>{t}</h3>
              <p>{s[i + 1]}</p>
            </div>
          ))}
        </div>
      </section>
      <ButtonLink to="/tools/route">Build your own route model</ButtonLink>
      <ActionCenter ids={["break-even", "tax", "startup", "tour"]} />
    </>
  );
}
