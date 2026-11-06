export const BRAND = {
  name: "NagpurLand Intelligence",
  shortName: "NagpurLand",
  tagline: "Trusted Real Estate OS for Nagpur",
  website: "https://nagpurland.com",
  phone: "+91 9876543210",
  email: "info@nagpurland.com",
  address: "Dharampeth, Nagpur, Maharashtra 440010",
  footer: "Data-Driven Decisions for Smart Property Investments",
};

export function generatePropertyReport(property: {
  title: string;
  locality: string;
  price: number;
  bedrooms?: number | null;
  bathrooms?: number | null;
  area?: number | null;
  propertyType: string;
  aiScore?: number | null;
}) {
  const priceFormatted = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(property.price);

  const specs = [];
  if (property.bedrooms) specs.push(`${property.bedrooms} BHK`);
  if (property.area) specs.push(`${property.area} sq.ft`);

  const lines = [
    `*PROPERTY LISTING*`,
    `*${property.title}*`,
    `Location: ${property.locality}, Nagpur`,
    ``,
    `*Price:* ${priceFormatted}`,
    specs.length ? `*Specs:* ${specs.join(' | ')}` : '',
    `*Type:* ${property.propertyType}`,
    property.aiScore ? `*AI Score:* ${property.aiScore}/100` : '',
    ``,
    `---`,
    `*${BRAND.name}*`,
    `${BRAND.tagline}`,
    `Phone: ${BRAND.phone}`,
    `Web: ${BRAND.website}`,
  ].filter(Boolean);

  return lines.join('\n');
}

export function generateAnalyticsReport(data: {
  totalLeads: number;
  highIntentLeads: number;
  propertiesListed: number;
  topLocalities: string[];
}) {
  const lines = [
    `*MARKET INTELLIGENCE REPORT*`,
    `---`,
    ``,
    `*Key Metrics*`,
    `- Total Leads: ${data.totalLeads}`,
    `- High Intent Leads: ${data.highIntentLeads}`,
    `- Properties Listed: ${data.propertiesListed}`,
    ``,
    `*Hot Localities*`,
    ...data.topLocalities.slice(0, 4).map(loc => `- ${loc}`),
    ``,
    `---`,
    `*${BRAND.name}*`,
    `${BRAND.tagline}`,
    `Phone: ${BRAND.phone}`,
    `Web: ${BRAND.website}`,
  ];

  return lines.join('\n');
}

export function generateLocalityReport(locality: {
  name: string;
  avgPrice: number;
  priceGrowth: number;
  demandScore: number;
  infrastructure: string;
}) {
  const priceFormatted = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(locality.avgPrice);

  const lines = [
    `*LOCALITY INSIGHT*`,
    `*${locality.name}*`,
    `---`,
    ``,
    `*Avg. Price:* ${priceFormatted}/sq.ft`,
    `*Growth:* ${locality.priceGrowth > 0 ? '+' : ''}${locality.priceGrowth}%`,
    `*Demand Score:* ${locality.demandScore}/100`,
    `*Infrastructure:* ${locality.infrastructure}`,
    ``,
    `---`,
    `*${BRAND.name}*`,
    `${BRAND.tagline}`,
    `Phone: ${BRAND.phone}`,
    `Web: ${BRAND.website}`,
  ];

  return lines.join('\n');
}

export function getWhatsAppShareUrl(message: string, phoneNumber?: string): string {
  const encodedMessage = encodeURIComponent(message);
  if (phoneNumber) {
    const cleanPhone = phoneNumber.replace(/\D/g, '');
    return `https://wa.me/${cleanPhone}?text=${encodedMessage}`;
  }
  return `https://wa.me/?text=${encodedMessage}`;
}
