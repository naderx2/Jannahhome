"use client";

import Link from "next/link";

export default function LocaleError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-[50vh] flex items-center justify-center px-4">
      <div className="card p-8 max-w-md w-full text-center">
        <h1 className="text-xl font-bold text-primary mb-2">Erreur de chargement</h1>
        <p className="text-muted text-sm mb-6">{error.message}</p>
        <div className="flex gap-3 justify-center">
          <button onClick={reset} className="btn btn-primary">
            Réessayer
          </button>
          <Link href="/fr" className="btn btn-outline">
            Accueil
          </Link>
        </div>
      </div>
    </div>
  );
}
