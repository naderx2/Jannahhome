"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-background">
      <div className="card p-8 max-w-md w-full text-center">
        <span className="text-4xl block mb-4">⚠️</span>
        <h1 className="text-xl font-bold text-primary mb-2">Une erreur est survenue</h1>
        <p className="text-muted text-sm mb-6">
          Désolé, quelque chose s&apos;est mal passé. Veuillez réessayer.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button onClick={reset} className="btn btn-primary">
            Réessayer
          </button>
          <Link href="/fr" className="btn btn-outline">
            Retour à l&apos;accueil
          </Link>
        </div>
      </div>
    </div>
  );
}
