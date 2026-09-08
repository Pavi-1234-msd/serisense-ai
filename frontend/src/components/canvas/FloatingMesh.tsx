import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, MeshWobbleMaterial } from '@react-three/drei';
import * as THREE from 'three';

export const FloatingMesh: React.FC = () => {
  const outerMeshRef = useRef<THREE.Mesh>(null!);
  const innerMeshRef = useRef<THREE.Mesh>(null!);
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const pointer = state.pointer; // normalized [-1, 1]

    if (groupRef.current) {
      // Smooth tilt following mouse pointer vector
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, pointer.y * 0.4, 0.05);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, pointer.x * 0.4 + t * 0.1, 0.05);
    }

    if (outerMeshRef.current) {
      outerMeshRef.current.rotation.z = t * 0.15;
    }

    if (innerMeshRef.current) {
      innerMeshRef.current.rotation.x = -t * 0.2;
      innerMeshRef.current.rotation.y = t * 0.25;
    }
  });

  return (
    <Float
      speed={2.5}
      rotationIntensity={1.2}
      floatIntensity={2}
      floatingRange={[-0.2, 0.2]}
    >
      <group ref={groupRef}>
        {/* Outer Glass Crystalline Torus Knot */}
        <mesh ref={outerMeshRef} scale={1.2}>
          <torusKnotGeometry args={[1, 0.32, 128, 32, 2, 3]} />
          <meshPhysicalMaterial
            color="#00F5FF"
            roughness={0.1}
            metalness={0.2}
            transmission={0.85} // Glass transmission effect
            thickness={1.5}
            ior={1.4}
            clearcoat={1}
            clearcoatRoughness={0.1}
            wireframe={false}
            emissive="#00F5FF"
            emissiveIntensity={0.15}
          />
        </mesh>

        {/* Inner Glowing Energetic Core (Icosahedron) */}
        <mesh ref={innerMeshRef} scale={0.75}>
          <icosahedronGeometry args={[1, 1]} />
          <MeshWobbleMaterial
            factor={0.4}
            speed={2}
            color="#9D00FF"
            roughness={0.2}
            metalness={0.8}
            emissive="#9D00FF"
            emissiveIntensity={0.8}
            wireframe
          />
        </mesh>

        {/* Floating Ring Orbits */}
        <mesh rotation={[Math.PI / 3, 0, 0]} scale={2.2}>
          <torusGeometry args={[1, 0.008, 16, 100]} />
          <meshBasicMaterial color="#00F5FF" transparent opacity={0.6} />
        </mesh>

        <mesh rotation={[-Math.PI / 4, Math.PI / 4, 0]} scale={2.5}>
          <torusGeometry args={[1, 0.005, 16, 100]} />
          <meshBasicMaterial color="#9D00FF" transparent opacity={0.5} />
        </mesh>
      </group>
    </Float>
  );
};
