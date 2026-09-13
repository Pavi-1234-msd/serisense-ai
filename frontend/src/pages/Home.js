import React, { Suspense, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshWobbleMaterial, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { useLanguage } from '../context/LanguageContext';
import './Home.css';

// ── 3D Scene ─────────────────────────────────────────────
function LeafKnot() {
  const outerRef = useRef();
  const innerRef = useRef();
  const groupRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const p = state.pointer;
    if (groupRef.current) {
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, p.y * 0.3, 0.05);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, p.x * 0.3 + t * 0.08, 0.05);
    }
    if (outerRef.current) outerRef.current.rotation.z = t * 0.12;
    if (innerRef.current) {
      innerRef.current.rotation.x = -t * 0.18;
      innerRef.current.rotation.y = t * 0.22;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1.5} floatingRange={[-0.15, 0.15]}>
      <group ref={groupRef}>
        {/* Outer torus knot — green glass */}
        <mesh ref={outerRef} scale={1.15}>
          <torusKnotGeometry args={[1, 0.3, 128, 32, 2, 3]} />
          <meshPhysicalMaterial
            color="#4caf50"
            roughness={0.08}
            metalness={0.15}
            transmission={0.8}
            thickness={1.2}
            ior={1.35}
            clearcoat={1}
            emissive="#2e7d32"
            emissiveIntensity={0.12}
          />
        </mesh>

        {/* Inner gold glowing core */}
        <mesh ref={innerRef} scale={0.7}>
          <icosahedronGeometry args={[1, 1]} />
          <MeshWobbleMaterial
            factor={0.35}
            speed={2}
            color="#f9a825"
            roughness={0.2}
            metalness={0.85}
            emissive="#f9a825"
            emissiveIntensity={0.7}
            wireframe
          />
        </mesh>

        {/* Orbit rings */}
        <mesh rotation={[Math.PI / 3, 0, 0]} scale={2.1}>
          <torusGeometry args={[1, 0.007, 16, 100]} />
          <meshBasicMaterial color="#4caf50" transparent opacity={0.55} />
        </mesh>

        <mesh rotation={[-Math.PI / 4, Math.PI / 5, 0]} scale={2.4}>
          <torusGeometry args={[1, 0.004, 16, 100]} />
          <meshBasicMaterial color="#f9a825" transparent opacity={0.45} />
        </mesh>
      </group>
    </Float>
  );
}

function Particles({ count = 500 }) {
  const ref = useRef();
  const [positions, colors] = React.useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const c1 = new THREE.Color('#4caf50');
    const c2 = new THREE.Color('#f9a825');
    const c3 = new THREE.Color('#ffffff');

    for (let i = 0; i < count; i++) {
      const u = Math.random(), v = Math.random();
      const theta = u * 2 * Math.PI;
      const phi = Math.acos(2 * v - 1);
      const r = 3 + Math.random() * 7;
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
      const mix = Math.random();
      const c = mix > 0.65 ? c2 : mix > 0.9 ? c3 : c1;
      col[i * 3] = c.r; col[i * 3 + 1] = c.g; col[i * 3 + 2] = c.b;
    }
    return [pos, col];
  }, [count]);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.04;
      ref.current.rotation.x += delta * 0.015;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.04} vertexColors transparent opacity={0.65}
        sizeAttenuation blending={THREE.AdditiveBlending} />
    </points>
  );
}

function Scene3D({ t }) {
  return (
    <div className="hero-canvas-wrapper">
      <Canvas camera={{ position: [0, 0, 5.5], fov: 44 }} dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} color="#4caf50" intensity={2.5} />
        <pointLight position={[-10, -10, -10]} color="#f9a825" intensity={2.5} />
        <directionalLight position={[0, 5, 5]} intensity={1} />
        <Suspense fallback={null}>
          <LeafKnot />
          <Particles count={500} />
        </Suspense>
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.6} />
      </Canvas>
      <div className="canvas-badge">
        <span className="canvas-dot" />
        <span>{t('engine_badge_title')}</span>
        <span className="canvas-fps">{t('engine_badge_fps')}</span>
      </div>
    </div>
  );
}

// ── Home Page ─────────────────────────────────────────────
const TECH = [
  { icon: '🧠', name: 'MobileNetV2', desc: 'CNN Model' },
  { icon: '🐍', name: 'Flask API', desc: 'Backend' },
  { icon: '⚛️', name: 'React.js', desc: 'Frontend' },
  { icon: '📊', name: 'TensorFlow', desc: 'Deep Learning' },
  { icon: '🗄️', name: 'Kaggle Data', desc: '6,000+ Images' },
  { icon: '☁️', name: 'Google Colab', desc: 'GPU Training' },
];

