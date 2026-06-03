// ── Types ────────────────────────────────────────────────────────────────────

export type Category = "Systems" | "Motion" | "Business" | "Experiments";
export type ProjectStatus = "live" | "beta" | "concept";

export interface Project {
  id: string;
  /** Display title */
  name: string;
  year: number;
  category: Category;
  /** One-line genre / format label shown below the title */
  type: string;
  /** 1–2 sentence card preview */
  shortDescription: string;
  /** Full paragraph used in expanded views / case studies */
  description: string;
  /** What real-world problem the project addresses */
  problem: string;
  /** How it was solved — approach and decisions */
  solution: string;
  /** Proof-point chips shown on the card */
  whatItProves: string[];
  tech: string[];
  status: ProjectStatus;
  accentColor: string;
  bgColor: string;
  liveUrl?: string;
  /** Override the default "View Live" CTA label (e.g. "View Project") */
  liveLabel?: string;
  caseStudyUrl?: string;
}

/** Capability card shown in the Skills Matrix section */
export interface Capability {
  id: string;
  label: string;
  /** Short metric label — Design / Build / Motion / Logic / Workflow */
  metric: string;
  icon: string;
  /** Outcome-focused description — what the client gets, not the tech name */
  description: string;
  /** 3–5 concrete skill or technique tags */
  skills: string[];
  /** Project names this capability has been applied in */
  usedIn: string[];
  /** What this capability creates — outcome for the client */
  outcome: string;
  /** Short phrases for the Capability Console terminal output */
  consoleOutput: string[];
}

export interface ArchiveEntry {
  path: string;
  label: string;
  type: "dir" | "file";
  preview: string;
  stack?: string;
  year?: number;
  children?: ArchiveEntry[];
}

export interface PipelineStage {
  id: string;
  label: string;
  description: string;
  /** Short output label shown as a chip — e.g. "clear direction" */
  output: string;
  /** Console mode line — e.g. "definition" */
  mode: string;
  /** Why this stage matters for the client */
  clientValue: string;
}

export interface CreatorStat {
  value: string;
  label: string;
}

// ── Creator data ─────────────────────────────────────────────────────────────

export const creatorStats: CreatorStat[] = [
  { value: "5", label: "Live Projects" },
  { value: "2+", label: "Years Building" },
  { value: "∞", label: "Side Experiments" },
  { value: "1", label: "Creator" },
];

export const capabilities = [
  {
    id: "design",
    label: "Cinematic Design",
    description: "Visual systems, hierarchy, typography, dark-premium brand language.",
  },
  {
    id: "engineering",
    label: "Frontend Engineering",
    description: "Next.js, React, TypeScript, Tailwind — clean, typed, production-ready code.",
  },
  {
    id: "motion",
    label: "Motion Systems",
    description: "GSAP, ScrollTrigger, scroll-linked timelines — motion that serves meaning.",
  },
  {
    id: "product",
    label: "Product Logic",
    description: "Full flows: auth, forms, admin panels, real-time availability systems.",
  },
];

// ── Projects ─────────────────────────────────────────────────────────────────
// To add a new project: append one object here. Archive, filters, and cards
// all derive from this array automatically.

