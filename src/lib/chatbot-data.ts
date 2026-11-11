export interface ChatMessage {
  id: string;
  sender: "user" | "assistant";
  text: string;
  timestamp: string;
  actionButtons?: {
    label: string;
    action: string;
    href?: string;
  }[];
}

export interface QuickPrompt {
  label: string;
  query: string;
  category: "lighting" | "solar" | "electrical" | "manpower" | "quote" | "general";
}

export const QUICK_PROMPTS: QuickPrompt[] = [
  {
    label: "💡 Lighting Products",
    query: "What commercial and industrial LED lighting products do you supply?",
    category: "lighting",
  },
  {
    label: "☀️ Solar Components",
    query: "Which solar PV modules, inverters, and mounting hardware do you provide?",
    category: "solar",
  },
  {
    label: "⚡ Electrical Products",
    query: "Which power cables, switchgear, and circuit breakers do you supply?",
    category: "electrical",
  },
  {
    label: "👷 Technical Manpower",
    query: "What technical workforce and engineering support do you deploy?",
    category: "manpower",
  },
  {
    label: "📋 Request Product Quotation",
    query: "How do I get an official offline quotation or BOQ pricing for our facility?",
    category: "quote",
  },
  {
    label: "📦 Product Availability & Delivery",
    query: "How does offline ordering and site delivery work with BURAQ?",
    category: "general",
  },
];

interface KnowledgeEntry {
  keywords: string[];
  patterns: RegExp[];
  response: string;
  actionButtons?: {
    label: string;
    action: string;
    href?: string;
  }[];
}

