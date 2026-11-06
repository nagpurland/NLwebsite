import { useState } from "react";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { SimpleBreadcrumb } from "@/components/ui/simple-breadcrumb";
import { Button } from "@/components/ui/button";
import { TestingDashboard } from "@/components/dashboard/TestingDashboard";
import { AnalyticsDashboard } from "@/components/dashboard/AnalyticsDashboard";
import { MetricsDashboard } from "@/components/dashboard/MetricsDashboard";
import { RoadmapDashboard } from "@/components/dashboard/RoadmapDashboard";
import { Card, CardContent } from "@/components/ui/card";
import { 
  LayoutDashboard, TestTube, BarChart3, Target, Calendar,
  CheckCircle2, ArrowRight
} from "lucide-react";

type TabId = "overview" | "testing" | "analytics" | "metrics" | "roadmap";

const TABS: { id: TabId; label: string; icon: typeof LayoutDashboard }[] = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "testing", label: "Testing", icon: TestTube },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "metrics", label: "Metrics", icon: Target },
  { id: "roadmap", label: "Roadmap", icon: Calendar },
];

function OverviewTab() {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
          What This Dashboard Does
        </h2>
        <div className="grid gap-6 sm:grid-cols-2">
          <Card className="border-slate-200 dark:border-slate-700">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                  <TestTube className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Testing</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                    Run user testing sessions with different scenarios. Track user behavior, navigation patterns, and answer key questions about usability.
                  </p>
                  <ul className="text-sm text-slate-500 space-y-1">
                    <li>3 pre-built test scenarios</li>
                    <li>Event tracking</li>
                    <li>Session reports</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200 dark:border-slate-700">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Analytics</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                    Monitor user behavior in real-time. Track page views, conversion funnels, click patterns, and identify drop-off points.
                  </p>
                  <ul className="text-sm text-slate-500 space-y-1">
                    <li>Page view tracking</li>
                    <li>Conversion funnel analysis</li>
                    <li>Click analysis</li>
                    <li>Drop-off identification</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200 dark:border-slate-700">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                  <Target className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Success Metrics</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                    Compare actual performance against targets. Track 5 key success metrics with baseline, current, and target values.
                  </p>
                  <ul className="text-sm text-slate-500 space-y-1">
                    <li>User progression tracking</li>
                    <li>Engagement measurement</li>
                    <li>Navigation clarity scoring</li>
                    <li>CTA performance analysis</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200 dark:border-slate-700">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Roadmap</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                    4-week implementation plan with task tracking, time estimates, and team assignments.
                  </p>
                  <ul className="text-sm text-slate-500 space-y-1">
                    <li>Phase-based organization</li>
                    <li>Task status tracking</li>
                    <li>Hour tracking</li>
                    <li>Blocker identification</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
          Quick Start Guide
        </h2>
        <Card className="border-slate-200 dark:border-slate-700">
          <CardContent className="pt-6">
            <ol className="space-y-4">
              {[
                { week: "Week 1", title: "Set Up Testing", desc: "Go to Testing tab, select a scenario, and run your first user test" },
                { week: "Week 1", title: "Start Analytics", desc: "Integrate tracking code into your site, then generate first report" },
                { week: "Week 2", title: "Track Metrics", desc: "Input baseline data, then update weekly with actual numbers" },
                { week: "Week 1-4", title: "Follow Roadmap", desc: "Use roadmap to track implementation progress" },
                { week: "Ongoing", title: "Iterate", desc: "Use insights from testing and analytics to improve UX" },
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#2180a8] text-white flex items-center justify-center font-semibold">
                    {index + 1}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-slate-900 dark:text-white">{item.title}</span>
                      <span className="text-xs text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
                        {item.week}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
          Weekly Review Cycle
        </h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <Card className="border-l-4 border-l-[#2180a8]">
            <CardContent className="pt-6 text-center">
              <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Monday</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Review last week's metrics
              </p>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-[#208a4a]">
            <CardContent className="pt-6 text-center">
              <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Tuesday - Thursday</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Run testing sessions & collect feedback
              </p>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-purple-500">
            <CardContent className="pt-6 text-center">
              <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Friday</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Analyze data, update metrics, plan next week
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}

export default function ImplementationHub() {
  const [activeTab, setActiveTab] = useState<TabId>("overview");

  return (
    <PublicLayout>
      <div className="min-h-screen bg-white dark:bg-slate-900">
        <SimpleBreadcrumb
          steps={[{ label: "Home", link: "/" }]}
          currentPage="Implementation Hub"
        />

        <div className="bg-gradient-to-r from-[#2180a8] to-[#1a6a8a] text-white py-8 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl font-black mb-2">
              4-Step System - Implementation Hub
            </h1>
            <p className="text-blue-100">
              Testing - Analytics - Metrics - Roadmap
            </p>
          </div>
        </div>

        <div className="border-b border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 sticky top-0 z-10">
          <div className="max-w-6xl mx-auto px-4">
            <nav className="flex gap-1 overflow-x-auto py-2">
              {TABS.map((tab) => (
                <Button
                  key={tab.id}
                  variant={activeTab === tab.id ? "default" : "ghost"}
                  className={activeTab === tab.id ? "bg-[#2180a8]" : ""}
                  onClick={() => setActiveTab(tab.id)}
                  data-testid={`tab-${tab.id}`}
                >
                  <tab.icon className="w-4 h-4 mr-2" />
                  {tab.label}
                </Button>
              ))}
            </nav>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 py-8">
          {activeTab === "overview" && <OverviewTab />}
          {activeTab === "testing" && <TestingDashboard />}
          {activeTab === "analytics" && <AnalyticsDashboard />}
          {activeTab === "metrics" && <MetricsDashboard />}
          {activeTab === "roadmap" && <RoadmapDashboard />}
        </div>
      </div>
    </PublicLayout>
  );
}
