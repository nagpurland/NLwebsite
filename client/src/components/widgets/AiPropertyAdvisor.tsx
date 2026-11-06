import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, Brain, ArrowRight, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface AiPropertyAdvisorProps {
  propertyName: string;
  locality: string;
}

interface AnalysisResult {
  verdict: string;
  reasoning: string;
  risks: string[];
  score: number;
}

export function AiPropertyAdvisor({ propertyName, locality }: AiPropertyAdvisorProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);

  const runAnalysis = () => {
    setIsAnalyzing(true);
    // Simulating AI Analysis
    setTimeout(() => {
      setAnalysis({
        verdict: "Strong Strategic Buy",
        reasoning: `Analysis of ${propertyName} in ${locality} shows a 15% undervaluation relative to projected infrastructure growth. Local demand for premium rentals in this sector is rising at 8% annually.`,
        risks: ["TP Scheme verification required", "Borewell depth in summer"],
        score: 88
      });
      setIsAnalyzing(false);
    }, 2000);
  };

  return (
    <Card className="p-6 border-none shadow-2xl rounded-3xl bg-slate-900 text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 p-4 opacity-10">
        <Brain className="h-24 w-24" />
      </div>
      
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-4">
          <div className="h-8 w-8 rounded-lg bg-indigo-500 flex items-center justify-center">
            <Sparkles className="h-4 w-4 text-white" />
          </div>
          <h3 className="font-black text-lg tracking-tight">AI Strategy Advisor</h3>
        </div>

        {!analysis ? (
          <div className="space-y-4">
            <p className="text-slate-400 text-sm leading-relaxed">
              Our proprietary AI models analyze 200+ data points including RERA history, metro proximity, and local CAGR to provide a strategic verdict.
            </p>
            <Button 
              onClick={runAnalysis} 
              disabled={isAnalyzing}
              className="w-full h-12 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl gap-2"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Analyzing Market Data...
                </>
              ) : (
                <>
                  Run AI Valuation <ArrowRight className="h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        ) : (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-700">
            <div className="flex justify-between items-center">
              <Badge className="bg-green-500 text-white border-none font-bold">
                {analysis.verdict}
              </Badge>
              <div className="text-2xl font-black text-indigo-400">{analysis.score}<span className="text-xs text-slate-500">/100</span></div>
            </div>
            
            <p className="text-sm text-slate-300 leading-relaxed italic">
              "{analysis.reasoning}"
            </p>

            <div className="pt-4 border-t border-white/10">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">AI Flagged Risks</h4>
              <ul className="space-y-1">
                {analysis.risks.map((risk, i) => (
                  <li key={i} className="text-xs text-orange-300 flex items-center gap-2">
                    <div className="h-1 w-1 rounded-full bg-orange-300" />
                    {risk}
                  </li>
                ))}
              </ul>
            </div>

            <Button 
              variant="outline" 
              onClick={() => setAnalysis(null)}
              className="w-full h-10 border-white/10 hover:bg-white/5 text-slate-400 text-xs font-bold rounded-xl"
            >
              Reset Analysis
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
}
