'use client'

import {
  AnimatePresence,
  Reorder,
  motion,
  useDragControls,
  useMotionValue
} from 'motion/react'
import { useEditor } from '@/hooks/useEditor'
import { useRaisedShadow } from '@/hooks/useRaisedShadow'
import { resumeOptionValue } from '@/lib/utils/resumeConstants'
import {
  EditorSectionDetails,
  EditorSectionPanel,
  EditorSectionReorder,
  EditorSectionTrigger,
  EditorSectionVisibility
} from '@/components/EditorUI/EditorSectionPanel'
import type { EditorSection } from '@/lib/utils/resumeConstants'

interface EditorPanelItemProps {
  section: EditorSection & { id: string; sectionKey: string; isVisible: boolean }
  translations?: Record<string, string>
}

export const EditorPanelItem = ({ section, translations = {} }: EditorPanelItemProps) => {
  const { handlePanelClick, sectionsVisibility, visiblityControls } = useEditor()
  const { id, sectionKey } = section
  const isVisible = id in sectionsVisibility ? sectionsVisibility[id] : section.isVisible
  const isPersonalDetails = sectionKey === resumeOptionValue.personalDetails
  const y = useMotionValue(0)
  const boxShadow = useRaisedShadow(y)
  const dragControls = useDragControls()

  return (
    <Reorder.Item
      id={id}
      value={section}
      dragListener={false}
      className='relative'
      style={{ boxShadow, y }}
      dragControls={dragControls}>
      <EditorSectionPanel isVisible={isVisible}>
        <EditorSectionReorder
          dragControls={dragControls}
          isVisible={isVisible}
          className={isPersonalDetails ? 'invisible' : ''}
        />
        <EditorSectionDetails
          section={section as any}
          isVisible={isVisible}
          onClick={() => handlePanelClick(sectionKey)}
          translations={translations}
        />
        <AnimatePresence mode='wait'>
          <motion.div
            key={`${isPersonalDetails ? 'personal-details' : `animated-${visiblityControls}`}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className='absolute right-0 inset-y-0'>
            {visiblityControls && !isPersonalDetails ? (
              <EditorSectionVisibility section={section as any} isVisible={isVisible} />
            ) : (
              <EditorSectionTrigger
                isVisible={isVisible}
                handlePanelClick={() => handlePanelClick(sectionKey)}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </EditorSectionPanel>
    </Reorder.Item>
  )
}

