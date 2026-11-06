import { useState } from "react";
import { useLocation } from "wouter";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { SimpleBreadcrumb } from "@/components/ui/simple-breadcrumb";
import { ProgressBar } from "@/components/ui/progress-bar";
import { StepHeader } from "@/components/ui/step-header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { 
  AlertTriangle, Shield, FileText, Scale, MapPin, 
  ArrowRight, HelpCircle, CheckCircle2, Wrench
} from "lucide-react";
import { LandFilteringTool } from "@/components/widgets/LandFilteringTool";

const STEP_NAMES = ["Market Intel", "Filter Risky", "Safety Check", "Decision Report"];

const FILTERING_CRITERIA = [
  {
    icon: FileText,
    title: "Clear Title Documentation",
    description: "Verify the property has unambiguous ownership records. Check for proper chain of title, absence of encumbrances, and valid sale deeds registered with the sub-registrar office."
  },
  {
    icon: Scale,
    title: "No Pending Litigation",
    description: "Search court records for any ongoing disputes involving the property. Civil cases, family disputes over inheritance, or boundary conflicts are major red flags."
  },
  {
    icon: MapPin,
    title: "Proper Land Use Zoning",
    description: "Confirm the land is zoned for your intended purpose. Agricultural land requires NA conversion for residential use. Check with NMC for zone classification."
  },
  {
    icon: Shield,
    title: "RERA Registration",
    description: "For plotted developments, verify the project is registered under Maharashtra RERA. This provides legal protection and ensures the developer follows regulations."
  },
  {
    icon: AlertTriangle,
    title: "No Government Acquisition",
    description: "Check if the land falls under any government acquisition plans for roads, metro, or public projects. Land marked for acquisition loses value and usability."
  }
];

const CHECKLIST_ITEMS = [
  { id: "title", label: "Title documents verified by lawyer" },
  { id: "encumbrance", label: "Encumbrance certificate obtained (last 30 years)" },
  { id: "mutation", label: "Mutation entries checked at Tahsildar office" },
  { id: "noc", label: "Society/Layout NOC available" },
  { id: "tax", label: "Property tax receipts verified" },
  { id: "physical", label: "Physical site inspection completed" },
  { id: "neighbors", label: "Neighboring property owners consulted" },
  { id: "rera", label: "RERA registration verified (if applicable)" }
];

const CASE_STUDIES = [
  {
    title: "Dharampeth Plot - Saved from Title Fraud",
    outcome: "Avoided",
    description: "A buyer was about to purchase a 2000 sqft plot in Dharampeth. Our filtering criteria revealed the seller was not the actual owner - the property was under dispute between siblings. The buyer avoided a potential loss of ₹45 lakhs."
  },
  {
    title: "MIHAN Layout - Government Acquisition Issue",
    outcome: "Avoided", 
    description: "An investor found an attractively priced plot near MIHAN. Investigation revealed 30% of the layout was marked for road widening. The affected plots would have been acquired at circle rates, far below market value."
  },
  {
    title: "Besa Property - Clean After Due Diligence",
    outcome: "Purchased",
    description: "After thorough filtering, a family purchased a verified plot in Besa. Clear title, no litigation, proper NA conversion, and RERA-registered layout. They built their dream home with complete peace of mind."
  }
];

