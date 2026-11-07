import { Link } from "wouter";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { ScrollToTop } from "@/components/utils/ScrollToTop";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, ArrowRight, CheckCircle, XCircle, AlertCircle,
  FileText, MapPin, Clock, Scale, Building
} from "lucide-react";

export default function NAConversionGuide() {
  return (
    <PublicLayout>
      <ScrollToTop />
      
      <div className="bg-background py-12">
        <div className="container mx-auto px-4">
          <Link href="/step-3-safety-check">
            <Button variant="ghost" size="sm" className="mb-6" data-testid="button-back-checklist">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to 12-Point Checklist
            </Button>
          </Link>
          
          <Badge className="bg-primary/5 text-primary mb-4">Check #5 - Legal</Badge>
          <h1 className="text-3xl md:text-4xl font-semibold text-primary dark:text-white mb-4">
            How to Verify NA (Non-Agricultural) Conversion
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl">
            Agricultural land cannot be used for residential or commercial purposes without NA conversion. This is a critical legal requirement.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="prose dark:prose-invert max-w-none">
          
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-primary dark:text-white mb-4">Why This Matters</h2>
            <p className="text-slate-600 dark:text-slate-400">
              In Maharashtra, all agricultural land must be converted to Non-Agricultural (NA) status before any construction or non-farming use. Buying land without proper NA conversion means you cannot build, get electricity connection, or get building permissions. Many plots in Nagpur's outskirts are sold without proper NA - this is illegal.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-primary dark:text-white mb-6">Step-by-Step Verification</h2>
            
            <div className="space-y-6">
              <Card className="border-l-4 border-l-purple-500">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-primary/5 flex items-center justify-center text-primary font-bold flex-shrink-0">1</div>
                    <div>
                      <h3 className="font-bold text-primary dark:text-white mb-2">Request NA Order Copy</h3>
                      <p className="text-slate-600 dark:text-slate-400 mb-3">
                        Ask the seller for the original NA Order issued by the Collector's office. This document is the official proof of conversion.
                      </p>
                      <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-lg text-sm">
                        <strong>Document name:</strong> "Non-Agricultural Permission Order" or "NA Sanad"
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-purple-500">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-primary/5 flex items-center justify-center text-primary font-bold flex-shrink-0">2</div>
                    <div>
                      <h3 className="font-bold text-primary dark:text-white mb-2">Verify at Collector Office</h3>
                      <p className="text-slate-600 dark:text-slate-400 mb-3">
                        Visit the Nagpur Collector's office to verify the NA order is genuine and not forged. Cross-check the order number and date.
                      </p>
                      <div className="bg-primary/5 dark:bg-purple-900/30 p-3 rounded-lg text-sm">
                        <strong>Office:</strong> Collector Office, Civil Lines, Nagpur - Land Records Section
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-purple-500">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-primary/5 flex items-center justify-center text-primary font-bold flex-shrink-0">3</div>
                    <div>
                      <h3 className="font-bold text-primary dark:text-white mb-2">Check 7/12 Extract for NA Entry</h3>
                      <p className="text-slate-600 dark:text-slate-400 mb-3">
                        The 7/12 extract should show "bin-sheti" (non-agricultural) in the land use column. If it still shows "sheti" (agricultural), NA mutation is pending.
                      </p>
                      <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-lg text-sm">
                        <strong>Online check:</strong> bhulekh.mahabhumi.gov.in → Select Nagpur → View 7/12
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-purple-500">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-primary/5 flex items-center justify-center text-primary font-bold flex-shrink-0">4</div>
                    <div>
                      <h3 className="font-bold text-primary dark:text-white mb-2">Confirm Conversion Fees Paid</h3>
                      <p className="text-slate-600 dark:text-slate-400 mb-3">
                        NA conversion requires payment of conversion fees (typically 2-3% of land value). Request payment receipts to confirm all dues are cleared.
                      </p>
                      <div className="bg-amber-50 dark:bg-amber-900/30 p-3 rounded-lg text-sm">
                        <strong>Note:</strong> Unpaid NA fees become your liability after purchase
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-purple-500">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-primary/5 flex items-center justify-center text-primary font-bold flex-shrink-0">5</div>
                    <div>
                      <h3 className="font-bold text-primary dark:text-white mb-2">Check NA Purpose Matches Your Use</h3>
                      <p className="text-slate-600 dark:text-slate-400 mb-3">
                        NA conversion is granted for specific purposes: Residential, Commercial, Industrial, etc. Ensure the purpose matches your intended use.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-primary dark:text-white mb-4 flex items-center gap-2">
              <AlertCircle className="text-red-500" /> Red Flags to Watch
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <XCircle className="text-red-500 flex-shrink-0 mt-0.5" />
                <span className="text-slate-700 dark:text-slate-300">"NA applied" is not the same as "NA granted" - wait for order</span>
              </div>
              <div className="flex items-start gap-3 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <XCircle className="text-red-500 flex-shrink-0 mt-0.5" />
                <span className="text-slate-700 dark:text-slate-300">7/12 still shows "sheti" (agricultural) land type</span>
              </div>
              <div className="flex items-start gap-3 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <XCircle className="text-red-500 flex-shrink-0 mt-0.5" />
                <span className="text-slate-700 dark:text-slate-300">NA order from decades ago - may need renewal</span>
              </div>
              <div className="flex items-start gap-3 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <XCircle className="text-red-500 flex-shrink-0 mt-0.5" />
                <span className="text-slate-700 dark:text-slate-300">Land in green belt, forest area, or gaothan extension</span>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-primary dark:text-white mb-4 flex items-center gap-2">
              <MapPin className="text-primary" /> Where to Verify in Nagpur
            </h2>
            <div className="space-y-4">
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-bold text-primary dark:text-white">Collector Office - Land Records</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">Civil Lines, Near Vidhan Bhavan, Nagpur - 440001</p>
                  <p className="text-slate-500 text-sm mt-1">Mon-Sat: 10:00 AM - 5:00 PM | Fee: Rs. 100-500</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-bold text-primary dark:text-white">Tehsildar Office (Taluka Level)</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">Nagpur City, Nagpur Rural, Hingna, Kamptee, Umred tehsils</p>
                  <p className="text-slate-500 text-sm mt-1">Mon-Sat: 10:00 AM - 5:00 PM</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-bold text-primary dark:text-white">Online Verification</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">bhulekh.mahabhumi.gov.in - Check 7/12 for NA status</p>
                  <p className="text-slate-500 text-sm mt-1">Available 24/7 | Free</p>
                </CardContent>
              </Card>
            </div>
          </section>

          <div className="flex flex-col md:flex-row gap-4 justify-between pt-8 border-t">
            <Link href="/guide/identity-verification">
              <Button variant="outline" className="w-full md:w-auto">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous: Identity Verification
              </Button>
            </Link>
            <Link href="/guide/encumbrance-certificate">
              <Button className="w-full md:w-auto bg-primary hover:bg-primary/90">
                Next: Encumbrance Certificate
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>

        </div>
      </div>
    </PublicLayout>
  );
}
