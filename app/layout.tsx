import type { Metadata } from 'next'
import './globals.css'

import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata: Metadata = {
  title: 'Innovoltics',
  description: '3d printing and Electronic Prototypes'  ,
}

import Navbar from '../components/Navbar'
import Footer from '@/components/Footer'
import {Provider} from '@/store/Provider'


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <link rel="icon" href="images/favicon.ico" />
      <body>
       <Provider>
         <Navbar />
           {children}
           <SpeedInsights />
         <Footer/>
        </Provider> 
      </body>
    </html>
  )
}