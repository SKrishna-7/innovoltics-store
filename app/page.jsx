"use client";

import Home from '@/Pages/Home/Home'

import Head from "next/head";


const Index = () => {

  return (
    <>

<Head>
        <title>Innovoltics | 3D Printing & Electronics Services</title>
        <meta name="description" content="Innovoltics offers expert 3D printing and electronic prototyping services to bring your ideas to life. High-quality, affordable, and custom-built." />
        <meta name="keywords" content="3D printing, electronics, prototyping, Innovoltics, custom design, PCB, fabrication" />
        <meta name="author" content="Innovoltics Team" />

        {/* Open Graph for social media preview */}
        <meta property="og:title" content="Innovoltics | 3D Printing" />
        <meta property="og:description" content="We transform your concepts into physical products with 3D printing & electronics." />
        <meta property="og:image" content="https://www.innovoltics.site/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.cc943c14.png&w=640&q=75" /> Replace with actual image
        <meta property="og:url" content="https://www.innovoltics.site/" />
        <meta property="og:type" content="website" />

        {/* Instagram Card */}
        <meta name="instagram:title" content="Innovoltics - Bring Your Ideas to Life" />
        <meta name="instagram:description" content="Expert 3D printing and electronics services." />
      </Head>


    <div className='font-roboto'>   
        <Home/>    
    </div>
    </>
  )
}

export default Index