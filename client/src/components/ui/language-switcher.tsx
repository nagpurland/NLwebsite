import { useI18n } from "@/lib/i18n/context";
import { track } from "@/lib/track";
import { LANGUAGES } from "@/lib/i18n/site";

export function LanguageSwitcher({ dark }: { dark?: boolean }) {
  const { language, setLanguage, t } = useI18n();

  return (
    <div role="group" aria-label={t.nav.language} className={`inline-flex rounded-lg border p-0.5 print:hidden ${dark ? "rounded-full border-white/25 p-0" : "border-border bg-white"}`}>
      {LANGUAGES.map((lang) => (
        <button
          key={lang.code}
          type="button"
          lang={lang.code}
          aria-label={lang.label}
          aria-pressed={language === lang.code}
          onClick={() => {
            setLanguage(lang.code);
            track("language_change");
          }}
          className={`${dark ? "rounded-full px-[6px] py-[1px] text-[11px] font-medium" : "rounded-md px-2 md:px-3 py-1.5 md:py-1 text-xs font-semibold"} transition-colors ${
            language === lang.code
              ? dark ? "border border-white/90 text-white" : "bg-primary text-primary-foreground"
              : dark ? "border border-transparent text-white/90 hover:bg-white/10" : "text-slate-600 hover:bg-slate-100"
          }`}
          data-testid={dark ? undefined : `lang-${lang.code}`}
        >
          <span className="min-[700px]:hidden">{lang.short}</span>
          <span className="hidden min-[700px]:inline">{lang.label}</span>
        </button>
      ))}
    </div>
  );
}
