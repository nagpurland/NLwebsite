import { useState, useEffect } from "react";
import { Link } from "wouter";
import { PROPERTIES, INTEL } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { MessageSquare, Phone, MapPin, Search, ArrowRight, Bell, Zap } from "lucide-react";

export function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background font-sans">
      <header className="border-b bg-card/50 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/">
            <div className="font-bold text-xl flex items-center gap-2 cursor-pointer">
              <span className="text-primary italic">Nagpur</span>Land
            </div>
          </Link>
          <nav className="hidden md:flex gap-6 text-sm font-medium">
          </nav>
          <div className="flex items-center gap-4">
            <div className="text-right mr-2 hidden lg:block">
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none mb-1">Expert Advice</p>
              <p className="text-[11px] font-medium text-slate-400 leading-none">Flat or Plot, Budget & Area</p>
            </div>
            <Button 
              size="sm" 
              className="bg-green-600 hover:bg-green-700 text-white gap-2 font-bold rounded-xl shadow-lg shadow-green-600/20"
              onClick={() => window.open("https://wa.me/918857801966?text=Hi%2C%20I%27m%20planning%20to%20buy%20in%20Nagpur.%20Type%3A%20[Flat/Plot]%2C%20Budget%3A%20[Amount]%2C%20Area%3A%20[Locality].%20Please%20share%20locality%20and%20risk%20insights.", "_blank")}
            >
              <MessageSquare className="h-4 w-4" />
              WhatsApp Us
            </Button>
          </div>
        </div>
      </header>
      <main>{children}</main>
      <footer className="bg-muted py-12 mt-20 border-t">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground text-sm">© 2026 NagpurLand.com - Your Nagpur Real Estate Guide</p>
        </div>
      </footer>
    </div>
  );
}

export function PublicPropertySearch() {
  return (
    <PublicLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mb-12">
          <h1 className="text-4xl font-bold mb-4 tracking-tight">Find your piece of Nagpur</h1>
          <p className="text-muted-foreground text-lg">Browse curated plots, flats, and villas across the Orange City.</p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {PROPERTIES.map(prop => (
            <Card key={prop.id} className="overflow-hidden hover:shadow-xl transition-shadow group">
              <div className="aspect-video bg-muted relative">
                <Badge className="absolute top-4 left-4 bg-accent text-white">{prop.property_type}</Badge>
                {prop.is_undervalued && (
                  <Badge className="absolute top-4 right-4 bg-green-600 text-white">Value Deal</Badge>
                )}
              </div>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl">{prop.project_name}</CardTitle>
                  <span className="font-bold text-lg">₹{(prop.price_total / 100000).toFixed(1)}L</span>
                </div>
                <div className="flex items-center text-muted-foreground text-sm gap-1">
                  <MapPin className="h-3 w-3" /> {prop.locality}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  Premium {prop.property_type} in the heart of {prop.locality}. Close to Metro and major IT hubs.
                </p>
              </CardContent>
              <CardFooter className="gap-2 border-t pt-4">
                <Button 
                  className="flex-1 bg-green-600 hover:bg-green-700"
                  onClick={() => window.open(`https://wa.me/918857801966?text=Hi%2C%20I%27m%20interested%20in%20property%20${prop.project_name}`, "_blank")}
                >
                  <MessageSquare className="h-4 w-4 mr-2" /> WhatsApp
                </Button>
                <Button variant="outline" className="flex-1">
                  <Phone className="h-4 w-4 mr-2" /> Call
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </PublicLayout>
  );
}

export function PublicBlog() {
  const [subscribed, setSubscribed] = useState(false);
  const [method, setMethod] = useState<"email" | "whatsapp">("email");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setSubscribed(true);
  };

  return (
    <PublicLayout>
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-black tracking-tight mb-2">Market Strategy Blog</h1>
            <p className="text-slate-500 font-bold italic text-lg">Logic-backed insights for the Nagpur property market.</p>
          </div>
          
          <div className="bg-card border-2 border-indigo-100 rounded-[2rem] p-8 shadow-xl max-w-sm w-full relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 blur-2xl -mr-12 -mt-12" />
            <h3 className="font-black text-xs mb-4 flex items-center gap-2 uppercase tracking-widest text-slate-400">
              <Zap className="h-4 w-4 text-indigo-600" />
              Join 1,200+ Strategists
            </h3>
            {subscribed ? (
              <div className="text-sm text-green-600 bg-green-50 p-3 rounded-md border border-green-100 animate-in fade-in zoom-in duration-300">
                Awesome! You're subscribed for {method} updates.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-3">
                <div className="flex bg-muted p-1 rounded-md">
                  <button 
                    type="button"
                    onClick={() => setMethod("email")}
                    className={cn("flex-1 py-1 text-xs rounded-sm transition-all", method === "email" ? "bg-white shadow-sm font-bold" : "text-muted-foreground")}
                  >
                    Email
                  </button>
                  <button 
                    type="button"
                    onClick={() => setMethod("whatsapp")}
                    className={cn("flex-1 py-1 text-xs rounded-sm transition-all", method === "whatsapp" ? "bg-white shadow-sm font-bold" : "text-muted-foreground")}
                  >
                    WhatsApp
                  </button>
                </div>
                <div className="flex gap-2">
                  <Input 
                    required
                    type={method === "email" ? "email" : "tel"} 
                    placeholder={method === "email" ? "your@email.com" : "+91 98765..."} 
                    className="h-9 text-sm"
                  />
                  <Button type="submit" size="sm" className="bg-accent hover:bg-accent/90">
                    Join
                  </Button>
                </div>
                <p className="text-[10px] text-muted-foreground">Join 1,200+ Nagpur investors.</p>
              </form>
            )}
          </div>
        </div>

        <div className="space-y-12">
          {INTEL.map(item => (
            <article key={item.id} className="group">
              <div className="flex gap-2 mb-3">
                {item.tags.map(tag => (
                  <Badge key={tag} variant="secondary" className="text-[10px] uppercase">{tag}</Badge>
                ))}
              </div>
              <h2 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                <Link href={`/public/blog/${item.id}`}>
                  <div className="cursor-pointer">{item.title}</div>
                </Link>
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">{item.summary}</p>
              <Link href={`/public/blog/${item.id}`}>
                <div className="inline-flex items-center text-sm font-semibold text-primary cursor-pointer">
                  Read Full Guide <ArrowRight className="h-4 w-4 ml-1" />
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </PublicLayout>
  );
}
