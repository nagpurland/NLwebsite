export interface NagpurLocality {
  id: string;
  name: string;
  zone: "Central" | "East" | "West" | "North" | "South";
  category: "Premium" | "Emerging" | "Established" | "Affordable" | "Industrial";
  description: string;
  priceRange: { min: number; max: number };
  riskScore: number;
  trend: "up" | "stable" | "down";
}

export const NAGPUR_LOCALITIES: NagpurLocality[] = [
  { id: "mihan", name: "MIHAN", zone: "South", category: "Premium", description: "IT/SEZ Growth Engine", priceRange: { min: 3000000, max: 8000000 }, riskScore: 10, trend: "up" },
  { id: "besa", name: "Besa", zone: "South", category: "Emerging", description: "Premium Residential", priceRange: { min: 1500000, max: 4000000 }, riskScore: 15, trend: "up" },
  { id: "wardha-road", name: "Wardha Road", zone: "South", category: "Emerging", description: "Airport Corridor", priceRange: { min: 2000000, max: 5000000 }, riskScore: 12, trend: "up" },
  { id: "hingna", name: "Hingna", zone: "West", category: "Industrial", description: "Industrial Hub", priceRange: { min: 1000000, max: 3000000 }, riskScore: 20, trend: "stable" },
  { id: "civil-lines", name: "Civil Lines", zone: "Central", category: "Premium", description: "Elite Legacy Area", priceRange: { min: 6000000, max: 15000000 }, riskScore: 5, trend: "stable" },
  { id: "dharampeth", name: "Dharampeth", zone: "Central", category: "Premium", description: "Prime Residential", priceRange: { min: 5000000, max: 12000000 }, riskScore: 8, trend: "stable" },
  { id: "ramdaspeth", name: "Ramdaspeth", zone: "Central", category: "Premium", description: "Premium Central", priceRange: { min: 5500000, max: 14000000 }, riskScore: 6, trend: "stable" },
  { id: "manish-nagar", name: "Manish Nagar", zone: "South", category: "Established", description: "Established Residential", priceRange: { min: 2500000, max: 5000000 }, riskScore: 12, trend: "stable" },
  { id: "koradi", name: "Koradi", zone: "North", category: "Emerging", description: "Emerging Growth", priceRange: { min: 800000, max: 2500000 }, riskScore: 25, trend: "up" },
  { id: "kamptee", name: "Kamptee", zone: "North", category: "Affordable", description: "Affordable Entry", priceRange: { min: 1000000, max: 3000000 }, riskScore: 22, trend: "stable" },
  { id: "wadi", name: "Wadi", zone: "West", category: "Established", description: "Commercial Hub", priceRange: { min: 2000000, max: 4500000 }, riskScore: 14, trend: "stable" },
  { id: "trimurti-nagar", name: "Trimurti Nagar", zone: "South", category: "Established", description: "Central Location", priceRange: { min: 3000000, max: 6000000 }, riskScore: 10, trend: "stable" },
  { id: "sadar", name: "Sadar", zone: "Central", category: "Premium", description: "Commercial District", priceRange: { min: 4500000, max: 10000000 }, riskScore: 8, trend: "stable" },
  { id: "sitabuldi", name: "Sitabuldi", zone: "Central", category: "Established", description: "Historic Core", priceRange: { min: 3500000, max: 8000000 }, riskScore: 12, trend: "stable" },
  { id: "mahal", name: "Mahal", zone: "Central", category: "Established", description: "Traditional Market", priceRange: { min: 3000000, max: 7000000 }, riskScore: 15, trend: "stable" },
  { id: "itwari", name: "Itwari", zone: "Central", category: "Established", description: "Commercial Zone", priceRange: { min: 2500000, max: 6000000 }, riskScore: 14, trend: "stable" },
  { id: "jaripatka", name: "Jaripatka", zone: "North", category: "Established", description: "North Residential", priceRange: { min: 2000000, max: 4500000 }, riskScore: 16, trend: "stable" },
  { id: "nandanvan", name: "Nandanvan", zone: "East", category: "Established", description: "East Residential", priceRange: { min: 2000000, max: 4000000 }, riskScore: 15, trend: "stable" },
  { id: "pratap-nagar", name: "Pratap Nagar", zone: "South", category: "Established", description: "South Residential", priceRange: { min: 2500000, max: 5000000 }, riskScore: 12, trend: "stable" },
  { id: "laxmi-nagar", name: "Laxmi Nagar", zone: "East", category: "Established", description: "East Extension", priceRange: { min: 2000000, max: 4500000 }, riskScore: 14, trend: "stable" },
  { id: "khamla", name: "Khamla", zone: "West", category: "Established", description: "West Residential", priceRange: { min: 2500000, max: 5500000 }, riskScore: 12, trend: "stable" },
  { id: "ambazari", name: "Ambazari", zone: "West", category: "Premium", description: "Lake-Side Premium", priceRange: { min: 4000000, max: 9000000 }, riskScore: 8, trend: "up" },
  { id: "seminary-hills", name: "Seminary Hills", zone: "Central", category: "Premium", description: "Green Belt Premium", priceRange: { min: 5000000, max: 12000000 }, riskScore: 6, trend: "stable" },
  { id: "bajaj-nagar", name: "Bajaj Nagar", zone: "Central", category: "Premium", description: "Central Business", priceRange: { min: 5000000, max: 11000000 }, riskScore: 7, trend: "stable" },
  { id: "gokulpeth", name: "Gokulpeth", zone: "Central", category: "Established", description: "Central Residential", priceRange: { min: 3500000, max: 7500000 }, riskScore: 10, trend: "stable" },
  { id: "shankar-nagar", name: "Shankar Nagar", zone: "West", category: "Established", description: "West Central", priceRange: { min: 3000000, max: 6500000 }, riskScore: 11, trend: "stable" },
  { id: "lakadganj", name: "Lakadganj", zone: "East", category: "Established", description: "East Commercial", priceRange: { min: 2000000, max: 4500000 }, riskScore: 16, trend: "stable" },
  { id: "kalamna", name: "Kalamna", zone: "East", category: "Industrial", description: "Industrial Zone", priceRange: { min: 1200000, max: 3000000 }, riskScore: 22, trend: "stable" },
  { id: "pardi", name: "Pardi", zone: "North", category: "Affordable", description: "North Extension", priceRange: { min: 800000, max: 2000000 }, riskScore: 28, trend: "stable" },
  { id: "umred-road", name: "Umred Road", zone: "East", category: "Emerging", description: "East Corridor", priceRange: { min: 1000000, max: 2500000 }, riskScore: 24, trend: "up" },
  { id: "khapri", name: "Khapri", zone: "South", category: "Emerging", description: "Airport Zone", priceRange: { min: 1500000, max: 3500000 }, riskScore: 18, trend: "up" },
  { id: "butibori", name: "Butibori", zone: "South", category: "Industrial", description: "Industrial Estate", priceRange: { min: 800000, max: 2500000 }, riskScore: 25, trend: "up" },
  { id: "nagpur-rural", name: "Nagpur Rural", zone: "North", category: "Affordable", description: "Rural Fringe", priceRange: { min: 500000, max: 1500000 }, riskScore: 35, trend: "stable" },
  { id: "ajni", name: "Ajni", zone: "Central", category: "Established", description: "Railway Area", priceRange: { min: 2500000, max: 5500000 }, riskScore: 14, trend: "stable" },
  { id: "ganeshpeth", name: "Ganeshpeth", zone: "Central", category: "Established", description: "Central East", priceRange: { min: 2500000, max: 5000000 }, riskScore: 14, trend: "stable" },
  { id: "nara", name: "Nara", zone: "East", category: "Affordable", description: "East Affordable", priceRange: { min: 1000000, max: 2500000 }, riskScore: 26, trend: "stable" },
  { id: "sonegaon", name: "Sonegaon", zone: "South", category: "Established", description: "South Established", priceRange: { min: 2000000, max: 4500000 }, riskScore: 14, trend: "stable" },
  { id: "bhandara-road", name: "Bhandara Road", zone: "North", category: "Emerging", description: "North Corridor", priceRange: { min: 1200000, max: 3000000 }, riskScore: 22, trend: "up" },
  { id: "amravati-road", name: "Amravati Road", zone: "West", category: "Emerging", description: "West Corridor", priceRange: { min: 1500000, max: 3500000 }, riskScore: 18, trend: "up" },
  { id: "katol-road", name: "Katol Road", zone: "North", category: "Emerging", description: "North Highway", priceRange: { min: 1200000, max: 3000000 }, riskScore: 20, trend: "up" },
  { id: "mankapur", name: "Mankapur", zone: "North", category: "Established", description: "North Residential", priceRange: { min: 2000000, max: 4000000 }, riskScore: 16, trend: "stable" },
  { id: "friends-colony", name: "Friends Colony", zone: "West", category: "Established", description: "West Residential", priceRange: { min: 2500000, max: 5000000 }, riskScore: 12, trend: "stable" },
  { id: "surendra-nagar", name: "Surendra Nagar", zone: "West", category: "Established", description: "West Extension", priceRange: { min: 2000000, max: 4000000 }, riskScore: 14, trend: "stable" },
  { id: "sakkardara", name: "Sakkardara", zone: "East", category: "Established", description: "East Zone", priceRange: { min: 2000000, max: 4000000 }, riskScore: 15, trend: "stable" },
  { id: "congress-nagar", name: "Congress Nagar", zone: "Central", category: "Established", description: "Central South", priceRange: { min: 2500000, max: 5000000 }, riskScore: 13, trend: "stable" },
  { id: "narendra-nagar", name: "Narendra Nagar", zone: "South", category: "Established", description: "South Central", priceRange: { min: 2500000, max: 5000000 }, riskScore: 12, trend: "stable" },
  { id: "medical-square", name: "Medical Square", zone: "Central", category: "Established", description: "Hospital Area", priceRange: { min: 3000000, max: 6500000 }, riskScore: 10, trend: "stable" },
  { id: "law-college-square", name: "Law College Square", zone: "Central", category: "Established", description: "Educational Hub", priceRange: { min: 3500000, max: 7000000 }, riskScore: 9, trend: "stable" },
];

