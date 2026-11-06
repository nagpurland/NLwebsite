import { db } from "../db";
import { aiBudgetTracking } from "@shared/schema";
import { eq, and } from "drizzle-orm";

const CONTENT_TYPE_PROMPTS: Record<string, string> = {
  "12-point-guide": `You are a real estate expert writing for NagpurLand, a platform helping people safely buy land in Nagpur, India. 
Write a detailed, actionable guide that explains one of the 12 safety verification checkpoints for buying land.
Include: Step-by-step instructions, What documents to ask for, Where to verify in Nagpur (specific office addresses if known), Red flags to watch for, and a FAQ section.
Format in Markdown with proper headings (## for main sections, ### for subsections).`,

  "case-study": `You are a real estate expert writing for NagpurLand. 
Write a case study about a real or realistic land buying scenario in Nagpur.
Include: The buyer's situation, What they did right/wrong, The outcome, Lessons learned.
Make it relatable and educational. Use Nagpur localities like MIHAN, Wardha Road, Besa, Manish Nagar, etc.
Format in Markdown.`,

  "market-trend": `You are a real estate market analyst writing for NagpurLand.
Write an analysis of current market trends for land in Nagpur.
Include: Price movements, Hot localities, Infrastructure developments, Employment trends, Investment outlook.
Be data-driven and specific to Nagpur. Reference real areas and developments.
Format in Markdown.`,

  "qa": `You are a real estate expert answering common questions about land buying in Nagpur.
Write a Q&A article addressing common concerns buyers have.
Include 5-7 questions with detailed answers. Focus on practical, actionable advice.
Topics can include: Legal verification, Price negotiation, Documentation, Common scams, etc.
Format in Markdown with each Q&A as a section.`,

  "legal-update": `You are a legal expert writing for NagpurLand.
Write about recent legal developments affecting land buyers in Maharashtra/Nagpur.
Include: What changed, Who it affects, What buyers should do, Compliance deadlines.
Be accurate and practical. Reference RERA, land revenue laws, stamp duty, etc.
Format in Markdown.`,

  "tips-hacks": `You are a seasoned real estate advisor writing for NagpurLand.
Write a collection of practical tips and insider knowledge for land buyers in Nagpur.
Include 7-10 actionable tips that save money, time, or prevent problems.
Be specific to Nagpur market dynamics.
Format in Markdown with each tip as a numbered item.`,

  "recap": `You are a real estate journalist writing a weekly recap for NagpurLand.
Summarize the week's key developments in Nagpur real estate.
Include: Price changes, New infrastructure announcements, Market sentiment, What to watch next week.
Keep it concise but informative.
Format in Markdown.`
};

interface GenerateBlogRequest {
  contentType: string;
  locality?: string;
  topic: string;
  tone: "casual" | "professional";
  provider: "gemini" | "perplexity";
}

interface GenerateBlogResponse {
  title: string;
  content: string;
  metaDescription: string;
  excerpt: string;
  slug: string;
  provider: string;
  costUsd: string;
}

async function getCurrentMonthBudget(provider: string): Promise<{ spent: number; budget: number; remaining: number }> {
  const currentMonth = new Date().toISOString().slice(0, 7);
  
  const existing = await db.select().from(aiBudgetTracking)
    .where(and(eq(aiBudgetTracking.month, currentMonth), eq(aiBudgetTracking.provider, provider)))
    .limit(1);
  
  if (existing.length === 0) {
    await db.insert(aiBudgetTracking).values({
      month: currentMonth,
      provider,
      monthlyBudget: "5.00",
      totalSpent: "0.00",
      requestCount: 0
    });
    return { spent: 0, budget: 5, remaining: 5 };
  }
  
  const record = existing[0];
  const spent = parseFloat(record.totalSpent || "0");
  const budget = parseFloat(record.monthlyBudget || "5");
  return { spent, budget, remaining: budget - spent };
}

