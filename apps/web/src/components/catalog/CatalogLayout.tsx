import type { ReactNode } from 'react';

type CatalogLayoutProps = { title: string; children: ReactNode };

export default function CatalogLayout({ title, children }: CatalogLayoutProps) {
  return (
    <main aria-label={title} className="min-h-screen bg-paper p-8 text-ink">
      {children}
    </main>
  );
}
