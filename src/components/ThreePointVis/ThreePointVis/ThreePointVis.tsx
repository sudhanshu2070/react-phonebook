import React from 'react';
import { Canvas } from '@react-three/fiber';
import Controls from '../Controls';
import './ThreePointVis.css';

interface ThreePointVisProps {
  data: { id: number }[];
}

const ThreePointVis: React.FC<ThreePointVisProps> = ({ data }) => {

  const totalCylinders = 100;
  //const cylindersPerRow = Math.ceil(Math.sqrt(totalCylinders)); // Calculate based on total cylinders
  const cylindersPerRow = 16;
  console.log("cylindersPerRow", cylindersPerRow);
  const spacing = 1.05; // Space between cylinders
  const cylinderSize = 0.5; // Radius of the cylinder
  
  // Calculate total width and height of the grid
  const width = cylindersPerRow * spacing;
  const height = Math.ceil(totalCylinders / cylindersPerRow) * spacing;

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
        // Calculate the position for each cylinder
        const x = (i % cylindersPerRow) * spacing - width / 2 + spacing / 2;
        const y = Math.floor(i / cylindersPerRow) * spacing - height / 2 + spacing / 2;
        const z = 0;

        //console.log("x:"+ x + "y:" + y + "Z:" + z);

        return(
          <mesh
          key={d.id}
          position={[x, y, z]}
          rotation={[Math.PI * 0.5, 0, 0]}
        >
            <cylinderGeometry
              attach="geometry"
              args={[cylinderSize, cylinderSize, 0.15, 32]}
            />

          <meshStandardMaterial attach="material" color="red"/>
          </mesh>  
        );
      })}
    </Canvas>
  );
};

export default ThreePointVis;