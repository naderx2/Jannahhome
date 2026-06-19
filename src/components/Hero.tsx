import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";

type HeroProps = {
  locale: Locale;
  dict: Dictionary;
};

export default function Hero({ locale, dict }: HeroProps) {
  return (
    <section className="hero py-16 sm:py-20 px-4">
      <div className="max-w-6xl mx-auto relative z-10 text-center">
        <p className="text-accent-light text-sm font-semibold tracking-widest uppercase mb-4">
          {dict.siteName}
        </p>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-5 leading-tight max-w-3xl mx-auto">
          {dict.home.title}
        </h1>
        <p className="text-white/85 text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
          {dict.home.subtitle}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href={`/${locale}/commander`} className="btn btn-accent px-8 py-3">
            {dict.nav.order}
          </Link>
          <Link
            href={`/${locale}#products`}
            className="btn border-2 border-white/40 text-white hover:bg-white/10 px-8 py-3"
          >
            {dict.nav.products}
          </Link>
        </div>
      </div>
    </section>
  );
}
