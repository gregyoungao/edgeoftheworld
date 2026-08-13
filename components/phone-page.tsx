"use client"

import { AuroraShaderBackground } from "@/components/aurora-shader-background"

export function PhonePage() {
  return (
    <main className="relative min-h-screen flex flex-col items-center overflow-hidden px-6 py-12">
      <AuroraShaderBackground />

      {/* Main content centered */}
      <section className="relative z-10 flex flex-col items-center gap-8 text-center w-full">
        {/* Phone number */}
        <p className="font-mono text-cyan-400 text-2xl md:text-3xl tracking-wide">
          +1 (205) 606-2351
        </p>

        {/* Video embed */}
        <div className="relative w-full max-w-3xl aspect-video rounded-lg overflow-hidden border-2 border-white/50">
          <iframe
            src="https://player.vimeo.com/video/1196474791?loop=1&title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479"
            className="absolute inset-0 w-full h-full"
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            title="SKYFIRE_4K_RELEASETRAILER_2_prob4"
          />
        </div>

        {/* Widget embed */}
        <iframe 
          width="300" 
          height="250" 
          src="https://edgeoftheworld.ffm.to/skyfire/widget?width=300&height=250&note="
          className="rounded-lg"
        />
      </section>
    </main>
  )
}
