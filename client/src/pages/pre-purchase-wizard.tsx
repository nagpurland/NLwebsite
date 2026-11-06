import { useState } from "react";
import { useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, TrendingUp, Search, MapPin, ArrowRight, ArrowLeft, CheckCircle2 } from "lucide-react";
import { PublicLayout } from "@/components/layout/PublicLayout";

const STEPS = [
  { id: "budget", title: "Budget & Entry", icon: TrendingUp },
  { id: "usecase", title: "Investment Goal", icon: Search },
  { id: "area", title: "Preferred Area", icon: MapPin },
  { id: "current", title: "Current Plot", icon: ShieldCheck }
];

export default function PrePurchaseWizard() {
  const [step, setStep] = useState(0);
  const [, setLocation] = useLocation();
  const [formData, setFormData] = useState({
    budget: "",
    usecase: "",
    area: "",
    currentPlot: ""
  });

  const nextStep = () => {
    if (step < STEPS.length - 1) {
      setStep(step + 1);
    } else {
      // Final navigation logic
      setLocation("/invest-safely");
    }
  };

  const prevStep = () => {
    if (step > 0) setStep(step - 1);
  };

  return (
    <PublicLayout>
      <div className="pt-32 pb-24 bg-slate-50 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="flex justify-between mb-12 relative">
              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-slate-200 -translate-y-1/2 z-0" />
              {STEPS.map((s, i) => (
                <div key={s.id} className="relative z-10 flex flex-col items-center">
                  <div className={`h-10 w-10 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                    i <= step ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20" : "bg-white text-slate-400 border-2 border-slate-100"
                  }`}>
                    {i < step ? <CheckCircle2 className="h-5 w-5" /> : i + 1}
                  </div>
                  <span className={`text-[10px] font-black uppercase tracking-widest mt-2 hidden md:block ${
                    i <= step ? "text-indigo-600" : "text-slate-400"
                  }`}>{s.title}</span>
                </div>
              ))}
            </div>

            <Card className="border-none shadow-2xl rounded-[2.5rem] overflow-hidden bg-white">
              <CardHeader className="p-10 pb-0">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-12 w-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                    {(() => {
                      const Icon = STEPS[step].icon;
                      return <Icon className="h-6 w-6" />;
                    })()}
                  </div>
                  <div>
                    <Badge variant="outline" className="border-indigo-100 text-indigo-600 mb-1">Step {step + 1} of 4</Badge>
                    <CardTitle className="text-3xl font-black text-slate-900">{STEPS[step].title}</CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-10 pt-6">
                <div className="space-y-8">
                  {step === 0 && (
                    <div className="space-y-6">
                      <Label className="text-sm font-black uppercase tracking-widest text-slate-500">What is your total budget for land investment?</Label>
                      <div className="grid grid-cols-2 gap-4">
                        {["Under ₹25L", "₹25L - ₹50L", "₹50L - ₹1Cr", "Above ₹1Cr"].map((opt) => (
                          <button
                            key={opt}
                            onClick={() => setFormData({ ...formData, budget: opt })}
                            className={`p-6 rounded-2xl border-2 font-bold text-left transition-all ${
                              formData.budget === opt ? "border-indigo-600 bg-indigo-50 text-indigo-600" : "border-slate-100 hover:border-indigo-100"
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {step === 1 && (
                    <div className="space-y-6">
                      <Label className="text-sm font-black uppercase tracking-widest text-slate-500">What is the primary purpose of this purchase?</Label>
                      <div className="grid grid-cols-1 gap-4">
                        {[
                          { id: "living", label: "Building a family home (Immediate)", desc: "Priority: Safety, Schools, Infrastructure" },
                          { id: "investment", label: "Long-term Capital Appreciation", desc: "Priority: Growth path, Metro Phase 2, Future Hubs" },
                          { id: "yield", label: "Rental/Commercial Yield", desc: "Priority: FSI, Visibility, High Footfall" }
                        ].map((opt) => (
                          <button
                            key={opt.id}
                            onClick={() => setFormData({ ...formData, usecase: opt.id })}
                            className={`p-6 rounded-2xl border-2 font-bold text-left transition-all flex flex-col ${
                              formData.usecase === opt.id ? "border-indigo-600 bg-indigo-50" : "border-slate-100 hover:border-indigo-100"
                            }`}
                          >
                            <span className={formData.usecase === opt.id ? "text-indigo-600" : "text-slate-900"}>{opt.label}</span>
                            <span className="text-xs font-medium text-slate-500 mt-1">{opt.desc}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="space-y-6">
                      <Label className="text-sm font-black uppercase tracking-widest text-slate-500">Which Nagpur area are you most interested in?</Label>
                      <Select value={formData.area} onValueChange={(val) => setFormData({ ...formData, area: val })}>
                        <SelectTrigger className="h-16 rounded-2xl border-slate-100 font-bold text-lg">
                          <SelectValue placeholder="Select Locality" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="MIHAN">MIHAN / South Nagpur</SelectItem>
                          <SelectItem value="Besa">Besa / Beltarodi</SelectItem>
                          <SelectItem value="Wardha">Wardha Road Corridor</SelectItem>
                          <SelectItem value="Hingna">Hingna / Industrial Zone</SelectItem>
                          <SelectItem value="Civil">Civil Lines / Central</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  {step === 3 && (
                    <div className="space-y-6">
                      <Label className="text-sm font-black uppercase tracking-widest text-slate-500">Have you already identified a specific plot?</Label>
                      <Input
                        placeholder="Enter Project Name or Survey Number (if any)"
                        value={formData.currentPlot}
                        onChange={(e) => setFormData({ ...formData, currentPlot: e.target.value })}
                        className="h-16 rounded-2xl border-slate-100 font-bold text-lg"
                      />
                      <p className="text-xs text-slate-400 font-medium italic">
                        *If you have a plot, we will run our 12-point legal audit on it next.
                      </p>
                    </div>
                  )}

                  <div className="pt-8 flex gap-4">
                    {step > 0 && (
                      <Button variant="ghost" onClick={prevStep} className="h-16 px-8 rounded-2xl font-bold gap-2">
                        <ArrowLeft className="h-4 w-4" /> Back
                      </Button>
                    )}
                    <Button 
                      onClick={nextStep} 
                      className="flex-1 h-16 rounded-2xl font-black text-xl bg-indigo-600 hover:bg-indigo-500 shadow-xl shadow-indigo-600/20 gap-2"
                    >
                      {step === STEPS.length - 1 ? "Generate My Report" : "Continue"} <ArrowRight className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="mt-12 flex items-center justify-center gap-6 text-slate-400">
              <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em]">
                <ShieldCheck className="h-4 w-4" /> 100% Privacy
              </div>
              <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em]">
                <CheckCircle2 className="h-4 w-4" /> Independent Audit
              </div>
            </div>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
