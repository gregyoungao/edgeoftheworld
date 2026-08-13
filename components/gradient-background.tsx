"use client"

import { CosmicWavesShaders } from "@/components/cosmic-waves-shaders"

export function GradientBackground() {
  return (
    <div className="absolute inset-0 -z-10">
      <CosmicWavesShaders 
        speed={0.5}
        amplitude={1.0}
        frequency={1.0}
        starDensity={0.6}
        colorShift={0.5}
      />
    </div>
  )
}
