import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Play, Pause, RotateCcw, CheckCircle2, Clock, User,
  MousePointer, Navigation, FileText
} from "lucide-react";

interface TestEvent {
  id: string;
  timestamp: string;
  type: string;
  details: string;
}

interface TestScenario {
  id: string;
  name: string;
  description: string;
  steps: string[];
  questions: string[];
}

const SCENARIOS: TestScenario[] = [
  {
    id: "first-time-buyer",
    name: "First-Time Home Buyer Journey",
    description: "Test the complete 4-step flow for a new user looking to buy their first property",
    steps: [
      "Land on homepage and understand value proposition",
      "Navigate to 4-Step System overview",
      "Complete Step 1: Market Intel",
      "Use filtering tool in Step 2",
      "Review Safety Check information",
      "Generate Decision Report"
    ],
    questions: [
      "Was the navigation between steps clear?",
      "Did the filtering tool provide useful results?",
      "Was the content easy to understand?",
      "Would you trust this platform for property decisions?"
    ]
  },
  {
    id: "investor",
    name: "Property Investor Flow",
    description: "Test the experience for an experienced investor comparing multiple properties",
    steps: [
      "Access Market Intel for price trends",
      "Compare localities using data",
      "Filter multiple properties for risk",
      "Export filtered results",
      "Review legal verification options"
    ],
    questions: [
      "Was the data presentation useful for comparison?",
      "Did the export feature work as expected?",
      "Was the risk scoring algorithm clear?"
    ]
  },
  {
    id: "mobile-user",
    name: "Mobile User Experience",
    description: "Test all features on mobile viewport",
    steps: [
      "Navigate entire 4-step system on mobile",
      "Use filtering tool on small screen",
      "Complete interactive checklist",
      "Test all button interactions"
    ],
    questions: [
      "Were all elements accessible on mobile?",
      "Was text readable without zooming?",
      "Did touch targets feel appropriately sized?"
    ]
  }
];

export function TestingDashboard() {
  const [selectedScenario, setSelectedScenario] = useState<TestScenario | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [events, setEvents] = useState<TestEvent[]>([]);
  const [sessionTime, setSessionTime] = useState(0);

  const startTest = () => {
    if (!selectedScenario) return;
    setIsRunning(true);
    setCurrentStep(0);
    setEvents([{
      id: Date.now().toString(),
      timestamp: new Date().toLocaleTimeString(),
      type: "session_start",
      details: `Started: ${selectedScenario.name}`
    }]);
  };

  const stopTest = () => {
    setIsRunning(false);
    setEvents(prev => [...prev, {
      id: Date.now().toString(),
      timestamp: new Date().toLocaleTimeString(),
      type: "session_end",
      details: "Test session ended"
    }]);
  };

  const resetTest = () => {
    setIsRunning(false);
    setCurrentStep(0);
    setEvents([]);
    setSessionTime(0);
  };

  const logEvent = (type: string, details: string) => {
    setEvents(prev => [...prev, {
      id: Date.now().toString(),
      timestamp: new Date().toLocaleTimeString(),
      type,
      details
    }]);
  };

  const completeStep = () => {
    if (!selectedScenario) return;
    logEvent("step_complete", `Completed: ${selectedScenario.steps[currentStep]}`);
    if (currentStep < selectedScenario.steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      stopTest();
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Test Scenarios
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {SCENARIOS.map((scenario) => (
                <div
                  key={scenario.id}
                  className={`p-4 rounded-lg border cursor-pointer transition-all ${
                    selectedScenario?.id === scenario.id
                      ? "border-[#2180a8] bg-[#2180a8]/5"
                      : "border-slate-200 hover:border-slate-300"
                  }`}
                  onClick={() => !isRunning && setSelectedScenario(scenario)}
                  data-testid={`scenario-${scenario.id}`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-slate-900 dark:text-white">
                        {scenario.name}
                      </h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                        {scenario.description}
                      </p>
                    </div>
                    <Badge variant="outline">{scenario.steps.length} steps</Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {selectedScenario && (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Test Steps</CardTitle>
                  <div className="flex gap-2">
                    {!isRunning ? (
                      <Button onClick={startTest} className="bg-[#208a4a] hover:bg-[#1a7a3a]">
                        <Play className="w-4 h-4 mr-2" />
                        Start Test
                      </Button>
                    ) : (
                      <Button onClick={stopTest} variant="destructive">
                        <Pause className="w-4 h-4 mr-2" />
                        Stop
                      </Button>
                    )}
                    <Button onClick={resetTest} variant="outline">
                      <RotateCcw className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {selectedScenario.steps.map((step, index) => (
                    <div
                      key={index}
                      className={`flex items-center gap-3 p-3 rounded-lg ${
                        index < currentStep
                          ? "bg-green-50 dark:bg-green-900/20"
                          : index === currentStep && isRunning
                            ? "bg-blue-50 dark:bg-blue-900/20 border border-blue-200"
                            : "bg-slate-50 dark:bg-slate-800"
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        index < currentStep
                          ? "bg-[#208a4a] text-white"
                          : index === currentStep && isRunning
                            ? "bg-[#2180a8] text-white"
                            : "bg-slate-200 dark:bg-slate-700 text-slate-500"
                      }`}>
                        {index < currentStep ? (
                          <CheckCircle2 className="w-4 h-4" />
                        ) : (
                          index + 1
                        )}
                      </div>
                      <span className={`flex-1 ${index < currentStep ? "line-through text-slate-500" : ""}`}>
                        {step}
                      </span>
                      {index === currentStep && isRunning && (
                        <Button size="sm" onClick={completeStep}>
                          Mark Complete
                        </Button>
                      )}
                    </div>
                  ))}
                </div>

                {isRunning && (
                  <div className="mt-4">
                    <Progress value={(currentStep / selectedScenario.steps.length) * 100} className="h-2" />
                    <p className="text-sm text-slate-500 mt-2 text-center">
                      {currentStep} of {selectedScenario.steps.length} steps completed
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Session Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Status</span>
                  <Badge className={isRunning ? "bg-green-500" : "bg-slate-500"}>
                    {isRunning ? "Running" : "Idle"}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Events Logged</span>
                  <span className="font-semibold">{events.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Current Step</span>
                  <span className="font-semibold">{selectedScenario ? currentStep + 1 : "-"}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MousePointer className="w-5 h-5" />
                Event Log
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-[300px] overflow-y-auto">
                {events.length === 0 ? (
                  <p className="text-sm text-slate-500 text-center py-4">
                    No events logged yet
                  </p>
                ) : (
                  events.map((event) => (
                    <div
                      key={event.id}
                      className="text-xs p-2 bg-slate-50 dark:bg-slate-800 rounded"
                    >
                      <span className="text-slate-400">{event.timestamp}</span>
                      <span className="mx-2">|</span>
                      <span className="font-medium">{event.type}</span>
                      <p className="text-slate-600 mt-1">{event.details}</p>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default TestingDashboard;
