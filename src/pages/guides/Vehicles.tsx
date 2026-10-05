import { PageHead, ActionCenter } from "../../components/ui";
import { vehicles } from "../../data/vehicles";
import Checklist from "./Checklist";
export default function Vehicles() {
  return (
    <>
      <PageHead
        eyebrow="Vehicle center"
        title="Choose for the work. Verify the fit."
        description="Compare vehicle classes without assuming every vehicle qualifies. Exact payload, dimensions, insurance and client acceptance require the specific vehicle and contract."
      />
      <div
        className="table-scroll"
        tabIndex={0}
        aria-label="Scrollable vehicle comparison"
      >
        <table>
          <caption>
            Qualitative vehicle comparison · no universal specification
          </caption>
          <thead>
            <tr>
              <th scope="col">Vehicle</th>
              {[
                "Cargo / payload",
                "Route fit",
                "Fuel / ownership",
                "Maneuvering / parking",
                "Maintenance",
                "Rental",
              ].map((t) => (
                <th scope="col" key={t}>
                  {t}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {vehicles.map((v) => (
              <tr key={v.name}>
                <th scope="row">{v.name}</th>
                <td>
                  {v.space} {v.payload}
                </td>
                <td>{v.suitability}</td>
                <td>
                  {v.fuel} {v.cost}
                </td>
                <td>{v.handling}</td>
                <td>{v.maintenance}</td>
                <td>{v.rental}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <section className="action-strip">
        <h2>Before choosing any vehicle</h2>
        <Checklist
          items={[
            "Get the exact payload rating and usable dimensions.",
            "Verify expected package types, service volume and loading access.",
            "Confirm the contracting company accepts the specific vehicle.",
            "Disclose delivery use to the insurer and check exclusions.",
            "For rentals, verify commercial-use terms, mileage, cargo restrictions and authorized drivers.",
          ]}
        />
      </section>
      <ActionCenter ids={["dot", "insurance", "authority", "sba", "tour"]} />
    </>
  );
}
