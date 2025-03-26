"use client";

import FHome from '../FHome'
import Services from '../Services'
import Featured from '../FeaturedProducts'
export default function Home() {
  return (
    
    <div className="w-full h-full">
      <FHome/>
      <Services/>
      
      <Featured/>
    </div>

  );
}

