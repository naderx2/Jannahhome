import Link from "next/link";
import Image from "next/image";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";
import { formatPrice, getEffectivePrice } from "@/lib/utils";

type ProductCardProps = {
  locale: Locale;
  dict: Dictionary;
  product: {
    id: string;
    name: string;
    description: string | null;
    category: string;
    price: number;
    promoPrice: number | null;
    imageUrl: string | null;
  };
};

export default function ProductCard({ locale, dict, product }: ProductCardProps) {
  const effectivePrice = getEffectivePrice(product);
  const hasPromo = product.promoPrice != null && product.promoPrice < product.price;
  const category =
    dict.categories[product.category as keyof typeof dict.categories] ?? product.category;

  return (
    <article className="card group">
      <Link href={`/${locale}/produit/${product.id}`}>
        <div className="aspect-[4/3] relative overflow-hidden bg-[#f0ebe3]">
          {product.imageUrl ? (
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          ) : (
            <div className="product-image-fallback h-full">
              <span className="text-5xl opacity-40">🛏️</span>
            </div>
          )}
          {hasPromo && (
            <span className="absolute top-3 start-3 badge bg-red-500 text-white shadow-md">
              {dict.product.promo}
            </span>
          )}
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
        <div className="p-5">
          <span className="badge bg-accent-light/40 text-primary mb-2">{category}</span>
          <h3 className="font-semibold text-lg mb-1.5 text-foreground group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          {product.description && (
            <p className="text-sm text-muted line-clamp-2 mb-4">{product.description}</p>
          )}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-bold text-primary text-xl">
                {formatPrice(effectivePrice, locale)}
              </span>
              {hasPromo && (
                <span className="text-sm text-muted line-through">
                  {formatPrice(product.price, locale)}
                </span>
              )}
            </div>
            <span className="text-xs text-accent font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
              →
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
