import { Link } from "wouter";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { ScrollToTop } from "@/components/utils/ScrollToTop";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, ArrowRight, CheckCircle, XCircle, AlertCircle,
  FileText, MapPin, Clock, Banknote, Globe
} from "lucide-react";

export default function EncumbranceCertificateGuide() {
  return (
    <PublicLayout>
      <ScrollToTop />
      
      <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 py-12">
        <div className="container mx-auto px-4">
          <Link href="/step-3-safety-check">
            <Button variant="ghost" size="sm" className="mb-6" data-testid="button-back-checklist">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to 12-Point Checklist
            </Button>
          </Link>
          
          <Badge className="bg-emerald-100 text-emerald-700 mb-4">Check #6 - Legal</Badge>
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-4">
            Encumbrance Certificate in Nagpur: How to Obtain and Verify
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl">
            The EC proves a property is free from loans, mortgages, and legal claims. Without it, you might inherit someone else's debt.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="prose dark:prose-invert max-w-none">
          
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">What is an Encumbrance Certificate?</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              An Encumbrance Certificate (EC) is a legal document that records all monetary transactions registered against a property. It shows loans, mortgages, liens, court attachments, and other charges that affect the property's title.
            </p>
            <Card className="bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200">
              <CardContent className="p-4">
                <p className="text-sm text-slate-700 dark:text-slate-300">
                  <strong>NIL Encumbrance:</strong> If the EC shows "NIL" for all years checked, the property has no registered debts or claims. This is what you want to see.
                </p>
              </CardContent>
            </Card>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Why EC is Essential</h2>
            <ul className="space-y-3 text-slate-600 dark:text-slate-400">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span>Confirms property is free from outstanding loans</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span>Reveals hidden mortgages that transfer with property</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span>Shows court orders or government claims</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span>Mandatory for bank home loan approval</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span>Protects you from inheriting seller's debts</span>
              </li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">How to Apply for EC</h2>
            
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
              <Globe className="w-5 h-5 text-blue-600" /> Online Method (Recommended)
            </h3>
            
            <div className="space-y-4 mb-8">
              <Card className="border-l-4 border-l-emerald-500">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold flex-shrink-0">1</div>
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white mb-2">Visit Maharashtra Government Portal</h4>
                      <p className="text-slate-600 dark:text-slate-400">
                        Go to <span className="font-mono bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">igrmaharashtra.gov.in</span> and register/login
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-emerald-500">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold flex-shrink-0">2</div>
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white mb-2">Select "Encumbrance Certificate"</h4>
                      <p className="text-slate-600 dark:text-slate-400">
                        Navigate to Services → Encumbrance Certificate → Apply Online
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-emerald-500">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold flex-shrink-0">3</div>
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white mb-2">Enter Property Details</h4>
                      <p className="text-slate-600 dark:text-slate-400">
                        Provide survey number, village/ward, Sub-Registrar office, and period (recommend 30 years)
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-emerald-500">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold flex-shrink-0">4</div>
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white mb-2">Pay Fees and Download</h4>
                      <p className="text-slate-600 dark:text-slate-400">
                        Pay online (Rs. 25 per year checked). EC available in 3-7 business days.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-4">Offline Method</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              Visit any Sub-Registrar office in Nagpur with application form and required documents. Processing takes 7-15 days.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Documents Needed</h2>
            
            <div className="grid md:grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-green-600" />
                    <span className="text-slate-700 dark:text-slate-300">Property survey number/plot number</span>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-green-600" />
                    <span className="text-slate-700 dark:text-slate-300">Owner's name (as per records)</span>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-green-600" />
                    <span className="text-slate-700 dark:text-slate-300">Village/Ward and Taluka</span>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-green-600" />
                    <span className="text-slate-700 dark:text-slate-300">ID proof of applicant</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Fees and Timeline</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-2 border-emerald-200">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Banknote className="w-6 h-6 text-emerald-600" />
                    <h4 className="font-bold text-slate-900 dark:text-white">Fees</h4>
                  </div>
                  <ul className="space-y-2 text-slate-600 dark:text-slate-400 text-sm">
                    <li>• Rs. 25 per year checked</li>
                    <li>• 30-year EC: Rs. 750 approx.</li>
                    <li>• Additional: Rs. 15 for certified copy</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-2 border-blue-200">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Clock className="w-6 h-6 text-blue-600" />
                    <h4 className="font-bold text-slate-900 dark:text-white">Processing Time</h4>
                  </div>
                  <ul className="space-y-2 text-slate-600 dark:text-slate-400 text-sm">
                    <li>• Online: 3-7 business days</li>
                    <li>• Offline: 7-15 business days</li>
                    <li>• Urgent: Same day (extra fee)</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Nagpur Sub-Registrar Offices</h2>
            
            <div className="grid gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white">Joint Sub-Registrar Office, Nagpur (City)</h4>
                      <p className="text-slate-600 dark:text-slate-400 text-sm">Civil Lines, Near District Court, Nagpur - 440001</p>
                      <p className="text-slate-500 text-xs mt-1">Phone: 0712-2560123 | Hours: 10 AM - 5:45 PM</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white">Sub-Registrar Office, Sadar</h4>
                      <p className="text-slate-600 dark:text-slate-400 text-sm">Sadar Area, Nagpur</p>
                      <p className="text-slate-500 text-xs mt-1">Hours: 10 AM - 5:45 PM (Closed: Sundays, 2nd & 4th Saturdays)</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white">Sub-Registrar Office, Kamptee</h4>
                      <p className="text-slate-600 dark:text-slate-400 text-sm">Kamptee Taluka Office</p>
                      <p className="text-slate-500 text-xs mt-1">Hours: 10 AM - 5:45 PM (Closed: Sundays, 2nd & 4th Saturdays)</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">How to Read an EC</h2>
            
            <div className="space-y-4">
              <Card className="bg-green-50 dark:bg-green-900/20 border-green-200">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-green-800 dark:text-green-200">NIL Encumbrance (Good)</p>
                      <p className="text-sm text-green-700 dark:text-green-300">Shows "No encumbrance" for all years - property is debt-free</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-red-50 dark:bg-red-900/20 border-red-200">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-red-800 dark:text-red-200">Entries Present (Investigate)</p>
                      <p className="text-sm text-red-700 dark:text-red-300">Shows mortgage, lien, or court order - needs verification before proceeding</p>
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
                    <p className="font-medium text-amber-800 dark:text-amber-200">Common Entry Types</p>
                    <ul className="text-sm text-amber-700 dark:text-amber-300 mt-2 space-y-1">
                      <li>• <strong>Sale Deed:</strong> Normal - shows ownership transfer</li>
                      <li>• <strong>Mortgage:</strong> Warning - property used as loan security</li>
                      <li>• <strong>Release Deed:</strong> Good - previous mortgage cleared</li>
                      <li>• <strong>Court Order:</strong> Red flag - legal dispute exists</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Red Flags in EC</h2>
            
            <div className="grid md:grid-cols-2 gap-4">
              <Card className="border-2 border-red-200 bg-red-50 dark:bg-red-900/20">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-red-800 dark:text-red-200">Outstanding Bank Loan</p>
                      <p className="text-sm text-red-700 dark:text-red-300">Property mortgaged to bank - lien not released</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-2 border-red-200 bg-red-50 dark:bg-red-900/20">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-red-800 dark:text-red-200">Court Attachment</p>
                      <p className="text-sm text-red-700 dark:text-red-300">Property seized by court order in legal case</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-red-200 bg-red-50 dark:bg-red-900/20">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-red-800 dark:text-red-200">IT/Tax Dues</p>
                      <p className="text-sm text-red-700 dark:text-red-300">Income tax or property tax lien on property</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-red-200 bg-red-50 dark:bg-red-900/20">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-red-800 dark:text-red-200">Multiple Mortgages</p>
                      <p className="text-sm text-red-700 dark:text-red-300">Property pledged to multiple lenders</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Recommended Period to Check</h2>
            
            <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200">
              <CardContent className="p-6">
                <p className="text-slate-700 dark:text-slate-300 mb-4">
                  <strong>Recommended: 30 years</strong> - This covers the standard limitation period for property disputes in India. Banks typically require 13-30 year EC for home loans.
                </p>
                <div className="grid md:grid-cols-3 gap-4 text-center">
                  <div className="p-3 bg-white dark:bg-slate-800 rounded-lg">
                    <p className="text-2xl font-bold text-blue-600">13 years</p>
                    <p className="text-xs text-slate-500">Minimum (Bank standard)</p>
                  </div>
                  <div className="p-3 bg-white dark:bg-slate-800 rounded-lg border-2 border-green-500">
                    <p className="text-2xl font-bold text-green-600">30 years</p>
                    <p className="text-xs text-slate-500">Recommended (Full safety)</p>
                  </div>
                  <div className="p-3 bg-white dark:bg-slate-800 rounded-lg">
                    <p className="text-2xl font-bold text-slate-600">50+ years</p>
                    <p className="text-xs text-slate-500">For ancestral property</p>
                  </div>
                </div>
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
