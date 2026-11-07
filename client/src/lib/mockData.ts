export const PROPERTIES = [
  {
    id: 1,
    project_name: "Godrej Orchard Plot",
    locality: "Besa",
    property_type: "Residential Plot",
    price_total: 4500000,
    price_psf: 3000,
    area: 1500,
    unit: "sq.ft",
    status: "Active",
    is_undervalued: true,
    last_seen: "2 hours ago",
    trend: "down",
    source: "99acres"
  },
  {
    id: 2,
    project_name: "MIHAN South Land",
    locality: "MIHAN",
    property_type: "NA Converted",
    price_total: 5800000,
    price_psf: 4500,
    area: 1290,
    unit: "sq.ft",
    status: "Active",
    is_undervalued: false,
    last_seen: "5 hours ago",
    trend: "stable",
    source: "MagicBricks"
  },
  {
    id: 3,
    project_name: "Wardha Road Corner",
    locality: "Wardha Road",
    property_type: "Commercial Plot",
    price_total: 4200000,
    price_psf: 3800,
    area: 1100,
    unit: "sq.ft",
    status: "Active",
    is_undervalued: true,
    last_seen: "1 day ago",
    trend: "up",
    source: "Housing.com"
  },
  {
    id: 4,
    project_name: "Hingna Industrial",
    locality: "Hingna",
    property_type: "Industrial Plot",
    price_total: 8500000,
    price_psf: 4200,
    area: 2023,
    unit: "sq.ft",
    status: "Active",
    is_undervalued: true,
    last_seen: "Just now",
    trend: "stable",
    source: "Direct"
  },
  {
    id: 5,
    project_name: "Manish Nagar Plot",
    locality: "Manish Nagar",
    property_type: "Residential Plot",
    price_total: 3500000,
    price_psf: 2800,
    area: 1250,
    unit: "sq.ft",
    status: "Active",
    is_undervalued: false,
    last_seen: "3 hours ago",
    trend: "up",
    source: "99acres"
  }
];

export const LEADS = [
  {
    id: 1,
    name: "Rajesh Kumar",
    phone: "+91 98765 43210",
    budget: "40-60L",
    locality: "MIHAN",
    status: "New",
    priority: "Hot",
    last_contact: "10 mins ago",
    source: "WhatsApp"
  },
  {
    id: 2,
    name: "Sneha Patil",
    phone: "+91 99887 76655",
    budget: "1Cr+",
    locality: "Civil Lines",
    status: "Engaged",
    priority: "Warm",
    last_contact: "Yesterday",
    source: "Website"
  },
  {
    id: 3,
    name: "Amit Deshmukh",
    phone: "+91 88776 65544",
    budget: "20-30L",
    locality: "Besa",
    status: "Closed Won",
    priority: "Cold",
    last_contact: "2 days ago",
    source: "Referral"
  },
  {
    id: 4,
    name: "Priya Sharma",
    phone: "+91 77665 54433",
    budget: "50-70L",
    locality: "Wardha Road",
    status: "Site Visit",
    priority: "Hot",
    last_contact: "Today",
    source: "Instagram"
  }
];