export const LOCALITY_COUNT = NAGPUR_LOCALITIES.length;

export const getLocalityById = (id: string): NagpurLocality | undefined => {
  return NAGPUR_LOCALITIES.find(l => l.id === id);
};

export const getLocalitiesByZone = (zone: NagpurLocality["zone"]): NagpurLocality[] => {
  return NAGPUR_LOCALITIES.filter(l => l.zone === zone);
};

export const getLocalitiesByCategory = (category: NagpurLocality["category"]): NagpurLocality[] => {
  return NAGPUR_LOCALITIES.filter(l => l.category === category);
};

export const getLocalityRiskScore = (name: string): number => {
  const locality = NAGPUR_LOCALITIES.find(l => l.name.toLowerCase() === name.toLowerCase());
  return locality?.riskScore ?? 30;
};

export const getLocalityPriceRange = (name: string): { min: number; max: number } => {
  const locality = NAGPUR_LOCALITIES.find(l => l.name.toLowerCase() === name.toLowerCase());
  return locality?.priceRange ?? { min: 1000000, max: 5000000 };
};

export const PREMIUM_LOCALITIES = NAGPUR_LOCALITIES.filter(l => l.category === "Premium");
export const EMERGING_LOCALITIES = NAGPUR_LOCALITIES.filter(l => l.category === "Emerging");
export const AFFORDABLE_LOCALITIES = NAGPUR_LOCALITIES.filter(l => l.category === "Affordable");
