import React from 'react';
import { Canvas } from '@react-three/fiber';
import Controls from '../Controls';
import './ThreePointVis.css';

interface ThreePointVisProps {
  data: { id: number }[];
}

const ThreePointVis: React.FC<ThreePointVisProps> = ({ data }) => {
  return (
    
    <Canvas camera={{ position: [0, 0, 5] }}>
      <Controls />
      <ambientLight color="#ffffff" intensity={0.1} />
      <hemisphereLight
        color="#ffffff"
        groundColor="#080820"
        intensity={1.0}
      />
      <directionalLight position={[5, 5, 5]} />
      
      {data.map((d, i) => {
        const x = (i % 30) * 1.05;
        const y = Math.floor(i / 30) * 1.05;
        const z = 0;

        console.log("x:"+ x + "y:" + y + "Z:" + z);

        return(
          <mesh
          key={d.id}
          position={[x, y, z]}
          rotation={[Math.PI * 0.5, 0, 0]}
        >
            <cylinderGeometry
              attach="geometry"
              args={[0.5, 0.5, 0.15, 32]}
            />

          <meshStandardMaterial attach="material" color="red" />
          </mesh>  
        );
      })}
    </Canvas>
  );
};

export default ThreePointVis;