export const INTEL = [
  {
    id: 1,
    title: "Metro Phase 2 Expansion Approved for Wardha Road",
    source: "Nagpur Today",
    summary: "The cabinet has cleared the new metro line extension which will connect MIHAN to Butibori, expected to boost property prices by 15% in the corridor.",
    content: `
      <p class="mb-4">The Maharashtra Cabinet has officially approved the Phase-2 expansion of the Nagpur Metro, a game-changing infrastructure project that will extend the connectivity from MIHAN all the way to Butibori. This 43.8 km expansion is not just a transit update; it's a massive signal for real estate investors.</p>
      
      <h3 class="text-xl font-bold mb-2 mt-6">Why this matters for Investors</h3>
      <p class="mb-4">Historically, metro expansions in Tier-2 cities like Nagpur have led to a <strong>15-20% appreciation</strong> in property values within a 500m radius of proposed stations. The Wardha Road corridor, already a hotbed for development, is now poised for another breakout rally.</p>
      
      <ul class="list-disc pl-5 mb-6 space-y-2">
        <li><strong>Commercial Impact:</strong> Expect rental yields in commercial complexes near Butibori to rise as connectivity improves for the workforce.</li>
        <li><strong>Residential Demand:</strong> Commute times from Butibori industrial estate to Nagpur city center will drop by 40 minutes, making the "suburbs" viable for daily commuters.</li>
      </ul>

      <h3 class="text-xl font-bold mb-2 mt-6">Strategic Advice</h3>
      <p class="mb-4">If you are holding land parcels in this belt, <strong>do not sell yet</strong>. Wait for the actual ground-breaking ceremony expected in Q4 2024. If you are looking to buy, the window to enter at current "pre-metro" prices is closing rapidly.</p>
    `,
    tags: ["Infra", "Metro", "Wardha Road"],
    sentiment: "positive",
    date: "2024-03-15",
    author: "Sandeep Deshpande",
    readTime: "4 min read"
  },
  {
    id: 2,
    title: "New IT Park Announced near Hingna",
    source: "Times of India",
    summary: "A 50-acre IT park is being planned near Hingna. Land acquisition notices have been sent to local farmers.",
    content: `
      <p class="mb-4">In a major boost to Nagpur's status as an emerging IT hub, the state government has notified land acquisition for a new 50-acre IT Park near Hingna. This development comes as the existing MIHAN SEZ nears saturation for prime plots.</p>
      
      <h3 class="text-xl font-bold mb-2 mt-6">The "Hingna Shift"</h3>
      <p class="mb-4">Hingna has traditionally been an educational and industrial hub. The introduction of an IT park changes the demographic profile of the area completely. We expect a surge in demand for:</p>
      
      <ul class="list-disc pl-5 mb-6 space-y-2">
        <li><strong>Studio Apartments:</strong> For young IT professionals.</li>
        <li><strong>Co-living Spaces:</strong> A largely untapped market in this zone.</li>
        <li><strong>Retail & F&B:</strong> To support the new workforce.</li>
      </ul>

      <h3 class="text-xl font-bold mb-2 mt-6">Investment Window</h3>
      <p class="mb-4">Land prices in Hingna are currently 30-40% lower than Wardha Road. This arbitrage will not last. This is a classic "Path of Progress" play.</p>
    `,
    tags: ["Commercial", "Hingna", "Job Market"],
    sentiment: "positive",
    date: "2024-03-14",
    author: "Priya Sharma",
    readTime: "3 min read"
  },
  {
    id: 3,
    title: "Water Shortage Issues in Besa-Pipla Belt",
    source: "Hitavada",
    summary: "Residents of several townships in Besa are complaining about irregular water supply from the gram panchayat.",
    content: `
      <p class="mb-4">While Besa-Pipla has seen explosive residential growth, the civic infrastructure is struggling to keep up. Recent reports indicate severe water shortages in several premium townships, forcing residents to rely on private tankers.</p>
      
      <h3 class="text-xl font-bold mb-2 mt-6">The Risk for Buyers</h3>
      <p class="mb-4">Buying a home is not just about the apartment; it's about the utilities. A property without reliable water connection will suffer from:</p>
      
      <ul class="list-disc pl-5 mb-6 space-y-2">
        <li><strong>Lower Rental Yields:</strong> Tenants will vacate quickly.</li>
        <li><strong>Resale Difficulty:</strong> Word spreads fast in local markets.</li>
      </ul>

      <h3 class="text-xl font-bold mb-2 mt-6">Our Recommendation</h3>
      <p class="mb-4">Verify if your target project has a dedicated water line from NMC or if it is solely dependent on groundwater/tankers. Ask the builder for the "Water Sanction Letter" before signing.</p>
    `,
    tags: ["Civic Issue", "Besa", "Water"],
    sentiment: "negative",
    date: "2024-03-12",
    author: "Editorial Team",
    readTime: "2 min read"
  }
];

export const ANALYTICS = [
  { name: 'Jan', price: 3200, sales: 12 },
  { name: 'Feb', price: 3350, sales: 19 },
  { name: 'Mar', price: 3300, sales: 15 },
  { name: 'Apr', price: 3450, sales: 22 },
  { name: 'May', price: 3600, sales: 28 },
  { name: 'Jun', price: 3550, sales: 25 },
];

export const SCRAPING_SOURCES = [
  {
    id: 'src_01',
    name: '99acres Nagpur Listings',
    provider: 'apify',
    actor_id: 'easyapi/99acres-com-scraper',
    status: 'active',
    last_run: '2 hours ago',
    items_fetched_total: 12450,
    config: {
      location: 'Nagpur',
      max_items: 500,
    }
  },
  {
    id: 'src_02',
    name: 'MagicBricks Nagpur Listings',
    provider: 'apify',
    actor_id: 'apify/magicbricks-scraper',
    status: 'active',
    last_run: '5 hours ago',
    items_fetched_total: 8930,
    config: {
      location: 'Nagpur',
      max_items: 500,
    }
  },
  {
    id: 'src_03',
    name: 'Facebook Pages - Competitors',
    provider: 'apify',
    actor_id: 'apify/facebook-pages-scraper',
    status: 'paused',
    last_run: '2 days ago',
    items_fetched_total: 450,
    config: {
      pages: ['@competitor1', '@competitor2'],
      max_items: 50,
    }
  }
];

export const SCRAPING_JOBS = [
  {
    id: 'job_1024',
    source_id: 'src_01',
    source_name: '99acres Nagpur Listings',
    status: 'completed',
    started_at: '2024-03-20 09:00:00',
    duration: '4m 12s',
    items_count: 52,
    error: null
  },
  {
    id: 'job_1025',
    source_id: 'src_02',
    source_name: 'MagicBricks Nagpur Listings',
    status: 'failed',
    started_at: '2024-03-20 10:15:00',
    duration: '0m 45s',
    items_count: 0,
    error: 'Timeout waiting for selector .listing-card'
  },
  {
    id: 'job_1026',
    source_id: 'src_01',
    source_name: '99acres Nagpur Listings',
    status: 'running',
    started_at: 'Just now',
    duration: '0m 12s',
    items_count: 15,
    error: null
  }
];

export const SCRAPING_LOGS = [
  { id: 1, job_id: 'job_1026', timestamp: '10:00:01', level: 'info', message: 'Starting actor run easyapi/99acres-com-scraper' },
  { id: 2, job_id: 'job_1026', timestamp: '10:00:05', level: 'info', message: 'Navigating to search results page...' },
  { id: 3, job_id: 'job_1026', timestamp: '10:00:08', level: 'info', message: 'Found 1,240 results. Processing first page.' },
  { id: 4, job_id: 'job_1026', timestamp: '10:00:12', level: 'debug', message: 'Extracted 15 items from page 1.' },
];
