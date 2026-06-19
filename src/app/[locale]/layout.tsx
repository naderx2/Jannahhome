import { notFound } from "next/navigation";
import { isValidLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import LocaleProvider from "@/components/LocaleProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateStaticParams() {
  return [{ locale: "fr" }, { locale: "ar" }];
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale: localeParam } = await params;

  if (!isValidLocale(localeParam)) {
    notFound();
  }

  const locale = localeParam as Locale;
  const dict = await getDictionary(locale);

  return (
    <LocaleProvider locale={locale}>
      <div className="min-h-screen flex flex-col">
        <Header locale={locale} dict={dict} />
        <main className="flex-1">{children}</main>
        <Footer dict={dict} />
      </div>
    </LocaleProvider>
  );
}