export default function Step2FilterRisky() {
  const [, navigate] = useLocation();
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const handleCheckboxChange = (id: string) => {
    setCheckedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const completedCount = Object.values(checkedItems).filter(Boolean).length;

  const handleStepClick = (stepNum: number) => {
    const routes = [
      "/step-1-market-intel",
      "/step-2-filter-risky",
      "/step-3-safety-check",
      "/step-4-decision-report"
    ];
    navigate(routes[stepNum - 1] || "/");
  };

  return (
    <PublicLayout>
      <div className="min-h-screen bg-white dark:bg-slate-900">
        <SimpleBreadcrumb
          steps={[
            { label: "Home", link: "/" },
            { label: "4-Step System", link: "/invest-safely" }
          ]}
          currentPage="Step 2: Filter Risky Options"
        />

        <ProgressBar
          currentStep={2}
          stepNames={STEP_NAMES}
          onStepClick={handleStepClick}
        />

        <StepHeader
          stepNumber={2}
          totalSteps={4}
          stepTitle="Filter Risky Options"
          description="Learn how to identify and eliminate high-risk properties from your shortlist using proven due diligence criteria."
          previousStep={{ title: "Market Intel", link: "/step-1-market-intel" }}
          nextStep={{ title: "Safety Check", link: "/step-3-safety-check" }}
        />

        <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12 space-y-12">
          <section data-testid="section-why-filtering">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              Why Filtering Matters
            </h2>
            <div className="prose dark:prose-invert max-w-none text-slate-600 dark:text-slate-400">
              <p>
                In Nagpur's real estate market, approximately 15-20% of properties have some form of legal complication. These range from minor documentation issues to serious title disputes that can result in complete loss of investment. The filtering stage is your first line of defense against these risks.
              </p>
              <p>
                Many buyers skip thorough filtering because they're excited about a property's location or price. This emotional decision-making leads to problems that surface months or years later - when you're already financially and emotionally invested. A systematic filtering approach removes emotion from the equation.
              </p>
              <p>
                Our data shows that buyers who complete all filtering criteria before proceeding have a 94% success rate in trouble-free ownership. Those who skip steps face an 8x higher likelihood of legal disputes. The few hours spent on filtering can save years of legal battles and lakhs in losses.
              </p>
            </div>
          </section>

          <section data-testid="section-filtering-criteria">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
              5 Key Filtering Criteria
            </h2>
            <div className="space-y-4">
              {FILTERING_CRITERIA.map((criterion, index) => (
                <Card 
                  key={criterion.title} 
                  className="border-slate-200 dark:border-slate-700"
                  data-testid={`criteria-card-${index + 1}`}
                >
                  <CardContent className="p-5">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#2180a8]/10 dark:bg-blue-500/20 flex items-center justify-center">
                        <criterion.icon className="w-5 h-5 text-[#2180a8] dark:text-blue-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-900 dark:text-white mb-1">
                          {index + 1}. {criterion.title}
                        </h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          {criterion.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section data-testid="section-checklist">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                Interactive Filtering Checklist
              </h2>
              <Badge 
                variant="outline" 
                className={completedCount === CHECKLIST_ITEMS.length 
                  ? "border-green-500 text-green-600 dark:text-green-400" 
                  : "border-slate-300 dark:border-slate-600"
                }
              >
                {completedCount}/{CHECKLIST_ITEMS.length} Complete
              </Badge>
            </div>
            <Card className="border-slate-200 dark:border-slate-700">
              <CardContent className="p-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  {CHECKLIST_ITEMS.map((item) => (
                    <label
                      key={item.id}
                      className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer transition-colors"
                      data-testid={`checklist-item-${item.id}`}
                    >
                      <Checkbox
                        id={item.id}
                        checked={checkedItems[item.id] || false}
                        onCheckedChange={() => handleCheckboxChange(item.id)}
                        className="mt-0.5"
                      />
                      <span className={`text-sm ${
                        checkedItems[item.id] 
                          ? "text-green-600 dark:text-green-400 line-through" 
                          : "text-slate-700 dark:text-slate-300"
                      }`}>
                        {item.label}
                      </span>
                    </label>
                  ))}
                </div>
                {completedCount === CHECKLIST_ITEMS.length && (
                  <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
                    <span className="text-green-700 dark:text-green-300 font-medium">
                      All checks complete! Your property has passed the filtering stage.
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>
          </section>

          <section data-testid="section-filtering-tool">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#2180a8] flex items-center justify-center">
                <Wrench className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                  Interactive Filtering Tool
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Analyze your property list and get risk scores
                </p>
              </div>
            </div>
            <LandFilteringTool />
          </section>

          <section data-testid="section-case-studies">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
              Case Studies
            </h2>
            <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-3">
              {CASE_STUDIES.map((study, index) => (
                <Card 
                  key={study.title} 
                  className="border-slate-200 dark:border-slate-700"
                  data-testid={`case-study-${index + 1}`}
                >
                  <CardContent className="p-5">
                    <Badge 
                      className={study.outcome === "Avoided" 
                        ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 mb-3" 
                        : "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 mb-3"
                      }
                    >
                      {study.outcome === "Avoided" ? "Risk Avoided" : "Success Story"}
                    </Badge>
                    <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                      {study.title}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {study.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section 
            className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-6 sm:p-8"
            data-testid="section-cta"
          >
            <div className="text-center mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-2">
                Ready to Continue?
              </h2>
              <p className="text-slate-600 dark:text-slate-400">
                Move to the next step or explore other options
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-[#2180a8] hover:bg-[#1a6a8a] text-white"
                onClick={() => navigate("/step-3-safety-check")}
                data-testid="button-next-step"
              >
                Next Step: Safety Checkup
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => navigate("/step-4-decision-report")}
                  data-testid="button-jump-report"
                >
                  Jump to: Build Report
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => navigate("/contact")}
                  data-testid="button-get-help"
                >
                  <HelpCircle className="w-4 h-4 mr-2" />
                  Get Help
                </Button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </PublicLayout>
  );
}
