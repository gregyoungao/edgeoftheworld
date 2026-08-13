"use client"

import { useEffect, useState } from "react"
import { X } from "lucide-react"

interface JournalModalProps {
  isOpen: boolean
  onClose: () => void
}

const journalText = `entry_#EW2196_04_09

How could we have let it get this far?

Our precious Mother is crumbling beneath us and instead of rebuilding, we abandon her.

Today we watched them leave. People have been calling them "The Ascendents". Brainwashed imbeciles. They tried so hard on the message boards to convince us they were doing this for US... They're not coming back. I don't care what the others say. Those evil bastards are throwing us out with the planet itself. The hope of rebuilding on another one and creating a 'new earth' is insulting. We already have a home. We just didn't listen. They warned us 150 years ago, at the turn of the millennia. The land has been dead for decades, so I suppose they had no choice but to leave since we stopped cooperating. Useless pricks couldn't grow a potato if they tried.

Another name has been getting around the tribe. "The Nobodies". I think thats referring to us. I wonder who it came from? Either way, it's giving us an identity. We're working together more. Old friends and families sharing skills and resources. A little girl gave my sister a cute fox puppet the other day. It gave me hope. We'll get through this if we stay together. Though, I don't know how just yet.

All my life I've been able to feel Her. But it's fading. This connection that I've always had is slipping through my fingers and I cant do anything about it no matter how long I sit with Her. I can't tell when or if it's going to rain anymore. When the winds are coming. I get nothing. It's just hot, all the time. Stale. Stagnant. She's losing her energy.

I saw a meteor the other day. I don't think I've EVER seen one. Others noticed them too. They seem to be getting more frequent. They didn't feel ominous either which was strange. Their energy was light. A good omen perhaps?`

export function JournalModal({ isOpen, onClose }: JournalModalProps) {
  const [displayedText, setDisplayedText] = useState("")
  const [isTyping, setIsTyping] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setDisplayedText("")
      setIsTyping(true)
      let index = 0
      const interval = setInterval(() => {
        if (index < journalText.length) {
          setDisplayedText(journalText.slice(0, index + 1))
          index++
        } else {
          setIsTyping(false)
          clearInterval(interval)
        }
      }, 8) // Fast typing speed

      return () => clearInterval(interval)
    } else {
      setDisplayedText("")
      setIsTyping(false)
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-3xl max-h-[80vh] overflow-hidden rounded-lg border border-white/30 bg-gradient-to-br from-[#1a1a1a] via-[#252520] to-[#1a1816]">
        {/* Tech overlay elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-orange-500/50 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-orange-500/30 to-transparent" />
        <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-transparent via-white/20 to-transparent" />
        <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-transparent via-white/20 to-transparent" />
        
        {/* Corner accents */}
        <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-orange-500/60" />
        <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-orange-500/60" />
        <div className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-orange-500/60" />
        <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-orange-500/60" />

        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
            <span className="font-mono text-orange-500 text-sm tracking-wider">CLASSIFIED JOURNAL ENTRY</span>
          </div>
          <button 
            onClick={onClose}
            className="text-white/60 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Scanline effect */}
        <div className="absolute inset-0 pointer-events-none bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.1)_2px,rgba(0,0,0,0.1)_4px)]" />

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(80vh-60px)]">
          <pre className="font-mono text-white/90 text-sm md:text-base whitespace-pre-wrap leading-relaxed">
            {displayedText}
            {isTyping && <span className="inline-block w-2 h-4 bg-orange-500 animate-pulse ml-1" />}
          </pre>
        </div>

        {/* Status bar */}
        <div className="absolute bottom-0 left-0 right-0 p-2 border-t border-white/10 bg-black/30">
          <div className="flex items-center justify-between font-mono text-xs text-white/40">
            <span>DECRYPTION: COMPLETE</span>
            <span>CLEARANCE: LEVEL 3</span>
          </div>
        </div>
      </div>
    </div>
  )
}
