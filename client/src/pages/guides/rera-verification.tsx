import { Link } from "wouter";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { ScrollToTop } from "@/components/utils/ScrollToTop";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, ArrowRight, CheckCircle, XCircle, AlertCircle,
  FileText, MapPin, Clock, Shield, Globe, Building
} from "lucide-react";

export default function ReraVerificationGuide() {
  return (
    <PublicLayout>
      <ScrollToTop />
      
      <div className="bg-gradient-to-br from-indigo-50 to-violet-50 dark:from-indigo-950/30 dark:to-violet-950/30 py-12">
        <div className="container mx-auto px-4">
          <Link href="/step-3-safety-check">
            <Button variant="ghost" size="sm" className="mb-6" data-testid="button-back-checklist">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to 12-Point Checklist
            </Button>
          </Link>
          
          <Badge className="bg-indigo-100 text-indigo-700 mb-4">Check #10 - Legal</Badge>
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-4">
            RERA Registration Check for Nagpur Properties: Complete Guide
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl">
            RERA protects buyers from builder defaults. Verify registration status before buying any property in a project.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="prose dark:prose-invert max-w-none">
          
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">What is RERA?</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              The Real Estate (Regulation and Development) Act, 2016 requires all real estate projects above 500 sq. meters or 8 apartments to register with the state RERA authority. In Maharashtra, this is managed by MahaRERA.
            </p>
            <Card className="bg-indigo-50 dark:bg-indigo-900/20 border-indigo-200">
              <CardContent className="p-4">
                <p className="text-sm text-slate-700 dark:text-slate-300">
                  <strong>Mandatory since May 2017:</strong> Any project launched after this date must be RERA registered. Buying in an unregistered project leaves you without legal protection.
                </p>
              </CardContent>
            </Card>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Why RERA Verification is Critical</h2>
            <ul className="space-y-3 text-slate-600 dark:text-slate-400">
              <li className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span><strong>Legal protection:</strong> RERA provides legal recourse if builder defaults</span>
              </li>
              <li className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span><strong>Project monitoring:</strong> Builder must update construction progress quarterly</span>
              </li>
              <li className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span><strong>Financial security:</strong> 70% of buyer payments kept in escrow account</span>
              </li>
              <li className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span><strong>Delay compensation:</strong> Entitled to interest for project delays</span>
              </li>
              <li className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span><strong>Refund rights:</strong> Can claim refund if project cancelled or delayed excessively</span>
              </li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">How to Verify RERA Registration</h2>
            
            <div className="space-y-4">
              <Card className="border-l-4 border-l-indigo-500">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold flex-shrink-0">1</div>
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white mb-2">Visit MahaRERA Website</h4>
                      <p className="text-slate-600 dark:text-slate-400">
                        Go to <span className="font-mono bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">maharerait.mahaonline.gov.in</span>
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
                      <h4 className="font-bold text-slate-900 dark:text-white mb-2">Search by Project or Registration Number</h4>
                      <p className="text-slate-600 dark:text-slate-400">
                        Click "Search Project Details" → Enter project name, location (Nagpur), or RERA registration number
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
                      <h4 className="font-bold text-slate-900 dark:text-white mb-2">Review Project Details</h4>
                      <p className="text-slate-600 dark:text-slate-400">
                        Check registration status, promoter details, project timeline, and approved plans
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
                      <h4 className="font-bold text-slate-900 dark:text-white mb-2">Check Complaints Section</h4>
                      <p className="text-slate-600 dark:text-slate-400">
                        View any buyer complaints filed against the project or promoter
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">What to Check on MahaRERA</h2>
            
            <div className="grid md:grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <FileText className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-slate-900 dark:text-white">Registration Number</p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Valid MahaRERA registration ID</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-slate-900 dark:text-white">Registration Validity</p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Not expired or lapsed</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <Building className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-slate-900 dark:text-white">Project Completion Date</p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Promised timeline by builder</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-slate-900 dark:text-white">Complaints Filed</p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Number and nature of buyer complaints</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Documents Available on MahaRERA</h2>
            
            <div className="space-y-3">
              <Card className="border-l-4 border-l-green-500">
                <CardContent className="p-4">
                  <h4 className="font-bold text-slate-900 dark:text-white mb-1">Approved Layout Plan</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Official sanctioned plan of the project</p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-green-500">
                <CardContent className="p-4">
                  <h4 className="font-bold text-slate-900 dark:text-white mb-1">Commencement Certificate</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Permission to start construction</p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-green-500">
                <CardContent className="p-4">
                  <h4 className="font-bold text-slate-900 dark:text-white mb-1">Title Documents</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Land ownership proof of promoter</p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-green-500">
                <CardContent className="p-4">
                  <h4 className="font-bold text-slate-900 dark:text-white mb-1">Quarterly Progress Reports</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Construction status updates</p>
                </CardContent>
              </Card>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">For Resale Properties</h2>
            
            <Card className="bg-amber-50 dark:bg-amber-900/20 border-amber-200">
              <CardContent className="p-6">
                <p className="font-medium text-amber-800 dark:text-amber-200 mb-4">When Does RERA Apply to Resale?</p>
                <ul className="space-y-2 text-amber-700 dark:text-amber-300 text-sm">
                  <li>• <strong>Post-2017 projects:</strong> RERA applies - verify registration</li>
                  <li>• <strong>Pre-2017 projects:</strong> May not be registered, but check anyway</li>
                  <li>• <strong>Individual plots:</strong> RERA may not apply if project completed before 2017</li>
                  <li>• <strong>Builder flats (resale):</strong> Original RERA protection may still be valid</li>
                </ul>
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
                      <p className="font-medium text-red-800 dark:text-red-200">Unregistered Project (Post-2017)</p>
                      <p className="text-sm text-red-700 dark:text-red-300">Builder is violating law - do not buy</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-2 border-red-200 bg-red-50 dark:bg-red-900/20">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-red-800 dark:text-red-200">Expired Registration</p>
                      <p className="text-sm text-red-700 dark:text-red-300">Registration lapsed without renewal</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-red-200 bg-red-50 dark:bg-red-900/20">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-red-800 dark:text-red-200">Multiple Complaints</p>
                      <p className="text-sm text-red-700 dark:text-red-300">Pattern of buyer disputes with builder</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-red-200 bg-red-50 dark:bg-red-900/20">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-red-800 dark:text-red-200">Delayed Timeline</p>
                      <p className="text-sm text-red-700 dark:text-red-300">Project completion date repeatedly extended</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Your Rights Under RERA</h2>
            
            <div className="space-y-4">
              <Card className="bg-green-50 dark:bg-green-900/20 border-green-200">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-green-800 dark:text-green-200">Delay Compensation</p>
                      <p className="text-sm text-green-700 dark:text-green-300">Interest on payments for delayed possession (SBI MCLR + 2%)</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-green-50 dark:bg-green-900/20 border-green-200">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-green-800 dark:text-green-200">Full Refund</p>
                      <p className="text-sm text-green-700 dark:text-green-300">Withdraw and get refund with interest if project cancelled</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-green-50 dark:bg-green-900/20 border-green-200">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-green-800 dark:text-green-200">Structural Defect Warranty</p>
                      <p className="text-sm text-green-700 dark:text-green-300">5-year warranty on structural defects from possession date</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">If Project Not Registered</h2>
            
            <Card className="bg-red-50 dark:bg-red-900/20 border-red-200">
              <CardContent className="p-6">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
                  <div>
                    <p className="font-bold text-red-800 dark:text-red-200 mb-2">What to Do:</p>
                    <ol className="text-sm text-red-700 dark:text-red-300 space-y-2 list-decimal list-inside">
                      <li>Do NOT make any payment to builder</li>
                      <li>File complaint on MahaRERA website against promoter</li>
                      <li>Report to local police (selling unregistered project is criminal offense)</li>
                      <li>Seek legal advice before proceeding</li>
                      <li>Consider alternative registered projects</li>
                    </ol>
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
