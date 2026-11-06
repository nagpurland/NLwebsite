import { Link } from "wouter";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { ScrollToTop } from "@/components/utils/ScrollToTop";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, ArrowRight, CheckCircle, XCircle, AlertCircle,
  FileText, MapPin, Clock, Scale, Search
} from "lucide-react";

export default function TitleVerificationGuide() {
  return (
    <PublicLayout>
      <ScrollToTop />
      
      <div className="bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-950/30 dark:to-indigo-950/30 py-12">
        <div className="container mx-auto px-4">
          <Link href="/step-3-safety-check">
            <Button variant="ghost" size="sm" className="mb-6" data-testid="button-back-checklist">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to 12-Point Checklist
            </Button>
          </Link>
          
          <Badge className="bg-purple-100 text-purple-700 mb-4">Check #8 - Legal</Badge>
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-4">
            How to Verify Clear Property Title in Nagpur: Complete Guide
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl">
            A clear title means the property has no legal claims, disputes, or encumbrances. This is the foundation of safe property buying.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="prose dark:prose-invert max-w-none">
          
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">What is Title Search?</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              Title search is the process of examining public records to trace the ownership history of a property. It confirms the seller has the legal right to sell and that no one else has claims on the property.
            </p>
            <Card className="bg-purple-50 dark:bg-purple-900/20 border-purple-200">
              <CardContent className="p-4">
                <p className="text-sm text-slate-700 dark:text-slate-300">
                  <strong>Key insight:</strong> In Nagpur, many properties have complex ownership histories due to ancestral land, joint family holdings, and agricultural-to-residential conversions. A thorough title search protects you from hidden claims.
                </p>
              </CardContent>
            </Card>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Why Title Verification is Critical</h2>
            <ul className="space-y-3 text-slate-600 dark:text-slate-400">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span>Prevents buying property from someone who doesn't own it</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span>Reveals pending court cases or legal disputes</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span>Uncovers hidden mortgages, liens, or encumbrances</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span>Confirms property boundaries match official records</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span>Required by banks for home loan approval</span>
              </li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Where to Check in Nagpur</h2>
            
            <div className="grid gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white">Sub-Registrar Office</h4>
                      <p className="text-slate-600 dark:text-slate-400 text-sm">For sale deed copies and registration records</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white">Talathi Office</h4>
                      <p className="text-slate-600 dark:text-slate-400 text-sm">For 7/12 extracts and village land records</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white">City Survey Office</h4>
                      <p className="text-slate-600 dark:text-slate-400 text-sm">For urban property cards and survey records</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white">Online Portal</h4>
                      <p className="text-slate-600 dark:text-slate-400 text-sm">mahabhulekh.maharashtra.gov.in for digital records</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Documents to Request</h2>
            
            <div className="space-y-4">
              <Card className="border-l-4 border-l-purple-500">
                <CardContent className="p-6">
                  <h4 className="font-bold text-slate-900 dark:text-white mb-2">7/12 Extract (Satbara)</h4>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">Shows current owner, land type, area, and rights. Essential for rural and semi-urban land.</p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-purple-500">
                <CardContent className="p-6">
                  <h4 className="font-bold text-slate-900 dark:text-white mb-2">Property Card (Maalki Patrak)</h4>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">Official ownership record for urban properties within municipal limits.</p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-purple-500">
                <CardContent className="p-6">
                  <h4 className="font-bold text-slate-900 dark:text-white mb-2">Encumbrance Certificate (30 years)</h4>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">Shows all monetary transactions - loans, mortgages, court attachments - for the past 30 years.</p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-purple-500">
                <CardContent className="p-6">
                  <h4 className="font-bold text-slate-900 dark:text-white mb-2">Chain of Sale Deeds</h4>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">Complete sequence of registered sale deeds showing ownership transfer from original owner to seller.</p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-purple-500">
                <CardContent className="p-6">
                  <h4 className="font-bold text-slate-900 dark:text-white mb-2">Mutation Entries (Ferfar)</h4>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">Government record of each ownership change reflecting in revenue records.</p>
                </CardContent>
              </Card>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Step-by-Step Title Verification</h2>
            
            <div className="space-y-4">
              <Card className="border-l-4 border-l-indigo-500">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold flex-shrink-0">1</div>
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white mb-2">Obtain 7/12 Extract Online</h4>
                      <p className="text-slate-600 dark:text-slate-400">
                        Visit mahabhulekh.maharashtra.gov.in → Select Nagpur → Enter survey number → Download 7/12
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-indigo-500">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold flex-shrink-0">2</div>
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white mb-2">Get Encumbrance Certificate</h4>
                      <p className="text-slate-600 dark:text-slate-400">
                        Apply at Sub-Registrar office for 30-year EC. Check for mortgages, liens, or court orders.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-indigo-500">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold flex-shrink-0">3</div>
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white mb-2">Trace Ownership Chain</h4>
                      <p className="text-slate-600 dark:text-slate-400">
                        Collect copies of all sale deeds from original allotment/purchase to current seller. No gaps allowed.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-indigo-500">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold flex-shrink-0">4</div>
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white mb-2">Check Court Records</h4>
                      <p className="text-slate-600 dark:text-slate-400">
                        Search for pending litigation involving the property or seller at District Court, Nagpur.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-indigo-500">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold flex-shrink-0">5</div>
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white mb-2">Verify Physical Boundaries</h4>
                      <p className="text-slate-600 dark:text-slate-400">
                        Match survey map boundaries with actual land. Check for encroachments or boundary disputes.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Red Flags to Watch</h2>
            
            <div className="grid md:grid-cols-2 gap-4">
              <Card className="border-2 border-red-200 bg-red-50 dark:bg-red-900/20">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-red-800 dark:text-red-200">Gaps in Ownership Chain</p>
                      <p className="text-sm text-red-700 dark:text-red-300">Missing sale deeds or unexplained ownership jumps</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-2 border-red-200 bg-red-50 dark:bg-red-900/20">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-red-800 dark:text-red-200">Pending Litigation</p>
                      <p className="text-sm text-red-700 dark:text-red-300">Active court cases involving the property</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-red-200 bg-red-50 dark:bg-red-900/20">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-red-800 dark:text-red-200">Multiple Claimants</p>
                      <p className="text-sm text-red-700 dark:text-red-300">Other family members or parties claiming ownership</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-red-200 bg-red-50 dark:bg-red-900/20">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-red-800 dark:text-red-200">Unregistered Agreements</p>
                      <p className="text-sm text-red-700 dark:text-red-300">Sale agreements not registered as sale deeds</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">When to Hire Professional Help</h2>
            
            <Card className="bg-amber-50 dark:bg-amber-900/20 border-amber-200">
              <CardContent className="p-6">
                <p className="font-medium text-amber-800 dark:text-amber-200 mb-4">Consider hiring a property lawyer or title search company if:</p>
                <ul className="space-y-2 text-amber-700 dark:text-amber-300 text-sm">
                  <li>• Property has complex ownership history (ancestral, joint family)</li>
                  <li>• Agricultural land being converted to non-agricultural use</li>
                  <li>• Property value exceeds Rs. 50 lakhs</li>
                  <li>• You're not comfortable reading legal documents in Marathi</li>
                  <li>• Seller is reluctant to provide documents</li>
                </ul>
                <p className="text-sm text-amber-600 dark:text-amber-400 mt-4">
                  Professional title search in Nagpur typically costs Rs. 5,000 - Rs. 15,000 and takes 2-4 weeks.
                </p>
              </CardContent>
            </Card>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">7-Point Title Clearance Checklist</h2>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-slate-700 dark:text-slate-300">Seller's name matches 7/12 and Property Card</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-slate-700 dark:text-slate-300">Complete chain of sale deeds available (no gaps)</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-slate-700 dark:text-slate-300">30-year Encumbrance Certificate is NIL (no loans)</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-slate-700 dark:text-slate-300">No pending court cases on property</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-slate-700 dark:text-slate-300">All mutations completed and reflected in records</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-slate-700 dark:text-slate-300">Physical boundaries match survey records</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-slate-700 dark:text-slate-300">No government acquisition notices on property</span>
              </div>
            </div>
          </section>

          <div className="text-center text-sm text-slate-500 mb-8">
            Last Updated: January 2026
          </div>

          <Card className="bg-green-50 dark:bg-green-900/20 border-green-200">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                  <div>
                    <p className="font-bold text-green-800 dark:text-green-200">Completed this check?</p>
                    <p className="text-sm text-green-700 dark:text-green-300">Mark it complete on your safety checklist</p>
                  </div>
                </div>
                <Link href="/step-3-safety-check">
                  <Button className="bg-green-600 hover:bg-green-700" data-testid="button-mark-complete">
                    Mark Complete <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PublicLayout>
  );
}
