import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Portfolio CMS',
  description: 'Manage Spore Portfolio Projects',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-neutral-50`}>
        <div className="bg-white border-b sticky top-0 z-10 w-full mb-8">
            <div className="container mx-auto px-8 py-4 flex items-center justify-between max-w-5xl">
                <span className="font-black tracking-tight text-xl">SPORE / CMS</span>
                <span className="text-sm border bg-neutral-100 rounded-md px-2 py-1 font-mono text-neutral-500">v1.0</span>
            </div>
        </div>
        {children}
      </body>
    </html>
  );
}
