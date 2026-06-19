import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";
import LanguageSwitcher from "@/components/LanguageSwitcher";

type HeaderProps = {
  locale: Locale;
  dict: Dictionary;
};

export default function Header({ locale, dict }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-border shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
        <Link href={`/${locale}`} className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary-light flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
            <span className="text-white text-lg font-bold">JH</span>
          </div>
          <div>
            <p className="font-bold text-lg text-primary leading-tight tracking-tight">
              {dict.siteName}
            </p>
            <p className="text-xs text-muted">{dict.siteTagline}</p>
          </div>
        </Link>

        <nav className="flex items-center gap-2 sm:gap-3">
          <Link
            href={`/${locale}`}
            className="hidden md:inline text-sm font-medium text-muted hover:text-primary transition-colors px-3 py-2 rounded-lg hover:bg-background"
          >
            {dict.nav.products}
          </Link>
          <LanguageSwitcher currentLocale={locale} />
          <Link
            href={`/${locale}/commander`}
            className="btn btn-primary text-sm py-2 px-4 whitespace-nowrap"
          >
            {dict.nav.order}
          </Link>
        </nav>
      </div>
    </header>
  );
}
