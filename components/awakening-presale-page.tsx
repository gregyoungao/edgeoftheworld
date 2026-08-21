"use client"

import { useEffect, useState } from "react"
import { AwakeningPresaleShader } from "@/components/awakening-presale-shader"
import { JournalModalV2 } from "@/components/journal-modal-v2"

export function AwakeningPresalePage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isPlayButtonHidden, setIsPlayButtonHidden] = useState(false)

  useEffect(() => {
    const mobileQuery = window.matchMedia("(max-width: 767px)")
    let lastScrollY = window.scrollY

    const handleScroll = () => {
      if (!mobileQuery.matches) {
        setIsPlayButtonHidden(false)
        return
      }
      const currentScrollY = window.scrollY
      if (currentScrollY > lastScrollY && currentScrollY > 40) {
        setIsPlayButtonHidden(true)
      } else if (currentScrollY < lastScrollY) {
        setIsPlayButtonHidden(false)
      }
      lastScrollY = currentScrollY
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

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

      {/* Game button, fixed to the top-right corner */}
      <a
        href="https://play.edgeofthe.world"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Play the Edge of the World game"
        className={`group fixed right-5 top-5 z-20 flex size-[102px] shrink-0 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-[#a78bd8] via-[#6b4fa0] to-[#3d2f5c] shadow-xl shadow-[#3d2f5c]/40 transition-[opacity,transform] duration-300 animate-bounce-slow hover:scale-105 md:right-8 md:top-8 md:size-40 ${
          isPlayButtonHidden ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <svg
          viewBox="0 0 100 100"
          className="absolute inset-0 h-full w-full animate-spin-slow"
          aria-hidden="true"
        >
          <defs>
            <path
              id="edge-game-circle-path"
              d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0"
              fill="none"
            />
          </defs>
          <text className="font-mono uppercase" fontSize="11" fontWeight="700" letterSpacing="0.5" fill="white">
            <textPath href="#edge-game-circle-path" startOffset="0%">
              PLAY THE EDGE OF THE WORLD GAME &#8226;
            </textPath>
          </text>
        </svg>
        <span
          className="relative ml-1.5 border-y-[15px] border-y-transparent border-l-[24px] border-l-white drop-shadow-md transition-transform duration-300 group-hover:scale-110 md:border-y-[18px] md:border-l-[28px]"
          aria-hidden="true"
        />
      </a>

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
        
        {/* Four widgets in a responsive 2x2 arrangement */}
        <div className="grid w-full max-w-[636px] grid-cols-1 items-center justify-items-center gap-6 md:grid-cols-2">
          {/* Edge of the World widget */}
          <iframe
            title="Edge of the World music widget"
            width="300"
            height="250"
            src="https://blanke.ffm.to/edgeoftheworld/widget?width=300&height=250&note="
            className="rounded-lg"
          />

          {/* Awakening widget */}
          <iframe
            title="Awakening music widget"
            width="300"
            height="250"
            src="https://edgeoftheworld.ffm.to/awakening/widget?width=300&height=250&note="
            className="rounded-lg"
          />

          {/* Skyfire widget */}
          <iframe
            title="Skyfire music widget"
            width="300"
            height="250"
            src="https://edgeoftheworld.ffm.to/skyfire/widget?width=300&height=250&note="
            className="rounded-lg"
          />

          {/* Exodus widget */}
          <iframe
            title="Exodus music widget"
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
