import { describe, it, expect } from "vitest";
import {
  routeDefaults,
  routeModel,
  warehouseDefaults,
  warehouseModel,
} from "../src/lib/models";
import { search } from "../src/lib/search";
describe("route accounting", () => {
  it("reconciles an independently calculated monthly example", () => {
    const { result: r } = routeModel({
      ...routeDefaults,
      days: 20,
      miles: 100,
      mpg: 20,
      fuelPrice: 4,
      compensation: 400,
      driver: 200,
      maintenance: 0.1,
      vehicle: 600,
      insurance: 200,
      technology: 100,
      admin: 100,
    });
    expect(r).toMatchObject({
      revenue: 8000,
      driver: 4000,
      fuel: 400,
      maintenance: 200,
      fixed: 1000,
      cost: 5600,
      profit: 2400,
      margin: 0.3,
      breakEvenRevenue: 5600,
      revenuePackage: 2,
      revenueStop: 8000 / 3000,
      costStop: 5600 / 3000,
      profitStop: 0.8,
    });
    expect(r!.breakEvenDays).toBeCloseTo(1000 / 170);
  });
  it("keeps fixed costs when idle and avoids undefined division", () => {
    const { result: r } = routeModel({
      ...routeDefaults,
      days: 0,
      vehicle: 500,
    });
    expect(r!.cost).toBe(500);
    expect(r!.profit).toBe(-500);
    expect(r!.revenuePackage).toBeNull();
    expect(r!.margin).toBeNull();
    expect(r!.breakEvenDays).toBeNull();
  });
  it.each([-1, NaN, Infinity, 1000001])("rejects unsafe input %s", (n) =>
    expect(routeModel({ ...routeDefaults, compensation: n }).result).toBeNull(),
  );
  it("rejects impossible fuel denominator and invalid unit counts", () => {
    expect(
      routeModel({ ...routeDefaults, mpg: 0 }).errors.length,
    ).toBeGreaterThan(0);
    expect(routeModel({ ...routeDefaults, days: 32 }).result).toBeNull();
    expect(routeModel({ ...routeDefaults, packages: 2.5 }).result).toBeNull();
    expect(routeModel({ ...routeDefaults, stops: 0 }).result).toBeNull();
  });
  it("models losses without hiding negative results", () =>
    expect(
      routeModel({ ...routeDefaults, compensation: 50, driver: 100 }).result!
        .profit,
    ).toBe(-1100));
});
describe("warehouse model", () => {
  it("uses annual rent and contribution-margin break-even correctly", () => {
    const { result: r } = warehouseModel({
      ...warehouseDefaults,
      sqft: 1200,
      annualRent: 12,
      employees: 2,
      loadedPay: 3000,
      utilities: 500,
      insurance: 300,
      racking: 100,
      equipment: 200,
      software: 100,
      security: 100,
      vehicles: 200,
      other: 100,
      revenue: 15000,
      variablePercent: 20,
      startup: 25000,
    });
    expect(r).toMatchObject({
      rent: 1200,
      labor: 6000,
      fixed: 8800,
      variable: 3000,
      profit: 3200,
      breakEven: 11000,
      startup: 25000,
    });
  });
  it("does not fabricate break-even at 100% variable expense", () =>
    expect(
      warehouseModel({ ...warehouseDefaults, variablePercent: 100 }).result!
        .breakEven,
    ).toBeNull());
  it("rejects impossible values and fractional employees", () => {
    expect(
      warehouseModel({ ...warehouseDefaults, variablePercent: 101 }).result,
    ).toBeNull();
    expect(
      warehouseModel({ ...warehouseDefaults, employees: 1.2 }).result,
    ).toBeNull();
    expect(
      warehouseModel({ ...warehouseDefaults, sqft: -1 }).result,
    ).toBeNull();
  });
});
describe("beginner search", () => {
  it("finds route procurement for a natural question", () =>
    expect(
      search("How do I get a route?")
        .slice(0, 10)
        .some((e) => e.title === "Finding routes"),
    ).toBe(true));
  it("finds relevant personal-vehicle guidance", () =>
    expect(
      search("Can I use my SUV?").some((e) => e.url === "/start/start-small"),
    ).toBe(true));
  it("treats hostile search text as text, without executing or inventing results", () => {
    expect(search("<script>alert(1)</script>")).toEqual([]);
    expect(search("")).toEqual([]);
  });
});
