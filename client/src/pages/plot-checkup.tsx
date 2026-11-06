import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { ShieldCheck, FileText, CheckCircle2, AlertTriangle, ArrowRight, MessageCircle } from "lucide-react";
import { PublicLayout } from "@/components/layout/PublicLayout";

export default function PlotCheckupTool() {
  const [submitted, setSubmitted] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <PublicLayout>
        <div className="pt-32 pb-24 bg-slate-50 min-h-screen">
          <div className="container mx-auto px-4 max-w-2xl text-center">
            <div className="h-20 w-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8">
              <CheckCircle2 className="h-10 w-10" />
            </div>
            <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">Audit Request Received</h2>
            <p className="text-slate-600 font-bold text-lg mb-10">
              Our Nagpur Land Specialists are now running the 12-Point Checkup on your plot. 
              We'll send your structured Risk Report within 24 hours.
            </p>
            <Button 
              className="h-16 px-12 rounded-2xl font-black text-lg bg-indigo-600 hover:bg-indigo-500 shadow-xl shadow-indigo-600/20"
              onClick={() => window.open("https://wa.me/919876543210?text=I just submitted a 12-point plot checkup request", "_blank")}
            >
              <MessageCircle className="mr-2 h-6 w-6" /> Track via WhatsApp
            </Button>
          </div>
        </div>
      </PublicLayout>
    );
  }

  return (
    <PublicLayout>
      <div className="pt-32 pb-24 bg-slate-50 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <Badge className="bg-red-100 text-red-600 mb-4 px-4 py-1 rounded-full font-black tracking-widest text-[10px] uppercase border-none">
                Safety First
              </Badge>
              <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight leading-none mb-6">
                NagpurLand 12-Point <br /> <span className="text-indigo-600">Plot Checkup</span>
              </h1>
              <p className="text-slate-500 font-bold text-xl max-w-2xl mx-auto">
                Get an independent, structured risk report before you sign anything. We check what brokers don't.
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <Card className="border-none shadow-2xl rounded-[2.5rem] bg-white overflow-hidden">
                  <CardHeader className="p-10 pb-0">
                    <CardTitle className="text-2xl font-black text-slate-900">Plot Details for Audit</CardTitle>
                    <CardDescription className="font-medium">Submit information for our specialists to verify.</CardDescription>
                  </CardHeader>
                  <CardContent className="p-10">
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Project / Layout Name</Label>
                          <Input placeholder="e.g. Godrej Orchard Plot" className="h-14 rounded-xl border-slate-100" required />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Locality</Label>
                          <Input placeholder="e.g. MIHAN, Besa" className="h-14 rounded-xl border-slate-100" required />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Survey Number / Khasra (if known)</Label>
                        <Input placeholder="Optional - Helps us find 7/12 extract faster" className="h-14 rounded-xl border-slate-100" />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Broker Claimed Price (₹)</Label>
                        <Input placeholder="e.g. 45,00,000" className="h-14 rounded-xl border-slate-100" required />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Upload Documents (Optional)</Label>
                        <div className="border-2 border-dashed border-slate-100 rounded-xl p-8 text-center hover:border-indigo-100 transition-colors cursor-pointer">
                          <FileText className="h-8 w-8 text-slate-300 mx-auto mb-2" />
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Click to upload Sale Deed, 7/12, or Maps</p>
                        </div>
                      </div>

                      <Button type="submit" className="w-full h-18 rounded-2xl font-black text-xl bg-indigo-600 hover:bg-indigo-500 shadow-xl shadow-indigo-600/20 gap-2">
                        Run 12-Point Audit <ArrowRight className="h-6 w-6" />
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card className="p-8 border-none shadow-xl rounded-[2rem] bg-slate-900 text-white">
                  <h3 className="text-lg font-black mb-6 border-b border-white/10 pb-4">Audit Coverage:</h3>
                  <div className="space-y-4">
                    {[
                      "7/12 Extract Verification",
                      "NA/TP Sanction Check",
                      "Litigation History Scan",
                      "Market Price Sanity Check",
                      "RERA Registration Status",
                      "Approach Road Validity",
                      "Demarcation & Possession",
                      "Owner/Seller Verification",
                      "Public Auction Status",
                      "Mortgage/Lien Check",
                      "FSI/Building Potential",
                      "Drainage & Utility Ease"
                    ].map((point, i) => (
                      <div key={i} className="flex items-center gap-3 text-xs font-bold">
                        <CheckCircle2 className="h-4 w-4 text-green-400 shrink-0" />
                        {point}
                      </div>
                    ))}
                  </div>
                </Card>
                
                <Card className="p-8 border-none shadow-xl rounded-[2rem] bg-indigo-50 border border-indigo-100">
                  <div className="flex items-center gap-3 mb-4">
                    <AlertTriangle className="h-6 w-6 text-indigo-600" />
                    <h3 className="font-black text-indigo-900 uppercase tracking-widest text-xs">Why this matters</h3>
                  </div>
                  <p className="text-xs font-bold text-indigo-700 leading-relaxed italic">
                    "80% of Nagpur land disputes arise from minor errors in 7/12 extracts or undisclosed TP schemes. Our audit catches these before you pay the token."
                  </p>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
