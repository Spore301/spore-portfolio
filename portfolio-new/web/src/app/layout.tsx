import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { cn } from "@/lib/utils";
import LenisProvider from "@/components/LenisProvider";

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-sans'
});

export const metadata: Metadata = {
  title: 'Debargha Bandyopadhyay - AI Product Designer',
  description: 'Portfolio of Debargha Bandyopadhyay, an AI-focused Product Designer and Technical Prototyper.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={cn(geist.variable)} suppressHydrationWarning>
      <body className="bg-white text-black antialiased selection:bg-black selection:text-white" suppressHydrationWarning>
        <LenisProvider>
          <Navbar />
          <main className="min-h-screen pt-24">
            {children}
          </main>
          <Footer />
        </LenisProvider>
      </body>
    </html>
  )
}
