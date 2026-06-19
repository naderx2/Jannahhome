import { prisma } from "@/lib/prisma";
import ProductCard from "@/components/ProductCard";
import Hero from "@/components/Hero";
import { getDictionary } from "@/i18n/get-dictionary";
import { isValidLocale, type Locale } from "@/i18n/config";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale: localeParam } = await params;
  const locale = (isValidLocale(localeParam) ? localeParam : "fr") as Locale;
  const dict = await getDictionary(locale);

  const [products, promotions] = await Promise.all([
    prisma.product.findMany({
      where: { active: true },
      orderBy: { createdAt: "desc" },
    }),
    prisma.promotion.findMany({
      where: { active: true },
      orderBy: { createdAt: "desc" },
    }),
  ]);

  return (
    <>
      <Hero locale={locale} dict={dict} />

      <div className="max-w-6xl mx-auto px-4 py-12">
        {promotions.length > 0 && (
          <section className="mb-12">
            <h2 className="section-title">🎉 {dict.home.promotions}</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {promotions.map((promo) => (
                <div key={promo.id} className="promo-banner card p-6">
                  <h3 className="font-bold text-primary text-lg">{promo.title}</h3>
                  {promo.description && (
                    <p className="text-sm text-muted mt-2">{promo.description}</p>
                  )}
                  {promo.discountPct && (
                    <p className="text-sm font-bold mt-3 text-red-600">
                      -{promo.discountPct}% {dict.home.discount}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        <section id="products">
          <h2 className="section-title">{dict.home.ourProducts}</h2>
          {products.length === 0 ? (
            <p className="text-muted text-center py-16 card">{dict.home.noProducts}</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  locale={locale}
                  dict={dict}
                  product={product}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </>
  );
}
