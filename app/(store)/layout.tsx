
import { ClerkProvider } from '@clerk/nextjs'
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import '../globals.css'
import Header from '@/components/sections/Header'
import { SanityLive } from '@/sanity/lib/live'
import { Navbar } from '@/components/sections/Navbar'

import Footer from '@/components/sections/Footer'
import { Toaster } from '@/components/ui/sonner'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Scentora Perfumes',
  description: 'A Full Stack Ecommerce Store Created By - Mahedy Hasan',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider dynamic>
      <html lang='en' suppressHydrationWarning>
        <body
          suppressHydrationWarning
          className={`${geistSans.variable} ${geistMono.variable} antialiased `}
        >
          <main className='w-full'>
            <Header />
            <Navbar />
            {children}
            <Toaster richColors position='top-center' />
            <Footer />
            <SanityLive />
          </main>
        </body>
      </html>
    </ClerkProvider>
  )
}
