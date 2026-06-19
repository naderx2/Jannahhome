"use client";

import { useState, useEffect, FormEvent } from "react";
import Image from "next/image";
import { CATEGORY_LABELS, formatPrice } from "@/lib/utils";

type Product = {
  id: string;
  name: string;
  description: string | null;
  category: string;
  price: number;
  promoPrice: number | null;
  imageUrl: string | null;
  videoUrl: string | null;
  active: boolean;
};

const emptyForm = {
  name: "",
  description: "",
  category: "COUETTE",
  price: "",
  promoPrice: "",
  imageUrl: "",
  videoUrl: "",
};

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    const res = await fetch("/api/products?all=true");
    const data = await res.json();
    setProducts(data);
    setLoading(false);
  }

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const fd = new FormData();
    fd.append("file", file);

    const res = await fetch("/api/upload", { method: "POST", body: fd });
    const data = await res.json();

    if (data.url) {
      const isVideo = file.type.startsWith("video/");
      setForm((f) => ({
        ...f,
        ...(isVideo ? { videoUrl: data.url } : { imageUrl: data.url }),
      }));
    }
    setUploading(false);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const payload = { ...form, ...(editingId && { id: editingId }) };
    const res = await fetch("/api/products", {
      method: editingId ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      setForm(emptyForm);
      setEditingId(null);
      loadProducts();
    }
  }

  function startEdit(product: Product) {
    setEditingId(product.id);
    setForm({
      name: product.name,
      description: product.description || "",
      category: product.category,
      price: String(product.price),
      promoPrice: product.promoPrice ? String(product.promoPrice) : "",
      imageUrl: product.imageUrl || "",
      videoUrl: product.videoUrl || "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function deleteProduct(id: string) {
    if (!confirm("Supprimer ce produit ?")) return;
    await fetch(`/api/products?id=${id}`, { method: "DELETE" });
    loadProducts();
  }

  if (loading) {
    return <div className="p-10 text-center text-muted">Chargement...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6 text-primary">Produits</h1>

      <form onSubmit={handleSubmit} className="card p-6 mb-8 space-y-4">
        <h2 className="font-semibold">
          {editingId ? "Modifier le produit" : "Ajouter un produit"}
        </h2>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium mb-1">Nom *</label>
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Catégorie *</label>
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            >
              <option value="COUETTE">Matla couette</option>
              <option value="DRAP">Drap de lit</option>
              <option value="PARURE">Parure complète</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            rows={2}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium mb-1">Prix (TND) *</label>
            <input
              type="number"
              step="0.01"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Prix promo (TND)</label>
            <input
              type="number"
              step="0.01"
              value={form.promoPrice}
              onChange={(e) => setForm({ ...form, promoPrice: e.target.value })}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Image ou vidéo
          </label>
          <input type="file" accept="image/*,video/*" onChange={handleUpload} />
          {uploading && <p className="text-sm text-muted mt-1">Upload en cours...</p>}
          {form.imageUrl && (
            <p className="text-sm text-green-700 mt-1">Image : {form.imageUrl}</p>
          )}
          {form.videoUrl && (
            <p className="text-sm text-green-700 mt-1">Vidéo : {form.videoUrl}</p>
          )}
        </div>

        <div className="flex gap-3">
          <button type="submit" className="btn btn-primary">
            {editingId ? "Enregistrer" : "Ajouter"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={() => {
                setEditingId(null);
                setForm(emptyForm);
              }}
              className="btn btn-outline"
            >
              Annuler
            </button>
          )}
        </div>
      </form>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <div key={product.id} className="card overflow-hidden">
            <div className="aspect-video bg-[#f0ebe3] relative">
              {product.imageUrl ? (
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="300px"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-4xl">🛏️</div>
              )}
            </div>
            <div className="p-4">
              <span className="badge bg-[#f0ebe3] text-primary text-xs">
                {CATEGORY_LABELS[product.category]}
              </span>
              <h3 className="font-semibold mt-2">{product.name}</h3>
              <p className="text-primary font-bold">
                {formatPrice(product.price)}
                {product.promoPrice && (
                  <span className="text-sm text-red-600 ml-2">
                    Promo: {formatPrice(product.promoPrice)}
                  </span>
                )}
              </p>
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => startEdit(product)}
                  className="btn btn-outline text-xs py-1 px-2"
                >
                  Modifier
                </button>
                <button
                  onClick={() => deleteProduct(product.id)}
                  className="btn btn-outline text-xs py-1 px-2 text-red-600 border-red-200"
                >
                  Supprimer
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
