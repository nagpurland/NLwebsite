import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useLocation, Link } from "wouter";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { SimpleBreadcrumb } from "@/components/ui/simple-breadcrumb";
import { ProgressBar } from "@/components/ui/progress-bar";
import { StepHeader } from "@/components/ui/step-header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Shield, FileCheck, Users, Building, Landmark, Clock,
  ArrowRight, CheckCircle, XCircle, AlertCircle, HelpCircle,
  FileText, Scale, MapPin, Banknote, UserCheck, Search,
  ChevronDown, ChevronUp, Save, ExternalLink, Printer, Sparkles, X, Bell
} from "lucide-react";
import type { BlogNotification } from "@shared/schema";

const STEP_NAMES = ["Market Intel", "Filter Risky", "Safety Check", "Decision Report"];

interface CheckItem {
  id: number;
  title: string;
  description: string;
  howToCheck: string[];
  blogSlug: string;
  icon: typeof FileText;
  category: "documents" | "legal" | "physical";
}

const DOCUMENTS_CHECKS: CheckItem[] = [
  { 
    id: 1, 
    title: "Verify ownership name matches seller", 
    description: "Property Card / 7/12 Extract",
    howToCheck: [
      "Get Property Card from local authority",
      "Compare owner's name with seller's Aadhaar/PAN",
      "Names must match exactly"
    ],
    blogSlug: "ownership-verification",
    icon: FileText, 
    category: "documents" 
  },
  { 
    id: 2, 
    title: "Check recent mutations and transfers", 
    description: "NA Order Copy / Ferfar",
    howToCheck: [
      "Get NA Order Copy from Sub-Registrar",
      "Review last 5-10 years of ownership transfers",
      "Flag any suspicious jumps in ownership"
    ],
    blogSlug: "mutations-transfers",
    icon: FileCheck, 
    category: "documents" 
  },
  { 
    id: 3, 
    title: "All property taxes paid till date", 
    description: "Tax Payment Receipts",
    howToCheck: [
      "Collect Tax Payment Receipts (last 3 years)",
      "Verify no dues remain with municipality",
      "Request 'No Objection Certificate'"
    ],
    blogSlug: "property-tax",
    icon: FileText, 
    category: "documents" 
  },
  { 
    id: 4, 
    title: "Seller Identity matches Aadhaar/PAN", 
    description: "Identity Verification",
    howToCheck: [
      "Match seller's ID proof with property documents",
      "Verify person signing is legally authorized",
      "Check for power of attorney if applicable"
    ],
    blogSlug: "identity-verification",
    icon: UserCheck, 
    category: "documents" 
  },
];

const LEGAL_CHECKS: CheckItem[] = [
  { 
    id: 5, 
    title: "Non-agricultural conversion complete", 
    description: "NA Conversion Certificate",
    howToCheck: [
      "Get NA Order from Sub-Registrar",
      "Verify conversion from agricultural to residential",
      "Confirm all conversion fees paid"
    ],
    blogSlug: "na-conversion",
    icon: Scale, 
    category: "legal" 
  },
  { 
    id: 6, 
    title: "No loans, mortgages, or liens", 
    description: "Encumbrance Certificate",
    howToCheck: [
      "Check Encumbrance Certificate for mortgages/charges",
      "Search for bank liens on property",
      "Confirm property is completely debt-free"
    ],
    blogSlug: "encumbrance-certificate",
    icon: Banknote, 
    category: "legal" 
  },
  { 
    id: 7, 
    title: "Ownership history without gaps (15+ years)", 
    description: "Chain of Title",
    howToCheck: [
      "Get Chain of Title from Sub-Registrar",
      "Verify continuous ownership from 15+ years back",
      "Flag any missing periods or unexplained gaps"
    ],
    blogSlug: "title-verification",
    icon: Users, 
    category: "legal" 
  },
  { 
    id: 8, 
    title: "No active litigation on survey number", 
    description: "Court Case Search",
    howToCheck: [
      "Visit local Civil/Revenue Court",
      "Search cases by survey number and owner name",
      "Confirm no pending disputes or injunctions"
    ],
    blogSlug: "litigation-search",
    icon: Landmark, 
    category: "legal" 
  },
];

