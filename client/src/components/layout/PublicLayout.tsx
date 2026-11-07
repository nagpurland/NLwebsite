import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Instagram, Languages, Menu, Scale } from "lucide-react";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { FloatingWhatsAppButton } from "@/components/conversion/FloatingWhatsAppButton";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { SOCIAL_LINKS, whatsappUrl } from "@/lib/brand";
import { useI18n } from "@/lib/i18n/context";
import { STEPS } from "@/lib/step-navigation";

// Legal pages and guides wait for advocate review before they are translated.
const ENGLISH_ONLY = [
  /^\/guide\//, /^\/privacy$/, /^\/terms$/,
  /^\/(localities|public|locality|property|find-properties|search|pre-purchase-wizard|premium-verification|step-complete|my-watchlist|area-guide|awareness|blog)(\/|$)/,
];

// Shows the icon as in the design, and links it only once a real address is set.
function SocialIcon({ href, label, children }: { href?: string; label: string; children: React.ReactNode }) {
  return href ? (
    <a href={href} aria-label={label} target="_blank" rel="noopener noreferrer">{children}</a>
  ) : (
    <span aria-hidden="true">{children}</span>
  );
}

export function PublicLayout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language, t } = useI18n();

  const navItems = [
    { label: t.nav.steps, href: "/4-step-system" },
    { label: t.nav.checklist, href: STEPS[2].link },
    { label: t.nav.learn, href: "/learn" },
    { label: t.nav.contact, href: "/contact" },
  ];

  const openWhatsApp = () => window.open(whatsappUrl(t.nav.whatsappMessage), "_blank", "noopener");

  return (
    <div className={`site min-h-screen bg-background font-sans flex flex-col`}>
      <header className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50 print:hidden">
        <div className="container mx-auto px-3 sm:px-4 h-16 md:h-20 flex items-center justify-between gap-2 sm:gap-3">
          <Link href="/">
            <div className="font-black text-lg sm:text-xl md:text-2xl flex items-center gap-1 cursor-pointer tracking-tighter" data-testid="site-logo">
              <span className="text-primary italic text-xl sm:text-2xl md:text-3xl">Nagpur</span>Land
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 font-bold text-sm">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`transition-colors ${location === item.href ? "text-primary border-b-2 border-primary pb-1" : "text-muted-foreground hover:text-foreground"}`}
                data-testid={item.href === "/learn" ? "nav-learn" : undefined}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1 sm:gap-2 md:gap-4">
            <LanguageSwitcher />
            {/* Mobile Nav */}
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden" aria-label={t.nav.openMenu}>
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="site flex flex-col gap-8 mt-10">
                  {navItems.map((item) => (
                    <Link key={item.href} href={item.href}>
                      <div
                        className="text-xl font-bold text-foreground hover:text-primary cursor-pointer"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.label}
                      </div>
                    </Link>
                  ))}
                  <Button className="bg-green-600 hover:bg-green-700 text-white w-full font-bold" onClick={openWhatsApp} data-event="whatsapp_click">
                    {t.nav.whatsapp}
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {language !== "en" && ENGLISH_ONLY.some((page) => page.test(location)) && (
          <div className="bg-primary/5 border-b border-border print:hidden" role="note" data-testid="english-only-notice">
            <div className="container mx-auto px-4 py-3 flex gap-3 text-sm text-primary">
              <Languages className="h-5 w-5 shrink-0" />
              <p>{t.notices.englishOnly}</p>
            </div>
          </div>
        )}
        {location.startsWith("/guide/") && (
          <div className="bg-amber-50 border-b border-amber-200" role="note" data-testid="guide-disclaimer">
            <div className="container mx-auto px-4 py-3 flex gap-3 text-sm text-amber-900">
              <Scale className="h-5 w-5 shrink-0" />
              <p>{t.notices.guide}</p>
            </div>
          </div>
        )}
        {children}
      </main>

      {location !== "/contact" && <FloatingWhatsAppButton hideOnPhone={location === "/plot-checkup"} />}


      <footer className="site-footer print:hidden" data-testid="site-footer">
        <div className="sf-top">
          <img src="/home/footer-dome.webp" alt="" className="sf-dome" data-testid="footer-dome" />
          <img src="/home/footer-branch.webp" alt="" className="sf-branch" data-testid="footer-branch" />
          <div className="sf-grid">
            <div className="sf-brand">
              <div className="sf-logo">
                Nagpur<span>Land</span>
              </div>
              <p className="sf-tagline">{t.footer.tagline}</p>
            </div>
            <ul className="sf-links">
              <li><Link href="/4-step-system">{t.nav.steps}</Link></li>
              <li><Link href={STEPS[2].link}>{t.nav.checklist}</Link></li>
              <li><Link href="/learn" data-testid="footer-learn">{t.nav.learn}</Link></li>
              <li><Link href="/contact">{t.nav.contact}</Link></li>
            </ul>
            <ul className="sf-links">
              <li><Link href="/privacy">{t.footer.privacy}</Link></li>
              <li><Link href="/terms">{t.footer.terms}</Link></li>
              <li><Link href="/for-agents" data-testid="footer-agents">{t.footer.agents}</Link></li>
            </ul>
            <div className="sf-side">
              <LanguageSwitcher dark />
              <span className="sf-social" data-testid="footer-social">
                <SocialIcon href={SOCIAL_LINKS.youtube} label="YouTube">
                  <svg viewBox="0 0 24 24" fill="white"><rect x="1" y="4.5" width="22" height="15" rx="4.5" /><path d="M10 8.8l5.5 3.2-5.5 3.2z" fill="#002b4c" /></svg>
                </SocialIcon>
                <SocialIcon href={SOCIAL_LINKS.instagram} label="Instagram">
                  <Instagram className="text-white" />
                </SocialIcon>
                <SocialIcon href={SOCIAL_LINKS.linkedin} label="LinkedIn">
                  <svg viewBox="0 0 24 24" fill="white"><rect x="1" y="1" width="22" height="22" rx="3" /><path d="M6 10h3v8H6zM7.5 5.6a1.7 1.7 0 110 3.4 1.7 1.7 0 010-3.4zM11 10h2.8v1.2c.5-.8 1.5-1.4 2.7-1.4 2.3 0 3.5 1.4 3.5 4V18h-3v-3.8c0-1.1-.5-1.8-1.5-1.8S14 13.1 14 14.2V18h-3z" fill="#002b4c" /></svg>
                </SocialIcon>
              </span>
            </div>
          </div>
        </div>
        <div className="sf-bottom">
          <div className="sf-bottom-row">
            <span>© 2026 NagpurLand. {t.footer.rights}</span>
            <span className="sf-place">
              <span className="sf-location">
                <svg viewBox="0 0 24 24" fill="white"><path fillRule="evenodd" d="M12 1.5a8 8 0 00-8 8c0 5.6 8 13 8 13s8-7.4 8-13a8 8 0 00-8-8zm0 11a3 3 0 110-6 3 3 0 010 6z" /></svg>
                {t.footer.location}
              </span>
              <span className="sf-made">{t.footer.made}</span>
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