async function updateBudgetSpend(provider: string, cost: number): Promise<void> {
  const currentMonth = new Date().toISOString().slice(0, 7);
  
  const existing = await db.select().from(aiBudgetTracking)
    .where(and(eq(aiBudgetTracking.month, currentMonth), eq(aiBudgetTracking.provider, provider)))
    .limit(1);
  
  if (existing.length > 0) {
    const newSpent = parseFloat(existing[0].totalSpent || "0") + cost;
    await db.update(aiBudgetTracking)
      .set({
        totalSpent: newSpent.toFixed(2),
        requestCount: (existing[0].requestCount || 0) + 1,
        lastRequestAt: new Date(),
        updatedAt: new Date()
      })
      .where(eq(aiBudgetTracking.id, existing[0].id));
  }
}

function createSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 80);
}

async function generateWithGemini(prompt: string): Promise<{ content: string; cost: number }> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY not configured. Please add it to your secrets.");
  }

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 4000
        }
      })
    }
  );

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Gemini API error: ${error}`);
  }

  const data = await response.json();
  const content = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
  
  return { content, cost: 0 };
}

async function generateWithPerplexity(prompt: string): Promise<{ content: string; cost: number }> {
  const apiKey = process.env.PERPLEXITY_API_KEY;
  if (!apiKey) {
    throw new Error("PERPLEXITY_API_KEY not configured. Please add it to your secrets.");
  }

  const response = await fetch('https://api.perplexity.ai/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'llama-3.1-sonar-small-128k-online',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 4000,
      temperature: 0.7
    })
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Perplexity API error: ${error}`);
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content || '';
  
  const estimatedCost = 0.50;
  
  return { content, cost: estimatedCost };
}

export async function generateBlogContent(request: GenerateBlogRequest): Promise<GenerateBlogResponse> {
  const { contentType, locality, topic, tone, provider } = request;
  
  if (provider === "perplexity") {
    const budget = await getCurrentMonthBudget("perplexity");
    if (budget.remaining < 0.5) {
      throw new Error(`Perplexity budget exhausted. Remaining: $${budget.remaining.toFixed(2)}. Switch to Gemini (free).`);
    }
  }
  
  const systemPrompt = CONTENT_TYPE_PROMPTS[contentType] || CONTENT_TYPE_PROMPTS["12-point-guide"];
  
  const toneInstruction = tone === "casual" 
    ? "Write in a friendly, conversational tone. Use 'you' and 'your' often. Keep sentences short."
    : "Write in a professional, authoritative tone. Be thorough and precise.";
  
  const localityContext = locality 
    ? `Focus specifically on ${locality} locality in Nagpur.` 
    : "Cover Nagpur in general with examples from popular localities.";
  
  const fullPrompt = `${systemPrompt}

${toneInstruction}
${localityContext}

Topic: ${topic}

Generate a complete blog post with:
1. An engaging title (start with: TITLE: )
2. A meta description for SEO (start with: META: )
3. The full blog content in Markdown format (start with: CONTENT:)

Make the content 1000-1500 words, well-structured, and actionable.`;

  let result: { content: string; cost: number };
  
  if (provider === "gemini") {
    result = await generateWithGemini(fullPrompt);
  } else {
    result = await generateWithPerplexity(fullPrompt);
    await updateBudgetSpend("perplexity", result.cost);
  }
  
  const lines = result.content.split('\n');
  let title = topic;
  let metaDescription = "";
  let content = "";
  let inContent = false;
  
  for (const line of lines) {
    if (line.startsWith("TITLE:")) {
      title = line.replace("TITLE:", "").trim();
    } else if (line.startsWith("META:")) {
      metaDescription = line.replace("META:", "").trim();
    } else if (line.startsWith("CONTENT:")) {
      inContent = true;
    } else if (inContent) {
      content += line + "\n";
    }
  }
  
  if (!content || content.length < 100) {
    content = result.content;
  }
  
  const excerpt = content.split('\n').slice(0, 3).join(' ').replace(/[#*]/g, '').slice(0, 200) + "...";
  
  return {
    title,
    content: content.trim(),
    metaDescription: metaDescription || excerpt.slice(0, 160),
    excerpt,
    slug: createSlug(title),
    provider,
    costUsd: result.cost.toFixed(2)
  };
}

export async function getBudgetStatus(): Promise<{
  gemini: { spent: number; budget: number; remaining: number };
  perplexity: { spent: number; budget: number; remaining: number };
}> {
  return {
    gemini: await getCurrentMonthBudget("gemini"),
    perplexity: await getCurrentMonthBudget("perplexity")
  };
}
