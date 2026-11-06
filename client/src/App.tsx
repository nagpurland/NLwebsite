import { Switch, Route } from "wouter";
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
import InvestSafely from "@/pages/invest-safely";
import PropertyDetail from "@/pages/property-detail";
import PrePurchaseWizard from "@/pages/pre-purchase-wizard";
import PlotCheckup from "@/pages/plot-checkup";
import LocalityOS from "@/pages/locality-os";
import PublicIntel from "@/pages/public-intel";
import MyWatchlist from "@/pages/my-watchlist";
import DataRefresh from "@/pages/data-refresh";
import Step1MarketIntel from "@/pages/step-1-market-intel";
import Step2FilterRisky from "@/pages/step-2-filter-risky";
import Step3SafetyCheck from "@/pages/step-3-safety-check";
import Step4DecisionReport from "@/pages/step-4-decision-report";
import PremiumVerification from "@/pages/premium-verification";
import FourStepSystem from "@/pages/four-step-system";
import StepComplete from "@/pages/step-complete";
import ImplementationHub from "@/pages/implementation-hub";

// Modals
import { FilterBasedSubscriptionModal } from "@/components/modals/FilterBasedSubscriptionModal";
import { CasualBrowserModal } from "@/components/modals/CasualBrowserModal";
import { ExitIntentModal } from "@/components/modals/ExitIntentModal";
import { useState, useEffect } from "react";

import BlogDetail from "@/pages/blog-detail";
import { PublicPropertySearch, PublicBlog } from "@/pages/public";
import SearchResults from "@/pages/search";
import LocalityGuides from "@/pages/localities";
import DharampethGuide from "@/pages/guides/dharampeth";
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
import GuidePlaceholder from "@/pages/guides/guide-placeholder";
import AwarenessDashboard from "@/pages/awareness-dashboard";
import AdminBlogGenerator from "@/pages/admin-blog-generator";
import BlogList from "@/pages/blog-list";
import NotFound from "@/pages/not-found";
import { useTracking } from "@/hooks/use-tracking";

function Router() {
  useTracking();
  return (
    <Switch>
      {/* Public Pages */}
      <Route path="/" component={PublicHome} />
      <Route path="/property/:id" component={PropertyDetail} />
      <Route path="/invest-safely" component={InvestSafely} />
      <Route path="/pre-purchase-wizard" component={PrePurchaseWizard} />
      <Route path="/plot-checkup" component={PlotCheckup} />
      <Route path="/locality/:id" component={LocalityOS} />
      <Route path="/my-watchlist" component={MyWatchlist} />
      <Route path="/data-refresh" component={DataRefresh} />
      <Route path="/step-1-market-intel" component={Step1MarketIntel} />
      <Route path="/step-2-filter-risky" component={Step2FilterRisky} />
      <Route path="/step-3-safety-check" component={Step3SafetyCheck} />
      <Route path="/step-4-decision-report" component={Step4DecisionReport} />
      <Route path="/premium-verification" component={PremiumVerification} />
      <Route path="/4-step-system" component={FourStepSystem} />
      <Route path="/step-complete" component={StepComplete} />
      <Route path="/implementation-hub" component={ImplementationHub} />
      
      <Route path="/public/intel" component={PublicIntel} />
      <Route path="/public/search" component={PublicPropertySearch} />
      <Route path="/search" component={SearchResults} />
      <Route path="/public/localities" component={LocalityGuides} />
      <Route path="/area-guide/dharampeth" component={DharampethGuide} />
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
      <Route path="/awareness" component={AwarenessDashboard} />
      <Route path="/public/blog" component={PublicBlog} />
      <Route path="/public/blog/:id" component={BlogDetail} />
      <Route path="/blog" component={BlogList} />
      <Route path="/blog/:slug" component={BlogDetail} />
      
      {/* Admin Dashboard - No Login Required */}
      <Route path="/admin">
        <AppShell>
          <Dashboard />
        </AppShell>
      </Route>
      
      <Route path="/admin/*">
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
          </Switch>
        </AppShell>
      </Route>

      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  // Mock logic to trigger modals for demonstration
  // In a real app, this would be driven by the tracking system logic
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showCasualModal, setShowCasualModal] = useState(false);
  const [showExitModal, setShowExitModal] = useState(false);

  // Demo triggers (just for showing they exist)
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).triggerFilterModal = () => setShowFilterModal(true);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).triggerCasualModal = () => setShowCasualModal(true);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).triggerExitModal = () => setShowExitModal(true);
    
    console.log("Lead Capture Modals ready. Open console and run `triggerFilterModal()` to test.");
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <I18nProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
          
          {/* Global Modals */}
          <FilterBasedSubscriptionModal open={showFilterModal} onOpenChange={setShowFilterModal} />
          <CasualBrowserModal open={showCasualModal} onOpenChange={setShowCasualModal} />
          <ExitIntentModal open={showExitModal} onOpenChange={setShowExitModal} />
        </TooltipProvider>
      </I18nProvider>
    </QueryClientProvider>
  );
}

export default App;