export default function Home() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const MODULES = [
    {
      icon: '🌿',
      title: t('nav_leaf'),
      desc: t('leaf_subtitle'),
      features: [t('stat_accuracy') + ': 90.3%', t('chem_treatment'), t('silkworm_safety'), t('prevention_guidelines')],
      path: '/leaf-disease',
      color: '#2e7d32',
      bg: '#e8f5e9',
      badge: 'AI Powered'
    },
    {
      icon: '🌡️',
      title: t('nav_climate'),
      desc: t('climate_subtitle'),
      features: [t('stat_instar') + ': 6 Stages', t('required_corrections'), t('biological_impact'), t('sop_title')],
      path: '/climate',
      color: '#e65100',
      bg: '#fff3e0',
      badge: 'Rule Based'
    },
    {
      icon: '🐛',
      title: t('nav_silkworm'),
      desc: t('silkworm_subtitle'),
      features: [t('major_pathogens'), t('mortality_risk'), t('disinfection_protocol'), t('hygiene_rules')],
      path: '/silkworm',
      color: '#4a148c',
      bg: '#f3e5f5',
      badge: 'Symptom Based'
    }
  ];

  const HOW_STEPS = [
    { num: '01', icon: '📸', title: t('step_1_title'), desc: t('step_1_desc') },
    { num: '02', icon: '🧠', title: t('step_2_title'), desc: t('step_2_desc') },
    { num: '03', icon: '💊', title: t('step_3_title'), desc: t('step_3_desc') },
  ];

  return (
    <div className="home-page">

      {/* ── HERO ── */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-badge-pill">
            {t('hero_badge')}
          </div>
          <h1 className="hero-heading">
            {t('hero_title_1')}<br />
            <span className="hero-green">{t('hero_title_2')}</span><br />
            <span className="hero-gold">{t('hero_title_3')}</span>
          </h1>
          <p className="hero-para">
            {t('hero_desc')}
          </p>
          <div className="hero-stats-row">
            {[
              { num: '90.3%', lbl: t('stat_accuracy') },
              { num: '3', lbl: t('stat_leaf') },
              { num: '4', lbl: t('stat_silkworm') },
              { num: '6', lbl: t('stat_instar') },
            ].map((s, i) => (
              <div key={i} className="hero-stat">
                <span className="hero-stat-num">{s.num}</span>
                <span className="hero-stat-lbl">{s.lbl}</span>
              </div>
            ))}
          </div>
          <div className="hero-cta-row">
            <button className="btn btn-primary" onClick={() => navigate('/leaf-disease')}>
              {t('hero_btn_leaf')}
            </button>
            <button className="btn btn-outline" onClick={() => navigate('/climate')}>
              {t('hero_btn_climate')}
            </button>
          </div>
        </div>

        <div className="hero-visual">
          <Scene3D t={t} />
        </div>
      </section>

      {/* ── MODULES ── */}
      <section className="modules-section">
        <div className="section-header">
          <h2 className="section-title">{t('modules_title')}</h2>
          <p className="section-sub">{t('modules_subtitle')}</p>
        </div>
        <div className="modules-grid">
          {MODULES.map((m, i) => (
            <div key={i} className="module-card"
              style={{ '--accent': m.color, '--accent-bg': m.bg }}>
              <div className="mc-top">
                <span className="mc-icon">{m.icon}</span>
                <span className="mc-badge" style={{ background: m.color }}>{m.badge}</span>
              </div>
              <h3 className="mc-title">{m.title}</h3>
              <p className="mc-desc">{m.desc}</p>
              <ul className="mc-features">
                {m.features.map((f, j) => (
                  <li key={j}><span className="mc-tick">✓</span>{f}</li>
                ))}
              </ul>
              <button className="mc-btn"
                onClick={() => navigate(m.path)}>
                {t('open_module')}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="how-section">
        <div className="section-header">
          <h2 className="section-title">{t('how_title')}</h2>
          <p className="section-sub">{t('how_sub')}</p>
        </div>
        <div className="steps-row">
          {HOW_STEPS.map((s, i) => (
            <div key={i} className="step-card">
              <div className="step-num">{s.num}</div>
              <div className="step-icon">{s.icon}</div>
              <h3 className="step-title">{s.title}</h3>
              <p className="step-desc">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── TECH STACK ── */}
      <section className="tech-section">
        <div className="section-header">
          <h2 className="section-title">{t('tech_title')}</h2>
        </div>
        <div className="tech-grid">
          {TECH.map((tItem, i) => (
            <div key={i} className="tech-card">
              <span className="tech-icon">{tItem.icon}</span>
              <span className="tech-name">{tItem.name}</span>
              <span className="tech-desc">{tItem.desc}</span>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}