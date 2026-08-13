"use client"

import type React from "react"
import { forwardRef, useState, useEffect } from "react"
import { Shader } from "react-shaders"
import { cn } from "@/lib/utils"

export interface CosmicWavesShadersProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Wave flow animation speed
   * @default 1.0
   */
  speed?: number

  /**
   * Wave height and intensity
   * @default 1.0
   */
  amplitude?: number

  /**
   * Wave density and pattern scale
   * @default 1.0
   */
  frequency?: number

  /**
   * Star quantity and brightness
   * @default 1.0
   */
  starDensity?: number

  /**
   * Color cycling speed
   * @default 1.0
   */
  colorShift?: number

  /**
   * Enable mouse interaction
   * @default true
   */
  mouseInteraction?: boolean
}

const fragmentShader = `
// Hash function for pseudo-random values
float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

// Smooth noise function
float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);

  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));

  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

// Fractal noise
float fbm(vec2 p) {
  float value = 0.0;
  float amplitude = 0.5;
  for(int i = 0; i < 4; i++) {
    value += amplitude * noise(p);
    p *= 2.0;
    amplitude *= 0.5;
  }
  return value;
}

// Star field generation
float stars(vec2 p, float density) {
  vec2 grid = floor(p * density);
  vec2 local = fract(p * density);

  float h = hash(grid);
  if(h > 0.95) {
    float d = length(local - 0.5);
    float star = exp(-d * 20.0);
    return star * (0.5 + 0.5 * sin(iTime * 2.0 + h * 10.0));
  }
  return 0.0;
}

void mainImage( out vec4 fragColor, in vec2 fragCoord ) {
  vec2 uv = fragCoord.xy / iResolution.xy;
  vec2 p = uv * 2.0 - 1.0;
  p.x *= iResolution.x / iResolution.y;

  // Mouse interaction
  vec2 mouse = u_mouse * 2.0 - 1.0;
  mouse.x *= iResolution.x / iResolution.y;
  float mouseDist = length(p - mouse);
  float mouseInfluence = exp(-mouseDist * 1.0) * 1.5;

  float time = iTime * u_speed;

  // Create flowing wave patterns with mouse influence
  vec2 wavePos = p * u_frequency;
  wavePos += mouse * mouseInfluence * 1.5;
  wavePos.y += time * 0.3;

  // Multiple wave layers
  float wave1 = sin(wavePos.x + cos(wavePos.y + time) * 0.5) * u_amplitude;
  float wave2 = sin(wavePos.x * 1.3 - wavePos.y * 0.7 + time * 1.2) * u_amplitude * 0.7;
  float wave3 = sin(wavePos.x * 0.8 + wavePos.y * 1.1 - time * 0.8) * u_amplitude * 0.5;

  // Combine waves
  float waves = (wave1 + wave2 + wave3) * 0.3;

  // Add fractal noise for organic texture
  vec2 noisePos = p * 1.5 + vec2(time * 0.1, time * 0.05);
  float noiseValue = fbm(noisePos) * 0.4;

  // Combine waves and noise
  float pattern = waves + noiseValue;

  // Create flowing cosmic gradient
  float gradient = length(p) * 0.8;
  gradient += pattern;

  // Color cycling through earthy spectrum
  vec3 color1 = vec3(0.15, 0.12, 0.10); // Dark brown
  vec3 color2 = vec3(0.35, 0.25, 0.18); // Medium brown
  vec3 color3 = vec3(0.45, 0.35, 0.25); // Tan
  vec3 color4 = vec3(0.25, 0.18, 0.12); // Deep earth

  // Color interpolation based on pattern and time
  float colorTime = time * u_colorShift + pattern * 2.0;
  vec3 finalColor;

  float t = fract(colorTime * 0.2);
  if(t < 0.25) {
    finalColor = mix(color1, color2, t * 4.0);
  } else if(t < 0.5) {
    finalColor = mix(color2, color3, (t - 0.25) * 4.0);
  } else if(t < 0.75) {
    finalColor = mix(color3, color4, (t - 0.5) * 4.0);
  } else {
    finalColor = mix(color4, color1, (t - 0.75) * 4.0);
  }

  // Apply wave intensity
  finalColor *= (0.5 + pattern * 0.8);

  // Add star field
  float starField = stars(p + vec2(time * 0.02, time * 0.01), u_starDensity * 15.0);
  starField += stars(p * 1.5 + vec2(-time * 0.015, time * 0.008), u_starDensity * 12.0);

  finalColor += vec3(starField * 0.8);

  // Add subtle glow effect
  float glow = exp(-length(p) * 0.5) * 0.3;
  finalColor += glow * vec3(0.3, 0.2, 0.15);

  // Vignette effect
  float vignette = 1.0 - length(uv - 0.5) * 1.2;
  vignette = smoothstep(0.0, 1.0, vignette);

  finalColor *= vignette;

  // Add film grain to reduce banding
  float grain = hash(fragCoord.xy + fract(iTime)) * 0.08 - 0.04;
  finalColor += grain;

  fragColor = vec4(finalColor, 1.0);
}
`

export const CosmicWavesShaders = forwardRef<HTMLDivElement, CosmicWavesShadersProps>(
  (
    {
      className,
      speed = 1.0,
      amplitude = 1.0,
      frequency = 1.0,
      starDensity = 1.0,
      colorShift = 1.0,
      mouseInteraction = true,
      ...props
    },
    ref,
  ) => {
    const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 })
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
      const checkMobile = () => {
        setIsMobile(window.innerWidth < 768)
      }

      checkMobile()
      window.addEventListener("resize", checkMobile)

      if (!mouseInteraction || isMobile) {
        return () => {
          window.removeEventListener("resize", checkMobile)
        }
      }

      const handleMouseMove = (e: MouseEvent) => {
        setMouse({
          x: e.clientX / window.innerWidth,
          y: 1.0 - e.clientY / window.innerHeight,
        })
      }

      window.addEventListener("mousemove", handleMouseMove)

      return () => {
        window.removeEventListener("mousemove", handleMouseMove)
        window.removeEventListener("resize", checkMobile)
      }
    }, [mouseInteraction, isMobile])

    return (
      <div className={cn("w-full h-full", className)} ref={ref} {...(props as any)}>
        <Shader
          fs={fragmentShader}
          style={{ width: "100%", height: "100%" } as CSSStyleDeclaration}
          uniforms={{
            u_speed: { type: "1f", value: speed },
            u_amplitude: { type: "1f", value: amplitude },
            u_frequency: { type: "1f", value: frequency },
            u_starDensity: { type: "1f", value: starDensity },
            u_colorShift: { type: "1f", value: colorShift },
            u_mouse: { type: "2f", value: [mouse.x, mouse.y] },
          }}
        />
      </div>
    )
  },
)

CosmicWavesShaders.displayName = "CosmicWavesShaders"

export default CosmicWavesShaders
