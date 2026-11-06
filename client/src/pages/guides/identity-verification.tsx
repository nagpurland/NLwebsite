import { Link } from "wouter";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { ScrollToTop } from "@/components/utils/ScrollToTop";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, ArrowRight, CheckCircle, XCircle, AlertCircle,
  FileText, MapPin, Clock, UserCheck, Shield
} from "lucide-react";

export default function IdentityVerificationGuide() {
  return (
    <PublicLayout>
      <ScrollToTop />
      
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 py-12">
        <div className="container mx-auto px-4">
          <Link href="/step-3-safety-check">
            <Button variant="ghost" size="sm" className="mb-6" data-testid="button-back-checklist">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to 12-Point Checklist
            </Button>
          </Link>
          
          <Badge className="bg-blue-100 text-blue-700 mb-4">Check #4 - Documents</Badge>
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-4">
            How to Verify Seller Identity Matches Documents
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl">
            Confirm the person selling the property is who they claim to be. Identity fraud is a common issue in land transactions.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="prose dark:prose-invert max-w-none">
          
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Why This Matters</h2>
            <p className="text-slate-600 dark:text-slate-400">
              In Nagpur, identity fraud cases involve imposters posing as property owners. They use fake IDs, forged documents, or impersonate deceased owners. Verifying identity before any payment protects you from losing your entire investment to fraudsters.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Step-by-Step Verification</h2>
            
            <div className="space-y-6">
              <Card className="border-l-4 border-l-blue-500">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold flex-shrink-0">1</div>
                    <div>
                      <h3 className="font-bold text-slate-900 dark:text-white mb-2">Request Seller's Aadhaar Card</h3>
                      <p className="text-slate-600 dark:text-slate-400 mb-3">
                        Ask for a physical copy of the seller's Aadhaar card. Verify the photograph matches the person you're dealing with.
                      </p>
                      <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-lg text-sm">
                        <strong>Verify online:</strong> Use mAadhaar app or uidai.gov.in to check Aadhaar validity
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-blue-500">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold flex-shrink-0">2</div>
                    <div>
                      <h3 className="font-bold text-slate-900 dark:text-white mb-2">Request Seller's PAN Card</h3>
                      <p className="text-slate-600 dark:text-slate-400 mb-3">
                        PAN card is mandatory for property transactions above Rs. 10 lakh. Compare the name with Aadhaar and property documents.
                      </p>
                      <div className="bg-blue-50 dark:bg-blue-900/30 p-3 rounded-lg text-sm">
                        <strong>Verify PAN:</strong> incometaxindiaefiling.gov.in → "Verify Your PAN"
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-blue-500">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold flex-shrink-0">3</div>
                    <div>
                      <h3 className="font-bold text-slate-900 dark:text-white mb-2">Compare Names Across All Documents</h3>
                      <p className="text-slate-600 dark:text-slate-400 mb-3">
                        The name on Aadhaar, PAN, and property documents (7/12, Sale Deed) must match exactly. Minor spelling differences need legal clarification.
                      </p>
                      <div className="bg-amber-50 dark:bg-amber-900/30 p-3 rounded-lg text-sm">
                        <strong>Common issue:</strong> "Ramesh Kumar Sharma" vs "R.K. Sharma" - get an affidavit for name variations
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-blue-500">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold flex-shrink-0">4</div>
                    <div>
                      <h3 className="font-bold text-slate-900 dark:text-white mb-2">Check for Power of Attorney</h3>
                      <p className="text-slate-600 dark:text-slate-400 mb-3">
                        If someone else is signing on behalf of the owner, they must have a registered Power of Attorney (POA). Verify the POA is valid and not revoked.
                      </p>
                      <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-lg text-sm">
                        <strong>POA verification:</strong> Check at Sub-Registrar office where POA was registered
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-blue-500">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold flex-shrink-0">5</div>
                    <div>
                      <h3 className="font-bold text-slate-900 dark:text-white mb-2">Physical Photo Verification</h3>
                      <p className="text-slate-600 dark:text-slate-400 mb-3">
                        Meet the seller in person. Compare their face with photos on Aadhaar and PAN. Don't transact with someone who refuses to meet.
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
                <span className="text-slate-700 dark:text-slate-300">Seller refuses to provide original ID documents</span>
              </div>
              <div className="flex items-start gap-3 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <XCircle className="text-red-500 flex-shrink-0 mt-0.5" />
                <span className="text-slate-700 dark:text-slate-300">Name spellings differ significantly across documents</span>
              </div>
              <div className="flex items-start gap-3 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <XCircle className="text-red-500 flex-shrink-0 mt-0.5" />
                <span className="text-slate-700 dark:text-slate-300">Seller avoids meeting in person or at property site</span>
              </div>
              <div className="flex items-start gap-3 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <XCircle className="text-red-500 flex-shrink-0 mt-0.5" />
                <span className="text-slate-700 dark:text-slate-300">POA is old, unregistered, or from a different state</span>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <MapPin className="text-indigo-500" /> Where to Verify in Nagpur
            </h2>
            <div className="space-y-4">
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-bold text-slate-900 dark:text-white">Aadhaar Seva Kendra - Nagpur</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">Civil Lines, Near RBI Square, Nagpur</p>
                  <p className="text-slate-500 text-sm mt-1">Mon-Sat: 9:30 AM - 5:30 PM</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-bold text-slate-900 dark:text-white">Sub-Registrar Office (POA Verification)</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">Multiple locations: Sadar, Sitabuldi, Hingna, Kamptee</p>
                  <p className="text-slate-500 text-sm mt-1">Mon-Sat: 10:00 AM - 5:00 PM</p>
                </CardContent>
              </Card>
            </div>
          </section>

          <div className="flex flex-col md:flex-row gap-4 justify-between pt-8 border-t">
            <Link href="/guide/property-tax">
              <Button variant="outline" className="w-full md:w-auto">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous: Property Tax Verification
              </Button>
            </Link>
            <Link href="/guide/na-conversion">
              <Button className="w-full md:w-auto bg-indigo-600 hover:bg-indigo-700">
                Next: NA Conversion Check
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>

        </div>
      </div>
    </PublicLayout>
  );
}
