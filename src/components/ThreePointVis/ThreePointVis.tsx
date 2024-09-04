import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei/native';

const RotatingCylinder: React.FC = () => {
  return (
    <mesh rotation={[Math.PI / 0.5, 0, 0]}>
      <cylinderGeometry args={[1, 1, 2, 32]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  );
};

const Scene: React.FC = () => {
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} />
      <OrbitControls />
      <RotatingCylinder />
    </Canvas>
  );
};

export default Scene;