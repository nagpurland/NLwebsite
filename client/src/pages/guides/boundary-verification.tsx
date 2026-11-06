import { Link } from "wouter";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { ScrollToTop } from "@/components/utils/ScrollToTop";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, ArrowRight, CheckCircle, XCircle, AlertCircle,
  MapPin, Ruler, Eye, Camera
} from "lucide-react";

export default function BoundaryVerificationGuide() {
  return (
    <PublicLayout>
      <ScrollToTop />
      
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 py-12">
        <div className="container mx-auto px-4">
          <Link href="/step-3-safety-check">
            <Button variant="ghost" size="sm" className="mb-6" data-testid="button-back-checklist">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to 12-Point Checklist
            </Button>
          </Link>
          
          <Badge className="bg-green-100 text-green-700 mb-4">Check #9 - Physical</Badge>
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-4">
            How to Verify Plot Boundaries On-Site
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl">
            Physical verification of boundaries ensures the plot you're buying matches the documents. Boundary disputes are common in Nagpur's developing areas.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="prose dark:prose-invert max-w-none">
          
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Why This Matters</h2>
            <p className="text-slate-600 dark:text-slate-400">
              Many land frauds in Nagpur involve showing one plot but selling documents for another. Boundary encroachments, missing corner stones, and unclear demarcations lead to long legal battles with neighbors. Always verify on the ground before paying.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Step-by-Step Verification</h2>
            
            <div className="space-y-6">
              <Card className="border-l-4 border-l-green-500">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold flex-shrink-0">1</div>
                    <div>
                      <h3 className="font-bold text-slate-900 dark:text-white mb-2">Get Survey Map from Tehsildar</h3>
                      <p className="text-slate-600 dark:text-slate-400 mb-3">
                        Obtain the official survey map showing exact plot dimensions, survey number boundaries, and corner coordinates.
                      </p>
                      <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-lg text-sm">
                        <strong>Document:</strong> "Mouje Naksha" or "Cadastral Map" from Talathi/Tehsildar office
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-green-500">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold flex-shrink-0">2</div>
                    <div>
                      <h3 className="font-bold text-slate-900 dark:text-white mb-2">Locate All Corner Stones</h3>
                      <p className="text-slate-600 dark:text-slate-400 mb-3">
                        Physically locate all boundary stones (khasra pillars) on the plot. Each corner should have a stone with survey number markings.
                      </p>
                      <div className="bg-green-50 dark:bg-green-900/30 p-3 rounded-lg text-sm">
                        <strong>Tip:</strong> Take photos of each corner stone with GPS coordinates
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-green-500">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold flex-shrink-0">3</div>
                    <div>
                      <h3 className="font-bold text-slate-900 dark:text-white mb-2">Measure Plot Dimensions</h3>
                      <p className="text-slate-600 dark:text-slate-400 mb-3">
                        Use a measuring tape to verify all four sides match the dimensions in documents. Note any discrepancies.
                      </p>
                      <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-lg text-sm">
                        <strong>Tools needed:</strong> 100-meter tape, GPS app for coordinates
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-green-500">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold flex-shrink-0">4</div>
                    <div>
                      <h3 className="font-bold text-slate-900 dark:text-white mb-2">Check for Encroachments</h3>
                      <p className="text-slate-600 dark:text-slate-400 mb-3">
                        Look for any structures, fences, or farming activities that cross into your plot's boundaries. Document with photos.
                      </p>
                      <div className="bg-amber-50 dark:bg-amber-900/30 p-3 rounded-lg text-sm">
                        <strong>Common issues:</strong> Neighbor's fence, drainage channels, temporary structures
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-green-500">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold flex-shrink-0">5</div>
                    <div>
                      <h3 className="font-bold text-slate-900 dark:text-white mb-2">Hire Licensed Surveyor (Recommended)</h3>
                      <p className="text-slate-600 dark:text-slate-400 mb-3">
                        For plots above 20 lakhs, hire a government-licensed surveyor to do professional demarcation and provide a report.
                      </p>
                      <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-lg text-sm">
                        <strong>Cost:</strong> Rs. 2,000-5,000 depending on plot size
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <AlertCircle className="text-red-500" /> Red Flags to Watch
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <XCircle className="text-red-500 flex-shrink-0 mt-0.5" />
                <span className="text-slate-700 dark:text-slate-300">Missing or damaged corner stones</span>
              </div>
              <div className="flex items-start gap-3 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <XCircle className="text-red-500 flex-shrink-0 mt-0.5" />
                <span className="text-slate-700 dark:text-slate-300">Actual dimensions differ from documents by &gt;2%</span>
              </div>
              <div className="flex items-start gap-3 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <XCircle className="text-red-500 flex-shrink-0 mt-0.5" />
                <span className="text-slate-700 dark:text-slate-300">Seller refuses site visit or keeps changing location</span>
              </div>
              <div className="flex items-start gap-3 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <XCircle className="text-red-500 flex-shrink-0 mt-0.5" />
                <span className="text-slate-700 dark:text-slate-300">Existing structures or crops on "vacant" plot</span>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <MapPin className="text-indigo-500" /> Where to Get Help in Nagpur
            </h2>
            <div className="space-y-4">
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-bold text-slate-900 dark:text-white">Government Land Survey Office</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">Collectorate Complex, Civil Lines, Nagpur</p>
                  <p className="text-slate-500 text-sm mt-1">For official survey maps and demarcation requests</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-bold text-slate-900 dark:text-white">Licensed Private Surveyors</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">Available near Sub-Registrar offices in all talukas</p>
                  <p className="text-slate-500 text-sm mt-1">Cost: Rs. 2,000-5,000 | Time: 1-2 days</p>
                </CardContent>
              </Card>
            </div>
          </section>

          <div className="flex flex-col md:flex-row gap-4 justify-between pt-8 border-t">
            <Link href="/guide/litigation-search">
              <Button variant="outline" className="w-full md:w-auto">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous: Litigation Search
              </Button>
            </Link>
            <Link href="/guide/possession-verification">
              <Button className="w-full md:w-auto bg-indigo-600 hover:bg-indigo-700">
                Next: Possession Verification
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>

        </div>
      </div>
    </PublicLayout>
  );
}
