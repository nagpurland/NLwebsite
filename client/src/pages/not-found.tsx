import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { useTranslation } from "@/lib/i18n/context";

export default function NotFound() {
  const [location] = useLocation();
  const t = useTranslation();

  const content = (
    <div className="min-h-[60vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md text-center">
        <p className="font-display text-5xl text-accent-strong mb-4">404</p>
        <h1 className="text-3xl text-primary mb-3">{t.notFound.title}</h1>
        <p className="text-slate-600 mb-6">{t.notFound.body}</p>
        <Link href={location.startsWith("/admin") ? "/admin" : "/"}>
          <Button>{t.notFound.home}</Button>
        </Link>
      </div>
    </div>
  );

  // Admin pages already sit inside their own layout.
  return location.startsWith("/admin") ? content : <PublicLayout>{content}</PublicLayout>;
}
