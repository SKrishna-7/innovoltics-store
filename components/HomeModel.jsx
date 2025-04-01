"use client";
import { useEffect, useState, Suspense } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { useRouter } from "next/navigation";

// Function to determine the file extension
const getFileExtension = (url) => {
  if (!url) return null;
  const parts = url.split(".");
  const lastPart = parts[parts.length - 1].toLowerCase();
  const validExtensions = ["stl", "obj", "gltf", "glb", "fbx"];
  return validExtensions.includes(lastPart) ? lastPart : null;
};

// Component to handle WebGL context events
function WebGLContextHandler({ setError }) {
  const { gl } = useThree(); // Access the WebGL renderer

  useEffect(() => {
    const handleContextLoss = (event) => {
      console.warn("WebGL context lost:", event);
      setError("WebGL context lost. Please refresh the page.");
    };

    const handleContextRestored = () => {
      console.log("WebGL context restored");
      setError(null);
    };

    // Attach event listeners to the WebGL context
    const canvas = gl.domElement;
    canvas.addEventListener("webglcontextlost", handleContextLoss);
    canvas.addEventListener("webglcontextrestored", handleContextRestored);

    // Cleanup event listeners on unmount
    return () => {
      canvas.removeEventListener("webglcontextlost", handleContextLoss);
      canvas.removeEventListener("webglcontextrestored", handleContextRestored);
    };
  }, [gl, setError]);

  return null; // This component doesn't render anything
}

// Main 3D Model Component
function Model({ color, modelUrl, modelType }) {
  const router = useRouter();
  const path = router.pathname;

  // Default model path
  const defaultModel = "/models/df.stl";

  // Use the provided modelUrl directly, unless it's explicitly not provided
  const effectiveModelUrl = modelUrl || defaultModel;
  console.log("Path:", path);
  console.log("Provided modelUrl:", modelUrl);
  console.log("Effective model URL:", effectiveModelUrl);

  // Get the file extension, or use the provided modelType
  let extension = getFileExtension(effectiveModelUrl);
  if (!extension) {
    // If no extension is found, use the provided modelType or default to "obj"
    extension = modelType || "obj";
    console.warn(
      `No file extension found in URL: ${effectiveModelUrl}. Assuming type: ${extension}`
    );
  }

  // Load the model based on its extension
  let loadedModel, loadedModelType;

  try {
    switch (extension) {
      case "stl":
        loadedModel = useLoader(STLLoader, effectiveModelUrl);
        loadedModelType = "stl";
        break;

      case "obj":
        loadedModel = useLoader(OBJLoader, effectiveModelUrl);
        loadedModelType = "obj";
        break;

      case "gltf":
      case "glb":
        loadedModel = useLoader(GLTFLoader, effectiveModelUrl);
        loadedModelType = "gltf";
        break;

      case "fbx":
        loadedModel = useLoader(FBXLoader, effectiveModelUrl);
        loadedModelType = "fbx";
        break;

      default:
        console.log(`Unsupported file extension: ${extension}`);
        throw new Error(`Unsupported file extension: ${extension}`);
    }

    // Render the model based on its type
    switch (loadedModelType) {
      case "stl":
        return (
          <mesh geometry={loadedModel} scale={0.1}>
            <meshStandardMaterial color={color} />
          </mesh>
        );
      case "obj":
      case "fbx":
        return (
          <primitive object={loadedModel} scale={0.1}>
            <meshStandardMaterial color={color} />
          </primitive>
        );
      case "gltf":
        return <primitive object={loadedModel.scene} scale={0.1} />;
      default:
        throw new Error("Unknown model type after loading");
    }
  } catch (error) {
    console.log("Model loading error:", error);
    throw error; // Re-throw to trigger Suspense fallback
  }
}

// Fallback Component for Suspense
function FallbackModel({ color }) {
  const defaultModel = "/models/df.stl";
  try {
    const fallbackModel = useLoader(STLLoader, defaultModel);
    return (
      <mesh geometry={fallbackModel} scale={0.1}>
        <meshStandardMaterial color={color} />
      </mesh>
    );
  } catch (error) {
    console.log("Failed to load fallback model:", error);
    return (
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="red" />
      </mesh>
    );
  }
}

export default function STLViewer({ colors, model, modelType }) {
  const [mounted, setMounted] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // Prevents hydration errors

  return (
    <div className="w-full h-full cursor-grab relative">
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-50">
          <div className="text-red-600 text-lg">Error: {error}</div>
        </div>
      )}
      <Canvas camera={{ position: [5, 10, 8] }}>
        <WebGLContextHandler setError={setError} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[2, 2, 2]} intensity={1} />
        <Suspense fallback={<FallbackModel color={colors} />}>
          <ErrorBoundary
            onError={(err) => {
              setError("Failed to load the 3D model. Please try again later.");
              console.log("ErrorBoundary caught an error:", err);
            }}
            fallback={<FallbackModel color={colors} />}
          >
            <Model color={colors} modelUrl={model} modelType={modelType} />
          </ErrorBoundary>
        </Suspense>
        <OrbitControls enableZoom={true} />
      </Canvas>
    </div>
  );
}

import React from "react";
// Simple ErrorBoundary component to catch rendering errors
class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.props.onError(error);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}