export const projects: Project[] = [
  {
    id: "barber-booking",
    name: "Barber Booking System",
    year: 2025,
    category: "Systems",
    type: "Full-Stack Booking Platform",
    shortDescription:
      "A real appointment system for barbers — not a demo, not a concept. Built in Hebrew, deployed, and in daily use.",
    description:
      "Built for a real barbershop. Clients book, cancel, and manage appointments. Barbers configure availability, services, and blocked time through a dedicated admin panel. Mobile-first, Hebrew UI.",
    problem:
      "Barbers rely on WhatsApp and phone calls to manage bookings. No-shows happen. Admin overhead eats the workday. Clients have no visibility into availability.",
    solution:
      "A purpose-built booking system with real-time slot availability, admin controls, service configuration, and mobile-ready UX — deployed and actively used by a real business.",
    whatItProves: ["Product Logic", "Booking UX", "Admin Systems", "Mobile-First", "Full-Stack"],
    tech: ["Next.js", "SQLite", "TypeScript", "Tailwind"],
    status: "live",
    accentColor: "#00d4ff",
    bgColor: "rgba(0,212,255,0.06)",
    liveUrl: "https://barber-shop-booking2.vercel.app/",
    caseStudyUrl: "#case-study-barber",
  },
  {
    id: "neovolt",
    name: "NEOVOLT",
    year: 2025,
    category: "Motion",
    type: "Cinematic Product Showcase",
    shortDescription:
      "A motorcycle website that feels like a film. Three bikes, three scroll chapters, zero spec tables.",
    description:
      "A cinematic showcase for three premium electric motorcycles. Each bike gets its own scroll-driven chapter with distinct visual language, motion timing, and product narrative. Design and motion are the message.",
    problem:
      "Motorcycle brands use generic dealership templates. Nothing communicates speed, power, or prestige. The product is thrilling — the web presence is not.",
    solution:
      "A GSAP ScrollTrigger-driven experience where every element enters with cinematic ease curves. Parallax depth, dramatic typography, silence used intentionally. No carousels, no feature grids.",
    whatItProves: ["Cinematic Design", "Scroll Storytelling", "Motion Direction", "Brand Atmosphere", "Premium UX"],
    tech: ["Next.js", "GSAP", "ScrollTrigger", "Three.js", "TypeScript"],
    status: "live",
    accentColor: "#ff6b35",
    bgColor: "rgba(255,107,53,0.06)",
    caseStudyUrl: "#case-study-neovolt",
  },
  {
    id: "obsidian",
    name: "Obsidian / Bat Scroll",
    year: 2024,
    category: "Motion",
    type: "Scroll-Driven Visual Experience",
    shortDescription:
      "A bat flies through darkness — every scroll pixel drives its position, wings, and depth.",
    description:
      "A dark interactive experience where scroll position controls a bat in mid-flight. Built on HTML5 Canvas with GSAP ScrollTrigger scrub — the animation plays at 60fps with frame-perfect timing.",
    problem:
      "Scroll animations are usually faked — CSS transforms that feel mechanical and disconnected from the user's input. True scroll-driven character motion requires a fundamentally different approach.",
    solution:
      "Canvas rendering controlled entirely by ScrollTrigger's scrub value. The bat's path, wing articulation, and perspective depth are derived from scroll progress — not time. Pure input-to-output control.",
    whatItProves: ["Scroll Animation", "Canvas Control", "Character Motion", "Immersive Direction", "Experimental Interaction"],
    tech: ["GSAP", "ScrollTrigger", "HTML5 Canvas", "Vanilla JS"],
    status: "live",
    accentColor: "#00d4ff",
    bgColor: "rgba(0,212,255,0.04)",
    liveUrl: "https://obsidian-vxjh.vercel.app/",
  },
  {
    id: "room-planner-2d",
    name: "2D Room Planner",
    year: 2025,
    category: "Experiments",
    type: "Interactive Space Planning Tool",
    shortDescription:
      "An interactive 2D room planner for arranging spaces, placing objects, and visualizing layouts in the browser.",
    description:
      "A browser-based planning interface for designing room layouts, arranging furniture, and visualizing spatial decisions with a clean 2D canvas experience.",
    problem:
      "Planning a room layout usually means sketching on paper or paying for heavy software. There's no fast, browser-native tool that feels lightweight and immediate.",
    solution:
      "A self-contained HTML5 Canvas planner where users draw walls, drop furniture, drag and resize objects, and see their space take shape in real time — zero install required.",
    whatItProves: ["2D Layout", "Interactive UI", "Spatial Design"],
    tech: ["HTML5 Canvas", "Vanilla JS", "CSS"],
    status: "live",
    accentColor: "#00d4ff",
    bgColor: "rgba(0,212,255,0.04)",
    liveUrl: "https://room-planner-2-d.vercel.app/",
    liveLabel: "View Project",
  },
  {
    id: "useless-daily",
    name: "Useless Daily",
    year: 2024,
    category: "Experiments",
    type: "Mini Game / Browser Experiment",
    shortDescription:
      "Coins. Achievements. Sound effects. Absolutely pointless. Very deliberately built.",
    description:
      "A growing collection of delightfully useless browser interactions. Tap to collect coins, trigger achievements, earn sound effects, unlock states. The kind of thing that shouldn't be built carefully — but is.",
    problem:
      "Creative web work is constrained by 'usefulness'. That constraint kills experimentation. The best interaction ideas are sometimes completely pointless — and that's the point.",
    solution:
      "A pure JS mini-game framework with state machine, achievement system, sound triggers, and visual feedback. No build tools, no framework. Just DOM, Canvas, and the Web Audio API doing real work.",
    whatItProves: ["Gamification UX", "State Logic", "Creative Direction", "Feature Iteration", "Playful Engineering"],
    tech: ["Vanilla JS", "Web Audio API", "HTML5 Canvas", "CSS"],
    status: "beta",
    accentColor: "#ff6b35",
    bgColor: "rgba(255,107,53,0.06)",
  },
];

