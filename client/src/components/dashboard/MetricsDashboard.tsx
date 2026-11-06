import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { 
  Target, TrendingUp, TrendingDown, CheckCircle2, 
  AlertTriangle, Edit2, Save
} from "lucide-react";

interface Metric {
  id: string;
  name: string;
  description: string;
  baseline: number;
  current: number;
  target: number;
  unit: string;
  higherIsBetter: boolean;
}

const INITIAL_METRICS: Metric[] = [
  {
    id: "progression",
    name: "User Progression Rate",
    description: "% of users who complete at least 2 steps",
    baseline: 25,
    current: 42,
    target: 60,
    unit: "%",
    higherIsBetter: true
  },
  {
    id: "engagement",
    name: "Avg. Engagement Time",
    description: "Average time spent in 4-step flow (minutes)",
    baseline: 3.5,
    current: 5.8,
    target: 8,
    unit: "min",
    higherIsBetter: true
  },
  {
    id: "clarity",
    name: "Navigation Clarity Score",
    description: "Based on user feedback surveys (1-10)",
    baseline: 5.2,
    current: 7.1,
    target: 8.5,
    unit: "/10",
    higherIsBetter: true
  },
  {
    id: "cta",
    name: "CTA Click Rate",
    description: "% of users clicking primary CTAs",
    baseline: 12,
    current: 28,
    target: 40,
    unit: "%",
    higherIsBetter: true
  },
  {
    id: "dropoff",
    name: "Step 2 Drop-off Rate",
    description: "% of users abandoning at Step 2",
    baseline: 55,
    current: 37,
    target: 25,
    unit: "%",
    higherIsBetter: false
  }
];

export function MetricsDashboard() {
  const [metrics, setMetrics] = useState<Metric[]>(INITIAL_METRICS);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState<string>("");

  const startEditing = (metric: Metric) => {
    setEditingId(metric.id);
    setEditValue(metric.current.toString());
  };

  const saveEdit = (id: string) => {
    setMetrics(prev => prev.map(m => 
      m.id === id ? { ...m, current: parseFloat(editValue) || m.current } : m
    ));
    setEditingId(null);
  };

  const getProgress = (metric: Metric) => {
    if (metric.higherIsBetter) {
      const range = metric.target - metric.baseline;
      const progress = metric.current - metric.baseline;
      return Math.min(100, Math.max(0, (progress / range) * 100));
    } else {
      const range = metric.baseline - metric.target;
      const progress = metric.baseline - metric.current;
      return Math.min(100, Math.max(0, (progress / range) * 100));
    }
  };

  const getStatus = (metric: Metric) => {
    const progress = getProgress(metric);
    if (progress >= 100) return { label: "Target Met", color: "bg-green-500" };
    if (progress >= 70) return { label: "On Track", color: "bg-blue-500" };
    if (progress >= 40) return { label: "Needs Work", color: "bg-yellow-500" };
    return { label: "At Risk", color: "bg-red-500" };
  };

  const overallProgress = metrics.reduce((sum, m) => sum + getProgress(m), 0) / metrics.length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Success Metrics</h2>
          <p className="text-slate-600 dark:text-slate-400">Track progress against targets</p>
        </div>
        <Card className="px-6 py-3">
          <div className="flex items-center gap-4">
            <div>
              <p className="text-sm text-slate-600">Overall Progress</p>
              <p className="text-2xl font-bold text-[#2180a8]">{overallProgress.toFixed(0)}%</p>
            </div>
            <div className="w-24">
              <Progress value={overallProgress} className="h-3" />
            </div>
          </div>
        </Card>
      </div>

      <div className="grid gap-6">
        {metrics.map((metric) => {
          const progress = getProgress(metric);
          const status = getStatus(metric);
          const isImproved = metric.higherIsBetter 
            ? metric.current > metric.baseline
            : metric.current < metric.baseline;

          return (
            <Card key={metric.id}>
              <CardContent className="pt-6">
                <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-lg text-slate-900 dark:text-white">
                        {metric.name}
                      </h3>
                      <Badge className={status.color}>{status.label}</Badge>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                      {metric.description}
                    </p>
                    <Progress value={progress} className="h-3" />
                  </div>

                  <div className="grid grid-cols-3 gap-6 lg:gap-8">
                    <div className="text-center">
                      <p className="text-xs text-slate-500 mb-1">Baseline</p>
                      <p className="text-xl font-semibold text-slate-400">
                        {metric.baseline}{metric.unit}
                      </p>
                    </div>

                    <div className="text-center">
                      <p className="text-xs text-slate-500 mb-1">Current</p>
                      {editingId === metric.id ? (
                        <div className="flex items-center gap-1">
                          <Input
                            type="number"
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            className="w-20 h-8 text-center"
                          />
                          <Button size="sm" variant="ghost" onClick={() => saveEdit(metric.id)}>
                            <Save className="w-4 h-4" />
                          </Button>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center gap-2">
                          <p className="text-xl font-bold text-slate-900 dark:text-white">
                            {metric.current}{metric.unit}
                          </p>
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            className="h-6 w-6 p-0"
                            onClick={() => startEditing(metric)}
                          >
                            <Edit2 className="w-3 h-3" />
                          </Button>
                        </div>
                      )}
                      <div className={`flex items-center justify-center gap-1 text-xs mt-1 ${
                        isImproved ? "text-green-600" : "text-red-600"
                      }`}>
                        {isImproved ? (
                          <TrendingUp className="w-3 h-3" />
                        ) : (
                          <TrendingDown className="w-3 h-3" />
                        )}
                        <span>vs baseline</span>
                      </div>
                    </div>

                    <div className="text-center">
                      <p className="text-xs text-slate-500 mb-1">Target</p>
                      <p className="text-xl font-semibold text-[#2180a8]">
                        {metric.target}{metric.unit}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className="bg-slate-50 dark:bg-slate-800/50">
        <CardContent className="pt-6">
          <h3 className="font-semibold text-slate-900 dark:text-white mb-4">
            Metrics Summary
          </h3>
          <div className="grid gap-4 sm:grid-cols-4">
            <div className="text-center p-4 bg-white dark:bg-slate-800 rounded-lg">
              <CheckCircle2 className="w-8 h-8 text-green-500 mx-auto mb-2" />
              <p className="text-2xl font-bold">{metrics.filter(m => getProgress(m) >= 100).length}</p>
              <p className="text-sm text-slate-500">Targets Met</p>
            </div>
            <div className="text-center p-4 bg-white dark:bg-slate-800 rounded-lg">
              <Target className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <p className="text-2xl font-bold">{metrics.filter(m => getProgress(m) >= 70 && getProgress(m) < 100).length}</p>
              <p className="text-sm text-slate-500">On Track</p>
            </div>
            <div className="text-center p-4 bg-white dark:bg-slate-800 rounded-lg">
              <AlertTriangle className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
              <p className="text-2xl font-bold">{metrics.filter(m => getProgress(m) >= 40 && getProgress(m) < 70).length}</p>
              <p className="text-sm text-slate-500">Needs Work</p>
            </div>
            <div className="text-center p-4 bg-white dark:bg-slate-800 rounded-lg">
              <AlertTriangle className="w-8 h-8 text-red-500 mx-auto mb-2" />
              <p className="text-2xl font-bold">{metrics.filter(m => getProgress(m) < 40).length}</p>
              <p className="text-sm text-slate-500">At Risk</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default MetricsDashboard;
