import { useState } from "react";
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
  FileCheck, Users, Building, Landmark,
  ArrowRight, CheckCircle, XCircle, AlertCircle, HelpCircle,
  FileText, Scale, MapPin, Banknote, UserCheck, Search,
  ChevronDown, ChevronUp, ExternalLink, Printer, X, Bell
} from "lucide-react";
import type { BlogNotification } from "@shared/schema";
import { useBuyerDraft } from "@/lib/buyer-draft";
import { useTranslation } from "@/lib/i18n/context";
import { fill } from "@/lib/i18n/site";
import { STEPS } from "@/lib/step-navigation";

interface CheckItem {
  id: number;
  blogSlug: string;
  icon: typeof FileText;
  category: "documents" | "legal" | "physical";
}

// Wording for each check is in lib/i18n/site.ts, in the same order as the ids.
export const ALL_CHECKS: CheckItem[] = [
  { id: 1, blogSlug: "ownership-verification", icon: FileText, category: "documents" },
  { id: 2, blogSlug: "mutations-transfers", icon: FileCheck, category: "documents" },
  { id: 3, blogSlug: "property-tax", icon: FileText, category: "documents" },
  { id: 4, blogSlug: "identity-verification", icon: UserCheck, category: "documents" },
  { id: 5, blogSlug: "na-conversion", icon: Scale, category: "legal" },
  { id: 6, blogSlug: "encumbrance-certificate", icon: Banknote, category: "legal" },
  { id: 7, blogSlug: "title-verification", icon: Users, category: "legal" },
  { id: 8, blogSlug: "litigation-search", icon: Landmark, category: "legal" },
  { id: 9, blogSlug: "boundary-verification", icon: MapPin, category: "physical" },
  { id: 10, blogSlug: "possession-verification", icon: Building, category: "physical" },
  { id: 11, blogSlug: "neighbor-verification", icon: UserCheck, category: "physical" },
  { id: 12, blogSlug: "tp-scheme-check", icon: Scale, category: "physical" },
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
  const t = useTranslation();
  const completedInCategory = items.filter(item => checkedItems.includes(item.id)).length;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-3">
        <h3 className="font-sans font-semibold text-slate-900 dark:text-white text-lg flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${categoryColor}`} />
          {title}
        </h3>
        <Badge variant="outline" className="text-xs">
          {fill(t.step3.categoryCount, { done: completedInCategory, total: items.length })}
        </Badge>
      </div>

      <div className="space-y-2">
        {items.map((item) => {
          const isChecked = checkedItems.includes(item.id);
          const isExpanded = expandedItems.includes(item.id);
          const text = t.checks[item.id - 1];

          return (
            <div
              key={item.id}
              className={`rounded-xl border transition-all ${
                isChecked
                  ? 'bg-primary/5 border-primary/30'
                  : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700'
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
                    <span className="font-semibold text-slate-900 dark:text-white">
                      {text.title}
                    </span>
                  </div>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">{text.description}</p>
                </div>
                {isChecked ? (
                  <span className="text-xs font-medium text-primary flex-shrink-0">{t.step3.markedByYou}</span>
                ) : (
                  <Badge className="bg-primary/5 text-primary text-[10px] shadow-none hover:bg-primary/5">{t.step3.guideBadge}</Badge>
                )}
              </div>

              <div className="px-4 pb-3">
                <button
                  onClick={(e) => { e.stopPropagation(); onToggleExpand(item.id); }}
                  className="text-sm text-primary dark:text-blue-400 hover:underline flex items-center gap-1 font-medium"
                  data-testid={`expand-${item.id}`}
                >
                  {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  {t.step3.howTo}
                </button>

                {isExpanded && (
                  <div className="mt-3 p-4 bg-background dark:bg-blue-900/20 rounded-lg border border-border">
                    <ul className="space-y-2 mb-4">
                      {text.howTo.map((step, i) => (
                        <li key={i} className="text-sm text-slate-700 dark:text-slate-300 flex items-start gap-2">
                          <span className="text-accent-strong font-bold min-w-[20px]">{i + 1}.</span>
                          {step}
                        </li>
                      ))}
                    </ul>
                    <Link
                      href={`/guide/${item.blogSlug}`}
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-2 text-sm font-medium text-primary dark:text-blue-400 hover:underline"
                      data-testid={`read-guide-${item.id}`}
                    >
                      <ExternalLink className="w-4 h-4" />
                      {t.step3.readGuide}
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

export default function Step3SafetyCheck() {
  const [, navigate] = useLocation();
  const t = useTranslation();
  const s = t.step3;
  const { draft, updateDraft } = useBuyerDraft();
  const checkedItems = draft.checks;
  const [expandedItems, setExpandedItems] = useState<number[]>([]);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [dismissedNotifications, setDismissedNotifications] = useState<number[]>([]);

  const { data: notifications } = useQuery<BlogNotification[]>({
    queryKey: ["/api/notifications?targetPage=/step-3-safety-check"],
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

  const toggleCheck = (id: number) => {
    updateDraft({
      checks: checkedItems.includes(id) ? checkedItems.filter(i => i !== id) : [...checkedItems, id]
    });
  };

  const toggleExpand = (id: number) => {
    setExpandedItems(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const completedCount = checkedItems.length;
  const progressPercent = (completedCount / ALL_CHECKS.length) * 100;

  const sections = [
    { category: "documents", color: "bg-primary" },
    { category: "legal", color: "bg-accent-strong" },
    { category: "physical", color: "bg-amber-500" },
  ] as const;

  const flags = [
    { key: "red", icon: XCircle, box: "border-red-200 bg-red-50", tint: "bg-red-100", text: "text-red-700" },
    { key: "yellow", icon: AlertCircle, box: "border-amber-200 bg-amber-50", tint: "bg-amber-100", text: "text-amber-700" },
    { key: "green", icon: CheckCircle, box: "border-green-200 bg-green-50", tint: "bg-green-100", text: "text-green-700" },
  ] as const;

  return (
    <PublicLayout>
      <div className="min-h-screen bg-white dark:bg-slate-900">
        <SimpleBreadcrumb
          steps={[
            { label: t.common.home, link: "/" },
            { label: t.common.fourStep, link: "/4-step-system" }
          ]}
          currentPage={`${fill(t.common.stepLabel, { step: 3 })}: ${t.steps[2].title}`}
        />

        <ProgressBar currentStep={3} />

        <StepHeader
          stepNumber={3}
          description={s.description}
        />

        {activeNotifications.length > 0 && (
          <div className="max-w-4xl mx-auto px-4 pt-4">
            {activeNotifications.map(notification => (
              <div
                key={notification.id}
                className="bg-primary/5 border border-border rounded-xl p-4 flex items-center justify-between gap-4"
                data-testid={`notification-${notification.id}`}
              >
                <div className="flex items-center gap-3">
                  <div className="bg-white p-2 rounded-full">
                    <Bell className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-900 dark:text-white">
                      {notification.notificationText}
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{s.newGuide}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Link
                    href="/contact"
                    onClick={() => handleNotificationClick(notification)}
                  >
                    <Button size="sm" data-testid={`read-notification-${notification.id}`}>{s.readNotification}</Button>
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
            <Badge className="bg-primary/5 text-primary hover:bg-primary/5 shadow-none mb-4 px-4 py-1.5">{s.badge}</Badge>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">{s.intro}</p>
          </section>

          <section id="section-self-check" data-testid="section-self-check" className="bg-background dark:bg-slate-800/40 border border-border rounded-xl p-5 sm:p-8">
            <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
              <div>
                <h2 className="text-2xl text-primary dark:text-white">{t.steps[2].title}</h2>
                <p className="text-slate-600 dark:text-slate-400 mt-1">{s.listNote}</p>
              </div>
              <div className="text-right">
                <div className="font-display text-3xl text-primary">{completedCount}/12</div>
                <div className="text-sm text-slate-500">{s.markedByYou}</div>
              </div>
            </div>

            <div className="w-full bg-primary/10 rounded-full h-2 mb-8">
              <div
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            <div className="space-y-8">
              {sections.map(({ category, color }) => (
                <ChecklistSection
                  key={category}
                  title={s.categories[category]}
                  items={ALL_CHECKS.filter((check) => check.category === category)}
                  checkedItems={checkedItems}
                  expandedItems={expandedItems}
                  onToggleCheck={toggleCheck}
                  onToggleExpand={toggleExpand}
                  categoryColor={color}
                />
              ))}
            </div>

            {completedCount === 12 && (
              <div className="mt-8 p-6 bg-primary text-white rounded-xl text-center" data-testid="all-marked">
                <p className="font-display text-xl mb-2">{s.allMarkedTitle}</p>
                <p className="text-white/80 mb-4">{s.allMarkedBody}</p>
                <Button
                  size="lg"
                  className="bg-accent text-accent-foreground hover:bg-accent/90"
                  onClick={() => navigate(STEPS[3].link)}
                  data-testid="button-view-report"
                >
                  {s.seeSummary}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            )}

            <div className="mt-6 flex flex-wrap gap-3 justify-center">
              <Button
                variant="outline"
                className="bg-white dark:bg-slate-800"
                onClick={() => window.print()}
                data-testid="button-print"
              >
                <Printer className="w-4 h-4 mr-2" />
                {s.print}
              </Button>
            </div>
          </section>

          <section data-testid="section-flags" className="space-y-6">
            <h2 className="text-2xl text-primary dark:text-white text-center">{s.flagsTitle}</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {flags.map(({ key, icon: Icon, box, tint, text }) => (
                <Card key={key} className={`border shadow-none ${box}`}>
                  <CardContent className="p-6 text-center">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 ${tint}`}>
                      <Icon className={`w-6 h-6 ${text}`} />
                    </div>
                    <h3 className={`font-sans font-bold mb-2 ${text}`}>{s.flags[key].title}</h3>
                    <p className={`text-sm font-medium mb-2 ${text}`}>{s.flags[key].action}</p>
                    <p className="text-xs text-slate-600">{s.flags[key].body}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section data-testid="section-faq" className="bg-background dark:bg-slate-800/50 border border-border rounded-xl p-6 sm:p-8">
            <h2 className="text-xl text-primary dark:text-white mb-6 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-accent-strong" />
              {s.faqTitle}
            </h2>

            <div className="space-y-3">
              {s.faq.map((faq, i) => (
                <div
                  key={i}
                  className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700"
                >
                  <button
                    className="w-full flex items-center justify-between gap-3 p-4 text-left"
                    onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                    data-testid={`faq-${i}`}
                  >
                    <span className="font-medium text-slate-900 dark:text-white">{faq.question}</span>
                    {expandedFaq === i ? (
                      <ChevronUp className="w-5 h-5 text-slate-500 shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-slate-500 shrink-0" />
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

          <section data-testid="section-decision-tree" className="bg-background dark:bg-slate-800/50 border border-border rounded-xl p-6 sm:p-8">
            <h2 className="text-2xl text-primary dark:text-white mb-6 text-center">{s.whoTitle}</h2>

            <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              <Card className="border-border shadow-none">
                <CardContent className="p-6">
                  <Badge className="bg-primary/5 text-primary hover:bg-primary/5 shadow-none mb-4">{s.selfBadge}</Badge>
                  <h3 className="text-xl text-primary dark:text-white mb-2">{s.selfTitle}</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">{s.selfBody}</p>
                  <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400 mb-6">
                    {s.selfPoints.map((point) => (
                      <li key={point} className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-accent-strong" /> {point}</li>
                    ))}
                  </ul>
                  <Button
                    className="w-full"
                    onClick={() => document.getElementById('section-self-check')?.scrollIntoView({ behavior: 'smooth' })}
                    data-testid="button-self-verify"
                  >
                    {s.selfButton}
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-border shadow-none">
                <CardContent className="p-6">
                  <Badge className="bg-primary/5 text-primary hover:bg-primary/5 shadow-none mb-4">{s.advocateBadge}</Badge>
                  <h3 className="text-xl text-primary dark:text-white mb-2">{s.advocateTitle}</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">{s.advocateBody}</p>
                  <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400 mb-6">
                    <li className="flex items-center gap-2"><Search className="w-4 h-4 text-accent-strong" /> {s.advocatePoints[0]}</li>
                    <li className="flex items-center gap-2"><Banknote className="w-4 h-4 text-accent-strong" /> {s.advocatePoints[1]}</li>
                    <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-accent-strong" /> {s.advocatePoints[2]}</li>
                  </ul>
                  <Button
                    variant="outline"
                    className="w-full border-primary/20 text-primary"
                    onClick={() => navigate("/contact")}
                    data-testid="button-expert-verify"
                  >
                    {s.advocateButton}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </section>

          <section
            className="bg-primary rounded-xl p-6 sm:p-8"
            data-testid="section-cta"
          >
            <div className="text-center mb-6">
              <h2 className="text-xl sm:text-2xl text-white mb-2">{s.ctaTitle}</h2>
              <p className="text-white/70">{s.ctaBody}</p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-accent text-accent-foreground hover:bg-accent/90"
                onClick={() => navigate(STEPS[3].link)}
                data-testid="button-next-step"
              >
                {fill(t.common.continueTo, { step: 4 })}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>

              <Button
                variant="outline"
                className="border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white"
                onClick={() => navigate(STEPS[1].link)}
                data-testid="button-back"
              >
                {s.back}
              </Button>
            </div>
          </section>
        </div>
      </div>
    </PublicLayout>
  );
}
