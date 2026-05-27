import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Float } from '@react-three/drei';
import { useTheme } from './ThemeContext';

function StarField({ color }) {
  const ref = useRef();
  const count = 5000;
  const positions = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 80 + Math.random() * 120;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      p[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      p[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      p[i * 3 + 2] = r * Math.cos(phi);
    }
    return p;
  }, []);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.015;
      ref.current.rotation.x += delta * 0.005;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial transparent color={color} size={0.28} sizeAttenuation depthWrite={false} opacity={0.65} />
    </Points>
  );
}

function FloatingIcosahedron({ color, colorSecondary }) {
  const meshRef = useRef();
  const wireRef = useRef();

  useFrame((state, delta) => {
    if (meshRef.current) { meshRef.current.rotation.x += delta * 0.18; meshRef.current.rotation.y += delta * 0.22; }
    if (wireRef.current) { wireRef.current.rotation.x -= delta * 0.1; wireRef.current.rotation.y -= delta * 0.14; }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.4} floatIntensity={1.2}>
      <group>
        <mesh ref={meshRef}>
          <icosahedronGeometry args={[3.8, 1]} />
          <meshStandardMaterial color={color} emissive={colorSecondary} emissiveIntensity={0.18} metalness={0.8} roughness={0.15} transparent opacity={0.12} />
        </mesh>
        <mesh ref={wireRef}>
          <icosahedronGeometry args={[4.2, 1]} />
          <meshBasicMaterial color={color} wireframe transparent opacity={0.35} />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[5.5, 0.04, 8, 80]} />
          <meshBasicMaterial color={colorSecondary} transparent opacity={0.3} />
        </mesh>
      </group>
    </Float>
  );
}

function BackgroundShape({ color }) {
  const ref = useRef();
  useFrame((_, delta) => {
    if (ref.current) { ref.current.rotation.z += delta * 0.08; ref.current.rotation.x += delta * 0.05; }
  });
  return (
    <mesh ref={ref} position={[-18, 6, -15]}>
      <torusKnotGeometry args={[4, 1.2, 100, 16]} />
      <meshBasicMaterial color={color} wireframe transparent opacity={0.08} />
    </mesh>
  );
}

function AmbientParticles({ color }) {
  const ref = useRef();
  const count = 300;
  const positions = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      p[i * 3]     = (Math.random() - 0.5) * 40;
      p[i * 3 + 1] = (Math.random() - 0.5) * 30;
      p[i * 3 + 2] = (Math.random() - 0.5) * 20 - 5;
    }
    return p;
  }, []);

  useFrame((state) => {
    if (ref.current) ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.3;
  });
  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial transparent color={color} size={0.15} sizeAttenuation depthWrite={false} opacity={0.5} />
    </Points>
  );
}

function SynthwaveSun({ colorSecondary }) {
  return (
    <mesh position={[0, 4, -8]}>
      <circleGeometry args={[5, 64]} />
      <meshBasicMaterial color={colorSecondary} transparent opacity={0.9} />
    </mesh>
  );
}

function PixelHeroShape({ color }) {
  const ref = useRef();
  useFrame((state) => {
    if (ref.current) { ref.current.rotation.y = state.clock.elapsedTime * 0.5; ref.current.rotation.x = state.clock.elapsedTime * 0.2; }
  });
  return (
    <mesh ref={ref} position={[0, 0, -5]}>
      <boxGeometry args={[4, 4, 4]} />
      <meshBasicMaterial color={color} wireframe />
    </mesh>
  );
}

function RainHeroEffect({ color, colorSecondary }) {
  const ref = useRef();
  const count = 200;
  const positions = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      p[i * 3]     = (Math.random() - 0.5) * 30;
      p[i * 3 + 1] = (Math.random() - 0.5) * 30;
      p[i * 3 + 2] = (Math.random() - 0.5) * 20 - 5;
    }
    return p;
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.02;
      ref.current.position.y = -((state.clock.elapsedTime * 3) % 10);
    }
  });
  return (
    <group>
      <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial transparent color={color} size={0.25} sizeAttenuation depthWrite={false} opacity={0.4} />
      </Points>
      <mesh position={[0, 1, -6]}>
        <ringGeometry args={[3.5, 4, 48]} />
        <meshBasicMaterial color={colorSecondary} transparent opacity={0.15} side={2} />
      </mesh>
    </group>
  );
}

export default function HeroCanvas() {
  const { theme } = useTheme();

  return (
    <Canvas
      camera={{ position: [0, 0, 15], fov: 45 }}
      style={{ position: 'absolute', inset: 0, zIndex: 0 }}
      gl={{ alpha: true }}
    >
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} color={theme.color} intensity={1.5} />
      <pointLight position={[-10, -10, -5]} color={theme.colorSecondary} intensity={0.5} />

      {theme.id !== 'pixel' && <StarField color={theme.color} />}

      {theme.id === 'gta' && <SynthwaveSun colorSecondary={theme.colorSecondary} />}
      {theme.id === 'pixel' && <PixelHeroShape color={theme.color} />}
      {theme.id === 'rain' && <RainHeroEffect color={theme.color} colorSecondary={theme.colorSecondary} />}
      {theme.id === 'amber' && (
        <>
          <FloatingIcosahedron color={theme.color} colorSecondary={theme.colorSecondary} />
          <BackgroundShape color={theme.colorSecondary} />
          <AmbientParticles color={theme.color} />
        </>
      )}
    </Canvas>
  );
}
