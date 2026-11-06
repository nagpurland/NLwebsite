import { Link } from "wouter";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { ScrollToTop } from "@/components/utils/ScrollToTop";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, ArrowRight, CheckCircle, XCircle, AlertCircle,
  MapPin, Home, Users, Eye
} from "lucide-react";

export default function PossessionVerificationGuide() {
  return (
    <PublicLayout>
      <ScrollToTop />
      
      <div className="bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950/30 dark:to-amber-950/30 py-12">
        <div className="container mx-auto px-4">
          <Link href="/step-3-safety-check">
            <Button variant="ghost" size="sm" className="mb-6" data-testid="button-back-checklist">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to 12-Point Checklist
            </Button>
          </Link>
          
          <Badge className="bg-orange-100 text-orange-700 mb-4">Check #10 - Physical</Badge>
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-4">
            How to Verify Current Possession Status
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl">
            Confirm who currently occupies or uses the land. Possession disputes can delay your ownership for years.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="prose dark:prose-invert max-w-none">
          
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Why This Matters</h2>
            <p className="text-slate-600 dark:text-slate-400">
              In India, "possession is nine-tenths of the law." Someone physically occupying land for years can claim adverse possession rights. In Nagpur's peri-urban areas, agricultural tenants, caretakers, or encroachers may occupy land the owner is trying to sell. Verify possession before buying.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Step-by-Step Verification</h2>
            
            <div className="space-y-6">
              <Card className="border-l-4 border-l-orange-500">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-700 font-bold flex-shrink-0">1</div>
                    <div>
                      <h3 className="font-bold text-slate-900 dark:text-white mb-2">Visit the Plot Unannounced</h3>
                      <p className="text-slate-600 dark:text-slate-400 mb-3">
                        Make at least 2-3 surprise visits at different times (morning, evening, weekend). Observe who is using the land.
                      </p>
                      <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-lg text-sm">
                        <strong>Look for:</strong> Farming activity, temporary structures, stored materials, parked vehicles
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-orange-500">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-700 font-bold flex-shrink-0">2</div>
                    <div>
                      <h3 className="font-bold text-slate-900 dark:text-white mb-2">Ask Neighbors About Land Use</h3>
                      <p className="text-slate-600 dark:text-slate-400 mb-3">
                        Talk to at least 3 neighboring plot owners. Ask who has been using the land and for how long.
                      </p>
                      <div className="bg-orange-50 dark:bg-orange-900/30 p-3 rounded-lg text-sm">
                        <strong>Key questions:</strong> "Who farms this land?" "Have you seen the owner recently?" "Any disputes?"
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-orange-500">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-700 font-bold flex-shrink-0">3</div>
                    <div>
                      <h3 className="font-bold text-slate-900 dark:text-white mb-2">Check for Tenant Agreements</h3>
                      <p className="text-slate-600 dark:text-slate-400 mb-3">
                        Ask the seller if any tenant, caretaker, or farmer has a written or verbal agreement to use the land. Get written confirmation of termination.
                      </p>
                      <div className="bg-amber-50 dark:bg-amber-900/30 p-3 rounded-lg text-sm">
                        <strong>Important:</strong> Agricultural tenants have legal protections - eviction can take years
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-orange-500">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-700 font-bold flex-shrink-0">4</div>
                    <div>
                      <h3 className="font-bold text-slate-900 dark:text-white mb-2">Verify Seller Has Physical Access</h3>
                      <p className="text-slate-600 dark:text-slate-400 mb-3">
                        Ask the seller to take you to the plot. If they can't freely access it or need "permission" from someone, that's a red flag.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-orange-500">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-700 font-bold flex-shrink-0">5</div>
                    <div>
                      <h3 className="font-bold text-slate-900 dark:text-white mb-2">Get Possession Certificate</h3>
                      <p className="text-slate-600 dark:text-slate-400 mb-3">
                        For plots in layouts, ask for Possession Certificate from the developer. For agricultural land, get a letter from the Talathi confirming possession status.
                      </p>
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
                <span className="text-slate-700 dark:text-slate-300">Someone else is actively farming the land</span>
              </div>
              <div className="flex items-start gap-3 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <XCircle className="text-red-500 flex-shrink-0 mt-0.5" />
                <span className="text-slate-700 dark:text-slate-300">Seller hasn't visited the plot in years</span>
              </div>
              <div className="flex items-start gap-3 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <XCircle className="text-red-500 flex-shrink-0 mt-0.5" />
                <span className="text-slate-700 dark:text-slate-300">Locked gates or barriers you can't access</span>
              </div>
              <div className="flex items-start gap-3 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <XCircle className="text-red-500 flex-shrink-0 mt-0.5" />
                <span className="text-slate-700 dark:text-slate-300">Neighbors say "different person" manages this land</span>
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
                  <h3 className="font-bold text-slate-900 dark:text-white">Talathi Office (Village Level)</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">Each village has a Talathi who maintains possession records</p>
                  <p className="text-slate-500 text-sm mt-1">For rural/agricultural land possession verification</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-bold text-slate-900 dark:text-white">NMC Ward Office (Urban)</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">Nagpur Municipal Corporation ward offices</p>
                  <p className="text-slate-500 text-sm mt-1">For urban plots - property tax records show occupancy</p>
                </CardContent>
              </Card>
            </div>
          </section>

          <div className="flex flex-col md:flex-row gap-4 justify-between pt-8 border-t">
            <Link href="/guide/boundary-verification">
              <Button variant="outline" className="w-full md:w-auto">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous: Boundary Verification
              </Button>
            </Link>
            <Link href="/guide/neighbor-verification">
              <Button className="w-full md:w-auto bg-indigo-600 hover:bg-indigo-700">
                Next: Neighbor Verification
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>

        </div>
      </div>
    </PublicLayout>
  );
}
