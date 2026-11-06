import { Link } from "wouter";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { ScrollToTop } from "@/components/utils/ScrollToTop";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, ArrowRight, CheckCircle, XCircle, AlertCircle,
  Landmark, MapPin, Clock, FileText, Search
} from "lucide-react";

export default function LitigationSearchGuide() {
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
            How to Search for Active Litigation on Property
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl">
            Court cases can tie up property for years. A litigation check prevents you from buying into someone else's legal battle.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="prose dark:prose-invert max-w-none">
          
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Why This Matters</h2>
            <p className="text-slate-600 dark:text-slate-400">
              If a property is under litigation, the court may issue a stay order preventing any sale. Even if the sale goes through, you could lose the property when the case concludes. In Nagpur, boundary disputes and inheritance cases are common and can take 5-15 years to resolve.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Step-by-Step Court Search</h2>
            
            <div className="space-y-6">
              <Card className="border-l-4 border-l-purple-500">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 font-bold flex-shrink-0">1</div>
                    <div>
                      <h3 className="font-bold text-slate-900 dark:text-white mb-2">Search District Court Records</h3>
                      <p className="text-slate-600 dark:text-slate-400 mb-3">
                        Visit the Nagpur District Court or use ecourts.gov.in to search by survey number or owner name.
                      </p>
                      <div className="bg-purple-50 dark:bg-purple-900/30 p-3 rounded-lg text-sm">
                        <strong>Online:</strong> ecourts.gov.in → Case Status → Search by Party Name → Enter seller's full name
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-purple-500">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 font-bold flex-shrink-0">2</div>
                    <div>
                      <h3 className="font-bold text-slate-900 dark:text-white mb-2">Check Revenue Court (Tahsildar)</h3>
                      <p className="text-slate-600 dark:text-slate-400 mb-3">
                        Revenue disputes are heard at Tahsildar level. These include boundary disputes, encroachment cases, and mutation objections.
                      </p>
                      <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-lg text-sm">
                        <strong>Visit:</strong> Tahsildar Office for your taluka → Request case search by survey number
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-purple-500">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 font-bold flex-shrink-0">3</div>
                    <div>
                      <h3 className="font-bold text-slate-900 dark:text-white mb-2">Search High Court Database</h3>
                      <p className="text-slate-600 dark:text-slate-400 mb-3">
                        Appeals from district courts go to Bombay High Court (Nagpur Bench). Important for older, ongoing disputes.
                      </p>
                      <div className="bg-purple-50 dark:bg-purple-900/30 p-3 rounded-lg text-sm">
                        <strong>Online:</strong> bombayhighcourt.nic.in → Case Status → Search by Party Name
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-purple-500">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 font-bold flex-shrink-0">4</div>
                    <div>
                      <h3 className="font-bold text-slate-900 dark:text-white mb-2">Check for Injunctions/Stay Orders</h3>
                      <p className="text-slate-600 dark:text-slate-400 mb-3">
                        Even if a case exists, ask specifically if there's an injunction preventing sale. A case without injunction may still allow sale.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-purple-500">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 font-bold flex-shrink-0">5</div>
                    <div>
                      <h3 className="font-bold text-slate-900 dark:text-white mb-2">Get a Legal Opinion</h3>
                      <p className="text-slate-600 dark:text-slate-400 mb-3">
                        If you find any case, consult a property lawyer to understand the impact before proceeding.
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
                      <p className="font-medium text-red-700 dark:text-red-400">Active partition suit</p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Family members fighting over division of property</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-2 border-red-200 bg-red-50 dark:bg-red-900/20">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-red-700 dark:text-red-400">Stay order / Injunction</p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Court has ordered no transaction until case is resolved</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-2 border-red-200 bg-red-50 dark:bg-red-900/20">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-red-700 dark:text-red-400">Specific Performance suit</p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Someone else claims they have rights to buy this property</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-2 border-red-200 bg-red-50 dark:bg-red-900/20">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-red-700 dark:text-red-400">Title dispute case</p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Someone claims ownership of the same property</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
              <MapPin className="w-6 h-6 inline mr-2 text-purple-600" />
              Court Locations in Nagpur
            </h2>
            
            <div className="space-y-4">
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-bold text-slate-900 dark:text-white mb-2">Nagpur District Court</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm mb-2">Civil Lines, Near Zero Mile, Nagpur</p>
                  <div className="flex items-center gap-4 text-sm text-slate-500">
                    <span><Clock className="w-4 h-4 inline mr-1" /> 10:30 AM - 5:30 PM</span>
                    <span><Search className="w-4 h-4 inline mr-1" /> Search fee: ₹50</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-bold text-slate-900 dark:text-white mb-2">Bombay High Court - Nagpur Bench</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm mb-2">Civil Lines, Nagpur - 440001</p>
                  <div className="flex items-center gap-4 text-sm text-slate-500">
                    <span><Clock className="w-4 h-4 inline mr-1" /> 10:30 AM - 5:00 PM</span>
                    <span><FileText className="w-4 h-4 inline mr-1" /> Appeals & major cases</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-bold text-slate-900 dark:text-white mb-2">Online Search</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm mb-2">ecourts.gov.in | bombayhighcourt.nic.in</p>
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
                  <span className="text-slate-700 dark:text-slate-300">Only checking district court and missing revenue court disputes</span>
                </li>
                <li className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700 dark:text-slate-300">Searching only current owner's name, not previous owners</span>
                </li>
                <li className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700 dark:text-slate-300">Trusting seller's verbal assurance that "there are no cases"</span>
                </li>
                <li className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700 dark:text-slate-300">Not understanding the difference between case pending vs. case with injunction</span>
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
          
          <Link href="/guide/boundary-verification">
            <Button variant="outline" size="lg" className="w-full sm:w-auto" data-testid="button-next-guide">
              Next: Boundary Verification
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-700">
          <h3 className="font-bold text-slate-900 dark:text-white mb-4">Related Guides</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <Link href="/guide/encumbrance-check">
              <Card className="hover-elevate cursor-pointer">
                <CardContent className="p-4">
                  <Badge variant="outline" className="mb-2 text-xs">Legal</Badge>
                  <p className="font-medium text-slate-900 dark:text-white">Encumbrance Certificate</p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/guide/chain-of-title">
              <Card className="hover-elevate cursor-pointer">
                <CardContent className="p-4">
                  <Badge variant="outline" className="mb-2 text-xs">Legal</Badge>
                  <p className="font-medium text-slate-900 dark:text-white">Chain of Title</p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/guide/tp-scheme-check">
              <Card className="hover-elevate cursor-pointer">
                <CardContent className="p-4">
                  <Badge variant="outline" className="mb-2 text-xs">Physical</Badge>
                  <p className="font-medium text-slate-900 dark:text-white">TP Scheme Check</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
