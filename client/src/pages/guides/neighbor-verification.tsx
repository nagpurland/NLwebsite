import { Link } from "wouter";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { ScrollToTop } from "@/components/utils/ScrollToTop";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, ArrowRight, CheckCircle, XCircle, AlertCircle,
  MapPin, Users, MessageCircle, Home
} from "lucide-react";

export default function NeighborVerificationGuide() {
  return (
    <PublicLayout>
      <ScrollToTop />
      
      <div className="bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-950/30 dark:to-blue-950/30 py-12">
        <div className="container mx-auto px-4">
          <Link href="/step-3-safety-check">
            <Button variant="ghost" size="sm" className="mb-6" data-testid="button-back-checklist">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to 12-Point Checklist
            </Button>
          </Link>
          
          <Badge className="bg-cyan-100 text-cyan-700 mb-4">Check #11 - Physical</Badge>
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-4">
            How to Verify with Neighbors and Local Community
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl">
            Local knowledge is invaluable. Neighbors know the history, disputes, and problems that documents don't reveal.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="prose dark:prose-invert max-w-none">
          
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Why This Matters</h2>
            <p className="text-slate-600 dark:text-slate-400">
              Documents can be forged, but neighborhood memory cannot. Long-time residents know about past disputes, flooding issues, access road problems, and the real history of ownership. In Nagpur's fast-developing areas like MIHAN, Besa, and Wardha Road, this local intelligence is crucial.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Step-by-Step Verification</h2>
            
            <div className="space-y-6">
              <Card className="border-l-4 border-l-cyan-500">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-cyan-100 flex items-center justify-center text-cyan-700 font-bold flex-shrink-0">1</div>
                    <div>
                      <h3 className="font-bold text-slate-900 dark:text-white mb-2">Talk to Immediate Neighbors</h3>
                      <p className="text-slate-600 dark:text-slate-400 mb-3">
                        Visit plots on all four sides. Introduce yourself as a potential buyer and ask about the land you're considering.
                      </p>
                      <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-lg text-sm">
                        <strong>Key question:</strong> "Do you know who owns this plot? Have there been any disputes?"
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-cyan-500">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-cyan-100 flex items-center justify-center text-cyan-700 font-bold flex-shrink-0">2</div>
                    <div>
                      <h3 className="font-bold text-slate-900 dark:text-white mb-2">Visit Local Tea Stalls / Shops</h3>
                      <p className="text-slate-600 dark:text-slate-400 mb-3">
                        Local shopkeepers are excellent sources of information. They know everyone and remember events going back years.
                      </p>
                      <div className="bg-cyan-50 dark:bg-cyan-900/30 p-3 rounded-lg text-sm">
                        <strong>Ask about:</strong> Past owners, any construction attempts, police visits, family disputes
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-cyan-500">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-cyan-100 flex items-center justify-center text-cyan-700 font-bold flex-shrink-0">3</div>
                    <div>
                      <h3 className="font-bold text-slate-900 dark:text-white mb-2">Check for Boundary Disputes</h3>
                      <p className="text-slate-600 dark:text-slate-400 mb-3">
                        Ask neighbors specifically about boundary issues. Even informal disputes can become legal nightmares later.
                      </p>
                      <div className="bg-amber-50 dark:bg-amber-900/30 p-3 rounded-lg text-sm">
                        <strong>Watch for:</strong> "That fence has been argued about for years" or "Previous owner moved the stones"
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-cyan-500">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-cyan-100 flex items-center justify-center text-cyan-700 font-bold flex-shrink-0">4</div>
                    <div>
                      <h3 className="font-bold text-slate-900 dark:text-white mb-2">Ask About Infrastructure Issues</h3>
                      <p className="text-slate-600 dark:text-slate-400 mb-3">
                        Neighbors know about seasonal flooding, water table problems, road access issues, and utility connections.
                      </p>
                      <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-lg text-sm">
                        <strong>Questions:</strong> "Does this area flood in monsoon?" "Is there water shortage?" "Road quality?"
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-cyan-500">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-cyan-100 flex items-center justify-center text-cyan-700 font-bold flex-shrink-0">5</div>
                    <div>
                      <h3 className="font-bold text-slate-900 dark:text-white mb-2">Visit the Gram Panchayat (Rural) or Ward Office (Urban)</h3>
                      <p className="text-slate-600 dark:text-slate-400 mb-3">
                        Local officials often know about land disputes, development plans, and property histories in their jurisdiction.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Questions to Ask Neighbors</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3 p-4 bg-cyan-50 dark:bg-cyan-900/20 rounded-lg">
                <MessageCircle className="text-cyan-500 flex-shrink-0 mt-0.5" />
                <span className="text-slate-700 dark:text-slate-300">"How long have you lived here?"</span>
              </div>
              <div className="flex items-start gap-3 p-4 bg-cyan-50 dark:bg-cyan-900/20 rounded-lg">
                <MessageCircle className="text-cyan-500 flex-shrink-0 mt-0.5" />
                <span className="text-slate-700 dark:text-slate-300">"Who used to own this plot before?"</span>
              </div>
              <div className="flex items-start gap-3 p-4 bg-cyan-50 dark:bg-cyan-900/20 rounded-lg">
                <MessageCircle className="text-cyan-500 flex-shrink-0 mt-0.5" />
                <span className="text-slate-700 dark:text-slate-300">"Any court cases or police complaints about this land?"</span>
              </div>
              <div className="flex items-start gap-3 p-4 bg-cyan-50 dark:bg-cyan-900/20 rounded-lg">
                <MessageCircle className="text-cyan-500 flex-shrink-0 mt-0.5" />
                <span className="text-slate-700 dark:text-slate-300">"Does this area flood during monsoon?"</span>
              </div>
              <div className="flex items-start gap-3 p-4 bg-cyan-50 dark:bg-cyan-900/20 rounded-lg">
                <MessageCircle className="text-cyan-500 flex-shrink-0 mt-0.5" />
                <span className="text-slate-700 dark:text-slate-300">"Is water and electricity available?"</span>
              </div>
              <div className="flex items-start gap-3 p-4 bg-cyan-50 dark:bg-cyan-900/20 rounded-lg">
                <MessageCircle className="text-cyan-500 flex-shrink-0 mt-0.5" />
                <span className="text-slate-700 dark:text-slate-300">"Any boundary arguments with this plot?"</span>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <AlertCircle className="text-red-500" /> Red Flags to Watch
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <XCircle className="text-red-500 flex-shrink-0 mt-0.5" />
                <span className="text-slate-700 dark:text-slate-300">Neighbors are reluctant to talk about the property</span>
              </div>
              <div className="flex items-start gap-3 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <XCircle className="text-red-500 flex-shrink-0 mt-0.5" />
                <span className="text-slate-700 dark:text-slate-300">"Multiple people have tried to sell this land"</span>
              </div>
              <div className="flex items-start gap-3 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <XCircle className="text-red-500 flex-shrink-0 mt-0.5" />
                <span className="text-slate-700 dark:text-slate-300">Stories about past ownership don't match seller's claims</span>
              </div>
              <div className="flex items-start gap-3 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <XCircle className="text-red-500 flex-shrink-0 mt-0.5" />
                <span className="text-slate-700 dark:text-slate-300">"There's a court case going on" from any neighbor</span>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <MapPin className="text-indigo-500" /> Local Authorities to Consult
            </h2>
            <div className="space-y-4">
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-bold text-slate-900 dark:text-white">Gram Panchayat (Rural Areas)</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">Sarpanch and Gram Sevak know all local disputes and land histories</p>
                  <p className="text-slate-500 text-sm mt-1">For villages around Nagpur: Hingna, Koradi, Kamptee, Umred areas</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-bold text-slate-900 dark:text-white">NMC Ward Office (Urban)</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">Ward Councillor office for urban Nagpur plots</p>
                  <p className="text-slate-500 text-sm mt-1">For MIHAN, Besa, Wardha Road, Civil Lines, etc.</p>
                </CardContent>
              </Card>
            </div>
          </section>

          <div className="flex flex-col md:flex-row gap-4 justify-between pt-8 border-t">
            <Link href="/guide/possession-verification">
              <Button variant="outline" className="w-full md:w-auto">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous: Possession Verification
              </Button>
            </Link>
            <Link href="/guide/tp-scheme-check">
              <Button className="w-full md:w-auto bg-indigo-600 hover:bg-indigo-700">
                Next: TP Scheme Check
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>

        </div>
      </div>
    </PublicLayout>
  );
}
