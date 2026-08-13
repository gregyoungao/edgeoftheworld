import { LaunchPageV2 } from "@/components/launch-page-v2"
import { AwakeningPresalePage } from "@/components/awakening-presale-page"

// Thursday 9th July at 7pm BST (18:00 UTC)
const AWAKENING_PRESALE_DATE = new Date("2026-07-09T18:00:00Z")

export default function Page() {
  const now = new Date()
  
  // TEMPORARILY SHOWING AWAKENING PRESALE PAGE FOR PREVIEW
  return <AwakeningPresalePage />
  
  // After Thursday 9th July 7pm BST - show the awakening presale page
  // if (now >= AWAKENING_PRESALE_DATE) {
  //   return <AwakeningPresalePage />
  // }
  
  // Before 9th July - show the current launch page v2
  // return <LaunchPageV2 />
}
