// app/layout.tsx
import type { Metadata } from 'next'
import './globals.css'
import { SpeedInsights } from "@vercel/speed-insights/next";
import Navbar from '../components/Navbar'
import Footer from '@/components/Footer'
import ClientProviders from './Clientprovider'

export const metadata: Metadata = {
  title: 'Innovoltics',
  description: '3D printing and Electronic Prototypes',
  icons: {
    icon: '/images/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ClientProviders>
          <Navbar />
          {children}
          <SpeedInsights />
          <Footer />
        </ClientProviders>
      </body>
    </html>
  )
}
