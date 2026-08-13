"use client"

import { useState } from "react"
import { AwakeningPresaleShader } from "@/components/awakening-presale-shader"
import { JournalModalV2 } from "@/components/journal-modal-v2"

export function AwakeningPresalePage() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <main className="relative min-h-screen flex flex-col items-center px-6 pb-32">
      <AwakeningPresaleShader />

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

      {/* Spotify embed in center */}
      <section className="relative z-10 flex items-center justify-center w-full max-w-2xl py-8">
        <iframe 
          data-testid="embed-iframe" 
          style={{ borderRadius: "12px" }} 
          src="https://open.spotify.com/embed/prerelease/5HJeTiMOWVAmcklcdQrHDw?utm_source=generator&theme=0&si=a31a2039b8594887" 
          width="100%" 
          height="500" 
          frameBorder="0" 
          allowFullScreen={true}
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
          loading="lazy"
        />
      </section>

      {/* Status and widgets */}
      <footer className="relative z-10 flex flex-col items-center justify-center flex-1 gap-8 pt-8">
        <p className="font-mono text-[#3d2f5c] text-lg md:text-xl tracking-wide text-center">
          TRANSMISSION DELIVERED
        </p>
        
        {/* Three widgets side by side */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
          {/* Awakening widget */}
          <iframe 
            width="300" 
            height="250" 
            src="https://edgeoftheworld.ffm.to/awakening/widget?width=300&height=250&note="
            className="rounded-lg"
          />
          
          {/* Skyfire widget */}
          <iframe 
            width="300" 
            height="250" 
            src="https://edgeoftheworld.ffm.to/skyfire/widget?width=300&height=250&note="
            className="rounded-lg"
          />
          
          {/* Original exodus widget */}
          <iframe 
            width="300" 
            height="250" 
            src="https://edgeoftheworld.ffm.to/exodus/widget?width=300&height=250&note="
            className="rounded-lg"
          />
        </div>
      </footer>

      {/* Journal Modal */}
      <JournalModalV2 isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </main>
  )
}
