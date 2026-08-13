"use client"

import { useState } from "react"
import { AuroraShaderBackground } from "@/components/aurora-shader-background"
import { JournalModalV2 } from "@/components/journal-modal-v2"

export function LaunchPageV2() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <main className="relative min-h-screen flex flex-col items-center overflow-hidden px-6 pb-12">
      <AuroraShaderBackground />

      {/* Title and buttons at top */}
      <header className="relative z-10 flex flex-col items-center justify-center flex-1 gap-6 pb-8 pt-24">
        {/* North America Tour Button */}
        <a
          href="https://www.farfromhometour.com"
          target="_blank"
          rel="noopener noreferrer"
          className="relative flex items-center gap-3 px-6 py-3 border border-white bg-white/25 rounded-md text-white font-mono text-sm tracking-wider hover:bg-white/35 transition-colors"
        >
          NORTH AMERICA TOUR ON SALE
        </a>

        <h1 className="font-hollowscript text-white text-2xl md:text-3xl tracking-widest">
          EDGE OF THE WORLD
        </h1>
        
        {/* Journal Entry Button with pulse animation */}
        <div className="relative">
          <span className="absolute inset-0 rounded-md border border-white animate-ping-slow opacity-40" />
          <button
            onClick={() => setIsModalOpen(true)}
            className="relative flex items-center gap-3 px-6 py-3 border border-white bg-white/25 rounded-md text-white font-mono text-sm tracking-wider hover:bg-white/35 transition-colors"
          >
            NEW JOURNAL ENTRY
          </button>
        </div>
      </header>

      {/* Video in center */}
      <section className="relative z-10 flex items-center justify-center w-full max-w-3xl py-8">
        <div className="relative w-full aspect-video rounded-lg overflow-hidden border-2 border-white/50">
          <iframe
            src="https://player.vimeo.com/video/1196474791?loop=1&title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479"
            className="absolute inset-0 w-full h-full"
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            title="SKYFIRE_4K_RELEASETRAILER_2_prob4"
          />
        </div>
      </section>

      {/* Status and widgets */}
      <footer className="relative z-10 flex flex-col items-center justify-center flex-1 gap-8 pt-8">
        <p className="font-mono text-cyan-400 text-lg md:text-xl tracking-wide text-center">
          TRANSMISSION DELIVERED
        </p>
        
        {/* Both widgets side by side */}
        <div className="flex flex-col md:flex-row items-center gap-6">
          {/* Original exodus widget */}
          <iframe 
            width="300" 
            height="250" 
            src="https://edgeoftheworld.ffm.to/exodus/widget?width=300&height=250&note="
            className="rounded-lg"
          />
          
          {/* New skyfire widget */}
          <iframe 
            width="300" 
            height="250" 
            src="https://edgeoftheworld.ffm.to/skyfire/widget?width=300&height=250&note="
            className="rounded-lg"
          />
        </div>
      </footer>

      {/* Journal Modal */}
      <JournalModalV2 isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </main>
  )
}
