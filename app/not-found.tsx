import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center px-4 py-16 text-center">
      <p className="text-sm font-semibold text-brand-primary uppercase tracking-widest">404</p>
      <h1 className="mt-3 text-3xl font-bold text-slate-900 md:text-4xl">Página no encontrada</h1>
      <p className="mt-4 max-w-xl text-slate-600">
        La página que buscas no existe o fue movida. Volvé al inicio para seguir navegando.
      </p>
      <div className="mt-8">
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-lg bg-brand-primary px-6 py-3 font-semibold text-white shadow-lg transition-colors hover:bg-brand-accent"
        >
          Ir al inicio
        </Link>
      </div>
    </div>
  );
}

