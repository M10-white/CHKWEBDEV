import type { Metadata } from 'next';
import './globals.css';
import Sidebar from '@/components/Sidebar';

export const metadata: Metadata = {
  title: 'CHKWEBDEV',
  description: 'Portfolio',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="bg-neutral-950 text-white">
        <Sidebar />
        <div
          style={{ paddingLeft: 'var(--sidebar-w, 56px)' }}
          className="transition-[padding] duration-300"
        >
          <div className="relative min-h-dvh bg-[#0b0b0b]">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
