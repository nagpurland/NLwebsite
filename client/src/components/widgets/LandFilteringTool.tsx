import { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { 
  Upload, Download, AlertTriangle, CheckCircle2, 
  XCircle, Loader2, FileSpreadsheet, Info
} from "lucide-react";
import { getLocalityRiskScore, getLocalityPriceRange } from "@/data/nagpur-localities";

interface Property {
  id: string;
  name: string;
  price: number;
  location: string;
  legalStatus: string;
  riskScore: number;
  riskLevel: "low" | "medium" | "high";
  issues: string[];
}

interface FilterCriteria {
  priceAnomaly: boolean;
  locationFactors: boolean;
  legalVerification: boolean;
  marketTrends: boolean;
  sellerCredibility: boolean;
}

const EXAMPLE_DATA = `Name,Price,Location,Legal Status
Plot A - MIHAN,4500000,MIHAN,Clear
Plot B - Besa,2800000,Besa,Pending Verification
Plot C - Dharampeth,12000000,Dharampeth,Disputed
Plot D - Wardha Road,3200000,Wardha Road,Clear
Plot E - Hingna,1500000,Hingna,Clear
Plot F - Civil Lines,8500000,Civil Lines,Under Litigation
Plot G - Koradi,950000,Koradi,Clear
Plot H - Kamptee,1800000,Kamptee,Pending Verification`;


export function LandFilteringTool() {
  const [csvInput, setCsvInput] = useState("");
  const [properties, setProperties] = useState<Property[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [criteria, setCriteria] = useState<FilterCriteria>({
    priceAnomaly: true,
    locationFactors: true,
    legalVerification: true,
    marketTrends: true,
    sellerCredibility: true,
  });

  const loadExample = useCallback(() => {
    setCsvInput(EXAMPLE_DATA);
  }, []);

  const parseCSV = useCallback((csv: string): Array<{
    name: string;
    price: number;
    location: string;
    legalStatus: string;
  }> => {
    const lines = csv.trim().split("\n");
    if (lines.length < 2) return [];

    const headers = lines[0].toLowerCase().split(",").map(h => h.trim());
    const nameIdx = headers.findIndex(h => h.includes("name"));
    const priceIdx = headers.findIndex(h => h.includes("price"));
    const locationIdx = headers.findIndex(h => h.includes("location"));
    const legalIdx = headers.findIndex(h => h.includes("legal") || h.includes("status"));

    if (nameIdx === -1 || priceIdx === -1) return [];

    return lines.slice(1).map(line => {
      const values = line.split(",").map(v => v.trim());
      return {
        name: values[nameIdx] || "Unknown",
        price: parseFloat(values[priceIdx]?.replace(/[^0-9.]/g, "") || "0"),
        location: values[locationIdx] || "Unknown",
        legalStatus: values[legalIdx] || "Unknown",
      };
    }).filter(p => p.price > 0);
  }, []);

  const calculateRiskScore = useCallback((
    property: { name: string; price: number; location: string; legalStatus: string },
    criteria: FilterCriteria
  ): { score: number; issues: string[] } => {
    let score = 0;
    const issues: string[] = [];
    const locationKey = property.location.toLowerCase();

    if (criteria.legalVerification) {
      const status = property.legalStatus.toLowerCase();
      if (status.includes("disputed") || status.includes("litigation")) {
        score += 40;
        issues.push("Legal dispute detected");
      } else if (status.includes("pending")) {
        score += 20;
        issues.push("Legal verification pending");
      }
    }

    if (criteria.priceAnomaly) {
      const benchmark = getLocalityPriceRange(property.location);
      if (property.price < benchmark.min * 0.7) {
        score += 25;
        issues.push("Price suspiciously low");
      } else if (property.price > benchmark.max * 1.3) {
        score += 15;
        issues.push("Price above market range");
      }
    }

    if (criteria.locationFactors) {
      const locationRisk = getLocalityRiskScore(property.location);
      score += locationRisk;
      if (locationRisk > 20) {
        issues.push("Location has higher risk factors");
      }
    }

    if (criteria.marketTrends) {
      const volatileLocations = ["hingna", "koradi", "kamptee"];
      if (volatileLocations.includes(locationKey)) {
        score += 10;
        issues.push("Market volatility in this area");
      }
    }

    if (criteria.sellerCredibility) {
      if (property.price < 1000000 && !["koradi", "kamptee"].includes(locationKey)) {
        score += 15;
        issues.push("Price too low - verify seller");
      }
    }

    return { score: Math.min(score, 100), issues };
  }, []);

  const processProperties = useCallback(async () => {
    const parsed = parseCSV(csvInput);
    if (parsed.length === 0) return;

    setIsProcessing(true);
    setProgress(0);
    setProperties([]);

    const results: Property[] = [];

    for (let i = 0; i < parsed.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 200));
      
      const prop = parsed[i];
      const { score, issues } = calculateRiskScore(prop, criteria);
      
      results.push({
        id: `prop-${i}`,
        name: prop.name,
        price: prop.price,
        location: prop.location,
        legalStatus: prop.legalStatus,
        riskScore: score,
        riskLevel: score < 30 ? "low" : score < 60 ? "medium" : "high",
        issues,
      });

      setProgress(((i + 1) / parsed.length) * 100);
    }

    results.sort((a, b) => a.riskScore - b.riskScore);
    setProperties(results);
    setIsProcessing(false);
  }, [csvInput, criteria, parseCSV, calculateRiskScore]);

  const exportCSV = useCallback(() => {
    if (properties.length === 0) return;

    const headers = "Name,Price,Location,Legal Status,Risk Score,Risk Level,Issues";
    const rows = properties.map(p => 
      `"${p.name}",${p.price},"${p.location}","${p.legalStatus}",${p.riskScore},"${p.riskLevel}","${p.issues.join("; ")}"`
    );
    
    const csv = [headers, ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement("a");
    a.href = url;
    a.download = "filtered_properties.csv";
    a.click();
    URL.revokeObjectURL(url);
  }, [properties]);

  const getRiskColor = (level: string) => {
    switch (level) {
      case "low": return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
      case "medium": return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400";
      case "high": return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
      default: return "";
    }
  };

  const getRiskIcon = (level: string) => {
    switch (level) {
      case "low": return <CheckCircle2 className="w-4 h-4" />;
      case "medium": return <AlertTriangle className="w-4 h-4" />;
      case "high": return <XCircle className="w-4 h-4" />;
      default: return null;
    }
  };

  const summary = properties.length > 0 ? {
    total: properties.length,
    low: properties.filter(p => p.riskLevel === "low").length,
    medium: properties.filter(p => p.riskLevel === "medium").length,
    high: properties.filter(p => p.riskLevel === "high").length,
  } : null;

  return (
    <div className="space-y-6">
      <Card className="border-slate-200 dark:border-slate-700" data-testid="card-instructions">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Info className="w-5 h-5 text-[#2180a8]" />
            How to Use This Tool
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-slate-600 dark:text-slate-400 space-y-2">
          <p>1. Paste your property data in CSV format (Name, Price, Location, Legal Status)</p>
          <p>2. Select the filtering criteria you want to apply</p>
          <p>3. Click "Analyze Properties" to get risk scores</p>
          <p>4. Review results and export filtered list</p>
        </CardContent>
      </Card>

      <Card className="border-slate-200 dark:border-slate-700" data-testid="card-input">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Property Data Input</CardTitle>
            <Button variant="outline" size="sm" onClick={loadExample} data-testid="button-load-example">
              <FileSpreadsheet className="w-4 h-4 mr-2" />
              Load Example
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Paste CSV data here: Name,Price,Location,Legal Status"
            value={csvInput}
            onChange={(e) => setCsvInput(e.target.value)}
            className="min-h-[150px] font-mono text-sm"
            data-testid="textarea-csv-input"
          />
          <p className="text-xs text-slate-500">
            Format: Name,Price,Location,Legal Status (one property per line)
          </p>
        </CardContent>
      </Card>

      <Card className="border-slate-200 dark:border-slate-700" data-testid="card-criteria">
        <CardHeader>
          <CardTitle className="text-lg">Filtering Criteria</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { key: "priceAnomaly", label: "Price Anomaly Detection", desc: "Flag unusually high/low prices" },
              { key: "locationFactors", label: "Location Risk Factors", desc: "Assess area-specific risks" },
              { key: "legalVerification", label: "Legal Status Check", desc: "Verify legal documentation" },
              { key: "marketTrends", label: "Market Trends", desc: "Check market volatility" },
              { key: "sellerCredibility", label: "Seller Credibility", desc: "Validate seller authenticity" },
            ].map((item) => (
              <label
                key={item.key}
                className="flex items-start gap-3 p-3 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer"
                data-testid={`criteria-${item.key}`}
              >
                <Checkbox
                  checked={criteria[item.key as keyof FilterCriteria]}
                  onCheckedChange={(checked) => 
                    setCriteria(prev => ({ ...prev, [item.key]: checked }))
                  }
                  className="mt-0.5"
                />
                <div>
                  <p className="font-medium text-slate-900 dark:text-white text-sm">{item.label}</p>
                  <p className="text-xs text-slate-500">{item.desc}</p>
                </div>
              </label>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center gap-4">
        <Button
          size="lg"
          className="bg-[#2180a8] hover:bg-[#1a6a8a] text-white"
          onClick={processProperties}
          disabled={!csvInput.trim() || isProcessing}
          data-testid="button-analyze"
        >
          {isProcessing ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <Upload className="w-4 h-4 mr-2" />
              Analyze Properties
            </>
          )}
        </Button>

        {properties.length > 0 && (
          <Button variant="outline" onClick={exportCSV} data-testid="button-export">
            <Download className="w-4 h-4 mr-2" />
            Export Results
          </Button>
        )}
      </div>

      {isProcessing && (
        <Card className="border-slate-200 dark:border-slate-700">
          <CardContent className="py-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600 dark:text-slate-400">Analyzing properties...</span>
                <span className="font-medium">{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          </CardContent>
        </Card>
      )}

      {properties.length > 0 && !isProcessing && (
        <>
          <Card className="border-slate-200 dark:border-slate-700" data-testid="card-results">
            <CardHeader>
              <CardTitle className="text-lg">Filtered Results</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm" data-testid="table-results">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800">
                      <th className="text-left py-3 px-4 font-semibold">Property</th>
                      <th className="text-right py-3 px-4 font-semibold">Price</th>
                      <th className="text-left py-3 px-4 font-semibold">Location</th>
                      <th className="text-left py-3 px-4 font-semibold">Legal Status</th>
                      <th className="text-center py-3 px-4 font-semibold">Risk Score</th>
                      <th className="text-left py-3 px-4 font-semibold">Issues</th>
                    </tr>
                  </thead>
                  <tbody>
                    {properties.map((prop) => (
                      <tr 
                        key={prop.id}
                        className="border-b border-slate-100 dark:border-slate-800 last:border-0"
                        data-testid={`row-${prop.id}`}
                      >
                        <td className="py-3 px-4 font-medium text-slate-900 dark:text-white">
                          {prop.name}
                        </td>
                        <td className="py-3 px-4 text-right text-slate-600 dark:text-slate-400">
                          ₹{prop.price.toLocaleString()}
                        </td>
                        <td className="py-3 px-4 text-slate-600 dark:text-slate-400">
                          {prop.location}
                        </td>
                        <td className="py-3 px-4 text-slate-600 dark:text-slate-400">
                          {prop.legalStatus}
                        </td>
                        <td className="py-3 px-4 text-center">
                          <Badge className={`${getRiskColor(prop.riskLevel)} gap-1`}>
                            {getRiskIcon(prop.riskLevel)}
                            {prop.riskScore}
                          </Badge>
                        </td>
                        <td className="py-3 px-4 text-xs text-slate-500 max-w-[200px]">
                          {prop.issues.length > 0 ? prop.issues.join(", ") : "No issues found"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {summary && (
            <Card className="border-slate-200 dark:border-slate-700" data-testid="card-summary">
              <CardContent className="py-6">
                <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Results Summary</h3>
                <div className="grid grid-cols-4 gap-4 text-center">
                  <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">{summary.total}</p>
                    <p className="text-sm text-slate-500">Total</p>
                  </div>
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <p className="text-2xl font-bold text-green-600 dark:text-green-400">{summary.low}</p>
                    <p className="text-sm text-green-600 dark:text-green-400">Low Risk</p>
                  </div>
                  <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                    <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{summary.medium}</p>
                    <p className="text-sm text-yellow-600 dark:text-yellow-400">Medium Risk</p>
                  </div>
                  <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                    <p className="text-2xl font-bold text-red-600 dark:text-red-400">{summary.high}</p>
                    <p className="text-sm text-red-600 dark:text-red-400">High Risk</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </>
      )}
    </div>
  );
}
