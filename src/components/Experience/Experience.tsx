import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei/native";
import * as THREE from "three";
import "./Experience.css"; 

const RotatingBox: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1, 1, 1]} />
      <meshNormalMaterial />
    </mesh>
  );
};

const Experience: React.FC = () => {
  return (
    <Canvas className="some-class">
      <ambientLight intensity={0.5} />
      <directionalLight position={[0, 5, 5]} />
      <OrbitControls />
      <RotatingBox />
    </Canvas>
  );
};

export default Experience;