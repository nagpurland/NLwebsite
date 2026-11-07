import { useEffect } from "react";
import { Switch, Route, Redirect } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { I18nProvider } from "@/lib/i18n/context";
import { AppShell } from "@/components/layout/AppShell";
import Dashboard from "@/pages/dashboard";
import Properties from "@/pages/properties";
import Leads from "@/pages/leads";
import Campaigns from "@/pages/campaigns";
import Analytics from "@/pages/analytics";
import AdminScraping from "@/pages/admin-scraping";
import WebIntelligence from "@/pages/web-intelligence";
import PublicHome from "@/pages/public-home";
import Learn from "@/pages/learn";
import PlotCheckup from "@/pages/plot-checkup";
import LocalityGuides from "@/pages/localities";
import PropertyDetail from "@/pages/property-detail";
import PrePurchaseWizard from "@/pages/pre-purchase-wizard";
import LocalityOS from "@/pages/locality-os";
import MyWatchlist from "@/pages/my-watchlist";
import PremiumVerification from "@/pages/premium-verification";
import StepComplete from "@/pages/step-complete";
import PublicIntel from "@/pages/public-intel";
import { PublicPropertySearch, PublicBlog } from "@/pages/public";
import SearchResults from "@/pages/search";
import FindProperties from "@/pages/find-properties";
import DharampethGuide from "@/pages/guides/dharampeth";
import AwarenessDashboard from "@/pages/awareness-dashboard";
import BlogList from "@/pages/blog-list";
import BlogDetail from "@/pages/blog-detail";
import ForAgents from "@/pages/for-agents";
import DataRefresh from "@/pages/data-refresh";
import Step1MarketIntel from "@/pages/step-1-market-intel";
import Step2FilterRisky from "@/pages/step-2-filter-risky";
import Step3SafetyCheck from "@/pages/step-3-safety-check";
import Step4DecisionReport from "@/pages/step-4-decision-report";
import FourStepSystem from "@/pages/four-step-system";
import ImplementationHub from "@/pages/implementation-hub";


import OwnershipVerificationGuide from "@/pages/guides/ownership-verification";
import LitigationSearchGuide from "@/pages/guides/litigation-search";
import TPSchemeCheckGuide from "@/pages/guides/tp-scheme-check";
import MutationsTransfersGuide from "@/pages/guides/mutations-transfers";
import EncumbranceCertificateGuide from "@/pages/guides/encumbrance-certificate";
import PropertyTaxGuide from "@/pages/guides/property-tax";
import TitleVerificationGuide from "@/pages/guides/title-verification";
import IdentityVerificationGuide from "@/pages/guides/identity-verification";
import NAConversionGuide from "@/pages/guides/na-conversion";
import BoundaryVerificationGuide from "@/pages/guides/boundary-verification";
import PossessionVerificationGuide from "@/pages/guides/possession-verification";
import NeighborVerificationGuide from "@/pages/guides/neighbor-verification";
import AdminBlogGenerator from "@/pages/admin-blog-generator";
import Contact from "@/pages/contact";
import Privacy from "@/pages/privacy";
import Terms from "@/pages/terms";
import NotFound from "@/pages/not-found";
import { AdminGate } from "@/components/layout/AdminGate";
import { track, TRACKED_EVENTS, type TrackedEvent } from "@/lib/track";

