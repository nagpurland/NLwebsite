import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Calendar, Clock, User, AlertTriangle, CheckCircle2,
  Circle, ChevronDown, ChevronRight
} from "lucide-react";

interface Task {
  id: string;
  title: string;
  hours: number;
  assignee: string;
  status: "pending" | "in-progress" | "completed" | "blocked";
  blocker?: string;
}

interface Phase {
  id: string;
  name: string;
  week: number;
  tasks: Task[];
}

const INITIAL_PHASES: Phase[] = [
  {
    id: "phase-1",
    name: "Foundation & Setup",
    week: 1,
    tasks: [
      { id: "1-1", title: "Set up analytics tracking code", hours: 4, assignee: "Dev", status: "completed" },
      { id: "1-2", title: "Create testing scenarios", hours: 3, assignee: "QA", status: "completed" },
      { id: "1-3", title: "Define success metrics baseline", hours: 2, assignee: "PM", status: "completed" },
      { id: "1-4", title: "Build dashboard components", hours: 8, assignee: "Dev", status: "in-progress" },
    ]
  },
  {
    id: "phase-2",
    name: "Testing & Data Collection",
    week: 2,
    tasks: [
      { id: "2-1", title: "Run first-time buyer test sessions", hours: 6, assignee: "QA", status: "in-progress" },
      { id: "2-2", title: "Run investor flow tests", hours: 4, assignee: "QA", status: "pending" },
      { id: "2-3", title: "Collect and analyze heatmap data", hours: 3, assignee: "PM", status: "pending" },
      { id: "2-4", title: "Document user feedback", hours: 2, assignee: "QA", status: "pending" },
    ]
  },
  {
    id: "phase-3",
    name: "Analysis & Improvements",
    week: 3,
    tasks: [
      { id: "3-1", title: "Analyze funnel drop-off points", hours: 4, assignee: "PM", status: "pending" },
      { id: "3-2", title: "Implement UX improvements", hours: 12, assignee: "Dev", status: "pending" },
      { id: "3-3", title: "A/B test CTA variations", hours: 6, assignee: "Dev", status: "pending" },
      { id: "3-4", title: "Update metrics tracking", hours: 2, assignee: "PM", status: "pending" },
    ]
  },
  {
    id: "phase-4",
    name: "Optimization & Launch",
    week: 4,
    tasks: [
      { id: "4-1", title: "Final testing round", hours: 4, assignee: "QA", status: "pending" },
      { id: "4-2", title: "Performance optimization", hours: 6, assignee: "Dev", status: "pending" },
      { id: "4-3", title: "Create final report", hours: 3, assignee: "PM", status: "pending" },
      { id: "4-4", title: "Team review and launch", hours: 2, assignee: "All", status: "pending" },
    ]
  }
];

