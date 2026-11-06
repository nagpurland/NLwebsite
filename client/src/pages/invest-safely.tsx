import { PublicLayout } from "@/components/layout/PublicLayout";
import { ScrollToTop } from "@/components/utils/ScrollToTop";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ShieldAlert, FileText, Scale, Eye, CheckCircle2, TrendingUp, AlertTriangle, ClipboardCheck, FileCheck, MessageCircle, Users, Lock } from "lucide-react";
import { Link } from "wouter";

export default function InvestSafely() {
  const steps = [
    {
      number: "1",
      title: "Check Price Index",
      description: "Check the price index for your locality. Compare asking price with actual market rates. Avoid overpaying 20-30% that brokers often add as hidden margin.",
      icon: TrendingUp,
      link: "/step-1-market-intel",
      linkText: "Start Step 1"
    },
    {
      number: "2", 
      title: "Decision Wizard",
      description: "Use our Decision Wizard to filter risky plots. It flags legal red flags, TP scheme issues, NA status problems, and encroachment risks automatically.",
      icon: AlertTriangle,
      link: "/step-2-filter-risky",
      linkText: "Run Wizard"
    },
    {
      number: "3",
      title: "12-Point Safety Check",
      description: "The same 12-point checklist that property lawyers use. Covers title verification, encumbrance, mutation, tax receipts, and more. Spot issues in 30 minutes.",
      icon: ClipboardCheck,
      link: "/step-3-safety-check",
      linkText: "Get Checklist"
    },
    {
      number: "4",
      title: "Final Sanity Check",
      description: "Before you sign anything, get a final sanity check. We compile everything into a clear report showing what's safe and what needs attention.",
      icon: FileCheck,
      link: "/step-4-decision-report",
      linkText: "Generate Report"
    }
  ];

  const checkItems = [
    { title: "NA (Non-Agricultural) Status", desc: "Critical for plots. Without this, you can't legally build a permanent structure.", icon: FileText },
    { title: "TP (Town Planning) Scheme", desc: "Ensures the land is in a sanctioned layout and won't be acquired for roads.", icon: Scale },
    { title: "Recent Litigation", desc: "We scan court records for active disputes on the survey number.", icon: ShieldAlert },
    { title: "Circle Rate vs Asking", desc: "If the gap is too high, it's often a black money trap. We flag it.", icon: Eye },
  ];

  return (
    <PublicLayout>
      <ScrollToTop />
      <div className="bg-amber-50 dark:bg-amber-950/30 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-200 dark:bg-amber-900/50 dark:text-amber-300 mb-6 px-4 py-1.5 rounded-full font-bold tracking-widest text-[10px] uppercase border-none">
              Before You Buy
            </Badge>
            <h1 className="text-5xl md:text-6xl font-black tracking-tighter mb-8 text-slate-900 dark:text-white leading-none">
              Land Buying <span className="text-amber-600 dark:text-amber-400">Protocol</span>
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
              Before you buy any land, verify it legally. This 4-step framework helps you check everything a lawyer would check — without expensive consultations.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto mb-20">
          <h2 className="text-3xl font-black mb-4 text-center dark:text-white">The 4-Step Decision Framework</h2>
          <p className="text-center text-slate-600 dark:text-slate-400 mb-12 max-w-2xl mx-auto">
            Follow these steps in order. Most people complete them in 2-3 hours and avoid costly mistakes.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8">
            {steps.map((step, i) => (
              <div key={i} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 hover-elevate" data-testid={`step-card-${i}`}>
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-xl bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center shrink-0">
                    <span className="text-amber-700 dark:text-amber-300 font-black text-xl">{step.number}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <step.icon className="h-5 w-5 text-slate-500 dark:text-slate-400" />
                      <h3 className="font-bold text-lg dark:text-white">{step.title}</h3>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-4">{step.description}</p>
                    <Link href={step.link}>
                      <Button variant="outline" size="sm" data-testid={`button-step-${i}`}>
                        {step.linkText}
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-16 mb-20">
          <div>
            <h2 className="text-3xl font-black mb-8 dark:text-white">What We Check (and Why)</h2>
            <div className="space-y-8">
              {checkItems.map((item, i) => (
                <div key={i} className="flex gap-4" data-testid={`check-item-${i}`}>
                  <div className="h-12 w-12 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0">
                    <item.icon className="h-6 w-6 text-slate-700 dark:text-slate-300" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1 dark:text-white">{item.title}</h3>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-slate-900 text-white p-10 rounded-[2.5rem] relative overflow-hidden">
            <div className="relative z-10">
              <div className="bg-green-600/20 border border-green-500/30 rounded-2xl p-6 mb-8">
                <h3 className="text-xl font-black mb-3 text-green-300">Most People Do This Themselves</h3>
                <p className="text-green-100 font-medium text-sm leading-relaxed">
                  Use the checklist on the left to verify your plot independently. This framework covers 80% of what you need to know.
                </p>
              </div>

              <h3 className="text-2xl font-black mb-6">Our Promise of Honesty</h3>
              <p className="text-slate-300 mb-8 leading-relaxed">
                We are not lawyers. We are a tech-enabled intelligence layer. We flag obvious risks based on public records, but you must verify independently.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  <span className="font-bold">We never hide negative data</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  <span className="font-bold">We don't take commissions to hide flaws</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  <span className="font-bold">We prioritize your capital safety</span>
                </div>
              </div>

              <div className="border-t border-slate-700/50 pt-6 mt-8">
                <p className="text-slate-500 text-xs text-center">
                  Have a specific question?{" "}
                  <a 
                    href="mailto:help@nagpurland.com" 
                    className="text-slate-400 hover:text-white underline underline-offset-2"
                    data-testid="link-contact"
                  >
                    Contact us
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-100 to-slate-50 dark:from-slate-800 dark:to-slate-900 rounded-3xl p-10 mb-20">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8 mb-10">
              <div className="text-center">
                <div className="text-4xl font-black text-amber-600 dark:text-amber-400 mb-2">1,248+</div>
                <p className="text-slate-600 dark:text-slate-400 text-sm font-medium">People used this</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-black text-green-600 dark:text-green-400 mb-2">186</div>
                <p className="text-slate-600 dark:text-slate-400 text-sm font-medium">Avoided disaster</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-black text-blue-600 dark:text-blue-400 mb-2">12</div>
                <p className="text-slate-600 dark:text-slate-400 text-sm font-medium">Checkpoints covered</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-black text-purple-600 dark:text-purple-400 mb-2">2-3 hrs</div>
                <p className="text-slate-600 dark:text-slate-400 text-sm font-medium">Total time needed</p>
              </div>
            </div>

            <div className="flex items-center justify-center gap-2 text-slate-500 dark:text-slate-400">
              <Lock className="h-4 w-4" />
              <span className="text-sm">Your plot data stays private. Never shared with brokers.</span>
            </div>
          </div>
        </div>

        <div className="bg-slate-900 dark:bg-slate-950 rounded-3xl p-10 mb-20">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-black text-white mb-4">Ready to Start?</h2>
            <p className="text-slate-400 mb-8">Choose how you want to proceed. Most people start with Step 1 and complete all steps themselves.</p>
            
            <div className="grid md:grid-cols-3 gap-4 mb-8">
              <Link href="/step-1-market-intel">
                <Button className="w-full h-auto py-4 bg-amber-600 hover:bg-amber-700 text-white" data-testid="button-start-step1">
                  <div className="flex flex-col items-center gap-1">
                    <TrendingUp className="h-5 w-5 mb-1" />
                    <span className="font-bold">Start Step 1</span>
                    <span className="text-xs opacity-80">Check Price Index</span>
                  </div>
                </Button>
              </Link>
              
              <Link href="/plot-checkup">
                <Button variant="outline" className="w-full h-auto py-4 border-slate-600 text-white hover:bg-slate-800" data-testid="button-free-opinion">
                  <div className="flex flex-col items-center gap-1">
                    <Users className="h-5 w-5 mb-1" />
                    <span className="font-bold">Get Free Opinion</span>
                    <span className="text-xs opacity-80">12-Point Checkup</span>
                  </div>
                </Button>
              </Link>
              
              <a href="https://wa.me/919876543210?text=Hi%2C%20I%20need%20help%20with%20land%20verification" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="w-full h-auto py-4 border-green-600 text-green-400 hover:bg-green-950" data-testid="button-whatsapp">
                  <div className="flex flex-col items-center gap-1">
                    <MessageCircle className="h-5 w-5 mb-1" />
                    <span className="font-bold">WhatsApp Consultation</span>
                    <span className="text-xs opacity-80">Talk to an expert</span>
                  </div>
                </Button>
              </a>
            </div>
            
            <p className="text-slate-500 text-sm">Most people complete this themselves in 2-3 hours</p>
          </div>
        </div>

        <div className="max-w-3xl mx-auto" id="faq">
          <h2 className="text-3xl font-black mb-8 text-center dark:text-white">Common Questions About Land Buying</h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-lg font-bold dark:text-white" data-testid="faq-trigger-1">What is NA Status and why does it matter?</AccordionTrigger>
              <AccordionContent className="text-slate-600 dark:text-slate-400 leading-relaxed">
                NA (Non-Agricultural) status means the land has been converted from agricultural use to non-agricultural use. Without NA status, you cannot legally construct a permanent building. Always verify NA status before buying any plot.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-lg font-bold dark:text-white" data-testid="faq-trigger-2">How do I check for litigation on a plot?</AccordionTrigger>
              <AccordionContent className="text-slate-600 dark:text-slate-400 leading-relaxed">
                You can check litigation by searching the survey number on eCourts website, visiting the local sub-registrar office, or using our Decision Wizard which scans public records automatically.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="text-lg font-bold dark:text-white" data-testid="faq-trigger-3">What is the TP Scheme and why should I care?</AccordionTrigger>
              <AccordionContent className="text-slate-600 dark:text-slate-400 leading-relaxed">
                TP (Town Planning) Scheme is a government plan that may affect your land. Parts of your plot could be reserved for roads, amenities, or public facilities. Always check if your plot falls under any TP scheme before buying.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger className="text-lg font-bold dark:text-white" data-testid="faq-trigger-4">How long does the verification process take?</AccordionTrigger>
              <AccordionContent className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Using our 4-step framework, most people complete all verifications in 2-3 hours. This includes checking the price index, running the decision wizard, going through the 12-point checklist, and generating the final report.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </PublicLayout>
  );
}
