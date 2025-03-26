"use client";
import { useEffect, useState } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
import * as THREE from "three";

function STLModel({color,model}) {
  const geometry = useLoader(STLLoader,model? model: "/models/drone_frame.stl"); // Use `/models/` path inside `public/`
  // const geometry = useLoader(STLLoader, "/Models/df.stl"); 

  return (
    <mesh geometry={geometry} scale={0.1}>
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

export default function STLViewer({colors,model}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // Prevents hydration errors

  return (
    <div className="w-full h-full cursor-grab">
      <Canvas camera={{ position: [5, 10, 8] }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[2, 2, 2]} intensity={1} />
        <STLModel color={colors} model={model}/>
        <OrbitControls enableZoom={true} />
      </Canvas>
    </div>
  );
}
