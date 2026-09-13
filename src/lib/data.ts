export type Program = {
  slug: string;
  name: string;
  duration: string;
  price: number;
  priceNote: string;
  sessions: string;
  image: string;
  tagline: string;
  summary: string;
  forWho: string[];
  weekly: string[];
  includes: string[];
  coachIds: string[];
};

export type Coach = {
  id: string;
  name: string;
  role: string;
  image: string;
  bio: string;
  focus: string[];
  credentials: string;
};

export type Exercise = {
  name: string;
  sets: number;
  reps: string;
  restSec: number;
  note?: string;
};

export type Workout = {
  id: string;
  title: string;
  program: string;
  durationMin: number;
  level: string;
  focus: string;
  exercises: Exercise[];
};

export type Testimonial = {
  quote: string;
  name: string;
  detail: string;
};

export const STUDIO = {
  name: "Northline",
  tagline: "One-to-one training in Bermondsey.",
  address: "Unit 4, Maltby Street, Bermondsey, London SE1 3PA",
  email: "desk@northline.studio",
  phone: "020 7946 0182",
  hours: "Mon–Fri 06:00–21:00 · Sat 07:00–14:00 · Sun closed",
};

export const programs: Program[] = [
  {
    slug: "rebuild",
    name: "Rebuild",
    duration: "12 weeks",
    price: 2400,
    priceNote: "or 3 × £850",
    sessions: "3× / week in studio",
    image: "/images/program-rebuild.jpg?v=4",
    tagline: "Get strong again, on purpose.",
    summary:
      "For people returning from time off, injury, or years of unstructured training. We restore strength, positions, and a week you can actually keep.",
    forWho: [
      "Coming back after months or years away",
      "Training that has stalled or started to hurt",
      "Want a coach, not another app",
    ],
    weekly: [
      "Two lower / hinge sessions",
      "One upper strength session",
      "Optional 20-minute aerobic finish",
      "Sunday written check-in",
    ],
    includes: [
      "Opening movement screen",
      "36 coached sessions",
      "Progressive strength plan",
      "Protein and sleep targets, not a meal plan",
    ],
    coachIds: ["toby", "georgie"],
  },
  {
    slug: "compose",
    name: "Compose",
    duration: "16 weeks",
    price: 3100,
    priceNote: "or 4 × £820",
    sessions: "4× / week, studio or hybrid",
    image: "/images/program-compose.jpg?v=4",
    tagline: "Change the composition. Keep the muscle.",
    summary:
      "A long enough block to drop fat without stripping the work you already earned. Lifting stays heavy. Food gets honest. Conditioning serves the lifts.",
    forWho: [
      "Body composition is the actual goal",
      "You can train four days most weeks",
      "Willing to track protein and steps",
    ],
    weekly: [
      "Three full-body strength sessions",
      "One conditioning session",
      "Daily step and protein target",
      "Fortnightly weigh-in and waist",
    ],
    includes: [
      "16-week lifting and conditioning plan",
      "48 sessions (studio or remote mix)",
      "Simple nutrition framework",
      "Photo and measurement protocol",
    ],
    coachIds: ["georgie", "toby"],
  },
  {
    slug: "compete",
    name: "Compete",
    duration: "12 weeks",
    price: 2800,
    priceNote: "or 3 × £980",
    sessions: "4× / week, performance bias",
    image: "/images/program-compete.jpg?v=5",
    tagline: "Be difficult to beat late.",
    summary:
      "Power, speed, and repeatability for people who still play. Built for field sports, masters competition, and anyone tired of looking fit and fading at 70 minutes.",
    forWho: [
      "You have a season, a fixture, or a test",
      "Strength is decent; speed has gone",
      "Willing to sprint and jump, not only lift",
    ],
    weekly: [
      "Two strength / power sessions",
      "One speed or repeat-effort session",
      "One aerobic or recovery session",
      "In-season load management",
    ],
    includes: [
      "Needs analysis against your sport",
      "36–48 coached sessions",
      "Speed and jump testing",
      "Peak week before competition",
    ],
    coachIds: ["toby"],
  },
  {
    slug: "latitude",
    name: "Latitude",
    duration: "Ongoing",
    price: 680,
    priceNote: "per month, cancel any time",
    sessions: "Remote + 40-minute sessions",
    image: "/images/program-latitude.jpg?v=4",
    tagline: "A plan that survives airports.",
    summary:
      "Programming for people who live between cities. Hotel gyms, time zones, late dinners. The work is short, honest, and written the week you are in.",
    forWho: [
      "You travel more than two weeks a month",
      "Studio time is occasional, not weekly",
      "Need a coach in your pocket, not a PDF",
    ],
    weekly: [
      "Three 40-minute sessions, location-aware",
      "One mobility or walk protocol",
      "Sunday plan for the next seven days",
      "Studio drop-ins when you are in London",
    ],
    includes: [
      "Weekly rewritten sessions",
      "Hotel / outdoor substitutions",
      "Async video form checks",
      "Two studio sessions a month included",
    ],
    coachIds: ["georgie", "toby"],
  },
];

