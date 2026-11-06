import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { MessageSquare, Menu, ArrowRight } from "lucide-react";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { FloatingWhatsAppButton } from "@/components/conversion/FloatingWhatsAppButton";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { useTranslation } from "@/lib/i18n/context";

export function PublicLayout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const t = useTranslation();

  const navItems = [
    { label: t.nav.investSafely, href: "/4-step-system" },
  ];

  return (
    <div className="min-h-screen bg-background font-sans flex flex-col">
      <header className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <Link href="/">
            <div className="font-black text-2xl flex items-center gap-1 cursor-pointer tracking-tighter">
              <span className="text-primary italic text-3xl">Nagpur</span>Land
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 font-bold text-sm">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <div 
                  className={`cursor-pointer transition-colors ${
                    location === item.href 
                      ? "text-primary border-b-2 border-primary pb-1" 
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {item.label}
                </div>
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <LanguageSwitcher />
            <div className="text-right mr-2 hidden lg:block">
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none mb-1">{t.nav.expertAdvice}</p>
              <p className="text-[11px] font-medium text-slate-400 leading-none">{t.nav.flatOrPlot}</p>
            </div>
            <Button 
              size="sm" 
              className="bg-green-600 hover:bg-green-700 text-white gap-2 font-bold rounded-xl shadow-lg shadow-green-600/20"
              onClick={() => window.open("https://wa.me/918857801966?text=Hi%2C%20I%27m%20planning%20to%20buy%20in%20Nagpur.%20Type%3A%20[Flat/Plot]%2C%20Budget%3A%20[Amount]%2C%20Area%3A%20[Locality].%20Please%20share%20locality%20and%20risk%20insights.", "_blank")}
            >
              <MessageSquare className="h-4 w-4" />
              {t.nav.getFreeOpinion}
            </Button>
          </div>

          {/* Mobile Nav */}
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col gap-8 mt-10">
                <div className="flex justify-end">
                  <LanguageSwitcher />
                </div>
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
                <Button 
                  className="bg-green-600 hover:bg-green-700 text-white w-full font-bold"
                  onClick={() => window.open("https://wa.me/918857801966?text=Hi%2C%20I%27m%20interested%20in%20Nagpur%20real%20estate%20opportunities.", "_blank")}
                >
                  {t.nav.whatsappUs}
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      <main className="flex-1">
        {children}
      </main>

      <FloatingWhatsAppButton />

      {/* Desktop sticky sidebar */}
      <div className="fixed right-6 top-1/2 transform -translate-y-1/2 hidden md:block z-50">
        <Button 
          className="bg-green-600 hover:bg-green-700 text-white font-black h-16 px-8 rounded-2xl shadow-2xl shadow-green-600/30 whitespace-nowrap rotate-90 origin-right translate-x-12 hover:translate-x-10 transition-transform"
          onClick={() => window.open("https://wa.me/918857801966?text=Hi%20I%20need%20property%20advice", "_blank")}
        >
          💬 WhatsApp: Free Property Opinion
        </Button>
      </div>

      {/* Mobile sticky bottom bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-slate-950 border-t border-slate-800 p-4 md:hidden z-50 flex gap-3">
        <Button 
          className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold h-12 rounded-xl"
          onClick={() => window.open("https://wa.me/918857801966?text=Hi%20I%20need%20property%20advice", "_blank")}
        >
          💬 WhatsApp
        </Button>
        <div className="flex-1 relative">
          <Input 
            placeholder="Email for alerts" 
            className="h-12 bg-slate-900 border-slate-700 text-white rounded-xl pr-10"
          />
          <Button variant="ghost" className="absolute right-1 top-1 h-10 w-10 p-0 text-indigo-400">
            <ArrowRight className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <footer className="bg-slate-900 text-slate-300 py-16 mt-auto">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="font-black text-2xl text-white mb-4 italic">NagpurLand</div>
              <p className="text-sm leading-relaxed opacity-80">
                Empowering Nagpur's real estate buyers with data, transparency, and legal clarity.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Understand</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/public/localities"><span className="hover:text-white cursor-pointer">Locality Guides</span></Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Insights</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/step-1-market-intel"><span className="hover:text-white cursor-pointer">Market Intelligence</span></Link></li>
                <li><Link href="/public/blog"><span className="hover:text-white cursor-pointer">Strategy Blog</span></Link></li>
                <li><Link href="/public/localities"><span className="hover:text-white cursor-pointer">All Localities</span></Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Safety & Tools</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/step-3-safety-check"><span className="hover:text-white cursor-pointer">Legal Checkup</span></Link></li>
                <li><Link href="/4-step-system"><span className="hover:text-white cursor-pointer">4-Step System</span></Link></li>
                <li><Link href="/admin"><span className="hover:text-white cursor-pointer opacity-20">Admin Login</span></Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 text-center text-xs opacity-40">
            © 2026 NagpurLand.com. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
