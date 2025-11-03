import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

// --- Component Imports ---
// We import the layout components we planned
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
// We import the SessionProvider to manage who is logged in
import SessionProvider from '@/components/providers/SessionProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Milestone Journey',
  description: 'Turn your goals into a motivated journey.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        {/* SessionProvider wraps the app to provide auth context */}
        <SessionProvider>
          <Navbar />
          <main className="flex-grow container mx-auto p-4 md:p-8">
            {children}
          </main>
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}