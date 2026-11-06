import { Link } from "wouter";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { ScrollToTop } from "@/components/utils/ScrollToTop";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, ArrowRight, CheckCircle, XCircle, AlertCircle,
  FileText, MapPin, Clock, Banknote, Globe, Receipt
} from "lucide-react";

export default function PropertyTaxGuide() {
  return (
    <PublicLayout>
      <ScrollToTop />
      
      <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 py-12">
        <div className="container mx-auto px-4">
          <Link href="/step-3-safety-check">
            <Button variant="ghost" size="sm" className="mb-6" data-testid="button-back-checklist">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to 12-Point Checklist
            </Button>
          </Link>
          
          <Badge className="bg-amber-100 text-amber-700 mb-4">Check #3 - Documents</Badge>
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-4">
            Checking Property Tax Records in Nagpur: Complete Guide
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl">
            Property tax records confirm ownership and reveal pending dues. Unpaid taxes become your liability after purchase.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="prose dark:prose-invert max-w-none">
          
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Why Check Property Tax Records?</h2>
            <ul className="space-y-3 text-slate-600 dark:text-slate-400">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span><strong>Verifies ownership:</strong> Tax records show who pays taxes (usually the owner)</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span><strong>Reveals pending dues:</strong> Unpaid taxes transfer to new owner after sale</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span><strong>Shows property classification:</strong> Residential vs. commercial vs. agricultural</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span><strong>Confirms property details:</strong> Area, built-up area, location match</span>
              </li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">How to Check Online</h2>
            
            <div className="space-y-4">
              <Card className="border-l-4 border-l-amber-500">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 font-bold flex-shrink-0">1</div>
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white mb-2">Visit NMC Property Tax Portal</h4>
                      <p className="text-slate-600 dark:text-slate-400">
                        Go to <span className="font-mono bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">nmcnagpur.gov.in</span> → Click on "Property Tax"
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-amber-500">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 font-bold flex-shrink-0">2</div>
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white mb-2">Search by Property ID or Owner Name</h4>
                      <p className="text-slate-600 dark:text-slate-400">
                        Enter property number, ward number, or owner's name. You can also search by property address.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-amber-500">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 font-bold flex-shrink-0">3</div>
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white mb-2">View Tax Statement</h4>
                      <p className="text-slate-600 dark:text-slate-400">
                        Check current dues, payment history, and property classification. Download statement for records.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-amber-500">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 font-bold flex-shrink-0">4</div>
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white mb-2">Verify Owner Name</h4>
                      <p className="text-slate-600 dark:text-slate-400">
                        Ensure the owner name in tax records matches the seller's name and property documents.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">What to Verify</h2>
            
            <div className="grid md:grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-slate-900 dark:text-white">Owner Name Match</p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Tax payer name = Seller's name</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-slate-900 dark:text-white">No Pending Dues</p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">All taxes paid up to current date</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-slate-900 dark:text-white">Correct Classification</p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Residential property taxed as residential</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-slate-900 dark:text-white">Area Matches</p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Plot/built-up area matches sale documents</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Tax Due Clearance</h2>
            
            <Card className="bg-amber-50 dark:bg-amber-900/20 border-amber-200">
              <CardContent className="p-6">
                <div className="flex items-start gap-3">
                  <Receipt className="w-6 h-6 text-amber-600 flex-shrink-0" />
                  <div>
                    <p className="font-bold text-amber-800 dark:text-amber-200 mb-2">Get NOC from NMC</p>
                    <p className="text-sm text-amber-700 dark:text-amber-300 mb-4">
                      Ask seller to provide No Objection Certificate (NOC) or Tax Clearance Certificate from Nagpur Municipal Corporation confirming all dues are cleared.
                    </p>
                    <p className="text-sm text-amber-700 dark:text-amber-300">
                      <strong>Important:</strong> Verify the NOC is recent (within 30 days) and matches the property you're buying.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Red Flags to Watch</h2>
            
            <div className="grid md:grid-cols-2 gap-4">
              <Card className="border-2 border-red-200 bg-red-50 dark:bg-red-900/20">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-red-800 dark:text-red-200">Years of Unpaid Taxes</p>
                      <p className="text-sm text-red-700 dark:text-red-300">Indicates neglect or ownership disputes</p>
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
                      <p className="text-sm text-red-700 dark:text-red-300">Tax payer different from seller</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-red-200 bg-red-50 dark:bg-red-900/20">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-red-800 dark:text-red-200">Commercial Tax on Residential</p>
                      <p className="text-sm text-red-700 dark:text-red-300">Property may be illegally used for commercial purposes</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-red-200 bg-red-50 dark:bg-red-900/20">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-red-800 dark:text-red-200">Property Not in Records</p>
                      <p className="text-sm text-red-700 dark:text-red-300">Unregistered construction or illegal plot</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">NMC Zonal Offices</h2>
            
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              For offline verification, visit the NMC zonal office for your property's ward:
            </p>
            
            <div className="grid gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white">Laxmi Nagar Zone Office</h4>
                      <p className="text-slate-600 dark:text-slate-400 text-sm">Covers: Laxmi Nagar, Surendra Nagar, Ayodhya Nagar</p>
                      <p className="text-slate-500 text-xs mt-1">Hours: 10 AM - 5:30 PM | Phone: 0712-2721234</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white">Dharampeth Zone Office</h4>
                      <p className="text-slate-600 dark:text-slate-400 text-sm">Covers: Dharampeth, Civil Lines, Sitabuldi</p>
                      <p className="text-slate-500 text-xs mt-1">Hours: 10 AM - 5:30 PM | Phone: 0712-2525678</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white">Hanuman Nagar Zone Office</h4>
                      <p className="text-slate-600 dark:text-slate-400 text-sm">Covers: Hanuman Nagar, Trimurti Nagar, Manewada</p>
                      <p className="text-slate-500 text-xs mt-1">Hours: 10 AM - 5:30 PM | Phone: 0712-2784567</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white">Nehru Nagar Zone Office</h4>
                      <p className="text-slate-600 dark:text-slate-400 text-sm">Covers: Nehru Nagar, Jaripatka, Bhandara Road</p>
                      <p className="text-slate-500 text-xs mt-1">Hours: 10 AM - 5:30 PM | Phone: 0712-2756789</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white">Ashi Nagar Zone Office</h4>
                      <p className="text-slate-600 dark:text-slate-400 text-sm">Covers: Ashi Nagar, Besa, Pipla</p>
                      <p className="text-slate-500 text-xs mt-1">Hours: 10 AM - 5:30 PM | Phone: 0712-2789012</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Payment Verification</h2>
            
            <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200">
              <CardContent className="p-6">
                <p className="font-medium text-blue-800 dark:text-blue-200 mb-4">How to Confirm Seller's Receipts are Genuine:</p>
                <ol className="space-y-2 text-blue-700 dark:text-blue-300 text-sm list-decimal list-inside">
                  <li>Match receipt number with online records on NMC portal</li>
                  <li>Verify payment dates and amounts match statement</li>
                  <li>Check for official NMC watermark and stamp</li>
                  <li>Cross-verify with bank statement if paid online</li>
                  <li>Request duplicate receipt from NMC if suspicious</li>
                </ol>
              </CardContent>
            </Card>
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
