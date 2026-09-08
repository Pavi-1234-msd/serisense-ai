import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { FloatingMesh } from './FloatingMesh';
import { ParticleField } from './ParticleField';

function CanvasLoader() {
  return (
    <mesh>
      <sphereGeometry args={[0.5, 16, 16]} />
      <meshBasicMaterial color="#00F5FF" wireframe />
    </mesh>
  );
}

export const AntiGravityCanvas: React.FC = () => {
  return (
    <div className="relative w-full h-[480px] lg:h-[620px] rounded-3xl overflow-hidden glass-panel border border-cyan-glow/20 shadow-neon-cyan/20">
      {/* Background radial gradient glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-purple-deep/20 via-transparent to-cyan-glow/10 pointer-events-none" />
      
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        className="w-full h-full cursor-grab active:cursor-grabbing"
      >
        {/* Lights */}
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} color="#00F5FF" intensity={2} />
        <pointLight position={[-10, -10, -10]} color="#9D00FF" intensity={2.5} />
        <directionalLight position={[0, 5, 5]} intensity={1} color="#ffffff" />

        <Suspense fallback={<CanvasLoader />}>
          <FloatingMesh />
          <ParticleField count={650} />
        </Suspense>
      </Canvas>

      {/* Canvas Overlay Badge */}
      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between px-4 py-2 rounded-xl bg-obsidian-card/80 backdrop-blur-md border border-white/10 text-xs text-slate-300 pointer-events-none">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-cyan-glow animate-ping" />
          <span className="font-mono text-cyan-glow">R3F Spatial Engine v4.2</span>
        </div>
        <span className="text-slate-400 font-mono hidden sm:inline">60 FPS • Realtime Physics Vector</span>
      </div>
    </div>
  );
};
