import { Link, Redirect, useParams } from "wouter";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AreaRate } from "@/components/ui/area-rate";
import { AREA_CHECKS, findLocality } from "@/lib/localities";
import { STEPS } from "@/lib/step-navigation";

export default function LocalityOS() {
  const { id } = useParams();
  const locality = findLocality(id);
  if (!locality) return <Redirect to="/localities" />;

  return (
    <PublicLayout>
      <div className="bg-background">
        <div className="container mx-auto px-4 py-10 md:py-14 max-w-4xl">
          <Link href="/localities" className="text-sm text-primary underline" data-testid="area-back">All areas</Link>
          <h1 className="mt-4 text-4xl md:text-5xl font-bold text-primary" data-testid="area-title">{locality.name}</h1>

          <Card className="mt-8 p-6" data-testid="area-rate-card">
            <h2 className="text-lg font-bold text-primary mb-3">Asking rate</h2>
            <AreaRate locality={locality} />
            <p className="mt-4 text-sm text-muted-foreground">
              For a plot, compare the seller's price with the ready reckoner rate on the{" "}
              <a href="https://igrmaharashtra.gov.in" target="_blank" rel="noopener noreferrer" className="text-primary underline">IGR Maharashtra</a> website and with similar plots nearby.
            </p>
          </Card>

          <section className="mt-10" data-testid="area-checks">
            <h2 className="text-2xl font-bold text-primary mb-2">Check these on any plot here</h2>
            <p className="text-muted-foreground mb-6">The same checks apply in every area. Each one links to a short guide.</p>
            <div className="space-y-4">
              {AREA_CHECKS.map((check) => (
                <Card key={check.id} className="p-5" data-testid={`area-check-${check.id}`}>
                  <h3 className="font-semibold text-primary mb-1">{check.title}</h3>
                  <p className="text-sm text-muted-foreground">{check.body}</p>
                  <Link href={check.guide} className="mt-3 inline-block text-sm font-semibold text-primary underline">Read the guide</Link>
                </Card>
              ))}
            </div>
          </section>

          <section className="mt-10 rounded-xl border border-border bg-white p-6" data-testid="area-cta">
            <h2 className="text-xl font-bold text-primary mb-2">Have a plot in {locality.name}?</h2>
            <p className="text-muted-foreground mb-5">
              We don't publish a legal status for an area. Work through the 12 checks for your plot, then take the decision report to your own legal expert (advocate).
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href={STEPS[2].link}><Button className="w-full sm:w-auto" data-testid="area-checklist">Start the 12-point check</Button></Link>
              <Link href={STEPS[0].link}><Button variant="outline" className="w-full sm:w-auto">See the market snapshot</Button></Link>
            </div>
          </section>
        </div>
      </div>
    </PublicLayout>
  );
}