// ── Archive derivation ────────────────────────────────────────────────────────
// Builds the file-explorer tree directly from the projects array.
// Experiments-category → /vibecoding/experiments/
// All other categories → /vibecoding/projects/

export function buildArchive(projectList: Project[]): ArchiveEntry[] {
  const main: Project[] = [];
  const experiments: Project[] = [];

  for (const p of projectList) {
    if (p.category === "Experiments") experiments.push(p);
    else main.push(p);
  }

  const toEntry = (p: Project, root: string): ArchiveEntry => ({
    path: `${root}/${p.id}`,
    label: p.id,
    type: "dir",
    preview: p.shortDescription,
    stack: p.tech.join(" · "),
    year: p.year,
  });

  return [
    {
      path: "/vibecoding/projects",
      label: "projects",
      type: "dir",
      preview: `${main.length} deployed project${main.length !== 1 ? "s" : ""}`,
      children: main.map((p) => toEntry(p, "/vibecoding/projects")),
    },
    {
      path: "/vibecoding/experiments",
      label: "experiments",
      type: "dir",
      preview: `${experiments.length} creative experiment${experiments.length !== 1 ? "s" : ""}`,
      children: [
        ...experiments.map((p) => toEntry(p, "/vibecoding/experiments")),
        {
          path: "/vibecoding/experiments/motion-lab",
          label: "motion-lab",
          type: "dir",
          preview: "Ongoing GSAP / ScrollTrigger explorations — not meant to ship",
          stack: "GSAP · CSS",
          year: 2025,
        },
      ],
    },
  ];
}

// ── Capability System (Skills Matrix) ────────────────────────────────────────
// Outcome-focused — clients buy results, not technology names.