const KNOWLEDGE_BASE: KnowledgeEntry[] = [
  // 0. Creator / Identity
  {
    keywords: ["who made you", "who created you", "who built you", "who developed you", "who programmed you", "who designed you", "who made u", "kisne banaya", "tumhe kisne banaya", "your creator", "your developer"],
    patterns: [/who (made|created|built|developed|programmed|designed) (you|u)/i, /who is your (creator|developer|maker|author)/i, /kisne (banaya|design kiya|develop kiya)/i],
    response: `I was created by **BURAQ Enterprise** to assist you with our lighting solutions, solar components, electrical products, and technical manpower support. How can I help you today?`,
    actionButtons: [
      { label: "Explore Products", action: "link", href: "/products" },
      { label: "About BURAQ", action: "link", href: "/about" },
    ],
  },

  // 1. Lighting Products
  {
    keywords: ["light", "lighting", "chandelier", "pendant", "lantern", "moroccan", "decorative", "crystal", "ezra", "festive", "downlight", "lamp", "fixture"],
    patterns: [/light(ing|s)?/i, /chandelier/i, /pendant/i, /lantern/i, /decorative/i, /crystal/i, /moroccan/i, /festive/i],
    response: `**BURAQ Decorative & Architectural Lighting Range**:
    
We supply premium decorative luminaires and statement fixtures on an offline enquiry basis:

• **Luxury Designer Pendant Fixtures**: Multi-tier gold-finish hanging pendants and warm glowing glass globes for living spaces, stairwells, and duplexes.
• **Modern Crystal Art Chandeliers**: Statement crystal chandeliers and contemporary curved-ribbon LED ceiling rings for halls, venues, and showrooms.
• **Antique Brass Filigree Lanterns**: Handcrafted Moroccan-style pierced metal lanterns with crystal facets for ambient shadow-play.
• **Festive Decorative Lanterns**: Vibrant celebration lights and traditional/modern akash kandil arrays.
• **Architectural Spotlights & Downlights**: Anti-glare recessed downlights for showcases, corridors, and luxury interior accents.`,
    actionButtons: [
      { label: "View Lighting Products", action: "link", href: "/products?sector=lighting" },
      { label: "Enquire for Lighting", action: "link", href: "/contact" },
    ],
  },

  // 2. Solar Components
  {
    keywords: ["solar", "photovoltaic", "pv", "panel", "inverter", "string inverter", "mono perc", "bifacial", "dc cable", "mc4", "mounting", "structure", "dcdb", "acdb", "bos"],
    patterns: [/solar/i, /photovoltaic/i, /inverters?/i, /pv.*module/i, /mc4/i, /bifacial/i, /mono.*perc/i],
    response: `**BURAQ Solar Components & Balance of System**:

We supply solar hardware directly to solar EPCs, electrical contractors, and commercial project developers:

• **Solar PV Modules**: High-efficiency Mono PERC and Bifacial half-cut panels for rooftop and ground installations.
• **Solar String Inverters**: On-grid and hybrid inverters with multi-MPPT tracking and remote cloud monitoring.
• **1.5kV DC Solar Cables**: Tinned copper flexible cables (4, 6, 10 sq mm) with UV and weather-resistant cross-linked insulation.
• **Array Protection & Hardware**: IP68 MC4 connectors, custom DCDB/ACDB protection enclosures with Class II SPDs, and aluminum/HDG mounting rails.`,
    actionButtons: [
      { label: "View Solar Components", action: "link", href: "/products?sector=solar" },
      { label: "Enquire for Solar", action: "link", href: "/contact" },
    ],
  },

  // 3. Electrical Products
  {
    keywords: ["cable", "cables", "power cable", "armoured", "wire", "switchgear", "mcb", "mccb", "breaker", "contactor", "relay", "switch", "distribution board", "db", "conduit", "tray"],
    patterns: [/cables?/i, /switchgear/i, /breaker/i, /mcb/i, /mccb/i, /contactor/i, /electrical.*products/i],
    response: `**BURAQ Electrical Products Range**:

Essential electrical infrastructure materials supplied for commercial facilities, factories, and project contractors:

• **Industrial Power Cables**: Armoured and unarmoured XLPE and heavy PVC copper & aluminium multi-core power cables.
• **Switchgear & Circuit Breakers**: Miniature and molded case circuit breakers (MCBs, MCCBs) with high breaking capacities.
• **Motor Control & Isolators**: Power contactors, thermal overload relays, and rotary load disconnect switches.
• **Modular Wiring Devices**: Commercial modular switches, industrial sockets, and plugs.
• **Distribution Boards & Containment**: Modular sheet metal DBs, perforated cable trays, and conduit accessories.`,
    actionButtons: [
      { label: "View Electrical Products", action: "link", href: "/products?sector=electrical" },
      { label: "Enquire for Electrical", action: "link", href: "/contact" },
    ],
  },

  // 4. Technical Manpower (Secondary Service)
  {
    keywords: ["manpower", "worker", "technician", "engineer", "staff", "labor", "labour", "hire", "recruitment", "headcount", "roster", "supervision"],
    patterns: [/manpower/i, /engineers?/i, /technicians?/i, /workers?/i, /hire.*workers/i, /skilled.*people/i],
    response: `**BURAQ Technical Manpower Supply (Secondary Service)**:

Alongside our product catalogue, BURAQ maintains active technical workforce deployment for industrial facilities and plants:

• **Qualified Site Engineers**: Technical coordination, supervision, and project quality accountability.
• **Mobilized Technical Personnel**: Electricians, mechanical technicians, certified welders, fitters, and industrial helpers.
• **Deployment Models**: Short-term plant turnarounds, planned shutdowns, and long-term project support.
• **Compliance & Verification**: Full statutory compliance, background verification, and safety protocols.`,
    actionButtons: [
      { label: "View Manpower Details", action: "link", href: "/services/manpower-supply" },
      { label: "Request Manpower Quote", action: "link", href: "/contact" },
    ],
  },

  // 5. Pricing, Rates & Quotations
  {
    keywords: ["price", "pricing", "rate", "cost", "quote", "quotation", "rfq", "rfp", "fee", "estimate", "budget"],
    patterns: [/price/i, /pricing/i, /rates?/i, /costs?/i, /quotes?/i, /quotations?/i, /rfq/i, /how.*much/i],
    response: `**BURAQ Product Pricing & Quotations**:

BURAQ operates on an offline B2B supply model. We do not display fixed retail prices because pricing depends on project specifications, required volumes, and delivery destinations:

• **Lighting & Electrical**: Tiered quantity pricing based on contractor material schedules.
• **Solar Hardware**: Consolidated bill of quantities (BOQ) project pricing.
• **Technical Manpower**: Structured monthly or project-based deployment rates.

To receive an official quotation:
• Email: **buraq.ep@gmail.com**
• Phone & WhatsApp: Direct enquiry desks launching soon
• Submit our web enquiry form for rapid coordination.`,
    actionButtons: [
      { label: "Open Quotation Request Form", action: "link", href: "/contact" },
      { label: "Email Sales Desk", action: "link", href: "mailto:buraq.ep@gmail.com" },
    ],
  },

  // 6. Offline Ordering & Delivery Model
  {
    keywords: ["ecommerce", "buy online", "cart", "checkout", "payment", "order", "delivery", "dispatch", "how to buy"],
    patterns: [/buy.*online/i, /cart/i, /checkout/i, /how.*to.*buy/i, /how.*to.*order/i],
    response: `**BURAQ Offline Supply Model**:

• **Not an Ecommerce Store**: This website is designed to showcase product specifications and facilitate direct B2B enquiries. We do not use shopping carts or automated online payments.
• **Enquiry & Verification**: Submit your required items or BOQ. Our sales desk confirms batch availability, technical sheets, and staged delivery dates.
• **Commercial Invoicing**: Official proforma invoices and bank wire/cheque arrangements are handled through our accounts desk (**account@buraq.in**).
• **Site Delivery**: Coordinated material dispatch directly to your project site across West Bengal and neighboring regions.`,
    actionButtons: [
      { label: "View All Products", action: "link", href: "/products" },
      { label: "Contact Sales Desk", action: "link", href: "/contact" },
    ],
  },

  // 7. Company Overview & Locations
  {
    keywords: ["about", "who", "what is buraq", "company", "advantage", "why buraq", "experience", "reputation", "location"],
    patterns: [/who.*are.*you/i, /what.*is.*buraq/i, /about.*buraq/i, /why.*buraq/i],
    response: `**About BURAQ Enterprise**:

BURAQ Enterprise is a West Bengal based enterprise established in 2025 (Proprietorship, UDYAM: UDYAM-WB-13-0109935):
• **Primary Focus**: Lighting Products, Solar Components, and Electrical Products for business and contractor requirements.
• **Secondary Focus**: Technical Manpower Supply for plant operations and project turnarounds.
• **Dual Hubs**: Kolkata client hub at Poddar Court (Gate 3, 3rd Floor) and Registered Head Office at Domkal, Murshidabad.
• **Contact**: buraq.ep@gmail.com | Direct phone helplines launching soon.`,
    actionButtons: [
      { label: "About BURAQ", action: "link", href: "/about" },
      { label: "Why Partner With Us", action: "link", href: "/why-buraq" },
    ],
  },

  // 8. Contact & Help
  {
    keywords: ["contact", "email", "phone", "call", "address", "reach", "office", "headquarters", "where"],
    patterns: [/contact/i, /phone/i, /email/i, /call/i, /office.*address/i, /where.*located/i],
    response: `**Get in Touch with BURAQ**:

• **Sales & Product Enquiries**: buraq.ep@gmail.com
• **Phone & WhatsApp**: Direct enquiry helplines launching soon
• **General Information**: info@buraq.in
• **Kolkata Office**: Poddar Court, Gate No. 3, 3rd Floor, Kolkata – 700001
• **Registered Office**: Joyrampur, Domkal, Murshidabad – 742303`,
    actionButtons: [
      { label: "Open Contact Form", action: "link", href: "/contact" },
      { label: "Email: buraq.ep@gmail.com", action: "link", href: "mailto:buraq.ep@gmail.com" },
    ],
  },
];

export function getChatbotResponse(userInput: string): {
  text: string;
  actionButtons?: { label: string; action: string; href?: string }[];
} {
  const normalized = userInput.toLowerCase().trim();

  // Check matching entry
  for (const entry of KNOWLEDGE_BASE) {
    const keywordMatch = entry.keywords.some((k) => normalized.includes(k));
    const patternMatch = entry.patterns.some((p) => p.test(normalized));

    if (keywordMatch || patternMatch) {
      return {
        text: entry.response,
        actionButtons: entry.actionButtons,
      };
    }
  }

  // Fallback
  return {
    text: `Thank you for your enquiry. BURAQ Enterprise supplies **Lighting Products**, **Solar Components**, and **Electrical Products** on an offline project enquiry basis, alongside secondary **Technical Manpower Supply**.

Please share your specific product model, estimated quantity, or bill of quantities (BOQ), or contact our sales desk directly:
• Email: **buraq.ep@gmail.com**
• Phone & WhatsApp: Direct enquiry desks launching soon`,
    actionButtons: [
      { label: "Explore Products", action: "link", href: "/products" },
      { label: "Send an Enquiry", action: "link", href: "/contact" },
    ],
  };
}
