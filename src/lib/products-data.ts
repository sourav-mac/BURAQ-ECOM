export interface ProductItem {
  id: string;
  name: string;
  category: "lighting" | "solar" | "electrical";
  categoryName: string;
  shortDesc: string;
  description: string;
  image: string;
  specifications?: string[];
  applications?: string[];
  featured?: boolean;
}

export interface ProductCategory {
  id: "lighting" | "solar" | "electrical";
  name: string;
  slug: string;
  headline: string;
  description: string;
  image: string;
  itemCountLabel: string;
  examples: string[];
}

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  {
    id: "lighting",
    name: "Lighting Products",
    slug: "lighting",
    headline: "Commercial & Industrial Lighting Solutions",
    description:
      "Energy-efficient LED lighting systems engineered for offices, commercial complexes, warehouses, industrial floors, and outdoor facilities.",
    image: "/images/products/lighting-fixtures-category.jpg",
    itemCountLabel: "LED Bulbs, Panels, Downlights & Fixtures",
    examples: [
      "Commercial LED Panel Lights",
      "Recessed & Surface Downlights",
      "Industrial High Bay Lights",
      "Outdoor Floodlights & Security Lights",
      "Streetlights & Pole Fixtures",
      "Standard & High-Lumen LED Bulbs",
    ],
  },
  {
    id: "solar",
    name: "Solar Components",
    slug: "solar",
    headline: "Photovoltaic Modules & Balance of System Components",
    description:
      "Solar hardware including PV panels, on-grid and hybrid inverters, DC cabling, connectors, and mounting structures for rooftop and commercial solar installations.",
    image: "/images/products/solar-components-category.png",
    itemCountLabel: "PV Modules, Inverters, DC Cables & Mounting Hardware",
    examples: [
      "Mono PERC & Bifacial Solar PV Modules",
      "On-Grid & Hybrid String Inverters",
      "1.5kV DC Cross-Linked Solar Cables",
      "Standard IP68 MC4 Connectors & Splitters",
      "Aluminum & HDG Solar Mounting Structures",
      "DCDB & ACDB Array Protection Hardware",
    ],
  },
  {
    id: "electrical",
    name: "Electrical Products",
    slug: "electrical",
    headline: "Power Cables, Switchgear & Industrial Distribution",
    description:
      "Essential electrical infrastructure products for commercial buildings, manufacturing units, electrical contractors, and infrastructure projects.",
    image: "/images/products/electrical-products-category.png",
    itemCountLabel: "Power Cables, Switchgear, Breakers & Accessories",
    examples: [
      "Armoured & Unarmoured Power Cables",
      "Industrial Circuit Breakers (MCBs & MCCBs)",
      "Industrial Switches & Sockets",
      "Contactors, Relays & Isolators",
      "Modular Distribution Boards & Enclosures",
      "Cable Trays, Conduits & Wiring Accessories",
    ],
  },
];

