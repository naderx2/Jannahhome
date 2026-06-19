import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatPrice, getEffectivePrice } from "@/lib/utils";
import { getDictionary } from "@/i18n/get-dictionary";
import { isValidLocale, type Locale } from "@/i18n/config";

type Props = {
  params: Promise<{ locale: string; id: string }>;
};

export default async function ProductPage({ params }: Props) {
  const { locale: localeParam, id } = await params;
  const locale = (isValidLocale(localeParam) ? localeParam : "fr") as Locale;
  const dict = await getDictionary(locale);

  const product = await prisma.product.findUnique({ where: { id } });

  if (!product || !product.active) notFound();

  const effectivePrice = getEffectivePrice(product);
  const hasPromo =
    product.promoPrice != null && product.promoPrice < product.price;
  const category =
    dict.categories[product.category as keyof typeof dict.categories] ??
    product.category;

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <Link
        href={`/${locale}`}
        className="inline-flex items-center gap-2 text-sm text-muted hover:text-primary mb-8 transition-colors"
      >
        {dict.product.back}
      </Link>

      <div className="grid gap-10 md:grid-cols-2">
        <div className="card overflow-hidden">
          <div className="aspect-square relative bg-[#f0ebe3]">
            {product.imageUrl ? (
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            ) : (
              <div className="product-image-fallback h-full">
                <span className="text-7xl opacity-40">🛏️</span>
              </div>
            )}
          </div>
          {product.videoUrl && (
            <div className="p-5 border-t border-border bg-background">
              <p className="text-sm font-semibold text-primary mb-3">{dict.product.video}</p>
              <video src={product.videoUrl} controls className="w-full rounded-xl" />
            </div>
          )}
        </div>

        <div className="flex flex-col">
          <span className="badge bg-accent-light/50 text-primary mb-4 w-fit">{category}</span>
          <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-foreground">{product.name}</h1>
          {product.description && (
            <p className="text-muted mb-8 leading-relaxed text-lg">{product.description}</p>
          )}

          <div className="card p-6 mb-8 bg-background border-accent-light">
            <div className="flex items-center gap-4 flex-wrap">
              <span className="text-4xl font-bold text-primary">
                {formatPrice(effectivePrice, locale)}
              </span>
              {hasPromo && (
                <>
                  <span className="text-xl text-muted line-through">
                    {formatPrice(product.price, locale)}
                  </span>
                  <span className="badge bg-red-500 text-white">{dict.product.promo}</span>
                </>
              )}
            </div>
          </div>

          <Link
            href={`/${locale}/commander?produit=${product.id}`}
            className="btn btn-primary w-full text-center py-4 text-lg mt-auto"
          >
            {dict.product.orderThis}
          </Link>
        </div>
      </div>
    </div>
  );
}
