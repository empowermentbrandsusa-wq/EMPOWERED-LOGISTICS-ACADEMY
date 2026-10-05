import { useState } from "react";
import { useLocation } from "react-router-dom";
import { PageHead, Badge, ActionCenter, ButtonLink } from "../components/ui";
import {
  currency,
  routeDefaults,
  routeModel,
  warehouseDefaults,
  warehouseModel,
} from "../lib/models";
import type { RouteInputs, WarehouseInputs } from "../lib/models";
export default function Tools() {
  const slug = useLocation().pathname.split("/")[2];
  return (
    <div className="page-container">
      {slug === "warehouse" ? (
        <>
          <PageHead
            eyebrow="Warehouse startup simulator"
            title="Build a mock warehouse business."
            description="Estimate occupancy, staffing and service economics using your own quotes and assumptions."
          />
          <WarehouseCalculator />
        </>
      ) : slug === "route" ? (
        <>
          <PageHead
            eyebrow="Route economics"
            title="Revenue is only the beginning."
            description="Model one route over a month. Two hundred packages do not necessarily mean two hundred stops."
          />
          <RouteCalculator />
        </>
      ) : (
        <>
          <PageHead
            eyebrow="Tools"
            title="Model the decision."
            description="Use your assumptions to understand economics. These are educational models, not market quotes."
          />
          <ButtonLink to="/tools/route">Route calculator</ButtonLink>
          <ButtonLink to="/tools/warehouse">Warehouse simulator</ButtonLink>
        </>
      )}
      <ActionCenter ids={["break-even", "startup", "tax", "tour"]} />
    </div>
  );
}
function Input({
  label,
  value,
  onChange,
  max = 1000000,
  step = "any",
}: {
  label: string;
  value: number;
  onChange: (n: number) => void;
  max?: number;
  step?: string;
}) {
  return (
    <label>
      {label}
      <input
        type="number"
        min="0"
        max={max}
        step={step}
        value={Number.isNaN(value) ? "" : value}
        onChange={(e) =>
          onChange(e.target.value === "" ? NaN : Number(e.target.value))
        }
      />
    </label>
  );
}
function Results({ values }: { values: [string, string][] }) {
  return (
    <dl className="results">
      {values.map(([label, value]) => (
        <div key={label}>
          <dt>{label}</dt>
          <dd>{value}</dd>
        </div>
      ))}
    </dl>
  );
}
function pct(v: number | null) {
  return v === null ? "Not defined (zero revenue)" : `${(v * 100).toFixed(1)}%`;
}
function unit(v: number | null) {
  return v === null ? "Not defined (zero units)" : currency(v);
}
export function RouteCalculator() {
  const [v, setV] = useState<RouteInputs>(routeDefaults);
  const model = routeModel(v);
  const r = model.result;
  const set = (key: keyof RouteInputs, value: number) =>
    setV((prev) => ({ ...prev, [key]: value }));
  return (
    <section className="calculator">
      <div className="model-note">
        <Badge>EDUCATIONAL MODEL — NOT GUARANTEED EARNINGS</Badge>
        <p>
          All financial inputs start at zero. Enter actual offers and quotes.
          Sample package, stop, mileage and fuel-economy values demonstrate the
          controls; they are not typical market results.
        </p>
        <Badge kind="assumption">User assumptions</Badge>
      </div>
      <div className="calculator-layout">
        <div className="calculator-inputs">
          <fieldset>
            <legend>Service volume · per operating day</legend>
            <div className="input-grid">
              {(
                [
                  ["packages", "Packages / day"],
                  ["stops", "Stops / day"],
                  ["miles", "Total miles / day (include deadhead)"],
                  ["days", "Operating days / month"],
                ] as [keyof RouteInputs, string][]
              ).map(([k, l]) => (
                <Input
                  key={k}
                  label={l}
                  value={v[k]}
                  max={k === "days" ? 31 : 1000000}
                  step={["days", "packages", "stops"].includes(k) ? "1" : "any"}
                  onChange={(n) => set(k, n)}
                />
              ))}
            </div>
          </fieldset>
          <fieldset>
            <legend>Revenue and labor · per day</legend>
            <div className="input-grid">
              <Input
                label="Carrier compensation / day ($)"
                value={v.compensation}
                onChange={(n) => set("compensation", n)}
              />
              <Input
                label="Total loaded driver cost / day ($)"
                value={v.driver}
                onChange={(n) => set("driver", n)}
              />
            </div>
            <p className="small">
              Use effective revenue from billable units. Include owner labor,
              payroll burdens and loading/return time in driver cost.
            </p>
          </fieldset>
          <fieldset>
            <legend>Fuel and maintenance</legend>
            <div className="input-grid">
              {(
                [
                  ["fuelPrice", "Fuel price / gallon ($)"],
                  ["mpg", "Fuel economy (MPG)"],
                  ["maintenance", "Maintenance reserve / mile ($)"],
                ] as [keyof RouteInputs, string][]
              ).map(([k, l]) => (
                <Input
                  key={k}
                  label={l}
                  value={v[k]}
                  onChange={(n) => set(k, n)}
                />
              ))}
            </div>
          </fieldset>
          <fieldset>
            <legend>Monthly allocated costs</legend>
            <div className="input-grid">
              {(
                [
                  ["vehicle", "Vehicle allocation ($ / month)"],
                  ["insurance", "Insurance allocation ($ / month)"],
                  ["technology", "Technology ($ / month)"],
                  ["admin", "Administration & other ($ / month)"],
                ] as [keyof RouteInputs, string][]
              ).map(([k, l]) => (
                <Input
                  key={k}
                  label={l}
                  value={v[k]}
                  onChange={(n) => set(k, n)}
                />
              ))}
            </div>
            <p className="small">
              Use one consistent cash or economic-cost basis. Avoid counting the
              same lease/payment and depreciation twice.
            </p>
          </fieldset>
          <button
            className="button secondary"
            onClick={() => setV(routeDefaults)}
          >
            Reset assumptions
          </button>
        </div>
        <div
          className="calculator-output"
          aria-live="polite"
          aria-atomic="true"
        >
          <p className="eyebrow">Monthly modeled result</p>
          {model.errors.length ? (
            <div role="alert">
              <h2>Check your inputs</h2>
              <ul>
                {model.errors.map((e) => (
                  <li key={e}>{e}</li>
                ))}
              </ul>
            </div>
          ) : (
            r && (
              <>
                <h2 className={r.profit < 0 ? "negative" : ""}>
                  {currency(r.profit)}
                </h2>
                <p>Modeled operating income · before income tax</p>
                <Results
                  values={[
                    ["Revenue", currency(r.revenue)],
                    ["Driver cost", currency(r.driver)],
                    ["Fuel", currency(r.fuel)],
                    ["Vehicle allocation", currency(v.vehicle)],
                    ["Insurance allocation", currency(v.insurance)],
                    ["Maintenance reserve", currency(r.maintenance)],
                    ["Technology", currency(v.technology)],
                    ["Administration", currency(v.admin)],
                    ["Total operating cost", currency(r.cost)],
                    ["Operating margin", pct(r.margin)],
                    [
                      "Break-even revenue at this volume",
                      currency(r.breakEvenRevenue),
                    ],
                    [
                      "Break-even operating days",
                      r.breakEvenDays === null
                        ? "Not defined without positive daily contribution"
                        : `${r.breakEvenDays.toFixed(1)}${r.breakEvenDays > 31 ? " — exceeds this monthly model" : ""}`,
                    ],
                    ["Revenue / package", unit(r.revenuePackage)],
                    ["Revenue / stop", unit(r.revenueStop)],
                    ["Cost / stop", unit(r.costStop)],
                    ["Operating income / stop", unit(r.profitStop)],
                  ]}
                />
              </>
            )
          )}
          <p className="small">
            A reserve is a planning allowance. This model excludes financing
            structure, income taxes and detailed invoice timing. Cash flow and
            take-home pay can differ.
          </p>
        </div>
      </div>
      <details className="formula-notes">
        <summary>Inspect the formulas and assumptions</summary>
        <p>
          Revenue = daily carrier compensation × days. Fuel = total miles × days
          ÷ MPG × price per gallon. Maintenance reserve = miles × days × reserve
          per mile. Cost = labor + fuel + reserve + monthly allocations.
          Operating income = revenue − cost. Margin = operating income ÷
          revenue.
        </p>
        <p>
          Break-even days = monthly fixed allocations ÷ (daily compensation −
          daily variable cost), only when daily contribution is positive. Zero
          denominators produce “not defined,” not fabricated results. Fixed
          allocations remain due at zero operating days.
        </p>
      </details>
    </section>
  );
}
export function WarehouseCalculator() {
  const [v, setV] = useState<WarehouseInputs>(warehouseDefaults);
  const model = warehouseModel(v);
  const r = model.result;
  const set = (key: keyof WarehouseInputs, n: number) =>
    setV((prev) => ({ ...prev, [key]: n }));
  return (
    <section className="calculator">
      <div className="model-note">
        <Badge>EDUCATIONAL MODEL — NOT GUARANTEED EARNINGS</Badge>
        <p>
          Enter your facility quote and service assumptions. Rent uses an annual
          price per square foot; all other recurring allocations are monthly.
          Separate one-time setup cash from operating expenses.
        </p>
        <Badge kind="assumption">User assumptions</Badge>
      </div>
      <div className="calculator-layout">
        <div className="calculator-inputs">
          <fieldset>
            <legend>Space and people</legend>
            <div className="input-grid">
              {(
                [
                  ["sqft", "Square footage"],
                  ["annualRent", "Base rent ($ / sq ft / year)"],
                  ["employees", "Employee count"],
                  ["loadedPay", "Loaded monthly cost per employee ($)"],
                ] as [keyof WarehouseInputs, string][]
              ).map(([k, l]) => (
                <Input
                  key={k}
                  label={l}
                  value={v[k]}
                  step={k === "employees" ? "1" : "any"}
                  onChange={(n) => set(k, n)}
                />
              ))}
            </div>
            <p className="small">
              Include applicable benefits and payroll costs in loaded pay. Add
              common-area, taxes and pass-through charges below if not included
              in rent.
            </p>
          </fieldset>
          <fieldset>
            <legend>Monthly fixed costs / allocations</legend>
            <div className="input-grid">
              {(
                [
                  ["utilities", "Utilities ($)"],
                  ["insurance", "Insurance ($)"],
                  ["racking", "Racking lease / allocation ($)"],
                  ["equipment", "Equipment lease / allocation ($)"],
                  ["software", "Software ($)"],
                  ["security", "Security ($)"],
                  ["vehicles", "Vehicles ($)"],
                  ["other", "Other / occupancy charges ($)"],
                ] as [keyof WarehouseInputs, string][]
              ).map(([k, l]) => (
                <Input
                  key={k}
                  label={l}
                  value={v[k]}
                  onChange={(n) => set(k, n)}
                />
              ))}
            </div>
          </fieldset>
          <fieldset>
            <legend>Service economics</legend>
            <div className="input-grid">
              <Input
                label="Monthly revenue assumption ($)"
                value={v.revenue}
                onChange={(n) => set("revenue", n)}
              />
              <Input
                label="Variable expense share of revenue (%)"
                value={v.variablePercent}
                max={100}
                onChange={(n) => set("variablePercent", n)}
              />
              <Input
                label="One-time setup cash ($)"
                value={v.startup}
                onChange={(n) => set("startup", n)}
              />
            </div>
            <p className="small">
              Variable expense share may include order-related packaging,
              handling or subcontract costs. Do not count costs already included
              above twice.
            </p>
          </fieldset>
          <button
            className="button secondary"
            onClick={() => setV(warehouseDefaults)}
          >
            Reset assumptions
          </button>
        </div>
        <div
          className="calculator-output"
          aria-live="polite"
          aria-atomic="true"
        >
          <p className="eyebrow">Monthly modeled result</p>
          {model.errors.length ? (
            <div role="alert">
              <h2>Check your inputs</h2>
              <ul>
                {model.errors.map((e) => (
                  <li key={e}>{e}</li>
                ))}
              </ul>
            </div>
          ) : (
            r && (
              <>
                <h2 className={r.profit < 0 ? "negative" : ""}>
                  {currency(r.profit)}
                </h2>
                <p>Modeled operating profit · before income tax</p>
                <Results
                  values={[
                    ["Monthly base rent", currency(r.rent)],
                    ["Monthly labor", currency(r.labor)],
                    ["Monthly fixed cost", currency(r.fixed)],
                    ["Variable cost at assumed revenue", currency(r.variable)],
                    [
                      "Break-even monthly revenue",
                      r.breakEven === null
                        ? "No positive contribution at 100% variable expense"
                        : currency(r.breakEven),
                    ],
                    ["Operating margin", pct(r.margin)],
                    ["Separate one-time setup cash", currency(r.startup)],
                  ]}
                />
              </>
            )
          )}
          <p className="small">
            This is a simplified contribution model. It assumes the variable
            cost percentage is stable. It excludes inventory ownership, detailed
            billing mix, financing and cash collection timing.
          </p>
        </div>
      </div>
      <details className="formula-notes">
        <summary>Inspect the formulas and assumptions</summary>
        <p>
          Monthly rent = square feet × annual rent per square foot ÷ 12. Labor =
          employee count × loaded monthly pay. Fixed cost = rent + labor +
          monthly allocations. Variable cost = revenue × variable percentage.
          Break-even revenue = fixed cost ÷ (1 − variable percentage). Operating
          profit = revenue − fixed cost − variable cost. One-time setup cash is
          displayed separately and is not a monthly expense.
        </p>
      </details>
    </section>
  );
}