export const capabilitySystem: Capability[] = [
  {
    id: "creative-direction",
    label: "Creative Direction",
    metric: "Design",
    icon: "◆",
    description:
      "Visual systems that give a website atmosphere, hierarchy, and a premium first impression.",
    skills: ["Typography", "Color Systems", "Layout Rhythm", "Hierarchy", "Brand Atmosphere"],
    usedIn: ["NEOVOLT", "VibeCoding OS", "Digital Gallery"],
    outcome: "Premium first impression",
    consoleOutput: ["visual hierarchy", "brand atmosphere", "premium first impression"],
  },
  {
    id: "frontend",
    label: "Frontend Engineering",
    metric: "Build",
    icon: "◇",
    description:
      "Clean component-based builds that stay scalable, responsive, and maintainable.",
    skills: ["React", "Next.js", "TypeScript", "Tailwind", "Reusable Components"],
    usedIn: ["VibeCoding OS", "Barber Booking System", "Useless Daily"],
    outcome: "Clean, scalable interface",
    consoleOutput: ["scalable components", "responsive layout", "clean typed code"],
  },
  {
    id: "motion",
    label: "Motion Systems",
    metric: "Motion",
    icon: "◈",
    description:
      "Controlled animation systems that make interfaces feel alive without turning the site into noise.",
    skills: ["Scroll Reveals", "Hover States", "SVG Motion", "Cinematic Timing", "Reduced-Motion Support"],
    usedIn: ["NEOVOLT", "Obsidian / Bat Scroll", "VibeCoding OS"],
    outcome: "Interfaces that feel alive",
    consoleOutput: ["cinematic timing", "scroll-driven reveals", "interface rhythm"],
  },
  {
    id: "product",
    label: "Product Logic",
    metric: "Logic",
    icon: "○",
    description:
      "User flows and interface states designed around real actions, not just static pages.",
    skills: ["Booking Flows", "Status States", "Forms", "Dashboards", "User Journeys"],
    usedIn: ["Barber Booking System", "Useless Daily"],
    outcome: "Real user flows",
    consoleOutput: ["real user flows", "status-driven states", "business-ready systems"],
  },
  {
    id: "ai",
    label: "AI Workflow",
    metric: "Workflow",
    icon: "◉",
    description:
      "Fast AI-assisted iteration with structured prompts, debugging loops, and build verification.",
    skills: ["Claude Code", "Prompt Systems", "Rapid Prototyping", "Refactoring", "Build Checks"],
    usedIn: ["All current builds"],
    outcome: "Faster build cycles",
    consoleOutput: ["structured prompt loops", "rapid iteration", "verified output"],
  },
];

// ── Process Pipeline ──────────────────────────────────────────────────────────
// Input: raw idea → Pipeline → Output: working digital experience

export const processPipeline: PipelineStage[] = [
  {
    id: "01",
    label: "Idea",
    description:
      "Define the goal, audience, and desired outcome before touching the interface.",
    output: "clear direction",
    mode: "definition",
    clientValue: "Avoids building the wrong thing.",
  },
  {
    id: "02",
    label: "Structure",
    description:
      "Map the sections, content hierarchy, user journey, and conversion flow.",
    output: "content architecture",
    mode: "architecture",
    clientValue: "Makes the site easier to understand.",
  },
  {
    id: "03",
    label: "Design",
    description:
      "Create the visual language: typography, color, spacing, atmosphere, and interface rhythm.",
    output: "visual system",
    mode: "visual system",
    clientValue: "Creates a premium first impression.",
  },
  {
    id: "04",
    label: "Build",
    description:
      "Turn the system into responsive components, clean layouts, and working interactions.",
    output: "working interface",
    mode: "implementation",
    clientValue: "Turns the plan into a working interface.",
  },
  {
    id: "05",
    label: "Refine",
    description:
      "Test the experience, sharpen the UX, improve copy, remove friction, and polish details.",
    output: "polished experience",
    mode: "quality loop",
    clientValue: "Removes friction and raises quality.",
  },
  {
    id: "06",
    label: "Launch",
    description:
      "Run build checks, verify responsiveness, prepare links, and make the site ready to share.",
    output: "public-ready site",
    mode: "deployment",
    clientValue: "Gets the site ready to share, sell, and test.",
  },
];

// ── Case studies ─────────────────────────────────────────────────────────────

