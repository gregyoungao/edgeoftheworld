"use client"

import { useEffect, useState } from "react"
import { X } from "lucide-react"

interface JournalModalV2Props {
  isOpen: boolean
  onClose: () => void
}

const journalText = `entry_#EOTW2426_08-21

I press my hands into the earth and I feel it so vividly. 
Apparently this wasn't always the way it has been. 
Our generation is the first to experience such a connection to Her. But I couldn't imagine it any other way. 
How could we have lived any differently?

We feel safe as our guardian Solarii watch over us. The foxes. We can feel when they are near, though we've not found any trace of them in old texts and records. The fox has only been our guardian for a short period it seems but now they're an integral part of our lives. They guide us through the forests, now in full bloom, to abundant resources, so we are never without. Symbiotic with the Lunith, we feel everything we need.

We must have been so lost without them.

I found a journal entry from 400 years ago… and clearly we were lost. We were on the edge of the existence as we knew it.

We mustn't fall back into the same patterns. We've learnt from history, and we've progressed into the community we are now for a reason. 

We can look up at the stars and know we know now that we are interconnected. With each other. With the trees. With the animals. With the Earth. With the universe.

We know we are all one.`

export function JournalModalV2({ isOpen, onClose }: JournalModalV2Props) {
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
      }, 8)

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
      <div className="relative w-full max-w-3xl max-h-[80vh] overflow-hidden rounded-lg rounded-lg border-[#b8a8d8]/30 border bg-gradient-to-br from-[#0a1520] via-[#152535] to-[#0a1218]">
        {/* Tech overlay elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#b8a8d8]/50 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#b8a8d8]/30 to-transparent" />
        <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-transparent via-white/20 to-transparent" />
        <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-transparent via-white/20 to-transparent" />
        
        {/* Corner accents */}
        <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-[#b8a8d8]/60" />
        <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-[#b8a8d8]/60" />
        <div className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-[#b8a8d8]/60" />
        <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-[#b8a8d8]/60" />

        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-[#b8a8d8] animate-pulse" />
            <span className="font-mono text-[#b8a8d8] text-sm tracking-wider">CLASSIFIED JOURNAL ENTRY</span>
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
            {isTyping && <span className="inline-block w-2 h-4 bg-[#b8a8d8] animate-pulse ml-1" />}
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