export function RoadmapDashboard() {
  const [phases, setPhases] = useState<Phase[]>(INITIAL_PHASES);
  const [expandedPhases, setExpandedPhases] = useState<string[]>(["phase-1", "phase-2"]);

  const togglePhase = (phaseId: string) => {
    setExpandedPhases(prev => 
      prev.includes(phaseId) 
        ? prev.filter(id => id !== phaseId)
        : [...prev, phaseId]
    );
  };

  const toggleTaskStatus = (phaseId: string, taskId: string) => {
    setPhases(prev => prev.map(phase => {
      if (phase.id !== phaseId) return phase;
      return {
        ...phase,
        tasks: phase.tasks.map(task => {
          if (task.id !== taskId) return task;
          const nextStatus = task.status === "completed" ? "pending" 
            : task.status === "pending" ? "in-progress" 
            : task.status === "in-progress" ? "completed" 
            : task.status;
          return { ...task, status: nextStatus };
        })
      };
    }));
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed": return <CheckCircle2 className="w-4 h-4 text-green-500" />;
      case "in-progress": return <Circle className="w-4 h-4 text-primary fill-primary" />;
      case "blocked": return <AlertTriangle className="w-4 h-4 text-red-500" />;
      default: return <Circle className="w-4 h-4 text-slate-300" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      completed: "bg-green-100 text-green-700",
      "in-progress": "bg-primary/5 text-primary",
      blocked: "bg-red-100 text-red-700",
      pending: "bg-slate-100 text-slate-700"
    };
    return styles[status] || styles.pending;
  };

  const totalTasks = phases.reduce((sum, p) => sum + p.tasks.length, 0);
  const completedTasks = phases.reduce((sum, p) => sum + p.tasks.filter(t => t.status === "completed").length, 0);
  const totalHours = phases.reduce((sum, p) => sum + p.tasks.reduce((h, t) => h + t.hours, 0), 0);
  const completedHours = phases.reduce((sum, p) => sum + p.tasks.filter(t => t.status === "completed").reduce((h, t) => h + t.hours, 0), 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-primary dark:text-white">Implementation Roadmap</h2>
          <p className="text-slate-600 dark:text-slate-400">4-week implementation plan</p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-4">
        <Card>
          <CardContent className="pt-6 text-center">
            <Calendar className="w-8 h-8 text-primary mx-auto mb-2" />
            <p className="text-2xl font-bold">{phases.length}</p>
            <p className="text-sm text-slate-500">Phases</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <CheckCircle2 className="w-8 h-8 text-green-500 mx-auto mb-2" />
            <p className="text-2xl font-bold">{completedTasks}/{totalTasks}</p>
            <p className="text-sm text-slate-500">Tasks Complete</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <Clock className="w-8 h-8 text-primary mx-auto mb-2" />
            <p className="text-2xl font-bold">{completedHours}/{totalHours}h</p>
            <p className="text-sm text-slate-500">Hours Tracked</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <Progress value={(completedTasks / totalTasks) * 100} className="h-3 mb-2" />
            <p className="text-2xl font-bold">{((completedTasks / totalTasks) * 100).toFixed(0)}%</p>
            <p className="text-sm text-slate-500">Overall Progress</p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        {phases.map((phase) => {
          const phaseCompleted = phase.tasks.filter(t => t.status === "completed").length;
          const phaseProgress = (phaseCompleted / phase.tasks.length) * 100;
          const isExpanded = expandedPhases.includes(phase.id);

          return (
            <Card key={phase.id}>
              <CardHeader 
                className="cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800"
                onClick={() => togglePhase(phase.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {isExpanded ? (
                      <ChevronDown className="w-5 h-5 text-slate-400" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-slate-400" />
                    )}
                    <div>
                      <CardTitle className="text-lg">{phase.name}</CardTitle>
                      <p className="text-sm text-slate-500">Week {phase.week}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm font-medium">{phaseCompleted}/{phase.tasks.length} tasks</p>
                      <Progress value={phaseProgress} className="w-24 h-2 mt-1" />
                    </div>
                    <Badge className={phaseProgress === 100 ? "bg-green-500" : phaseProgress > 0 ? "bg-primary" : "bg-slate-300"}>
                      {phaseProgress === 100 ? "Complete" : phaseProgress > 0 ? "In Progress" : "Pending"}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              
              {isExpanded && (
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    {phase.tasks.map((task) => (
                      <div
                        key={task.id}
                        className={`flex items-center gap-4 p-3 rounded-lg border ${
                          task.status === "completed" 
                            ? "bg-green-50 dark:bg-green-900/10 border-green-200 dark:border-green-800"
                            : task.status === "in-progress"
                              ? "bg-primary/5 dark:bg-blue-900/10 border-primary/20 dark:border-blue-800"
                              : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700"
                        }`}
                      >
                        <button 
                          onClick={() => toggleTaskStatus(phase.id, task.id)}
                          className="flex-shrink-0"
                        >
                          {getStatusIcon(task.status)}
                        </button>
                        
                        <div className="flex-1">
                          <p className={`font-medium ${task.status === "completed" ? "line-through text-slate-500" : ""}`}>
                            {task.title}
                          </p>
                          {task.blocker && (
                            <p className="text-xs text-red-600 mt-1">Blocker: {task.blocker}</p>
                          )}
                        </div>

                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-1 text-slate-500">
                            <Clock className="w-4 h-4" />
                            {task.hours}h
                          </div>
                          <div className="flex items-center gap-1 text-slate-500">
                            <User className="w-4 h-4" />
                            {task.assignee}
                          </div>
                          <Badge className={getStatusBadge(task.status)}>
                            {task.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}

export default RoadmapDashboard;
