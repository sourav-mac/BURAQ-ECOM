export interface NavItem {
  label: string;
  href: string;
  children?: {
    label: string;
    href: string;
    description?: string;
  }[];
}

export const NAV_LINKS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Products", href: "/products" },
  { label: "Manpower Supply", href: "/services/manpower-supply" },
  { label: "Why BURAQ", href: "/why-buraq" },
];

export const COMPANY_INFO = {
  name: "BURAQ ENTERPRISE",
  brandName: "BURAQ",
  tagline: "LIGHTING • SOLAR COMPONENTS • ELECTRICAL PRODUCTS • TECHNICAL MANPOWER",
  positioningHeadline: "Lighting, Solar & Electrical Products for Business",
  shortDesc:
    "BURAQ Enterprise showcases lighting solutions, solar components, and electrical products for business and project requirements. Contact our team to discuss product availability, specifications, and supply enquiries.",
  primaryEmail: "buraq.ep@gmail.com",
  supportEmails: ["info@buraq.in", "account@buraq.in", "buraq.admin@gmail.com"],
  emails: {
    primary: "buraq.ep@gmail.com",
    general: "info@buraq.in",
    accounts: "account@buraq.in",
    admin: "buraq.admin@gmail.com",
  },
  departmentEmails: [
    { label: "Product & Sales Enquiries", email: "buraq.ep@gmail.com", role: "Product availability & quotations" },
    { label: "General Inquiries", email: "info@buraq.in", role: "Information & overview" },
    { label: "Accounts & Commercials", email: "account@buraq.in", role: "Billing & commercial documents" },
    { label: "Administration", email: "buraq.admin@gmail.com", role: "Administrative & operational support" },
  ],
  phone: "+91 XXXXX XXXXX",
  whatsappUrl: "#",
  locations: {
    kolkata: {
      title: "Kolkata Office",
      address: "Poddar Court, Gate No. 3, 3rd Floor, Kolkata – 700001",
      mapsUrl: "https://maps.app.goo.gl/TvcqaEw6sUdEQc7U6",
    },
    domkal: {
      title: "Registered Office",
      address: "Joyrampur, Domkal, Murshidabad, West Bengal – 742303",
      mapsUrl: "https://maps.app.goo.gl/tEAEmQEPYrsJvfjN7",
    },
  },
  productPillars: [
    {
      id: "lighting-products",
      number: "01",
      title: "Lighting Products",
      slug: "lighting",
      href: "/products/lighting",
      tagline: "LED Panels • High Bays • Downlights • Floodlights",
      shortDesc: "Commercial and industrial LED lighting luminaires designed for office ceilings, factories, warehouses, and perimeter illumination.",
      categories: ["LED Panels", "High Bay Luminaires", "Downlights", "Floodlights", "Streetlights"],
      bulletPoints: [
        "Commercial 2x2 & Slim LED Panel Lights",
        "Industrial Die-Cast LED High Bay Fixtures",
        "Weatherproof Outdoor Floodlights & Streetlights",
        "Recessed Architectural LED Downlights & Battens",
      ],
      iconName: "Lightbulb",
      image: "https://images.unsplash.com/photo-1565814636199-ae8133055c1c?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: "solar-components",
      number: "02",
      title: "Solar Components",
      slug: "solar",
      href: "/products/solar",
      tagline: "PV Modules • Inverters • DC Cables • Structures",
      shortDesc: "Solar energy components including photovoltaic modules, on-grid inverters, 1.5kV DC cables, MC4 connectors, and mounting structures.",
      categories: ["Solar PV Modules", "Solar Inverters", "1.5kV DC Cables", "Mounting Structures", "DCDB & ACDB"],
      bulletPoints: [
        "High-Efficiency Mono PERC & Bifacial PV Panels",
        "On-Grid & Hybrid String Inverters with Remote Monitoring",
        "1.5kV Cross-Linked XLPO DC Solar Cables & MC4s",
        "Aluminum & HDG Mounting Rails, Clamps & Fasteners",
      ],
      iconName: "Sun",
      image: "https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: "electrical-products",
      number: "03",
      title: "Electrical Products",
      slug: "electrical",
      href: "/products/electrical",
      tagline: "Power Cables • Switchgear • Circuit Breakers",
      shortDesc: "Heavy electrical infrastructure products including armoured power cables, switchgear, MCBs, MCCBs, distribution boards, and wiring accessories.",
      categories: ["Power Cables", "Switchgear & Breakers", "Switches & Sockets", "Distribution Boards"],
      bulletPoints: [
        "Armoured & Unarmoured XLPE/PVC Power Cables",
        "Industrial MCBs, MCCBs & Overload Protection",
        "Power Contactors, Motor Starters & Isolators",
        "Modular Distribution Boards & Containment Trays",
      ],
      iconName: "Zap",
      image: "/images/electrical-trading.jpg",
    },
  ],
  secondaryService: {
    id: "manpower-supply",
    title: "Technical Manpower Supply",
    href: "/services/manpower-supply",
    tagline: "Engineers, Technical Workers & Helpers",
    shortDesc: "Verified technical workforce and industrial helpers deployed to support manufacturing, plant shutdowns, and on-site engineering projects.",
  },
  workflow: [
    {
      step: "01",
      title: "Requirement Review",
      desc: "Detailed review of your lighting schedule, solar BOQ, or electrical product specifications.",
    },
    {
      step: "02",
      title: "Specification Sourcing",
      desc: "Verifying product availability, batch compliance, and technical data sheets with manufacturers.",
    },
    {
      step: "03",
      title: "Commercial Quote & Dispatch",
      desc: "Providing transparent offline quotes and coordinated staged delivery to your facility or project site.",
    },
    {
      step: "04",
      title: "Dedicated Supply Support",
      desc: "Dedicated communication, documentation assistance, and responsive coordination for ongoing project supplies.",
    },
  ],
  coreValues: [
    {
      title: "Factual Specifications",
      description: "Clear, verifiable product specifications without misleading claims or unverified ratings.",
    },
    {
      title: "Commercial Reliability",
      description: "Dependable offline supply coordination, prompt responses, and structured handling of project enquiries.",
    },
    {
      title: "Project Focus",
      description: "Understanding industrial and contractor needs to provide practical product solutions tailored to real project timelines.",
    },
  ],
};
