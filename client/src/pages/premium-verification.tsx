import { useState } from "react";
import { Link } from "wouter";
import { CONTACT, whatsappUrl } from "@/lib/brand";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { ScrollToTop } from "@/components/utils/ScrollToTop";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  FileCheck, Users, Building, Landmark, Clock, ArrowLeft,
  CheckCircle, FileText, Scale, MapPin, Banknote, Search,
  Shield, Eye, Phone, Mail, Calendar, TrendingUp, AlertCircle,
  ChevronRight, Download, MessageCircle
} from "lucide-react";

const VERIFICATION_ITEMS = [
  {
    id: 1,
    title: "Complete Title Audit",
    scope: "30-year ownership history verification",
    method: "Physical search at revenue office + online registry",
    deliverable: "Chronological document showing all owners & transfers",
    shows: "Who owned the plot, when, any inheritance/gifts/sales",
    time: "2-3 business days",
    icon: FileText
  },
  {
    id: 2,
    title: "Litigation Full Scan",
    scope: "All courts (district + high court + supreme court)",
    method: "Online database + physical court records check",
    deliverable: "Report listing all cases (if any exist)",
    shows: "If anyone is suing about this plot",
    time: "2-3 business days",
    icon: Landmark
  },
  {
    id: 3,
    title: "NA/TP Status Verification",
    scope: "Non-Agricultural certificate + Town Planning scheme check",
    method: "Revenue department verification + official records",
    deliverable: "Certificate copy or official status letter",
    shows: "Plot is legally approved for residential/commercial use",
    time: "1-2 business days",
    icon: Scale
  },
  {
    id: 4,
    title: "Encumbrance Check",
    scope: "Mortgage, bank lien, or any claims on the plot",
    method: "Bank records search + official registry check",
    deliverable: "Clear encumbrance certificate",
    shows: "No one else has rights/claims to your plot",
    time: "2 business days",
    icon: Banknote
  },
  {
    id: 5,
    title: "Possession Verification",
    scope: "Can the seller actually give you possession?",
    method: "Site visit + document verification + seller meeting",
    deliverable: "Physical inspection report + possession status confirmation",
    shows: "Seller can legally hand over the plot to you",
    time: "1-2 business days",
    icon: Building
  },
  {
    id: 6,
    title: "Market Price Validation",
    scope: "Is the price fair compared to market rates?",
    method: "Compare against 50+ recent sales in the same area",
    deliverable: "Price benchmark report with fair market range",
    shows: "Are you overpaying? Getting a good deal? Fair price?",
    time: "2 business days",
    icon: TrendingUp
  },
  {
    id: 7,
    title: "Risk Assessment & Legal Opinion",
    scope: "Professional legal analysis of all findings",
    method: "Our lawyer reviews all documents + identifies risks",
    deliverable: "Written legal opinion (1-2 pages)",
    shows: "Final verdict - SAFE / CAUTION / DON'T BUY",
    time: "1 business day",
    icon: Shield
  },
  {
    id: 8,
    title: "Final Verification Report",
    scope: "Complete documentation package",
    method: "Compilation of all findings into comprehensive report",
    deliverable: "PDF report (10-15 pages) via email + dashboard",
    shows: "Everything you need to make an informed decision",
    time: "Ready on Day 7-10",
    icon: FileCheck
  }
];

