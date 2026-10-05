import resourceData from "./resources.json";
import opportunityData from "./opportunities.json";
import journeyData from "./journey.json";
export interface Resource {
  id: string;
  title: string;
  publisher: string;
  creator?: string;
  url: string;
  type: string;
  classification: string;
  topic: string;
  description: string;
  credibility: string;
  publicationDate?: string;
  lastVerified: string;
  relevantLessonIds: string[];
}
export interface Lesson {
  id: string;
  number: number;
  title: string;
  body: string;
  example: string;
  action: string;
  implication: string;
  cost: string;
  diagram: string[];
  quiz: { question: string; answers: string[]; correct: number };
  resources: string[];
  reviewedAt: string;
  sections: { title: string; text: string }[];
}
export const opportunities = opportunityData;
export const journey = journeyData;
export const reviewedAt = "2026-10-04";
export const resources: Resource[] = resourceData;
export const parcelStat = {
  value: 23_100_000_000,
  year: 2025,
  sourceId: "parcel",
  day: 23_100_000_000 / 365,
  second: 23_100_000_000 / (365 * 86400),
};
export const glossary: Record<string, string> = {
  "3PL":
    "Third-party logistics: a business performing agreed logistics services for another business.",
  Carrier:
    "The business undertaking transportation under its operating arrangement.",
  Route:
    "A planned sequence of service stops; it is not automatically an asset you own.",
  Stop: "A service location or visit. One stop may have multiple packages.",
  Manifest: "A record listing shipments assigned to a movement or route.",
  POD: "Proof of delivery: the agreed record that documents a delivery handoff.",
  COI: "Certificate of insurance: a summary of coverage, not a replacement for the policy.",
  USDOT:
    "A federal identifier used for motor-carrier safety monitoring; applicability requires review.",
  "Operating Authority":
    "Registration permitting specified for-hire transportation activities when required.",
  Linehaul:
    "Transport of grouped shipments between facilities, often on a scheduled lane.",
  "Middle Mile":
    "Transportation connecting logistics facilities before final customer delivery.",
  "Final Mile":
    "The final delivery leg to the recipient; also called last mile.",
  "Owner-Operator":
    "An operator using their own or controlled equipment to perform transportation.",
  "Dedicated Route":
    "Service work planned around a particular customer or recurring operation; terms vary.",
  Overflow: "Work exceeding the primary operation’s available capacity.",
  "Cross-Dock":
    "A facility workflow transferring inbound goods to outbound movement with limited storage.",
  Fulfillment:
    "Preparing customer orders: locating items, picking, packing and shipping handoff.",
  WMS: "Warehouse management system: software managing inventory, locations and warehouse tasks.",
  TMS: "Transportation management system: software supporting transport planning and execution.",
  "Reverse Logistics":
    "Movement and processing of returned goods toward restock, repair or another authorized outcome.",
  SKU: "Stock-keeping unit: an identifier for a specific inventory item or variant.",
  "Contribution Margin":
    "Revenue left after variable costs, available to cover fixed costs and profit.",
  Deadhead:
    "Vehicle movement without a paying load; it still consumes time and money.",
};
export const nav = [
  {
    title: "How it works",
    links: [
      ["Follow a package", "/journey"],
      ["Follow the money", "/money"],
      ["Logistics glossary", "/glossary"],
    ],
  },
  {
    title: "Opportunities",
    links: [
      ["Find your lane", "/opportunities"],
      ["Compare business models", "/opportunities/compare"],
    ],
  },
  {
    title: "Last mile",
    links: [
      ["Carrier pathway", "/academy/carrier"],
      ["Vehicle center", "/vehicles"],
      ["Partner proposal", "/proposal"],
    ],
  },
  {
    title: "Start a business",
    links: [
      ["Start with what you have", "/start/start-small"],
      ["Business registration", "/start/business-registration"],
    ],
  },
  {
    title: "Money",
    links: [
      ["Who pays whom", "/money"],
      ["Route economics", "/tools/route"],
      ["Warehouse economics", "/tools/warehouse"],
    ],
  },
  {
    title: "Tools",
    links: [
      ["Route calculator", "/tools/route"],
      ["Warehouse simulator", "/tools/warehouse"],
      ["Business comparison", "/opportunities/compare"],
    ],
  },
  {
    title: "Academy",
    links: [
      ["Learning pathways", "/academy"],
      ["Carrier master course", "/academy/carrier"],
      ["Warehouse master course", "/academy/warehouse"],
      ["Your progress", "/progress"],
    ],
  },
  {
    title: "Resources",
    links: [
      ["All resources", "/resources"],
      ["Government center", "/resources/government"],
      ["Saved resources", "/progress"],
    ],
  },
  {
    title: "Partners",
    links: [
      ["Why last-mile logistics?", "/proposal"],
      ["Partner with us", "/partners"],
    ],
  },
];
export const pathways = [
  ["I just want to understand logistics.", "/journey"],
  ["I want to make money delivering.", "/opportunities/delivery-driver"],
  ["I want to use my current vehicle.", "/start/start-small"],
  ["I want to become an owner-operator.", "/opportunities/owner-operator"],
  ["I want to start a carrier.", "/academy/carrier"],
  ["I want to own multiple routes.", "/academy/carrier/carrier-24"],
  ["I want to build a fleet.", "/opportunities/fleet-operator"],
  ["I want to understand warehouses.", "/academy/warehouse"],
  [
    "I want to start a warehouse business.",
    "/opportunities/warehouse-operator",
  ],
  ["I want to become a 3PL.", "/opportunities/3pl"],
  ["I already own a business and need delivery capacity.", "/partners"],
];