// Barber Booking — featured case study (Stage 5)
// Case-study-specific content lives here; tech/tags/whatItProves
// are pulled from the projects array in the CaseStudy component.
export const barberCaseStudy = {
  projectId: "barber-booking" as const,
  headline: "From messy WhatsApp scheduling to a clear booking experience.",
  subheadline:
    "A business-focused appointment flow designed for barbers and small service providers who need less manual coordination and a more professional client experience.",
  problem:
    "Many barbers manage appointments through calls and WhatsApp messages, creating double work, unclear availability, and missed updates.",
  solution:
    "A structured booking flow where clients choose a service, select a time, confirm their details, and understand the status of their appointment.",
  outcome:
    "A cleaner client experience, less manual coordination, and a system that feels more professional than message-based scheduling.",
  flowSteps: [
    {
      id: "01",
      label: "Choose Service",
      description: "Client picks from configured services — each with name, duration, and price clearly displayed.",
    },
    {
      id: "02",
      label: "Pick Time",
      description: "Available time slots shown in real time. No back-and-forth. No 'are you free Friday?' messages.",
    },
    {
      id: "03",
      label: "Confirm Details",
      description: "Client enters name and phone number. Simple form, no account creation required.",
    },
    {
      id: "04",
      label: "Track Status",
      description: "Post-booking status screen shows if the appointment is booked, confirmed, or cancelled.",
    },
  ],
  decisions: [
    {
      title: "Service first, time second",
      body: "Choosing a service before a slot filters availability by duration — preventing bookings that don't fit.",
    },
    {
      title: "Availability is visual",
      body: "Clients see exactly which slots are open. No coordination messages, no manual availability checks.",
    },
    {
      title: "Status after booking",
      body: "A clear post-booking screen means clients don't need to follow up. They know if they're confirmed.",
    },
    {
      title: "Minimal enough to run",
      body: "The admin panel stays simple. Barbers block time, configure services, and view bookings — no training needed.",
    },
  ],
  stats: [
    { value: "4",    label: "Booking steps"      },
    { value: "0",    label: "Accounts required"   },
    { value: "Live", label: "Deployment status"   },
    { value: "100%", label: "Mobile-ready"        },
  ],
};

export const neovoltCaseStudy = {
  name: "NEOVOLT",
  subtitle: "Cinematic Motorcycle Showcase",
  year: 2025,
  tech: ["Next.js 15", "GSAP", "ScrollTrigger", "Three.js", "TypeScript"],
  stats: [
    { value: "3", label: "Bike models" },
    { value: "60fps", label: "Animation target" },
    { value: "100%", label: "Responsive" },
    { value: "∞", label: "Rewatchability" },
  ],
  sections: [
    {
      id: "01",
      label: "The Problem",
      lead: true,
      content:
        "Most motorcycle showcase websites are static brochures — spec lists and studio photos. NEOVOLT needed to communicate power, precision, and prestige without words doing the heavy lifting.",
    },
    {
      id: "02",
      label: "The Vision",
      content:
        "A cinematic web experience where design itself becomes the product story. The site should feel like a launch film — composed, high-contrast, emotionally charged. Every scroll reveals something worth seeing.",
    },
    {
      id: "03",
      label: "Design Approach",
      content:
        "Pure dark canvas, dramatic typography, electric accents. No hero carousels. Three distinct chapters — each bike introduced through scroll-triggered reveals with its own lighting and motion language.",
    },
    {
      id: "04",
      label: "Motion System",
      content:
        "GSAP ScrollTrigger orchestrates the full timeline. Elements enter with cinematic ease curves (power4.out). Parallax depth created through layered z-translate. No bounce, no spring — only weight.",
    },
    {
      id: "05",
      label: "Functionality",
      content:
        "Model selector, animated spec comparison, contact form with validation. Fully responsive — motion simplified on mobile, layout reflows cleanly to single-column without losing hierarchy.",
    },
    {
      id: "06",
      label: "Result",
      content:
        "A portfolio statement: proof that cinematic quality and functional product logic can coexist. Motion is not decoration — it is information delivery at a higher bandwidth.",
    },
  ],
};
