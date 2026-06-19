"use client";

import { useState, useEffect, FormEvent } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";

type Product = {
  id: string;
  name: string;
  price: number;
  promoPrice: number | null;
};

type CommanderPageProps = {
  locale: Locale;
  dict: Dictionary;
};

export default function CommanderPage({ locale, dict }: CommanderPageProps) {
  const searchParams = useSearchParams();
  const preselectedId = searchParams.get("produit");

  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<
    { productId: string; quantity: number }[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/products")
      .then((r) => r.json())
      .then((data: Product[]) => {
        setProducts(data);
        if (preselectedId && data.some((p) => p.id === preselectedId)) {
          setSelectedProducts([{ productId: preselectedId, quantity: 1 }]);
        }
      });
  }, [preselectedId]);

  function toggleProduct(productId: string) {
    setSelectedProducts((prev) => {
      const exists = prev.find((p) => p.productId === productId);
      if (exists) {
        return prev.filter((p) => p.productId !== productId);
      }
      return [...prev, { productId, quantity: 1 }];
    });
  }

  function updateQuantity(productId: string, quantity: number) {
    setSelectedProducts((prev) =>
      prev.map((p) =>
        p.productId === productId ? { ...p, quantity: Math.max(1, quantity) } : p
      )
    );
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    if (selectedProducts.length === 0) {
      setError(dict.order.selectProduct);
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: formData.get("customerName"),
          email: formData.get("email"),
          phone: formData.get("phone"),
          address: formData.get("address"),
          tailleCouette: formData.get("tailleCouette"),
          tailleDrap: formData.get("tailleDrap"),
          notes: formData.get("notes"),
          items: selectedProducts,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || dict.order.orderError);
      }

      setSuccess(true);
      form.reset();
      setSelectedProducts([]);
    } catch (err) {
      setError(err instanceof Error ? err.message : dict.order.genericError);
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="max-w-lg mx-auto px-4 py-16 text-center">
        <div className="card p-8">
          <span className="text-5xl mb-4 block">✅</span>
          <h1 className="text-2xl font-bold mb-3 text-primary">{dict.order.successTitle}</h1>
          <p className="text-muted mb-6">{dict.order.successMessage}</p>
          <Link href={`/${locale}`} className="btn btn-primary">
            {dict.order.backHome}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-2 text-primary">{dict.order.title}</h1>
      <p className="text-muted mb-8">{dict.order.subtitle}</p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <section className="card p-6 space-y-4">
          <h2 className="font-semibold text-lg">{dict.order.contactInfo}</h2>

          <div>
            <label className="block text-sm font-medium mb-1">{dict.order.fullName}</label>
            <input
              name="customerName"
              required
              placeholder={dict.order.fullNamePlaceholder}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium mb-1">{dict.order.email}</label>
              <input
                name="email"
                type="email"
                required
                placeholder={dict.order.emailPlaceholder}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">{dict.order.phone}</label>
              <input
                name="phone"
                type="tel"
                required
                placeholder={dict.order.phonePlaceholder}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">{dict.order.address}</label>
            <textarea
              name="address"
              required
              rows={3}
              placeholder={dict.order.addressPlaceholder}
            />
          </div>
        </section>

        <section className="card p-6 space-y-4">
          <h2 className="font-semibold text-lg">{dict.order.sizes}</h2>

          <div>
            <label className="block text-sm font-medium mb-1">{dict.order.couetteSize}</label>
            <select name="tailleCouette" defaultValue="">
              <option value="">{dict.order.choose}</option>
              {dict.sizes.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">{dict.order.drapSize}</label>
            <select name="tailleDrap" defaultValue="">
              <option value="">{dict.order.choose}</option>
              {dict.sizes.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">{dict.order.notes}</label>
            <textarea
              name="notes"
              rows={2}
              placeholder={dict.order.notesPlaceholder}
            />
          </div>
        </section>

        <section className="card p-6 space-y-4">
          <h2 className="font-semibold text-lg">{dict.order.products}</h2>
          {products.length === 0 ? (
            <p className="text-muted text-sm">{dict.order.loadingProducts}</p>
          ) : (
            <div className="space-y-3">
              {products.map((product) => {
                const selected = selectedProducts.find(
                  (p) => p.productId === product.id
                );
                const price =
                  product.promoPrice != null && product.promoPrice < product.price
                    ? product.promoPrice
                    : product.price;

                return (
                  <div
                    key={product.id}
                    className={`flex items-center gap-3 p-3 rounded-lg border ${
                      selected ? "border-accent bg-[#fdfbf7]" : "border-border"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={!!selected}
                      onChange={() => toggleProduct(product.id)}
                      className="w-4 h-4"
                    />
                    <div className="flex-1">
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-primary font-semibold">
                        {price.toFixed(0)} TND
                      </p>
                    </div>
                    {selected && (
                      <input
                        type="number"
                        min={1}
                        value={selected.quantity}
                        onChange={(e) =>
                          updateQuantity(product.id, parseInt(e.target.value) || 1)
                        }
                        className="w-16 text-center"
                      />
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {error && (
          <p className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="btn btn-primary w-full py-3 disabled:opacity-50"
        >
          {loading ? dict.order.submitting : dict.order.submit}
        </button>
      </form>
    </div>
  );
}
