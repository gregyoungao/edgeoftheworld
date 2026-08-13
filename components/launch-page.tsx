"use client"

import { useState } from "react"
import { GradientBackground } from "@/components/gradient-background"
import { JournalModal } from "@/components/journal-modal"

export function LaunchPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <main className="relative min-h-screen flex flex-col items-center overflow-hidden px-6 pb-12">
      <GradientBackground />

      {/* Title and button at top */}
      <header className="flex flex-col items-center justify-center flex-1 gap-6 pb-8 pt-24">
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
      <section className="flex items-center justify-center w-full max-w-4xl py-8">
        <div className="relative w-full aspect-video rounded-lg overflow-hidden border-2 border-white/50">
          <iframe
            src="https://player.vimeo.com/video/1180725792?autoplay=0&loop=1&title=0&byline=0&portrait=0"
            className="absolute inset-0 w-full h-full"
            allow="autoplay; fullscreen; clipboard-write"
            allowFullScreen
            frameBorder="0"
          />
        </div>
      </section>

      {/* Download status and pre-save */}
      <footer className="flex flex-col items-center justify-center flex-1 gap-8 pt-8">
        <p className="font-mono text-orange-500 text-lg md:text-xl tracking-wide text-center">
          TRANSMISSION DELIVERED
        </p>
        
        {/* Pre-save embed */}
        <iframe 
          width="300" 
          height="250" 
          src="https://edgeoftheworld.ffm.to/exodus/widget?width=300&height=250&note="
          className="rounded-lg"
        />
      </footer>

      {/* Journal Modal */}
      <JournalModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </main>
  )
}
