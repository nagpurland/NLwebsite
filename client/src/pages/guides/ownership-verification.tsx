import { Link } from "wouter";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { ScrollToTop } from "@/components/utils/ScrollToTop";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, ArrowRight, CheckCircle, XCircle, AlertCircle,
  FileText, MapPin, Clock, Building
} from "lucide-react";

export default function OwnershipVerificationGuide() {
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
          
          <Badge className="bg-blue-100 text-blue-700 mb-4">Check #1 - Documents</Badge>
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-4">
            How to Verify Ownership Name Matches Seller
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl">
            The most critical document check. If the seller isn't the legal owner, you're buying from the wrong person.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="prose dark:prose-invert max-w-none">
          
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Why This Matters</h2>
            <p className="text-slate-600 dark:text-slate-400">
              Every year, dozens of property fraud cases in Nagpur involve sellers who don't actually own the land they're selling. They might be relatives, former owners, or complete fraudsters. This single check can save you from losing your entire investment.
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
                      <h3 className="font-bold text-slate-900 dark:text-white mb-2">Get the Property Card (Maalki Patrak)</h3>
                      <p className="text-slate-600 dark:text-slate-400 mb-3">
                        Visit the Talathi office for rural land or City Survey Office for urban land. Request the Property Card for the specific survey number.
                      </p>
                      <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-lg text-sm">
                        <strong>Documents needed:</strong> Survey number, village/ward name, property address
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
                      <h3 className="font-bold text-slate-900 dark:text-white mb-2">Get the 7/12 Extract (Satbara)</h3>
                      <p className="text-slate-600 dark:text-slate-400 mb-3">
                        The 7/12 shows the current legal owner's name. This is available online at Maharashtra Bhumi Abhilekh portal or at Talathi office.
                      </p>
                      <div className="bg-blue-50 dark:bg-blue-900/30 p-3 rounded-lg text-sm">
                        <strong>Online:</strong> mahabhulekh.maharashtra.gov.in → Select Nagpur District → Enter Survey Number
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
                      <h3 className="font-bold text-slate-900 dark:text-white mb-2">Compare Names Exactly</h3>
                      <p className="text-slate-600 dark:text-slate-400 mb-3">
                        The name on the Property Card / 7/12 must match the seller's Aadhaar card and PAN card exactly. Watch for spelling variations.
                      </p>
                      <div className="bg-amber-50 dark:bg-amber-900/30 p-3 rounded-lg text-sm">
                        <strong>Watch out:</strong> "Ramesh Kumar" vs "R. Kumar" vs "Ramesh K." - even minor differences need clarification
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
                      <h3 className="font-bold text-slate-900 dark:text-white mb-2">Check for Joint Owners</h3>
                      <p className="text-slate-600 dark:text-slate-400 mb-3">
                        If the property has multiple owners, ALL owners must sign the sale deed. One owner cannot sell without others' consent.
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
                      <p className="font-medium text-red-700 dark:text-red-400">Name doesn't match</p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Seller's name is different from property records</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-2 border-red-200 bg-red-50 dark:bg-red-900/20">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-red-700 dark:text-red-400">Seller claims POA</p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Power of Attorney seller but POA isn't registered</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-2 border-red-200 bg-red-50 dark:bg-red-900/20">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-red-700 dark:text-red-400">Owner is deceased</p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Seller claims inheritance but no succession certificate</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-2 border-red-200 bg-red-50 dark:bg-red-900/20">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-red-700 dark:text-red-400">Missing co-owners</p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Property has 3 owners but only 1 is signing</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
              <MapPin className="w-6 h-6 inline mr-2 text-blue-600" />
              Where to Get Documents in Nagpur
            </h2>
            
            <div className="space-y-4">
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-bold text-slate-900 dark:text-white mb-2">City Survey Office (Urban Land)</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm mb-2">Civil Lines, Near Commissioner Office, Nagpur</p>
                  <div className="flex items-center gap-4 text-sm text-slate-500">
                    <span><Clock className="w-4 h-4 inline mr-1" /> 10 AM - 5 PM</span>
                    <span><FileText className="w-4 h-4 inline mr-1" /> Fee: ₹50-100</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-bold text-slate-900 dark:text-white mb-2">Talathi Office (Rural Land)</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm mb-2">Located in each taluka - varies by location</p>
                  <div className="flex items-center gap-4 text-sm text-slate-500">
                    <span><Clock className="w-4 h-4 inline mr-1" /> 10 AM - 5 PM</span>
                    <span><FileText className="w-4 h-4 inline mr-1" /> Fee: ₹30-50</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-bold text-slate-900 dark:text-white mb-2">Online (7/12 Extract)</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm mb-2">mahabhulekh.maharashtra.gov.in</p>
                  <div className="flex items-center gap-4 text-sm text-slate-500">
                    <span><Clock className="w-4 h-4 inline mr-1" /> 24/7 Available</span>
                    <span><FileText className="w-4 h-4 inline mr-1" /> Free</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Common Mistakes to Avoid</h2>
            
            <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-6">
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700 dark:text-slate-300">Trusting photocopies instead of getting fresh documents from office</span>
                </li>
                <li className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700 dark:text-slate-300">Not verifying seller's photo ID matches the person you're dealing with</span>
                </li>
                <li className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700 dark:text-slate-300">Accepting verbal claims about inheritance without legal proof</span>
                </li>
                <li className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700 dark:text-slate-300">Ignoring minor spelling differences between documents</span>
                </li>
              </ul>
            </div>
          </section>

        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-between mt-12 pt-8 border-t border-slate-200 dark:border-slate-700">
          <Link href="/step-3-safety-check">
            <Button size="lg" className="w-full sm:w-auto bg-green-600 hover:bg-green-700" data-testid="button-back-mark">
              <CheckCircle className="w-4 h-4 mr-2" />
              Back to Checklist & Mark Complete
            </Button>
          </Link>
          
          <Link href="/guide/mutations-transfers">
            <Button variant="outline" size="lg" className="w-full sm:w-auto" data-testid="button-next-guide">
              Next: Check Mutations
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-700">
          <h3 className="font-bold text-slate-900 dark:text-white mb-4">Related Guides</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <Link href="/guide/chain-of-title">
              <Card className="hover-elevate cursor-pointer">
                <CardContent className="p-4">
                  <Badge variant="outline" className="mb-2 text-xs">Legal</Badge>
                  <p className="font-medium text-slate-900 dark:text-white">Chain of Title Verification</p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/guide/identity-verification">
              <Card className="hover-elevate cursor-pointer">
                <CardContent className="p-4">
                  <Badge variant="outline" className="mb-2 text-xs">Documents</Badge>
                  <p className="font-medium text-slate-900 dark:text-white">Seller Identity Check</p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/guide/encumbrance-check">
              <Card className="hover-elevate cursor-pointer">
                <CardContent className="p-4">
                  <Badge variant="outline" className="mb-2 text-xs">Legal</Badge>
                  <p className="font-medium text-slate-900 dark:text-white">Encumbrance Certificate</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
