import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { ChevronDown, Instagram, Languages, Menu, MessageSquare, Scale, Search } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { FloatingWhatsAppButton } from "@/components/conversion/FloatingWhatsAppButton";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { SOCIAL_LINKS, whatsappUrl } from "@/lib/brand";
import { useI18n } from "@/lib/i18n/context";
import { STEPS } from "@/lib/step-navigation";

// Legal pages and guides wait for advocate review before they are translated.
const ENGLISH_ONLY = [/^\/guide\//, /^\/privacy$/, /^\/terms$/, /^\/invest-safely$/];

// Shows the icon as in the design, and links it only once a real address is set.
function SocialIcon({ href, label, children }: { href?: string; label: string; children: React.ReactNode }) {
  return href ? (
    <a href={href} aria-label={label} target="_blank" rel="noopener noreferrer">{children}</a>
  ) : (
    <span aria-hidden="true">{children}</span>
  );
}

export function PublicLayout({ children }: { children: React.ReactNode }) {
  const [location, navigate] = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language, t } = useI18n();
  const isHome = location === "/";

  const navMenus = [
    {
      label: t.nav.learn,
      items: [
        { label: t.nav.buyingGuide, href: "/invest-safely" },
        { label: t.nav.titleGuide, href: "/guide/title-verification" },
        { label: t.nav.courtGuide, href: "/guide/litigation-search" },
      ],
    },
  ];

  const navItems = [
    { label: t.nav.steps, href: "/4-step-system" },
    { label: t.nav.checklist, href: STEPS[2].link },
    { label: t.nav.buyingGuide, href: "/invest-safely" },
    { label: t.nav.contact, href: "/contact" },
  ];

  const openWhatsApp = () => window.open(whatsappUrl(t.nav.whatsappMessage), "_blank", "noopener");

  return (
    <div className={`site min-h-screen bg-background font-sans flex flex-col ${isHome ? "site-home" : ""}`}>
      <header className="sh print:hidden">
        <div className="sh-in">
          <Link href="/">
            <div className="sh-logo" data-testid="site-logo">
              <span className="sh-mark">
                <img src="/home/logo-mark.webp" alt="" />
              </span>
              <span className="sh-name">
                <span className="sh-word">
                  Nagpur<span>Land</span>
                </span>
                <span className="sh-tag">{t.nav.tagline}</span>
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="sh-nav">
            <Link href="/4-step-system" className={location === "/4-step-system" ? "text-primary" : "hover:text-primary"}>
              {t.nav.steps}
            </Link>
            <Link href={STEPS[2].link} className={location === STEPS[2].link ? "text-primary" : "hover:text-primary"}>
              {t.nav.checklist}
            </Link>
            {navMenus.map((menu) => (
              <DropdownMenu key={menu.label}>
                <DropdownMenuTrigger className="flex items-center gap-1 outline-none hover:text-primary" data-testid={`nav-menu-${menu.label}`}>
                  {menu.label}
                  <ChevronDown />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  {menu.items.map((item) => (
                    <DropdownMenuItem key={item.href} className="cursor-pointer" onSelect={() => navigate(item.href)}>
                      {item.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ))}
            <Link href="/contact" className={location === "/contact" ? "text-primary" : "hover:text-primary"}>
              {t.nav.contact}
            </Link>
          </nav>

          <div className="sh-tools">
            <LanguageSwitcher />
            {/* Mobile Nav */}
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="sh-menu" aria-label={t.nav.openMenu}>
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="site flex flex-col gap-8 mt-10">
                  {navItems.map((item) => (
                    <Link key={item.href} href={item.href}>
                      <div
                        className="text-xl font-semibold text-foreground hover:text-primary cursor-pointer"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.label}
                      </div>
                    </Link>
                  ))}
                  <Button className="bg-green-700 hover:bg-green-800 text-white w-full font-semibold" onClick={openWhatsApp} data-event="whatsapp_click">
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

      <FloatingWhatsAppButton hideOnPhone={isHome || location === "/plot-checkup" || location === "/contact"} />

      {isHome && (
        <div className="hd-phone-bar print:hidden" data-testid="phone-action-bar">
          <Link href="/plot-checkup" className="hd-phone-check" data-event="sticky_check_click" data-testid="sticky-check">
            <Search />
            {t.home.primary}
          </Link>
          <button type="button" className="hd-phone-whatsapp" onClick={openWhatsApp} data-event="whatsapp_click" data-testid="sticky-whatsapp">
            <MessageSquare />
            {t.nav.whatsappShort}
          </button>
        </div>
      )}

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
              <li><Link href="/invest-safely">{t.nav.learn}</Link></li>
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
