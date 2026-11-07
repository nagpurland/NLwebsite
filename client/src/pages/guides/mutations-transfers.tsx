import { Link } from "wouter";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { ScrollToTop } from "@/components/utils/ScrollToTop";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, ArrowRight, CheckCircle, XCircle, AlertCircle,
  FileText, MapPin, Clock, Building, ExternalLink
} from "lucide-react";

export default function MutationsTransfersGuide() {
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
          
          <Badge className="bg-primary/5 text-primary mb-4">Check #2 - Documents</Badge>
          <h1 className="text-3xl md:text-4xl font-semibold text-primary dark:text-white mb-4">
            Complete Guide: How to Check Property Mutations and Transfers in Nagpur
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl">
            Mutation records show the history of ownership changes. Checking them reveals hidden transfers, disputes, and potential red flags.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="prose dark:prose-invert max-w-none">
          
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-primary dark:text-white mb-4">What is Property Mutation?</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              Mutation (also called "Ferfar" in Maharashtra) is the official process of updating land records when ownership changes. It reflects the new owner's name in government records after a sale, inheritance, gift, or partition.
            </p>
            <Card className="bg-primary/5 dark:bg-blue-900/20 border-primary/20">
              <CardContent className="p-4">
                <p className="text-sm text-slate-700 dark:text-slate-300">
                  <strong>Why it matters:</strong> Without mutation, the seller's claim to ownership isn't fully established in government records. Pending mutations can indicate disputes, legal issues, or incomplete transactions.
                </p>
              </CardContent>
            </Card>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-primary dark:text-white mb-6">How to Check Mutation Records</h2>
            
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-4">Online Method</h3>
            <div className="space-y-4 mb-8">
              <Card className="border-l-4 border-l-blue-500">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-primary/5 flex items-center justify-center text-primary font-bold flex-shrink-0">1</div>
                    <div>
                      <h4 className="font-bold text-primary dark:text-white mb-2">Visit Maharashtra Bhumi Abhilekh Portal</h4>
                      <p className="text-slate-600 dark:text-slate-400 mb-2">
                        Go to <span className="font-mono bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">bhulekh.mahabhumi.gov.in</span>
                      </p>
                      <p className="text-slate-600 dark:text-slate-400">
                        Select Nagpur Division → Nagpur District → Your Taluka → Village
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-blue-500">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-primary/5 flex items-center justify-center text-primary font-bold flex-shrink-0">2</div>
                    <div>
                      <h4 className="font-bold text-primary dark:text-white mb-2">Search Property Records</h4>
                      <p className="text-slate-600 dark:text-slate-400">
                        Enter Survey Number or Gat Number. View the 7/12 extract which shows mutation entries in column 11 and 12.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-blue-500">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-primary/5 flex items-center justify-center text-primary font-bold flex-shrink-0">3</div>
                    <div>
                      <h4 className="font-bold text-primary dark:text-white mb-2">Check Ferfar (Mutation) Register</h4>
                      <p className="text-slate-600 dark:text-slate-400">
                        Click on "Ferfar" to see detailed history of all ownership changes with dates and transaction types.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-4">Offline Method</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              Visit the Talathi office (for rural land) or City Survey Office (for urban land) with property details.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-primary dark:text-white mb-6">Nagpur Sub-Registrar Offices</h2>
            
            <div className="grid gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold text-primary dark:text-white">Sub-Registrar Office, Nagpur (City)</h4>
                      <p className="text-slate-600 dark:text-slate-400 text-sm">Near Civil Lines, Nagpur - 440001</p>
                      <p className="text-slate-500 text-xs mt-1">Hours: 10:00 AM - 5:45 PM (Closed: Sundays, 2nd & 4th Saturdays)</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold text-primary dark:text-white">Sub-Registrar Office, Nagpur (Rural)</h4>
                      <p className="text-slate-600 dark:text-slate-400 text-sm">Collectorate Building, Civil Lines, Nagpur</p>
                      <p className="text-slate-500 text-xs mt-1">Hours: 10:00 AM - 5:45 PM (Closed: Sundays, 2nd & 4th Saturdays)</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold text-primary dark:text-white">Sub-Registrar Office, Hingna</h4>
                      <p className="text-slate-600 dark:text-slate-400 text-sm">Hingna Taluka Office, Near Hingna Bus Stand</p>
                      <p className="text-slate-500 text-xs mt-1">Hours: 10:00 AM - 5:45 PM (Closed: Sundays, 2nd & 4th Saturdays)</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-primary dark:text-white mb-6">Documents Required</h2>
            
            <div className="grid md:grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-green-600" />
                    <span className="text-slate-700 dark:text-slate-300">Sale Deed / Gift Deed</span>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-green-600" />
                    <span className="text-slate-700 dark:text-slate-300">Encumbrance Certificate</span>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-green-600" />
                    <span className="text-slate-700 dark:text-slate-300">Property Tax Receipts</span>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-green-600" />
                    <span className="text-slate-700 dark:text-slate-300">ID Proof (Aadhaar/PAN)</span>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-green-600" />
                    <span className="text-slate-700 dark:text-slate-300">Address Proof</span>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-green-600" />
                    <span className="text-slate-700 dark:text-slate-300">7/12 Extract (Satbara)</span>
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
                      <p className="font-medium text-red-800 dark:text-red-200">Pending Mutations</p>
                      <p className="text-sm text-red-700 dark:text-red-300">Ownership transfer not yet recorded in government records</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-2 border-red-200 bg-red-50 dark:bg-red-900/20">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-red-800 dark:text-red-200">Name Mismatches</p>
                      <p className="text-sm text-red-700 dark:text-red-300">Seller's name differs from mutation records</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-red-200 bg-red-50 dark:bg-red-900/20">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-red-800 dark:text-red-200">Multiple Rapid Transfers</p>
                      <p className="text-sm text-red-700 dark:text-red-300">Suspicious ownership jumps in short time period</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-red-200 bg-red-50 dark:bg-red-900/20">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-red-800 dark:text-red-200">Outstanding Tax Dues</p>
                      <p className="text-sm text-red-700 dark:text-red-300">Unpaid property taxes blocking mutation</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-amber-50 dark:bg-amber-900/20 border-amber-200 mt-6">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-amber-800 dark:text-amber-200">Timeline Note</p>
                    <p className="text-sm text-amber-700 dark:text-amber-300">
                      Normal mutation processing takes 3-6 months. Delays beyond this may indicate issues.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-primary dark:text-white mb-6">Application Process (8 Steps)</h2>
            
            <ol className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-primary/5 text-primary flex items-center justify-center text-sm font-bold flex-shrink-0">1</span>
                <span className="text-slate-600 dark:text-slate-400">Collect all required documents (sale deed, tax receipts, ID proof)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-primary/5 text-primary flex items-center justify-center text-sm font-bold flex-shrink-0">2</span>
                <span className="text-slate-600 dark:text-slate-400">Fill mutation application form (available at Talathi office)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-primary/5 text-primary flex items-center justify-center text-sm font-bold flex-shrink-0">3</span>
                <span className="text-slate-600 dark:text-slate-400">Submit application with fees (Rs. 25 - Rs. 1,000 depending on property value)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-primary/5 text-primary flex items-center justify-center text-sm font-bold flex-shrink-0">4</span>
                <span className="text-slate-600 dark:text-slate-400">Talathi verifies documents and conducts inquiry</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-primary/5 text-primary flex items-center justify-center text-sm font-bold flex-shrink-0">5</span>
                <span className="text-slate-600 dark:text-slate-400">Public notice period (15 days) for objections</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-primary/5 text-primary flex items-center justify-center text-sm font-bold flex-shrink-0">6</span>
                <span className="text-slate-600 dark:text-slate-400">Circle Officer approval if no objections</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-primary/5 text-primary flex items-center justify-center text-sm font-bold flex-shrink-0">7</span>
                <span className="text-slate-600 dark:text-slate-400">Entry made in Record of Rights (7/12)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-primary/5 text-primary flex items-center justify-center text-sm font-bold flex-shrink-0">8</span>
                <span className="text-slate-600 dark:text-slate-400">Collect updated 7/12 extract (15-30 days total)</span>
              </li>
            </ol>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-primary dark:text-white mb-6">If Property Has Disputed Mutation</h2>
            
            <Card className="bg-red-50 dark:bg-red-900/20 border-red-200">
              <CardContent className="p-6">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
                  <div>
                    <p className="font-bold text-red-800 dark:text-red-200 mb-2">Do NOT proceed with purchase</p>
                    <ul className="text-sm text-red-700 dark:text-red-300 space-y-2">
                      <li>• Wait until seller completes mutation in their name</li>
                      <li>• Require seller to resolve all pending objections</li>
                      <li>• Get legal opinion if mutation has been rejected</li>
                      <li>• Consider walking away if dispute is complex</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-primary dark:text-white mb-6">Quick Verification Checklist</h2>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-slate-700 dark:text-slate-300">Seller's name matches current 7/12 mutation entry</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-slate-700 dark:text-slate-300">No pending mutation applications on the property</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-slate-700 dark:text-slate-300">Last 5-10 years of transfers appear legitimate</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-slate-700 dark:text-slate-300">All property taxes paid and reflected in records</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-slate-700 dark:text-slate-300">No court orders or government claims noted</span>
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
                  <Button className="bg-primary hover:bg-primary/90" data-testid="button-mark-complete">
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
