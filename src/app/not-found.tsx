import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-background">
      <div className="card p-8 max-w-md w-full text-center">
        <span className="text-5xl block mb-4">404</span>
        <h1 className="text-xl font-bold text-primary mb-2">Page introuvable</h1>
        <p className="text-muted text-sm mb-6">
          La page que vous cherchez n&apos;existe pas.
        </p>
        <Link href="/fr" className="btn btn-primary">
          Retour à l&apos;accueil
        </Link>
      </div>
    </div>
  );
}