export const coaches: Coach[] = [
  {
    id: "toby",
    name: "Toby Raworth",
    role: "Head coach",
    image: "/images/coach-toby.jpg?v=5",
    bio: "Toby coaches Rebuild and Compete — people coming back to a body, or to a sport, after time away. Former elite fast bowler. Strength, return-to-play, and a week you can keep.",
    focus: ["Rebuild", "Compete", "Strength"],
    credentials: "Athletic performance · strength",
  },
  {
    id: "georgie",
    name: "Georgie Raworth",
    role: "Coach",
    image: "/images/coach-georgie.jpg?v=4",
    bio: "Georgie coaches Compose and Latitude. Conditioning that serves the lifts, food without a meal plan, and the version of training that still happens after a delayed flight.",
    focus: ["Compose", "Latitude", "Conditioning"],
    credentials: "Composition · conditioning",
  },
];

export const workouts: Workout[] = [
  {
    id: "rebuild-lower",
    title: "Rebuild · Lower A",
    program: "rebuild",
    durationMin: 55,
    level: "Foundation",
    focus: "Squat & hinge",
    exercises: [
      { name: "Box squat", sets: 4, reps: "6", restSec: 150, note: "Sit, pause, stand. No bounce." },
      { name: "Romanian deadlift", sets: 3, reps: "8", restSec: 120, note: "Soft knees, long hamstrings." },
      { name: "Rear-foot split squat", sets: 3, reps: "8 / side", restSec: 90 },
      { name: "Calf raise", sets: 3, reps: "12", restSec: 60 },
      { name: "Dead bug", sets: 3, reps: "8 / side", restSec: 45, note: "Exhale as the leg extends." },
    ],
  },
  {
    id: "rebuild-upper",
    title: "Rebuild · Upper A",
    program: "rebuild",
    durationMin: 50,
    level: "Foundation",
    focus: "Press & pull",
    exercises: [
      { name: "Floor press", sets: 4, reps: "6", restSec: 150 },
      { name: "Chest-supported row", sets: 4, reps: "8", restSec: 90 },
      { name: "Half-kneeling landmine press", sets: 3, reps: "8 / side", restSec: 75 },
      { name: "Face pull", sets: 3, reps: "15", restSec: 45 },
      { name: "Suitcase carry", sets: 3, reps: "30 m / side", restSec: 60 },
    ],
  },
  {
    id: "compose-full",
    title: "Compose · Full body",
    program: "compose",
    durationMin: 50,
    level: "Intermediate",
    focus: "Density",
    exercises: [
      { name: "Trap-bar deadlift", sets: 4, reps: "5", restSec: 150 },
      { name: "Incline dumbbell press", sets: 3, reps: "8", restSec: 90 },
      { name: "Pendlay row", sets: 3, reps: "8", restSec: 90 },
      { name: "Walking lunge", sets: 3, reps: "10 / side", restSec: 75 },
      { name: "Farmer carry", sets: 3, reps: "40 m", restSec: 60 },
    ],
  },
  {
    id: "compete-power",
    title: "Compete · Power",
    program: "compete",
    durationMin: 45,
    level: "Advanced",
    focus: "Rate of force",
    exercises: [
      { name: "Broad jump", sets: 5, reps: "3", restSec: 90, note: "Full reset every rep." },
      { name: "Hang power clean", sets: 4, reps: "3", restSec: 150 },
      { name: "Push press", sets: 4, reps: "4", restSec: 120 },
      { name: "Med-ball rotational throw", sets: 4, reps: "5 / side", restSec: 75 },
      { name: "Sprint starts, 10 m", sets: 6, reps: "1", restSec: 90 },
    ],
  },
  {
    id: "latitude-hotel",
    title: "Latitude · Hotel 40",
    program: "latitude",
    durationMin: 40,
    level: "Anywhere",
    focus: "Minimal kit",
    exercises: [
      { name: "Goblet squat", sets: 4, reps: "8", restSec: 75 },
      { name: "Single-arm row", sets: 3, reps: "10 / side", restSec: 60 },
      { name: "Push-up", sets: 3, reps: "max − 2", restSec: 60, note: "Stop two short of failure." },
      { name: "Single-leg RDL, suitcase", sets: 3, reps: "8 / side", restSec: 60 },
      { name: "Suitcase march", sets: 3, reps: "40 s / side", restSec: 45 },
    ],
  },
  {
    id: "mobility-reset",
    title: "Reset · 25 minutes",
    program: "rebuild",
    durationMin: 25,
    level: "All",
    focus: "Positions",
    exercises: [
      { name: "90/90 hip switches", sets: 3, reps: "8 / side", restSec: 30 },
      { name: "Couch stretch", sets: 2, reps: "60 s / side", restSec: 20 },
      { name: "Wall slides", sets: 3, reps: "10", restSec: 30 },
      { name: "Cat-camel", sets: 2, reps: "10", restSec: 20 },
      { name: "Nasal walk", sets: 1, reps: "8 min", restSec: 0, note: "Easy pace, closed mouth." },
    ],
  },
];