const PROCESS_STEPS = [
  {
    day: "Day 0-1",
    title: "You Submit Plot Details",
    whatYouDo: [
      "Fill online form with plot address",
      "Provide survey number or property ID",
      "Share seller name + contact",
      "Enter price offered to you"
    ],
    whatHappens: [
      "Email confirmation sent",
      "Dashboard access provided",
      "Our team prepares work plan"
    ],
    time: "5 minutes"
  },
  {
    day: "Day 2-3",
    title: "Records Office Verification",
    whatWeDo: [
      "Visit Maharashtra Land Records office physically",
      "Pull complete 30-year title history",
      "Verify ownership changes (sales, gifts, inheritance)",
      "Photograph all original documents"
    ],
    result: "Title audit document + ownership chain copies"
  },
  {
    day: "Day 2-4",
    title: "Court Records Search",
    whatWeDo: [
      "Search district court (land disputes, boundary cases)",
      "Search high court (inheritance, succession disputes)",
      "Check property ID in all online databases",
      "Contact court staff for manual checks if needed"
    ],
    result: "Complete litigation report with case details"
  },
  {
    day: "Day 2-3",
    title: "Revenue Department Confirmation",
    whatWeDo: [
      "Verify NA (Non-Agricultural) certificate status",
      "Check TP (Town Planning) scheme compliance",
      "Confirm plot zone (residential/commercial/industrial)",
      "Get official confirmation letter"
    ],
    result: "NA certificate + zone verification + FSI details"
  },
  {
    day: "Day 3-4",
    title: "Bank & Mortgage Check",
    whatWeDo: [
      "Search national mortgage registry (all banks)",
      "Check if plot is pledged as collateral",
      "Verify no liens or legal claims exist",
      "Request encumbrance certificate"
    ],
    result: "Clear encumbrance certificate"
  },
  {
    day: "Day 4-5",
    title: "Physical Site Verification",
    whatWeDo: [
      "Visit the plot physically",
      "Verify plot matches documents exactly",
      "Check approach road, utilities",
      "Meet seller & verify possession",
      "Speak with neighbors"
    ],
    result: "Physical inspection report + photos"
  },
  {
    day: "Day 5-6",
    title: "Market Price Analysis",
    whatWeDo: [
      "Collect data from 50+ recent sales",
      "Compare your plot price against similar plots",
      "Calculate fair market rate per sqft",
      "Analyze seasonal trends"
    ],
    result: "Price benchmark report + ROI projection"
  },
  {
    day: "Day 6-8",
    title: "Legal Review & Final Report",
    whatWeDo: [
      "Lawyer reviews ALL findings",
      "Identifies legal risks or red flags",
      "Assigns final risk rating (RED/YELLOW/GREEN)",
      "Prepares written legal opinion",
      "Compiles complete PDF report"
    ],
    result: "Complete report ready for download"
  }
];

