'use client'

import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { resumeOptionValue } from '@/lib/utils/resumeConstants'

interface EditorSheetProps {
  isSheetActive: boolean
  activePanelId: string | null
  children: ReactNode
}

const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const media = window.matchMedia(query)
    setMatches(media.matches)
    
    const listener = () => setMatches(media.matches)
    media.addEventListener('change', listener)
    return () => media.removeEventListener('change', listener)
  }, [query])

  // Return false during SSR and initial render to prevent hydration mismatch
  if (!mounted) {
    return false
  }

  return matches
}

export const EditorSheet = ({ isSheetActive, activePanelId, children }: EditorSheetProps) => {
  const isDesktop = useMediaQuery('(min-width: 1024px)')

  if (!isDesktop) {
    return null
  }

  // Validate activePanelId before rendering
  const validSectionIds = [
    resumeOptionValue.personalDetails,
    resumeOptionValue.experience,
    resumeOptionValue.skills,
    resumeOptionValue.education,
    resumeOptionValue.proficiencies,
    resumeOptionValue.customSections,
  ]

  const isValidPanelId = activePanelId !== null && validSectionIds.includes(activePanelId)
  const shouldRender = isSheetActive && isValidPanelId

  return (
    <AnimatePresence>
      {shouldRender && (
        <motion.div
          className='absolute inset-0 flex-auto bg-background overflow-y-auto thin-scrollbar will-change-transform scrollbar-stable p-4 lg:p-6'
          initial={{ x: '10%', opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: '10%', opacity: 0 }}
          transition={{
            x: {
              type: 'spring',
              stiffness: 300,
              damping: 30,
              mass: 0.5
            },
            opacity: {
              duration: 0.1,
              ease: 'easeOut'
            }
          }}>
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

