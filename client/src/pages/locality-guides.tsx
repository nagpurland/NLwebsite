import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { useTranslation } from "@/lib/i18n/context";

// Holding page. The older localities.tsx shows sample data, so it stays off the site.
export default function LocalityGuides() {
  const s = useTranslation().localities;
  return (
    <PublicLayout>
      <div className="py-16 min-h-screen">
        <div className="container mx-auto px-4 max-w-2xl">
          <h1 className="text-4xl md:text-5xl text-primary mb-4">{s.title}</h1>
          <p className="text-slate-600 text-lg mb-8">{s.intro}</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/step-1-market-intel"><Button className="w-full sm:w-auto">{s.rates}</Button></Link>
            <Link href="/step-3-safety-check"><Button variant="outline" className="w-full sm:w-auto">{s.checklist}</Button></Link>
            <Link href="/plot-checkup"><Button variant="outline" className="w-full sm:w-auto">{s.ask}</Button></Link>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