export default function PremiumVerification() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    plotAddress: "",
    surveyNumber: "",
    plotSize: "",
    sellerName: "",
    askingPrice: "",
    notes: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `Hi, I need Premium Plot Verification.\n\nPlot: ${formData.plotAddress}\nSurvey: ${formData.surveyNumber}\nSize: ${formData.plotSize}\nPrice: ${formData.askingPrice}\n\nName: ${formData.name}\nPhone: ${formData.phone}`;
    window.open(whatsappUrl(message), "_blank", "noopener");
  };

  return (
    <PublicLayout>
      <ScrollToTop />
      
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 py-16 sm:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <Link href="/step-3-safety-check">
              <Button variant="ghost" size="sm" className="mb-6 text-slate-600 hover:text-slate-900" data-testid="button-back">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to 12-Point Check
              </Button>
            </Link>
            
            <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300 mb-6 px-4 py-1.5 rounded-full font-bold tracking-widest text-[10px] uppercase border-none">
              Premium Service
            </Badge>
            <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-6 text-slate-900 dark:text-white leading-tight">
              Professional Plot <span className="text-blue-600 dark:text-blue-400">Verification Service</span>
            </h1>
            <p className="text-xl text-slate-700 dark:text-slate-300 font-medium leading-relaxed mb-4">
              Let Our Legal Team Do the Deep Verification. You Stay in Control.
            </p>
            <div className="text-slate-600 dark:text-slate-400 space-y-2 mb-8">
              <p>Already ran the 12-point check yourself? Found some yellow flags?</p>
              <p>Or just want professional legal verification before committing?</p>
            </div>
            
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <div className="flex items-center gap-2 bg-white dark:bg-slate-800 px-4 py-2 rounded-lg">
                <Clock className="w-5 h-5 text-blue-600" />
                <span className="font-semibold">7-10 business days</span>
              </div>
              <div className="flex items-center gap-2 bg-white dark:bg-slate-800 px-4 py-2 rounded-lg">
                <Banknote className="w-5 h-5 text-green-600" />
                <span className="font-semibold">₹5,000 - ₹8,000</span>
              </div>
              <div className="flex items-center gap-2 bg-white dark:bg-slate-800 px-4 py-2 rounded-lg">
                <FileCheck className="w-5 h-5 text-purple-600" />
                <span className="font-semibold">Written Legal Opinion</span>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <Button 
                size="lg" 
                className="bg-blue-600 hover:bg-blue-700"
                onClick={() => document.getElementById('booking-form')?.scrollIntoView({ behavior: 'smooth' })}
                data-testid="button-get-quote"
              >
                Get Verification Quote
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
              <Link href="/step-3-safety-check">
                <Button variant="outline" size="lg" data-testid="button-self-check">
                  Still prefer to verify yourself?
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 space-y-20">
        
        <section data-testid="section-what-you-get">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-4">
              Here's Exactly What You'll Get
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400">
              8 Complete Verifications + Professional Legal Opinion
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {VERIFICATION_ITEMS.map((item) => (
              <Card key={item.id} className="border-slate-200 dark:border-slate-700 hover-elevate" data-testid={`verification-item-${item.id}`}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-blue-600 font-bold text-sm">#{item.id}</span>
                        <h3 className="font-bold text-slate-900 dark:text-white">{item.title}</h3>
                      </div>
                      <div className="space-y-2 text-sm">
                        <p><span className="text-slate-500">Scope:</span> <span className="text-slate-700 dark:text-slate-300">{item.scope}</span></p>
                        <p><span className="text-slate-500">Method:</span> <span className="text-slate-700 dark:text-slate-300">{item.method}</span></p>
                        <p><span className="text-slate-500">You Get:</span> <span className="text-slate-700 dark:text-slate-300">{item.deliverable}</span></p>
                        <p><span className="text-slate-500">Shows:</span> <span className="text-slate-700 dark:text-slate-300">{item.shows}</span></p>
                      </div>
                      <Badge variant="outline" className="mt-3 text-xs">
                        <Clock className="w-3 h-3 mr-1" />
                        {item.time}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section data-testid="section-final-report" className="bg-slate-900 dark:bg-slate-950 rounded-3xl p-8 sm:p-12">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center">
                <Download className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-black text-white">Final Verification Report</h3>
                <p className="text-slate-400">PDF report (10-15 pages) delivered via email + dashboard</p>
              </div>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <h4 className="font-bold text-white mb-4">Report Contains:</h4>
                <ul className="space-y-2">
                  {[
                    "Executive Summary (RED/YELLOW/GREEN flag)",
                    "Title Audit Findings",
                    "Litigation Search Results",
                    "NA/TP Verification Status",
                    "Encumbrance Certificate",
                    "Possession Status",
                    "Market Price Validation",
                    "Legal Opinion by Our Lawyer",
                    "Recommendations (Proceed/Caution/Don't Buy)",
                    "Next Steps (What to do now)"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-slate-300 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-slate-800 rounded-xl p-6">
                <h4 className="font-bold text-white mb-4">Use This Report To:</h4>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2 text-slate-300 text-sm">
                    <CheckCircle className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                    Share with your personal lawyer for second opinion
                  </li>
                  <li className="flex items-start gap-2 text-slate-300 text-sm">
                    <CheckCircle className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                    Submit to bank for home loan approval
                  </li>
                  <li className="flex items-start gap-2 text-slate-300 text-sm">
                    <CheckCircle className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                    Negotiate price with seller based on findings
                  </li>
                  <li className="flex items-start gap-2 text-slate-300 text-sm">
                    <CheckCircle className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                    Keep for your permanent records
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section data-testid="section-process">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-4">
              Our Verification Process
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400">
              8 Steps Over 7-10 Business Days - Real-time tracking included
            </p>
          </div>
          
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-blue-200 dark:bg-blue-800 hidden md:block" />
            
            <div className="space-y-6">
              {PROCESS_STEPS.map((step, i) => (
                <Card key={i} className="border-slate-200 dark:border-slate-700 md:ml-16 relative" data-testid={`process-step-${i}`}>
                  <div className="absolute -left-20 top-6 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm hidden md:flex">
                    {i + 1}
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <Badge className="bg-blue-100 text-blue-700 mb-2">{step.day}</Badge>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white">{step.title}</h3>
                      </div>
                      {step.time && (
                        <Badge variant="outline" className="text-xs">
                          <Clock className="w-3 h-3 mr-1" />
                          {step.time}
                        </Badge>
                      )}
                    </div>
                    
                    <div className="grid sm:grid-cols-2 gap-4">
                      {step.whatYouDo && (
                        <div>
                          <p className="text-xs font-bold text-slate-500 uppercase mb-2">What You Do:</p>
                          <ul className="space-y-1">
                            {step.whatYouDo.map((item, j) => (
                              <li key={j} className="text-sm text-slate-600 dark:text-slate-400 flex items-start gap-2">
                                <ChevronRight className="w-3 h-3 mt-1 text-blue-500 flex-shrink-0" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {step.whatWeDo && (
                        <div>
                          <p className="text-xs font-bold text-slate-500 uppercase mb-2">What We Do:</p>
                          <ul className="space-y-1">
                            {step.whatWeDo.map((item, j) => (
                              <li key={j} className="text-sm text-slate-600 dark:text-slate-400 flex items-start gap-2">
                                <ChevronRight className="w-3 h-3 mt-1 text-blue-500 flex-shrink-0" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {step.whatHappens && (
                        <div>
                          <p className="text-xs font-bold text-slate-500 uppercase mb-2">What Happens:</p>
                          <ul className="space-y-1">
                            {step.whatHappens.map((item, j) => (
                              <li key={j} className="text-sm text-slate-600 dark:text-slate-400 flex items-start gap-2">
                                <CheckCircle className="w-3 h-3 mt-1 text-green-500 flex-shrink-0" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {step.result && (
                        <div className="sm:col-span-2 mt-2">
                          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3">
                            <p className="text-xs font-bold text-green-700 dark:text-green-400 uppercase mb-1">Result You Get:</p>
                            <p className="text-sm text-green-800 dark:text-green-300">{step.result}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          
          <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6 text-center">
            <p className="text-lg font-bold text-blue-800 dark:text-blue-300">
              Total Timeline: 7-10 Business Days
            </p>
            <p className="text-sm text-blue-600 dark:text-blue-400">
              (Faster than traditional lawyers: 3-4 weeks)
            </p>
          </div>
        </section>

        <section data-testid="section-pricing" className="bg-gradient-to-br from-slate-100 to-slate-50 dark:from-slate-800 dark:to-slate-900 rounded-3xl p-8 sm:p-12">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-4">
              Transparent Pricing
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mb-8">
              No hidden fees. Price depends on plot complexity.
            </p>
            
            <div className="grid sm:grid-cols-2 gap-6 mb-8">
              <Card className="border-2 border-blue-200 dark:border-blue-800">
                <CardContent className="p-6 text-center">
                  <h3 className="font-bold text-slate-900 dark:text-white mb-2">Standard Plot</h3>
                  <p className="text-sm text-slate-500 mb-4">Clear title, single owner, no known issues</p>
                  <div className="text-4xl font-black text-blue-600 mb-2">₹5,000</div>
                  <p className="text-sm text-slate-500">+ GST</p>
                </CardContent>
              </Card>
              
              <Card className="border-2 border-purple-200 dark:border-purple-800">
                <CardContent className="p-6 text-center">
                  <h3 className="font-bold text-slate-900 dark:text-white mb-2">Complex Plot</h3>
                  <p className="text-sm text-slate-500 mb-4">Multiple owners, inheritance, yellow flags</p>
                  <div className="text-4xl font-black text-purple-600 mb-2">₹8,000</div>
                  <p className="text-sm text-slate-500">+ GST</p>
                </CardContent>
              </Card>
            </div>
            
            <p className="text-sm text-slate-500">
              We'll quote exact price after reviewing your plot details. No payment until you approve.
            </p>
          </div>
        </section>

        <section id="booking-form" data-testid="section-booking" className="bg-slate-900 dark:bg-slate-950 rounded-3xl p-8 sm:p-12">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-black text-white mb-4">
                Get Your Verification Quote
              </h2>
              <p className="text-slate-400">
                Fill in plot details. We'll review and send you a quote within 24 hours.
              </p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-slate-300 mb-2 block">Your Name</label>
                  <Input 
                    placeholder="Full name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="bg-slate-800 border-slate-700 text-white"
                    data-testid="input-name"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-300 mb-2 block">Phone Number</label>
                  <Input 
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="bg-slate-800 border-slate-700 text-white"
                    data-testid="input-phone"
                  />
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-slate-300 mb-2 block">Email (Optional)</label>
                <Input 
                  placeholder="your@email.com"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="bg-slate-800 border-slate-700 text-white"
                  data-testid="input-email"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium text-slate-300 mb-2 block">Plot Address</label>
                <Textarea 
                  placeholder="Full address with landmarks"
                  value={formData.plotAddress}
                  onChange={(e) => setFormData({...formData, plotAddress: e.target.value})}
                  className="bg-slate-800 border-slate-700 text-white"
                  data-testid="input-address"
                />
              </div>
              
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-slate-300 mb-2 block">Survey Number / Property ID</label>
                  <Input 
                    placeholder="e.g., 123/4A"
                    value={formData.surveyNumber}
                    onChange={(e) => setFormData({...formData, surveyNumber: e.target.value})}
                    className="bg-slate-800 border-slate-700 text-white"
                    data-testid="input-survey"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-300 mb-2 block">Plot Size (sq.ft)</label>
                  <Input 
                    placeholder="e.g., 2000"
                    value={formData.plotSize}
                    onChange={(e) => setFormData({...formData, plotSize: e.target.value})}
                    className="bg-slate-800 border-slate-700 text-white"
                    data-testid="input-size"
                  />
                </div>
              </div>
              
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-slate-300 mb-2 block">Seller Name</label>
                  <Input 
                    placeholder="Name of current owner"
                    value={formData.sellerName}
                    onChange={(e) => setFormData({...formData, sellerName: e.target.value})}
                    className="bg-slate-800 border-slate-700 text-white"
                    data-testid="input-seller"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-300 mb-2 block">Asking Price</label>
                  <Input 
                    placeholder="e.g., ₹45 Lakh"
                    value={formData.askingPrice}
                    onChange={(e) => setFormData({...formData, askingPrice: e.target.value})}
                    className="bg-slate-800 border-slate-700 text-white"
                    data-testid="input-price"
                  />
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-slate-300 mb-2 block">Additional Notes (Optional)</label>
                <Textarea 
                  placeholder="Any concerns or specific things you want us to check?"
                  value={formData.notes}
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                  className="bg-slate-800 border-slate-700 text-white"
                  data-testid="input-notes"
                />
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  type="submit" 
                  size="lg" 
                  className="flex-1 bg-green-600 hover:bg-green-700"
                  data-testid="button-submit-whatsapp"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Submit via WhatsApp
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  size="lg"
                  className="flex-1 border-slate-600 text-slate-300 hover:bg-slate-800"
                  onClick={() => window.location.href = `tel:+${CONTACT.phone}`}
                  data-testid="button-call"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Call Us Directly
                </Button>
              </div>
              
              <p className="text-center text-xs text-slate-500">
                We'll review your details and send a quote within 24 hours. No payment until you approve.
              </p>
            </form>
          </div>
        </section>

        <section data-testid="section-self-check-reminder" className="text-center py-8">
          <p className="text-slate-500 dark:text-slate-400 mb-4">
            Still prefer to verify yourself? Most people do.
          </p>
          <Link href="/step-3-safety-check">
            <Button variant="outline" data-testid="button-back-self-check">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Free 12-Point Checklist
            </Button>
          </Link>
        </section>
      </div>
    </PublicLayout>
  );
}
