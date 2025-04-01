import type { Metadata } from 'next'
import './globals.css'


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
      <body>
       <Provider>
         <Navbar />
           {children}
         <Footer/>
        </Provider> 
      </body>
    </html>
  )
}