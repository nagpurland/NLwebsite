import { useState, useEffect } from "react";
import { useLocation, Link } from "wouter";
import { PublicLayout } from "@/pages/public";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search as SearchIcon, MapPin, TrendingUp, Info, ExternalLink, MessageSquare, Phone } from "lucide-react";
import { PROPERTIES, INTEL } from "@/lib/mockData";

// Simple client-side query parser for mockup
const parseQuery = (q: string) => {
  const query = q.toLowerCase();
  let locality = "Nagpur";
  let type = "Property";
  
  if (query.includes("mihan")) locality = "MIHAN";
  else if (query.includes("besa")) locality = "Besa";
  else if (query.includes("wardha")) locality = "Wardha Road";
  
  if (query.includes("plot") || query.includes("land")) type = "Plots";
  else if (query.includes("flat") || query.includes("apartment")) type = "Flats";
  
  return { locality, type, original: q };
};

export default function SearchResults() {
  const [location] = useLocation();
  const searchParams = new URLSearchParams(window.location.search);
  const q = searchParams.get("q") || "";
  const { locality, type } = parseQuery(q);

  // Filter matching data
  const matchingProperties = PROPERTIES.filter(p => 
    p.locality.toLowerCase().includes(locality.toLowerCase()) && 
    (type === "Property" || p.property_type.toLowerCase().includes(type.toLowerCase().slice(0, -1)))
  ).sort((a, b) => (a.is_undervalued === b.is_undervalued ? 0 : a.is_undervalued ? -1 : 1));

  const relevantIntel = INTEL.filter(i => 
    i.tags.some(t => t.toLowerCase().includes(locality.toLowerCase()))
  );

  return (
    <PublicLayout>
      <div className="bg-primary/5 border-b py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold tracking-tight mb-4">
              {locality} {type} – Live Intelligence & Listings
            </h1>
            <p className="text-muted-foreground text-lg mb-8">
              Analysis for "{q}" - found {matchingProperties.length} active opportunities.
            </p>
            <div className="flex gap-2">
              <Input defaultValue={q} className="bg-background" />
              <Button>Search</Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Results */}
          <div className="lg:col-span-2 space-y-8">
            <section>
              <div className="flex items-center gap-2 mb-6">
                <TrendingUp className="text-accent h-5 w-5" />
                <h2 className="text-2xl font-bold">Recommended Listings</h2>
              </div>
              <div className="grid gap-6">
                {matchingProperties.map(prop => (
                  <Card key={prop.id} className="flex flex-col md:flex-row overflow-hidden hover:shadow-lg transition-shadow group">
                    <div className="md:w-64 bg-muted relative aspect-video md:aspect-auto">
                      {prop.is_undervalued && (
                        <Badge className="absolute top-2 left-2 bg-green-600 text-white">Value Deal</Badge>
                      )}
                    </div>
                    <div className="flex-1 p-6">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-bold text-xl group-hover:text-primary transition-colors">{prop.project_name}</h3>
                          <p className="text-muted-foreground text-sm flex items-center gap-1">
                            <MapPin className="h-3 w-3" /> {prop.locality}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-xl">₹{(prop.price_total / 100000).toFixed(1)}L</div>
                          <div className="text-xs text-muted-foreground font-mono">₹{prop.price_psf}/sq.ft</div>
                        </div>
                      </div>
                      <div className="flex gap-2 mb-4">
                        <Badge variant="secondary" className="font-normal text-xs">{prop.property_type}</Badge>
                        <Badge variant="outline" className="font-normal text-xs">{prop.area} {prop.unit}</Badge>
                      </div>
                      <div className="flex gap-2">
                        <Button className="bg-green-600 hover:bg-green-700 h-9" data-track-event="click_whatsapp" data-track-metadata={JSON.stringify({ id: prop.id })}>
                          <MessageSquare className="h-4 w-4 mr-2" /> WhatsApp
                        </Button>
                        <Button variant="outline" className="h-9" data-track-event="click_call">
                          <Phone className="h-4 w-4 mr-2" /> Call
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar Intelligence */}
          <div className="space-y-8">
            <section className="bg-card border rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Info className="text-primary h-5 w-5" />
                <h2 className="font-bold">Locality Intelligence</h2>
              </div>
              <div className="space-y-6">
                <div className="pb-4 border-b">
                  <div className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Market Sentiment</div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold">Bullish</span>
                    <span className="text-green-600 text-xs font-medium">↑ 12.4% YoY</span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="text-xs text-muted-foreground uppercase tracking-wider">Latest Local Updates</div>
                  {relevantIntel.map(item => (
                    <div key={item.id} className="group">
                      <h4 className="text-sm font-semibold mb-1 group-hover:text-primary transition-colors">
                        <div className="cursor-pointer" data-track-event="click_external_article">{item.title}</div>
                      </h4>
                      <p className="text-xs text-muted-foreground line-clamp-2 mb-2">{item.summary}</p>
                      <div className="text-[10px] flex items-center gap-1 text-primary font-bold hover:underline cursor-pointer">
                        VIEW ORIGINAL <ExternalLink className="h-2 w-2" />
                      </div>
                    </div>
                  ))}
                  {relevantIntel.length === 0 && (
                    <p className="text-xs text-muted-foreground italic">No specific news for this area today. General Nagpur market is stable.</p>
                  )}
                </div>
              </div>
            </section>

            <Card className="bg-primary text-primary-foreground overflow-hidden border-none shadow-xl">
              <CardHeader>
                <CardTitle className="text-lg">Need Expert Advice?</CardTitle>
                <CardDescription className="text-primary-foreground/80">Our Nagpur land analysts can help you verify documents for MIHAN projects.</CardDescription>
              </CardHeader>
              <CardFooter>
                <Button className="w-full bg-accent text-white hover:bg-accent/90 border-none" data-track-event="request_visit">
                  Talk to an Analyst
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
