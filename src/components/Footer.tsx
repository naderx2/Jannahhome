import Link from "next/link";
import type { Dictionary } from "@/i18n/types";

type FooterProps = {
  dict: Dictionary;
};

export default function Footer({ dict }: FooterProps) {
  return (
    <footer className="mt-16 border-t border-border bg-white">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary to-primary-light flex items-center justify-center">
              <span className="text-white text-sm font-bold">JH</span>
            </div>
            <div>
              <p className="font-semibold text-primary">{dict.siteName}</p>
              <p className="text-xs text-muted">{dict.siteTagline}</p>
            </div>
          </div>
          <p className="text-sm text-muted text-center">
            © {new Date().getFullYear()} {dict.siteName} — {dict.footer.rights}
          </p>
          <Link
            href="/admin"
            className="text-sm text-muted hover:text-primary transition-colors border border-border px-4 py-2 rounded-lg hover:border-accent"
          >
            {dict.footer.ownerSpace}
          </Link>
        </div>
      </div>
    </footer>
  );
}
