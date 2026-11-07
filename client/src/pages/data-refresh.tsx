import { useState, useCallback } from "react";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  Copy, ExternalLink, Upload, FileSpreadsheet, CheckCircle, 
  Loader2, Database, TrendingUp, AlertCircle
} from "lucide-react";

const COMET_PROMPT = `I need you to scrape Nagpur land listings from multiple real estate websites and provide me with a downloadable CSV file.

WEBSITES TO SCRAPE:

99acres.com - https://www.99acres.com/nagpur-search-results.html
Extract: Locality, Price, Plot Size, Title, Link, Posted Date

Magicbricks.com - https://www.magicbricks.com/property-for-sale/residential-land-nagpur
Extract: Locality, Price, Plot Size, Title, Link

Housing.com - https://housing.com/buy/land-for-sale-in-nagpur
Extract: Locality, Price, Plot Size, Title, Link

LOCALITIES TO FOCUS ON:

MIHAN, Besa, Civil Lines, Wardha Road, Hingna, Kamptee, Dharampeth, Koradi

DATA FIELDS FOR EACH LISTING:

Locality (area name)
Price (in rupees - actual numbers)
Plot Size (in sqft)
Price per sqft (calculated)
Title/Description
Website Link
Posted Date
Source (99acres/magicbricks/housing)

OUTPUT FORMAT:
Provide as downloadable CSV with headers:
Locality,Price,PlotSize,PricePerSqft,Title,Link,PostedDate,Source

Requirements:
- Scrape at least 100-200 listings total
- Sort by Locality, then Price
- Remove duplicates
- Include timestamp

Please provide the CSV file I can save to my computer and upload to my app.`;

interface LocalityMetric {
  locality: string;
  count: number;
  avgPricePerSqft: number;
  medianPricePerSqft: number;
  minPrice: number;
  maxPrice: number;
  sampleListings: Array<{
    title: string;
    price: number;
    pricePerSqft: number;
    source: string;
  }>;
}

interface ProcessResult {
  success: boolean;
  message: string;
  totalListings: number;
  localityCount: number;
  metrics: LocalityMetric[];
  processedAt: string;
}

