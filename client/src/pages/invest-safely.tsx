import { PublicLayout } from "@/components/layout/PublicLayout";
import { ScrollToTop } from "@/components/utils/ScrollToTop";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ShieldAlert, FileText, Scale, Eye, CheckCircle2, TrendingUp, AlertTriangle, ClipboardCheck, FileCheck, MessageCircle, Users, Lock } from "lucide-react";
import { Link } from "wouter";
import { whatsappUrl } from "@/lib/brand";

export default function InvestSafely() {
  const steps = [
    {
      number: "1",
      title: "Check the Area & Rate",
      description: "Note the area, work out the rate per sq.ft and learn which comparisons are useful.",
      icon: TrendingUp,
      link: "/step-1-market-intel",
      linkText: "Go to Step 1"
    },
    {
      number: "2", 
      title: "First Plot Check",
      description: "Answer five short questions to find missing information and early concerns.",
      icon: AlertTriangle,
      link: "/step-2-filter-risky",
      linkText: "Go to Step 2"
    },
    {
      number: "3",
      title: "12-Point Paper & Site Check",
      description: "Twelve checks covering ownership, loans on the land, mutation entries, tax receipts and more, each with a guide.",
      icon: ClipboardCheck,
      link: "/step-3-safety-check",
      linkText: "Go to Step 3"
    },
    {
      number: "4",
      title: "Your Plot Summary",
      description: "See your answers, open checks and questions to discuss with a property advocate.",
      icon: FileCheck,
      link: "/step-4-decision-report",
      linkText: "Go to Step 4"
    }
  ];

  const checkItems = [
    { title: "Land Use and NA Status", desc: "Confirm the land can legally be used for what you plan. Rules changed recently, so ask your advocate what applies.", icon: FileText },
    { title: "TP (Town Planning) Scheme", desc: "Find out whether the layout is sanctioned and whether any part is reserved for roads or public use.", icon: Scale },
    { title: "Court Disputes", desc: "Search court records using the owner's name and related details. A search can miss cases, so ask your advocate too.", icon: ShieldAlert },
    { title: "Ready Reckoner vs Asking Price", desc: "A large gap is worth asking about. Never agree to pay part of the price off the books.", icon: Eye },
  ];

  return (
    <PublicLayout>
      <ScrollToTop />
      <div className="bg-primary py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <Badge className="bg-white/10 text-accent hover:bg-white/10 shadow-none mb-6 px-4 py-1.5 rounded-full font-bold tracking-widest text-[10px] uppercase border-none">
              Before You Buy
            </Badge>
            <h1 className="text-5xl md:text-6xl mb-8 text-white leading-tight">
              Land Buying <span className="text-accent">Protocol</span>
            </h1>
            <p className="text-xl text-white/80 leading-relaxed">
              Before you buy any land, check it carefully. This 4-step framework helps you prepare for your advocate and ask better questions.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto mb-20">
          <h2 className="text-3xl font-semibold mb-4 text-center dark:text-white">The 4-Step Decision Framework</h2>
          <p className="text-center text-slate-600 dark:text-slate-400 mb-12 max-w-2xl mx-auto">
            Follow these steps in order. Collecting the documents usually takes the most time.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8">
            {steps.map((step, i) => (
              <div key={i} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 hover-elevate" data-testid={`step-card-${i}`}>
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-xl bg-primary/5 flex items-center justify-center shrink-0">
                    <span className="text-accent-strong font-display text-xl">{step.number}</span>
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
            <h2 className="text-3xl font-semibold mb-8 dark:text-white">What to Check (and Why)</h2>
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
          
          <div className="bg-primary text-white p-10 rounded-[2.5rem] relative overflow-hidden">
            <div className="relative z-10">
              <div className="bg-green-600/20 border border-green-500/30 rounded-2xl p-6 mb-8">
                <h3 className="text-xl font-semibold mb-3 text-green-300">You Can Start This Yourself</h3>
                <p className="text-green-100 font-medium text-sm leading-relaxed">
                  The checklist helps you find problems early. It doesn't replace an advocate's review of the documents.
                </p>
              </div>

              <h3 className="text-2xl font-semibold mb-6">Our Promise of Honesty</h3>
              <p className="text-slate-300 mb-8 leading-relaxed">
                We are not lawyers and this is not legal advice. We explain what to check, and you verify it with the official offices and your own advocate.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  <span className="font-bold">We don't list or sell land</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  <span className="font-bold">We don't take commission from sellers or brokers</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  <span className="font-bold">We never ask you to pay a token</span>
                </div>
              </div>

              <div className="border-t border-slate-700/50 pt-6 mt-8">
                <p className="text-slate-500 text-xs text-center">
                  Have a specific question?{" "}
                  <Link href="/contact" className="text-slate-400 hover:text-white underline underline-offset-2" data-testid="link-contact">
                    Contact us
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-primary dark:bg-slate-950 rounded-3xl p-10 mb-20">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-semibold text-white mb-4">Ready to Start?</h2>
            <p className="text-slate-400 mb-8">Start with Step 1, or go straight to the checklist if you already have a plot in mind.</p>
            
            <div className="grid md:grid-cols-3 gap-4 mb-8">
              <Link href="/step-1-market-intel">
                <Button className="w-full h-auto py-4 bg-accent text-accent-foreground hover:bg-accent/90" data-testid="button-start-step1">
                  <div className="flex flex-col items-center gap-1">
                    <TrendingUp className="h-5 w-5 mb-1" />
                    <span className="font-bold">Start Step 1</span>
                    <span className="text-xs opacity-80">Compare prices</span>
                  </div>
                </Button>
              </Link>
              
              <Link href="/plot-checkup">
                <Button variant="outline" className="w-full h-auto py-4 border-slate-600 text-white hover:bg-slate-800" data-testid="button-free-opinion">
                  <div className="flex flex-col items-center gap-1">
                    <Users className="h-5 w-5 mb-1" />
                    <span className="font-bold">Ask About Your Plot</span>
                    <span className="text-xs opacity-80">Send a question</span>
                  </div>
                </Button>
              </Link>
              
              <a href={whatsappUrl("Hi, I have a question about buying land in Nagpur.")} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="w-full h-auto py-4 border-green-600 text-green-400 hover:bg-green-950" data-testid="button-whatsapp">
                  <div className="flex flex-col items-center gap-1">
                    <MessageCircle className="h-5 w-5 mb-1" />
                    <span className="font-bold">Message on WhatsApp</span>
                    <span className="text-xs opacity-80">Ask a question</span>
                  </div>
                </Button>
              </a>
            </div>
            
          </div>
        </div>

        <div className="max-w-3xl mx-auto" id="faq">
          <h2 className="text-3xl font-semibold mb-8 text-center dark:text-white">Common Questions About Land Buying</h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-lg font-bold dark:text-white" data-testid="faq-trigger-1">What is NA Status and why does it matter?</AccordionTrigger>
              <AccordionContent className="text-slate-600 dark:text-slate-400 leading-relaxed">
                NA (Non-Agricultural) status relates to whether land may be used for something other than farming. Maharashtra changed these rules recently, so ask your advocate what applies to the plot before you buy.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-lg font-bold dark:text-white" data-testid="faq-trigger-2">How do I check for litigation on a plot?</AccordionTrigger>
              <AccordionContent className="text-slate-600 dark:text-slate-400 leading-relaxed">
                You can search the eCourts website using party names and case details. An online search can miss cases, so ask your advocate to run a proper search as well.
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
                It depends on the plot and the offices involved. Reading the steps takes minutes, but collecting documents can take days or longer, and you should allow time for your advocate.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </PublicLayout>
  );
}
