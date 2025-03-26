import type { Metadata } from 'next'
import './globals.css'


export const metadata: Metadata = {
  title: 'Innovoltics',
  description: '3d printing and Electronic Prototypes'  ,
}

import Navbar from '../components/Navbar'
import Footer from '@/components/Footer'
import {CartProvider} from '@/components/CartContext'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
       <CartProvider>
         <Navbar />
           {children}
         <Footer/>
        </CartProvider> 
      </body>
    </html>
  )
}