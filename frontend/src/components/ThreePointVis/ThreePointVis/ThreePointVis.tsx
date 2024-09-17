import React, { useState } from 'react';
import { Canvas, extend } from '@react-three/fiber';
import Controls from '../Controls';
import './ThreePointVis.css';
import * as THREE from 'three';
import { shaderMaterial } from '@react-three/drei/native';

// Custom shader material to simulate a gradient effect
const GradientMaterial = shaderMaterial(
  { color1: new THREE.Color('#2F2F2F'), color2: new THREE.Color('#50A2A7') },
  // Vertex shader
  `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
  `,
  // Fragment shader
  `
  uniform vec3 color1;
  uniform vec3 color2;
  varying vec2 vUv;
  void main() {
    float mixFactor = smoothstep(0.0, 1.0, vUv.y);
    gl_FragColor = vec4(mix(color1, color2, mixFactor), 1.0);
  }
  `
);

// Extend the material into the Three.js system
extend({ GradientMaterial });

// Update the JSX.IntrinsicElements to recognize the gradientMaterial
declare global {
  namespace JSX {
    interface IntrinsicElements {
      gradientMaterial: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }
}

interface ThreePointVisProps {
  data: { id: number }[];
}

const ThreePointVis: React.FC<ThreePointVisProps> = ({ data }) => {

  const totalCylinders = 370;
  //const cylindersPerRow = Math.ceil(Math.sqrt(totalCylinders)); // Calculate based on total cylinders
  const cylindersPerRow = 30;
  console.log("cylindersPerRow", cylindersPerRow);
  const spacing = 0.575; // Space between cylinders
  const cylinderSize = 0.25; // Radius of the cylinder
  
  // Calculate total width and height of the grid
  const width = cylindersPerRow * spacing;
  const height = Math.ceil(totalCylinders / cylindersPerRow) * spacing;

  // To keep track of which cylinder is hovered
  const [hoveredCylinder, setHoveredCylinder] = useState<number | null>(null);

  return (
    <Canvas camera={{ position: [0, 0, 5] }}>
      <Controls />
      <ambientLight color="#ffffff" intensity={0.1} />
      <hemisphereLight color="#ffffff" groundColor="#080820" intensity={1.0} />
      <directionalLight position={[5, 5, 5]} />

      {data.map((d, i) => {
        // Calculate the position for each cylinder
        const x = (i % cylindersPerRow) * spacing - width / 2 + spacing / 2;
        const y = Math.floor(i / cylindersPerRow) * spacing - height / 2 + spacing / 2;
        const z = 0;

        return(
          <mesh 
            key={d.id} 
            position={[x, y, z]} 
            rotation={[Math.PI * 0.5, 0, 0]}
            onPointerOver={() => setHoveredCylinder(d.id)}  // Set the hovered cylinder
            onPointerOut={() => setHoveredCylinder(null)}    // Reset when no hover
          >

            <cylinderGeometry attach="geometry" args={[cylinderSize, cylinderSize, 0.15, 32]}/>
            <gradientMaterial/>
            {hoveredCylinder === d.id && (
              <meshStandardMaterial
                emissive={'#E2BBE9'}
                emissiveIntensity={1}  // Glow effect
                transparent={true}
                opacity={0.7}  // Slight transparency for showinf the gradient
              />
            )}
          </mesh> 
        );
      })}
    </Canvas>
  );
};

export default ThreePointVis;