import { Link } from "wouter";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AreaRate } from "@/components/ui/area-rate";
import { LOCALITIES } from "@/lib/localities";
import { STEPS } from "@/lib/step-navigation";

export default function LocalityGuides() {
  return (
    <PublicLayout>
      <section className="bg-primary text-primary-foreground" data-testid="section-areas-hero">
        <div className="container mx-auto px-4 py-14 md:py-20 text-center">
          <p className="text-sm font-semibold tracking-widest uppercase text-accent mb-4">Area guide</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-primary-foreground">Check the area before you check the plot</h1>
          <p className="max-w-2xl mx-auto text-lg text-primary-foreground/80">
            A dated asking rate where we have a source, and the checks to run on any plot in these areas.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <p className="mb-8 max-w-3xl text-muted-foreground" data-testid="areas-note">
          Rates are apartment asking prices from a third-party website, not NagpurLand's own data, and not plot rates or sale prices. We show no legal status, listings or growth forecast for an area, because those depend on the plot.
        </p>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {LOCALITIES.map((locality) => (
            <Card key={locality.id} className="p-6 flex flex-col" data-testid={`area-card-${locality.id}`}>
              <h2 className="text-xl font-bold text-primary mb-4">{locality.name}</h2>
              <div className="flex-1 mb-6">
                <AreaRate locality={locality} />
              </div>
              <Link href={`/locality/${locality.id}`}>
                <Button variant="outline" className="w-full" data-testid={`area-open-${locality.id}`}>See area checks</Button>
              </Link>
            </Card>
          ))}
        </div>

        <section className="mt-12 rounded-xl border border-border bg-background p-6 md:p-8" data-testid="areas-cta">
          <h2 className="text-xl md:text-2xl font-bold text-primary mb-2">Already have a plot in mind?</h2>
          <p className="text-muted-foreground mb-6">Work through the 12 paper and site checks, then take the decision report to your own legal expert (advocate).</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href={STEPS[2].link}><Button className="w-full sm:w-auto" data-testid="areas-checklist">Start the 12-point check</Button></Link>
            <Link href="/contact"><Button variant="outline" className="w-full sm:w-auto" data-testid="areas-book">Book a legal expert (advocate)</Button></Link>
          </div>
        </section>
      </div>
    </PublicLayout>
  );
}
