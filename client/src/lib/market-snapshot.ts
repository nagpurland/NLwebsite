import type { Language } from "@/lib/i18n/site";

// Every figure on the Step 1 market snapshot lives here, with its source, month and link.
// These are third-party asking rates, not NagpurLand's own data and not sale prices.
// Refresh them at least every six months (a test fails when they are older), and leave a
// row without a figure rather than guess one.
type Localized = Record<Language, string>;

export const SNAPSHOT_CHECKED_ON = "2026-11-07";

export interface AreaRate {
  id: string;
  area: Localized;
  rate: number | null; // asking sale price for apartments, ₹ per sq ft
  change: string | null;
  changeNote?: Localized;
  asOf: string | null; // YYYY-MM
  source: string;
  url: string | null;
}

export interface ContextFact {
  id: string;
  text: Localized;
  source: string;
  date: string; // YYYY-MM-DD, when the source was published
  url: string;
}

export const AREA_RATES: AreaRate[] = [
  {
    id: "mihan",
    area: { en: "MIHAN", hi: "मिहान", mr: "मिहान" },
    rate: 6700,
    change: "+9.6%",
    changeNote: {
      en: "The source calls this annual but gives no start date.",
      hi: "स्रोत इसे सालाना बताता है, पर शुरुआती तारीख नहीं देता।",
      mr: "स्रोत याला वार्षिक म्हणतो, पण सुरुवातीची तारीख देत नाही.",
    },
    asOf: "2026-09",
    source: "Square Yards",
    url: "https://www.squareyards.com/property-rates/mihan-nagpur",
  },
  {
    id: "besa",
    area: { en: "Besa", hi: "बेसा", mr: "बेसा" },
    rate: 5700,
    change: "+18.72%",
    changeNote: {
      en: "Described by the source as year on year.",
      hi: "स्रोत इसे साल-दर-साल बदलाव बताता है।",
      mr: "स्रोत याला वर्षानुवर्षे बदल म्हणतो.",
    },
    asOf: "2026-09",
    source: "Square Yards",
    url: "https://www.squareyards.com/property-rates/besa-nagpur",
  },
  {
    id: "hingna",
    area: { en: "Hingna", hi: "हिंगणा", mr: "हिंगणा" },
    rate: 3650,
    change: "+4.44%",
    changeNote: {
      en: "Over the last quarter, as the source states.",
      hi: "पिछली तिमाही में, जैसा स्रोत बताता है।",
      mr: "मागील तिमाहीत, स्रोताने सांगितल्याप्रमाणे.",
    },
    asOf: "2026-09",
    source: "Square Yards",
    url: "https://www.squareyards.com/property-rates/hingna-nagpur",
  },
  { id: "wardha-road", area: { en: "Wardha Road", hi: "वर्धा रोड", mr: "वर्धा रोड" }, rate: null, change: null, asOf: null, source: "", url: null },
  { id: "civil-lines", area: { en: "Civil Lines", hi: "सिविल लाइन्स", mr: "सिव्हिल लाइन्स" }, rate: null, change: null, asOf: null, source: "", url: null },
];

export const CONTEXT: ContextFact[] = [
  {
    id: "rbi-index",
    text: {
      en: "Citywide: the RBI's housing price index put Nagpur at 138.24 in Q3 of FY 2025-26, the highest of 18 cities and above the all-India figure of 115.6. It covers housing in general, not land.",
      hi: "पूरे शहर के लिए: आरबीआई के हाउसिंग प्राइस इंडेक्स में वित्त वर्ष 2025-26 की तीसरी तिमाही में नागपुर 138.24 पर रहा, जो 18 शहरों में सबसे ऊँचा है और पूरे भारत के 115.6 से ऊपर है। यह आम आवास का सूचकांक है, ज़मीन का नहीं।",
      mr: "संपूर्ण शहरासाठी: आरबीआयच्या गृहनिर्माण किंमत निर्देशांकात आर्थिक वर्ष 2025-26 च्या तिसऱ्या तिमाहीत नागपूर 138.24 वर होते, जे 18 शहरांत सर्वाधिक आहे आणि संपूर्ण भारताच्या 115.6 पेक्षा जास्त आहे. हा निर्देशांक सामान्य घरांचा आहे, जमिनीचा नाही.",
    },
    source: "Nagpur Today",
    date: "2026-02-27",
    url: "https://www.nagpurtoday.in/nagpur-home-prices-soar-to-highest-in-india-rbi-data-reveals/",
  },
  {
    id: "ready-reckoner",
    text: {
      en: "Ready reckoner: Maharashtra has frozen the 2026-27 revision, and there is no proposal to raise the rates. Check the current rate for your plot on the IGR Maharashtra website.",
      hi: "रेडी रेकनर: महाराष्ट्र ने 2026-27 का संशोधन रोक दिया है और दरें बढ़ाने का कोई प्रस्ताव नहीं है। अपने प्लॉट की मौजूदा दर आईजीआर महाराष्ट्र की वेबसाइट पर देखें।",
      mr: "रेडी रेकनर: महाराष्ट्राने 2026-27 चे पुनरावलोकन थांबवले आहे आणि दर वाढवण्याचा कोणताही प्रस्ताव नाही. तुमच्या प्लॉटचा सध्याचा दर आयजीआर महाराष्ट्राच्या वेबसाइटवर पाहा.",
    },
    source: "Nagpur Today",
    date: "2026-04-01",
    url: "https://www.nagpurtoday.in/relief-maharashtra-freezes-ready-reckoner-rates-for-2026-27/",
  },
];
