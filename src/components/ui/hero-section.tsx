"use client";

/* eslint-disable react/no-unknown-property */
import { useRef, useMemo } from "react";
import { Canvas, useFrame, ThreeElements } from "@react-three/fiber";
import * as THREE from "three";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

/* eslint-disable @typescript-eslint/no-namespace */
declare module "react" {
  namespace JSX {
    interface IntrinsicElements extends ThreeElements {}
  }
}
/* eslint-enable @typescript-eslint/no-namespace */

// --- Shader Code ---
const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
uniform float uTime;
uniform vec2 uResolution;
uniform vec3 uColor1;
uniform vec3 uColor2;
varying vec2 vUv;

vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }

float snoise(vec2 v){
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
           -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy) );
  vec2 x0 = v -   i + dot(i, C.xx);
  vec2 i1;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
  + i.x + vec3(0.0, i1.x, 1.0 ));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
  m = m*m ;
  m = m*m ;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

float bayerDither4x4(vec2 uv) {
    int x = int(mod(uv.x, 4.0));
    int y = int(mod(uv.y, 4.0));
    
    int matrix[16];
    matrix[0] = 0; matrix[1] = 8; matrix[2] = 2; matrix[3] = 10;
    matrix[4] = 12; matrix[5] = 4; matrix[6] = 14; matrix[7] = 6;
    matrix[8] = 3; matrix[9] = 11; matrix[10] = 1; matrix[11] = 9;
    matrix[12] = 15; matrix[13] = 7; matrix[14] = 13; matrix[15] = 5;
    
    return float(matrix[y * 4 + x]) / 16.0;
}

void main() {
    vec2 uv = vUv;
    vec2 coord = gl_FragCoord.xy;
    
    float noise = snoise(uv * 1.5 + vec2(uTime * 0.05, uTime * 0.03)) * 0.25;
    float diagonal = (uv.x + uv.y) * 0.5;
    float gradient = diagonal * 1.2 + noise;
    
    vec3 deepBlue = uColor1;
    vec3 paleBlue = uColor2;
    vec3 softBlue = mix(deepBlue, paleBlue, 0.33);
    vec3 lightBlue = mix(deepBlue, paleBlue, 0.66);
    
    vec3 color;
    if (gradient < 0.3) {
        color = deepBlue;
    } else if (gradient < 0.55) {
        color = softBlue;
    } else if (gradient < 0.8) {
        color = lightBlue;
    } else {
        color = paleBlue;
    }
    
    float dither = bayerDither4x4(coord);
    float threshold = fract(gradient * 4.0);
    
    if (gradient < 0.3 && threshold > dither * 0.5) {
        color = softBlue;
    } else if (gradient >= 0.3 && gradient < 0.55 && threshold > dither * 0.5) {
        color = lightBlue;
    } else if (gradient >= 0.55 && gradient < 0.8 && threshold > dither * 0.5) {
        color = paleBlue;
    }
    
    vec2 cornerDist = vec2(uv.x, uv.y);
    float fadeMask = smoothstep(0.0, 0.25, length(cornerDist));
    color = mix(vec3(1.0), color, fadeMask);
    
    float vignette = smoothstep(1.2, 0.3, length(uv - 0.5));
    color = mix(color, color * 0.95, (1.0 - vignette) * 0.3);
    
    gl_FragColor = vec4(color, 1.0);
}
`;

const GradientPlane = ({
  color1,
  color2,
  speed = 1,
}: {
  color1: string;
  color2: string;
  speed?: number;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(1000, 1000) },
      uColor1: { value: new THREE.Color(color1) },
      uColor2: { value: new THREE.Color(color2) },
    }),
    [color1, color2],
  );

  useFrame((state) => {
    const { clock, size } = state;
    uniforms.uTime.value = clock.getElapsedTime() * speed;
    uniforms.uResolution.value.set(size.width, size.height);
    uniforms.uColor1.value.set(color1);
    uniforms.uColor2.value.set(color2);
  });

  return (
    <mesh ref={meshRef} scale={[2, 2, 1]}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent={true}
        depthWrite={false}
        depthTest={false}
      />
    </mesh>
  );
};

// --- Main Hero Section Component ---

interface HeroSectionProps {
  monogram?: string;
  topName?: string;
  tag?: string;
  title: string;
  description: string;
  children?: React.ReactNode; // For button, trust badges, scroll link
  color1?: string;
  color2?: string;
  speed?: number;
  className?: string;
}

export default function HeroSection({
  monogram = "C·J·C",
  topName = "CLAUDIR J. CORRÊA / TERAPEUTA INTEGRATIVO",
  tag = "Atendimento 100% on-line",
  title,
  description,
  children,
  color1 = "#1e3a5f",
  color2 = "#e8f4fd",
  speed = 1,
  className,
}: HeroSectionProps) {
  return (
    <section
      id="inicio"
      className={cn(
        "relative w-full min-h-screen flex flex-col items-center overflow-hidden",
        className,
      )}
      style={{ containerType: "size" }}
    >
      {/* Background Shader */}
      <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none">
        <Canvas
          camera={{ position: [0, 0, 1] }}
          dpr={[1, 1]}
          gl={{
            antialias: false,
            alpha: true,
          }}
        >
          <GradientPlane color1={color1} color2={color2} speed={speed} />
        </Canvas>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full min-h-screen flex flex-col">
        {/* Top bar with monogram and name */}
        <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-6 py-8 md:px-12 md:py-10 pointer-events-none">
          <div className="pointer-events-auto">
            <span className="font-display font-bold text-2xl md:text-3xl lg:text-4xl tracking-tight text-white/90">
              {monogram.split("·").map((part, i) => (
                <span key={i} className="relative inline-block">
                  {part}
                  {i < monogram.split("·").length - 1 && (
                    <span className="text-gold mx-1">·</span>
                  )}
                </span>
              ))}
            </span>
          </div>
          <div className="pointer-events-auto text-right">
            <p className="text-xs md:text-sm font-bold tracking-widest text-white/70 uppercase">
              {topName}
            </p>
          </div>
        </div>

        {/* Main content */}
        <div className="relative z-10 w-full flex-1 flex flex-col items-center justify-center pt-20 pb-20 md:pt-32 md:pb-32">
          <div className="w-full max-w-[1200px] px-6 flex flex-col items-center">
            {/* Tag */}
            <div className="mb-6 md:mb-8">
              <motion.span
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/30 bg-white/10 backdrop-blur-sm text-white/90 text-sm font-medium"
              >
                <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
                {tag}
              </motion.span>
            </div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="text-center text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-[1.1] tracking-tight text-white font-bold mb-6 md:mb-8 max-w-[900px]"
            >
              {title}
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
              className="text-center text-lg md:text-xl lg:text-2xl leading-relaxed text-white/80 font-normal mb-10 md:mb-12 max-w-[700px]"
            >
              {description}
            </motion.p>

            {/* Children (Button, Trust badges, Scroll link) */}
            {children && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
                className="w-full flex flex-col items-center gap-6 md:gap-8"
              >
                {children}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}