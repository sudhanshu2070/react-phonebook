import React, { useRef } from 'react';
import { extend, useThree, useFrame, ReactThreeFiber } from "@react-three/fiber";
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls';
import * as THREE from 'three';

// Extend THREE to include TrackballControls
extend({ TrackballControls });

// Extend the JSX IntrinsicElements to include trackballControls
declare global {
  namespace JSX {
    interface IntrinsicElements {
      trackballControls: ReactThreeFiber.Object3DNode<TrackballControls, typeof TrackballControls>;
    }
  }
}

const Controls: React.FC = () => {
  const controls = useRef<TrackballControls | null>(null);
  const { camera, gl } = useThree();

  useFrame(() => {
    if (controls.current) {
      controls.current.update();
    }
  });

  return (
    <trackballControls
      ref={controls}
      args={[camera, gl.domElement]}
      dynamicDampingFactor={0.1}
      keys={['18', '17', '91']} // ALT_KEY, CTRL_KEY, CMD_KEY
      mouseButtons={{
        LEFT: THREE.MOUSE.PAN,
        MIDDLE: THREE.MOUSE.DOLLY, // or use MIDDLE if you want middle mouse button for zoom
        RIGHT: THREE.MOUSE.ROTATE,
      }}
    />
  );
};

export default Controls;