const PHYSICAL_CHECKS: CheckItem[] = [
  { 
    id: 9, 
    title: "Survey stones match documented dimensions", 
    description: "Physical Boundary Match",
    howToCheck: [
      "Visit property with survey plan in hand",
      "Locate boundary stones on all sides",
      "Compare with legal dimensions - check if any are missing/moved"
    ],
    blogSlug: "boundary-verification",
    icon: MapPin, 
    category: "physical" 
  },
  { 
    id: 10, 
    title: "Seller in actual physical possession", 
    description: "Possession Verification",
    howToCheck: [
      "Visit property in person",
      "Confirm seller/authorized person is occupying it",
      "Check for squatters or unauthorized use"
    ],
    blogSlug: "possession-verification",
    icon: Building, 
    category: "physical" 
  },
  { 
    id: 11, 
    title: "No boundary disputes with neighbors", 
    description: "Neighbor Confirmation",
    howToCheck: [
      "Speak with all adjacent property owners",
      "Ask about past/current boundary disputes",
      "Verify no shared boundary confusion - get verbal confirmation"
    ],
    blogSlug: "neighbor-verification",
    icon: UserCheck, 
    category: "physical" 
  },
  { 
    id: 12, 
    title: "No TP Scheme restrictions affecting plot", 
    description: "Town Planning Check",
    howToCheck: [
      "Check TP Scheme at Municipal Corporation",
      "Verify no road widening planned through plot",
      "Confirm no land reserved for public use"
    ],
    blogSlug: "tp-scheme-check",
    icon: Scale, 
    category: "physical" 
  },
];

const ALL_CHECKS = [...DOCUMENTS_CHECKS, ...LEGAL_CHECKS, ...PHYSICAL_CHECKS];

const FAQ_ITEMS = [
  {
    question: "How long does self-verification take?",
    answer: "Most people complete the 12-point check in 2-4 hours spread across 1-2 days. Document collection takes the most time."
  },
  {
    question: "What if I find a yellow flag?",
    answer: "Yellow flags don't mean 'don't buy' - they mean 'investigate more'. Many plots have minor issues that can be resolved before purchase."
  },
  {
    question: "Do I need a lawyer for self-verification?",
    answer: "Not necessarily. The 12-point checklist covers what lawyers check. But if you find red flags, consult a property lawyer."
  },
  {
    question: "Where do I get these documents in Nagpur?",
    answer: "Most documents are available at the Sub-Registrar office (multiple locations in Nagpur) or Municipal Corporation. See individual guides for exact addresses."
  },
  {
    question: "Can I save my progress and continue later?",
    answer: "Yes! Click 'Save Progress' and your checked items will be saved. When you return, your progress will be restored."
  }
];

