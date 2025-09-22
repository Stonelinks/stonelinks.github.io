'use client';

import React, { Suspense, useRef, useEffect, useState } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { Mesh, TextureLoader } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

function PizzaModel() {
  // Load the GLTF file
  const gltf = useLoader(GLTFLoader, '/pizza/scene.gltf');

  // Load textures manually
  const diffuseTexture = useLoader(
    TextureLoader,
    '/pizza/textures/fd_pizzaPepperoni_diffuse.jpeg',
  );
  const normalTexture = useLoader(
    TextureLoader,
    '/pizza/textures/fd_pizzaPepperoni_normal.jpeg',
  );
  const occlusionTexture = useLoader(
    TextureLoader,
    '/pizza/textures/fd_pizzaPepperoni_occlusion.png',
  );
  const specularTexture = useLoader(
    TextureLoader,
    '/pizza/textures/fd_pizzaPepperoni_specularGlossiness.png',
  );

  const meshRef = useRef<Mesh>(null);

  useEffect(() => {
    let animationId: number;
    const animate = () => {
      if (meshRef.current) {
        meshRef.current.rotation.y += 0.01;
      }
      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  // Process materials and apply textures manually
  useEffect(() => {
    if (gltf.scene && diffuseTexture && normalTexture && occlusionTexture) {
      gltf.scene.traverse(() => {
        //   if (child.isMesh) {
        //     // Replace the material with a properly configured standard material
        //     const standardMaterial = new MeshStandardMaterial({
        //       map: diffuseTexture, // Diffuse (albedo) texture
        //       normalMap: normalTexture, // Normal map for surface detail
        //       aoMap: occlusionTexture, // Ambient occlusion
        //       roughnessMap: specularTexture, // Use specular texture as roughness
        //       roughness: 0.8, // Base roughness value
        //       metalness: 0.1, // Low metalness for food material
        //     });
        //     // Configure texture settings
        //     diffuseTexture.flipY = false;
        //     normalTexture.flipY = false;
        //     occlusionTexture.flipY = false;
        //     specularTexture.flipY = false;
        //     child.material = standardMaterial;
        //     child.receiveShadow = true;
        //     child.castShadow = true;
        //   }
      });
    }
  }, [
    gltf.scene,
    diffuseTexture,
    normalTexture,
    occlusionTexture,
    specularTexture,
  ]);

  return (
    <primitive
      ref={meshRef}
      object={gltf.scene}
      scale={[2, 2, 2]}
      position={[0, -0.1, 0]}
    />
  );
}

interface PizzaViewerProps {
  width?: number;
  height?: number;
}

export default function PizzaViewer({
  width = 400,
  height = 400,
}: PizzaViewerProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div
        style={{ width, height }}
        className="border border-gray-200 rounded-lg overflow-hidden shadow-lg bg-gray-100 flex items-center justify-center"
      >
        <div className="text-gray-500">Loading 3D model...</div>
      </div>
    );
  }

  return (
    <div
      style={{ width, height }}
      className="border border-gray-200 rounded-lg overflow-hidden shadow-lg"
    >
      <Canvas
        camera={{ position: [0, 0, 0.5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
        shadows
      >
        {/* Optimized lighting for textured materials */}
        <ambientLight intensity={0.4} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={1.2}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <directionalLight position={[-10, -10, -5]} intensity={0.6} />
        <pointLight position={[0, 10, 0]} intensity={0.5} />
        <pointLight position={[5, 0, 5]} intensity={0.4} />

        {/* Pizza Model with Suspense */}
        <Suspense fallback={null}>
          <PizzaModel />
        </Suspense>
      </Canvas>
    </div>
  );
}
