import { Link } from "wouter";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { ScrollToTop } from "@/components/utils/ScrollToTop";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, ArrowRight, CheckCircle, XCircle, AlertCircle,
  MapPin, Clock, FileText, Building, Scale
} from "lucide-react";

export default function TPSchemeCheckGuide() {
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
          
          <Badge className="bg-amber-100 text-amber-700 mb-4">Check #12 - Physical</Badge>
          <h1 className="text-3xl md:text-4xl font-semibold text-primary dark:text-white mb-4">
            How to Check TP Scheme Restrictions on Your Plot
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl">
            Town Planning schemes can reserve your plot for roads, parks, or public use. Check before you lose 30-40% of your land.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="prose dark:prose-invert max-w-none">
          
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-primary dark:text-white mb-4">Why This Matters</h2>
            <p className="text-slate-600 dark:text-slate-400">
              Town Planning (TP) schemes in Nagpur regularly mark land for road widening, public amenities, or green zones. If your plot falls under TP reservation, part of it may be reserved, and building permission can be refused on the reserved portion. Ask the planning authority what applies to your plot, and show the answer to your legal expert.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-primary dark:text-white mb-6">Step-by-Step TP Check</h2>
            
            <div className="space-y-6">
              <Card className="border-l-4 border-l-amber-500">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 font-bold flex-shrink-0">1</div>
                    <div>
                      <h3 className="font-bold text-primary dark:text-white mb-2">Visit the Town Planning Office</h3>
                      <p className="text-slate-600 dark:text-slate-400 mb-3">
                        Go to NMC (Nagpur Municipal Corporation) Town Planning Department with your survey number and property details.
                      </p>
                      <div className="bg-amber-50 dark:bg-amber-900/30 p-3 rounded-lg text-sm">
                        <strong>Bring:</strong> Survey number, plot address, any existing property documents
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-amber-500">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 font-bold flex-shrink-0">2</div>
                    <div>
                      <h3 className="font-bold text-primary dark:text-white mb-2">Request the TP Scheme Map</h3>
                      <p className="text-slate-600 dark:text-slate-400 mb-3">
                        Ask for the approved TP scheme layout for your area. They will show you the map with your plot marked.
                      </p>
                      <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-lg text-sm">
                        <strong>Fee:</strong> Usually ₹100-500 for certified copy of TP map
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-amber-500">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 font-bold flex-shrink-0">3</div>
                    <div>
                      <h3 className="font-bold text-primary dark:text-white mb-2">Check for Reservations</h3>
                      <p className="text-slate-600 dark:text-slate-400 mb-3">
                        Look for color-coded markings on the map. Common reservations include:
                      </p>
                      <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
                        <li>• Yellow/Orange: Road widening</li>
                        <li>• Green: Garden/Park/Open space</li>
                        <li>• Blue: Water body/Drainage</li>
                        <li>• Pink: Educational/Public facility</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-amber-500">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 font-bold flex-shrink-0">4</div>
                    <div>
                      <h3 className="font-bold text-primary dark:text-white mb-2">Check Development Plan (DP)</h3>
                      <p className="text-slate-600 dark:text-slate-400 mb-3">
                        Besides TP scheme, also check the approved Development Plan for any future road proposals or zone changes.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-amber-500">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 font-bold flex-shrink-0">5</div>
                    <div>
                      <h3 className="font-bold text-primary dark:text-white mb-2">Get Written Confirmation</h3>
                      <p className="text-slate-600 dark:text-slate-400 mb-3">
                        Request a "No Objection" certificate or written confirmation that your plot has no TP reservations affecting construction.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-primary dark:text-white mb-6">Red Flags to Watch</h2>
            
            <div className="grid md:grid-cols-2 gap-4">
              <Card className="border-2 border-red-200 bg-red-50 dark:bg-red-900/20">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-red-700 dark:text-red-400">Road widening through plot</p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Proposed road cuts through your plot area</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-2 border-red-200 bg-red-50 dark:bg-red-900/20">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-red-700 dark:text-red-400">Reserved for public amenity</p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Plot marked for school, hospital, or garden</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-2 border-red-200 bg-red-50 dark:bg-red-900/20">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-red-700 dark:text-red-400">Green zone / No Development</p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Construction not allowed on reserved portion</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-2 border-red-200 bg-red-50 dark:bg-red-900/20">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-red-700 dark:text-red-400">Drainage/Nullah passing</p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Water channel or drainage marked through plot</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-primary dark:text-white mb-6">
              <MapPin className="w-6 h-6 inline mr-2 text-amber-600" />
              Where to Check in Nagpur
            </h2>
            
            <div className="space-y-4">
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-bold text-primary dark:text-white mb-2">NMC Town Planning Department</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm mb-2">NMC Main Building, Civil Lines, Nagpur</p>
                  <div className="flex items-center gap-4 text-sm text-slate-500">
                    <span><Clock className="w-4 h-4 inline mr-1" /> 10 AM - 5 PM</span>
                    <span><FileText className="w-4 h-4 inline mr-1" /> Fee: ₹100-500</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-bold text-primary dark:text-white mb-2">NMRDA (Nagpur Metropolitan Region Development Authority)</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm mb-2">Seminary Hills, Near RBI, Nagpur</p>
                  <div className="flex items-center gap-4 text-sm text-slate-500">
                    <span><Clock className="w-4 h-4 inline mr-1" /> 10:30 AM - 5:30 PM</span>
                    <span><Scale className="w-4 h-4 inline mr-1" /> For metro region plots</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-bold text-primary dark:text-white mb-2">Collector Office (District Planning)</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm mb-2">Civil Lines, Near High Court, Nagpur</p>
                  <div className="flex items-center gap-4 text-sm text-slate-500">
                    <span><Clock className="w-4 h-4 inline mr-1" /> 10 AM - 5 PM</span>
                    <span><Building className="w-4 h-4 inline mr-1" /> For rural area plots</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-primary dark:text-white mb-6">Understanding TP Impact</h2>
            
            <div className="bg-primary/5 dark:bg-blue-900/20 border border-primary/20 dark:border-blue-800 rounded-xl p-6">
              <h3 className="font-bold text-primary dark:text-white mb-4">If Part of Your Plot is Reserved:</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700 dark:text-slate-300">You may get TDR (Transferable Development Rights) as compensation</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700 dark:text-slate-300">Building permission will only be given for unreserved portion</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700 dark:text-slate-300">Negotiate price reduction based on reserved area percentage</span>
                </li>
                <li className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700 dark:text-slate-300">Some reservations can be challenged if not implemented for 10+ years</span>
                </li>
              </ul>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-primary dark:text-white mb-6">Common Mistakes to Avoid</h2>
            
            <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-6">
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700 dark:text-slate-300">Trusting seller's claim that "TP scheme was cancelled"</span>
                </li>
                <li className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700 dark:text-slate-300">Not checking for future proposed roads in Development Plan</span>
                </li>
                <li className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700 dark:text-slate-300">Assuming corner plots are safe - they're often hit by road widening</span>
                </li>
                <li className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700 dark:text-slate-300">Not getting written confirmation - verbal assurances mean nothing</span>
                </li>
              </ul>
            </div>
          </section>

        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-between mt-12 pt-8 border-t border-slate-200 dark:border-slate-700">
          <Link href="/step-3-safety-check">
            <Button size="lg" className="w-full sm:w-auto bg-primary hover:bg-primary/90" data-testid="button-back-mark">
              <CheckCircle className="w-4 h-4 mr-2" />
              Back to Checklist & Mark Complete
            </Button>
          </Link>
          
          <Link href="/guide/ownership-verification">
            <Button variant="outline" size="lg" className="w-full sm:w-auto" data-testid="button-next-guide">
              Start from Check #1
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-700">
          <h3 className="font-bold text-primary dark:text-white mb-4">Related Guides</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <Link href="/guide/boundary-verification">
              <Card className="hover-elevate cursor-pointer">
                <CardContent className="p-4">
                  <Badge variant="outline" className="mb-2 text-xs">Physical</Badge>
                  <p className="font-medium text-slate-900 dark:text-white">Boundary Verification</p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/guide/na-conversion">
              <Card className="hover-elevate cursor-pointer">
                <CardContent className="p-4">
                  <Badge variant="outline" className="mb-2 text-xs">Legal</Badge>
                  <p className="font-medium text-slate-900 dark:text-white">NA Conversion Check</p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/guide/possession-verification">
              <Card className="hover-elevate cursor-pointer">
                <CardContent className="p-4">
                  <Badge variant="outline" className="mb-2 text-xs">Physical</Badge>
                  <p className="font-medium text-slate-900 dark:text-white">Possession Verification</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
