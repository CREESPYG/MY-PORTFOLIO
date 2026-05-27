import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import { useTheme } from './ThemeContext';

function DriftParticles({ color }) {
  const ref = useRef();
  const count = 800;
  const positions = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      p[i * 3]     = (Math.random() - 0.5) * 60;
      p[i * 3 + 1] = (Math.random() - 0.5) * 60;
      p[i * 3 + 2] = (Math.random() - 0.5) * 30 - 10;
    }
    return p;
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.018;
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.008) * 0.12;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial transparent color={color} size={0.18} sizeAttenuation depthWrite={false} opacity={0.3} />
    </Points>
  );
}

function FloatingRing({ color }) {
  const ref = useRef();
  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x += delta * 0.2;
      ref.current.rotation.z += delta * 0.12;
    }
  });
  return (
    <mesh ref={ref} position={[12, -4, -8]}>
      <torusGeometry args={[3.5, 0.06, 8, 60]} />
      <meshBasicMaterial color={color} transparent opacity={0.15} />
    </mesh>
  );
}

function SpinningOctahedron({ color }) {
  const ref = useRef();
  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.35;
      ref.current.rotation.x += delta * 0.2;
    }
  });
  return (
    <mesh ref={ref} position={[-14, 5, -12]}>
      <octahedronGeometry args={[2.2, 0]} />
      <meshBasicMaterial color={color} wireframe transparent opacity={0.1} />
    </mesh>
  );
}

function SynthwaveGrid({ color }) {
  const ref = useRef();
  useFrame((state) => {
    if (ref.current) {
      ref.current.position.z = (state.clock.elapsedTime * 6) % 4;
    }
  });
  return (
    <group position={[0, -8, -10]}>
      <mesh ref={ref} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[120, 120, 30, 30]} />
        <meshBasicMaterial color={color} wireframe transparent opacity={0.15} />
      </mesh>
    </group>
  );
}

function PixelCubes({ color }) {
  const cubes = useMemo(() =>
    Array.from({ length: 60 }).map(() => ({
      position: [(Math.random() - 0.5) * 80, (Math.random() - 0.5) * 80, (Math.random() - 0.5) * 40 - 20],
      scale: Math.random() * 0.8 + 0.4
    })), []);
  const meshRef = useRef();
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.04;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 2;
    }
  });
  return (
    <group ref={meshRef}>
      {cubes.map((c, i) => (
        <mesh key={i} position={c.position} scale={c.scale}>
          <boxGeometry />
          <meshBasicMaterial color={color} wireframe transparent opacity={0.15} />
        </mesh>
      ))}
    </group>
  );
}

function RainStreaks({ color }) {
  const count = 400;
  const positions = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      p[i * 3]     = (Math.random() - 0.5) * 80;
      p[i * 3 + 1] = (Math.random() - 0.5) * 80;
      p[i * 3 + 2] = (Math.random() - 0.5) * 40 - 10;
    }
    return p;
  }, []);
  const ref = useRef();
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.008;
      ref.current.position.y = -((state.clock.elapsedTime * 2) % 20);
    }
  });
  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial transparent color={color} size={0.4} sizeAttenuation depthWrite={false} opacity={0.2} />
    </Points>
  );
}

export default function BackgroundCanvas() {
  const { theme } = useTheme();

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
      <Canvas camera={{ position: [0, 0, 20], fov: 55 }} gl={{ antialias: false, alpha: true }} style={{ width: '100%', height: '100%' }}>
        {theme.id === 'gta' && <SynthwaveGrid color={theme.colorSecondary} />}
        {theme.id === 'pixel' && <PixelCubes color={theme.color} />}
        {theme.id === 'rain' && <RainStreaks color={theme.color} />}
        {theme.id === 'amber' && (
          <>
            <DriftParticles color={theme.color} />
            <FloatingRing color={theme.colorSecondary} />
            <SpinningOctahedron color={theme.color} />
          </>
        )}
      </Canvas>
    </div>
  );
}