// The older area, price, blog, property and verification pages are routed again at the owner's
// request. Their figures are sample data with no source. Keep them off the live site until
// condition 16 in docs/legal/READINESS-GATE.md is cleared.
function Router() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const name = (e.target as HTMLElement).closest?.("[data-event]")?.getAttribute("data-event");
      if (name && (TRACKED_EVENTS as readonly string[]).includes(name)) track(name as TrackedEvent);
    };
    window.addEventListener("click", onClick);
    return () => window.removeEventListener("click", onClick);
  }, []);
  return (
    <Switch>
      {/* Public Pages */}
      <Route path="/" component={PublicHome} />
      <Route path="/contact" component={Contact} />
      <Route path="/privacy" component={Privacy} />
      <Route path="/terms" component={Terms} />
      <Route path="/learn" component={Learn} />
      <Route path="/invest-safely"><Redirect to="/learn" /></Route>
      <Route path="/plot-checkup" component={PlotCheckup} />
      <Route path="/localities" component={LocalityGuides} />
      <Route path="/public/localities" component={LocalityGuides} />
      <Route path="/locality/:id" component={LocalityOS} />
      <Route path="/property/:id" component={PropertyDetail} />
      <Route path="/find-properties" component={FindProperties} />
      <Route path="/search" component={SearchResults} />
      <Route path="/public/search" component={PublicPropertySearch} />
      <Route path="/public/intel" component={PublicIntel} />
      <Route path="/pre-purchase-wizard" component={PrePurchaseWizard} />
      <Route path="/premium-verification" component={PremiumVerification} />
      <Route path="/step-complete" component={StepComplete} />
      <Route path="/my-watchlist" component={MyWatchlist} />
      <Route path="/area-guide/dharampeth" component={DharampethGuide} />
      <Route path="/awareness" component={AwarenessDashboard} />
      <Route path="/public/blog" component={PublicBlog} />
      <Route path="/public/blog/:id" component={BlogDetail} />
      <Route path="/blog" component={BlogList} />
      <Route path="/blog/:slug" component={BlogDetail} />
      <Route path="/for-agents" component={ForAgents} />
      <Route path="/step-1-market-intel" component={Step1MarketIntel} />
      <Route path="/step-2-filter-risky" component={Step2FilterRisky} />
      <Route path="/step-3-safety-check" component={Step3SafetyCheck} />
      <Route path="/step-4-decision-report" component={Step4DecisionReport} />
      <Route path="/4-step-system" component={FourStepSystem} />
      
      <Route path="/guide/ownership-verification" component={OwnershipVerificationGuide} />
      <Route path="/guide/litigation-search" component={LitigationSearchGuide} />
      <Route path="/guide/tp-scheme-check" component={TPSchemeCheckGuide} />
      <Route path="/guide/mutations-transfers" component={MutationsTransfersGuide} />
      <Route path="/guide/property-tax" component={PropertyTaxGuide} />
      <Route path="/guide/encumbrance-certificate" component={EncumbranceCertificateGuide} />
      <Route path="/guide/title-verification" component={TitleVerificationGuide} />
      <Route path="/guide/identity-verification" component={IdentityVerificationGuide} />
      <Route path="/guide/na-conversion" component={NAConversionGuide} />
      <Route path="/guide/boundary-verification" component={BoundaryVerificationGuide} />
      <Route path="/guide/possession-verification" component={PossessionVerificationGuide} />
      <Route path="/guide/neighbor-verification" component={NeighborVerificationGuide} />
      
      {/* Admin Dashboard */}
      <Route path="/admin">
        <AdminGate>
          <AppShell>
            <Dashboard />
          </AppShell>
        </AdminGate>
      </Route>
      
      <Route path="/admin/*">
        <AdminGate>
        <AppShell>
          <Switch>
            <Route path="/admin" component={Dashboard} />
            <Route path="/admin/properties" component={Properties} />
            <Route path="/admin/leads" component={Leads} />
            <Route path="/admin/scraping" component={AdminScraping} />
            <Route path="/admin/intel" component={WebIntelligence} />
            <Route path="/admin/campaigns" component={Campaigns} />
            <Route path="/admin/analytics" component={Analytics} />
            <Route path="/admin/blog-generator" component={AdminBlogGenerator} />
            <Route path="/admin/data-refresh" component={DataRefresh} />
            <Route path="/admin/implementation-hub" component={ImplementationHub} />
            <Route component={NotFound} />
          </Switch>
        </AppShell>
        </AdminGate>
      </Route>

      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <I18nProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </I18nProvider>
    </QueryClientProvider>
  );
}

export default App;