export const testimonials: Testimonial[] = [
  {
    quote:
      "I had trained hard and randomly for a decade. Twelve weeks on Rebuild and my back squat is a number I respect again.",
    name: "Daniel R.",
    detail: "Rebuild · 44",
  },
  {
    quote:
      "Compose did not put me on a diet. It put my training and food in the same conversation. Down seven kilos. Stronger on every lift.",
    name: "Priya S.",
    detail: "Compose · 37",
  },
  {
    quote:
      "I play at the weekend and sit in airports through the week. Latitude is the first plan that survived both.",
    name: "Alex M.",
    detail: "Latitude · 41",
  },
  {
    quote:
      "Toby did not turn me into content. He made me difficult to beat in the last twenty minutes.",
    name: "Leah K.",
    detail: "Compete · 29",
  },
];

export const faqs = [
  {
    q: "Do I need to be fit already?",
    a: "No. Rebuild exists because most people who walk in are not starting from a highlight reel. We screen you, then we load what you can do well.",
  },
  {
    q: "What happens in the consult?",
    a: "Forty-five minutes. Training history, injuries, calendar, and a look at how you squat, hinge, and press. You leave with a recommendation — not a pitch.",
  },
  {
    q: "Can I train remotely?",
    a: "Latitude is remote-first. Compose can be hybrid. Rebuild and Compete are better in the room, with a handful of remote weeks if you travel.",
  },
  {
    q: "How is this different from a class gym?",
    a: "No classes. No music policy. Twelve racks, two coaches, one client at a time on the floor. You are not sharing a coach with sixteen other people.",
  },
  {
    q: "Is nutrition included?",
    a: "Targets, not theatre. Protein, steps, sleep, and alcohol. Compose goes deeper. Nobody here will sell you a shake.",
  },
  {
    q: "What is the cancellation policy?",
    a: "Consults can be moved with 12 hours’ notice. Block programs pause for injury. Latitude can be cancelled on any Sunday for the following month.",
  },
];

export const navLinks = [
  { to: "/method", label: "Method" },
  { to: "/programs", label: "Programs" },
  { to: "/coaches", label: "Coaches" },
  { to: "/workouts", label: "Workouts" },
  { to: "/tools", label: "Tools" },
  { to: "/journal", label: "Journal" },
] as const;

export function getProgram(slug: string) {
  return programs.find((p) => p.slug === slug);
}

export function getCoach(id: string) {
  return coaches.find((c) => c.id === id);
}

export function getWorkout(id: string) {
  return workouts.find((w) => w.id === id);
}

export function programOfCoach(id: string) {
  return programs.filter((p) => p.coachIds.includes(id));
}

export const sessionTypes = [
  { id: "consult", name: "Consult", detail: "45 minutes, complimentary", duration: "45 min" },
  { id: "session", name: "Single session", detail: "£95 · 60 minutes", duration: "60 min" },
  { id: "rebuild", name: "Rebuild intro", detail: "Start the 12-week block", duration: "60 min" },
  { id: "compose", name: "Compose intro", detail: "Start the 16-week block", duration: "60 min" },
  { id: "compete", name: "Compete intro", detail: "Start the 12-week block", duration: "60 min" },
  { id: "latitude", name: "Latitude setup", detail: "Remote onboarding", duration: "45 min" },
] as const;

export const WEEKDAY_TIMES = ["06:30", "07:30", "09:00", "12:00", "17:00", "18:00", "19:30"];
export const SATURDAY_TIMES = ["08:00", "09:30", "11:00"];

export function slotTaken(date: string, time: string) {
  let h = 0;
  const s = `${date}:${time}`;
  for (let i = 0; i < s.length; i += 1) h = (h * 33 + s.charCodeAt(i)) >>> 0;
  return h % 5 === 0;
}
