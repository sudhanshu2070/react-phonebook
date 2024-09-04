import React from 'react';
import { OrbitControls } from '@react-three/drei/native';
import { useThree } from '@react-three/fiber';

const Controls: React.FC = () => {
  const { camera, gl } = useThree();

  return (
    <OrbitControls
      args={[camera, gl.domElement]}
      enableDamping
      dampingFactor={0.25}
      rotateSpeed={0.5}
      zoomSpeed={1.2}
      panSpeed={0.8}
      enableZoom={true}
      enablePan={true}
      enableRotate={true}
    />
  );
};

export default Controls;