export const PRODUCTS_CATALOGUE: ProductItem[] = [
  // --- LIGHTING PRODUCTS ---
  {
    id: "luxury-pendant-chandelier",
    name: "Vintage Rope & Designer Geometric Pendants",
    category: "lighting",
    categoryName: "Lighting Products",
    shortDesc: "Natural jute rope beam suspension, vintage Edison filament teardrop bulbs, and geometric matte black cage fixtures.",
    description:
      "Artisan rustic and vintage hanging pendant luminaires crafted with thick hand-wrapped natural jute rope, warm teardrop Edison filament lamps, and matte black geometric cube cages. Designed for statement illumination in double-height living spaces, dining areas, stairwells, and boutique cafes.",
    image: "/images/products/luxury-pendant-chandelier.jpg",
    specifications: [
      "Suspension: Hand-wrapped natural jute rope with solid timber beam",
      "Lamps: Vintage teardrop Edison filament bulbs (Warm 2200K–2700K)",
      "Shades: Matte-black geometric steel cages & slatted timber diffusers",
      "Application: Double-height dining spaces, cafes, and architectural interiors",
    ],
    applications: [
      "Luxury residential villas, duplexes, and living spaces",
      "Hotel receptions, boutique lobbies, and executive lounges",
      "Modern dining spaces, cafes, and architectural interiors",
    ],
    featured: true,
  },
  {
    id: "crystal-art-chandeliers",
    name: "Royal Golden Tiered Crystal Chandeliers",
    category: "lighting",
    categoryName: "Lighting Products",
    shortDesc: "Opulent tiered crystal prism chandeliers, fluted gold drum crowns, and multi-faceted crystal drops.",
    description:
      "Grand statement crystal chandeliers engineered with an electroplated fluted golden crown rim, multi-tier precision-cut optical crystal prisms, and faceted crystal droplet accents for high-ceilinged focal points and luxury reception centerpieces.",
    image: "/images/products/crystal-art-chandeliers.jpg",
    specifications: [
      "Design: Multi-tier cascade with fluted golden crown band",
      "Crystal Grade: High-clarity optical glass crystal prisms & facet drops",
      "Control: Multi-tone ambient warm and cool CCT modes",
      "Mounting: Reinforced heavy-duty ceiling base plate & suspension",
    ],
    applications: [
      "Banquet halls, luxury wedding venues, and hotel ballrooms",
      "Premium retail showrooms, jewelry stores, and galleries",
      "Grand residential drawing rooms and luxury penthouses",
    ],
    featured: true,
  },
  {
    id: "antique-brass-lanterns",
    name: "Antique Brass Filigree & Moroccan Lanterns",
    category: "lighting",
    categoryName: "Lighting Products",
    shortDesc: "Handcrafted Moroccan-style pierced metal lanterns, embedded crystal facets, and ambient accent lights.",
    description:
      "Artisan-crafted antique brass decorative hanging lanterns featuring intricate geometric lattice patterns, faceted crystal beads, and textured glass crackle globes that project warm patterned ambient shadow-play.",
    image: "/images/products/antique-brass-lanterns.jpg",
    specifications: [
      "Material: Handcrafted pierced brass with crystal bead inlays",
      "Aesthetic: Moroccan, Turkish, and vintage heritage lanterns",
      "Optics: Intricate shadow-casting patterned ambient glow",
      "Mounting: Vintage brass chain & hook suspension",
    ],
    applications: [
      "Heritage villas, themed cafes, and boutique restaurants",
      "Decorative corner accents, balconies, and indoor verandas",
      "Festival, cultural, and ambient architectural spaces",
    ],
    featured: true,
  },
  {
    id: "festive-decorative-lanterns",
    name: "Festive & Celebration Decorative Lights",
    category: "lighting",
    categoryName: "Lighting Products",
    shortDesc: "Vibrant multi-colored festive string lights, celebration luminaires, and architectural decorative lights.",
    description:
      "Vibrant multi-colored celebration luminaires, modern glowing ribbon rings, colorful accent drops, and decorative lighting sets designed for festivals, commercial facades, wedding decor, and architectural celebrations.",
    image: "/images/products/festive-decorative-lanterns.jpg",
    specifications: [
      "Design: High-density multi-colored LED rice string arrays & ribbon lights",
      "Lighting Modes: Multi-spectrum steady and sequential twinkle glow",
      "Installation: Plug-and-play flexible wire hanging arrangement",
      "Application: Festival installations, retail facades, and celebratory themes",
    ],
    applications: [
      "Commercial festive installations and shopping mall decor",
      "Diwali, Eid, and seasonal festival street lighting",
      "Event staging, banquet lawns, and festive celebrations",
    ],
    featured: false,
  },
  {
    id: "commercial-downlights",
    name: "Architectural Spotlights & COB Downlights",
    category: "lighting",
    categoryName: "Lighting Products",
    shortDesc: "Recessed COB spotlights, anti-glare dark-reflector modules, and linear wall-washers with external isolated drivers.",
    description:
      "Precision commercial architectural recessed luminaires including swivel COB spotlights, square multi-cell dark-reflector anti-glare modules, and linear extruded heatsink wall-washers. Engineered with faceted low-glare optics, dedicated external isolated constant-current drivers, quick-snap DC connectors, and spring-retention clips for false ceilings and display cases.",
    image: "/images/products/commercial-downlights.png",
    specifications: [
      "Optics: Low-glare faceted reflector lenses & dark-light cell louvres",
      "Form Factors: Round swivel COB spots, square anti-glare modules & linear wall-washers",
      "Driver: External isolated constant-current driver with quick-connect DC plug",
      "Mounting: Heavy-duty spring-loaded tension clips for cutouts & showcases",
    ],
    applications: [
      "Retail showcases, jewelry counters, and boutique display niches",
      "Architectural accent walls, art galleries, and texture grazing",
      "Hotel corridors, executive reception foyers, and modern commercial ceilings",
    ],
    featured: false,
  },
  {
    id: "ceremonial-diya-chandeliers",
    name: "Royal Brass Diya Chandeliers & Ceremonial Luminaires",
    category: "lighting",
    categoryName: "Lighting Products",
    shortDesc: "Antique brass multi-tier scrollwork chandeliers, textured amber glass diya shades, and faceted crystal pendeloques.",
    description:
      "Heritage ceremonial illumination sourced from Kolkata's Ezra Street wholesale lighting hub. Features multi-tier antique brass scrollwork chandeliers with textured amber glass diya-style shades, golden armature detailing, and sparkling crystal drops for luxury residences, banquet entrances, and cultural festivities.",
    image: "/images/products/festive-diyas-chandeliers.jpg",
    specifications: [
      "Fixtures: Multi-tier antique brass chandelier with scrolled armatures",
      "Glassware: Textured amber crystal-fluted diya diffuser cups",
      "Crystal Drops: Precision-faceted optical crystal pendeloques",
      "Sourcing: Wholesale project supply from Kolkata Ezra Street market",
    ],
    applications: [
      "Diwali, Durga Puja, Eid, and cultural festival decor",
      "Wedding mandaps, banquet entranceways, and stage setups",
      "Hotel atriums, heritage venues, and celebration pavilions",
    ],
    featured: false,
  },

  // --- SOLAR COMPONENTS ---
  {
    id: "solar-pv-modules",
    name: "Mono PERC & Bifacial Solar PV Modules",
    category: "solar",
    categoryName: "Solar Components",
    shortDesc: "High-efficiency monocrystalline solar panels for commercial, industrial, and contractor projects.",
    description:
      "High-power monocrystalline solar photovoltaic modules engineered with half-cut cell technology and dual-glass bifacial options for commercial and industrial rooftops and ground plants.",
    image: "/images/products/solar-pv-modules.jpg",
    specifications: [
      "Cell Type: Monocrystalline Half-Cut / Bifacial Dual-Glass",
      "Frame: Anodized corrosion-resistant aluminum alloy",
      "Glass: Anti-reflective tempered solar glass",
      "Junction Box: IP68 rated with integrated bypass diodes",
    ],
    applications: [
      "Factory, warehouse, and commercial rooftop solar installations",
      "Commercial solar EPC projects and contractor procurement",
      "Captive solar installations for manufacturing units",
    ],
    featured: true,
  },
  {
    id: "solar-inverters",
    name: "On-Grid & Hybrid Solar String Inverters",
    category: "solar",
    categoryName: "Solar Components",
    shortDesc: "Grid-tied and hybrid power conversion units with multi-MPPT tracking for commercial installations.",
    description:
      "Robust solar inverters engineered for high conversion efficiency, multi-MPPT string management, grid synchronization, and remote system telemetry.",
    image: "/images/products/solar-inverters.jpg",
    specifications: [
      "Architecture: Transformerless on-grid / hybrid string inverters",
      "MPPT: Dual and multi-channel maximum power point tracking",
      "Enclosure: Weatherproof industrial casing suitable for outdoor installation",
      "Monitoring: RS485 / WiFi / 4G remote telemetry interface support",
    ],
    applications: [
      "Commercial rooftop photovoltaic systems",
      "Industrial solar power plants and captive installations",
      "EPC contractor bulk supply requirements",
    ],
    featured: true,
  },
  {
    id: "solar-dc-cables",
    name: "1.5kV DC Cross-Linked Solar Cables",
    category: "solar",
    categoryName: "Solar Components",
    shortDesc: "Tinned copper flexible DC cables (4 sq mm, 6 sq mm, 10 sq mm) with UV & weather resistance.",
    description:
      "Specialized solar DC cables featuring tinned copper conductors and electron-beam cross-linked polyolefin (XLPO) insulation designed for outdoor longevity under harsh solar radiation.",
    image: "/images/products/solar-dc-cables.jpg",
    specifications: [
      "Conductor: Electrolytic tinned flexible copper (Class 5)",
      "Insulation: Halogen-free, electron-beam cross-linked compound",
      "Rating: 1500V DC operating voltage rating",
      "Properties: UV-resistant, ozone-resistant, flame retardant",
    ],
    applications: [
      "String cabling between solar PV panels and inverter stations",
      "Commercial and industrial rooftop solar array interconnection",
      "Solar EPC project balance-of-system wiring",
    ],
    featured: false,
  },
  {
    id: "solar-mc4-connectors",
    name: "IP68 Solar MC4 Connectors & Y-Branch Splitters",
    category: "solar",
    categoryName: "Solar Components",
    shortDesc: "Standard solar electrical connectors and branch adapters for secure DC module connections.",
    description:
      "Weather-sealed solar male/female connectors engineered for low contact resistance, snap-in locking, and moisture protection in photovoltaic string arrays.",
    image: "/images/products/solar-mc4-connectors.jpg",
    specifications: [
      "Ingress Protection: IP68 waterproof and dustproof sealing",
      "Contact Material: Copper with silver / tin plating for low resistance",
      "Locking Mechanism: Snap-in locking with tool-assisted release",
      "Cable Range: Compatible with standard 2.5 mm² to 6 mm² solar cables",
    ],
    applications: [
      "PV module series and parallel array wiring",
      "Combiner box and DC distribution cabling connections",
      "Field repairs and contractor installations",
    ],
    featured: false,
  },
  {
    id: "solar-mounting-structures",
    name: "Aluminum & HDG Solar Mounting Structures",
    category: "solar",
    categoryName: "Solar Components",
    shortDesc: "Engineered rails, clamps, and framework hardware for tin-shed, RCC, and ground solar installations.",
    description:
      "High-strength solar module mounting frameworks fabricated from anodized aluminum alloy (AL6005-T5) and hot-dip galvanized steel, designed for wind-load stability.",
    image: "/images/products/solar-mounting-structures.jpg",
    specifications: [
      "Material: Anodized aluminum rails & hot-dip galvanized (HDG) components",
      "Hardware: Stainless steel SS304 mid/end clamps and fasteners",
      "Roof Types: Metal tin shed trapezoidal clamps, RCC flat roof legs",
      "Design: Non-penetrating seam clamps and tilt leg options available",
    ],
    applications: [
      "Industrial factory sheet roofs (trapezoidal and standing seam)",
      "Commercial concrete flat rooftops",
      "Solar carports and ground-mount structures",
    ],
    featured: true,
  },
  {
    id: "solar-dcdb-acdb",
    name: "Solar Distribution & Protection Boxes (DCDB / ACDB)",
    category: "solar",
    categoryName: "Solar Components",
    shortDesc: "Array distribution enclosures fitted with Type-II SPDs, DC fuses, and isolators for system safety.",
    description:
      "Enclosed solar balance-of-system panels engineered to protect solar PV arrays and grid interfaces from overcurrent, short-circuits, and lightning-induced voltage surges.",
    image: "/images/products/solar-dcdb-acdb.jpg",
    specifications: [
      "Enclosure: Polycarbonate / FRP waterproof enclosure",
      "Surge Protection: Class II DC and AC surge protective devices (SPD)",
      "Protection: High-voltage DC cartridge fuses and MCBs/MCCBs",
      "Glands: Cable entry glands for moisture and dust sealing",
    ],
    applications: [
      "Rooftop and ground solar array power collection",
      "Grid interconnection safety isolation for solar inverters",
      "Contractor and EPC project installations",
    ],
    featured: false,
  },

  // --- ELECTRICAL PRODUCTS ---
  {
    id: "industrial-power-cables",
    name: "Heavy Industrial Power & Control Cables",
    category: "electrical",
    categoryName: "Electrical Products",
    shortDesc: "Armoured and unarmoured XLPE/PVC copper and aluminium cables for plant power distribution.",
    description:
      "Multi-core low-voltage and medium-voltage electrical power cables engineered for industrial distribution boards, motor control centers, and underground service runs.",
    image: "/images/products/industrial-power-cables.jpg",
    specifications: [
      "Conductor: Electrolytic high-conductivity Aluminium / Copper",
      "Insulation: XLPE (Cross-linked Polyethylene) / Heavy-duty PVC",
      "Armouring: Galvanized steel round wire or flat strip armour",
      "Voltage Rating: 1.1kV grade and medium-voltage specifications",
    ],
    applications: [
      "Factory main incoming lines and substation feeders",
      "Motor control centers (MCC) and heavy machinery power feeds",
      "Commercial building main riser shafts and distribution panels",
    ],
    featured: true,
  },
  {
    id: "industrial-switchgear",
    name: "Industrial Switchgear, MCBs & MCCBs",
    category: "electrical",
    categoryName: "Electrical Products",
    shortDesc: "Circuit protection devices including miniature and molded case circuit breakers for commercial facilities.",
    description:
      "High-reliability circuit breakers and switchgear designed to safeguard electrical networks from overload, short-circuit, and ground fault conditions across commercial and industrial loads.",
    image: "/images/products/industrial-switchgear.jpg",
    specifications: [
      "Device Types: MCB, MCCB, RCCB, and RCBO protective devices",
      "Poles: Single-pole, double-pole, 3-pole, and 4-pole configurations",
      "Breaking Capacity: High short-circuit fault current withstand ratings",
      "Mounting: DIN-rail mount and panel base-plate mounting options",
    ],
    applications: [
      "Main distribution boards (MDB) and sub-distribution panels",
      "Machinery control panels and industrial feeder safety",
      "Commercial building tenant meter panels",
    ],
    featured: true,
  },
  {
    id: "contactors-isolators",
    name: "Power Contactors, Overload Relays & Isolators",
    category: "electrical",
    categoryName: "Electrical Products",
    shortDesc: "Motor control components, AC contactors, thermal overload relays, and rotary load isolator switches.",
    description:
      "Robust electro-mechanical switching devices designed for frequent motor starting, industrial pump control, capacitor banks, and power circuit isolation.",
    image: "/images/products/contactors-isolators.jpg",
    specifications: [
      "Type: 3-Pole & 4-Pole power contactors with auxiliary contact blocks",
      "Relays: Bimetallic thermal overload relays with phase failure sensitivity",
      "Isolators: Rotary handle off-load and on-load disconnect switches",
      "Enclosure: Available with metal and polycarbonate protective boxes",
    ],
    applications: [
      "Industrial motor starter circuits (DOL, Star-Delta)",
      "Pumping stations, compressors, and plant process controls",
      "Outdoor equipment safety disconnect stations",
    ],
    featured: false,
  },
  {
    id: "commercial-switches",
    name: "Modular Electrical Switches & Industrial Sockets",
    category: "electrical",
    categoryName: "Electrical Products",
    shortDesc: "Commercial-grade modular switch plates, heavy socket outlets, and weatherproof industrial plug combinations.",
    description:
      "Commercial modular wiring devices and heavy-duty industrial plugs & sockets engineered for dependable operation across offices, server rooms, and shop floors.",
    image: "/images/products/commercial-switches.jpg",
    specifications: [
      "Modular Range: Switches, power sockets, data ports, and faceplates",
      "Industrial Plugs: 16A, 32A, 63A interlocked industrial sockets and plugs",
      "Fire Retardant: High-grade flame-retardant polycarbonate moldings",
      "Contacts: Heavy brass contacts with silver alloy contact tips",
    ],
    applications: [
      "Corporate workplace desk power and server rack power drops",
      "Industrial workshop single-phase and 3-phase portable equipment feeds",
      "Commercial facility maintenance plug points",
    ],
    featured: false,
  },
  {
    id: "distribution-boards",
    name: "Modular Distribution Boards & Enclosures",
    category: "electrical",
    categoryName: "Electrical Products",
    shortDesc: "Sheet steel distribution boxes (SPN / TPN) with acrylic or metal doors for structured circuit layout.",
    description:
      "Fabricated metal distribution boards featuring insulated busbar assemblies, neutral links, and earthing bars designed for clean, organized circuit branching.",
    image: "/images/products/distribution-boards.jpg",
    specifications: [
      "Configuration: Single-door / Double-door SPN and TPN tiers",
      "Material: Heavy gauge cold-rolled sheet steel with powder coat finish",
      "Busbar: High-conductivity electrolytic copper busbars with shroud protection",
      "Knockouts: Pre-punched cable conduit entry knockouts top and bottom",
    ],
    applications: [
      "Floor-wise power distribution in commercial buildings",
      "Light and power sub-distribution in factories",
      "Contractor infrastructure electrification projects",
    ],
    featured: true,
  },
  {
    id: "wiring-accessories",
    name: "Cable Trays, Conduits & Installation Accessories",
    category: "electrical",
    categoryName: "Electrical Products",
    shortDesc: "Perforated cable trays, PVC/GI conduit pipes, cable glands, lugs, and terminal accessories.",
    description:
      "Complete electrical containment and installation hardware for structured cable routing, termination, and earthing throughout commercial and industrial facilities.",
    image: "/images/products/wiring-accessories.jpg",
    specifications: [
      "Containment: Perforated and ladder-type galvanized cable trays",
      "Conduits: Heavy-duty PVC conduits and GI flexible conduits",
      "Termination: Compression cable glands and heavy copper crimping lugs",
      "Earthing: Copper earthing strips and chemical earthing compounds",
    ],
    applications: [
      "Industrial cable routing along plant structures and ceilings",
      "Building electrical service shafts and riser management",
      "Electrical contractor BOQ bulk material supply",
    ],
    featured: false,
  },
];