export default function DataRefresh() {
  const { toast } = useToast();
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<ProcessResult | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const copyPrompt = useCallback(() => {
    navigator.clipboard.writeText(COMET_PROMPT);
    toast({
      title: "Copied!",
      description: "Prompt copied to clipboard. Paste it in Comet AI.",
    });
  }, [toast]);

  const openComet = useCallback(() => {
    window.open("https://comet.com", "_blank");
  }, []);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.type === "text/csv" || droppedFile.name.endsWith(".csv")) {
        setFile(droppedFile);
        toast({
          title: "File uploaded",
          description: `${droppedFile.name} ready for processing.`,
        });
      } else {
        toast({
          title: "Invalid file",
          description: "Please upload a CSV file.",
          variant: "destructive",
        });
      }
    }
  }, [toast]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      toast({
        title: "File selected",
        description: `${e.target.files[0].name} ready for processing.`,
      });
    }
  }, [toast]);

  const processCSV = useCallback(async () => {
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please upload a CSV file first.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append("csv", file);

      const response = await fetch("/api/process-csv", {
        method: "POST",
        headers: { Authorization: `Bearer ${localStorage.getItem("admin_token") ?? ""}` },
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to process CSV");
      }

      setResult(data);
      toast({
        title: "Processing complete!",
        description: `Processed ${data.totalListings} listings across ${data.localityCount} localities.`,
      });
    } catch (error) {
      toast({
        title: "Processing failed",
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  }, [file, toast]);

  return (
    <PublicLayout>
      <div className="min-h-screen bg-primary py-12">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-12">
            <Badge className="bg-primary text-primary border-primary/20 mb-4">
              Admin Tool
            </Badge>
            <h1 className="text-4xl font-semibold text-white mb-4">
              Data Refresh Center
            </h1>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Update your price index with fresh listings from 99acres, MagicBricks, and Housing.com using AI-powered scraping.
            </p>
          </div>

          <div className="space-y-8">
            <Card className="bg-slate-800 border-slate-700" data-testid="step-1-card">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-white font-bold">
                    1
                  </div>
                  <div>
                    <CardTitle className="text-white">Get Scraping Prompt</CardTitle>
                    <p className="text-slate-400 text-sm">Copy the AI prompt and open Comet to start scraping</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-primary rounded-lg p-4 max-h-48 overflow-y-auto">
                  <pre className="text-slate-300 text-xs whitespace-pre-wrap font-mono">
                    {COMET_PROMPT}
                  </pre>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Button 
                    onClick={copyPrompt}
                    className="bg-primary hover:bg-primary/90"
                    data-testid="button-copy-prompt"
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Prompt
                  </Button>
                  <Button 
                    onClick={openComet}
                    variant="outline"
                    className="border-primary/20 text-primary hover:bg-primary/90"
                    data-testid="button-open-comet"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Open Comet AI
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-700" data-testid="step-2-card">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-500 text-white font-bold">
                    2
                  </div>
                  <div>
                    <CardTitle className="text-white">Upload CSV File</CardTitle>
                    <p className="text-slate-400 text-sm">Upload the CSV file you downloaded from Comet</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div
                  className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
                    dragActive 
                      ? "border-green-500 bg-green-500/10" 
                      : file 
                        ? "border-green-500 bg-green-500/5" 
                        : "border-slate-600 hover:border-slate-500"
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  data-testid="upload-dropzone"
                >
                  {file ? (
                    <div className="space-y-2">
                      <CheckCircle className="h-12 w-12 text-green-500 mx-auto" />
                      <p className="text-green-400 font-medium">{file.name}</p>
                      <p className="text-slate-500 text-sm">
                        {(file.size / 1024).toFixed(1)} KB - Ready to process
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <Upload className="h-12 w-12 text-slate-500 mx-auto" />
                      <div>
                        <p className="text-slate-300 mb-2">
                          Drag & drop your CSV file here
                        </p>
                        <p className="text-slate-500 text-sm mb-4">or</p>
                        <label htmlFor="file-upload">
                          <Button 
                            variant="outline" 
                            className="border-slate-600"
                            asChild
                          >
                            <span>
                              <FileSpreadsheet className="h-4 w-4 mr-2" />
                              Choose File
                            </span>
                          </Button>
                        </label>
                        <input
                          id="file-upload"
                          type="file"
                          accept=".csv"
                          className="hidden"
                          onChange={handleFileSelect}
                          data-testid="input-file-upload"
                        />
                      </div>
                    </div>
                  )}
                </div>
                {file && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setFile(null)}
                    className="mt-2 text-slate-400"
                    data-testid="button-remove-file"
                  >
                    Remove file
                  </Button>
                )}
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-700" data-testid="step-3-card">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-white font-bold">
                    3
                  </div>
                  <div>
                    <CardTitle className="text-white">Process & Generate Metrics</CardTitle>
                    <p className="text-slate-400 text-sm">Calculate price index and expose via API</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <Button
                  onClick={processCSV}
                  disabled={!file || isProcessing}
                  className="w-full h-14 text-lg bg-background "
                  data-testid="button-process-csv"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Database className="h-5 w-5 mr-2" />
                      Process CSV & Generate Price Index
                    </>
                  )}
                </Button>

                {result && (
                  <div className="space-y-6" data-testid="results-section">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="bg-primary rounded-lg p-4 text-center">
                        <p className="text-3xl font-bold text-white">{result.totalListings}</p>
                        <p className="text-slate-400 text-sm">Total Listings</p>
                      </div>
                      <div className="bg-primary rounded-lg p-4 text-center">
                        <p className="text-3xl font-bold text-white">{result.localityCount}</p>
                        <p className="text-slate-400 text-sm">Localities</p>
                      </div>
                      <div className="bg-primary rounded-lg p-4 text-center">
                        <p className="text-3xl font-bold text-green-400">Live</p>
                        <p className="text-slate-400 text-sm">API Status</p>
                      </div>
                    </div>

                    <div className="bg-primary rounded-lg p-4">
                      <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                        <TrendingUp className="h-5 w-5 text-green-500" />
                        Price Index by Locality
                      </h3>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm" data-testid="metrics-table">
                          <thead>
                            <tr className="text-slate-400 border-b border-slate-700">
                              <th className="text-left py-2 px-3">Locality</th>
                              <th className="text-right py-2 px-3">Listings</th>
                              <th className="text-right py-2 px-3">Avg ₹/sqft</th>
                              <th className="text-right py-2 px-3">Median</th>
                              <th className="text-right py-2 px-3">Range</th>
                            </tr>
                          </thead>
                          <tbody>
                            {result.metrics.map((metric) => (
                              <tr 
                                key={metric.locality} 
                                className="border-b border-slate-800 hover:bg-slate-800/50"
                                data-testid={`row-${metric.locality.toLowerCase().replace(/\s+/g, '-')}`}
                              >
                                <td className="py-3 px-3 text-white font-medium">
                                  {metric.locality}
                                </td>
                                <td className="py-3 px-3 text-right text-slate-300">
                                  {metric.count}
                                </td>
                                <td className="py-3 px-3 text-right text-green-400 font-semibold">
                                  ₹{metric.avgPricePerSqft.toLocaleString()}
                                </td>
                                <td className="py-3 px-3 text-right text-slate-300">
                                  ₹{metric.medianPricePerSqft.toLocaleString()}
                                </td>
                                <td className="py-3 px-3 text-right text-slate-400 text-xs">
                                  ₹{(metric.minPrice / 100000).toFixed(1)}L - ₹{(metric.maxPrice / 100000).toFixed(1)}L
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div className="bg-primary rounded-lg p-4">
                      <h3 className="text-white font-semibold mb-3">API Endpoints (Now Live)</h3>
                      <div className="space-y-2 font-mono text-sm">
                        <div className="flex items-center gap-2">
                          <Badge className="bg-green-500/20 text-green-400">GET</Badge>
                          <code className="text-slate-300">/api/price-index</code>
                          <span className="text-slate-500">- All metrics</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className="bg-green-500/20 text-green-400">GET</Badge>
                          <code className="text-slate-300">/api/price-index/:locality</code>
                          <span className="text-slate-500">- Specific locality</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {!result && !isProcessing && (
                  <div className="text-center py-8 text-slate-500">
                    <AlertCircle className="h-12 w-12 mx-auto mb-3 opacity-50" />
                    <p>Upload a CSV and click "Process" to generate metrics</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