function ChecklistSection({ 
  title, 
  items, 
  checkedItems, 
  expandedItems,
  onToggleCheck,
  onToggleExpand,
  categoryColor
}: { 
  title: string;
  items: CheckItem[];
  checkedItems: number[];
  expandedItems: number[];
  onToggleCheck: (id: number) => void;
  onToggleExpand: (id: number) => void;
  categoryColor: string;
}) {
  const completedInCategory = items.filter(item => checkedItems.includes(item.id)).length;
  
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-slate-900 dark:text-white text-lg flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${categoryColor}`} />
          {title}
        </h3>
        <Badge variant="outline" className="text-xs">
          {completedInCategory}/{items.length} done
        </Badge>
      </div>
      
      <div className="space-y-2">
        {items.map((item) => {
          const isChecked = checkedItems.includes(item.id);
          const isExpanded = expandedItems.includes(item.id);
          
          return (
            <div 
              key={item.id}
              className={`rounded-xl border-2 transition-all ${
                isChecked
                  ? 'bg-green-50 dark:bg-green-900/30 border-green-300 dark:border-green-700'
                  : 'bg-white dark:bg-slate-800 border-blue-200 dark:border-blue-800'
              }`}
              data-testid={`check-item-${item.id}`}
            >
              <div 
                className="flex items-start gap-3 p-4 cursor-pointer"
                onClick={() => onToggleCheck(item.id)}
              >
                <Checkbox 
                  checked={isChecked}
                  className="mt-0.5 h-5 w-5"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <item.icon className="w-4 h-4 text-slate-500 flex-shrink-0" />
                    <span className={`font-semibold ${isChecked ? 'text-green-700 dark:text-green-400 line-through' : 'text-slate-900 dark:text-white'}`}>
                      {item.title}
                    </span>
                    {!isChecked && (
                      <HelpCircle className="w-4 h-4 text-blue-500" />
                    )}
                  </div>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">{item.description}</p>
                </div>
                {isChecked ? (
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                ) : (
                  <Badge className="bg-blue-100 text-blue-700 text-[10px]">Guide</Badge>
                )}
              </div>
              
              <div className="px-4 pb-3">
                <button
                  onClick={(e) => { e.stopPropagation(); onToggleExpand(item.id); }}
                  className="text-sm text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 font-medium"
                  data-testid={`expand-${item.id}`}
                >
                  {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  How to check
                </button>
                
                {isExpanded && (
                  <div className="mt-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800">
                    <ul className="space-y-2 mb-4">
                      {item.howToCheck.map((step, i) => (
                        <li key={i} className="text-sm text-slate-700 dark:text-slate-300 flex items-start gap-2">
                          <span className="text-blue-600 font-bold min-w-[20px]">{i + 1}.</span>
                          {step}
                        </li>
                      ))}
                    </ul>
                    <Link 
                      href={`/guide/${item.blogSlug}`}
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-2 text-sm font-medium text-blue-700 dark:text-blue-400 hover:underline"
                      data-testid={`read-guide-${item.id}`}
                    >
                      <ExternalLink className="w-4 h-4" />
                      Read Full Guide (with Nagpur office addresses)
                    </Link>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function getInitialCheckedItems(): number[] {
  if (typeof window === 'undefined') return [];
  try {
    const savedProgress = localStorage.getItem('safetyChecklist');
    return savedProgress ? JSON.parse(savedProgress) : [];
  } catch {
    return [];
  }
}

export default function Step3SafetyCheck() {
  const [, navigate] = useLocation();
  const [checkedItems, setCheckedItems] = useState<number[]>(getInitialCheckedItems);
  const [expandedItems, setExpandedItems] = useState<number[]>([]);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [saved, setSaved] = useState(false);
  const [dismissedNotifications, setDismissedNotifications] = useState<number[]>([]);

  const { data: notifications } = useQuery<BlogNotification[]>({
    queryKey: ["/api/notifications", { targetPage: "/step-3-safety-check" }],
  });

  const trackClickMutation = useMutation({
    mutationFn: async (id: number) => {
      await fetch(`/api/notifications/${id}/click`, { method: "POST" });
    }
  });

  const activeNotifications = notifications?.filter(n => 
    n.isActive && !dismissedNotifications.includes(n.id)
  ) || [];

  const handleNotificationClick = (notification: BlogNotification) => {
    trackClickMutation.mutate(notification.id);
  };

  const dismissNotification = (id: number) => {
    setDismissedNotifications(prev => [...prev, id]);
  };

  const handleStepClick = (stepNum: number) => {
    const routes = [
      "/step-1-market-intel",
      "/step-2-filter-risky",
      "/step-3-safety-check",
      "/step-4-decision-report"
    ];
    navigate(routes[stepNum - 1] || "/");
  };

  const toggleCheck = (id: number) => {
    setCheckedItems(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
    setSaved(false);
  };

  const toggleExpand = (id: number) => {
    setExpandedItems(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const saveProgress = () => {
    localStorage.setItem('safetyChecklist', JSON.stringify(checkedItems));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const completedCount = checkedItems.length;
  const progressPercent = (completedCount / ALL_CHECKS.length) * 100;

  return (
    <PublicLayout>
      <div className="min-h-screen bg-white dark:bg-slate-900">
        <SimpleBreadcrumb
          steps={[
            { label: "Home", link: "/" },
            { label: "4-Step System", link: "/invest-safely" }
          ]}
          currentPage="Step 3: Safety Check"
        />

        <ProgressBar
          currentStep={3}
          stepNames={STEP_NAMES}
          onStepClick={handleStepClick}
        />

        <StepHeader
          stepNumber={3}
          totalSteps={4}
          stepTitle="12-Point Safety Check"
          description="Verify your plot like a professional. Click 'How to check' below each point for guidance."
          previousStep={{ title: "Filter Risky", link: "/step-2-filter-risky" }}
          nextStep={{ title: "Final Sanity Check", link: "/step-4-decision-report" }}
        />

        {activeNotifications.length > 0 && (
          <div className="max-w-4xl mx-auto px-4 pt-4">
            {activeNotifications.map(notification => (
              <div 
                key={notification.id}
                className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-xl p-4 flex items-center justify-between gap-4 animate-in slide-in-from-top duration-300"
                data-testid={`notification-${notification.id}`}
              >
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 dark:bg-blue-800 p-2 rounded-full">
                    <Bell className="w-5 h-5 text-blue-600 dark:text-blue-300" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-900 dark:text-white">
                      {notification.notificationText}
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      New guide just published
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Link 
                    href={`/blog/${notification.blogId}`}
                    onClick={() => handleNotificationClick(notification)}
                  >
                    <Button size="sm" data-testid={`read-notification-${notification.id}`}>
                      Read Guide
                    </Button>
                  </Link>
                  <Button 
                    size="icon" 
                    variant="ghost"
                    onClick={() => dismissNotification(notification.id)}
                    data-testid={`dismiss-notification-${notification.id}`}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12 space-y-12">
          
          <section data-testid="section-self-message" className="text-center">
            <Badge className="bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300 mb-4 px-4 py-1.5">
              Free Self-Verification
            </Badge>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Complete all 12 checks to verify your plot. Most people do this themselves in 2-4 hours.
            </p>
          </section>

          <section id="section-self-check" data-testid="section-self-check" className="bg-green-50 dark:bg-green-900/20 border-2 border-green-200 dark:border-green-800 rounded-2xl p-6 sm:p-8">
            <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  12-Point Safety Checklist
                </h2>
                <p className="text-slate-600 dark:text-slate-400 mt-1">
                  The same checklist property lawyers use. Click each "How to check" for step-by-step guidance.
                </p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-green-600">{completedCount}/12</div>
                <div className="text-sm text-slate-500">completed</div>
              </div>
            </div>

            <div className="w-full bg-green-200 dark:bg-green-800 rounded-full h-4 mb-8">
              <div 
                className="bg-green-600 h-4 rounded-full transition-all duration-300 flex items-center justify-end pr-2"
                style={{ width: `${Math.max(progressPercent, 8)}%` }}
              >
                {completedCount > 0 && (
                  <span className="text-white text-xs font-bold">{Math.round(progressPercent)}%</span>
                )}
              </div>
            </div>

            <div className="space-y-8">
              <ChecklistSection
                title="DOCUMENTS (4 checks)"
                items={DOCUMENTS_CHECKS}
                checkedItems={checkedItems}
                expandedItems={expandedItems}
                onToggleCheck={toggleCheck}
                onToggleExpand={toggleExpand}
                categoryColor="bg-blue-500"
              />
              
              <ChecklistSection
                title="LEGAL (4 checks)"
                items={LEGAL_CHECKS}
                checkedItems={checkedItems}
                expandedItems={expandedItems}
                onToggleCheck={toggleCheck}
                onToggleExpand={toggleExpand}
                categoryColor="bg-purple-500"
              />
              
              <ChecklistSection
                title="PHYSICAL (4 checks)"
                items={PHYSICAL_CHECKS}
                checkedItems={checkedItems}
                expandedItems={expandedItems}
                onToggleCheck={toggleCheck}
                onToggleExpand={toggleExpand}
                categoryColor="bg-amber-500"
              />
            </div>

            {completedCount === 12 && (
              <div className="mt-8 p-6 bg-green-600 text-white rounded-xl text-center">
                <CheckCircle className="w-10 h-10 mx-auto mb-3" />
                <p className="font-bold text-xl mb-2">All 12 checks complete!</p>
                <p className="text-green-100 mb-4">Your plot has passed the basic safety check. Ready for the final step.</p>
                <Button 
                  size="lg"
                  className="bg-white text-green-700 hover:bg-green-50"
                  onClick={() => navigate("/step-4-decision-report")}
                  data-testid="button-view-report"
                >
                  View Your Decision Report
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            )}

            <div className="mt-6 flex flex-wrap gap-3 justify-center">
              <Button 
                variant="outline"
                className={`bg-white dark:bg-slate-800 ${saved ? 'border-green-500 text-green-600' : ''}`}
                onClick={saveProgress}
                data-testid="button-save-progress"
              >
                {saved ? (
                  <>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Saved!
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Save Progress
                  </>
                )}
              </Button>
              <Button 
                variant="outline"
                className="bg-white dark:bg-slate-800"
                onClick={() => window.print()}
                data-testid="button-print"
              >
                <Printer className="w-4 h-4 mr-2" />
                Print Checklist
              </Button>
            </div>
          </section>

          <section data-testid="section-flags" className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white text-center">
              Decision Based on Findings
            </h2>
            
            <div className="grid md:grid-cols-3 gap-4">
              <Card className="border-2 border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/50 flex items-center justify-center mx-auto mb-4">
                    <XCircle className="w-6 h-6 text-red-600" />
                  </div>
                  <h3 className="font-bold text-red-700 dark:text-red-400 mb-2">RED FLAG</h3>
                  <p className="text-sm text-red-600 dark:text-red-400 font-medium mb-2">STOP - Do Not Buy</p>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    Active litigation, missing docs, ownership mismatch
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/20">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center mx-auto mb-4">
                    <AlertCircle className="w-6 h-6 text-amber-600" />
                  </div>
                  <h3 className="font-bold text-amber-700 dark:text-amber-400 mb-2">YELLOW FLAG</h3>
                  <p className="text-sm text-amber-600 dark:text-amber-400 font-medium mb-2">Investigate Further</p>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    Pending mutations, old tax dues, unclear boundaries
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="font-bold text-green-700 dark:text-green-400 mb-2">GREEN FLAG</h3>
                  <p className="text-sm text-green-600 dark:text-green-400 font-medium mb-2">PROCEED Confidently</p>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    All clear, docs match, possession verified
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          <section data-testid="section-faq" className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-6 sm:p-8">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-blue-600" />
              Still Confused? Common Questions
            </h2>
            
            <div className="space-y-3">
              {FAQ_ITEMS.map((faq, i) => (
                <div 
                  key={i}
                  className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700"
                >
                  <button
                    className="w-full flex items-center justify-between p-4 text-left"
                    onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                    data-testid={`faq-${i}`}
                  >
                    <span className="font-medium text-slate-900 dark:text-white">{faq.question}</span>
                    {expandedFaq === i ? (
                      <ChevronUp className="w-5 h-5 text-slate-500" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-slate-500" />
                    )}
                  </button>
                  {expandedFaq === i && (
                    <div className="px-4 pb-4">
                      <p className="text-slate-600 dark:text-slate-400 text-sm">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          <section data-testid="section-decision-tree" className="bg-slate-100 dark:bg-slate-800/50 rounded-2xl p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 text-center">
              Need Professional Help?
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              <Card className="border-2 border-green-300 dark:border-green-700 hover-elevate">
                <CardContent className="p-6">
                  <Badge className="bg-green-100 text-green-700 mb-4">Free</Badge>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Self-Verify</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">
                    Use the 12-point checklist above with our detailed guides.
                  </p>
                  <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400 mb-6">
                    <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-600" /> Free</li>
                    <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-600" /> 2-4 hours</li>
                    <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-600" /> You control the process</li>
                  </ul>
                  <Button 
                    className="w-full bg-green-600 hover:bg-green-700"
                    onClick={() => document.getElementById('section-self-check')?.scrollIntoView({ behavior: 'smooth' })}
                    data-testid="button-self-verify"
                  >
                    Continue Checklist
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-2 border-blue-300 dark:border-blue-700 hover-elevate">
                <CardContent className="p-6">
                  <Badge className="bg-blue-100 text-blue-700 mb-4">Premium</Badge>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Expert Verification</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">
                    Our team does deep legal analysis for you.
                  </p>
                  <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400 mb-6">
                    <li className="flex items-center gap-2"><Clock className="w-4 h-4 text-blue-600" /> 7-10 business days</li>
                    <li className="flex items-center gap-2"><Banknote className="w-4 h-4 text-blue-600" /> ₹5,000 - ₹8,000</li>
                    <li className="flex items-center gap-2"><Search className="w-4 h-4 text-blue-600" /> Written legal opinion</li>
                  </ul>
                  <Button 
                    variant="outline"
                    className="w-full border-blue-300 text-blue-700 hover:bg-blue-50"
                    onClick={() => navigate("/premium-verification")}
                    data-testid="button-expert-verify"
                  >
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            </div>
          </section>

          <section 
            className="bg-slate-900 dark:bg-slate-950 rounded-2xl p-6 sm:p-8"
            data-testid="section-cta"
          >
            <div className="text-center mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
                Ready for the Final Step?
              </h2>
              <p className="text-slate-400">
                Generate your decision report with all findings
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-amber-600 hover:bg-amber-700 text-white"
                onClick={() => navigate("/step-4-decision-report")}
                data-testid="button-next-step"
              >
                Next: Final Sanity Check
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>

              <Button
                variant="outline"
                className="border-slate-600 text-slate-300 hover:bg-slate-800"
                onClick={() => navigate("/step-2-filter-risky")}
                data-testid="button-back"
              >
                Back to Step 2
              </Button>
            </div>
          </section>
        </div>
      </div>
    </PublicLayout>
  );
}
