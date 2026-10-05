export const currency = (n: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(n);
export const ratio = (a: number, b: number): number | null =>
  b > 0 ? a / b : null;
export const MAX_INPUT = 1_000_000;
export const validate = (values: Record<string, number>) =>
  Object.entries(values).flatMap(([key, value]) =>
    !Number.isFinite(value) || value < 0 || value > MAX_INPUT
      ? [
          `${key}: enter a finite value from 0 to ${MAX_INPUT.toLocaleString()}.`,
        ]
      : [],
  );
export interface RouteInputs {
  packages: number;
  stops: number;
  miles: number;
  days: number;
  compensation: number;
  driver: number;
  fuelPrice: number;
  mpg: number;
  vehicle: number;
  insurance: number;
  maintenance: number;
  technology: number;
  admin: number;
}
export const routeDefaults: RouteInputs = {
  packages: 200,
  stops: 150,
  miles: 90,
  days: 22,
  compensation: 0,
  driver: 0,
  fuelPrice: 0,
  mpg: 20,
  vehicle: 0,
  insurance: 0,
  maintenance: 0,
  technology: 0,
  admin: 0,
};
export function routeModel(v: RouteInputs) {
  const errors = validate({ ...v });
  if (v.days > 31)
    errors.push("Operating days must be at most 31 for this monthly model.");
  if (
    !Number.isInteger(v.days) ||
    !Number.isInteger(v.packages) ||
    !Number.isInteger(v.stops)
  )
    errors.push("Days, packages and stops must be whole numbers.");
  if (v.miles > 0 && v.mpg === 0)
    errors.push(
      "Fuel economy must be greater than zero when miles are driven.",
    );
  if (v.packages > 0 && v.stops === 0)
    errors.push("Enter at least one stop when packages are delivered.");
  if (errors.length) return { errors, result: null };
  const revenue = v.compensation * v.days,
    driver = v.driver * v.days;
  const fuel = v.mpg > 0 ? ((v.miles * v.days) / v.mpg) * v.fuelPrice : 0;
  const maintenance = v.miles * v.days * v.maintenance;
  const fixed = v.vehicle + v.insurance + v.technology + v.admin;
  const cost = driver + fuel + maintenance + fixed,
    profit = revenue - cost;
  const contribution =
    v.compensation -
    v.driver -
    (v.mpg > 0 ? (v.miles / v.mpg) * v.fuelPrice : 0) -
    v.miles * v.maintenance;
  return {
    errors,
    result: {
      revenue,
      driver,
      fuel,
      maintenance,
      fixed,
      cost,
      profit,
      margin: ratio(profit, revenue),
      breakEvenRevenue: cost,
      breakEvenDays: contribution > 0 ? fixed / contribution : null,
      revenuePackage: ratio(revenue, v.packages * v.days),
      revenueStop: ratio(revenue, v.stops * v.days),
      costStop: ratio(cost, v.stops * v.days),
      profitStop: ratio(profit, v.stops * v.days),
    },
  };
}
export interface WarehouseInputs {
  sqft: number;
  annualRent: number;
  utilities: number;
  employees: number;
  loadedPay: number;
  insurance: number;
  racking: number;
  equipment: number;
  software: number;
  security: number;
  vehicles: number;
  other: number;
  variablePercent: number;
  revenue: number;
  startup: number;
}
export const warehouseDefaults: WarehouseInputs = {
  sqft: 2000,
  annualRent: 0,
  utilities: 0,
  employees: 0,
  loadedPay: 0,
  insurance: 0,
  racking: 0,
  equipment: 0,
  software: 0,
  security: 0,
  vehicles: 0,
  other: 0,
  variablePercent: 0,
  revenue: 0,
  startup: 0,
};
export function warehouseModel(v: WarehouseInputs) {
  const errors = validate({ ...v });
  if (v.variablePercent > 100)
    errors.push("Variable expense share must be between 0% and 100%.");
  if (!Number.isInteger(v.employees))
    errors.push("Employees must be a whole number.");
  if (errors.length) return { errors, result: null };
  const rent = (v.sqft * v.annualRent) / 12,
    labor = v.employees * v.loadedPay;
  const fixed =
    rent +
    labor +
    v.utilities +
    v.insurance +
    v.racking +
    v.equipment +
    v.software +
    v.security +
    v.vehicles +
    v.other;
  const variable = (v.revenue * v.variablePercent) / 100,
    profit = v.revenue - fixed - variable;
  return {
    errors,
    result: {
      rent,
      labor,
      fixed,
      variable,
      profit,
      breakEven:
        v.variablePercent < 100 ? fixed / (1 - v.variablePercent / 100) : null,
      startup: v.startup,
      margin: ratio(profit, v.revenue),
    },
  };
}
