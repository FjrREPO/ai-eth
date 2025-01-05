"use client";

import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center text-red-400">
          Failed to load 3D visualization
        </div>
      );
    }

    return this.props.children;
  }
}

const EthereumModel: React.FC<{ scale?: number }> = ({ scale = 1.5 }) => {
  const modelRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF("/ethereum_logo.glb");

  useFrame((state) => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.005;
      modelRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.2;
      modelRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.1;
      modelRef.current.rotation.z = Math.cos(state.clock.getElapsedTime() * 0.5) * 0.1;
    }
  });

  if (!scene) {
    return null;
  }

  return (
    <primitive
      ref={modelRef}
      object={scene}
      scale={scale}
      position={[0, 0, 0]}
      castShadow
      receiveShadow
    />
  );
};

useGLTF.preload("/ethereum_logo.glb");


const FallbackContent = () => (
  <mesh>
    <boxGeometry args={[1, 1, 1]} />
    <meshStandardMaterial color="gray" />
  </mesh>
);

const Etherium3D = () => {
  return (
    <ErrorBoundary>
      <Canvas
        shadows
        camera={{
          position: [0, 2, 10],
          fov: 40,
          near: 0.1,
          far: 1000,
          up: [0, 1, 0]
        }}
        className="bg-transparent touch-auto absolute top-20"
        style={{ touchAction: 'auto' }}
        gl={{ preserveDrawingBuffer: true }}
      >
        <Suspense fallback={<FallbackContent />}>
          <ambientLight intensity={0.5} />
          <spotLight
            position={[10, 10, 10]}
            angle={0.3}
            penumbra={1}
            castShadow
            intensity={2}
          />
          <pointLight position={[-10, -10, -10]} intensity={1} />
          <EthereumModel />
          <OrbitControls
            enableZoom={false}
            enablePan={true}
            minPolarAngle={0}
            maxPolarAngle={Math.PI}
            minDistance={5}
            maxDistance={20}
            target={[0, 0, 0]}
            enableDamping={true}
            dampingFactor={0.05}
          />
        </Suspense>
      </Canvas>
    </ErrorBoundary>
  );
};

export default Etherium3D;